import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Divider from "@ui/components/base/divider/Divider";

const meta = {
  title: "Base/Divider",
  component: Divider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
콘텐츠 영역을 구분하는 Divider 컴포넌트입니다.

**특징:**
- 4가지 크기: \`sm\` (1px), \`md\` (2px), \`lg\` (4px), \`xl\` (8px)
- 2가지 방향: \`horizontal\` (가로), \`vertical\` (세로)
- 6가지 여백: \`none\`, \`xs\` (2px), \`sm\` (4px), \`md\` (8px), \`lg\` (16px), \`xl\` (24px)
- 시맨틱 \`<hr>\` 태그 사용

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
      description: "구분선 두께 (sm: 1px, md: 2px, lg: 4px, xl: 8px)",
    },
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "구분선 방향 (horizontal: 가로, vertical: 세로)",
    },
    margin: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl"],
      description: "구분선 주변 여백 (none: 0, xs: 2px, sm: 4px, md: 8px, lg: 16px, xl: 24px)",
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    size: "sm",
    orientation: "horizontal",
    margin: "none",
  },
};

// 2. 모든 조합 — Figma 레이아웃 기준 (size × orientation)
export const AllVariants: Story = {
  args: {
    size: "sm",
    orientation: "horizontal",
    margin: "none",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "300px" }}>
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>
          Horizontal
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {(["sm", "md", "lg", "xl"] as const).map((size) => (
            <div key={size} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "12px", color: "#6b7280", width: "40px", flexShrink: 0 }}>
                {size}
              </span>
              <Divider size={size} orientation="horizontal" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>
          Vertical
        </h3>
        <div style={{ display: "flex", alignItems: "stretch", height: "48px", gap: "1.5rem" }}>
          {(["sm", "md", "lg", "xl"] as const).map((size) => (
            <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <div style={{ flex: 1, display: "flex", alignItems: "stretch" }}>
                <Divider size={size} orientation="vertical" />
              </div>
              <span style={{ fontSize: "12px", color: "#6b7280", flexShrink: 0 }}>{size}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// 3. 실제 사용 예시
export const UsageExample: Story = {
  args: {
    size: "sm",
    orientation: "horizontal",
    margin: "md",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "400px" }}>
      {/* 수평 - 카드 섹션 구분 */}
      <div
        style={{
          padding: "1.5rem",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        }}
      >
        <div>
          <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>사용자 정보</div>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>이름: 홍길동</div>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>이메일: hong@example.com</div>
        </div>
        <Divider size="sm" margin="md" />
        <div>
          <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>연락처</div>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>전화: 010-1234-5678</div>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>주소: 서울시 강남구</div>
        </div>
      </div>

      {/* 수직 - 네비게이션 구분 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0",
          padding: "0.75rem 1rem",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        }}
      >
        {["홈", "프로젝트", "팀", "설정"].map((item, i) => (
          <React.Fragment key={item}>
            {i > 0 && <Divider orientation="vertical" size="sm" margin="sm" />}
            <span style={{ fontSize: "14px", color: "#374151", padding: "0 4px" }}>{item}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  ),
};
