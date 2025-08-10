import React from "react";
import Avatar, { AvatarProps } from "./Avatar";
import "./AvatarGroup.scss";

export interface AvatarGroupProps {
  /**
   * 아바타 그룹 크기
   * sm: 16px
   * md: 24px
   * lg: 32px
   * xl: 48px
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * 아바타 배열 (최대 6개까지 표시, 나머지는 +N으로 표시)
   */
  avatars: Omit<AvatarProps, "size">[];
  /**
   * 최대 표시할 아바타 개수 (기본값: 6)
   */
  max?: number;
  /**
   * 더보기 버튼 클릭 핸들러
   */
  onMoreClick?: () => void;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  size = "md",
  avatars,
  max = 6,
  onMoreClick,
  className = "",
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
  const showMoreIndicator = remainingCount > 0;

  const getOverlapOffset = () => {
    switch (size) {
      case "sm":
        return "-4px";
      case "md":
        return "-6px";
      case "lg":
        return "-8px";
      case "xl":
        return "-12px";
      default:
        return "-6px";
    }
  };

  return (
    <div className={classNames}>
      {visibleAvatars.map((avatar, index) => (
        <div
          key={index}
          className="avatar-group__item"
          style={{
            marginLeft: index === 0 ? "0" : getOverlapOffset(),
            zIndex: visibleAvatars.length - index,
          }}
        >
          <Avatar
            {...avatar}
            size={size}
            className={`avatar-group__avatar ${avatar.className || ""}`}
          />
        </div>
      ))}
      
      {showMoreIndicator && (
        <div
          className="avatar-group__item avatar-group__more"
          style={{
            marginLeft: getOverlapOffset(),
            zIndex: 0,
          }}
        >
          <Avatar
            type="initial"
            size={size}
            initial={`+${remainingCount}`}
            onClick={onMoreClick}
            className="avatar-group__more-indicator"
          />
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
