import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Label from "./Label";

const meta = {
  title: "Base/Label",
  component: Label,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
폼 입력 요소에 사용하는 Label 컴포넌트입니다.

**특징:**
- 3가지 타입: \`none\` (기본), \`optional\` (선택 항목), \`required\` (필수 항목)
- 4가지 크기: \`xs\` (12px), \`sm\` (13px), \`md\` (14px, Figma 기준), \`lg\` (16px)
- 우측 \`info\` 아이콘 옵션
- \`htmlFor\`로 input 연결 지원

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "text" },
      description: "레이블 텍스트",
    },
    type: {
      control: { type: "select" },
      options: ["none", "optional", "required"],
      description: "레이블 타입 (Figma 기준)",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
      description: "텍스트 크기 (md: 14px Figma 기준)",
    },
    optionalText: {
      control: { type: "text" },
      description: "optional 타입일 때 괄호 안 텍스트 (기본값: 'Optional')",
    },
    isInfoIcon: {
      control: { type: "boolean" },
      description: "우측 info 아이콘 표시 여부",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성 상태",
    },
    htmlFor: {
      control: { type: "text" },
      description: "연결할 input의 id",
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    children: "Label",
    type: "none",
    size: "md",
    isInfoIcon: true,
  },
};

// 2. 모든 조합 — Figma 레이아웃 기준 (type × size)
export const AllVariants: Story = {
  args: {
    children: "Label",
    type: "none",
    size: "md",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Type 비교 — Figma 기준 */}
      <div>
        <h3
          style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}
        >
          Type
        </h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <Label type="none" isInfoIcon>
            Label
          </Label>
          <Label type="optional" isInfoIcon>
            Label
          </Label>
          <Label type="required" isInfoIcon>
            Label
          </Label>
        </div>
      </div>

      {/* Size 비교 */}
      <div>
        <h3
          style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}
        >
          Size
        </h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {(["xs", "sm", "md", "lg"] as const).map((size) => (
            <div
              key={size}
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <span
                style={{ fontSize: "12px", color: "#6b7280", width: "24px" }}
              >
                {size}
              </span>
              <Label size={size} type="required" isInfoIcon>
                Label
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Disabled */}
      <div>
        <h3
          style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}
        >
          Disabled
        </h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <Label type="none" disabled isInfoIcon>
            Label
          </Label>
          <Label type="optional" disabled isInfoIcon>
            Label
          </Label>
          <Label type="required" disabled isInfoIcon>
            Label
          </Label>
        </div>
      </div>
    </div>
  ),
};

// 3. 비활성화
export const Disabled: Story = {
  args: {
    children: "Label",
    type: "required",
    size: "md",
    isInfoIcon: true,
    disabled: true,
  },
};

// 4. 실제 사용 예시
export const UsageExample: Story = {
  args: {
    children: "이메일",
    type: "required",
    size: "md",
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        minWidth: "320px",
      }}
    >
      <div
        style={{
          padding: "1.5rem",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {/* Required 필드 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <Label htmlFor="email" type="required" isInfoIcon>
            이메일
          </Label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            style={{
              padding: "8px 12px",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </div>

        {/* Optional 필드 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <Label htmlFor="bio" type="optional">
            자기소개
          </Label>
          <input
            id="bio"
            type="text"
            placeholder="간단한 자기소개를 입력하세요"
            style={{
              padding: "8px 12px",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </div>

        {/* None 필드 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <Label htmlFor="location" type="none" isInfoIcon>
            위치
          </Label>
          <input
            id="location"
            type="text"
            placeholder="서울시 강남구"
            style={{
              padding: "8px 12px",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </div>
      </div>
    </div>
  ),
};
