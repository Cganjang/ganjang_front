import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "@ui/components/base/button/Button";
import Icon from "@ui/components/base/icon/Icon";
import Avatar from "@ui/components/data-display/avatar/Avatar";

const meta = {
  title: "Base/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Figma 디자인 시스템 기반 Button 컴포넌트입니다.

**특징:**
- 3가지 스타일: \`filled\` (채워진), \`outline\` (테두리), \`transparent\` (투명)
- 3가지 타입: \`primary\` (파란색), \`secondary\` (회색), \`destructive\` (빨간색)
- 6가지 상태: Default, Hover, Press, Focus, Disabled, Loading
- Figma 기준 \`min-width: 130px\`, \`height: 40px\`

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["filled", "outline", "transparent"],
      description: "버튼 스타일 (Figma 기준)",
    },
    type: {
      control: { type: "select" },
      options: ["primary", "secondary", "destructive"],
      description:
        "버튼 타입 (primary: 파란색, secondary: 회색, destructive: 빨간색)",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성화 여부",
    },
    loading: {
      control: { type: "boolean" },
      description: "로딩 상태 여부",
    },
    htmlType: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
      description: "HTML button type 속성",
    },
    children: {
      control: { type: "text" },
      description: "버튼 내부 텍스트 또는 요소",
    },
    onClick: {
      action: "clicked",
      description: "클릭 이벤트 핸들러",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태 — controls 패널과 연동
export const Default: Story = {
  args: {
    children: "Button",
    variant: "filled",
    type: "primary",
  },
};

// 2. 모든 조합 — Figma 디자인과 동일하게 variant × type × state
export const AllVariants: Story = {
  args: {
    children: "Button",
    variant: "filled",
    type: "primary",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3
          style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}
        >
          Filled
        </h3>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <Button variant="filled" type="primary">
            Primary
          </Button>
          <Button variant="filled" type="secondary">
            Secondary
          </Button>
          <Button variant="filled" type="destructive">
            Destructive
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <Button variant="filled" type="primary" loading>
            Primary
          </Button>
          <Button variant="filled" type="secondary" loading>
            Secondary
          </Button>
          <Button variant="filled" type="destructive" loading>
            Destructive
          </Button>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button variant="filled" type="primary" disabled>
            Primary
          </Button>
          <Button variant="filled" type="secondary" disabled>
            Secondary
          </Button>
          <Button variant="filled" type="destructive" disabled>
            Destructive
          </Button>
        </div>
      </div>

      <div>
        <h3
          style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}
        >
          Outline
        </h3>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <Button variant="outline" type="primary">
            Primary
          </Button>
          <Button variant="outline" type="secondary">
            Secondary
          </Button>
          <Button variant="outline" type="destructive">
            Destructive
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <Button variant="outline" type="primary" loading>
            Primary
          </Button>
          <Button variant="outline" type="secondary" loading>
            Secondary
          </Button>
          <Button variant="outline" type="destructive" loading>
            Destructive
          </Button>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button variant="outline" type="primary" disabled>
            Primary
          </Button>
          <Button variant="outline" type="secondary" disabled>
            Secondary
          </Button>
          <Button variant="outline" type="destructive" disabled>
            Destructive
          </Button>
        </div>
      </div>

      <div>
        <h3
          style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}
        >
          Transparent
        </h3>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <Button variant="transparent" type="primary">
            Primary
          </Button>
          <Button variant="transparent" type="secondary">
            Secondary
          </Button>
          <Button variant="transparent" type="destructive">
            Destructive
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <Button variant="transparent" type="primary" loading>
            Primary
          </Button>
          <Button variant="transparent" type="secondary" loading>
            Secondary
          </Button>
          <Button variant="transparent" type="destructive" loading>
            Destructive
          </Button>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button variant="transparent" type="primary" disabled>
            Primary
          </Button>
          <Button variant="transparent" type="secondary" disabled>
            Secondary
          </Button>
          <Button variant="transparent" type="destructive" disabled>
            Destructive
          </Button>
        </div>
      </div>
    </div>
  ),
};

// 3. 비활성화 상태
export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

// 4. 로딩 상태
export const Loading: Story = {
  args: {
    children: "Loading",
    loading: true,
  },
};

// 5. 아이콘과 함께 사용
export const WithLeadingIcon: Story = {
  args: {
    children: "저장",
    variant: "filled",
    type: "primary",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button variant="filled" type="primary">
          <Icon name="check" size="sm" />
          저장
        </Button>
        <Button variant="outline" type="secondary">
          <Icon name="chevron-right" size="sm" />
          다음
        </Button>
        <Button variant="filled" type="destructive">
          <Icon name="x" size="sm" />
          삭제
        </Button>
      </div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button variant="filled" type="primary" disabled>
          <Icon name="check" size="sm" />
          저장 (비활성)
        </Button>
        <Button variant="filled" type="primary" loading>
          저장 중
        </Button>
      </div>
    </div>
  ),
};

// 6. 아바타와 함께 사용
export const WithAvatar: Story = {
  args: {
    children: "Woong",
    variant: "filled",
    type: "primary",
  },
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button variant="filled" type="primary">
        <Avatar type="initial" initial="W" size="sm" />
        Woong
      </Button>
      <Button variant="outline" type="secondary">
        <Avatar type="icon" iconName="user" size="sm" />
        프로필
      </Button>
      <Button variant="transparent" type="secondary">
        <Avatar type="initial" initial="A" size="sm" />
        계정 설정
      </Button>
    </div>
  ),
};

// 7. 실제 사용 예시
export const UsageExample: Story = {
  args: {
    children: "계정 삭제",
    variant: "filled",
    type: "destructive",
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        maxWidth: "400px",
      }}
    >
      <div
        style={{
          padding: "1.5rem",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        }}
      >
        <h3
          style={{
            margin: "0 0 0.5rem 0",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          계정 삭제
        </h3>
        <p
          style={{ margin: "0 0 1.5rem 0", fontSize: "14px", color: "#6b7280" }}
        >
          이 작업은 되돌릴 수 없습니다. 계정과 모든 데이터가 영구적으로
          삭제됩니다.
        </p>
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="outline" type="secondary">
            취소
          </Button>
          <Button variant="filled" type="destructive">
            계정 삭제
          </Button>
        </div>
      </div>

      <div
        style={{
          padding: "1.5rem",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        }}
      >
        <h3
          style={{
            margin: "0 0 0.5rem 0",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          프로젝트 생성
        </h3>
        <p
          style={{ margin: "0 0 1.5rem 0", fontSize: "14px", color: "#6b7280" }}
        >
          새로운 프로젝트를 생성하시겠습니까?
        </p>
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="transparent" type="secondary">
            나중에
          </Button>
          <Button variant="outline" type="primary">
            템플릿 선택
          </Button>
          <Button variant="filled" type="primary">
            새로 만들기
          </Button>
        </div>
      </div>
    </div>
  ),
};
