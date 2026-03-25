import React from "react";
import Icon, { IconName } from "@ui/components/base/icon/Icon";
import "./Tabs.scss";

export interface TabItem {
  /**
   * 탭 고유 식별자
   */
  value: string;
  /**
   * 탭 라벨 텍스트
   */
  label: string;
  /**
   * 아이콘 이름 (Lucide Icons 기준, 선택사항)
   */
  icon?: IconName;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
}

export interface TabsProps {
  /**
   * 탭 항목 배열 (2~8개, Figma 기준)
   */
  items: TabItem[];
  /**
   * 현재 선택된 탭의 value (controlled)
   */
  value: string;
  /**
   * 탭 변경 핸들러
   */
  onChange: (value: string) => void;
  /**
   * 탭 스타일 (Figma 기준)
   * box: 선택 탭에 border 박스
   * underline: 선택 탭에 하단 라인
   */
  variant?: "box" | "underline";
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 인라인 스타일 (style prop 충돌 방지)
   */
  styleOverride?: React.CSSProperties;
}

const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  onChange,
  variant = "underline",
  className = "",
  styleOverride,
}) => {
  const classNames = ["tabs", `tabs--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    item: TabItem
    // index: number
  ) => {
    if (item.disabled) return;

    const enabledItems = items.filter((i) => !i.disabled);
    const currentEnabledIndex = enabledItems.findIndex(
      (i) => i.value === value
    );

    let nextItem: TabItem | undefined;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextItem = enabledItems[(currentEnabledIndex + 1) % enabledItems.length];
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      nextItem =
        enabledItems[
          (currentEnabledIndex - 1 + enabledItems.length) % enabledItems.length
        ];
    } else if (e.key === "Home") {
      e.preventDefault();
      nextItem = enabledItems[0];
    } else if (e.key === "End") {
      e.preventDefault();
      nextItem = enabledItems[enabledItems.length - 1];
    }

    if (nextItem) {
      onChange(nextItem.value);
    }
  };

  return (
    <div
      className={classNames}
      style={styleOverride}
      role="tablist"
      aria-orientation="horizontal"
    >
      {items.map((item) => {
        const isSelected = item.value === value;

        const tabClassNames = [
          "tabs__item",
          isSelected && "tabs__item--selected",
          item.disabled && "tabs__item--disabled",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <button
            key={item.value}
            className={tabClassNames}
            role="tab"
            aria-selected={isSelected}
            aria-disabled={item.disabled}
            disabled={item.disabled}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => !item.disabled && onChange(item.value)}
            onKeyDown={(e) => handleKeyDown(e, item)}
          >
            {item.icon && (
              <Icon name={item.icon} size={16} className="tabs__icon" />
            )}
            <span className="tabs__label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
