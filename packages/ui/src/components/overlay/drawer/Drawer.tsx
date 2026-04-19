import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Icon from "@ui/components/base/icon/Icon";
import "./Drawer.scss";

export type DrawerPosition = "left" | "right" | "top" | "bottom";

export interface DrawerProps {
  /** 열림 여부 */
  open: boolean;
  /** 닫기 콜백 */
  onClose: () => void;
  /** 패널 위치 */
  position?: DrawerPosition;
  /** 헤더 제목 */
  title?: React.ReactNode;
  /** 본문 */
  children: React.ReactNode;
  /** 하단 액션 영역 */
  footer?: React.ReactNode;
  /** 패널 너비 (left/right) 또는 높이 (top/bottom) */
  size?: string;
  /** 배경 클릭 시 닫기 */
  closeOnBackdrop?: boolean;
  /** Esc 키로 닫기 */
  closeOnEscape?: boolean;
  /** 닫기 버튼 표시 */
  showCloseButton?: boolean;
  /** 추가 CSS 클래스 (루트 래퍼) */
  className?: string;
  /** 인라인 스타일 (루트 래퍼) */
  styleOverride?: React.CSSProperties;
}

const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  position = "left",
  title,
  children,
  footer,
  size,
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
  styleOverride,
}) => {
  const rootClassNames = [
    "drawer",
    `drawer--${position}`,
    open && "drawer--open",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const panelStyle: React.CSSProperties = {};
  if (size) {
    if (position === "left" || position === "right") {
      panelStyle.width = size;
    } else {
      panelStyle.height = size;
    }
  }

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeOnEscape, handleClose]);

  const handleBackdropClick = () => {
    if (closeOnBackdrop) handleClose();
  };

  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className={rootClassNames} style={styleOverride}>
      <button
        type="button"
        className="drawer__backdrop"
        aria-hidden="true"
        tabIndex={-1}
        onClick={handleBackdropClick}
      />
      <div className="drawer__panel" style={panelStyle}>
        {(title || showCloseButton) && (
          <div className="drawer__header">
            {title ? (
              <h2 className="drawer__title">{title}</h2>
            ) : null}
            {showCloseButton && (
              <button
                type="button"
                className="drawer__close"
                onClick={handleClose}
                aria-label="닫기"
              >
                <Icon name="x" size={24} />
              </button>
            )}
          </div>
        )}
        <div className="drawer__body">{children}</div>
        {footer && <div className="drawer__footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
};

export default Drawer;
