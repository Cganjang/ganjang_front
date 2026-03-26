import React, { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import "./Tooltip.scss";

export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export interface TooltipProps {
  /** 툴팁 내용 */
  content: React.ReactNode;
  /** 트리거 요소 */
  children: React.ReactNode;
  /**
   * 배치 방향 (Figma Break 매핑)
   * top = Above center, top-start = Above left, top-end = Above right
   * bottom = Below center, left = Start middle, right = End middle
   */
  placement?: TooltipPlacement;
  /**
   * 스타일 (Figma: Style)
   * inverse: 어두운 배경 (#1f2937) + 흰색 텍스트
   * base: 흰색 배경 + 어두운 텍스트 + 그림자
   */
  variant?: "inverse" | "base";
  /** 화살표 표시 여부 (Figma: Break=None이면 false) */
  showArrow?: boolean;
  /** 트리거와의 간격 (px) */
  offset?: number;
  /** 지연 시간 (ms) — 표시 전 */
  enterDelay?: number;
  /** 지연 시간 (ms) — 숨기기 전 */
  leaveDelay?: number;
  /** 비활성화 */
  disabled?: boolean;
  /** 최대 너비 (Figma 기준 240px) */
  maxWidth?: number;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  styleOverride?: React.CSSProperties;
}

function getTooltipPosition(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  placement: TooltipPlacement,
  offset: number,
): { top: number; left: number } {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  let top = 0;
  let left = 0;

  const [side, align] = placement.split("-") as [string, string | undefined];

  switch (side) {
    case "top":
      top = triggerRect.top + scrollY - tooltipRect.height - offset;
      break;
    case "bottom":
      top = triggerRect.bottom + scrollY + offset;
      break;
    case "left":
      left = triggerRect.left + scrollX - tooltipRect.width - offset;
      break;
    case "right":
      left = triggerRect.right + scrollX + offset;
      break;
  }

  if (side === "top" || side === "bottom") {
    if (align === "start") {
      left = triggerRect.left + scrollX;
    } else if (align === "end") {
      left = triggerRect.right + scrollX - tooltipRect.width;
    } else {
      left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
    }
  }

  if (side === "left" || side === "right") {
    if (align === "start") {
      top = triggerRect.top + scrollY;
    } else if (align === "end") {
      top = triggerRect.bottom + scrollY - tooltipRect.height;
    } else {
      top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
    }
  }

  return { top, left };
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = "top",
  variant = "inverse",
  showArrow = true,
  offset = 8,
  enterDelay = 100,
  leaveDelay = 0,
  disabled = false,
  maxWidth = 240,
  className,
  styleOverride,
}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const enterTimer = useRef<number | null>(null);
  const leaveTimer = useRef<number | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  const clearTimers = useCallback(() => {
    if (enterTimer.current !== null) window.clearTimeout(enterTimer.current);
    if (leaveTimer.current !== null) window.clearTimeout(leaveTimer.current);
  }, []);

  const show = useCallback(() => {
    if (disabled) return;
    if (leaveTimer.current !== null) window.clearTimeout(leaveTimer.current);
    enterTimer.current = window.setTimeout(() => setVisible(true), enterDelay);
  }, [disabled, enterDelay]);

  const hide = useCallback(() => {
    if (enterTimer.current !== null) window.clearTimeout(enterTimer.current);
    leaveTimer.current = window.setTimeout(() => setVisible(false), leaveDelay);
  }, [leaveDelay]);

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    if (!visible || !triggerRef.current || !tooltipRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    setPosition(getTooltipPosition(triggerRect, tooltipRect, placement, offset));
  }, [visible, placement, offset]);

  const [side] = placement.split("-") as [string];

  const tooltipClassNames = [
    "tooltip",
    `tooltip--${variant}`,
    showArrow && "tooltip--arrow",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const arrowClass = `tooltip__arrow tooltip__arrow--${side}`;

  const [, align] = placement.split("-") as [string, string | undefined];
  const arrowAlign = align === "start" ? "tooltip__arrow--align-start" : align === "end" ? "tooltip__arrow--align-end" : "tooltip__arrow--align-center";

  return (
    <>
      <span
        ref={triggerRef}
        className="tooltip-wrapper"
        style={styleOverride}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
      </span>

      {visible &&
        createPortal(
          <span
            ref={tooltipRef}
            className={tooltipClassNames}
            role="tooltip"
            style={{
              maxWidth,
              top: position.top,
              left: position.left,
            }}
          >
            <span className="tooltip__content">{content}</span>
            {showArrow && <span className={`${arrowClass} ${arrowAlign}`} />}
          </span>,
          document.body,
        )}
    </>
  );
};

export default Tooltip;
