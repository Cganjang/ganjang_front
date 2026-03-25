import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Skeleton from "@ui/components/feedback/skeleton/Skeleton";

const meta = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
콘텐츠 로딩 중 자리를 잡아주는 Skeleton 컴포넌트입니다.

**특징:**
- 3가지 타입: \`circle\` (원형), \`text\` (텍스트 줄), \`rectangle\` (사각형)
- shimmer 애니메이션으로 로딩 상태 표현 (Figma Progress 0→33→66→100)
- \`width\`, \`height\`로 크기 자유롭게 지정

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["circle", "text", "rectangle"],
      description: "스켈레톤 타입 (Figma 기준)",
    },
    width: {
      control: { type: "text" },
      description: "너비 — 숫자(px) 또는 '50%', '100%' 등 CSS 값. 미입력 시 type별 기본값 사용",
    },
    height: {
      control: { type: "text" },
      description: "높이 — 숫자(px) 또는 CSS 값. 미입력 시 type별 기본값 사용",
    },
    animate: {
      control: { type: "boolean" },
      description: "shimmer 애니메이션 활성화 여부",
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태 — controls 패널에서 type/width/height/animate 변경 가능
// % 너비가 동작하려면 부모 너비가 필요 — wrapper div로 기준 너비 제공
export const Default: Story = {
  args: {
    type: "rectangle",
    width: undefined,   // 미입력 시 type별 기본값: rectangle=100%, text=100%, circle=40px
    height: undefined,  // 미입력 시 type별 기본값: rectangle=80px, text=10px, circle=40px
    animate: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

// 2. 모든 조합 — Figma 레이아웃 기준 (type × size)
export const AllVariants: Story = {
  args: {
    type: "rectangle",
    animate: true,
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "300px" }}>
      {/* Circle */}
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>Circle</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Skeleton type="circle" height={24} />
          <Skeleton type="circle" height={32} />
          <Skeleton type="circle" height={40} />
          <Skeleton type="circle" height={48} />
        </div>
      </div>

      {/* Text */}
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>Text</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Skeleton type="text" width="80%" />
          <Skeleton type="text" width="60%" />
          <Skeleton type="text" width="90%" />
        </div>
      </div>

      {/* Rectangle */}
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>Rectangle</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Skeleton type="rectangle" height={40} />
          <Skeleton type="rectangle" height={80} />
          <Skeleton type="rectangle" height={120} />
        </div>
      </div>

      {/* Animate 비교 */}
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>animate off</h3>
        <Skeleton type="rectangle" height={40} animate={false} />
      </div>
    </div>
  ),
};

// 3. 실제 사용 예시 — Figma 카드 레이아웃
export const UsageExample: Story = {
  args: {
    type: "rectangle",
    animate: true,
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", minWidth: "320px" }}>
      {/* 단일 카드 스켈레톤 */}
      <div
        style={{
          padding: "1rem",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        <Skeleton type="rectangle" height={140} />
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Skeleton type="circle" height={24} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <Skeleton type="text" width="70%" />
            <Skeleton type="text" width="50%" />
          </div>
        </div>
      </div>

      {/* Figma 3열 카드 레이아웃 */}
      <div style={{ display: "flex", gap: "1rem" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Skeleton type="circle" height={24} />
            <Skeleton type="text" />
            <Skeleton type="rectangle" height={80} />
          </div>
        ))}
      </div>
    </div>
  ),
};
