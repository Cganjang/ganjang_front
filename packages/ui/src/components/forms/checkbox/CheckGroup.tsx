import React from "react";
import Checkbox from "./Checkbox";
import "./CheckGroup.scss";

export interface CheckGroupItem {
  label: string;
  value: string;
  disabled?: boolean;
  error?: boolean;
}

export interface CheckGroupProps {
  /**
   * 체크박스 항목 배열
   */
  items: CheckGroupItem[];
  /**
   * 선택된 value 배열 (controlled)
   */
  value?: string[];
  /**
   * 변경 이벤트 핸들러
   */
  onChange?: (value: string[]) => void;
  /**
   * 그룹 전체 비활성화
   */
  disabled?: boolean;
  /**
   * 그룹 전체 에러
   */
  error?: boolean;
  /**
   * 레이아웃 방향
   * vertical: 세로 (기본값)
   * horizontal: 가로
   */
  direction?: "vertical" | "horizontal";
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 인라인 스타일 (style prop 충돌 방지)
   */
  styleOverride?: React.CSSProperties;
}

const CheckGroup: React.FC<CheckGroupProps> = ({
  items,
  value = [],
  onChange,
  disabled = false,
  error = false,
  direction = "vertical",
  className = "",
  styleOverride,
}) => {
  const classNames = [
    "check-group",
    `check-group--${direction}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange = (itemValue: string, checked: boolean) => {
    if (!onChange) return;
    if (checked) {
      onChange([...value, itemValue]);
    } else {
      onChange(value.filter((v) => v !== itemValue));
    }
  };

  return (
    <div className={classNames} style={styleOverride} role="group">
      {items.map((item) => (
        <Checkbox
          key={item.value}
          id={`checkbox-${item.value}`}
          value={item.value}
          label={item.label}
          checked={value.includes(item.value)}
          disabled={disabled || item.disabled}
          error={error || item.error}
          onChange={(checked) => handleChange(item.value, checked)}
        />
      ))}
    </div>
  );
};

export default CheckGroup;
