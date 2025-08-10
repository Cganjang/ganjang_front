import type { Meta, StoryObj } from "@storybook/react";
import AvatarGroup from "./AvatarGroup";

const meta: Meta<typeof AvatarGroup> = {
  title: "Base/AvatarGroup",
  component: AvatarGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
AvatarGroup 컴포넌트는 여러 아바타를 겹쳐서 표시하는 컴포넌트입니다.

**특징:**
- 아바타들을 겹쳐서 표시
- 최대 표시 개수 제한 (기본값: 6개)
- 남은 개수를 +N 형태로 표시
- 4가지 크기: sm (16px), md (24px), lg (32px), xl (48px)
- 더보기 버튼 클릭 이벤트 지원
- 흰색 테두리로 겹침 효과 표현

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
    avatars: {
      control: { type: "object" },
      description: "아바타 배열",
    },
    max: {
      control: { type: "number" },
      description: "최대 표시할 아바타 개수",
    },
    onMoreClick: {
      action: "more clicked",
      description: "더보기 버튼 클릭 핸들러",
    },
    className: {
      control: { type: "text" },
      description: "추가 CSS 클래스",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 아바타 데이터
const sampleAvatars = [
  { type: "initial" as const, initial: "JD" },
  { type: "initial" as const, initial: "SM" },
  { type: "profile" as const, src: "https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=150", alt: "User 1" },
  { type: "initial" as const, initial: "AM" },
  { type: "profile" as const, src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150", alt: "User 2" },
  { type: "initial" as const, initial: "RK" },
  { type: "icon" as const, iconName: "user" as const },
  { type: "initial" as const, initial: "TS" },
  { type: "initial" as const, initial: "LM" },
];

// 기본 스토리
export const Default: Story = {
  args: {
    size: "md",
    avatars: sampleAvatars.slice(0, 4),
  },
};

// 더보기 표시가 있는 경우
export const WithMoreIndicator: Story = {
  args: {
    size: "md",
    avatars: sampleAvatars,
    max: 4,
    onMoreClick: () => alert("Show all users"),
  },
  parameters: {
    docs: {
      description: {
        story: "최대 표시 개수를 초과하는 경우 +N 형태로 더보기 버튼을 표시합니다.",
      },
    },
  },
};

// 크기별 스토리
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "flex-start" }}>
      <div>
        <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "14px", color: "#666" }}>Small (16px)</h4>
        <AvatarGroup size="sm" avatars={sampleAvatars} max={5} />
      </div>
      <div>
        <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "14px", color: "#666" }}>Medium (24px)</h4>
        <AvatarGroup size="md" avatars={sampleAvatars} max={5} />
      </div>
      <div>
        <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "14px", color: "#666" }}>Large (32px)</h4>
        <AvatarGroup size="lg" avatars={sampleAvatars} max={5} />
      </div>
      <div>
        <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "14px", color: "#666" }}>Extra Large (48px)</h4>
        <AvatarGroup size="xl" avatars={sampleAvatars} max={5} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "다양한 크기의 아바타 그룹을 보여줍니다.",
      },
    },
  },
};

// 최대 개수 조정
export const MaxCount: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "flex-start" }}>
      <div>
        <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "14px", color: "#666" }}>Max 3개</h4>
        <AvatarGroup size="md" avatars={sampleAvatars} max={3} />
      </div>
      <div>
        <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "14px", color: "#666" }}>Max 5개</h4>
        <AvatarGroup size="md" avatars={sampleAvatars} max={5} />
      </div>
      <div>
        <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "14px", color: "#666" }}>Max 7개</h4>
        <AvatarGroup size="md" avatars={sampleAvatars} max={7} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "최대 표시 개수를 조정한 예시입니다.",
      },
    },
  },
};

// 다양한 타입 조합
export const MixedTypes: Story = {
  args: {
    size: "lg",
    avatars: [
      { type: "initial", initial: "JS" },
      { type: "profile", src: "https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=150", alt: "Sarah" },
      { type: "icon", iconName: "user" },
      { type: "initial", initial: "MK" },
      { type: "profile", src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150", alt: "Alex" },
    ],
    max: 6,
  },
  parameters: {
    docs: {
      description: {
        story: "다양한 타입의 아바타(이니셜, 프로필, 아이콘)를 조합한 예시입니다.",
      },
    },
  },
};

// 적은 수의 아바타 (더보기 없음)
export const FewAvatars: Story = {
  args: {
    size: "md",
    avatars: [
      { type: "initial", initial: "AB" },
      { type: "profile", src: "https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=150", alt: "User" },
      { type: "initial", initial: "CD" },
    ],
    max: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "아바타 개수가 최대 표시 개수보다 적어서 더보기 버튼이 표시되지 않는 경우입니다.",
      },
    },
  },
};

// 클릭 이벤트가 있는 경우
export const WithClickEvents: Story = {
  args: {
    size: "lg",
    avatars: [
      { 
        type: "initial", 
        initial: "JD", 
        onClick: () => alert("John Doe clicked") 
      },
      { 
        type: "profile", 
        src: "https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=150", 
        alt: "Sarah", 
        onClick: () => alert("Sarah clicked") 
      },
      { 
        type: "initial", 
        initial: "MK", 
        onClick: () => alert("Mike Kim clicked") 
      },
      { type: "initial", initial: "AB" },
      { type: "initial", initial: "CD" },
      { type: "initial", initial: "EF" },
      { type: "initial", initial: "GH" },
    ],
    max: 4,
    onMoreClick: () => alert("Show all 7 users"),
  },
  parameters: {
    docs: {
      description: {
        story: "개별 아바타와 더보기 버튼에 클릭 이벤트가 있는 경우입니다.",
      },
    },
  },
};
