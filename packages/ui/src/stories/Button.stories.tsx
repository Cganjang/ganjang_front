import type { Meta, StoryObj } from "@storybook/react";
import {Button} from "../components"

// 내 Button 컴포넌트 메타데이터
const meta: Meta<typeof Button> = {
  title: "My Components/Button", // 사이드바에서 "My Components" 폴더 안에 나타남
  component: Button,
  parameters: {
    docs: {
      description: {
        component: "SCSS로 스타일링된 재사용 가능한 버튼 컴포넌트입니다.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
      description: "버튼 스타일",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "버튼 크기",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성화 여부",
    },
    children: {
      control: { type: "text" },
      description: "버튼 텍스트",
    },
    onClick: {
      action: "clicked",
      description: "클릭 이벤트",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼
export const Default: Story = {
  args: {
    children: "기본 버튼",
  },
};

// Primary 버튼
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary 버튼",
  },
};

// Secondary 버튼
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary 버튼",
  },
};

// 다양한 크기
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// 모든 조합
export const AllCombinations: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Button variant="primary" size="sm">
          Primary Small
        </Button>
        <Button variant="primary" size="md">
          Primary Medium
        </Button>
        <Button variant="primary" size="lg">
          Primary Large
        </Button>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Button variant="secondary" size="sm">
          Secondary Small
        </Button>
        <Button variant="secondary" size="md">
          Secondary Medium
        </Button>
        <Button variant="secondary" size="lg">
          Secondary Large
        </Button>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Button disabled>Disabled</Button>
        <Button variant="secondary" disabled>
          Secondary Disabled
        </Button>
      </div>
    </div>
  ),
};
