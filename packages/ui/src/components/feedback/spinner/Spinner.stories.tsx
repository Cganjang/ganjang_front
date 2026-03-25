import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "@ui/components/feedback/spinner/Spinner";

const meta = {
  title: "Feedback/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
로딩 상태를 나타내는 Spinner 컴포넌트입니다.

**특징:**
- 4가지 크기: \`sm\` (16px), \`md\` (24px), \`lg\` (32px), \`xl\` (48px)
- 2가지 타입: \`primary\` (파란색), \`secondary\` (회색)

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "스피너 크기 (sm: 16px, md: 24px, lg: 32px, xl: 48px)",
    },
    type: {
      control: { type: "select" },
      options: ["primary", "secondary"],
      description: "스피너 색상 타입 (primary: 파란색, secondary: 회색)",
    },
    "aria-label": {
      control: { type: "text" },
      description: "접근성 라벨",
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    size: "md",
    type: "primary",
  },
};

// 2. 모든 조합 — Figma 레이아웃 기준 (size × type)
export const AllVariants: Story = {
  args: {
    size: "md",
    type: "primary",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {(["primary", "secondary"] as const).map((type) => (
        <div key={type}>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600", textTransform: "capitalize" }}>
            {type}
          </h3>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {(["sm", "md", "lg", "xl"] as const).map((size) => (
              <div key={size} style={{ textAlign: "center" }}>
                <Spinner type={type} size={size} />
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#6b7280" }}>
                  {size}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// 3. 실제 사용 예시
export const UsageExample: Story = {
  args: {
    size: "sm",
    type: "primary",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", minWidth: "280px" }}>
      {/* 버튼 내 로딩 */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Spinner size="sm" type="primary" />
        <span style={{ fontSize: "14px" }}>저장 중...</span>
      </div>

      {/* 카드 로딩 */}
      <div
        style={{
          padding: "1.5rem",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Spinner size="lg" type="primary" />
        <span style={{ fontSize: "14px", color: "#6b7280" }}>데이터를 불러오는 중입니다</span>
      </div>

      {/* Secondary — 어두운 배경 시나리오 */}
      <div
        style={{
          padding: "1rem",
          borderRadius: "8px",
          background: "#1f2937",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <Spinner size="md" type="secondary" />
        <span style={{ fontSize: "14px", color: "#f3f4f6" }}>처리 중...</span>
      </div>
    </div>
  ),
};
