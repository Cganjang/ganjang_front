import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RadioButtonGroup from "./RadioButtonGroup";

const meta: Meta<typeof RadioButtonGroup> = {
  title: "Forms/RadioButtonGroup",
  component: RadioButtonGroup,
  decorators: [
    (Story, context) => {
      const [value, setValue] = React.useState<string>(context.args.value ?? "");
      React.useEffect(() => { setValue(context.args.value ?? ""); }, [context.args.value]);
      return <Story args={{ ...context.args, value, onChange: setValue }} />;
    },
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "라디오 버튼 그룹 컴포넌트입니다. 여러 라디오 버튼을 그룹으로 관리합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "폼 제출용 그룹 이름",
    },
    value: {
      control: "text",
      description: "선택된 값",
    },
    options: {
      control: "object",
      description: "라디오 버튼 옵션들",
    },
    error: {
      control: "boolean",
      description: "에러 상태",
    },
    disabled: {
      control: "boolean",
      description: "전체 그룹 비활성 상태",
    },
    direction: {
      control: { type: "select" },
      options: ["vertical", "horizontal"],
      description: "레이아웃 방향",
    },
    onChange: {
      action: "changed",
      description: "선택 상태 변경 이벤트",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
];

const optionsWithInfo = [
  { 
    value: "option1", 
    label: "Option with Info", 
    showInfoIcon: true,
    onInfoClick: () => console.log("Info clicked for option 1")
  },
  { value: "option2", label: "Regular Option" },
  { 
    value: "option3", 
    label: "Another Info Option", 
    showInfoIcon: true,
    onInfoClick: () => console.log("Info clicked for option 3")
  },
];

// Default Vertical
export const Default: Story = {
  args: {
    name: "radio-group-default",
    options: basicOptions,
    value: "option1",
    direction: "vertical",
  },
};

// Horizontal Layout
export const Horizontal: Story = {
  args: {
    name: "radio-group-horizontal",
    options: basicOptions,
    value: "option2",
    direction: "horizontal",
  },
};

// With Info Icons
export const WithInfoIcons: Story = {
  args: {
    name: "radio-group-info",
    options: optionsWithInfo,
    value: "option1",
    direction: "vertical",
  },
};

// Error State
export const Error: Story = {
  args: {
    name: "radio-group-error",
    options: basicOptions,
    value: "option1",
    error: true,
    direction: "vertical",
  },
};

// Disabled Group
export const Disabled: Story = {
  args: {
    name: "radio-group-disabled",
    options: basicOptions,
    value: "option2",
    disabled: true,
    direction: "vertical",
  },
};

// Mixed Disabled Options
export const MixedDisabled: Story = {
  args: {
    name: "radio-group-mixed",
    options: [
      { value: "option1", label: "Available Option" },
      { value: "option2", label: "Disabled Option", disabled: true },
      { value: "option3", label: "Another Available" },
      { value: "option4", label: "Another Disabled", disabled: true },
    ],
    value: "option1",
    direction: "vertical",
  },
};

// Large Group (8 items)
export const LargeGroup: Story = {
  args: {
    name: "radio-group-large",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
      { value: "option4", label: "Option 4" },
      { value: "option5", label: "Option 5" },
      { value: "option6", label: "Option 6" },
      { value: "option7", label: "Option 7" },
      { value: "option8", label: "Option 8" },
    ],
    value: "option1",
    direction: "vertical",
  },
};

// Interactive Demo
export const Interactive: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState("option1");
    const [showError, setShowError] = useState(false);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "400px" }}>
        <div>
          <h3>Interactive Radio Button Group</h3>
          <p>Selected: <strong>{selectedValue || "None"}</strong></p>
        </div>

        <RadioButtonGroup
          name="interactive-group"
          value={selectedValue}
          error={showError}
          options={[
            { 
              value: "option1", 
              label: "First Option",
              showInfoIcon: true,
              onInfoClick: () => alert("Info for first option")
            },
            { value: "option2", label: "Second Option" },
            { value: "option3", label: "Third Option" },
            { 
              value: "option4", 
              label: "Fourth Option",
              showInfoIcon: true,
              onInfoClick: () => alert("Info for fourth option")
            },
          ]}
          onChange={setSelectedValue}
          direction="vertical"
        />

        <div style={{ display: "flex", gap: "8px" }}>
          <button 
            onClick={() => setShowError(!showError)}
            style={{ 
              padding: "8px 16px", 
              border: "1px solid #ccc", 
              borderRadius: "4px",
              backgroundColor: showError ? "#fee" : "#fff"
            }}
          >
            Toggle Error State
          </button>
          <button 
            onClick={() => setSelectedValue("")}
            style={{ 
              padding: "8px 16px", 
              border: "1px solid #ccc", 
              borderRadius: "4px"
            }}
          >
            Clear Selection
          </button>
        </div>
      </div>
    );
  },
};

// Different Directions Comparison
export const DirectionComparison: Story = {
  render: () => {
    const [verticalValue, setVerticalValue] = useState("option1");
    const [horizontalValue, setHorizontalValue] = useState("option2");

    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
      { value: "option4", label: "Option 4" },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "100%" }}>
        <div>
          <h4>Vertical Layout</h4>
          <RadioButtonGroup
            name="vertical-group"
            value={verticalValue}
            options={options}
            onChange={setVerticalValue}
            direction="vertical"
          />
        </div>

        <div>
          <h4>Horizontal Layout</h4>
          <RadioButtonGroup
            name="horizontal-group"
            value={horizontalValue}
            options={options}
            onChange={setHorizontalValue}
            direction="horizontal"
          />
        </div>
      </div>
    );
  },
};
