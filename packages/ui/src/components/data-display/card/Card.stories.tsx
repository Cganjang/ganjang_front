import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";
import Button from "@ui/components/base/button/Button";
import Icon from "@ui/components/base/icon/Icon";

const meta = {
  title: "Data Display/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Figma 디자인 시스템 기반 Card 컴포넌트입니다.

**특징:**
- 2가지 방향: \`vertical\` (이미지 위, 300px), \`horizontal\` (이미지 왼쪽)
- Headline (20px semibold) + Sub Headline (16px semibold) + Description (14px medium)
- Footer 영역: Button 등 액션 요소 삽입 가능
- Figma 기준 \`border-radius: 12px\`, \`shadow4\` elevation

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["vertical", "horizontal"],
      description: "레이아웃 방향",
    },
    imageSrc: {
      control: { type: "text" },
      description: "이미지 URL",
    },
    headline: {
      control: { type: "text" },
      description: "제목",
    },
    subHeadline: {
      control: { type: "text" },
      description: "부제목",
    },
    description: {
      control: { type: "text" },
      description: "설명 텍스트",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE_IMG = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop";

// 1. 기본 상태
export const Default: Story = {
  args: {
    headline: "Headline",
    subHeadline: "Sub Headline",
    description: "Description",
    imageSrc: SAMPLE_IMG,
    direction: "vertical",
  },
};

// 2. Vertical vs Horizontal
export const Directions: Story = {
  args: {
    headline: "Headline",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "flex-start" }}>
      <div>
        <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: "600", color: "#6b7280" }}>
          Vertical (300px)
        </h3>
        <Card
          direction="vertical"
          imageSrc={SAMPLE_IMG}
          headline="Headline"
          subHeadline="Sub Headline"
          description="Description"
          footer={
            <Button variant="filled" type="primary">
              <Icon name="plus" size="sm" />
              BUTTON
              <Icon name="plus" size="sm" />
            </Button>
          }
        />
      </div>
      <div>
        <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: "600", color: "#6b7280" }}>
          Horizontal
        </h3>
        <Card
          direction="horizontal"
          imageSrc={SAMPLE_IMG}
          headline="Headline"
          subHeadline="Sub Headline"
          description="Description"
          footer={
            <Button variant="filled" type="primary">
              <Icon name="plus" size="sm" />
              BUTTON
              <Icon name="plus" size="sm" />
            </Button>
          }
          styleOverride={{ width: "479px" }}
        />
      </div>
    </div>
  ),
};

// 3. 이미지 없음
export const WithoutImage: Story = {
  args: {
    headline: "Headline",
  },
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem" }}>
      <Card
        headline="Headline"
        subHeadline="Sub Headline"
        description="Description"
        footer={
          <Button variant="filled" type="primary">
            <Icon name="plus" size="sm" />
            BUTTON
            <Icon name="plus" size="sm" />
          </Button>
        }
      />
      <Card
        headline="Headline Only"
        description="Description text without sub headline"
      />
    </div>
  ),
};

// 4. 실제 사용 예시 — 제품 카드
export const UsageExample: Story = {
  args: {
    headline: "Lemon",
  },
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
      <Card
        imageSrc="https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&h=400&fit=crop"
        headline="Lemon"
        subHeadline="Sub Headline"
        description="Description"
        footer={
          <Button variant="outline" type="primary">
            <Icon name="plus" size="sm" />
            BUTTON
            <Icon name="plus" size="sm" />
          </Button>
        }
      />
      <Card
        imageSrc="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&h=400&fit=crop"
        headline="Strawberry"
        subHeadline="Sub Headline"
        description="Description"
        footer={
          <Button variant="outline" type="primary">
            <Icon name="plus" size="sm" />
            BUTTON
            <Icon name="plus" size="sm" />
          </Button>
        }
      />
      <Card
        imageSrc="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&h=400&fit=crop"
        headline="Avocado"
        subHeadline="Sub Headline"
        description="Description"
        footer={
          <Button variant="outline" type="primary">
            <Icon name="plus" size="sm" />
            BUTTON
            <Icon name="plus" size="sm" />
          </Button>
        }
      />
    </div>
  ),
};

// 5. 다양한 조합
export const Combinations: Story = {
  args: {
    headline: "Card",
  },
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "flex-start" }}>
      <Card
        imageSrc={SAMPLE_IMG}
        headline="Full Card"
        subHeadline="Sub Headline"
        description="All properties are set including image, subheadline, description and footer."
        footer={
          <Button variant="filled" type="primary">
            Action
          </Button>
        }
      />
      <Card
        imageSrc={SAMPLE_IMG}
        headline="No Button"
        subHeadline="Sub Headline"
        description="Card without footer action."
      />
      <Card
        headline="Text Only"
        description="No image, no sub headline. Just headline and description."
        footer={
          <Button variant="outline" type="secondary">
            Learn More
          </Button>
        }
      />
    </div>
  ),
};
