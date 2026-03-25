import React, { useState, useRef, useEffect, useId, useCallback } from "react";
import Label from "@ui/components/base/label/Label";
import Icon from "@ui/components/base/icon/Icon";
import "./Select.scss";

export interface SelectOptionItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** 선택 옵션 목록 */
  options: SelectOptionItem[];

  /** 선택 값 — 단일: string, 다중: string[] */
  value?: string | string[];
  /** 기본 선택 값 (비제어) */
  defaultValue?: string | string[];
  /** 값 변경 핸들러 */
  onChange?: (value: string | string[]) => void;

  /** 플레이스홀더 */
  placeholder?: string;

  /**
   * 옵션 표시 타입 (Figma: Type)
   * text: 텍스트 + 체크 아이콘 (단일 선택)
   * checkbox: 체크박스 (다중 선택)
   * radio: 라디오 버튼 (단일 선택)
   */
  optionType?: "text" | "checkbox" | "radio";

  /** 라벨 */
  label?: string;
  labelType?: "none" | "optional" | "required";
  isInfoIcon?: boolean;

  /** 도움말 메시지 */
  helpMessage?: string;
  helpMessageType?: "normal" | "success" | "error";

  /** 비활성화 */
  disabled?: boolean;
  /** 에러 상태 */
  error?: boolean;

  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  styleOverride?: React.CSSProperties;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "placeholder",
  optionType = "text",
  label,
  labelType = "none",
  isInfoIcon = false,
  helpMessage,
  helpMessageType = "normal",
  disabled = false,
  error = false,
  className,
  styleOverride,
}) => {
  const autoId = useId();
  const isMultiple = optionType === "checkbox";

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | string[]>(
    () => defaultValue ?? (isMultiple ? [] : ""),
  );
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const currentValue = value !== undefined ? value : internalValue;

  const selectedValues: string[] = Array.isArray(currentValue)
    ? currentValue
    : currentValue
      ? [currentValue]
      : [];

  const displayLabel = selectedValues
    .map((v) => options.find((o) => o.value === v)?.label)
    .filter(Boolean)
    .join(", ");

  const isFilled = selectedValues.length > 0;
  const resolvedHelpType = error ? "error" : helpMessageType;

  const wrapperClassNames = [
    "select",
    isOpen && "select--open",
    isFilled && !isOpen && "select--filled",
    disabled && "select--disabled",
    error && "select--error",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // --- Handlers ---

  const toggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
    setFocusedIndex(-1);
  };

  const selectOption = useCallback(
    (optionValue: string) => {
      if (isMultiple) {
        const next = selectedValues.includes(optionValue)
          ? selectedValues.filter((v) => v !== optionValue)
          : [...selectedValues, optionValue];
        if (value === undefined) setInternalValue(next);
        onChange?.(next);
      } else {
        if (value === undefined) setInternalValue(optionValue);
        onChange?.(optionValue);
        setIsOpen(false);
      }
    },
    [isMultiple, selectedValues, value, onChange],
  );

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    const enabledOptions = options.filter((o) => !o.disabled);

    switch (e.key) {
      case "Enter":
      case " ": {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else if (focusedIndex >= 0 && enabledOptions[focusedIndex]) {
          selectOption(enabledOptions[focusedIndex].value);
        }
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) =>
            prev < enabledOptions.length - 1 ? prev + 1 : 0,
          );
        }
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : enabledOptions.length - 1,
          );
        }
        break;
      }
      case "Escape": {
        setIsOpen(false);
        break;
      }
    }
  };

  // Scroll focused option into view
  useEffect(() => {
    if (!isOpen || focusedIndex < 0 || !listRef.current) return;
    const el = listRef.current.children[focusedIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [focusedIndex, isOpen]);

  return (
    <div
      ref={wrapperRef}
      className={wrapperClassNames}
      style={styleOverride}
      onKeyDown={handleKeyDown}
    >
      {label && (
        <Label type={labelType} size="md" isInfoIcon={isInfoIcon}>
          {label}
        </Label>
      )}

      {/* Trigger */}
      <button
        type="button"
        className="select__trigger"
        onClick={toggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label ? `select-label-${autoId}` : undefined}
      >
        <span className={`select__value ${!isFilled ? "select__value--placeholder" : ""}`}>
          {isFilled ? displayLabel : placeholder}
        </span>
        <span className="select__chevron">
          <Icon name={isOpen ? "chevron-up" : "chevron-down"} size={24} />
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={listRef}
          className="select__dropdown"
          role="listbox"
          aria-multiselectable={isMultiple}
        >
          {options.map((option, index) => {
            const isSelected = selectedValues.includes(option.value);
            const isFocusedItem = index === focusedIndex;

            const optionClassNames = [
              "select__option",
              isSelected && "select__option--selected",
              isFocusedItem && "select__option--focused",
              option.disabled && "select__option--disabled",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                key={option.value}
                className={optionClassNames}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled}
                onClick={() => {
                  if (option.disabled) return;
                  selectOption(option.value);
                }}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                {/* TextOnly: check icon for selected */}
                {optionType === "text" && isSelected && (
                  <span className="select__option-check">
                    <Icon name="check" size={24} />
                  </span>
                )}

                {/* Checkbox indicator */}
                {optionType === "checkbox" && (
                  <span className={`select__option-checkbox ${isSelected ? "select__option-checkbox--checked" : ""}`}>
                    {isSelected && <Icon name="check" size={16} strokeWidth={2.5} />}
                  </span>
                )}

                {/* Radio indicator */}
                {optionType === "radio" && (
                  <span className={`select__option-radio ${isSelected ? "select__option-radio--checked" : ""}`}>
                    {isSelected && <span className="select__option-radio-dot" />}
                  </span>
                )}

                <span className="select__option-label">{option.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Help message */}
      {helpMessage && (
        <div className={`select__help select__help--${resolvedHelpType}`}>
          {resolvedHelpType === "success" && <Icon name="check" size={16} />}
          {resolvedHelpType === "error" && <Icon name="circle-x" size={16} />}
          <span className="select__help-text">{helpMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Select;
