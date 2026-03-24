import React, { useEffect, useRef } from "react";
import "./Checkbox.scss";

export interface CheckboxProps {
  /**
   * 체크 상태 (controlled)
   */
  checked?: boolean;
  /**
   * 부분 선택 상태 (indeterminate) — checked보다 우선 표시
   */
  indeterminate?: boolean;
  /**
   * 라벨 텍스트 (없으면 박스만 표시)
   */
  label?: string;
  /**
   * 비활성 상태
   */
  disabled?: boolean;
  /**
   * 에러 상태
   */
  error?: boolean;
  /**
   * 변경 이벤트 핸들러
   */
  onChange?: (checked: boolean) => void;
  /**
   * input id (label htmlFor 연결)
   */
  id?: string;
  /**
   * input name
   */
  name?: string;
  /**
   * input value
   */
  value?: string;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 인라인 스타일 (style prop 충돌 방지)
   */
  styleOverride?: React.CSSProperties;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  indeterminate = false,
  label,
  disabled = false,
  error = false,
  onChange,
  id,
  name,
  value,
  className = "",
  styleOverride,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // indeterminate는 HTML 속성이 아닌 DOM 프로퍼티라 ref로 직접 설정
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const wrapperClassNames = [
    "checkbox",
    disabled && "checkbox--disabled",
    error && "checkbox--error",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(e.target.checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onChange?.(!checked);
    }
  };

  return (
    <label
      className={wrapperClassNames}
      style={styleOverride}
      htmlFor={id}
      onKeyDown={handleKeyDown}
    >
      <span className="checkbox__box-wrapper">
        <input
          ref={inputRef}
          className="checkbox__input"
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          aria-checked={indeterminate ? "mixed" : checked}
        />
        <span className="checkbox__box">
          {/* indeterminate: dash, checked: checkmark */}
          {indeterminate && (
            <span className="checkbox__icon checkbox__icon--partial" />
          )}
          {!indeterminate && checked && (
            <span className="checkbox__icon checkbox__icon--check" />
          )}
        </span>
      </span>

      {label && (
        <span className="checkbox__label">{label}</span>
      )}
    </label>
  );
};

export default Checkbox;
