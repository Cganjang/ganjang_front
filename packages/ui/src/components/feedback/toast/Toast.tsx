import React, { useEffect } from "react";
import Icon from "@ui/components/base/icon/Icon";
import "./Toast.scss";

export type ToastStatus = "success" | "error" | "warning" | "info";

/**
 * Toast 컴포넌트의 Props 인터페이스
 */
export interface ToastProps {
  /** 표시 여부 */
  isVisible?: boolean;
  /** 알림 유형 */
  status?: ToastStatus;
  /** 제목 */
  title: string;
  /** 설명 (선택) */
  description?: string;
  /** 자동 닫힘 시간 (ms, 0이면 자동 닫힘 없음) */
  duration?: number;
  /** 닫기 콜백 */
  onClose?: () => void;
  /** 닫기 버튼 표시 */
  showCloseButton?: boolean;
  /** 추가 className */
  className?: string;
  /** 인라인 스타일 */
  styleOverride?: React.CSSProperties;
}

/**
 * Toast 컴포넌트
 * 사용자에게 일시적인 알림을 표시합니다.
 */
const Toast: React.FC<ToastProps> = ({
  isVisible = true,
  status = "info",
  title,
  description,
  duration = 5000,
  onClose,
  showCloseButton = true,
  className,
  styleOverride,
}) => {
  useEffect(() => {
    if (!isVisible || duration <= 0) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const iconMap: Record<ToastStatus, string> = {
    success: "check-circle",
    error: "x-circle",
    warning: "alert-triangle",
    info: "info",
  };

  const toastClasses = [
    "toast",
    `toast--${status}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={toastClasses} style={styleOverride} role="alert">
      <Icon
        name={iconMap[status]}
        size={20}
        className="toast__icon"
        aria-hidden="true"
      />
      <div className="toast__content">
        <div className="toast__title">{title}</div>
        {description && (
          <div className="toast__description">{description}</div>
        )}
      </div>
      {showCloseButton && (
        <button
          className="toast__close-button"
          onClick={onClose}
          aria-label="닫기"
          type="button"
        >
          <Icon name="x" size={20} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default Toast;
