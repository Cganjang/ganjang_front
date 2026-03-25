import React, { useState } from "react";
import Icon, { IconName } from "@ui/components/base/icon/Icon";
import "./Avatar.scss";

export interface AvatarProps {
  /**
   * 아바타 타입
   * initial: 이니셜 문자 표시
   * profile: 프로필 이미지 표시
   * icon: 아이콘 표시
   */
  type?: "initial" | "profile" | "icon";
  /**
   * 아바타 크기
   * sm: 16px, md: 24px, lg: 32px, xl: 48px
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * 이니셜 텍스트 (type이 'initial'일 때 사용, 또는 이미지 로드 실패 시 폴백)
   */
  initial?: string;
  /**
   * 프로필 이미지 URL (type이 'profile'일 때 사용)
   */
  src?: string;
  /**
   * 이미지 alt 텍스트
   */
  alt?: string;
  /**
   * 아이콘 이름 (type이 'icon'일 때 사용, Lucide Icons 기준)
   */
  iconName?: IconName;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 인라인 스타일 (style prop 충돌 방지)
   */
  styleOverride?: React.CSSProperties;
}

const Avatar: React.FC<AvatarProps> = ({
  type = "initial",
  size = "md",
  initial = "U",
  src,
  alt,
  iconName = "user",
  onClick,
  className = "",
  styleOverride,
}) => {
  const [imgError, setImgError] = useState(false);

  const classNames = [
    "avatar",
    `avatar--${type === "profile" && imgError ? "initial" : type}`,
    `avatar--${size}`,
    onClick && "avatar--clickable",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = () => {
    onClick?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick();
    }
  };

  const iconSize =
    size === "sm" ? 10 : size === "md" ? 12 : size === "lg" ? 16 : 20;

  const renderContent = () => {
    switch (type) {
      case "profile":
        return imgError ? (
          <span className="avatar__initial">
            {initial.charAt(0).toUpperCase()}
          </span>
        ) : (
          <img
            src={src}
            alt={alt || "Profile"}
            className="avatar__image"
            onError={() => setImgError(true)}
          />
        );
      case "icon":
        return (
          <Icon
            name={iconName}
            className="avatar__icon"
            size={iconSize}
          />
        );
      case "initial":
      default:
        return (
          <span className="avatar__initial">
            {initial.charAt(0).toUpperCase()}
          </span>
        );
    }
  };

  return (
    <div
      className={classNames}
      style={styleOverride}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={alt || `Avatar ${type}`}
    >
      {renderContent()}
    </div>
  );
};

export default Avatar;
