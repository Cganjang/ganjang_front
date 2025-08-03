import React from "react";
import "./Label.scss";
import Icon from "../icon/Icon";

export interface LabelProps {
  children: React.ReactNode;
  type?: "none" | "optional" | "required";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  isInfoIcon?: boolean;
  optional?: string;
}

// 레이블 사이즈에 맞는 아이콘 사이즈 매핑 (텍스트보다 작게)
const iconSizeMap = {
  xs: 12, // 12px text → 12px icon
  sm: 12, // 13px text → 12px icon
  md: 14, // 14px text → 14px icon
  lg: 16, // 16px text → 16px icon
};

const Label: React.FC<LabelProps> = ({
  children,
  type = "none",
  size = "md",
  className = "",
  isInfoIcon = false,
  optional = "",
}) => {
  const classNames = ["label", `label--${type}`, `label--${size}`, className]
    .filter(Boolean)
    .join(" ");

  const iconSize = iconSizeMap[size];

  return (
    <label className={classNames}>
      {children}
      {type === "optional" && optional && (
        <span className="optional-text">({optional})</span>
      )}
      {type === "required" && <span className="required-asterisk">*</span>}
      {isInfoIcon && <Icon name="info" size={iconSize} className="icon" />}
    </label>
  );
};

export default Label;
