# @repo/ui Storybook 컨벤션

## 1. meta 기본 구조

모든 Stories 파일은 아래 구조를 따릅니다.
**Avatar/AvatarGroup의 meta 구조를 기준**으로 합니다.

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import ComponentName from "./ComponentName";

const meta = {
  title: "Category/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
컴포넌트에 대한 설명을 작성합니다.

**특징:**
- 특징 1
- 특징 2

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // props 문서화
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;
```

### 필수 항목 체크리스트

- `satisfies Meta<typeof ComponentName>` — 타입 안전성 보장
- `tags: ["autodocs"]` — 자동 문서 생성
- `parameters.layout` — 레이아웃 명시
- `parameters.docs.description.component` — 마크다운 bullet point로 상세 설명

---

## 2. title 카테고리

Storybook 사이드바 경로를 통일합니다.

```tsx
title: "Base/Button"; // base 컴포넌트
title: "Feedback/Spinner"; // feedback 컴포넌트
title: "Forms/Input"; // forms 컴포넌트
title: "Overlay/Modal"; // overlay 컴포넌트
title: "Layout/Divider"; // layout 컴포넌트
title: "Navigation/Tabs"; // navigation 컴포넌트
```

---

## 3. layout 선택 기준

| layout         | 사용 시점                                                |
| -------------- | -------------------------------------------------------- |
| `"centered"`   | 단일 컴포넌트를 중앙에 배치할 때 (버튼, 아이콘, 뱃지 등) |
| `"padded"`     | 컴포넌트가 여백이 필요할 때                              |
| `"fullscreen"` | 전체 화면을 차지하는 컴포넌트 (레이아웃, 모달 등)        |

---

## 4. argTypes 작성 규칙

모든 props를 argTypes에 문서화합니다.

```tsx
argTypes: {
  // 스타일 변형
  variant: {
    control: { type: "select" },
    options: ["filled", "outline", "transparent"],
    description: "스타일 변형 (Figma 기준)",
  },
  // 타입
  type: {
    control: { type: "select" },
    options: ["primary", "secondary", "destructive"],
    description: "타입 (primary: 파란색, secondary: 회색, destructive: 빨간색)",
  },
  // 크기
  size: {
    control: { type: "select" },
    options: ["sm", "md", "lg", "xl"],
    description: "크기 (sm: 16px, md: 24px, lg: 32px, xl: 48px)",
  },
  // boolean
  disabled: {
    control: { type: "boolean" },
    description: "비활성 상태",
  },
  // 이벤트 — action 사용 (alert() 금지)
  onClick: {
    action: "clicked",
    description: "클릭 이벤트 핸들러",
  },
},
```

> ⚠️ `alert()` 사용 금지 — 이벤트는 반드시 `action: "clicked"` 로 처리합니다.

---

## 5. 필수 Story 구성

**Button의 Story 구성을 기준**으로 모든 컴포넌트가 아래 구조를 가져야 합니다.

```tsx
// 1. 기본 상태 — args 방식으로 controls 패널과 연동
export const Default: Story = {
  args: {
    children: "Button",
  },
};

// 2. 모든 조합 — variant × type × size 전체를 한눈에
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* ... */}
    </div>
  ),
};

// 3. 비활성 상태 — 해당되는 컴포넌트만
export const Disabled: Story = {
  args: { disabled: true },
};

// 4. 에러/엣지케이스 — 해당되는 컴포넌트만 (Avatar의 ImageFallback 참고)
export const ImageFallback: Story = {
  args: {
    src: "https://invalid-url.jpg",
    initial: "FB",
  },
};

// 5. 실제 사용 예시 — 실제 서비스에서 쓰일 법한 시나리오
export const UsageExample: Story = {
  render: () => <div>{/* 실제 사용 시나리오 */}</div>,
};
```

### 컴포넌트별 필수/선택 Story

| Story           | 필수 여부 | 설명                            |
| --------------- | --------- | ------------------------------- |
| `Default`       | ✅ 필수   | args 방식, controls 패널 연동   |
| `AllVariants`   | ✅ 필수   | 모든 조합 한눈에                |
| `Disabled`      | 조건부    | disabled prop이 있는 컴포넌트만 |
| `Loading`       | 조건부    | loading prop이 있는 컴포넌트만  |
| `Sizes`         | 조건부    | size가 여러 개인 경우           |
| 에러/엣지케이스 | 조건부    | 에러 상태가 있는 컴포넌트만     |
| `UsageExample`  | ✅ 필수   | 실제 시나리오                   |

---

## 6. Story별 작성 방식

### Default — args 방식

```tsx
export const Default: Story = {
  args: {
    children: "Button",
    variant: "filled",
    type: "primary",
  },
};
```

controls 패널에서 props를 조작할 수 있게 반드시 `args`를 사용합니다.

### AllVariants — render 방식

variant × type × state 모든 조합을 보여줍니다.

```tsx
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3
          style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}
        >
          Filled
        </h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button variant="filled" type="primary">
            Primary
          </Button>
          <Button variant="filled" type="secondary">
            Secondary
          </Button>
          <Button variant="filled" type="destructive">
            Destructive
          </Button>
        </div>
      </div>
      {/* outline, transparent ... */}
    </div>
  ),
};
```

### UsageExample — 실제 시나리오

하드코딩된 색상값 금지. 실제 서비스에서 쓰일 법한 UI 조합으로 작성합니다.

```tsx
export const UsageExample: Story = {
  render: () => (
    <div style={{ maxWidth: "400px" }}>
      {/* ✅ 좋은 예 — 실제 시나리오 */}
      <div
        style={{
          padding: "1.5rem",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        }}
      >
        <h3>계정 삭제</h3>
        <p>이 작업은 되돌릴 수 없습니다.</p>
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="outline" type="secondary">
            취소
          </Button>
          <Button variant="filled" type="destructive">
            삭제
          </Button>
        </div>
      </div>
    </div>
  ),
};
```

---

## 7. 인라인 스타일 규칙

Stories 내부의 레이아웃용 스타일은 인라인으로 작성합니다. 단, 하드코딩된 색상값은 최소화합니다.

```tsx
// ✅ 레이아웃용 — 허용
style={{ display: "flex", gap: "1rem", alignItems: "center" }}

// ✅ 텍스트 스타일 — 허용
style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 1rem 0" }}

// ⚠️ 색상 하드코딩 — 최소화
style={{ color: "#6b7280" }}  // 불가피한 경우만 허용
```

---

## 8. Cursor 활용 방법

```
@STORYBOOK_CONVENTIONS.md Button.stories.tsx 컨벤션에 맞게 수정해줘
@STORYBOOK_CONVENTIONS.md Input 컴포넌트 스토리북 새로 만들어줘
```
