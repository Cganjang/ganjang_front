import React from "react";
import Spinner from "../../feedback/spinner/Spinner";
import "./Button.scss";

export interface ButtonProps {
  children: React.ReactNode;
  /**
   * 버튼 스타일 (Figma 기준)
   * filled: 배경색이 채워진 버튼
   * outline: 테두리만 있는 버튼
   * transparent: 투명 배경 버튼
   */
  variant?: "filled" | "outline" | "transparent";
  /**
   * 버튼 타입 (Figma 기준)
   * primary: 파란색 계열
   * secondary: 회색 계열
   * destructive: 빨간색 계열
   */
  type?: "primary" | "secondary" | "destructive";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  /** HTML button type 속성 */
  htmlType?: "button" | "submit" | "reset";
  className?: string;
  styleOverride?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "filled",
  type = "primary",
  onClick,
  disabled = false,
  loading = false,
  htmlType = "button",
  className = "",
  styleOverride,
}) => {
  const classNames = [
    "btn",
    `btn--${variant}`,
    `btn--${type}`,
    loading && "btn--loading",
    disabled && "btn--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // 스피너 타입을 버튼 variant에 맞게 매핑
  const getSpinnerType = () => {
    if (variant === "filled") {
      return "primary"; // filled: 흰색 스피너
    }
    return type === "primary" ? "primary" : "secondary";
  };

  return (
    <button
      type={htmlType}
      className={classNames}
      style={styleOverride}
      onClick={onClick}
      disabled={disabled || loading}
    >
      <span
        className={
          loading ? "btn__content btn__content--hidden" : "btn__content"
        }
      >
        {children}
      </span>
      {loading && (
        <div className="btn__spinner">
          <Spinner size="sm" type={getSpinnerType()} aria-label="로딩 중" />
        </div>
      )}
    </button>
  );
};

export default Button;
