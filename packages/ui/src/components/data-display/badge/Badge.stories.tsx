import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./Badge";

const STATUSES = ["default", "information", "warning", "success", "important"] as const;

const meta = {
  title: "Data Display/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
상태 표시, 알림 개수, 카테고리 등을 시각적으로 나타내는 Badge 컴포넌트입니다.

**특징:**
- 3가지 타입: \`dot\` (점), \`number\` (숫자), \`letter\` (텍스트)
- 5가지 상태: \`default\`, \`information\`, \`warning\`, \`success\`, \`important\`
- \`max\` prop으로 숫자 오버플로우 처리 (예: 999 초과 시 "999+")

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["dot", "number", "letter"],
      description: "뱃지 타입 (Figma 기준)",
    },
    status: {
      control: { type: "select" },
      options: ["default", "information", "warning", "success", "important"],
      description: "뱃지 상태/색상",
    },
    content: {
      control: { type: "text" },
      description: "표시할 내용 (number, letter 타입일 때 사용)",
    },
    max: {
      control: { type: "number" },
      description: "최대 숫자 (초과 시 'N+' 형태로 표시, 기본값: 999)",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    type: "number",
    status: "information",
    content: 999,
  },
};

// 2. 모든 조합 — Figma 디자인과 동일
export const AllVariants: Story = {
  args: {
    type: "number",
    status: "information",
    content: 999,
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Dot */}
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>Dot</h3>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {STATUSES.map((status) => (
            <div key={status} style={{ textAlign: "center" }}>
              <Badge type="dot" status={status} />
              <div style={{ fontSize: "11px", marginTop: "6px", color: "#6b7280" }}>{status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Number */}
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>Number</h3>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {STATUSES.map((status) => (
            <div key={status} style={{ textAlign: "center" }}>
              <Badge type="number" status={status} content={999} />
              <div style={{ fontSize: "11px", marginTop: "6px", color: "#6b7280" }}>{status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Letter */}
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>Letter</h3>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {STATUSES.map((status) => (
            <div key={status} style={{ textAlign: "center" }}>
              <Badge type="letter" status={status} content="999+" />
              <div style={{ fontSize: "11px", marginTop: "6px", color: "#6b7280" }}>{status}</div>
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
    type: "number",
    status: "important",
    content: 3,
  },
  render: () => (
    <div
      style={{
        padding: "1.5rem",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        minWidth: "220px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {[
          { label: "메시지", type: "number" as const, status: "important" as const, content: 3 },
          { label: "알림", type: "number" as const, status: "information" as const, content: 1234 },
          { label: "온라인", type: "dot" as const, status: "success" as const },
          { label: "새 기능", type: "letter" as const, status: "information" as const, content: "NEW" },
          { label: "점검 예정", type: "letter" as const, status: "warning" as const, content: "예정" },
        ].map(({ label, ...props }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "14px" }}>{label}</span>
            <Badge {...props} />
          </div>
        ))}
      </div>
    </div>
  ),
};
