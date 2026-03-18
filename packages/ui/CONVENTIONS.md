# @repo/ui 컴포넌트 컨벤션

## 1. Props 네이밍

### 스타일 변형
시각적 스타일 변형은 Figma 컴포넌트 구조를 그대로 따르기 위해 `variant`로 통일합니다.

```tsx
variant?: "filled" | "outline" | "transparent"
```

### 의미적 타입
색상이나 의미를 나타내는 prop은 `type`으로 통일합니다.

```tsx
type?: "primary" | "secondary" | "destructive"
```

### 크기
크기는 `size`로 통일합니다.

```tsx
size?: "sm" | "md" | "lg" | "xl"
```

### 상태
뱃지, 칩 등의 상태값은 `status`로 통일합니다.

```tsx
status?: "default" | "information" | "success" | "warning" | "error"
```

---

## 2. 공통 Props

모든 컴포넌트는 아래 공통 props를 가집니다.

```tsx
className?: string               // 추가 CSS 클래스
styleOverride?: React.CSSProperties  // 인라인 스타일
```

> ⚠️ HTML 기본 `style` prop과 충돌을 방지하기 위해 인라인 스타일은 `styleOverride`로 받습니다.

---

## 3. className 처리

유틸 함수 없이 각 컴포넌트에서 배열 filter + join 방식으로 직접 처리합니다.

```tsx
const classNames = [
  "component",
  `component--${variant}`,
  `component--${type}`,
  disabled && "component--disabled",
  loading && "component--loading",
  className,
]
  .filter(Boolean)
  .join(" ");
```

---

## 4. BEM 네이밍

CSS 클래스는 BEM 방식으로 작성합니다.

```
Block:    .btn
Element:  .btn__content
Modifier: .btn--filled, .btn--disabled
```

---

## 5. 이벤트 처리

이벤트 핸들러는 아래 규칙을 따릅니다.

```tsx
// disabled 상태 처리는 핸들러 내부에서
const handleClick = (e: React.MouseEvent) => {
  if (disabled) return;
  onClick?.(e);
};

// 키보드 접근성 (클릭 가능한 div 요소에 필수)
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (disabled) return;
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onClick?.();
  }
};
```

---

## 6. 접근성

- 클릭 가능한 `div`에는 `role`, `tabIndex`, `onKeyDown` 필수
- 이미지에는 `alt` 필수
- 상태 변화 요소에는 `aria-*` 속성 사용

```tsx
<div
  role="button"
  tabIndex={disabled ? -1 : 0}
  onClick={handleClick}
  onKeyDown={handleKeyDown}
  aria-disabled={disabled}
  aria-pressed={selected}
/>
```

---

## 7. 타입 안전성

- `[key: string]: any` 사용 금지
- unknown props는 명시적으로 선언하거나 제거
- DOM에 없는 커스텀 prop은 spread 전에 제거

```tsx
// ❌ 잘못된 방식
const { customProp, ...props } = allProps;
<div {...props} />

// ✅ 올바른 방식
const { customProp, className, onClick, ...htmlProps } = allProps;
<div className={className} onClick={onClick} {...htmlProps} />
```

---

## 8. 컴포넌트 파일 구조

```
ComponentName/
  ComponentName.tsx          // 컴포넌트 로직
  ComponentName.scss         // 스타일
  ComponentName.stories.tsx  // Storybook
  index.ts                   // export
```

### index.ts 형식

```ts
export { default } from "./ComponentName";
export type { ComponentNameProps } from "./ComponentName";
```

---

## 9. SCSS 구조

```scss
@use "../../../styles/index.scss" as *;

.component {
  // 기본 레이아웃

  // Elements
  &__content { }

  // Variant modifiers (Figma 기준)
  &--filled { }
  &--outline { }
  &--transparent { }

  // Type modifiers
  &--primary { }
  &--secondary { }
  &--destructive { }

  // Size modifiers
  &--sm { }
  &--md { }
  &--lg { }
  &--xl { }

  // State modifiers
  &--disabled { cursor: not-allowed; }
  &--loading { cursor: not-allowed; }
}
```

---

## 10. 이미지 폴백 처리

DOM 직접 조작 금지. React state로 처리합니다.

```tsx
// ❌ 금지
onError={(e) => {
  (e.target as HTMLElement).parentElement!.innerHTML = "...";
}}

// ✅ 올바른 방식
const [imgError, setImgError] = useState(false);

return !imgError ? (
  <img src={src} onError={() => setImgError(true)} />
) : (
  <span>{initial}</span>
);
```

---

## 11. 컴포넌트 현황 및 수정 필요 사항

| 컴포넌트 | 상태 | 수정 필요 사항 |
|----------|------|----------------|
| Button | ⚠️ | `buttonType` → `htmlType` 변경, focus → focus-visible 개선 |
| Spinner | ✅ | - |
| Avatar | ⚠️ | 이미지 폴백 innerHTML → state 처리 |
| AvatarGroup | ⚠️ | +N 표시 Avatar 컴포넌트 의존 제거 |
| Badge | ✅ | - |
| Chips | ⚠️ | `style` prop 충돌 → `variant`로 변경, 인라인 스타일은 `styleOverride` |
| Divider | ✅ | - |
| Label | ✅ | - |
| Link | ✅ | - |
| Icon | ⚠️ | `[key: string]: any` 제거 |
