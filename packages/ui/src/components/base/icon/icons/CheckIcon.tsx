import React from "react";
import { IconComponentProps } from "../types";

const CheckIcon: React.FC<IconComponentProps> = ({ 
  size, 
  className = "", 
  color = "currentColor",
  ...props 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill="none" 
    className={className}
    {...props}
  >
    <path 
      d="M13.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.793l6.646-6.647a.5.5 0 0 1 .708 0z" 
      fill={color}
    />
  </svg>
);

export default CheckIcon;
