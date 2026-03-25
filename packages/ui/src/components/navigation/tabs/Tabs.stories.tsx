import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Tabs from "./Tabs";

const SAMPLE_ITEMS = [
  { value: "overview", label: "Overview", icon: "heart" as const },
  { value: "names", label: "Possible Names", icon: "heart" as const },
  { value: "grouping", label: "Grouping", icon: "heart" as const },
  { value: "anatomy", label: "Anatomy", icon: "heart" as const },
  { value: "properties", label: "Properties", icon: "heart" as const },
];

const SAMPLE_ITEMS_DISABLED = [
  { value: "overview", label: "Overview", icon: "heart" as const },
  { value: "names", label: "Possible Names", icon: "heart" as const },
  { value: "grouping", label: "Grouping", icon: "heart" as const },
  { value: "anatomy", label: "Anatomy", icon: "heart" as const },
  {
    value: "properties",
    label: "Properties",
    icon: "heart" as const,
    disabled: true,
  },
];

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
콘텐츠 섹션 간 이동을 위한 Tabs 컴포넌트입니다.

**특징:**
- 2가지 variant: \`underline\` (하단 라인), \`box\` (border 박스)
- 2~8개 탭 항목 지원 (Figma 기준)
- 아이콘 선택 지원 (Lucide Icons 기준)
- 키보드 접근성: ← → Home End 키로 탭 이동
- 개별 탭 \`disabled\` 지원

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["underline", "box"],
      description: "탭 스타일 (underline: 하단 라인, box: border 박스)",
    },
    onChange: {
      action: "changed",
      description: "탭 변경 핸들러",
    },
  },
  args: {
    onChange: () => {},
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    items: SAMPLE_ITEMS,
    value: "overview",
    variant: "underline",
  },
};

// 2. 모든 조합 — variant × selected × disabled
export const AllVariants: Story = {
  args: {
    items: SAMPLE_ITEMS,
    value: "overview",
    variant: "underline",
  },
  render: () => {
    const [underlineValue, setUnderlineValue] = useState("overview");
    const [boxValue, setBoxValue] = useState("overview");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        {/* Underline */}
        <div>
          <h3
            style={{
              margin: "0 0 1rem 0",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Underline
          </h3>
          <Tabs
            items={SAMPLE_ITEMS_DISABLED}
            value={underlineValue}
            variant="underline"
            onChange={setUnderlineValue}
          />
        </div>

        {/* Box */}
        <div>
          <h3
            style={{
              margin: "0 0 1rem 0",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Box
          </h3>
          <Tabs
            items={SAMPLE_ITEMS_DISABLED}
            value={boxValue}
            variant="box"
            onChange={setBoxValue}
          />
        </div>

        {/* 아이콘 없는 버전 */}
        <div>
          <h3
            style={{
              margin: "0 0 1rem 0",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Icon 없음
          </h3>
          <Tabs
            items={SAMPLE_ITEMS.map(({ icon, ...rest }) => rest)}
            value={underlineValue}
            variant="underline"
            onChange={setUnderlineValue}
          />
        </div>
      </div>
    );
  },
};

// 3. 비활성화
export const Disabled: Story = {
  args: {
    items: SAMPLE_ITEMS_DISABLED,
    value: "overview",
    variant: "underline",
  },
};

// 4. 실제 사용 예시 — 탭 + 콘텐츠 패널
export const UsageExample: Story = {
  args: {
    items: SAMPLE_ITEMS,
    value: "overview",
    variant: "underline",
  },
  render: () => {
    const [activeTab, setActiveTab] = useState("overview");

    const TAB_ITEMS = [
      {
        value: "overview",
        label: "Overview",
        icon: "layout-dashboard" as const,
      },
      { value: "settings", label: "Settings", icon: "settings" as const },
      { value: "members", label: "Members", icon: "users" as const },
      {
        value: "logs",
        label: "Logs",
        icon: "file-text" as const,
        disabled: true,
      },
    ];

    const CONTENT: Record<string, React.ReactNode> = {
      overview: (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <div style={{ fontSize: "14px", fontWeight: "600" }}>
            프로젝트 개요
          </div>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>
            ganjang_front 디자인 시스템 컴포넌트 라이브러리입니다.
          </div>
        </div>
      ),
      settings: (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <div style={{ fontSize: "14px", fontWeight: "600" }}>설정</div>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>
            프로젝트 설정을 관리합니다.
          </div>
        </div>
      ),
      members: (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <div style={{ fontSize: "14px", fontWeight: "600" }}>팀원</div>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>
            팀원을 관리합니다.
          </div>
        </div>
      ),
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          minWidth: "480px",
        }}
      >
        {/* Underline + 콘텐츠 */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Tabs
            items={TAB_ITEMS}
            value={activeTab}
            variant="underline"
            onChange={setActiveTab}
            styleOverride={{ width: "100%" }}
          />
          <div style={{ padding: "1.5rem" }}>{CONTENT[activeTab] ?? null}</div>
        </div>

        {/* Box */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Tabs
            items={TAB_ITEMS.slice(0, 3)}
            value={activeTab}
            variant="box"
            onChange={setActiveTab}
          />
          <div style={{ padding: "0.5rem" }}>{CONTENT[activeTab] ?? null}</div>
        </div>
      </div>
    );
  },
};
