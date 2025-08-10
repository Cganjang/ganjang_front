import React from "react";
import Icon, { IconName } from "../icon/Icon";
import "./Chips.scss";

export interface ChipsProps {
  /**
   * 칩 텍스트
   */
  label: string;
  /**
   * 칩 타입
   */
  variant?: "default" | "status";
  /**
   * 상태 (status variant일 때만 사용)
   */
  status?: "information" | "success" | "error" | "warning" | "neutral";
  /**
   * 스타일 타입
   */
  style?: "transparent" | "filled" | "outline";
  /**
   * 선택 상태
   */
  selected?: boolean;
  /**
   * 비활성 상태
   */
  disabled?: boolean;
  /**
   * 드래그 가능 여부
   */
  draggable?: boolean;
  /**
   * 리딩 아이콘
   */
  leadingIcon?: IconName | "avatar";
  /**
   * 아바타 이미지 URL (leadingIcon이 "avatar"일 때)
   */
  avatarSrc?: string;
  /**
   * 아바타 이니셜 (leadingIcon이 "avatar"일 때)
   */
  avatarInitial?: string;
  /**
   * 트레일링 아이콘 표시 여부
   */
  showTrailingIcon?: boolean;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
  /**
   * 삭제 이벤트 핸들러
   */
  onDelete?: () => void;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

const Chips: React.FC<ChipsProps> = ({
  label,
  variant = "default",
  status = "neutral",
  style = "filled",
  selected = false,
  disabled = false,
  draggable = false,
  leadingIcon,
  avatarSrc,
  avatarInitial = "U",
  showTrailingIcon = true,
  onClick,
  onDelete,
  className = "",
}) => {
  const classNames = [
    "chips",
    `chips--${variant}`,
    variant === "status" && `chips--${status}`,
    `chips--${style}`,
    selected && "chips--selected",
    disabled && "chips--disabled",
    draggable && "chips--draggable",
    onClick && "chips--clickable",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    if (onClick) {
      onClick();
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    if (onDelete) {
      onDelete();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;
    if (onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick();
    }
  };

  const renderLeadingIcon = () => {
    if (!leadingIcon) return null;

    if (leadingIcon === "avatar") {
      return (
        <div className="chips__avatar">
          {avatarSrc ? (
            <img src={avatarSrc} alt="Avatar" className="chips__avatar-image" />
          ) : (
            <span className="chips__avatar-initial">
              {avatarInitial.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      );
    }

    return (
      <Icon name={leadingIcon} className="chips__leading-icon" size={16} />
    );
  };

  const getStatusIcon = (): IconName => {
    switch (status) {
      case "information":
        return "info";
      case "success":
        return "check";
      case "error":
        return "x-circle";
      case "warning":
        return "alert-triangle";
      default:
        return "check";
    }
  };

  return (
    <div
      className={classNames}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      aria-label={`${label} chip`}
      aria-disabled={disabled}
      aria-pressed={selected}
    >
      {variant === "status" ? (
        <Icon name={getStatusIcon()} className="chips__status-icon" size={16} />
      ) : (
        renderLeadingIcon()
      )}

      <span className="chips__label">{label}</span>

      {showTrailingIcon && (
        <button
          className="chips__trailing-button"
          onClick={handleDelete}
          disabled={disabled}
          aria-label="Remove chip"
          tabIndex={-1}
        >
          <Icon name="x" className="chips__trailing-icon" size={16} />
        </button>
      )}
    </div>
  );
};

export default Chips;
