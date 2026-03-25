import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CheckGroup from "@ui/components/forms/checkbox/CheckGroup";

const SAMPLE_ITEMS = [
  { label: "네이버", value: "naver" },
  { label: "카카오", value: "kakao" },
  { label: "라인", value: "line" },
  { label: "쿠팡", value: "coupang" },
  { label: "배민", value: "baemin" },
  { label: "당근", value: "daangn" },
  { label: "토스", value: "toss" },
  { label: "카뱅", value: "kakaobank" },
];

const meta = {
  title: "Forms/CheckGroup",
  component: CheckGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
여러 Checkbox를 그룹으로 관리하는 CheckGroup 컴포넌트입니다.

**특징:**
- \`vertical\` (세로) / \`horizontal\` (가로) 방향 지원
- \`value\` 배열로 선택 상태 controlled 관리
- 그룹 전체 \`disabled\`, \`error\` 지원
- 개별 항목에도 \`disabled\`, \`error\` 설정 가능

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["vertical", "horizontal"],
      description: "레이아웃 방향",
    },
    disabled: {
      control: { type: "boolean" },
      description: "그룹 전체 비활성화",
    },
    error: {
      control: { type: "boolean" },
      description: "그룹 전체 에러",
    },
    onChange: {
      action: "changed",
      description: "변경 이벤트 핸들러",
    },
  },
} satisfies Meta<typeof CheckGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    items: SAMPLE_ITEMS.slice(0, 4),
    value: ["naver"],
    direction: "vertical",
  },
};

// 2. 모든 조합 — direction × state
export const AllVariants: Story = {
  args: {
    items: SAMPLE_ITEMS.slice(0, 4),
    value: ["naver"],
    direction: "vertical",
  },
  render: () => (
    <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start" }}>
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>Vertical</h3>
        <CheckGroup
          items={SAMPLE_ITEMS.slice(0, 6)}
          value={["naver", "kakao"]}
          direction="vertical"
        />
      </div>
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>Horizontal</h3>
        <CheckGroup
          items={SAMPLE_ITEMS.slice(0, 4)}
          value={["naver"]}
          direction="horizontal"
        />
      </div>
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>Disabled</h3>
        <CheckGroup
          items={SAMPLE_ITEMS.slice(0, 4)}
          value={["naver"]}
          direction="vertical"
          disabled
        />
      </div>
    </div>
  ),
};

// 3. 비활성화
export const Disabled: Story = {
  args: {
    items: SAMPLE_ITEMS.slice(0, 4),
    value: ["naver"],
    disabled: true,
  },
};

// 4. 실제 사용 예시 — controlled
export const UsageExample: Story = {
  args: {
    items: SAMPLE_ITEMS,
    value: [],
  },
  render: () => {
    const [selected, setSelected] = useState(["naver", "kakao"]);

    return (
      <div
        style={{
          padding: "1.5rem",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          minWidth: "200px",
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "0.75rem" }}>
          플랫폼 선택
        </div>
        <CheckGroup
          items={SAMPLE_ITEMS}
          value={selected}
          onChange={setSelected}
        />
        <div style={{ marginTop: "1rem", fontSize: "13px", color: "#6b7280" }}>
          선택됨: {selected.length > 0 ? selected.join(", ") : "없음"}
        </div>
      </div>
    );
  },
};
