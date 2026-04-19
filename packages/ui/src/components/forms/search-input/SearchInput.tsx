import React, { useState, useId, useRef, useEffect } from "react";
import Icon from "../../base/icon/Icon";
import Spinner from "../../feedback/spinner/Spinner";
import "./SearchInput.scss";

export interface SearchInputProps {
  /** 입력값 (제어 컴포넌트) */
  value?: string;
  /** 변경 콜백 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 검색 실행 콜백 (Enter 키 또는 검색 버튼 클릭) */
  onSearch?: (value: string) => void;
  /** 초기화 콜백 */
  onClear?: () => void;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 로딩 상태 (검색 중) */
  loading?: boolean;
  /** 비활성화 */
  disabled?: boolean;
  /** 자동 포커스 */
  autoFocus?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  styleOverride?: React.CSSProperties;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = "검색",
  loading = false,
  disabled = false,
  autoFocus = false,
  className,
  styleOverride,
}) => {
  const autoId = useId();
  const inputId = `search-input-${autoId}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const wrapperClassNames = [
    "search-input",
    disabled && "search-input--disabled",
    isFocused && "search-input--focused",
    value && "search-input--filled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleFocus = () => {
    if (disabled) return;
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.key === "Enter") {
      onSearch?.(value || "");
    }
  };

  const handleClear = () => {
    if (disabled || loading) return;
    onClear?.();
  };

  return (
    <div className={wrapperClassNames} style={styleOverride}>
      <div className="search-input__wrap">
        <span className="search-input__icon-leading">
          <Icon name="search" size={16} />
        </span>

        <input
          ref={inputRef}
          id={inputId}
          className="search-input__field"
          type="text"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          aria-disabled={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />

        {value && !loading && (
          <button
            className="search-input__clear"
            type="button"
            onClick={handleClear}
            disabled={disabled}
            aria-label="검색어 초기화"
          >
            <Icon name="x" size={16} />
          </button>
        )}

        {loading && (
          <span className="search-input__icon-trailing">
            <Spinner size="sm" type="primary" />
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
