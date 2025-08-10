import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Base/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Avatar 컴포넌트는 사용자의 프로필을 나타내는 컴포넌트입니다.

**특징:**
- 3가지 타입: Initial (이니셜), Profile (프로필 이미지), Icon (아이콘)
- 4가지 크기: sm (16px), md (24px), lg (32px), xl (48px)
- 클릭 가능한 상호작용 지원
- 이미지 로드 실패 시 이니셜로 폴백
- 접근성 지원 (키보드 네비게이션, 스크린 리더)

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["initial", "profile", "icon"],
      description: "아바타 타입",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "아바타 크기",
    },
    initial: {
      control: { type: "text" },
      description: "이니셜 텍스트 (type이 'initial'일 때 사용)",
    },
    src: {
      control: { type: "text" },
      description: "프로필 이미지 URL (type이 'profile'일 때 사용)",
    },
    alt: {
      control: { type: "text" },
      description: "이미지 alt 텍스트",
    },
    iconName: {
      control: { type: "select" },
      options: ["user", "info", "check"],
      description: "아이콘 이름 (type이 'icon'일 때 사용)",
    },
    onClick: {
      action: "clicked",
      description: "클릭 이벤트 핸들러",
    },
    className: {
      control: { type: "text" },
      description: "추가 CSS 클래스",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    type: "initial",
    size: "md",
    initial: "U",
  },
};

// 타입별 스토리
export const InitialType: Story = {
  args: {
    type: "initial",
    size: "lg",
    initial: "JD",
  },
  parameters: {
    docs: {
      description: {
        story: "이니셜을 표시하는 아바타입니다. 사용자의 이름 첫 글자를 표시합니다.",
      },
    },
  },
};

export const ProfileType: Story = {
  args: {
    type: "profile",
    size: "lg",
    src: "https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=150",
    alt: "User profile",
  },
  parameters: {
    docs: {
      description: {
        story: "프로필 이미지를 표시하는 아바타입니다. 이미지 로드 실패 시 이니셜로 폴백됩니다.",
      },
    },
  },
};

export const IconType: Story = {
  args: {
    type: "icon",
    size: "lg",
    iconName: "user",
  },
  parameters: {
    docs: {
      description: {
        story: "아이콘을 표시하는 아바타입니다. 기본 사용자 아이콘을 보여줍니다.",
      },
    },
  },
};

// 크기별 스토리
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Avatar type="initial" size="sm" initial="S" />
      <Avatar type="initial" size="md" initial="M" />
      <Avatar type="initial" size="lg" initial="L" />
      <Avatar type="initial" size="xl" initial="XL" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "다양한 크기의 아바타를 보여줍니다: sm (16px), md (24px), lg (32px), xl (48px)",
      },
    },
  },
};

// 타입별 비교
export const AllTypes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Avatar type="initial" size="lg" initial="JD" />
      <Avatar 
        type="profile" 
        size="lg" 
        src="https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=150" 
        alt="User profile" 
      />
      <Avatar type="icon" size="lg" iconName="user" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 타입의 아바타를 비교해서 보여줍니다: Initial, Profile, Icon",
      },
    },
  },
};

// 클릭 가능한 아바타
export const Clickable: Story = {
  args: {
    type: "initial",
    size: "lg",
    initial: "CL",
    onClick: () => alert("Avatar clicked!"),
  },
  parameters: {
    docs: {
      description: {
        story: "클릭 가능한 아바타입니다. 호버 시 확대되고 클릭 시 이벤트가 발생합니다.",
      },
    },
  },
};

// 이미지 로드 실패 시 폴백
export const ImageFallback: Story = {
  args: {
    type: "profile",
    size: "lg",
    src: "https://invalid-url-that-will-fail.jpg",
    initial: "FB",
    alt: "Fallback example",
  },
  parameters: {
    docs: {
      description: {
        story: "이미지 로드 실패 시 이니셜로 폴백되는 예시입니다.",
      },
    },
  },
};

// 아바타 그룹 예시
export const AvatarGroup: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar type="initial" size="md" initial="A" style={{ marginLeft: "0px" }} />
      <Avatar type="initial" size="md" initial="B" style={{ marginLeft: "-8px" }} />
      <Avatar type="initial" size="md" initial="C" style={{ marginLeft: "-8px" }} />
      <Avatar type="initial" size="md" initial="D" style={{ marginLeft: "-8px" }} />
      <Avatar 
        type="initial" 
        size="md" 
        initial="+3" 
        style={{ 
          marginLeft: "-8px",
          backgroundColor: "#4b5563",
          fontSize: "10px"
        }} 
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "여러 아바타를 겹쳐서 그룹으로 표시하는 예시입니다.",
      },
    },
  },
};
