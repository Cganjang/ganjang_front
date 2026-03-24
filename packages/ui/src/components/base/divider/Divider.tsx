import React from "react";
import "./Divider.scss";

export interface DividerProps {
  /**
   * 구분선 두께 (Figma 기준)
   * sm: 1px, md: 2px, lg: 4px, xl: 8px
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * 방향
   * horizontal: 가로 구분선 (기본값)
   * vertical: 세로 구분선
   */
  orientation?: "horizontal" | "vertical";
  /**
   * 구분선 주변 여백
   * none: 0, xs: 2px, sm: 4px, md: 8px, lg: 16px, xl: 24px
   */
  margin?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 인라인 스타일 (style prop 충돌 방지)
   */
  styleOverride?: React.CSSProperties;
}

const Divider: React.FC<DividerProps> = ({
  size = "sm",
  orientation = "horizontal",
  margin = "none",
  className = "",
  styleOverride,
}) => {
  const classNames = [
    "divider",
    `divider--${size}`,
    `divider--${orientation}`,
    margin !== "none" && `divider--margin-${margin}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // hr은 수평 전용 시맨틱 요소 — vertical은 div로 렌더링
  if (orientation === "vertical") {
    return (
      <div
        className={classNames}
        style={styleOverride}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  return (
    <hr
      className={classNames}
      style={styleOverride}
      aria-orientation="horizontal"
    />
  );
};

export default Divider;
