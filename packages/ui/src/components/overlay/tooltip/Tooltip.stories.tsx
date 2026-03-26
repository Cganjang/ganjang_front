import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Tooltip from "./Tooltip";

const meta = {
  title: "Overlay/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Figma 디자인 시스템 기반 Tooltip 컴포넌트입니다.

**특징:**
- 2가지 스타일: \`inverse\` (어두운 배경), \`base\` (밝은 배경 + 그림자)
- 12가지 배치: top, bottom, left, right × start/center/end
- CSS 화살표 (Figma Break 매핑)
- Hover/Focus 트리거, 진입/퇴장 딜레이 지원
- Figma 기준 \`max-width: 240px\`, \`font-size: 12px\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    content: {
      control: { type: "text" },
      description: "툴팁 내용",
    },
    placement: {
      control: { type: "select" },
      options: [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
      ],
      description: "배치 방향",
    },
    variant: {
      control: { type: "select" },
      options: ["inverse", "base"],
      description: "스타일",
    },
    showArrow: {
      control: { type: "boolean" },
      description: "화살표 표시",
    },
    offset: {
      control: { type: "number" },
      description: "트리거와의 간격 (px)",
    },
    enterDelay: {
      control: { type: "number" },
      description: "표시 지연 (ms)",
    },
    maxWidth: {
      control: { type: "number" },
      description: "최대 너비 (px)",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성화",
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const TriggerButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => (
  <button
    ref={ref}
    style={{
      padding: "8px 16px",
      border: "1px solid #e5e7eb",
      borderRadius: "4px",
      background: "white",
      cursor: "pointer",
      fontSize: "14px",
    }}
    {...props}
  />
));
TriggerButton.displayName = "TriggerButton";

// 1. 기본 상태
export const Default: Story = {
  args: {
    content: "Supporting text with max width of tooltipBase",
    placement: "top",
    variant: "inverse",
  },
  render: (args) => (
    <Tooltip {...args}>
      <TriggerButton>Hover me</TriggerButton>
    </Tooltip>
  ),
};

// 2. 두 가지 스타일
export const Variants: Story = {
  args: {
    content: "Tooltip content",
  },
  render: () => (
    <div style={{ display: "flex", gap: "3rem", padding: "4rem" }}>
      <Tooltip
        content="Inverse 스타일 (어두운 배경)"
        variant="inverse"
        placement="top"
      >
        <TriggerButton>Inverse</TriggerButton>
      </Tooltip>
      <Tooltip
        content="Base 스타일 (밝은 배경 + 그림자)"
        variant="base"
        placement="top"
      >
        <TriggerButton>Base</TriggerButton>
      </Tooltip>
      <Tooltip
        content="화살표 없는 툴팁"
        variant="inverse"
        placement="top"
        showArrow={false}
      >
        <TriggerButton>No Arrow</TriggerButton>
      </Tooltip>
    </div>
  ),
};

// 3. 모든 배치 방향 — Inverse
export const AllPlacementsInverse: Story = {
  args: {
    content: "Tooltip content",
  },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "3rem",
        padding: "6rem 4rem",
        width: "600px",
      }}
    >
      <Tooltip content="Top Start" placement="top-start" variant="inverse">
        <TriggerButton>top-start</TriggerButton>
      </Tooltip>
      <Tooltip content="Top Center" placement="top" variant="inverse">
        <TriggerButton>top</TriggerButton>
      </Tooltip>
      <Tooltip content="Top End" placement="top-end" variant="inverse">
        <TriggerButton>top-end</TriggerButton>
      </Tooltip>

      <Tooltip content="Left Start" placement="left-start" variant="inverse">
        <TriggerButton>left-start</TriggerButton>
      </Tooltip>
      <div />
      <Tooltip content="Right Start" placement="right-start" variant="inverse">
        <TriggerButton>right-start</TriggerButton>
      </Tooltip>

      <Tooltip content="Left" placement="left" variant="inverse">
        <TriggerButton>left</TriggerButton>
      </Tooltip>
      <div />
      <Tooltip content="Right" placement="right" variant="inverse">
        <TriggerButton>right</TriggerButton>
      </Tooltip>

      <Tooltip content="Left End" placement="left-end" variant="inverse">
        <TriggerButton>left-end</TriggerButton>
      </Tooltip>
      <div />
      <Tooltip content="Right End" placement="right-end" variant="inverse">
        <TriggerButton>right-end</TriggerButton>
      </Tooltip>

      <Tooltip
        content="Bottom Start"
        placement="bottom-start"
        variant="inverse"
      >
        <TriggerButton>bottom-start</TriggerButton>
      </Tooltip>
      <Tooltip content="Bottom Center" placement="bottom" variant="inverse">
        <TriggerButton>bottom</TriggerButton>
      </Tooltip>
      <Tooltip content="Bottom End" placement="bottom-end" variant="inverse">
        <TriggerButton>bottom-end</TriggerButton>
      </Tooltip>
    </div>
  ),
};

// 4. 모든 배치 방향 — Base
export const AllPlacementsBase: Story = {
  args: {
    content: "Tooltip content",
  },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "3rem",
        padding: "6rem 4rem",
        width: "600px",
      }}
    >
      <Tooltip content="Top Start" placement="top-start" variant="base">
        <TriggerButton>top-start</TriggerButton>
      </Tooltip>
      <Tooltip content="Top Center" placement="top" variant="base">
        <TriggerButton>top</TriggerButton>
      </Tooltip>
      <Tooltip content="Top End" placement="top-end" variant="base">
        <TriggerButton>top-end</TriggerButton>
      </Tooltip>

      <Tooltip content="Left" placement="left" variant="base">
        <TriggerButton>left</TriggerButton>
      </Tooltip>
      <div />
      <Tooltip content="Right" placement="right" variant="base">
        <TriggerButton>right</TriggerButton>
      </Tooltip>

      <Tooltip content="Bottom Start" placement="bottom-start" variant="base">
        <TriggerButton>bottom-start</TriggerButton>
      </Tooltip>
      <Tooltip content="Bottom Center" placement="bottom" variant="base">
        <TriggerButton>bottom</TriggerButton>
      </Tooltip>
      <Tooltip content="Bottom End" placement="bottom-end" variant="base">
        <TriggerButton>bottom-end</TriggerButton>
      </Tooltip>
    </div>
  ),
};

// 5. 긴 텍스트 (max-width 테스트)
export const LongContent: Story = {
  args: {
    content:
      "Supporting text with max width of tooltipBase. This is a longer text to test wrapping behavior.",
  },
  render: (args) => (
    <div style={{ padding: "4rem", display: "flex", gap: "3rem" }}>
      <Tooltip {...args} variant="inverse" placement="top">
        <TriggerButton>Long (Inverse)</TriggerButton>
      </Tooltip>
      <Tooltip {...args} variant="base" placement="bottom">
        <TriggerButton>Long (Base)</TriggerButton>
      </Tooltip>
    </div>
  ),
};

// 6. 실제 사용 예시
export const UsageExample: Story = {
  args: {
    content: "Tooltip",
  },
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        padding: "4rem",
        alignItems: "center",
      }}
    >
      <Tooltip content="복사하기" placement="top">
        <button
          style={{
            width: "36px",
            height: "36px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            background: "white",
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          📋
        </button>
      </Tooltip>
      <Tooltip content="저장하기 (Ctrl+S)" placement="bottom" variant="inverse">
        <button
          style={{
            width: "36px",
            height: "36px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            background: "white",
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          💾
        </button>
      </Tooltip>
      <Tooltip
        content="이 기능은 Pro 플랜에서만 사용할 수 있습니다. 업그레이드하시겠습니까?"
        placement="right"
        variant="base"
      >
        <button
          style={{
            padding: "8px 16px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            background: "#f3f4f6",
            cursor: "pointer",
            fontSize: "14px",
            color: "#6b7280",
          }}
        >
          Pro 기능
        </button>
      </Tooltip>
    </div>
  ),
};
