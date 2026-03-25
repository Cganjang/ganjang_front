import React from "react";
import Icon from "../../base/icon/Icon";
import Avatar from "../../data-display/avatar/Avatar";
import Badge from "../../data-display/badge/Badge";
import "./Header.scss";

// ===================
// NavItem (navigation 타입)
// ===================
export interface HeaderNavItem {
  value: string;
  label: string;
  /** 서브메뉴 여부 — chevron-down 표시, 추후 드롭다운 컴포넌트로 교체 */
  hasSubmenu?: boolean;
  disabled?: boolean;
}

// ===================
// Header Props
// ===================
export interface HeaderProps {
  /**
   * 좌측 로고 영역 (ReactNode로 커스텀 가능)
   * 미제공 시 기본 W 로고 표시
   */
  logo?: React.ReactNode;
  /**
   * 중앙 네비게이션 항목 배열
   */
  navItems?: HeaderNavItem[];
  /**
   * 현재 선택된 nav value
   */
  activeNav?: string;
  /**
   * 네비게이션 변경 핸들러
   */
  onNavChange?: (value: string) => void;
  /**
   * 서브메뉴 클릭 핸들러 (추후 드롭다운으로 교체)
   */
  onSubmenuClick?: (value: string) => void;
  /**
   * 검색 클릭 핸들러
   */
  onSearch?: () => void;
  /**
   * 알림 클릭 핸들러
   */
  onNotification?: () => void;
  /**
   * 알림 dot 표시 여부
   */
  hasNotification?: boolean;
  /**
   * 유저 아바타 클릭 핸들러
   */
  onUser?: () => void;
  /**
   * 유저 프로필 이미지 URL
   */
  userSrc?: string;
  /**
   * 설정 클릭 핸들러
   */
  onSetting?: () => void;
  /**
   * 도움말 클릭 핸들러
   */
  onHelp?: () => void;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 인라인 스타일 (style prop 충돌 방지)
   */
  styleOverride?: React.CSSProperties;
}

// ===================
// 기본 Logo
// ===================
const DefaultLogo: React.FC = () => (
  <div className="header__logo">
    <div className="header__logo-box">
      <span className="header__logo-text">W</span>
    </div>
  </div>
);

// ===================
// Header
// ===================
const Header: React.FC<HeaderProps> = ({
  logo,
  navItems = [],
  activeNav,
  onNavChange,
  onSubmenuClick,
  onSearch,
  onNotification,
  hasNotification = false,
  onUser,
  userSrc,
  onSetting,
  onHelp,
  className = "",
  styleOverride,
}) => {
  const classNames = ["header", className].filter(Boolean).join(" ");

  const getNavItemClass = (item: HeaderNavItem) => [
    "header__nav-item",
    activeNav === item.value && "header__nav-item--selected",
    item.disabled && "header__nav-item--disabled",
  ]
    .filter(Boolean)
    .join(" ");

  const getFunctionItemClass = (isSelected = false) => [
    "header__fn-item",
    isSelected && "header__fn-item--selected",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classNames} style={styleOverride}>
      {/* 로고 */}
      <div className="header__leading">
        {logo ?? <DefaultLogo />}
      </div>

      {/* 네비게이션 */}
      <nav className="header__nav" aria-label="Main Navigation">
        {navItems.map((item) => (
          <button
            key={item.value}
            className={getNavItemClass(item)}
            disabled={item.disabled}
            aria-current={activeNav === item.value ? "page" : undefined}
            onClick={() => {
              if (item.hasSubmenu) {
                onSubmenuClick?.(item.value);
              } else {
                onNavChange?.(item.value);
              }
            }}
          >
            <span className="header__nav-item-inner">
              <span className="header__nav-label">{item.label}</span>
              {item.hasSubmenu && (
                <Icon name="chevron-down" size={16} className="header__nav-chevron" />
              )}
            </span>
          </button>
        ))}
      </nav>

      {/* 우측 기능 버튼 */}
      <div className="header__function">
        {/* Search */}
        <button
          className={getFunctionItemClass()}
          onClick={onSearch}
          aria-label="검색"
        >
          <Icon name="search" size={24} />
        </button>

        {/* Notification */}
        <button
          className={getFunctionItemClass()}
          onClick={onNotification}
          aria-label="알림"
          style={{ position: "relative" }}
        >
          <Icon name="bell" size={24} />
          {hasNotification && (
            <span className="header__notification-dot">
              <Badge type="dot" status="default" />
            </span>
          )}
        </button>

        {/* User */}
        <button
          className={getFunctionItemClass()}
          onClick={onUser}
          aria-label="사용자 메뉴"
        >
          <Avatar
            type={userSrc ? "profile" : "initial"}
            size="md"
            src={userSrc}
            initial="U"
            alt="User"
          />
        </button>

        {/* Settings */}
        <button
          className={getFunctionItemClass()}
          onClick={onSetting}
          aria-label="설정"
        >
          <Icon name="settings" size={24} />
        </button>

        {/* Help */}
        <button
          className={getFunctionItemClass()}
          onClick={onHelp}
          aria-label="도움말"
        >
          <Icon name="help-circle" size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
