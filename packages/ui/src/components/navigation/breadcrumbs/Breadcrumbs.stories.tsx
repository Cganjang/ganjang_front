import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Breadcrumbs from "./Breadcrumbs";
import type { BreadcrumbItem } from "./Breadcrumbs";

const meta = {
  title: "Navigation/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
계층 경로를 표시하는 Breadcrumbs 컴포넌트입니다.

**특징:**
- 마지막 항목은 **현재 페이지** 스타일(\`aria-current="page"\`)
- 이전 단계는 링크(밑줄, primary 색) + \`chevron-right\` 구분
- 항목별 선택적 **아이콘** (Lucide \`Icon\`)

Figma **Breadcrumbs** 노드를 기준으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE_EN: BreadcrumbItem[] = [
  { label: "Home", href: "#" },
  { label: "Movie", href: "#" },
  { label: "Favorite", href: "#" },
  { label: "Top Ranking", href: "#" },
  { label: "Top 50" },
];

const SAMPLE_KO: BreadcrumbItem[] = [
  { label: "스토어", href: "#" },
  { label: "브랜드샵", href: "#" },
  { label: "컨버스" },
];

const SAMPLE_WITH_ICONS: BreadcrumbItem[] = [
  { label: "Label", href: "#", icon: "heart" },
  { label: "Label", href: "#", icon: "heart" },
  { label: "Label", href: "#", icon: "heart" },
  { label: "Label", href: "#", icon: "heart" },
  { label: "current page" },
];

export const Default: Story = {
  args: {
    items: SAMPLE_EN,
  },
};

export const Korean: Story = {
  args: {
    items: SAMPLE_KO,
  },
};

export const WithIcons: Story = {
  args: {
    items: SAMPLE_WITH_ICONS,
  },
};

export const MaxLevels: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: 720,
      }}
    >
      <div>
        <p
          style={{
            margin: "0 0 8px 0",
            fontSize: 12,
            fontWeight: 600,
            color: "#6b7280",
          }}
        >
          2단계
        </p>
        <Breadcrumbs items={SAMPLE_EN.slice(0, 2)} />
      </div>
      <div>
        <p
          style={{
            margin: "0 0 8px 0",
            fontSize: 12,
            fontWeight: 600,
            color: "#6b7280",
          }}
        >
          3단계
        </p>
        <Breadcrumbs items={SAMPLE_EN.slice(0, 3)} />
      </div>
      <div>
        <p
          style={{
            margin: "0 0 8px 0",
            fontSize: 12,
            fontWeight: 600,
            color: "#6b7280",
          }}
        >
          4단계
        </p>
        <Breadcrumbs items={SAMPLE_EN.slice(0, 4)} />
      </div>
      <div>
        <p
          style={{
            margin: "0 0 8px 0",
            fontSize: 12,
            fontWeight: 600,
            color: "#6b7280",
          }}
        >
          5단계
        </p>
        <Breadcrumbs items={SAMPLE_EN} />
      </div>
    </div>
  ),
};
