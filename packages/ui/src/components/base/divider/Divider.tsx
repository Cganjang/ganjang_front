import React from "react";
import "./Divider.scss";

export interface DividerProps {
  /**
   * Divider의 크기 (선 두께)
   * sm: 1px, md: 2px, lg: 4px, xl: 8px
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * 방향 (가로/세로)
   */
  orientation?: "horizontal" | "vertical";
  /**
   * CSS 클래스명
   */
  className?: string;
  /**
   * 위아래 여백
   */
  margin?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
}

const Divider: React.FC<DividerProps> = ({
  size = "sm",
  orientation = "horizontal",
  className = "",
  margin = "md",
}) => {
  const classNames = [
    "divider",
    `divider--${size}`,
    `divider--${orientation}`,
    `divider--margin-${margin}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classNames} />;
};

export default Divider;
