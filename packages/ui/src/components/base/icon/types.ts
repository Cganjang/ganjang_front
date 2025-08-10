export interface IconProps {
  /**
   * 아이콘 크기
   * sm: 16px, md: 24px, lg: 32px, xl: 48px
   */
  size?: "sm" | "md" | "lg" | "xl" | number;
  /**
   * CSS 클래스명
   */
  className?: string;
  /**
   * 아이콘 색상 (CSS color 값)
   */
  color?: string;
  /**
   * 추가 속성들
   */
  [key: string]: any;
}

export interface IconComponentProps extends Omit<IconProps, "size"> {
  /**
   * 실제 크기 (픽셀)
   */
  size: number;
}
