import React from "react";
import "./Label.scss";
import Icon from "../icon/Icon";

export interface LabelProps {
  /**
   * 레이블 텍스트
   */
  children: React.ReactNode;
  /**
   * 레이블 타입 (Figma 기준)
   * none: 기본
   * optional: (Optional) 텍스트 표시
   * required: * 표시
   */
  type?: "none" | "optional" | "required";
  /**
   * 텍스트 크기
   * Figma 기준: md (14px)
   * xs / sm / lg 는 확장 사이즈
   */
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * optional 타입일 때 괄호 안에 표시할 텍스트
   * @default "Optional"
   */
  optionalText?: string;
  /**
   * 우측 info 아이콘 표시 여부
   */
  isInfoIcon?: boolean;
  /**
   * 연결할 input의 id (htmlFor)
   */
  htmlFor?: string;
  /**
   * 비활성 상태
   */
  disabled?: boolean;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 인라인 스타일 (style prop 충돌 방지)
   */
  styleOverride?: React.CSSProperties;
}

const iconSizeMap: Record<string, number> = {
  xs: 12,
  sm: 12,
  md: 14,
  lg: 16,
};

const Label: React.FC<LabelProps> = ({
  children,
  type = "none",
  size = "md",
  optionalText = "Optional",
  isInfoIcon = false,
  htmlFor,
  disabled = false,
  className = "",
  styleOverride,
}) => {
  const classNames = [
    "label",
    `label--${type}`,
    `label--${size}`,
    disabled && "label--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconSize = iconSizeMap[size];

  return (
    <label className={classNames} htmlFor={htmlFor} style={styleOverride}>
      <span className="label__text">{children}</span>

      {type === "optional" && (
        <span className="label__optional">({optionalText})</span>
      )}

      {type === "required" && (
        <span className="label__required" aria-hidden="true">
          *
        </span>
      )}

      {isInfoIcon && (
        <Icon name="info" size={iconSize} className="label__info-icon" />
      )}
    </label>
  );
};

export default Label;
