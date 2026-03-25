import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Radio from "./Radio";
import RadioGroup from "./RadioGroup";

const meta = {
  title: "Forms/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Figma 디자인 시스템 기반 Radio 컴포넌트입니다.

**특징:**
- 3가지 크기: \`sm\` (16px), \`md\` (20px), \`lg\` (24px)
- 5가지 상태: Default, Hover, Focus, Checked, Disabled
- \`RadioGroup\`을 통한 그룹 관리 지원
- 수직/수평 배치 지원

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
      description: "라디오 버튼 라벨",
    },
    value: {
      control: { type: "text" },
      description: "라디오 버튼 값",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "라디오 버튼 크기",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성화 여부",
    },
    checked: {
      control: { type: "boolean" },
      description: "선택 상태",
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    label: "Radio Option",
    value: "option1",
    size: "md",
  },
};

// 2. 모든 크기
export const AllSizes: Story = {
  args: {
    label: "Radio",
    value: "default",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h3
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: "600", color: "#6b7280" }}
        >
          Small (16px)
        </h3>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Radio label="Default" value="a" name="size-sm" size="sm" />
          <Radio label="Checked" value="b" name="size-sm-checked" size="sm" defaultChecked />
          <Radio label="Disabled" value="c" name="size-sm-disabled" size="sm" disabled />
          <Radio label="Checked Disabled" value="d" name="size-sm-cd" size="sm" disabled checked />
        </div>
      </div>
      <div>
        <h3
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: "600", color: "#6b7280" }}
        >
          Medium (20px) — Default
        </h3>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Radio label="Default" value="a" name="size-md" size="md" />
          <Radio label="Checked" value="b" name="size-md-checked" size="md" defaultChecked />
          <Radio label="Disabled" value="c" name="size-md-disabled" size="md" disabled />
          <Radio label="Checked Disabled" value="d" name="size-md-cd" size="md" disabled checked />
        </div>
      </div>
      <div>
        <h3
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: "600", color: "#6b7280" }}
        >
          Large (24px)
        </h3>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Radio label="Default" value="a" name="size-lg" size="lg" />
          <Radio label="Checked" value="b" name="size-lg-checked" size="lg" defaultChecked />
          <Radio label="Disabled" value="c" name="size-lg-disabled" size="lg" disabled />
          <Radio label="Checked Disabled" value="d" name="size-lg-cd" size="lg" disabled checked />
        </div>
      </div>
    </div>
  ),
};

// 3. RadioGroup — 수직 배치
export const GroupVertical: Story = {
  args: {
    label: "Radio",
    value: "default",
  },
  render: () => {
    const GroupVerticalExample = () => {
      const [value, setValue] = useState("option1");
      return (
        <div>
          <h3
            style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: "600", color: "#6b7280" }}
          >
            Vertical (기본)
          </h3>
          <RadioGroup
            name="vertical-group"
            value={value}
            onChange={setValue}
            direction="vertical"
          >
            <Radio label="옵션 1" value="option1" />
            <Radio label="옵션 2" value="option2" />
            <Radio label="옵션 3" value="option3" />
            <Radio label="옵션 4 (비활성)" value="option4" disabled />
          </RadioGroup>
          <p style={{ marginTop: "0.75rem", fontSize: "13px", color: "#6b7280" }}>
            선택된 값: <strong>{value}</strong>
          </p>
        </div>
      );
    };
    return <GroupVerticalExample />;
  },
};

// 4. RadioGroup — 수평 배치
export const GroupHorizontal: Story = {
  args: {
    label: "Radio",
    value: "default",
  },
  render: () => {
    const GroupHorizontalExample = () => {
      const [value, setValue] = useState("opt-a");
      return (
        <div>
          <h3
            style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: "600", color: "#6b7280" }}
          >
            Horizontal
          </h3>
          <RadioGroup
            name="horizontal-group"
            value={value}
            onChange={setValue}
            direction="horizontal"
          >
            <Radio label="옵션 A" value="opt-a" />
            <Radio label="옵션 B" value="opt-b" />
            <Radio label="옵션 C" value="opt-c" />
          </RadioGroup>
          <p style={{ marginTop: "0.75rem", fontSize: "13px", color: "#6b7280" }}>
            선택된 값: <strong>{value}</strong>
          </p>
        </div>
      );
    };
    return <GroupHorizontalExample />;
  },
};

// 5. RadioGroup — 크기 통일
export const GroupSizes: Story = {
  args: {
    label: "Radio",
    value: "default",
  },
  render: () => (
    <div style={{ display: "flex", gap: "3rem" }}>
      <div>
        <h3
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: "600", color: "#6b7280" }}
        >
          Small
        </h3>
        <RadioGroup name="group-sm" defaultValue="a" size="sm">
          <Radio label="Option A" value="a" />
          <Radio label="Option B" value="b" />
          <Radio label="Option C" value="c" />
        </RadioGroup>
      </div>
      <div>
        <h3
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: "600", color: "#6b7280" }}
        >
          Medium
        </h3>
        <RadioGroup name="group-md" defaultValue="a" size="md">
          <Radio label="Option A" value="a" />
          <Radio label="Option B" value="b" />
          <Radio label="Option C" value="c" />
        </RadioGroup>
      </div>
      <div>
        <h3
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: "600", color: "#6b7280" }}
        >
          Large
        </h3>
        <RadioGroup name="group-lg" defaultValue="a" size="lg">
          <Radio label="Option A" value="a" />
          <Radio label="Option B" value="b" />
          <Radio label="Option C" value="c" />
        </RadioGroup>
      </div>
    </div>
  ),
};

// 6. 비활성화 그룹
export const DisabledGroup: Story = {
  args: {
    label: "Radio",
    value: "default",
  },
  render: () => (
    <div>
      <h3
        style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: "600", color: "#6b7280" }}
      >
        전체 비활성화
      </h3>
      <RadioGroup name="disabled-group" defaultValue="opt2" disabled>
        <Radio label="옵션 1" value="opt1" />
        <Radio label="옵션 2" value="opt2" />
        <Radio label="옵션 3" value="opt3" />
      </RadioGroup>
    </div>
  ),
};

// 7. 라벨 없이 사용
export const WithoutLabel: Story = {
  args: {
    value: "no-label",
    size: "md",
  },
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <Radio value="a" name="no-label" size="sm" />
      <Radio value="b" name="no-label" size="md" />
      <Radio value="c" name="no-label" size="lg" defaultChecked />
    </div>
  ),
};

// 8. 실제 사용 예시
export const UsageExample: Story = {
  args: {
    label: "Radio",
    value: "default",
  },
  render: () => {
    const FormExample = () => {
      const [plan, setPlan] = useState("pro");
      const [frequency, setFrequency] = useState("monthly");
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            maxWidth: "360px",
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
                margin: "0 0 0.25rem 0",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              요금제 선택
            </h3>
            <p
              style={{ margin: "0 0 1rem 0", fontSize: "13px", color: "#6b7280" }}
            >
              사용 목적에 맞는 요금제를 선택하세요.
            </p>
            <RadioGroup name="plan" value={plan} onChange={setPlan}>
              <Radio label="Free — 무료" value="free" />
              <Radio label="Pro — ₩9,900/월" value="pro" />
              <Radio label="Enterprise — 문의" value="enterprise" />
            </RadioGroup>
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
                margin: "0 0 0.25rem 0",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              결제 주기
            </h3>
            <p
              style={{ margin: "0 0 1rem 0", fontSize: "13px", color: "#6b7280" }}
            >
              결제 주기를 선택하세요.
            </p>
            <RadioGroup
              name="frequency"
              value={frequency}
              onChange={setFrequency}
              direction="horizontal"
            >
              <Radio label="월간" value="monthly" />
              <Radio label="연간 (20% 할인)" value="yearly" />
            </RadioGroup>
          </div>
        </div>
      );
    };
    return <FormExample />;
  },
};
