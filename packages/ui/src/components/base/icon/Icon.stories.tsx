import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Icon from "./Icon";

const meta = {
  title: "Base/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Lucide Icons 기반 아이콘 컴포넌트입니다.

**특징:**
- Figma 디자인 시스템의 아이콘 세트(Feather Icons)와 동일한 라이브러리
- 1600+ 아이콘을 이름(string)으로 바로 사용 가능
- 4가지 크기: \`sm\` (16px), \`md\` (24px), \`lg\` (32px), \`xl\` (48px)
- \`strokeWidth\` prop으로 선 두께 조절 가능
- 전체 아이콘 목록: https://lucide.dev/icons

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: { type: "text" },
      description: "아이콘 이름 (Lucide Icons 기준, https://lucide.dev/icons)",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "아이콘 크기 (sm: 16px, md: 24px, lg: 32px, xl: 48px)",
    },
    color: {
      control: { type: "color" },
      description: "아이콘 색상 (기본값: currentColor)",
    },
    strokeWidth: {
      control: { type: "number", min: 0.5, max: 4, step: 0.5 },
      description: "선 두께 (기본값: 2)",
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    name: "info",
    size: "md",
  },
};

// 2. 크기
export const Sizes: Story = {
  args: {
    name: "star",
    size: "md",
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} style={{ textAlign: "center" }}>
          <Icon name="star" size={size} />
          <div style={{ fontSize: "12px", marginTop: "6px", color: "#6b7280" }}>
            {size} ({size === "sm" ? 16 : size === "md" ? 24 : size === "lg" ? 32 : 48}px)
          </div>
        </div>
      ))}
    </div>
  ),
};

// 3. StrokeWidth
export const StrokeWidths: Story = {
  args: {
    name: "circle",
    size: "lg",
    strokeWidth: 2,
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
      {[1, 1.5, 2, 2.5, 3].map((sw) => (
        <div key={sw} style={{ textAlign: "center" }}>
          <Icon name="circle" size="lg" strokeWidth={sw} />
          <div style={{ fontSize: "12px", marginTop: "6px", color: "#6b7280" }}>
            {sw}
          </div>
        </div>
      ))}
    </div>
  ),
};

// 4. 자주 쓰는 아이콘 모음 (Figma 디자인 시스템 기준)
export const CommonIcons: Story = {
  args: {
    name: "plus",
    size: "md",
  },
  render: () => {
    const icons = [
      "plus", "minus", "x", "check", "search", "settings",
      "trash-2", "edit-2", "copy", "download", "upload", "share-2",
      "arrow-left", "arrow-right", "arrow-up", "arrow-down",
      "chevron-left", "chevron-right", "chevron-up", "chevron-down",
      "info", "alert-circle", "alert-triangle", "check-circle",
      "user", "users", "mail", "phone", "calendar", "clock",
      "folder", "file", "image", "link", "lock", "eye",
    ] as const;

    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", maxWidth: "600px" }}>
        {icons.map((name) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "72px" }}>
            <Icon name={name} size="md" />
            <div style={{ fontSize: "10px", marginTop: "6px", color: "#6b7280", textAlign: "center", wordBreak: "break-all" }}>
              {name}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// 5. 색상
export const Colors: Story = {
  args: {
    name: "heart",
    size: "md",
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Icon name="heart" size="md" color="var(--bg-interactive-primary)" />
      <Icon name="heart" size="md" color="var(--bg-interactive-danger)" />
      <Icon name="heart" size="md" color="var(--text-interactive-secondary)" />
      <Icon name="heart" size="md" color="var(--text-disabled)" />
    </div>
  ),
};

// 6. 실제 사용 예시
export const UsageExample: Story = {
  args: {
    name: "search",
    size: "sm",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", minWidth: "280px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        }}
      >
        <Icon name="search" size="sm" color="#6b7280" />
        <span style={{ fontSize: "14px", color: "#9ca3af" }}>검색어를 입력하세요</span>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            background: "#f3f4f6",
            borderRadius: "6px",
            fontSize: "14px",
          }}
        >
          <Icon name="folder" size="sm" />
          프로젝트
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            background: "#f3f4f6",
            borderRadius: "6px",
            fontSize: "14px",
          }}
        >
          <Icon name="settings" size="sm" />
          설정
        </div>
      </div>
    </div>
  ),
};
