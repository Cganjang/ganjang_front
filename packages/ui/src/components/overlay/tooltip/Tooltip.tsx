import React, { useState, useRef, useCallback, useEffect } from "react";
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

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = "top",
  variant = "inverse",
  showArrow = true,
  offset = 6,
  enterDelay = 100,
  leaveDelay = 0,
  disabled = false,
  maxWidth = 240,
  className,
  styleOverride,
}) => {
  const [visible, setVisible] = useState(false);
  const enterTimer = useRef<number | null>(null);
  const leaveTimer = useRef<number | null>(null);

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

  const [side] = placement.split("-") as [string];

  const wrapperClassNames = ["tooltip-wrapper", className]
    .filter(Boolean)
    .join(" ");

  const tooltipClassNames = [
    "tooltip",
    `tooltip--${variant}`,
    `tooltip--${placement}`,
    showArrow && "tooltip--arrow",
  ]
    .filter(Boolean)
    .join(" ");

  const arrowClass = `tooltip__arrow tooltip__arrow--${side}`;

  return (
    <span
      className={wrapperClassNames}
      style={styleOverride}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      {visible && (
        <span
          className={tooltipClassNames}
          role="tooltip"
          style={{
            maxWidth,
            ["--tooltip-offset" as string]: `${offset}px`,
          }}
        >
          <span className="tooltip__content">{content}</span>
          {showArrow && <span className={arrowClass} />}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
