import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import BottomNav from "./BottomNav";

const SAMPLE_ITEMS_5 = [
  { value: "home", icon: "home" as const, label: "홈" },
  { value: "movies", icon: "film" as const, label: "영화" },
  { value: "search", icon: "search" as const, label: "검색" },
  { value: "bookmark", icon: "star" as const, label: "즐겨찾기" },
  { value: "profile", icon: "user" as const, label: "프로필" },
];

const SAMPLE_ITEMS_4 = SAMPLE_ITEMS_5.slice(0, 4);
const SAMPLE_ITEMS_3 = SAMPLE_ITEMS_5.slice(0, 3);

const SAMPLE_ITEMS_DISABLED = [
  { value: "home", icon: "home" as const, label: "홈" },
  { value: "movies", icon: "film" as const, label: "영화" },
  { value: "search", icon: "search" as const, label: "검색" },
  { value: "bookmark", icon: "star" as const, label: "즐겨찾기" },
  { value: "profile", icon: "user" as const, label: "프로필", disabled: true },
];

const meta = {
  title: "Navigation/BottomNav",
  component: BottomNav,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
모바일 앱의 하단 고정 네비게이션 컴포넌트입니다.

**특징:**
- 2가지 타입: \`icon-only\` (아이콘만), \`icon-label\` (아이콘 + 라벨)
- 3~5개 항목 지원 (Figma 기준)
- 선택 시 pill 형태 배경 강조 (iOS/Android Material You 스타일)
- 개별 항목 \`disabled\` 지원

Figma 디자인 시스템을 기반으로 제작되었습니다.
      `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["icon-only", "icon-label"],
      description: "타입 (icon-only: 아이콘만, icon-label: 아이콘 + 라벨)",
    },
    onChange: {
      action: "changed",
      description: "탭 변경 핸들러",
    },
  },
} satisfies Meta<typeof BottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    items: SAMPLE_ITEMS_5,
    value: "home",
    type: "icon-label",
  },
};

// 2. 모든 조합 — type × items 수
export const AllVariants: Story = {
  args: {
    items: SAMPLE_ITEMS_5,
    value: "home",
    type: "icon-label",
  },
  render: () => {
    const [value, setValue] = useState("home");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "480px" }}>
        {/* Icon & Label */}
        <div>
          <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "16px", fontWeight: "600" }}>
            Icon & Label — 5items
          </h3>
          <BottomNav items={SAMPLE_ITEMS_5} value={value} type="icon-label" onChange={setValue} />
        </div>

        <div>
          <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "16px", fontWeight: "600" }}>
            Icon & Label — 4items
          </h3>
          <BottomNav items={SAMPLE_ITEMS_4} value={value} type="icon-label" onChange={setValue} />
        </div>

        <div>
          <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "16px", fontWeight: "600" }}>
            Icon & Label — 3items
          </h3>
          <BottomNav items={SAMPLE_ITEMS_3} value={value} type="icon-label" onChange={setValue} />
        </div>

        {/* Icon Only */}
        <div>
          <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "16px", fontWeight: "600" }}>
            Icon Only — 5items
          </h3>
          <BottomNav items={SAMPLE_ITEMS_5} value={value} type="icon-only" onChange={setValue} />
        </div>

        <div>
          <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "16px", fontWeight: "600" }}>
            Icon Only — 4items
          </h3>
          <BottomNav items={SAMPLE_ITEMS_4} value={value} type="icon-only" onChange={setValue} />
        </div>

        <div>
          <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "16px", fontWeight: "600" }}>
            Icon Only — 3items
          </h3>
          <BottomNav items={SAMPLE_ITEMS_3} value={value} type="icon-only" onChange={setValue} />
        </div>
      </div>
    );
  },
};

// 3. 비활성화 항목 포함
export const WithDisabled: Story = {
  args: {
    items: SAMPLE_ITEMS_DISABLED,
    value: "home",
    type: "icon-label",
  },
};

// 4. 실제 사용 예시 — 모바일 앱 화면
export const UsageExample: Story = {
  args: {
    items: SAMPLE_ITEMS_5,
    value: "home",
    type: "icon-label",
  },
  render: () => {
    const [activeTab, setActiveTab] = useState("home");

    const CONTENT: Record<string, React.ReactNode> = {
      home: "🏠 홈 화면 콘텐츠",
      movies: "🎬 영화 목록",
      search: "🔍 검색 화면",
      bookmark: "⭐ 즐겨찾기",
      profile: "👤 프로필 설정",
    };

    return (
      <div
        style={{
          width: "375px",
          height: "480px",
          border: "1px solid #e5e7eb",
          borderRadius: "24px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background: "#f9fafb",
          position: "relative",
        }}
      >
        {/* 콘텐츠 영역 */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            color: "#374151",
          }}
        >
          {CONTENT[activeTab]}
        </div>

        {/* Bottom Nav — 하단 고정 */}
        <BottomNav
          items={SAMPLE_ITEMS_5}
          value={activeTab}
          type="icon-label"
          onChange={setActiveTab}
        />
      </div>
    );
  },
};
