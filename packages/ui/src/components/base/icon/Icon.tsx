import React from "react";
import * as LucideIcons from "lucide-react";
import { IconProps } from "./types";
import { getIconSize } from "./utils";

// kebab-case → PascalCase 변환 (예: "arrow-left" → "ArrowLeft")
const toPascalCase = (name: string): string =>
  name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

export type IconName = string;

export interface IconComponentProps extends IconProps {
  /**
   * 아이콘 이름 (Lucide Icons kebab-case 기준)
   * 전체 목록: https://lucide.dev/icons
   * @example "plus", "arrow-left", "trash-2", "check-circle"
   */
  name: IconName;
}

/**
 * Icon 컴포넌트
 *
 * Lucide Icons 기반 아이콘 컴포넌트입니다.
 * Figma 디자인 시스템의 아이콘 세트(Feather Icons)와 동일한 라이브러리입니다.
 *
 * @example
 * ```tsx
 * <Icon name="plus" />
 * <Icon name="search" size="md" />
 * <Icon name="trash-2" size={20} color="#dc2626" />
 * <Icon name="check" size="lg" strokeWidth={1.5} />
 * ```
 */
const Icon: React.FC<IconComponentProps> = ({
  name,
  size = "sm",
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  styleOverride,
}) => {
  const pascalName = toPascalCase(name);
  const LucideIcon = (LucideIcons as Record<string, React.FC<LucideIcons.LucideProps>>)[pascalName];
  const iconSize = getIconSize(size);

  if (!LucideIcon) {
    console.warn(
      `Icon "${name}" (${pascalName}) not found. Check https://lucide.dev/icons for available icon names.`
    );
    return null;
  }

  return (
    <LucideIcon
      size={iconSize}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      style={styleOverride}
    />
  );
};

export default Icon;
