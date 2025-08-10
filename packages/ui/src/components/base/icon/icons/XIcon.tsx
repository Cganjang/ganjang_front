import React from "react";
import { IconProps } from "../types";

/**
 * X 아이콘 컴포넌트
 * Figma 디자인에서 추출한 X 아이콘
 */
const XIcon: React.FC<IconProps> = ({ 
  size = 16, 
  className = "",
  color = "currentColor",
  ...props 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.96967 3.96967C4.26256 3.67678 4.73744 3.67678 5.03033 3.96967L8 6.93934L10.9697 3.96967C11.2626 3.67678 11.7374 3.67678 12.0303 3.96967C12.3232 4.26256 12.3232 4.73744 12.0303 5.03033L9.06066 8L12.0303 10.9697C12.3232 11.2626 12.3232 11.7374 12.0303 12.0303C11.7374 12.3232 11.2626 12.3232 10.9697 12.0303L8 9.06066L5.03033 12.0303C4.73744 12.3232 4.26256 12.3232 3.96967 12.0303C3.67678 11.7374 3.67678 11.2626 3.96967 10.9697L6.93934 8L3.96967 5.03033C3.67678 4.73744 3.67678 4.26256 3.96967 3.96967Z"
        fill={color}
      />
    </svg>
  );
};

export default XIcon;