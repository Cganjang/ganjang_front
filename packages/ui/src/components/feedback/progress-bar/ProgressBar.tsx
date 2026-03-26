import React from "react";
import "./ProgressBar.scss";

export type ProgressBarType =
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "neutral";

export interface ProgressBarProps {
  /**
   * 진행률 0–100 (determinate). `indeterminate`일 때는 무시됩니다.
   */
  value?: number;
  /**
   * 무한 로딩 바 — 진행률 대신 애니메이션만 표시
   */
  indeterminate?: boolean;
  /**
   * 막대 색 의미 (Figma Status / 타입에 맞춤)
   */
  type?: ProgressBarType;
  /**
   * 높이: sm 4px, md 8px, lg 12px
   */
  size?: "sm" | "md" | "lg";
  /**
   * 오른쪽에 퍼센트 텍스트 표시 (indeterminate에서는 숨김)
   */
  showValue?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  styleOverride?: React.CSSProperties;
  /** 접근성 라벨 (스크린 리더) */
  "aria-label"?: string;
}

function clampPercent(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.min(100, Math.max(0, n));
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 0,
  indeterminate = false,
  type = "primary",
  size = "md",
  showValue = false,
  className,
  styleOverride,
  "aria-label": ariaLabel = "진행 상태",
}) => {
  const percent = indeterminate ? undefined : clampPercent(value);

  const classNames = [
    "progress-bar",
    `progress-bar--${size}`,
    `progress-bar--${type}`,
    indeterminate && "progress-bar--indeterminate",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classNames}
      style={styleOverride}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={indeterminate ? undefined : 0}
      aria-valuemax={indeterminate ? undefined : 100}
      aria-valuenow={indeterminate ? undefined : percent}
      aria-valuetext={
        indeterminate ? undefined : `${Math.round(percent ?? 0)}% 완료`
      }
      aria-busy={indeterminate ? true : undefined}
    >
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={
            indeterminate || percent === undefined
              ? undefined
              : { width: `${percent}%` }
          }
        />
      </div>
      {showValue && !indeterminate && (
        <span className="progress-bar__value" aria-hidden="true">
          {Math.round(percent ?? 0)}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
