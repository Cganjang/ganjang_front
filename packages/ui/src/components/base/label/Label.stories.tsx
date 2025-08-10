import type { Meta, StoryObj } from "@storybook/react";
import Label from "./Label";

const meta: Meta<typeof Label> = {
  title: "Base/Label",
  component: Label,
  parameters: {
    docs: {
      description: {
        component:
          "Figma 디자인 시스템 기반 Label 컴포넌트입니다. 3가지 Type(None, Optional, Required)과 4가지 Size(xs, sm, md, lg)를 제공합니다.",
      },
    },
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["none", "optional", "required"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
      description: "레이블 텍스트 크기",
    },
    children: {
      control: { type: "text" },
      description: "레이블 내부 텍스트",
    },
    isInfoIcon: {
      control: { type: "boolean" },
      description: "인포 아이콘 표시 여부",
    },
    optional: {
      control: {
        type: "text",
      },
      description: "optional type 일때 텍스트",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 레이블
export const Default: Story = {
  args: {
    children: "레이블",
    size: "md",
  },
};

// Filled 스타일
export const Filled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Label type="none">레이블</Label>
      <Label type="optional" optional="Optional">
        레이블
      </Label>
      <Label type="required">레이블</Label>
    </div>
  ),
};

// 사이즈별 비교
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Label size="xs" type="required" isInfoIcon={true}>
          XS 레이블
        </Label>
        <Label size="sm" type="required" isInfoIcon={true}>
          SM 레이블
        </Label>
        <Label size="md" type="required" isInfoIcon={true}>
          MD 레이블
        </Label>
        <Label size="lg" type="required" isInfoIcon={true}>
          LG 레이블
        </Label>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>기본 사이즈 (MD)</h4>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <Label type="none">레이블</Label>
          <Label type="optional" optional="Optional">
            레이블
          </Label>
          <Label type="required">레이블</Label>
          <Label type="required" isInfoIcon={true}>
            레이블
          </Label>
        </div>
      </div>
      
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>사이즈별 비교</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Label size="xs" type="required" isInfoIcon={true}>XS 레이블</Label>
            <Label size="sm" type="required" isInfoIcon={true}>SM 레이블</Label>
            <Label size="md" type="required" isInfoIcon={true}>MD 레이블</Label>
            <Label size="lg" type="required" isInfoIcon={true}>LG 레이블</Label>
          </div>
        </div>
      </div>
    </div>
  ),
};

// 실제 사용 예시
export const UsageExample: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        maxWidth: "400px",
      }}
    >
      <div
        style={{
          padding: "1.5rem",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          backgroundColor: "#f9fafb",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <Label size="lg" type="required">제목</Label>
          </div>
          <div>
            <Label size="md" type="optional" optional="Optional">설명</Label>
          </div>
          <div>
            <Label size="sm" isInfoIcon={true}>도움말</Label>
          </div>
        </div>
      </div>
    </div>
  ),
};
