import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Select from "./Select";

const sampleOptions = [
  { label: "Label 1", value: "1" },
  { label: "Label 2", value: "2" },
  { label: "Label 3", value: "3" },
  { label: "Label 4", value: "4" },
];

const longOptions = [
  { label: "Label 1", value: "1" },
  { label: "Label 2", value: "2" },
  { label: "Label 3", value: "3" },
  { label: "Label 4", value: "4" },
  { label: "Label 5", value: "5" },
  { label: "Label 6", value: "6" },
  { label: "Label 7", value: "7" },
  { label: "Label 8", value: "8" },
];

const meta = {
  title: "Forms/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Figma 디자인 시스템 기반 Select 컴포넌트입니다.

**특징:**
- 7가지 상태: Default, Hover, Press, Focus(Open), Filled, Error, Disabled
- 3가지 옵션 타입: \`text\` (체크 아이콘), \`checkbox\` (다중 선택), \`radio\` (라디오 버튼)
- 키보드 내비게이션: ArrowUp/Down, Enter, Escape
- 외부 클릭 시 닫힘
- Label, HelpMessage 지원

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    optionType: {
      control: { type: "select" },
      options: ["text", "checkbox", "radio"],
      description: "옵션 표시 타입",
    },
    placeholder: {
      control: { type: "text" },
      description: "플레이스홀더",
    },
    label: {
      control: { type: "text" },
      description: "라벨 텍스트",
    },
    labelType: {
      control: { type: "select" },
      options: ["none", "optional", "required"],
    },
    isInfoIcon: {
      control: { type: "boolean" },
    },
    helpMessage: {
      control: { type: "text" },
    },
    helpMessageType: {
      control: { type: "select" },
      options: ["normal", "success", "error"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    error: {
      control: { type: "boolean" },
    },
    onChange: {
      action: "changed",
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    options: sampleOptions,
    label: "Label",
    isInfoIcon: true,
    placeholder: "placeholder",
  },
};

// 2. 모든 상태
export const AllStates: Story = {
  args: { options: sampleOptions },
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "flex-start" }}>
      <Select
        options={sampleOptions}
        label="Label"
        isInfoIcon
        placeholder="placeholder"
      />
      <Select
        options={sampleOptions}
        label="Label"
        isInfoIcon
        placeholder="placeholder"
        value="1"
      />
      <Select
        options={sampleOptions}
        label="Label"
        isInfoIcon
        placeholder="placeholder"
        error
        helpMessage="Help message"
      />
      <Select
        options={sampleOptions}
        label="Label"
        isInfoIcon
        placeholder="placeholder"
        disabled
      />
    </div>
  ),
};

// 3. 옵션 타입 — TextOnly
export const TextOnly: Story = {
  args: { options: sampleOptions },
  render: () => {
    const TextOnlyExample = () => {
      const [value, setValue] = useState<string | string[]>("");
      return (
        <Select
          options={sampleOptions}
          label="Label"
          isInfoIcon
          placeholder="placeholder"
          optionType="text"
          value={value}
          onChange={setValue}
        />
      );
    };
    return <TextOnlyExample />;
  },
};

// 4. 옵션 타입 — Checkbox (다중 선택)
export const CheckboxMultiple: Story = {
  args: { options: sampleOptions },
  render: () => {
    const CheckboxExample = () => {
      const [value, setValue] = useState<string | string[]>([]);
      return (
        <div>
          <Select
            options={sampleOptions}
            label="Label"
            isInfoIcon
            placeholder="placeholder"
            optionType="checkbox"
            value={value}
            onChange={setValue}
          />
          <p style={{ marginTop: "0.5rem", fontSize: "13px", color: "#6b7280" }}>
            선택: {Array.isArray(value) ? value.join(", ") || "없음" : value}
          </p>
        </div>
      );
    };
    return <CheckboxExample />;
  },
};

// 5. 옵션 타입 — RadioButton
export const RadioButton: Story = {
  args: { options: sampleOptions },
  render: () => {
    const RadioExample = () => {
      const [value, setValue] = useState<string | string[]>("");
      return (
        <Select
          options={sampleOptions}
          label="Label"
          isInfoIcon
          placeholder="placeholder"
          optionType="radio"
          value={value}
          onChange={setValue}
        />
      );
    };
    return <RadioExample />;
  },
};

// 6. 많은 옵션 (스크롤)
export const LongList: Story = {
  args: { options: longOptions },
  render: () => {
    const LongExample = () => {
      const [value, setValue] = useState<string | string[]>("");
      return (
        <Select
          options={longOptions}
          label="Label"
          isInfoIcon
          placeholder="placeholder"
          value={value}
          onChange={setValue}
        />
      );
    };
    return <LongExample />;
  },
};

// 7. 비활성 옵션 포함
export const WithDisabledOptions: Story = {
  args: { options: sampleOptions },
  render: () => {
    const DisabledExample = () => {
      const [value, setValue] = useState<string | string[]>("");
      return (
        <Select
          options={[
            { label: "옵션 A", value: "a" },
            { label: "옵션 B", value: "b" },
            { label: "옵션 C (비활성)", value: "c", disabled: true },
            { label: "옵션 D", value: "d" },
          ]}
          label="Label"
          isInfoIcon
          placeholder="선택하세요"
          value={value}
          onChange={setValue}
        />
      );
    };
    return <DisabledExample />;
  },
};

// 8. 실제 사용 예시
export const UsageExample: Story = {
  args: { options: sampleOptions },
  render: () => {
    const FormExample = () => {
      const [role, setRole] = useState<string | string[]>("");
      const [permissions, setPermissions] = useState<string | string[]>([]);

      return (
        <div
          style={{
            maxWidth: "320px",
            padding: "2rem",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>
            사용자 권한 설정
          </h3>
          <Select
            options={[
              { label: "관리자", value: "admin" },
              { label: "편집자", value: "editor" },
              { label: "뷰어", value: "viewer" },
              { label: "게스트", value: "guest" },
            ]}
            label="역할"
            labelType="required"
            isInfoIcon
            placeholder="역할을 선택하세요"
            optionType="radio"
            value={role}
            onChange={setRole}
            styleOverride={{ width: "100%" }}
          />
          <Select
            options={[
              { label: "읽기", value: "read" },
              { label: "쓰기", value: "write" },
              { label: "삭제", value: "delete" },
              { label: "관리", value: "manage" },
            ]}
            label="권한"
            labelType="required"
            isInfoIcon
            placeholder="권한을 선택하세요"
            optionType="checkbox"
            value={permissions}
            onChange={setPermissions}
            styleOverride={{ width: "100%" }}
          />
        </div>
      );
    };
    return <FormExample />;
  },
};
