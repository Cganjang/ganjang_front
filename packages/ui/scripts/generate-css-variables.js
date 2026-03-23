import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tokensPath = path.join(__dirname, "../src/tokens/tokens.json");
const raw = JSON.parse(fs.readFileSync(tokensPath, "utf8"));
const tokens = Array.isArray(raw)
  ? raw.reduce((acc, item) => Object.assign(acc, item), {})
  : raw;

// ─── Primitive 데이터를 최상위 참조 경로로 노출 ───

const primitiveMode = tokens[".Primitive"]?.modes?.["Mode 1"];
if (primitiveMode) {
  if (primitiveMode.Color && !tokens.Color) tokens.Color = primitiveMode.Color;
  if (primitiveMode.Unit && !tokens.Unit) tokens.Unit = primitiveMode.Unit;
}

// ─── 참조 해석 ───

function resolveReference(value, tokens, themeMapping = null) {
  if (
    typeof value === "string" &&
    value.startsWith("{") &&
    value.endsWith("}")
  ) {
    const refPath = value.slice(1, -1);
    const keys = refPath.split(".");
    let current = tokens;

    if (themeMapping && keys[0] === "Color" && keys.length >= 3) {
      const colorName = keys[1];
      const shade = keys[2];
      for (const themeColors of Object.values(themeMapping)) {
        if (themeColors[colorName]?.[shade]) {
          return themeColors[colorName][shade];
        }
      }
    }

    for (const key of keys) {
      if (current?.[key] !== undefined) {
        current = current[key];
      } else {
        return value;
      }
    }

    if (current?.$value !== undefined) {
      return resolveReference(current.$value, tokens, themeMapping);
    }
    return value;
  }
  return value;
}

function createThemeMapping(tokens) {
  const themeMapping = {};
  if (!tokens[".Theme"]?.modes) return themeMapping;

  for (const [modeKey, modeValue] of Object.entries(tokens[".Theme"].modes)) {
    if (!modeValue.Color) continue;
    themeMapping[modeKey] = {};
    for (const [colorKey, colorValue] of Object.entries(modeValue.Color)) {
      if (!colorValue || typeof colorValue !== "object") continue;
      themeMapping[modeKey][colorKey] = {};
      for (const [shadeKey, shadeValue] of Object.entries(colorValue)) {
        if (shadeValue?.$value) {
          themeMapping[modeKey][colorKey][shadeKey] = resolveReference(
            shadeValue.$value,
            tokens
          );
        }
      }
    }
  }
  return themeMapping;
}

// ─── CSS 변수명 생성: "text/Interactive/primary-hovered" → "text-interactive-primary-hovered" ───

function toCssVarName(segments) {
  return segments
    .map((s) => s.toLowerCase().replace(/[^a-z0-9-]/g, "-"))
    .join("-");
}

// ─── Semantic Color를 플랫한 { cssVarName: resolvedHex } 맵으로 변환 ───

function flattenSemanticColors(colorObj, prefix, tokens, themeMapping) {
  const result = {};

  for (const [key, value] of Object.entries(colorObj)) {
    const currentPath = [...prefix, key];

    if (value && typeof value === "object" && value.$value !== undefined) {
      const varName = toCssVarName(currentPath);
      let resolved = resolveReference(value.$value, tokens, themeMapping);
      if (typeof resolved === "number") resolved = `${resolved}px`;
      result[varName] = resolved;
    } else if (value && typeof value === "object") {
      Object.assign(
        result,
        flattenSemanticColors(value, currentPath, tokens, themeMapping)
      );
    }
  }
  return result;
}

// ─── Semantic non-color (Spacing, Border, Effect) 처리 ───

function flattenSemanticNonColor(obj, prefix, tokens) {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = [...prefix, key];

    if (value && typeof value === "object" && value.$value !== undefined) {
      const varName = toCssVarName(currentPath);
      let resolved = resolveReference(value.$value, tokens);
      if (value.$type === "float" && typeof resolved === "number") {
        resolved = `${resolved}px`;
      }
      result[varName] = resolved;
    } else if (value && typeof value === "object") {
      Object.assign(
        result,
        flattenSemanticNonColor(value, currentPath, tokens)
      );
    }
  }
  return result;
}

// ─── SCSS 생성 ───

function generate() {
  const themeMapping = createThemeMapping(tokens);
  const semanticModes = tokens.Semantic?.modes;
  if (!semanticModes) {
    console.error("Semantic.modes가 tokens.json에 없습니다.");
    process.exit(1);
  }

  const lightData = semanticModes.Light;
  const darkData = semanticModes.Dark;

  // Light 색상
  const lightColors = lightData?.Color
    ? flattenSemanticColors(lightData.Color, [], tokens, themeMapping)
    : {};

  // Light spacing, border, effect
  if (lightData?.Spacing) {
    Object.assign(
      lightColors,
      flattenSemanticNonColor(lightData.Spacing, ["spacing"], tokens)
    );
  }
  if (lightData?.Border) {
    Object.assign(
      lightColors,
      flattenSemanticNonColor(lightData.Border, ["border"], tokens)
    );
  }
  if (lightData?.Effect) {
    Object.assign(
      lightColors,
      flattenSemanticNonColor(lightData.Effect, ["effect"], tokens)
    );
  }

  // Dark 색상
  const darkColors = darkData?.Color
    ? flattenSemanticColors(darkData.Color, [], tokens, themeMapping)
    : {};

  if (darkData?.Spacing) {
    Object.assign(
      darkColors,
      flattenSemanticNonColor(darkData.Spacing, ["spacing"], tokens)
    );
  }
  if (darkData?.Border) {
    Object.assign(
      darkColors,
      flattenSemanticNonColor(darkData.Border, ["border"], tokens)
    );
  }
  if (darkData?.Effect) {
    Object.assign(
      darkColors,
      flattenSemanticNonColor(darkData.Effect, ["effect"], tokens)
    );
  }

  // SCSS 출력
  let scss = `// CSS Custom Properties - Auto-generated from tokens.json
// Generated on: ${new Date().toISOString()}
// Usage: color: var(--text-primary); background: var(--bg-interactive-primary);

:root,
[data-theme="light"] {
`;

  for (const [name, value] of Object.entries(lightColors)) {
    scss += `  --${name}: ${value};\n`;
  }

  scss += `}\n\n[data-theme="dark"] {\n`;

  for (const [name, value] of Object.entries(darkColors)) {
    scss += `  --${name}: ${value};\n`;
  }

  scss += `}\n`;

  return scss;
}

const outputPath = path.join(__dirname, "../src/styles/_css-variables.scss");
const content = generate();

fs.writeFileSync(outputPath, content);

const varCount = (content.match(/--/g) || []).length;
console.log(`CSS Custom Properties 생성 완료: ${outputPath}`);
console.log(`  총 ${varCount}개 변수 (Light + Dark)`);
