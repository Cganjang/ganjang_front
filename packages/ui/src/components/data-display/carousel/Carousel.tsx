import React, { useState, useCallback, useEffect } from "react";
import Icon from "../../base/icon/Icon";
import "./Carousel.scss";

export interface CarouselSlide {
  /** 슬라이드 고유 key */
  key: string;
  /** 슬라이드 콘텐츠 */
  content: React.ReactNode;
}

export interface CarouselProps {
  /**
   * 슬라이드 배열
   */
  slides: CarouselSlide[];
  /**
   * 초기 슬라이드 인덱스 (0-based)
   * @default 0
   */
  defaultIndex?: number;
  /**
   * 화살표 크기 (Figma 기준)
   * sm: 32px, lg: 40px
   * @default "sm"
   */
  arrowSize?: "sm" | "lg";
  /**
   * 자동 슬라이드 (ms 단위, 0이면 비활성)
   * @default 0
   */
  autoPlay?: number;
  /**
   * 인디케이터(dot) 표시 여부
   * @default true
   */
  showIndicator?: boolean;
  /**
   * 화살표 표시 여부
   * @default true
   */
  showArrows?: boolean;
  /**
   * 슬라이드 변경 핸들러
   */
  onChange?: (index: number) => void;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 인라인 스타일 (style prop 충돌 방지)
   */
  styleOverride?: React.CSSProperties;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  defaultIndex = 0,
  arrowSize = "sm",
  autoPlay = 0,
  showIndicator = true,
  showArrows = true,
  onChange,
  className = "",
  styleOverride,
}) => {
  const [current, setCurrent] = useState(defaultIndex);

  const goTo = useCallback(
    (index: number) => {
      const next = (index + slides.length) % slides.length;
      setCurrent(next);
      onChange?.(next);
    },
    [slides.length, onChange]
  );

  const goPrev = () => goTo(current - 1);
  const goNext = () => goTo(current + 1);

  // 자동 슬라이드
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => goTo(current + 1), autoPlay);
    return () => clearInterval(timer);
  }, [autoPlay, current, goTo]);

  const classNames = ["carousel", className].filter(Boolean).join(" ");
  const isFirst = current === 0;
  const isLast = current === slides.length - 1;

  return (
    <div className={classNames} style={styleOverride} aria-roledescription="carousel">
      {/* 슬라이드 트랙 */}
      <div className="carousel__track">
        {slides.map((slide, idx) => (
          <div
            key={slide.key}
            className={[
              "carousel__slide",
              idx === current && "carousel__slide--active",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden={idx !== current}
            role="group"
            aria-roledescription="slide"
            aria-label={`${idx + 1} / ${slides.length}`}
          >
            {slide.content}
          </div>
        ))}
      </div>

      {/* 이전 화살표 */}
      {showArrows && (
        <button
          className={[
            "carousel__arrow",
            "carousel__arrow--prev",
            `carousel__arrow--${arrowSize}`,
            isFirst && "carousel__arrow--disabled",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={goPrev}
          disabled={isFirst}
          aria-label="이전 슬라이드"
        >
          <Icon name="chevron-left" size={arrowSize === "sm" ? 16 : 20} />
        </button>
      )}

      {/* 다음 화살표 */}
      {showArrows && (
        <button
          className={[
            "carousel__arrow",
            "carousel__arrow--next",
            `carousel__arrow--${arrowSize}`,
            isLast && "carousel__arrow--disabled",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={goNext}
          disabled={isLast}
          aria-label="다음 슬라이드"
        >
          <Icon name="chevron-right" size={arrowSize === "sm" ? 16 : 20} />
        </button>
      )}

      {/* 인디케이터 */}
      {showIndicator && (
        <div className="carousel__indicator" role="tablist" aria-label="슬라이드 목록">
          {slides.map((slide, idx) => (
            <button
              key={slide.key}
              className={[
                "carousel__dot",
                idx === current && "carousel__dot--selected",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => goTo(idx)}
              role="tab"
              aria-selected={idx === current}
              aria-label={`${idx + 1}번째 슬라이드로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
