import type { Meta, StoryObj } from "@storybook/react";
import Icon from "./Icon";

const meta = {
  title: "Base/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Figma 디자인 시스템 기반의 아이콘 컴포넌트입니다."
      }
    }
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: ["info", "check"],
      description: "아이콘 이름"
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "아이콘 크기 (sm: 16px, md: 24px, lg: 32px, xl: 48px)"
    },
    color: {
      control: "color",
      description: "아이콘 색상"
    }
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    name: "info",
    size: "sm"
  }
};

// 다양한 크기
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <div style={{ textAlign: "center" }}>
        <Icon name="info" size="sm" />
        <div style={{ fontSize: "12px", marginTop: "4px" }}>sm (16px)</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="info" size="md" />
        <div style={{ fontSize: "12px", marginTop: "4px" }}>md (24px)</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="info" size="lg" />
        <div style={{ fontSize: "12px", marginTop: "4px" }}>lg (32px)</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="info" size="xl" />
        <div style={{ fontSize: "12px", marginTop: "4px" }}>xl (48px)</div>
      </div>
    </div>
  )
};

// 모든 아이콘
export const AllIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "32px" }}>
      <div style={{ textAlign: "center" }}>
        <Icon name="info" size="md" />
        <div style={{ fontSize: "14px", marginTop: "8px" }}>info</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="check" size="md" />
        <div style={{ fontSize: "14px", marginTop: "8px" }}>check</div>
      </div>
    </div>
  )
};

// 색상 변화
export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Icon name="info" size="md" color="#2563EB" />
      <Icon name="info" size="md" color="#DC2626" />
      <Icon name="info" size="md" color="#059669" />
      <Icon name="info" size="md" color="#7C3AED" />
    </div>
  )
};

// 커스텀 크기
export const CustomSize: Story = {
  args: {
    name: "check",
    size: 40
  }
};
