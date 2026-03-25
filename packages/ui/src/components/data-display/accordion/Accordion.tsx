import React, { useState, useCallback } from "react";
import "./Accordion.scss";

export interface AccordionProps {
  /** 자식 AccordionItem 컴포넌트들 */
  children: React.ReactNode;
  /**
   * 동시 확장 허용 여부
   * false: 하나만 열림 (기본), true: 여러 개 동시 열림
   */
  multiple?: boolean;
  /** 기본 열림 항목 (value 배열) */
  defaultExpanded?: string[];
  /** 전체 비활성화 */
  disabled?: boolean;
  /**
   * 스타일 변형
   * default: 구분선으로 구분
   * bordered: 테두리 박스
   */
  variant?: "default" | "bordered";
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  styleOverride?: React.CSSProperties;
}

export interface AccordionItemProps {
  /** 아코디언 항목 식별 값 */
  value: string;
  /** 헤더 제목 */
  title: React.ReactNode;
  /** 헤더 부제목 (우측 표시) */
  subtitle?: React.ReactNode;
  /** 접히는 콘텐츠 */
  children: React.ReactNode;
  /** 비활성화 */
  disabled?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  styleOverride?: React.CSSProperties;
}

interface AccordionContextValue {
  expandedItems: string[];
  toggleItem: (value: string) => void;
  disabled: boolean;
  variant: "default" | "bordered";
}

const AccordionContext = React.createContext<AccordionContextValue>({
  expandedItems: [],
  toggleItem: () => {},
  disabled: false,
  variant: "default",
});

const Accordion: React.FC<AccordionProps> = ({
  children,
  multiple = false,
  defaultExpanded = [],
  disabled = false,
  variant = "default",
  className,
  styleOverride,
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpanded);

  const toggleItem = useCallback(
    (value: string) => {
      setExpandedItems((prev) => {
        if (prev.includes(value)) {
          return prev.filter((v) => v !== value);
        }
        return multiple ? [...prev, value] : [value];
      });
    },
    [multiple],
  );

  const classNames = [
    "accordion",
    `accordion--${variant}`,
    disabled && "accordion--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <AccordionContext.Provider value={{ expandedItems, toggleItem, disabled, variant }}>
      <div className={classNames} style={styleOverride}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  title,
  subtitle,
  children,
  disabled: itemDisabled = false,
  className,
  styleOverride,
}) => {
  const { expandedItems, toggleItem, disabled: groupDisabled } =
    React.useContext(AccordionContext);

  const isExpanded = expandedItems.includes(value);
  const isDisabled = groupDisabled || itemDisabled;

  const itemClassNames = [
    "accordion__item",
    isExpanded && "accordion__item--expanded",
    isDisabled && "accordion__item--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleToggle = () => {
    if (isDisabled) return;
    toggleItem(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isDisabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleItem(value);
    }
  };

  return (
    <div className={itemClassNames} style={styleOverride}>
      <button
        type="button"
        className="accordion__header"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
        aria-expanded={isExpanded}
        aria-controls={`accordion-panel-${value}`}
      >
        <div className="accordion__header-content">
          <span className="accordion__title">{title}</span>
          {subtitle && <span className="accordion__subtitle">{subtitle}</span>}
        </div>
        <span className={`accordion__chevron ${isExpanded ? "accordion__chevron--open" : ""}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <div
        id={`accordion-panel-${value}`}
        className="accordion__panel"
        role="region"
        aria-hidden={!isExpanded}
      >
        <div className="accordion__content">{children}</div>
      </div>
    </div>
  );
};

export { Accordion, AccordionItem };
export default Accordion;
