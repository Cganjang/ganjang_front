import React from "react";
import Icon, { IconName } from "../icon/Icon";
import "./Chips.scss";

export interface ChipsProps {
  /**
   * 칩 텍스트
   */
  label: string;
  /**
   * 칩 종류
   * default: 선택형 칩 (leadingIcon + trailing X)
   * status: 상태 표시 칩 (아이콘 고정, trailing X 없음)
   */
  variant?: "default" | "status";
  /**
   * 상태 (variant="status"일 때 사용)
   */
  status?: "information" | "success" | "error" | "warning" | "neutral";
  /**
   * 스타일 변형 (variant="status"일 때 사용, Figma 기준)
   * filled: 배경색 채움
   * transparent: 연한 배경
   * outline: 테두리만
   */
  styleVariant?: "filled" | "transparent" | "outline";
  /**
   * 선택 상태 (variant="default"일 때)
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
   * 리딩 아이콘 이름 (Lucide Icons 기준) 또는 "avatar"
   */
  leadingIcon?: IconName | "avatar";
  /**
   * 아바타 이미지 URL (leadingIcon="avatar"일 때)
   */
  avatarSrc?: string;
  /**
   * 아바타 이니셜 (leadingIcon="avatar"일 때)
   */
  avatarInitial?: string;
  /**
   * trailing X 버튼 표시 여부 (variant="default"일 때)
   */
  showTrailingIcon?: boolean;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
  /**
   * 삭제 이벤트 핸들러 (trailing X 클릭)
   */
  onDelete?: () => void;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 인라인 스타일 (style prop 충돌 방지)
   */
  styleOverride?: React.CSSProperties;
}

const Chips: React.FC<ChipsProps> = ({
  label,
  variant = "default",
  status = "neutral",
  styleVariant = "filled",
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
  styleOverride,
}) => {
  const classNames = [
    "chips",
    `chips--${variant}`,
    variant === "status" && `chips--${status}`,
    variant === "status" && `chips--${styleVariant}`,
    selected && "chips--selected",
    disabled && "chips--disabled",
    draggable && "chips--draggable",
    onClick && !disabled && "chips--clickable",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    onDelete?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
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

    return <Icon name={leadingIcon} className="chips__leading-icon" size={16} />;
  };

  const getStatusIcon = (): IconName => {
    switch (status) {
      case "information": return "info";
      case "success":     return "check";
      case "error":       return "x-circle";
      case "warning":     return "alert-triangle";
      default:            return "check";
    }
  };

  return (
    <div
      className={classNames}
      style={styleOverride}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      aria-label={`${label} chip`}
      aria-disabled={disabled}
      aria-pressed={variant === "default" ? selected : undefined}
    >
      {variant === "status" ? (
        <Icon name={getStatusIcon()} className="chips__status-icon" size={16} />
      ) : (
        renderLeadingIcon()
      )}

      <span className="chips__label">{label}</span>

      {variant === "default" && showTrailingIcon && (
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
