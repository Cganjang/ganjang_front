import React from "react";
import { IconProps } from "../types";

/**
 * User 아이콘 컴포넌트
 * Figma 디자인에서 추출한 User 아이콘
 */
const UserIcon: React.FC<IconProps> = ({ 
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
        d="M8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2ZM6.5 5C6.5 4.17157 7.17157 3.5 8 3.5C8.82843 3.5 9.5 4.17157 9.5 5C9.5 5.82843 8.82843 6.5 8 6.5C7.17157 6.5 6.5 5.82843 6.5 5Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 10C5.23858 10 3 12.2386 3 15H4.5C4.5 13.067 6.067 11.5 8 11.5C9.933 11.5 11.5 13.067 11.5 15H13C13 12.2386 10.7614 10 8 10Z"
        fill={color}
      />
    </svg>
  );
};

export default UserIcon;
