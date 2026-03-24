import React from "react";
import "./Skeleton.scss";

export interface SkeletonProps {
  /**
   * 스켈레톤 타입 (Figma 기준)
   * circle: 원형 (아바타 등)
   * text: 텍스트 줄
   * rectangle: 사각형 (이미지, 카드 등)
   */
  type?: "circle" | "text" | "rectangle";
  /**
   * 너비
   * circle: 무시됨 (height 값으로 정사각형)
   * @default "100%"
   */
  width?: string | number;
  /**
   * 높이
   * circle: 지름으로 사용 (기본값 40px)
   * text: 기본값 10px
   * rectangle: 기본값 80px
   */
  height?: string | number;
  /**
   * shimmer 애니메이션 활성화 여부
   * @default true
   */
  animate?: boolean;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 인라인 스타일 (style prop 충돌 방지)
   */
  styleOverride?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({
  type = "rectangle",
  width,
  height,
  animate = true,
  className = "",
  styleOverride,
}) => {
  const classNames = [
    "skeleton",
    `skeleton--${type}`,
    animate && "skeleton--animate",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // 숫자 또는 숫자 문자열 → px, 그 외 CSS 값은 그대로
  const toCSS = (val: string | number): string => {
    if (typeof val === "number") return `${val}px`;
    if (/^\d+(\.\d+)?$/.test(val)) return `${val}px`;
    return val;
  };

  const getSize = () => {
    switch (type) {
      case "circle": {
        const d = height ?? width ?? 40;
        return { width: d, height: d };
      }
      case "text":
        return { width: width ?? "100%", height: height ?? 10 };
      case "rectangle":
      default:
        return { width: width ?? "100%", height: height ?? 80 };
    }
  };

  const { width: w, height: h } = getSize();

  const inlineStyle: React.CSSProperties = {
    width: toCSS(w),
    height: toCSS(h),
    ...styleOverride,
  };

  return (
    <div
      className={classNames}
      style={inlineStyle}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
