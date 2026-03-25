import React from "react";
import Icon, { IconName } from "../../base/icon/Icon";
import "./BottomNav.scss";

export interface BottomNavItem {
  /**
   * 항목 고유 식별자
   */
  value: string;
  /**
   * 아이콘 이름 (Lucide Icons 기준, 필수)
   */
  icon: IconName;
  /**
   * 라벨 텍스트 (type="icon-label"일 때 표시)
   */
  label?: string;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
}

export interface BottomNavProps {
  /**
   * 네비게이션 항목 배열 (3~5개, Figma 기준)
   */
  items: BottomNavItem[];
  /**
   * 현재 선택된 항목의 value (controlled)
   */
  value: string;
  /**
   * 변경 핸들러
   */
  onChange: (value: string) => void;
  /**
   * 타입 (Figma 기준)
   * icon-only: 아이콘만
   * icon-label: 아이콘 + 라벨
   */
  type?: "icon-only" | "icon-label";
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 인라인 스타일 (style prop 충돌 방지)
   */
  styleOverride?: React.CSSProperties;
}

const BottomNav: React.FC<BottomNavProps> = ({
  items,
  value,
  onChange,
  type = "icon-label",
  className = "",
  styleOverride,
}) => {
  const classNames = [
    "bottom-nav",
    `bottom-nav--${type}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav
      className={classNames}
      style={styleOverride}
      aria-label="Bottom Navigation"
    >
      {items.map((item) => {
        const isSelected = item.value === value;

        const itemClassNames = [
          "bottom-nav__item",
          isSelected && "bottom-nav__item--selected",
          item.disabled && "bottom-nav__item--disabled",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <button
            key={item.value}
            className={itemClassNames}
            onClick={() => !item.disabled && onChange(item.value)}
            aria-current={isSelected ? "page" : undefined}
            aria-disabled={item.disabled}
            disabled={item.disabled}
            aria-label={item.label ?? item.value}
          >
            <span className="bottom-nav__icon-wrapper">
              <Icon
                name={item.icon}
                size={24}
                className="bottom-nav__icon"
              />
            </span>
            {type === "icon-label" && item.label && (
              <span className="bottom-nav__label">{item.label}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
