import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import EmptyState from "./EmptyState";

const meta = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
데이터가 없거나 비어 있는 상태를 나타내는 EmptyState 컴포넌트입니다.

**특징:**
- 아이콘, 제목, 설명, 액션 버튼을 조합할 수 있습니다.
- 아이콘을 지정하지 않으면 기본 inbox 아이콘이 표시됩니다.
- 크기 옵션: \`sm\`, \`md\`, \`lg\`
- 액션 버튼의 스타일을 \`filled\` 또는 \`outline\`으로 지정할 수 있습니다.

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "text",
      description: "Lucide 아이콘 이름 (https://lucide.dev/icons 참고)",
      defaultValue: "inbox",
    },
    title: {
      control: "text",
      description: "제목",
    },
    description: {
      control: "text",
      description: "설명 텍스트 (선택)",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "크기 (sm: 작음, md: 기본, lg: 큼)",
      defaultValue: "md",
    },
    action: {
      control: false,
      description:
        "액션 버튼 설정 { label: string, onClick: () => void, variant?: 'filled' | 'outline' }",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스",
    },
    styleOverride: {
      control: false,
      description: "인라인 스타일",
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "데이터가 없습니다",
    icon: "inbox",
    size: "md",
  },
};

export const WithDescription: Story = {
  args: {
    title: "검색 결과가 없습니다",
    description: "다른 검색어로 시도해주세요.",
    icon: "search",
    size: "md",
  },
};

export const WithAction: Story = {
  args: {
    title: "항목이 없습니다",
    description: "새 항목을 추가하여 시작하세요.",
    icon: "plus-circle",
    size: "md",
    action: {
      label: "항목 추가",
      onClick: () => alert("항목 추가 클릭!"),
      variant: "filled",
    },
  },
};

export const WithCustomIcon: Story = {
  args: {
    title: "파일이 없습니다",
    description: "파일을 업로드하여 시작하세요.",
    icon: "file-x",
    size: "md",
    action: {
      label: "파일 업로드",
      onClick: () => alert("파일 업로드 클릭!"),
      variant: "outline",
    },
  },
};

export const SmallSize: Story = {
  args: {
    title: "비어 있음",
    description: "항목이 없습니다",
    icon: "inbox",
    size: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    title: "아직 준비 중입니다",
    description: "이 섹션은 곧 제공될 예정입니다.",
    icon: "hourglass",
    size: "lg",
    action: {
      label: "알림 구독",
      onClick: () => alert("알림 구독!"),
      variant: "filled",
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      <div>
        <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "14px" }}>
          기본 (md)
        </h3>
        <EmptyState
          title="데이터가 없습니다"
          icon="inbox"
          size="md"
        />
      </div>

      <div>
        <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "14px" }}>
          설명 포함 (md)
        </h3>
        <EmptyState
          title="검색 결과가 없습니다"
          description="다른 검색어로 시도해주세요."
          icon="search"
          size="md"
        />
      </div>

      <div>
        <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "14px" }}>
          액션 포함 (md)
        </h3>
        <EmptyState
          title="목록이 비어 있습니다"
          description="새 항목을 추가하세요."
          icon="plus-circle"
          size="md"
          action={{
            label: "추가",
            onClick: () => alert("추가"),
            variant: "filled",
          }}
        />
      </div>

      <div>
        <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "14px" }}>
          작은 크기 (sm)
        </h3>
        <EmptyState
          title="비어 있음"
          icon="inbox"
          size="sm"
        />
      </div>

      <div>
        <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "14px" }}>
          큰 크기 (lg)
        </h3>
        <EmptyState
          title="아직 데이터가 없습니다"
          description="곧 추가될 예정입니다."
          icon="inbox"
          size="lg"
        />
      </div>
    </div>
  ),
};

export const UsageExample: Story = {
  render: () => (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "24px",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <EmptyState
        title="아직 생성된 프로젝트가 없습니다"
        description="새로운 프로젝트를 만들어 시작해보세요."
        icon="folder-plus"
        size="md"
        action={{
          label: "프로젝트 생성",
          onClick: () => alert("프로젝트 생성!"),
          variant: "filled",
        }}
      />
    </div>
  ),
};
