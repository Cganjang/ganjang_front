import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ProgressBar from "./ProgressBar";
import type { ProgressBarType } from "./ProgressBar";

const meta = {
  title: "Feedback/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
진행률을 표시하는 ProgressBar 컴포넌트입니다.

**특징:**
- **type:** \`primary\`, \`success\`, \`warning\`, \`error\`, \`neutral\` (막대 색)
- **size:** \`sm\` (4px), \`md\` (8px), \`lg\` (12px) 높이
- **value:** 0–100 (determinate)
- **indeterminate:** 무한 애니메이션 (로딩 중 알 수 없을 때)
- **showValue:** 오른쪽 퍼센트 표시

Figma 디자인 시스템 토큰을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "진행률 0–100",
    },
    indeterminate: {
      control: { type: "boolean" },
      description: "무한 로딩 바",
    },
    type: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "error", "neutral"],
      description: "막대 색 (의미)",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "트랙 높이",
    },
    showValue: {
      control: { type: "boolean" },
      description: "퍼센트 텍스트 표시",
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 45,
    type: "primary",
    size: "md",
    showValue: false,
    indeterminate: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

const types: ProgressBarType[] = [
  "primary",
  "success",
  "warning",
  "error",
  "neutral",
];

export const AllTypes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: 400,
      }}
    >
      {types.map((t) => (
        <div key={t}>
          <p
            style={{
              margin: "0 0 8px 0",
              fontSize: 12,
              fontWeight: 600,
              textTransform: "capitalize",
              color: "#6b7280",
            }}
          >
            {t}
          </p>
          <ProgressBar type={t} value={62} size="md" />
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: 400,
      }}
    >
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size}>
          <p
            style={{
              margin: "0 0 8px 0",
              fontSize: 12,
              fontWeight: 600,
              color: "#6b7280",
            }}
          >
            {size}
          </p>
          <ProgressBar type="primary" value={40} size={size} />
        </div>
      ))}
    </div>
  ),
};

export const WithValueLabel: Story = {
  args: {
    value: 78,
    type: "success",
    size: "md",
    showValue: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    type: "primary",
    size: "md",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export const Interactive: Story = {
  render: function InteractiveRender() {
    const [v, setV] = useState(33);
    return (
      <div style={{ width: 360, display: "flex", flexDirection: "column", gap: 12 }}>
        <label style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
          <span>값</span>
          <input
            type="range"
            min={0}
            max={100}
            value={v}
            onChange={(e) => setV(Number(e.target.value))}
          />
          <span style={{ fontVariantNumeric: "tabular-nums" }}>{v}%</span>
        </label>
        <ProgressBar value={v} type="primary" showValue />
      </div>
    );
  },
};
