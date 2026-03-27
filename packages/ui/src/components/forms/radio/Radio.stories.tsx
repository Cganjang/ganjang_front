import React, { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Radio from "./Radio";
import type { RadioProps } from "./Radio";

/** Controls·클릭 모두 반영 — 단일 Radio용 */
function StatefulRadio(args: RadioProps) {
  const [checked, setChecked] = useState(args.checked ?? false);

  useEffect(() => {
    if (args.checked !== undefined) {
      setChecked(args.checked);
    }
  }, [args.checked]);

  return (
    <Radio
      {...args}
      name={args.name ?? "radio-story"}
      checked={checked}
      onChange={(e) => {
        setChecked(e.target.checked);
        args.onChange?.(e);
      }}
    />
  );
}

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
- 같은 \`name\`으로 여러 개를 두면 라디오 그룹처럼 동작

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
    onChange: {
      action: "changed",
      description: "변경 이벤트",
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  render: (args) => <StatefulRadio {...args} />,
  args: {
    label: "Radio Option",
    value: "option1",
    size: "md",
    checked: false,
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
          style={{
            margin: "0 0 0.75rem 0",
            fontSize: "14px",
            fontWeight: "600",
            color: "#6b7280",
          }}
        >
          Small (16px)
        </h3>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Radio label="Default" value="a" name="size-sm" size="sm" />
          <Radio
            label="Checked"
            value="b"
            name="size-sm-checked"
            size="sm"
            defaultChecked
          />
          <Radio
            label="Disabled"
            value="c"
            name="size-sm-disabled"
            size="sm"
            disabled
          />
          <Radio
            label="Checked Disabled"
            value="d"
            name="size-sm-cd"
            size="sm"
            disabled
            checked
          />
        </div>
      </div>
      <div>
        <h3
          style={{
            margin: "0 0 0.75rem 0",
            fontSize: "14px",
            fontWeight: "600",
            color: "#6b7280",
          }}
        >
          Medium (20px) — Default
        </h3>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Radio label="Default" value="a" name="size-md" size="md" />
          <Radio
            label="Checked"
            value="b"
            name="size-md-checked"
            size="md"
            defaultChecked
          />
          <Radio
            label="Disabled"
            value="c"
            name="size-md-disabled"
            size="md"
            disabled
          />
          <Radio
            label="Checked Disabled"
            value="d"
            name="size-md-cd"
            size="md"
            disabled
            checked
          />
        </div>
      </div>
      <div>
        <h3
          style={{
            margin: "0 0 0.75rem 0",
            fontSize: "14px",
            fontWeight: "600",
            color: "#6b7280",
          }}
        >
          Large (24px)
        </h3>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Radio label="Default" value="a" name="size-lg" size="lg" />
          <Radio
            label="Checked"
            value="b"
            name="size-lg-checked"
            size="lg"
            defaultChecked
          />
          <Radio
            label="Disabled"
            value="c"
            name="size-lg-disabled"
            size="lg"
            disabled
          />
          <Radio
            label="Checked Disabled"
            value="d"
            name="size-lg-cd"
            size="lg"
            disabled
            checked
          />
        </div>
      </div>
    </div>
  ),
};

// 3. 라벨 없이 사용
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

function RadioUsageExample() {
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
          style={{
            margin: "0 0 1rem 0",
            fontSize: "13px",
            color: "#6b7280",
          }}
        >
          사용 목적에 맞는 요금제를 선택하세요.
        </p>
        <div
          role="radiogroup"
          aria-label="요금제"
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <Radio
            name="usage-plan"
            value="free"
            label="Free — 무료"
            checked={plan === "free"}
            onChange={(e) => {
              if (e.target.checked) setPlan("free");
            }}
          />
          <Radio
            name="usage-plan"
            value="pro"
            label="Pro — ₩9,900/월"
            checked={plan === "pro"}
            onChange={(e) => {
              if (e.target.checked) setPlan("pro");
            }}
          />
          <Radio
            name="usage-plan"
            value="enterprise"
            label="Enterprise — 문의"
            checked={plan === "enterprise"}
            onChange={(e) => {
              if (e.target.checked) setPlan("enterprise");
            }}
          />
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
            margin: "0 0 0.25rem 0",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          결제 주기
        </h3>
        <p
          style={{
            margin: "0 0 1rem 0",
            fontSize: "13px",
            color: "#6b7280",
          }}
        >
          결제 주기를 선택하세요.
        </p>
        <div
          role="radiogroup"
          aria-label="결제 주기"
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <Radio
            name="usage-frequency"
            value="monthly"
            label="월간"
            checked={frequency === "monthly"}
            onChange={(e) => {
              if (e.target.checked) setFrequency("monthly");
            }}
          />
          <Radio
            name="usage-frequency"
            value="yearly"
            label="연간 (20% 할인)"
            checked={frequency === "yearly"}
            onChange={(e) => {
              if (e.target.checked) setFrequency("yearly");
            }}
          />
        </div>
      </div>
    </div>
  );
}

// 4. 실제 사용 예시
export const UsageExample: Story = {
  args: {
    label: "Radio",
    value: "default",
  },
  render: () => <RadioUsageExample />,
};
