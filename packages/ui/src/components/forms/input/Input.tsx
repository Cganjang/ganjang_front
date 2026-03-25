import React, { useState, useId, forwardRef } from "react";
import Label from "@ui/components/base/label/Label";
import Icon from "@ui/components/base/icon/Icon";
import "./Input.scss";

export interface InputProps {
  /** 입력 값 (제어 컴포넌트) */
  value?: string;
  /** 기본 입력 값 (비제어 컴포넌트) */
  defaultValue?: string;
  /** 플레이스홀더 텍스트 */
  placeholder?: string;

  /**
   * 라벨 텍스트 (Figma: Label)
   * 미지정 시 라벨 숨김
   */
  label?: string;
  /** 라벨 타입 (none / optional / required) */
  labelType?: "none" | "optional" | "required";
  /** 라벨 info 아이콘 표시 여부 */
  isInfoIcon?: boolean;

  /**
   * 도움말 메시지 텍스트 (Figma: HelpMessage)
   * 미지정 시 숨김
   */
  helpMessage?: string;
  /** 도움말 메시지 타입 */
  helpMessageType?: "normal" | "success" | "error";

  /** 앞쪽(leading) 아이콘 이름 (Lucide) */
  leadingIcon?: string;
  /** 뒤쪽(trailing) 아이콘 이름 (Lucide) */
  trailingIcon?: string;

  /** 비활성화 여부 */
  disabled?: boolean;
  /** 에러 상태 */
  error?: boolean;

  /** HTML input type */
  htmlType?: React.HTMLInputTypeAttribute;
  /** input name 속성 */
  name?: string;

  /** 변경 이벤트 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 포커스 이벤트 */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** 블러 이벤트 */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  styleOverride?: React.CSSProperties;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      defaultValue,
      placeholder,
      label,
      labelType = "none",
      isInfoIcon = false,
      helpMessage,
      helpMessageType = "normal",
      leadingIcon,
      trailingIcon,
      disabled = false,
      error = false,
      htmlType = "text",
      name,
      onChange,
      onFocus,
      onBlur,
      className,
      styleOverride,
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = `input-${autoId}`;
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(
      () => !!(value || defaultValue),
    );

    const resolvedHelpType = error ? "error" : helpMessageType;

    const wrapperClassNames = [
      "input",
      disabled && "input--disabled",
      error && "input--error",
      isFocused && "input--focus",
      isFilled && !isFocused && "input--filled",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (disabled) return;
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setIsFilled(!!e.target.value);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      setIsFilled(!!e.target.value);
      onChange?.(e);
    };

    return (
      <div className={wrapperClassNames} style={styleOverride}>
        {label && (
          <Label
            type={labelType}
            size="md"
            isInfoIcon={isInfoIcon}
          >
            {label}
          </Label>
        )}

        <div className="input__field">
          {leadingIcon && (
            <span className="input__icon input__icon--leading">
              <Icon name={leadingIcon} size={16} />
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className="input__native"
            type={htmlType}
            name={name}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            aria-disabled={disabled}
            aria-invalid={error}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {trailingIcon && (
            <span className="input__icon input__icon--trailing">
              <Icon name={trailingIcon} size={16} />
            </span>
          )}
        </div>

        {helpMessage && (
          <div className={`input__help input__help--${resolvedHelpType}`}>
            {resolvedHelpType === "success" && (
              <Icon name="check" size={16} />
            )}
            {resolvedHelpType === "error" && (
              <Icon name="circle-x" size={16} />
            )}
            <span className="input__help-text">{helpMessage}</span>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
