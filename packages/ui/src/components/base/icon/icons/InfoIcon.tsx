import React from "react";
import { IconComponentProps } from "../types";

const InfoIcon: React.FC<IconComponentProps> = ({ 
  size, 
  className = "", 
  color = "currentColor",
  ...props 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 17" 
    fill="none" 
    className={className}
    {...props}
  >
    <g clipPath="url(#clip0_5_508)">
      <path 
        d="M8 0.833008C12.2339 0.833184 15.6658 4.26607 15.666 8.5C15.6658 12.7339 12.2339 16.1658 8 16.166C3.76607 16.1658 0.333184 12.7339 0.333008 8.5C0.333184 4.26607 3.76607 0.833184 8 0.833008ZM8 2.83301C4.87064 2.83318 2.33318 5.37064 2.33301 8.5C2.33318 11.6294 4.87064 14.1658 8 14.166C11.1294 14.1658 13.6658 11.6294 13.666 8.5C13.6658 5.37064 11.1294 2.83318 8 2.83301ZM8 7.5C8.55228 7.5 9 7.94772 9 8.5V11.167C8.99982 11.7191 8.55218 12.167 8 12.167C7.44782 12.167 7.00018 11.7191 7 11.167V8.5C7 7.94772 7.44772 7.5 8 7.5ZM8.00684 4.83301C8.55893 4.8331 9.00666 5.28093 9.00684 5.83301C9.00684 6.38524 8.55904 6.83292 8.00684 6.83301H8C7.44772 6.83301 7 6.38529 7 5.83301C7.00018 5.28087 7.44782 4.83301 8 4.83301H8.00684Z" 
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_5_508">
        <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
      </clipPath>
    </defs>
  </svg>
);

export default InfoIcon;
