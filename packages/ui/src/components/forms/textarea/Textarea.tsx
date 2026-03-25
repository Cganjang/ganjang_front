import React, { useState, useId, forwardRef } from "react";
import Label from "../../base/label/Label";
import Icon from "../../base/icon/Icon";
import "./Textarea.scss";

export interface TextareaProps {
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

  /**
   * 최대 글자 수 (Figma: Total count)
   * 지정 시 카운터 자동 표시
   */
  maxLength?: number;
  /** 글자 수 카운터 표시 여부 */
  showCount?: boolean;

  /** textarea rows */
  rows?: number;
  /**
   * 리사이즈 동작
   * Figma에서 우하단 리사이즈 핸들 표시
   */
  resize?: "none" | "vertical" | "horizontal" | "both";

  /** 비활성화 여부 */
  disabled?: boolean;
  /** 에러 상태 */
  error?: boolean;

  /** textarea name 속성 */
  name?: string;

  /** 변경 이벤트 */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** 포커스 이벤트 */
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  /** 블러 이벤트 */
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;

  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  styleOverride?: React.CSSProperties;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      maxLength,
      showCount = true,
      rows = 5,
      resize = "vertical",
      disabled = false,
      error = false,
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
    const textareaId = `textarea-${autoId}`;
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");

    const currentValue = value !== undefined ? value : internalValue;
    const currentLength = currentValue.length;
    const isOverLimit = maxLength !== undefined && currentLength > maxLength;
    const resolvedError = error || isOverLimit;
    const resolvedHelpType = resolvedError ? "error" : helpMessageType;
    const hasCount = showCount && maxLength !== undefined;

    const wrapperClassNames = [
      "textarea",
      disabled && "textarea--disabled",
      resolvedError && "textarea--error",
      isFocused && "textarea--focus",
      currentLength > 0 && !isFocused && "textarea--filled",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (disabled) return;
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (disabled) return;
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    return (
      <div className={wrapperClassNames} style={styleOverride}>
        {(label || hasCount) && (
          <div className="textarea__header">
            {label ? (
              <Label type={labelType} size="md" isInfoIcon={isInfoIcon}>
                {label}
              </Label>
            ) : (
              <span />
            )}
            {hasCount && (
              <span className={`textarea__count ${resolvedError ? "textarea__count--error" : ""}`}>
                {currentLength}
                <span className="textarea__count-separator">/</span>
                {maxLength}
              </span>
            )}
          </div>
        )}

        <div className="textarea__field">
          <textarea
            ref={ref}
            id={textareaId}
            className="textarea__native"
            name={name}
            value={value}
            defaultValue={value === undefined ? defaultValue : undefined}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            maxLength={maxLength}
            aria-disabled={disabled}
            aria-invalid={resolvedError}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ resize }}
          />
        </div>

        {helpMessage && (
          <div className={`textarea__help textarea__help--${resolvedHelpType}`}>
            {resolvedHelpType === "success" && (
              <Icon name="check" size={16} />
            )}
            {resolvedHelpType === "error" && (
              <Icon name="circle-x" size={16} />
            )}
            <span className="textarea__help-text">{helpMessage}</span>
          </div>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
