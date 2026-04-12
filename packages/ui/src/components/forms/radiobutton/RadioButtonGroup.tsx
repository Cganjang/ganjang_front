import React from "react";
import Radio from "../radio/Radio";
import "./RadioButtonGroup.scss";

export interface RadioButtonOption {
  value: string;
  label: string;
  disabled?: boolean;
  showInfoIcon?: boolean;
  onInfoClick?: () => void;
}

export interface RadioButtonGroupProps {
  /** 폼 제출용 그룹 이름 */
  name: string;
  /** 선택된 값 */
  value?: string;
  /** 라디오 버튼 옵션들 */
  options: RadioButtonOption[];
  /** 에러 상태 */
  error?: boolean;
  /** 전체 그룹 비활성 상태 */
  disabled?: boolean;
  /** 레이아웃 방향 */
  direction?: "vertical" | "horizontal";
  /** 선택 상태 변경 이벤트 */
  onChange?: (value: string) => void;
  className?: string;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  name,
  value,
  options,
  error = false,
  disabled = false,
  direction = "vertical",
  onChange,
  className,
}) => {
  const classNames = [
    "radio-button-group",
    `radio-button-group--${direction}`,
    error && "radio-button-group--error",
    disabled && "radio-button-group--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} role="radiogroup">
      {options.map((option) => (
        <div key={option.value} className="radio-button-group__item">
          <Radio
            name={name}
            value={option.value}
            label={option.label}
            checked={value === option.value}
            disabled={disabled || option.disabled}
            onChange={() => onChange?.(option.value)}
            className={error ? "radio--error" : undefined}
          />
          {option.showInfoIcon && (
            <button
              type="button"
              className="radio-button-group__info"
              onClick={option.onInfoClick}
              aria-label="더보기"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
