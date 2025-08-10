import React from "react";
import { IconProps } from "../types";

/**
 * Alert Triangle 아이콘 컴포넌트
 * Figma 디자인에서 추출한 Alert Triangle 아이콘
 */
const AlertTriangleIcon: React.FC<IconProps> = ({ 
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
        d="M6.45671 2.19526C7.25098 0.934914 8.74902 0.934914 9.54329 2.19526L14.8944 11.5095C15.688 12.7692 14.7895 14.4286 13.3511 14.4286H2.64886C1.21048 14.4286 0.311979 12.7692 1.10558 11.5095L6.45671 2.19526ZM8.5 3.14286C8.22386 2.68571 7.77614 2.68571 7.5 3.14286L2.14887 12.4571C1.87273 12.9143 2.09659 13.5714 2.64886 13.5714H13.3511C13.9034 13.5714 14.1273 12.9143 13.8511 12.4571L8.5 3.14286Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 6C8.41421 6 8.75 6.33579 8.75 6.75V9.25C8.75 9.66421 8.41421 10 8 10C7.58579 10 7.25 9.66421 7.25 9.25V6.75C7.25 6.33579 7.58579 6 8 6Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.25 11.5C7.25 11.0858 7.58579 10.75 8 10.75H8.0075C8.42171 10.75 8.7575 11.0858 8.7575 11.5C8.7575 11.9142 8.42171 12.25 8.0075 12.25H8C7.58579 12.25 7.25 11.9142 7.25 11.5Z"
        fill={color}
      />
    </svg>
  );
};

export default AlertTriangleIcon;