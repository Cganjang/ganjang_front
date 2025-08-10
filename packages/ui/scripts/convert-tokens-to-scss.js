import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// tokens.json 파일 읽기
const tokensPath = path.join(__dirname, "../src/tokens/tokens.json");
const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf8"));

// Theme 토큰을 미리 해석하여 매핑 테이블 생성
function createThemeMapping(tokens) {
  const themeMapping = {};

  if (tokens[".Theme"] && tokens[".Theme"].modes) {
    for (const [modeKey, modeValue] of Object.entries(tokens[".Theme"].modes)) {
      if (modeValue.Color) {
        themeMapping[modeKey] = {};
        for (const [colorKey, colorValue] of Object.entries(modeValue.Color)) {
          if (colorValue && typeof colorValue === "object") {
            themeMapping[modeKey][colorKey] = {};
            for (const [shadeKey, shadeValue] of Object.entries(colorValue)) {
              if (shadeValue && shadeValue.$value) {
                // 참조 값을 실제 값으로 변환
                const resolvedValue = resolveReference(
                  shadeValue.$value,
                  tokens
                );
                themeMapping[modeKey][colorKey][shadeKey] = resolvedValue;
              }
            }
          }
        }
      }
    }
  }

  return themeMapping;
}

// 참조 값을 실제 값으로 변환하는 함수 (개선된 버전)
function resolveReference(value, tokens, themeMapping = null) {
  if (
    typeof value === "string" &&
    value.startsWith("{") &&
    value.endsWith("}")
  ) {
    const path = value.slice(1, -1); // {Color.blue.50} -> Color.blue.50
    const keys = path.split(".");
    let current = tokens;

    // Theme 매핑이 있는 경우 먼저 확인
    if (themeMapping && keys[0] === "Color" && keys.length >= 3) {
      const colorName = keys[1];
      const shade = keys[2];

      // 모든 테마에서 해당 색상을 찾아봅니다
      for (const [themeKey, themeColors] of Object.entries(themeMapping)) {
        if (themeColors[colorName] && themeColors[colorName][shade]) {
          return themeColors[colorName][shade];
        }
      }
    }

    // 기본 참조 해석
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        return value; // 참조를 찾을 수 없으면 원래 값 반환
      }
    }

    // 최종 값이 $value를 가지고 있는지 확인
    if (current && current.$value !== undefined) {
      return current.$value;
    }

    return value;
  }

  return value;
}

// SCSS 변수 생성 함수
function generateScssVariables(obj, prefix = "", tokens, themeMapping = null) {
  let scss = "";

  for (const [key, value] of Object.entries(obj)) {
    const currentKey = prefix ? `${prefix}-${key}` : key;

    if (value && typeof value === "object" && value.$value !== undefined) {
      // 실제 값이 있는 경우
      const scssKey = currentKey.toLowerCase().replace(/[^a-z0-9]/g, "-");
      let scssValue = value.$value;

      // 참조 값 해석 (Theme 매핑 포함)
      scssValue = resolveReference(scssValue, tokens, themeMapping);

      // 색상인 경우
      if (value.$type === "color") {
        scss += `$${scssKey}: ${scssValue};\n`;
      }
      // 숫자인 경우 (spacing, border-radius 등)
      else if (value.$type === "float") {
        scss += `$${scssKey}: ${scssValue}px;\n`;
      }
      // 기타 타입
      else {
        scss += `$${scssKey}: ${scssValue};\n`;
      }
    } else if (value && typeof value === "object") {
      // 중첩된 객체인 경우 재귀 호출
      scss += generateScssVariables(value, currentKey, tokens, themeMapping);
    }
  }

  return scss;
}

// SCSS 파일 생성
function generateScssFile() {
  let scssContent = `// Design Tokens - Auto-generated from tokens.json
// Generated on: ${new Date().toISOString()}

`;

  // Theme 매핑 생성
  const themeMapping = createThemeMapping(tokens);

  // Color tokens
  if (tokens.Color) {
    scssContent += `// Color Tokens
`;
    scssContent += generateScssVariables(tokens.Color, "color", tokens);
    scssContent += `\n`;
  }

  // Unit tokens
  if (tokens.Unit) {
    scssContent += `// Unit Tokens
`;
    scssContent += generateScssVariables(tokens.Unit, "unit", tokens);
    scssContent += `\n`;
  }

  // Theme tokens (복잡한 구조 처리)
  if (tokens[".Theme"]) {
    scssContent += `// Theme Tokens
`;
    // Theme의 각 모드별로 처리
    for (const [modeKey, modeValue] of Object.entries(tokens[".Theme"].modes)) {
      if (modeValue.Color) {
        scssContent += `// ${modeKey} Theme Colors
`;
        scssContent += generateScssVariables(
          modeValue.Color,
          `theme-${modeKey.toLowerCase()}`,
          tokens
        );
        scssContent += `\n`;
      }
    }
  }

  // Semantic tokens
  if (tokens.Semantic) {
    scssContent += `// Semantic Tokens
`;
    for (const [semanticKey, semanticValue] of Object.entries(
      tokens.Semantic.modes
    )) {
      if (semanticValue.Color) {
        scssContent += `// ${semanticKey} Semantic Colors
`;
        scssContent += generateScssVariables(
          semanticValue.Color,
          `semantic-${semanticKey.toLowerCase()}`,
          tokens,
          themeMapping
        );
        scssContent += `\n`;
      }

      // Spacing, Border, Effect 등도 처리
      if (semanticValue.Spacing) {
        scssContent += `// ${semanticKey} Semantic Spacing
`;
        scssContent += generateScssVariables(
          semanticValue.Spacing,
          `semantic-${semanticKey.toLowerCase()}-spacing`,
          tokens
        );
        scssContent += `\n`;
      }

      if (semanticValue.Border) {
        scssContent += `// ${semanticKey} Semantic Border
`;
        scssContent += generateScssVariables(
          semanticValue.Border,
          `semantic-${semanticKey.toLowerCase()}-border`,
          tokens
        );
        scssContent += `\n`;
      }

      if (semanticValue.Effect) {
        scssContent += `// ${semanticKey} Semantic Effect
`;
        scssContent += generateScssVariables(
          semanticValue.Effect,
          `semantic-${semanticKey.toLowerCase()}-effect`,
          tokens
        );
        scssContent += `\n`;
      }
    }
  }

  return scssContent;
}

// SCSS 파일 저장
const outputPath = path.join(__dirname, "../src/styles/_tokens.scss");
const scssContent = generateScssFile();

fs.writeFileSync(outputPath, scssContent);
console.log(`Fixed SCSS tokens file generated at: ${outputPath}`);
