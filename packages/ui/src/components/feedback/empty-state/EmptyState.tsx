import React from "react";
import Icon from "@ui/components/base/icon/Icon";
import Button from "@ui/components/base/button/Button";
import "./EmptyState.scss";

export interface EmptyStateAction {
  /** 버튼 텍스트 */
  label: string;
  /** 버튼 클릭 핸들러 */
  onClick: () => void;
  /** 버튼 스타일 */
  variant?: "filled" | "outline";
}

export interface EmptyStateProps {
  /** Lucide 아이콘 이름 (선택) — 기본값: inbox */
  icon?: string;
  /** 제목 */
  title: string;
  /** 설명 (선택) */
  description?: string;
  /** 액션 버튼 (선택) */
  action?: EmptyStateAction;
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  styleOverride?: React.CSSProperties;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "inbox",
  title,
  description,
  action,
  size = "md",
  className,
  styleOverride,
}) => {
  const classNames = [
    "empty-state",
    `empty-state--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classNames}
      style={styleOverride}
    >
      <div className="empty-state__icon" aria-hidden="true">
        <Icon name={icon} size="lg" color="var(--icon-disabled)" />
      </div>
      <h2 className="empty-state__title">{title}</h2>
      {description && (
        <p className="empty-state__description">{description}</p>
      )}
      {action && (
        <div className="empty-state__action">
          <Button
            variant={action.variant || "filled"}
            type="primary"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
