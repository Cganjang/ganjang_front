export const iconSizes = {
  sm: 16,  // sm-16px
  md: 24,  // md-24px  
  lg: 32,  // lg-32px
  xl: 48,  // xl-48px
} as const;

export const getIconSize = (size: "sm" | "md" | "lg" | "xl" | number): number => {
  if (typeof size === "number") {
    return size;
  }
  return iconSizes[size];
};
