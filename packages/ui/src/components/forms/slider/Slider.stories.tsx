import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Slider from "./Slider";

const meta = {
  title: "Forms/Slider",
  component: Slider,
  decorators: [
    (Story, context) => {
      const [value, setValue] = React.useState<number>(context.args.value ?? 50);
      React.useEffect(() => {
        setValue(context.args.value ?? 50);
      }, [context.args.value]);
      return (
        <Story args={{ ...context.args, value, onChange: setValue }} />
      );
    },
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
HTML5 \`<input type="range">\`를 기반으로 한 Slider 컴포넌트입니다.

**특징:**
- 제어 컴포넌트 (controlled component)
- 커스텀 thumb/track 스타일링
- min/max/step 지원
- 라벨 및 현재 값 표시
- 포맷터 함수로 값 표시 커스터마이징
- 에러 및 비활성화 상태
- 크로스 브라우저 지원 (webkit, mozilla)
- 접근성: ARIA 속성 및 keyboard 지원
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "number" },
      description: "현재 값 (제어 컴포넌트)",
    },
    min: {
      control: { type: "number" },
      description: "최솟값",
    },
    max: {
      control: { type: "number" },
      description: "최댓값",
    },
    step: {
      control: { type: "number" },
      description: "스텝",
    },
    label: {
      control: { type: "text" },
      description: "라벨 텍스트",
    },
    showValue: {
      control: { type: "boolean" },
      description: "현재 값 표시 여부",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성화 여부",
    },
    error: {
      control: { type: "boolean" },
      description: "에러 상태",
    },
    onChange: {
      action: "changed",
      description: "변경 이벤트",
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태 — controls 패널 연동
export const Default: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    step: 1,
  },
};

// 2. 라벨 포함
export const WithLabel: Story = {
  args: {
    label: "Volume",
    value: 50,
    min: 0,
    max: 100,
    step: 1,
  },
};

// 3. 값 표시
export const ShowValue: Story = {
  args: {
    label: "Progress",
    value: 75,
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
  },
};

// 4. 스텝 (단계 선택)
export const Steps: Story = {
  args: {
    label: "Quality",
    value: 2,
    min: 1,
    max: 5,
    step: 1,
    showValue: true,
  },
};

// 5. 포맷터 함수
export const WithFormatter: Story = {
  args: {
    label: "Price",
    value: 50,
    min: 0,
    max: 1000,
    step: 50,
    showValue: true,
    formatValue: (val) => `$${val}`,
  },
};

// 6. 비활성화
export const Disabled: Story = {
  args: {
    label: "Disabled Slider",
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    disabled: true,
  },
};

// 7. 에러 상태
export const Error: Story = {
  args: {
    label: "Error Slider",
    value: 20,
    min: 0,
    max: 100,
    step: 1,
    error: true,
    showValue: true,
  },
};

// 8. 상호작용 예제
export const UsageExample: Story = {
  args: {},
  render: () => {
    const [volume, setVolume] = React.useState(70);
    const [brightness, setBrightness] = React.useState(50);
    const [price, setPrice] = React.useState(500);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Slider
          label="Volume"
          value={volume}
          onChange={setVolume}
          min={0}
          max={100}
          step={1}
          showValue
          formatValue={(val) => `${val}%`}
        />

        <Slider
          label="Brightness"
          value={brightness}
          onChange={setBrightness}
          min={0}
          max={100}
          step={5}
          showValue
          formatValue={(val) => `${val}%`}
        />

        <Slider
          label="Price Range"
          value={price}
          onChange={setPrice}
          min={0}
          max={10000}
          step={100}
          showValue
          formatValue={(val) => `$${val.toLocaleString()}`}
        />

        <div
          style={{
            padding: "1rem",
            backgroundColor: "var(--bg-secondary)",
            borderRadius: "var(--border-radius-4)",
            fontSize: "14px",
            color: "var(--text-secondary)",
          }}
        >
          <p>Volume: {volume}%</p>
          <p>Brightness: {brightness}%</p>
          <p>Price: ${price.toLocaleString()}</p>
        </div>
      </div>
    );
  },
};

// 9. 다양한 범위
export const DifferentRanges: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Slider label="0-10" value={5} min={0} max={10} step={1} showValue />
      <Slider label="0-100" value={50} min={0} max={100} step={1} showValue />
      <Slider label="0-1000" value={500} min={0} max={1000} step={100} showValue />
      <Slider label="-50 to 50" value={0} min={-50} max={50} step={5} showValue />
    </div>
  ),
};
