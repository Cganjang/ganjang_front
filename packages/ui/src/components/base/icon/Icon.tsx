import React from "react";
import { IconProps } from "./types";
import { getIconSize } from "./utils";
import { InfoIcon, CheckIcon, UserIcon, XCircleIcon, AlertTriangleIcon, XIcon, HeartIcon, ChevronRightIcon } from "./icons";

// 아이콘 맵핑
const iconMap = {
  info: InfoIcon,
  check: CheckIcon,
  user: UserIcon,
  "x-circle": XCircleIcon,
  "alert-triangle": AlertTriangleIcon,
  x: XIcon,
  heart: HeartIcon,
  "chevron-right": ChevronRightIcon,
} as const;

export type IconName = keyof typeof iconMap;

export interface IconComponentProps extends IconProps {
  /**
   * 아이콘 이름
   */
  name: IconName;
}

/**
 * Icon 컴포넌트
 * 
 * Figma 디자인 시스템 기반으로 만들어진 아이콘 컴포넌트입니다.
 * 
 * @example
 * ```tsx
 * // 기본 사용
 * <Icon name="info" />
 * 
 * // 크기 조정
 * <Icon name="info" size="lg" />
 * <Icon name="info" size={20} />
 * 
 * // 색상 변경
 * <Icon name="check" color="#22C55E" />
 * 
 * // 클래스 추가
 * <Icon name="info" className="text-blue-500" />
 * ```
 */
const Icon: React.FC<IconComponentProps> = ({ 
  name, 
  size = "sm", 
  className = "",
  color = "currentColor",
  ...props 
}) => {
  const IconComponent = iconMap[name];
  const iconSize = getIconSize(size);

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found. Available icons: ${Object.keys(iconMap).join(", ")}`);
    return null;
  }

  return (
    <IconComponent 
      size={iconSize} 
      className={className}
      color={color}
      {...props} 
    />
  );
};

export default Icon;
