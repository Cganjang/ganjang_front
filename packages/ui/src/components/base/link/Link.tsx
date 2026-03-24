import React from "react";
import Icon, { IconName } from "../icon/Icon";
import "./Link.scss";

export interface LinkProps {
  /**
   * 링크 텍스트
   */
  children: React.ReactNode;
  /**
   * 링크 URL
   */
  href?: string;
  /**
   * 링크 타입 (Figma 기준)
   * primary: 파란색 계열
   * secondary: 회색 계열
   */
  variant?: "primary" | "secondary";
  /**
   * 링크 스타일 (Figma 기준)
   * underline: 밑줄 표시
   * standalone: 밑줄 없음, 배경 hover 효과
   */
  linkStyle?: "underline" | "standalone";
  /**
   * 리딩 아이콘 이름 (Lucide Icons 기준)
   */
  leadingIcon?: IconName;
  /**
   * 트레일링 아이콘 이름 (Lucide Icons 기준)
   */
  trailingIcon?: IconName;
  /**
   * 비활성 상태
   */
  disabled?: boolean;
  /**
   * 새 탭에서 열기
   */
  target?: "_blank" | "_self" | "_parent" | "_top";
  /**
   * rel 속성 (_blank일 때 자동으로 noopener noreferrer 적용)
   */
  rel?: string;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 인라인 스타일 (style prop 충돌 방지)
   */
  styleOverride?: React.CSSProperties;
}

const Link: React.FC<LinkProps> = ({
  children,
  href,
  variant = "primary",
  linkStyle = "underline",
  leadingIcon,
  trailingIcon,
  disabled = false,
  target,
  rel,
  onClick,
  className = "",
  styleOverride,
}) => {
  const classNames = [
    "link",
    `link--${variant}`,
    `link--${linkStyle}`,
    disabled && "link--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <a
      className={classNames}
      style={styleOverride}
      href={disabled ? undefined : href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : rel}
      onClick={handleClick}
      aria-disabled={disabled}
    >
      {leadingIcon && (
        <Icon name={leadingIcon} className="link__leading-icon" size={16} />
      )}
      <span className="link__content">{children}</span>
      {trailingIcon && (
        <Icon name={trailingIcon} className="link__trailing-icon" size={16} />
      )}
    </a>
  );
};

export default Link;
