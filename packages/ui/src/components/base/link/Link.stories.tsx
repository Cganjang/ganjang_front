import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Link from "./Link";

const meta = {
  title: "Base/Link",
  component: Link,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
다른 페이지나 섹션으로 이동하는 Link 컴포넌트입니다.

**특징:**
- 2가지 타입: \`primary\` (파란색), \`secondary\` (회색)
- 2가지 스타일: \`underline\` (밑줄), \`standalone\` (배경 hover)
- 6가지 상태: Default, Hover, Press, Focus, Visited, Disabled
- leading/trailing 아이콘 지원

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "text" },
      description: "링크 텍스트",
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
      description: "링크 타입 (primary: 파랑, secondary: 회색)",
    },
    linkStyle: {
      control: { type: "select" },
      options: ["underline", "standalone"],
      description: "링크 스타일 (Figma 기준)",
    },
    leadingIcon: {
      control: { type: "select" },
      options: [undefined, "heart", "user", "info", "star"],
      description: "리딩 아이콘 이름 (Lucide Icons 기준)",
    },
    trailingIcon: {
      control: { type: "select" },
      options: [undefined, "chevron-right", "external-link", "arrow-right"],
      description: "트레일링 아이콘 이름 (Lucide Icons 기준)",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성 상태",
    },
    href: {
      control: { type: "text" },
      description: "링크 URL",
    },
    target: {
      control: { type: "select" },
      options: [undefined, "_blank", "_self"],
      description: "링크 타겟",
    },
    onClick: {
      action: "clicked",
      description: "클릭 이벤트 핸들러",
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    children: "Label",
    variant: "primary",
    linkStyle: "underline",
    leadingIcon: "heart",
    trailingIcon: "chevron-right",
    href: "#",
  },
};

// 2. 모든 조합 — Figma 레이아웃 기준 (type × style × state)
export const AllVariants: Story = {
  args: {
    children: "Label",
    variant: "primary",
    linkStyle: "underline",
    leadingIcon: "heart",
    trailingIcon: "chevron-right",
    href: "#",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {(["primary", "secondary"] as const).map((variant) => (
        <div key={variant}>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600", textTransform: "capitalize" }}>
            {variant}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {(["underline", "standalone"] as const).map((linkStyle) => (
              <div key={linkStyle} style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "#6b7280", width: "80px" }}>{linkStyle}</span>
                <Link variant={variant} linkStyle={linkStyle} leadingIcon="heart" trailingIcon="chevron-right" href="#">
                  Label
                </Link>
                <Link variant={variant} linkStyle={linkStyle} leadingIcon="heart" trailingIcon="chevron-right" disabled href="#">
                  Label
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// 3. 비활성화
export const Disabled: Story = {
  args: {
    children: "Label",
    variant: "primary",
    linkStyle: "underline",
    leadingIcon: "heart",
    trailingIcon: "chevron-right",
    disabled: true,
    href: "#",
  },
};

// 4. 실제 사용 예시
export const UsageExample: Story = {
  args: {
    children: "더 보기",
    variant: "primary",
    linkStyle: "standalone",
    trailingIcon: "chevron-right",
    href: "#",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "360px" }}>
      {/* 인라인 링크 */}
      <div
        style={{
          padding: "1rem",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          lineHeight: 1.8,
          fontSize: "14px",
        }}
      >
        Ceph 스토리지는{" "}
        <Link variant="primary" linkStyle="underline" href="#">
          분산 스토리지 시스템
        </Link>
        으로, 높은 가용성을 제공합니다.{" "}
        <Link variant="secondary" linkStyle="underline" href="#">
          자세히 보기
        </Link>
      </div>

      {/* 네비게이션 링크 */}
      <div
        style={{
          padding: "1rem",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        {["대시보드", "스토리지 풀", "파일 시스템", "설정"].map((label) => (
          <Link
            key={label}
            variant="secondary"
            linkStyle="standalone"
            trailingIcon="chevron-right"
            href="#"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* 외부 링크 */}
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link variant="primary" linkStyle="standalone" trailingIcon="chevron-right" href="#">
          더 보기
        </Link>
        <Link
          variant="primary"
          linkStyle="standalone"
          trailingIcon="external-link"
          href="https://docs.ceph.com"
          target="_blank"
        >
          공식 문서
        </Link>
      </div>
    </div>
  ),
};
