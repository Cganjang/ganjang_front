import React, { useId } from "react";
import Icon from "../../base/icon/Icon";
import "./Switch.scss";

export interface SwitchProps {
  /** 선택 상태 (제어 컴포넌트) */
  checked?: boolean;
  /** 기본 선택 상태 (비제어 컴포넌트) */
  defaultChecked?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 에러 상태 */
  error?: boolean;
  /**
   * 인디케이터 내부 아이콘 표시 여부 (Figma: isIcon)
   * ON → check, OFF → x
   */
  showIcon?: boolean;
  /** 라벨 텍스트 */
  label?: React.ReactNode;
  /**
   * 라벨 위치 (Figma: Direction)
   * right: 스위치 오른쪽에 라벨
   * left: 스위치 왼쪽에 라벨
   */
  labelDirection?: "left" | "right";
  /** 변경 이벤트 핸들러 */
  onChange?: (checked: boolean) => void;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  styleOverride?: React.CSSProperties;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked,
  disabled = false,
  error = false,
  showIcon = false,
  label,
  labelDirection = "right",
  onChange,
  className,
  styleOverride,
}) => {
  const autoId = useId();
  const inputId = `switch-${autoId}`;

  const classNames = [
    "switch",
    `switch--label-${labelDirection}`,
    disabled && "switch--disabled",
    error && "switch--error",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(e.target.checked);
  };

  return (
    <label
      className={classNames}
      style={styleOverride}
      htmlFor={inputId}
    >
      <span className="switch__track">
        <input
          id={inputId}
          className="switch__input"
          type="checkbox"
          role="switch"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleChange}
          aria-checked={checked}
          aria-disabled={disabled}
        />
        <span className="switch__indicator" aria-hidden="true">
          {showIcon && (
            <span className="switch__icon switch__icon--check">
              <Icon name="check" size={16} strokeWidth={2.5} />
            </span>
          )}
          {showIcon && (
            <span className="switch__icon switch__icon--x">
              <Icon name="x" size={16} strokeWidth={2.5} />
            </span>
          )}
        </span>
      </span>
      {label && <span className="switch__label">{label}</span>}
    </label>
  );
};

export default Switch;
