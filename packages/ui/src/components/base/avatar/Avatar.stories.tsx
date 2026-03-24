import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";

const meta = {
  title: "Base/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
사용자 프로필을 나타내는 Avatar 컴포넌트입니다.

**특징:**
- 3가지 타입: \`initial\` (이니셜), \`profile\` (프로필 이미지), \`icon\` (아이콘)
- 4가지 크기: \`sm\` (16px), \`md\` (24px), \`lg\` (32px), \`xl\` (48px)
- 이미지 로드 실패 시 이니셜로 자동 폴백 (React state 기반)
- 클릭 가능한 상태 및 키보드 접근성 지원

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
      description: "아바타 크기 (sm: 16px, md: 24px, lg: 32px, xl: 48px)",
    },
    initial: {
      control: { type: "text" },
      description: "이니셜 텍스트 (type이 'initial'일 때, 또는 이미지 로드 실패 시 폴백)",
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
      options: ["user", "user-circle", "user-check", "settings", "heart", "star"],
      description: "아이콘 이름 (type이 'icon'일 때 사용, Lucide Icons 기준)",
    },
    onClick: {
      action: "clicked",
      description: "클릭 이벤트 핸들러",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    type: "initial",
    size: "md",
    initial: "U",
  },
};

// 2. 모든 조합 — type × size
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>
          Initial
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {(["sm", "md", "lg", "xl"] as const).map((size) => (
            <div key={size} style={{ textAlign: "center" }}>
              <Avatar type="initial" size={size} initial="W" />
              <div style={{ fontSize: "12px", marginTop: "6px", color: "#6b7280" }}>{size}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>
          Profile
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {(["sm", "md", "lg", "xl"] as const).map((size) => (
            <div key={size} style={{ textAlign: "center" }}>
              <Avatar
                type="profile"
                size={size}
                src="https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=150"
                alt="Profile"
                initial="W"
              />
              <div style={{ fontSize: "12px", marginTop: "6px", color: "#6b7280" }}>{size}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>
          Icon
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {(["sm", "md", "lg", "xl"] as const).map((size) => (
            <div key={size} style={{ textAlign: "center" }}>
              <Avatar type="icon" size={size} iconName="user" />
              <div style={{ fontSize: "12px", marginTop: "6px", color: "#6b7280" }}>{size}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// 3. 이미지 폴백 (에러 케이스)
export const ImageFallback: Story = {
  args: {
    type: "profile",
    size: "lg",
    src: "https://invalid-url.jpg",
    initial: "FB",
    alt: "Fallback example",
  },
};

// 4. 클릭 가능
export const Clickable: Story = {
  args: {
    type: "initial",
    size: "lg",
    initial: "CL",
    onClick: () => {},
  },
};

// 5. 실제 사용 예시
export const UsageExample: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", minWidth: "280px" }}>
      {/* 유저 프로필 행 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        }}
      >
        <Avatar type="initial" size="lg" initial="W" />
        <div>
          <div style={{ fontSize: "14px", fontWeight: "600" }}>Woong</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Frontend Developer</div>
        </div>
      </div>

      {/* 아바타 그룹 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        }}
      >
        <div style={{ display: "flex" }}>
          {["A", "B", "C", "D"].map((initial, i) => (
            <Avatar
              key={initial}
              type="initial"
              size="md"
              initial={initial}
              styleOverride={{ marginLeft: i === 0 ? 0 : -6, zIndex: 4 - i }}
            />
          ))}
          <Avatar
            type="initial"
            size="md"
            initial="+3"
            styleOverride={{ marginLeft: -6 }}
          />
        </div>
        <div style={{ fontSize: "14px", color: "#6b7280" }}>7명이 참여 중</div>
      </div>
    </div>
  ),
};
