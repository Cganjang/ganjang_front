import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "@ui/components/forms/checkbox/Checkbox";

const meta = {
  title: "Forms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
선택 입력을 위한 Checkbox 컴포넌트입니다.

**특징:**
- 3가지 상태: Unselected, Selected, Partial (indeterminate)
- 6가지 인터랙션 상태: Default, Hover, Press, Focus, Disabled, Error
- 선택적 label 텍스트
- \`indeterminate\`는 React DOM 프로퍼티로 직접 설정 (ref 기반)

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: { type: "boolean" },
      description: "체크 상태 (controlled)",
    },
    indeterminate: {
      control: { type: "boolean" },
      description: "부분 선택 상태 — checked보다 우선 표시",
    },
    label: {
      control: { type: "text" },
      description: "라벨 텍스트",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성 상태",
    },
    error: {
      control: { type: "boolean" },
      description: "에러 상태",
    },
    onChange: {
      action: "changed",
      description: "변경 이벤트 핸들러",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    label: "Label",
    checked: false,
  },
};

// 2. 모든 조합 — Figma 레이아웃 기준 (status × state)
export const AllVariants: Story = {
  args: {
    label: "Label",
    checked: false,
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Status 행 */}
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>
          Status
        </h3>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <Checkbox checked={false} />
            <div style={{ fontSize: "11px", marginTop: "6px", color: "#6b7280" }}>Unselected</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <Checkbox checked={true} />
            <div style={{ fontSize: "11px", marginTop: "6px", color: "#6b7280" }}>Selected</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <Checkbox indeterminate={true} />
            <div style={{ fontSize: "11px", marginTop: "6px", color: "#6b7280" }}>Partial</div>
          </div>
        </div>
      </div>

      {/* States 행 */}
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>
          States
        </h3>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {[
            { label: "Default", props: {} },
            { label: "Disabled", props: { disabled: true } },
            { label: "Error", props: { error: true } },
          ].map(({ label, props }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <span style={{ fontSize: "12px", color: "#6b7280" }}>{label}</span>
              <Checkbox checked={false} {...props} />
              <Checkbox checked={true} {...props} />
              <Checkbox indeterminate={true} {...props} />
            </div>
          ))}
        </div>
      </div>

      {/* Label 포함 */}
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>
          With Label
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Checkbox label="Label" checked={false} />
          <Checkbox label="Label" checked={true} />
          <Checkbox label="Label" indeterminate={true} />
          <Checkbox label="Label" disabled />
          <Checkbox label="Label" error />
        </div>
      </div>
    </div>
  ),
};

// 3. 비활성화
export const Disabled: Story = {
  args: {
    label: "Label",
    disabled: true,
  },
};

// 4. 에러
export const Error: Story = {
  args: {
    label: "Label",
    error: true,
  },
};

// 5. 실제 사용 예시 — controlled 상태 + CheckGroup 시나리오
export const UsageExample: Story = {
  args: {
    label: "Label",
    checked: false,
  },
  render: () => {
    const items = [
      { label: "네이버", value: "naver" },
      { label: "카카오", value: "kakao" },
      { label: "라인", value: "line" },
      { label: "쿠팡", value: "coupang" },
      { label: "배민", value: "baemin" },
      { label: "당근", value: "daangn", disabled: true },
    ];

    const [selected, setSelected] = useState<string[]>(["naver"]);

    const allChecked = selected.length === items.filter(i => !i.disabled).length;
    const someChecked = selected.length > 0 && !allChecked;

    const handleAll = (checked: boolean) => {
      setSelected(checked ? items.filter(i => !i.disabled).map(i => i.value) : []);
    };

    const handleItem = (value: string, checked: boolean) => {
      setSelected((prev) =>
        checked ? [...prev, value] : prev.filter((v) => v !== value)
      );
    };

    return (
      <div
        style={{
          padding: "1.5rem",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          minWidth: "200px",
        }}
      >
        {/* 전체 선택 */}
        <Checkbox
          id="all"
          label="전체 선택"
          checked={allChecked}
          indeterminate={someChecked}
          onChange={handleAll}
        />

        <div style={{ height: "1px", background: "#e5e7eb", margin: "0.75rem 0" }} />

        {/* 개별 항목 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {items.map((item) => (
            <Checkbox
              key={item.value}
              id={item.value}
              label={item.label}
              checked={selected.includes(item.value)}
              disabled={item.disabled}
              onChange={(checked) => handleItem(item.value, checked)}
            />
          ))}
        </div>
      </div>
    );
  },
};
