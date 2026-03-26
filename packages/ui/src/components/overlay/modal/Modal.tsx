import React, { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import Icon from "@ui/components/base/icon/Icon";
import "./Modal.scss";

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  );
}

export interface ModalProps {
  /** 표시 여부 */
  open: boolean;
  /** 닫기 (배경·닫기 버튼·Esc) */
  onClose: () => void;
  /** 헤더 제목 — 없으면 `aria-label` 사용 */
  title?: React.ReactNode;
  /** 본문 */
  children: React.ReactNode;
  /** 하단 액션 영역 (버튼 등) */
  footer?: React.ReactNode;
  /** 패널 최대 너비 */
  size?: "sm" | "md" | "lg" | "xl";
  /** 배경 클릭 시 닫기 */
  closeOnBackdrop?: boolean;
  /** Esc 시 닫기 */
  closeOnEscape?: boolean;
  /** 헤더 우측 X 버튼 */
  showCloseButton?: boolean;
  /** 추가 CSS 클래스 (루트 래퍼) */
  className?: string;
  /** 인라인 스타일 (루트 래퍼) */
  styleOverride?: React.CSSProperties;
  /** `title` 없을 때 dialog 라벨 */
  "aria-label"?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
  styleOverride,
  "aria-label": ariaLabel = "대화상자",
}) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  const rootClassNames = [
    "modal",
    `modal--${size}`,
    !(title || showCloseButton) && "modal--no-header",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const frame = window.requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const list = getFocusableElements(panel);
      if (list.length > 0) {
        list[0].focus();
      } else {
        panel.focus();
      }
    });
    return () => {
      window.cancelAnimationFrame(frame);
      previous?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

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

  const handlePanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;
    const list = getFocusableElements(panel);
    if (list.length === 0) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className={rootClassNames} style={styleOverride}>
      <button
        type="button"
        className="modal__backdrop"
        aria-hidden="true"
        tabIndex={-1}
        onClick={handleBackdropClick}
      />
      <div
        ref={panelRef}
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : ariaLabel}
        tabIndex={-1}
        onKeyDown={handlePanelKeyDown}
      >
        {(title || showCloseButton) && (
          <div
            className={[
              "modal__header",
              title ? "" : "modal__header--close-only",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {title ? (
              <h2 className="modal__title" id={titleId}>
                {title}
              </h2>
            ) : null}
            {showCloseButton && (
              <button
                type="button"
                className="modal__close"
                onClick={handleClose}
                aria-label="닫기"
              >
                <Icon name="x" size={24} />
              </button>
            )}
          </div>
        )}
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
