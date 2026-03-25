import React from "react";
import Badge from "../../data-display/badge/Badge";
import Divider from "../../base/divider/Divider";
import Icon, { IconName } from "../../base/icon/Icon";
import "./SideNav.scss";

// ===================
// SideNavItem
// ===================
export interface SideNavItemData {
  value: string;
  label: string;
  icon?: IconName;
  description?: string;
  badge?: string | number;
  disabled?: boolean;
}

export interface SideNavItemProps extends SideNavItemData {
  selected?: boolean;
  type?: "full" | "icon-only" | "icon-label";
  onClick?: (value: string) => void;
}

export const SideNavItem: React.FC<SideNavItemProps> = ({
  value,
  label,
  icon,
  description,
  badge,
  disabled = false,
  selected = false,
  type = "full",
  onClick,
}) => {
  const classNames = [
    "side-nav-item",
    `side-nav-item--${type}`,
    selected && "side-nav-item--selected",
    disabled && "side-nav-item--disabled",
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = () => {
    if (!disabled) onClick?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick?.(value);
    }
  };

  if (type === "icon-only") {
    return (
      <button
        className={classNames}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label={label}
        aria-current={selected ? "page" : undefined}
      >
        <span className="side-nav-item__icon-wrapper">
          {icon && (
            <Icon name={icon} size={24} className="side-nav-item__icon" />
          )}
          {badge !== undefined && (
            <span className="side-nav-item__badge-dot">
              <Badge type="dot" status="default" />
            </span>
          )}
        </span>
      </button>
    );
  }

  if (type === "icon-label") {
    return (
      <button
        className={classNames}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-current={selected ? "page" : undefined}
      >
        <span className="side-nav-item__icon-wrapper">
          {icon && (
            <Icon name={icon} size={24} className="side-nav-item__icon" />
          )}
          {badge !== undefined && (
            <span className="side-nav-item__badge-dot">
              <Badge type="dot" status="default" />
            </span>
          )}
        </span>
        <span className="side-nav-item__label">{label}</span>
      </button>
    );
  }

  // full (default)
  return (
    <button
      className={classNames}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-current={selected ? "page" : undefined}
    >
      {icon && <Icon name={icon} size={24} className="side-nav-item__icon" />}
      <div className="side-nav-item__text">
        <span className="side-nav-item__label">{label}</span>
        {description && (
          <span className="side-nav-item__description">{description}</span>
        )}
      </div>
      {badge !== undefined && (
        <Badge
          type="number"
          status="default"
          content={badge}
          styleOverride={{
            backgroundColor: "var(--bg-inverse-bolder)",
            color: "var(--text-interactive-inverse)",
          }}
        />
      )}
    </button>
  );
};

// ===================
// SideNavGroup
// ===================
export interface SideNavGroupProps {
  heading?: string;
  children: React.ReactNode;
  showDivider?: boolean;
}

export const SideNavGroup: React.FC<SideNavGroupProps> = ({
  heading,
  children,
  showDivider = true,
}) => (
  <div className="side-nav-group">
    {showDivider && <Divider size="sm" margin="xs" />}
    {heading && <div className="side-nav-group__heading">{heading}</div>}
    <div className="side-nav-group__items">{children}</div>
  </div>
);

// ===================
// SideNavGroupData
// ===================
export interface SideNavGroupData {
  heading?: string;
  items: SideNavItemData[];
}

// ===================
// SideNav (main)
// ===================
export interface SideNavProps {
  /**
   * 메뉴 그룹 배열 (heading 없이 단순 items 배열도 가능)
   */
  groups: SideNavGroupData[];
  /**
   * 현재 선택된 항목의 value (controlled)
   */
  value: string;
  /**
   * 변경 핸들러
   */
  onChange: (value: string) => void;
  /**
   * 표시 타입 (Figma 기준)
   * full: 아이콘 + 라벨 수평 (240px)
   * icon-only: 아이콘만 (48px)
   * icon-label: 아이콘 + 라벨 수직 (70px)
   */
  type?: "full" | "icon-only" | "icon-label";
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 인라인 스타일 (style prop 충돌 방지)
   */
  styleOverride?: React.CSSProperties;
}

const SideNav: React.FC<SideNavProps> = ({
  groups,
  value,
  onChange,
  type = "full",
  className = "",
  styleOverride,
}) => {
  const classNames = ["side-nav", `side-nav--${type}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <nav
      className={classNames}
      style={styleOverride}
      aria-label="Side Navigation"
    >
      {groups.map((group, groupIdx) => (
        <SideNavGroup
          key={groupIdx}
          heading={group.heading}
          showDivider={groupIdx > 0}
        >
          {group.items.map((item) => (
            <SideNavItem
              key={item.value}
              {...item}
              type={type}
              selected={item.value === value}
              onClick={onChange}
            />
          ))}
        </SideNavGroup>
      ))}
    </nav>
  );
};

export default SideNav;
