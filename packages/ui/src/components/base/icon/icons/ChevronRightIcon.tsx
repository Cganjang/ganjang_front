import React from "react";
import { IconProps } from "../types";

/**
 * ChevronRight 아이콘 컴포넌트
 * Figma 디자인에서 추출한 ChevronRight 아이콘
 */
const ChevronRightIcon: React.FC<IconProps> = ({ 
  size = 16, 
  className = "",
  color = "currentColor",
  ...props 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M9 18L15 12L9 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronRightIcon;