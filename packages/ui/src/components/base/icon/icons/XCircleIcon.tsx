import React from "react";
import { IconProps } from "../types";

/**
 * X-Circle 아이콘 컴포넌트
 * Figma 디자인에서 추출한 X-Circle 아이콘
 */
const XCircleIcon: React.FC<IconProps> = ({ 
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
        d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM2.5 8C2.5 4.96243 4.96243 2.5 8 2.5C11.0376 2.5 13.5 4.96243 13.5 8C13.5 11.0376 11.0376 13.5 8 13.5C4.96243 13.5 2.5 11.0376 2.5 8Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.96967 5.96967C6.26256 5.67678 6.73744 5.67678 7.03033 5.96967L8 6.93934L8.96967 5.96967C9.26256 5.67678 9.73744 5.67678 10.0303 5.96967C10.3232 6.26256 10.3232 6.73744 10.0303 7.03033L9.06066 8L10.0303 8.96967C10.3232 9.26256 10.3232 9.73744 10.0303 10.0303C9.73744 10.3232 9.26256 10.3232 8.96967 10.0303L8 9.06066L7.03033 10.0303C6.73744 10.3232 6.26256 10.3232 5.96967 10.0303C5.67678 9.73744 5.67678 9.26256 5.96967 8.96967L6.93934 8L5.96967 7.03033C5.67678 6.73744 5.67678 6.26256 5.96967 5.96967Z"
        fill={color}
      />
    </svg>
  );
};

export default XCircleIcon;