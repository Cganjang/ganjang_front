import React from "react";
import type { RadioProps } from "./Radio";
import "./Radio.scss";

export interface RadioGroupProps {
  /** 라디오 그룹 이름 */
  name: string;
  /** 현재 선택된 값 (제어 컴포넌트) */
  value?: string;
  /** 기본 선택 값 (비제어 컴포넌트) */
  defaultValue?: string;
  /** 값 변경 핸들러 */
  onChange?: (value: string) => void;
  /** 전체 비활성화 */
  disabled?: boolean;
  /** 배치 방향 */
  direction?: "horizontal" | "vertical";
  /** 라디오 크기 (자식에게 전파) */
  size?: "sm" | "md" | "lg";
  /** 자식 Radio 컴포넌트들 */
  children: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  styleOverride?: React.CSSProperties;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  defaultValue,
  onChange,
  disabled = false,
  direction = "vertical",
  size,
  children,
  className,
  styleOverride,
}) => {
  const classNames = [
    "radio-group",
    `radio-group--${direction}`,
    disabled && "radio-group--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(e.target.value);
  };

  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement<RadioProps>(child)) return child;

    const childProps: Partial<RadioProps> = {
      name,
      onChange: handleChange,
    };

    if (disabled) childProps.disabled = true;
    if (size) childProps.size = size;

    if (value !== undefined) {
      childProps.checked = child.props.value === value;
    } else if (defaultValue !== undefined && child.props.checked === undefined) {
      childProps.defaultChecked = child.props.value === defaultValue;
    }

    return React.cloneElement(child, childProps);
  });

  return (
    <div
      className={classNames}
      style={styleOverride}
      role="radiogroup"
    >
      {enhancedChildren}
    </div>
  );
};

export default RadioGroup;
