import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import AvatarGroup from "./AvatarGroup";
const SAMPLE_AVATARS = [
  { type: "initial" as const, initial: "B" },
  { type: "initial" as const, initial: "B" },
  { type: "initial" as const, initial: "B" },
  { type: "initial" as const, initial: "B" },
  { type: "initial" as const, initial: "B" },
  { type: "initial" as const, initial: "B" },
  { type: "initial" as const, initial: "B" },
  { type: "initial" as const, initial: "B" },
  { type: "initial" as const, initial: "B" },
];

const meta = {
  title: "Base/AvatarGroup",
  component: AvatarGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
여러 아바타를 겹쳐서 표시하는 AvatarGroup 컴포넌트입니다.

**특징:**
- 아바타를 겹쳐서 표시 (Figma 기준 overlap: sm=4px, md=8px, lg=10px, xl=18px)
- \`max\` 초과 시 More Indicator(+N)로 표시
- More Indicator 5가지 상태: Default, Hover, Press, Disabled, Select
- 4가지 크기: \`sm\` (16px), \`md\` (24px), \`lg\` (32px), \`xl\` (48px)

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
      description: "아바타 그룹 크기",
    },
    max: {
      control: { type: "number" },
      description: "최대 표시할 아바타 개수 (기본값: 6)",
    },
    moreDisabled: {
      control: { type: "boolean" },
      description: "More Indicator 비활성화 여부",
    },
    onMoreClick: {
      action: "more clicked",
      description: "More Indicator 클릭 핸들러",
    },
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    size: "md",
    avatars: SAMPLE_AVATARS.slice(0, 4),
    max: 6,
  },
};

// 2. 모든 사이즈 — Figma 기준 (6아바타 + More Indicator)
export const AllVariants: Story = {
  args: {
    size: "md",
    avatars: SAMPLE_AVATARS,
    max: 6,
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "flex-start",
      }}
    >
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <div
          key={size}
          style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
        >
          <div style={{ fontSize: "12px", color: "#6b7280", width: "24px" }}>
            {size}
          </div>
          <AvatarGroup
            size={size}
            avatars={SAMPLE_AVATARS}
            max={6}
            onMoreClick={() => {}}
          />
        </div>
      ))}
    </div>
  ),
};

// 3. More Indicator 비활성화
export const MoreDisabled: Story = {
  args: {
    size: "md",
    avatars: SAMPLE_AVATARS,
    max: 6,
    moreDisabled: true,
  },
};

// 4. 다양한 타입 조합
export const MixedTypes: Story = {
  args: {
    size: "lg",
    avatars: [
      { type: "initial", initial: "W" },
      {
        type: "profile",
        src: "https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=150",
        alt: "User",
        initial: "U",
      },
      { type: "icon", iconName: "user" },
      { type: "initial", initial: "A" },
      {
        type: "profile",
        src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150",
        alt: "User2",
        initial: "U",
      },
      { type: "initial", initial: "K" },
      { type: "initial", initial: "J" },
    ],
    max: 5,
    onMoreClick: () => {},
  },
};

// 5. 실제 사용 예시
export const UsageExample: Story = {
  args: {
    size: "sm",
    avatars: SAMPLE_AVATARS,
    max: 5,
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        minWidth: "280px",
      }}
    >
      {/* 프로젝트 팀원 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: "500" }}>
          디자인 시스템
        </span>
        <AvatarGroup
          size="sm"
          avatars={SAMPLE_AVATARS}
          max={5}
          onMoreClick={() => {}}
        />
      </div>

      {/* 미팅 참여자 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: "500" }}>
          주간 스탠드업
        </span>
        <AvatarGroup size="md" avatars={SAMPLE_AVATARS.slice(0, 4)} max={6} />
      </div>
    </div>
  ),
};
