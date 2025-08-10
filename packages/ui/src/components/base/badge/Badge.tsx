import React from "react";
import "./Badge.scss";

export interface BadgeProps {
  /**
   * 뱃지 타입
   */
  type?: "dot" | "number" | "letter";
  /**
   * 뱃지 상태/색상
   */
  status?: "default" | "information" | "warning" | "success" | "important";
  /**
   * 표시할 내용 (number, letter 타입일 때 사용)
   */
  content?: string | number;
  /**
   * 최대 숫자 (number 타입일 때 이 값을 초과하면 "99+" 형태로 표시)
   */
  max?: number;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 인라인 스타일
   */
  style?: React.CSSProperties;
}

const Badge: React.FC<BadgeProps> = ({
  type = "dot",
  status = "default",
  content,
  max = 99,
  className = "",
  style,
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

    if (type === "number" && typeof content === "number") {
      return content > max ? `${max}+` : content.toString();
    }

    return content.toString();
  };

  const displayContent = getDisplayContent();
  const hasContent = type !== "dot" && displayContent;

  return (
    <div
      className={classNames}
      style={style}
      role="status"
      aria-label={
        type === "dot" 
          ? `${status} status indicator`
          : `Badge: ${displayContent}`
      }
    >
      {hasContent && (
        <span className="badge__content">
          {displayContent}
        </span>
      )}
    </div>
  );
};

export default Badge;