import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";

const NAV_ITEMS = [
  { value: "label1", label: "Label" },
  { value: "label2", label: "Label" },
  { value: "label3", label: "Label" },
  { value: "label4", label: "Label", hasSubmenu: true },
  { value: "label5", label: "Label" },
];

const meta = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
앱 상단 고정 네비게이션 Header 컴포넌트입니다.

**특징:**
- 좌측: 로고 영역 (커스텀 가능)
- 중앙: 텍스트 네비게이션 (서브메뉴 chevron 지원, 추후 드롭다운으로 교체 예정)
- 우측: Search, Notification(dot badge), User(Avatar), Settings, Help
- Selected 상태: 하단 파란 border + 연파랑 배경

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    activeNav: {
      control: { type: "select" },
      options: ["label1", "label2", "label3", "label4", "label5"],
      description: "현재 선택된 nav value",
    },
    hasNotification: {
      control: { type: "boolean" },
      description: "알림 dot 표시 여부",
    },
    userSrc: {
      control: { type: "text" },
      description: "유저 프로필 이미지 URL",
    },
    onNavChange: { action: "nav changed" },
    onSubmenuClick: { action: "submenu clicked" },
    onSearch: { action: "search clicked" },
    onNotification: { action: "notification clicked" },
    onUser: { action: "user clicked" },
    onSetting: { action: "setting clicked" },
    onHelp: { action: "help clicked" },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    navItems: NAV_ITEMS,
    activeNav: "label2",
    hasNotification: true,
    userSrc:
      "https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=150",
  },
};

// 2. 모든 조합 — selected / notification / submenu
export const AllVariants: Story = {
  args: {
    navItems: NAV_ITEMS,
    activeNav: "label2",
    hasNotification: true,
  },
  render: () => {
    const [activeNav, setActiveNav] = useState("label2");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* 프로필 이미지 있는 경우 */}
        <div>
          <div
            style={{ fontSize: "12px", color: "#6b7280", padding: "0 0 8px 0" }}
          >
            With Profile Image + Notification
          </div>
          <Header
            navItems={NAV_ITEMS}
            activeNav={activeNav}
            hasNotification
            userSrc="https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=150"
            onNavChange={setActiveNav}
            styleOverride={{ border: "1px solid #e5e7eb" }}
          />
        </div>

        {/* 이니셜 아바타 */}
        <div>
          <div
            style={{ fontSize: "12px", color: "#6b7280", padding: "0 0 8px 0" }}
          >
            With Initial Avatar, No Notification
          </div>
          <Header
            navItems={NAV_ITEMS}
            activeNav={activeNav}
            hasNotification={false}
            onNavChange={setActiveNav}
            styleOverride={{ border: "1px solid #e5e7eb" }}
          />
        </div>

        {/* 커스텀 로고 */}
        <div>
          <div
            style={{ fontSize: "12px", color: "#6b7280", padding: "0 0 8px 0" }}
          >
            Custom Logo
          </div>
          <Header
            logo={
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "800",
                  color: "#2563eb",
                  letterSpacing: "-0.5px",
                }}
              >
                ganjang
              </div>
            }
            navItems={NAV_ITEMS}
            activeNav={activeNav}
            hasNotification
            onNavChange={setActiveNav}
            styleOverride={{ border: "1px solid #e5e7eb" }}
          />
        </div>
      </div>
    );
  },
};

// 3. 실제 사용 예시 — 레이아웃 컨텍스트
export const UsageExample: Story = {
  args: {
    navItems: NAV_ITEMS,
    activeNav: "label2",
    hasNotification: true,
    userSrc:
      "https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=150",
  },
  render: () => {
    const [activeNav, setActiveNav] = useState("label2");

    const CONTENT: Record<string, string> = {
      label1: "Label 1 화면",
      label2: "Label 2 화면",
      label3: "Label 3 화면",
      label4: "Label 4 화면 (서브메뉴)",
      label5: "Label 5 화면",
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "400px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ borderBottom: "1px solid #e5e7eb" }}>
          <Header
            navItems={NAV_ITEMS}
            activeNav={activeNav}
            hasNotification
            userSrc="https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=150"
            onNavChange={setActiveNav}
            onSubmenuClick={(val) => setActiveNav(val)}
          />
        </div>

        {/* 콘텐츠 */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            color: "#6b7280",
            background: "#f9fafb",
          }}
        >
          {CONTENT[activeNav]}
        </div>
      </div>
    );
  },
};
