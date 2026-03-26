import React from "react";
import "./Card.scss";

export interface CardProps {
  /**
   * 레이아웃 방향 (Figma: Direction)
   * vertical: 이미지 위, 콘텐츠 아래 (300px)
   * horizontal: 이미지 왼쪽, 콘텐츠 오른쪽
   */
  direction?: "vertical" | "horizontal";
  /** 이미지 URL */
  imageSrc?: string;
  /** 이미지 alt 텍스트 */
  imageAlt?: string;
  /** 제목 (Figma: Headline, 20px semibold) */
  headline: string;
  /** 부제목 (Figma: Sub Headline, 16px semibold) */
  subHeadline?: string;
  /** 설명 텍스트 (Figma: Description, 14px medium) */
  description?: string;
  /** 하단 액션 영역 (Button 등) */
  footer?: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  styleOverride?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({
  direction = "vertical",
  imageSrc,
  imageAlt = "",
  headline,
  subHeadline,
  description,
  footer,
  className,
  styleOverride,
}) => {
  const classNames = [
    "card",
    `card--${direction}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} style={styleOverride}>
      {imageSrc && (
        <div className="card__image">
          <img src={imageSrc} alt={imageAlt} />
        </div>
      )}

      <div className="card__content">
        <div className="card__text">
          <div className="card__headline-group">
            <h3 className="card__headline">{headline}</h3>
            {subHeadline && (
              <p className="card__sub-headline">{subHeadline}</p>
            )}
          </div>
          {description && (
            <p className="card__description">{description}</p>
          )}
        </div>
        {footer && <div className="card__footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Card;
