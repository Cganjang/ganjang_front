import React from "react";
import Icon from "@ui/components/base/icon/Icon";
import "./Alert.scss";

export type AlertStatus =
  | "information"
  | "error"
  | "warning"
  | "success"
  | "brand"
  | "neutral";

export type AlertVariant = "filled" | "outline" | "transparent";

export interface AlertProps {
  /** 알림 유형 (Figma: Status) */
  status?: AlertStatus;
  /** 시각적 스타일 (Figma: Style) */
  variant?: AlertVariant;
  /** 제목 (Figma: Label / Title) */
  title: string;
  /** 설명 (Figma: Description) */
  description?: string;
  /** 설명 표시 여부 */
  showDescription?: boolean;
  /** 닫기 버튼 표시 — transparent는 기본 false (Figma) */
  closable?: boolean;
  /** 닫기 클릭 */
  onClose?: () => void;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  styleOverride?: React.CSSProperties;
}

const statusIcon: Record<AlertStatus, string> = {
  information: "info",
  error: "circle-x",
  warning: "alert-triangle",
  success: "check",
  brand: "inbox",
  neutral: "inbox",
};

const Alert: React.FC<AlertProps> = ({
  status = "information",
  variant = "filled",
  title,
  description,
  showDescription = true,
  closable,
  onClose,
  className,
  styleOverride,
}) => {
  const showClose =
    Boolean(onClose) && (closable ?? variant !== "transparent");

  const classNames = [
    "alert",
    `alert--${variant}`,
    `alert--${status}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.();
  };

  const iconName = statusIcon[status];

  return (
    <div
      className={classNames}
      style={styleOverride}
      role="alert"
    >
      <div className="alert__main">
        <span className="alert__icon" aria-hidden="true">
          <Icon name={iconName} size={24} />
        </span>
        <div className="alert__text">
          <p className="alert__title">{title}</p>
          {showDescription && description && (
            <p className="alert__description">{description}</p>
          )}
        </div>
      </div>
      {showClose && (
        <button
          type="button"
          className="alert__close"
          onClick={handleClose}
          aria-label="닫기"
        >
          <Icon name="x" size={24} />
        </button>
      )}
    </div>
  );
};

export default Alert;
