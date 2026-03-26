import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Alert from "./Alert";
import type { AlertStatus, AlertVariant } from "./Alert";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
상태 알림(Alert) 컴포넌트입니다.

**특징:**
- **Status:** \`information\`, \`error\`, \`warning\`, \`success\`, \`brand\`, \`neutral\`
- **Variant:** \`filled\`, \`outline\`, \`transparent\`
- 제목·설명, 선택적 닫기 버튼 (\`onClose\` + \`closable\`; transparent는 기본적으로 닫기 숨김)

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: { type: "select" },
      options: [
        "information",
        "error",
        "warning",
        "success",
        "brand",
        "neutral",
      ],
      description: "알림 유형 (Figma Status)",
    },
    variant: {
      control: { type: "select" },
      options: ["filled", "outline", "transparent"],
      description: "시각적 스타일 (Figma Style)",
    },
    title: {
      control: { type: "text" },
      description: "제목",
    },
    description: {
      control: { type: "text" },
      description: "설명",
    },
    showDescription: {
      control: { type: "boolean" },
      description: "설명 표시 여부",
    },
    closable: {
      control: { type: "boolean" },
      description: "닫기 버튼 표시 (기본: transparent가 아니면 true)",
    },
    onClose: {
      action: "closed",
      description: "닫기 클릭 — 제공 시 닫기 버튼 표시",
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleDescription =
  "이 영역에는 알림에 대한 부가 설명이 들어갑니다.";

export const Default: Story = {
  args: {
    status: "information",
    variant: "filled",
    title: "알림 제목",
    description: sampleDescription,
    showDescription: true,
    onClose: () => {},
  },
};

const statuses: AlertStatus[] = [
  "information",
  "error",
  "warning",
  "success",
  "brand",
  "neutral",
];

const variants: AlertVariant[] = ["filled", "outline", "transparent"];

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        maxWidth: 560,
      }}
    >
      {variants.map((variant) => (
        <div key={variant}>
          <h3
            style={{
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "capitalize",
            }}
          >
            {variant}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {statuses.map((status) => (
              <Alert
                key={`${variant}-${status}`}
                status={status}
                variant={variant}
                title={`${status} — 제목`}
                description={sampleDescription}
                onClose={() => {}}
                closable={variant === "transparent" ? true : undefined}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const TitleOnly: Story = {
  args: {
    status: "success",
    variant: "outline",
    title: "설명 없이 제목만 표시",
    showDescription: false,
    onClose: () => {},
  },
};
