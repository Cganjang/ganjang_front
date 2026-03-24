import React from "react";

export interface IconProps {
  /**
   * 아이콘 크기
   * sm: 16px, md: 24px, lg: 32px, xl: 48px
   * 또는 숫자로 직접 지정 (px)
   */
  size?: "sm" | "md" | "lg" | "xl" | number;
  /**
   * 아이콘 색상 (CSS color 값)
   * 기본값: currentColor (부모 요소의 color 상속)
   */
  color?: string;
  /**
   * SVG stroke 두께
   * 기본값: 2 (Lucide/Feather 표준)
   */
  strokeWidth?: number;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 인라인 스타일 (style prop 충돌 방지를 위해 styleOverride 사용)
   */
  styleOverride?: React.CSSProperties;
}
