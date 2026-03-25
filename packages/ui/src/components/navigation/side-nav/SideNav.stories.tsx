import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SideNav from "./SideNav";

const SAMPLE_GROUPS = [
  {
    items: [
      { value: "home",      label: "홈",      icon: "home"        as const },
      { value: "orders",    label: "구매목록", icon: "inbox"       as const },
      { value: "products",  label: "상품",     icon: "tag"         as const },
      { value: "customers", label: "고객",     icon: "user"        as const, badge: "10+" },
      { value: "analytics", label: "분석",     icon: "bar-chart-2" as const },
      { value: "marketing", label: "마케팅",   icon: "target"      as const },
    ],
  },
  {
    heading: "세일즈 채널",
    items: [
      { value: "instagram", label: "인스타그램", icon: "instagram" as const },
      { value: "facebook",  label: "페이스북",   icon: "facebook"  as const },
      { value: "youtube",   label: "유투브",     icon: "youtube"   as const },
      { value: "twitter",   label: "트위터",     icon: "twitter"   as const },
    ],
  },
  {
    heading: "탭",
    items: [
      { value: "add-app",   label: "앱 추가하기", icon: "plus-circle" as const },
      { value: "settings",  label: "앱세팅",      icon: "settings"    as const },
    ],
  },
];

const meta = {
  title: "Navigation/SideNav",
  component: SideNav,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
관리자/대시보드 화면의 사이드 네비게이션 컴포넌트입니다.

**특징:**
- 3가지 타입: \`full\` (아이콘 + 라벨, 240px), \`icon-only\` (아이콘만, 48px), \`icon-label\` (아이콘 + 라벨 수직, 70px)
- 그룹 heading과 divider 지원
- badge, description 지원
- 개별 아이템 disabled 지원

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["full", "icon-only", "icon-label"],
      description: "표시 타입 (full: 240px, icon-only: 48px, icon-label: 70px)",
    },
    onChange: {
      action: "changed",
      description: "메뉴 변경 핸들러",
    },
  },
} satisfies Meta<typeof SideNav>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    groups: SAMPLE_GROUPS,
    value: "customers",
    type: "full",
  },
};

// 2. 모든 타입 — Figma 레이아웃 기준
export const AllVariants: Story = {
  args: {
    groups: SAMPLE_GROUPS,
    value: "customers",
    type: "full",
  },
  render: () => {
    const [value, setValue] = useState("customers");

    return (
      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
        {/* Full */}
        <div>
          <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "0.5rem" }}>full</div>
          <SideNav
            groups={SAMPLE_GROUPS}
            value={value}
            type="full"
            onChange={setValue}
            styleOverride={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}
          />
        </div>

        {/* Icon only */}
        <div>
          <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "0.5rem" }}>icon-only</div>
          <SideNav
            groups={SAMPLE_GROUPS}
            value={value}
            type="icon-only"
            onChange={setValue}
            styleOverride={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}
          />
        </div>

        {/* Icon & Label */}
        <div>
          <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "0.5rem" }}>icon-label</div>
          <SideNav
            groups={SAMPLE_GROUPS}
            value={value}
            type="icon-label"
            onChange={setValue}
            styleOverride={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}
          />
        </div>
      </div>
    );
  },
};

// 3. disabled 아이템 포함
export const WithDisabled: Story = {
  args: {
    groups: [
      {
        items: [
          { value: "home",      label: "홈",      icon: "home"        as const },
          { value: "orders",    label: "구매목록", icon: "inbox"       as const },
          { value: "products",  label: "상품",     icon: "tag"         as const, disabled: true },
          { value: "customers", label: "고객",     icon: "user"        as const },
          { value: "analytics", label: "분석",     icon: "bar-chart-2" as const, disabled: true },
        ],
      },
    ],
    value: "home",
    type: "full",
  },
};

// 4. 실제 사용 예시 — 대시보드 레이아웃
export const UsageExample: Story = {
  args: {
    groups: SAMPLE_GROUPS,
    value: "customers",
    type: "full",
  },
  render: () => {
    const [value, setValue] = useState("customers");
    const [type, setType] = useState<"full" | "icon-only">("full");

    const CONTENT: Record<string, string> = {
      home: "🏠 홈 대시보드",
      orders: "📥 구매목록",
      products: "🏷️ 상품 관리",
      customers: "👤 고객 관리",
      analytics: "📊 분석",
      marketing: "🎯 마케팅",
      instagram: "📸 인스타그램",
      facebook: "👍 페이스북",
      youtube: "▶️ 유투브",
      twitter: "🐦 트위터",
      "add-app": "➕ 앱 추가하기",
      settings: "⚙️ 앱세팅",
    };

    return (
      <div
        style={{
          display: "flex",
          height: "600px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* SideNav */}
        <SideNav
          groups={SAMPLE_GROUPS}
          value={value}
          type={type}
          onChange={setValue}
        />

        {/* 콘텐츠 영역 */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", borderLeft: "1px solid #e5e7eb" }}>
          {/* 헤더 */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: "600" }}>
              {CONTENT[value] ?? value}
            </span>
            <button
              onClick={() => setType(type === "full" ? "icon-only" : "full")}
              style={{
                padding: "4px 10px",
                fontSize: "12px",
                border: "1px solid #e5e7eb",
                borderRadius: "4px",
                cursor: "pointer",
                background: "none",
              }}
            >
              {type === "full" ? "접기" : "펼치기"}
            </button>
          </div>

          {/* 본문 */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              color: "#6b7280",
            }}
          >
            {CONTENT[value]} 화면
          </div>
        </div>
      </div>
    );
  },
};
