import React from "react";
import "./Badge.scss";

export interface BadgeProps {
  /**
   * 뱃지 타입 (Figma 기준)
   * dot: 점 인디케이터
   * number: 숫자 뱃지
   * letter: 텍스트 뱃지
   */
  type?: "dot" | "number" | "letter";
  /**
   * 뱃지 상태/색상 (Figma 기준)
   * default: 기본 (다크)
   * information: 정보 (파랑)
   * warning: 경고 (노랑)
   * success: 성공 (초록)
   * important: 중요 (빨강)
   */
  status?: "default" | "information" | "warning" | "success" | "important";
  /**
   * 표시할 내용 (number, letter 타입일 때 사용)
   */
  content?: string | number;
  /**
   * 최대 숫자 (number 타입일 때 초과 시 "N+" 형태로 표시)
   * @default 999
   */
  max?: number;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 인라인 스타일 (style prop 충돌 방지)
   */
  styleOverride?: React.CSSProperties;
}

const Badge: React.FC<BadgeProps> = ({
  type = "dot",
  status = "default",
  content,
  max = 999,
  className = "",
  styleOverride,
}) => {
  const classNames = [
    "badge",
    `badge--${type}`,
    `badge--${status}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const getDisplayContent = (): string => {
    if (type === "dot") return "";
    if (content === undefined || content === null) {
      return type === "number" ? "0" : "";
    }
    if (type === "number") {
      const num = Number(content);
      if (!isNaN(num)) {
        return num > max ? `${max}+` : num.toString();
      }
    }
    return content.toString();
  };

  const displayContent = getDisplayContent();
  const hasContent = type !== "dot" && displayContent;

  return (
    <div
      className={classNames}
      style={styleOverride}
      role="status"
      aria-label={
        type === "dot"
          ? `${status} status indicator`
          : `Badge: ${displayContent}`
      }
    >
      {hasContent && (
        <span className="badge__content">{displayContent}</span>
      )}
    </div>
  );
};

export default Badge;
