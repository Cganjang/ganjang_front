import React from "react";
import Avatar, { AvatarProps } from "@ui/components/data-display/avatar/Avatar";
import "./AvatarGroup.scss";

export interface AvatarGroupProps {
  /**
   * 아바타 그룹 크기
   * sm: 16px, md: 24px, lg: 32px, xl: 48px
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * 아바타 배열
   */
  avatars: Omit<AvatarProps, "size">[];
  /**
   * 최대 표시할 아바타 개수 (기본값: 6)
   * 초과 시 More Indicator로 표시
   */
  max?: number;
  /**
   * More Indicator 클릭 핸들러
   */
  onMoreClick?: () => void;
  /**
   * More Indicator 비활성화 여부
   */
  moreDisabled?: boolean;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 인라인 스타일 (style prop 충돌 방지)
   */
  styleOverride?: React.CSSProperties;
}

// Figma 계산 기준 overlap 값
// (avatarSize * N + moreIndicator - totalWidth) / (N) 으로 역산
const OVERLAP: Record<string, number> = {
  sm: 4,   // 16px 기준
  md: 8,   // 24px 기준
  lg: 10,  // 32px 기준
  xl: 18,  // 48px 기준
};

// More Indicator 폰트 크기
const MORE_FONT_SIZE: Record<string, string> = {
  sm: "7px",
  md: "10px",
  lg: "11px",
  xl: "14px",
};

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  size = "md",
  avatars,
  max = 6,
  onMoreClick,
  moreDisabled = false,
  className = "",
  styleOverride,
}) => {
  const classNames = [
    "avatar-group",
    `avatar-group--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;
  const showMore = remainingCount > 0;
  const overlap = OVERLAP[size];

  const handleMoreKeyDown = (e: React.KeyboardEvent) => {
    if (moreDisabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onMoreClick?.();
    }
  };

  return (
    <div className={classNames} style={styleOverride}>
      {visibleAvatars.map((avatar, index) => (
        <div
          key={index}
          className="avatar-group__item"
          style={{ marginLeft: index === 0 ? 0 : -overlap }}
        >
          <Avatar
            {...avatar}
            size={size}
            className="avatar-group__avatar"
          />
        </div>
      ))}

      {showMore && (
        <div
          className={[
            "avatar-group__item",
            "avatar-group__more",
            moreDisabled && "avatar-group__more--disabled",
            onMoreClick && !moreDisabled && "avatar-group__more--clickable",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ marginLeft: -overlap }}
          onClick={!moreDisabled ? onMoreClick : undefined}
          onKeyDown={handleMoreKeyDown}
          role={onMoreClick && !moreDisabled ? "button" : undefined}
          tabIndex={onMoreClick && !moreDisabled ? 0 : undefined}
          aria-label={`${remainingCount}명 더 보기`}
          aria-disabled={moreDisabled}
        >
          <span
            className="avatar-group__more-label"
            style={{ fontSize: MORE_FONT_SIZE[size] }}
          >
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
