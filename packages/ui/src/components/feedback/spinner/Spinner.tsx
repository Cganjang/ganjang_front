import React from "react";
import "./Spinner.scss";

export interface SpinnerProps {
  /**
   * 스피너 크기
   * sm: 16px, md: 24px, lg: 32px, xl: 48px
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * 스피너 스타일 타입
   * primary: 파란색 (#2563EB), secondary: 회색 (#4B5563)
   */
  type?: "primary" | "secondary";
  /**
   * 추가 클래스명
   */
  className?: string;
  /**
   * 접근성을 위한 라벨
   */
  "aria-label"?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  type = "primary",
  className = "",
  "aria-label": ariaLabel = "로딩 중",
}) => {
  const classNames = [
    "spinner",
    `spinner--${size}`,
    `spinner--${type}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classNames}
      role="status"
      aria-label={ariaLabel}
    >
      <div className="spinner__circle" />
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
};

export default Spinner;
