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
   * 링크 타입
   */
  variant?: "primary" | "secondary";
  /**
   * 링크 스타일
   */
  linkStyle?: "underline" | "standalone";
  /**
   * 리딩 아이콘
   */
  leadingIcon?: IconName;
  /**
   * 트레일링 아이콘
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
   * rel 속성
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
   * 인라인 스타일
   */
  style?: React.CSSProperties;
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
  ...props
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

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    if (onClick) {
      onClick(event);
    }
  };

  const linkProps = {
    className: classNames,
    onClick: handleClick,
    href: disabled ? undefined : href,
    target,
    rel: target === "_blank" ? "noopener noreferrer" : rel,
    "aria-disabled": disabled,
    ...props,
  };

  return (
    <a {...linkProps}>
      {leadingIcon && (
        <Icon
          name={leadingIcon}
          className="link__leading-icon"
          size={24}
        />
      )}
      
      <span className="link__content">
        {children}
      </span>
      
      {trailingIcon && (
        <Icon
          name={trailingIcon}
          className="link__trailing-icon"
          size={24}
        />
      )}
    </a>
  );
};

export default Link;