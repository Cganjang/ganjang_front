import React from "react";
import Icon, { IconName } from "../../base/icon/Icon";
import "./Breadcrumbs.scss";

export interface BreadcrumbItem {
  /** 표시 텍스트 */
  label: string;
  /**
   * 이전 단계 링크 URL — 마지막 항목은 보통 생략(현재 페이지).
   * 마지막이 아닌 항목에 `href`가 없으면 링크 대신 텍스트로만 표시됩니다.
   */
  href?: string;
  /** Lucide 아이콘 이름 (선택) */
  icon?: IconName;
}

export interface BreadcrumbsProps {
  /** 경로 항목 (순서대로, 마지막이 현재 페이지) */
  items: BreadcrumbItem[];
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  styleOverride?: React.CSSProperties;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className,
  styleOverride,
}) => {
  const rootClass = ["breadcrumbs", className].filter(Boolean).join(" ");

  return (
    <nav
      className={rootClass}
      style={styleOverride}
      aria-label="breadcrumb"
    >
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const showLink = Boolean(item.href) && !isLast;

          return (
            <li key={`${item.label}-${index}`} className="breadcrumbs__segment">
              {item.icon ? (
                <span className="breadcrumbs__icon" aria-hidden="true">
                  <Icon name={item.icon} size={24} />
                </span>
              ) : null}
              {isLast ? (
                <span className="breadcrumbs__current" aria-current="page">
                  {item.label}
                </span>
              ) : showLink ? (
                <a className="breadcrumbs__link" href={item.href}>
                  {item.label}
                </a>
              ) : (
                <span className="breadcrumbs__text">{item.label}</span>
              )}
              {!isLast ? (
                <span className="breadcrumbs__separator" aria-hidden="true">
                  <Icon name="chevron-right" size={24} />
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
