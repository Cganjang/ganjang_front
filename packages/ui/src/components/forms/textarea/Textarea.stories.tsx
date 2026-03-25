import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Textarea from "./Textarea";

const meta = {
  title: "Forms/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Figma 디자인 시스템 기반 Textarea 컴포넌트입니다.

**특징:**
- 7가지 상태: Default, Hover, Press, Focus, Filled, Error, Disabled
- Label + 글자 수 카운터 (Current / Total) 헤더
- Help message: Normal, Success, Error 타입
- 리사이즈 지원 (Figma 우하단 리사이즈 핸들)
- \`maxLength\` 지정 시 카운터 자동 표시, 초과 시 에러 상태

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "text" },
      description: "입력 값 (제어 컴포넌트)",
    },
    placeholder: {
      control: { type: "text" },
      description: "플레이스홀더 텍스트",
    },
    label: {
      control: { type: "text" },
      description: "라벨 텍스트",
    },
    labelType: {
      control: { type: "select" },
      options: ["none", "optional", "required"],
      description: "라벨 타입",
    },
    isInfoIcon: {
      control: { type: "boolean" },
      description: "라벨 info 아이콘 표시",
    },
    helpMessage: {
      control: { type: "text" },
      description: "도움말 메시지",
    },
    helpMessageType: {
      control: { type: "select" },
      options: ["normal", "success", "error"],
      description: "도움말 메시지 타입",
    },
    maxLength: {
      control: { type: "number" },
      description: "최대 글자 수 (카운터 표시)",
    },
    showCount: {
      control: { type: "boolean" },
      description: "글자 수 카운터 표시 여부",
    },
    rows: {
      control: { type: "number" },
      description: "textarea 행 수",
    },
    resize: {
      control: { type: "select" },
      options: ["none", "vertical", "horizontal", "both"],
      description: "리사이즈 동작",
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
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태 — controls 패널 연동
export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "placeholder",
    helpMessage: "Help message",
    isInfoIcon: true,
    maxLength: 150,
  },
};

// 2. 모든 상태 — Figma 디자인 매트릭스
export const AllStates: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
      <Textarea
        label="Label"
        isInfoIcon
        placeholder="placeholder"
        helpMessage="Help message"
        maxLength={150}
      />
      <Textarea
        label="Label"
        isInfoIcon
        placeholder="placeholder"
        helpMessage="Help message"
        maxLength={150}
        defaultValue="Filled value"
      />
      <Textarea
        label="Label"
        isInfoIcon
        placeholder="placeholder"
        helpMessage="Help message"
        helpMessageType="success"
        maxLength={150}
        defaultValue="Valid input"
      />
      <Textarea
        label="Label"
        isInfoIcon
        placeholder="placeholder"
        helpMessage="Help message"
        maxLength={150}
        error
        defaultValue="placeholder"
      />
      <Textarea
        label="Label"
        isInfoIcon
        placeholder="placeholder"
        helpMessage="Help message"
        maxLength={150}
        disabled
      />
    </div>
  ),
};

// 3. 글자 수 카운터
export const WithCounter: Story = {
  args: {},
  render: () => {
    const CounterExample = () => {
      const [value, setValue] = useState("");
      const max = 150;
      return (
        <Textarea
          label="Label"
          isInfoIcon
          placeholder="placeholder"
          maxLength={max}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          helpMessage={
            value.length > max
              ? `글자 수를 ${max}자 이하로 줄여주세요`
              : "Help message"
          }
        />
      );
    };
    return <CounterExample />;
  },
};

// 4. 카운터 없는 상태
export const WithoutCounter: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
      <Textarea
        label="카운터 없음"
        placeholder="자유 입력"
        helpMessage="글자 수 제한 없음"
        showCount={false}
      />
      <Textarea label="라벨만" isInfoIcon placeholder="placeholder" />
    </div>
  ),
};

// 5. Help message 타입
export const HelpMessageTypes: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      <Textarea
        label="Normal"
        placeholder="placeholder"
        helpMessage="Help message"
        helpMessageType="normal"
        maxLength={150}
      />
      <Textarea
        label="Success"
        placeholder="placeholder"
        helpMessage="Help message"
        helpMessageType="success"
        defaultValue="Valid input"
        maxLength={150}
      />
      <Textarea
        label="Error"
        placeholder="placeholder"
        helpMessage="Help message"
        error
        defaultValue="placeholder"
        maxLength={150}
      />
    </div>
  ),
};

// 6. 리사이즈 옵션
export const ResizeOptions: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
      <Textarea
        label="Vertical (기본)"
        placeholder="세로 리사이즈"
        resize="vertical"
        maxLength={200}
      />
      <Textarea
        label="Both"
        placeholder="양방향 리사이즈"
        resize="both"
        maxLength={200}
      />
      <Textarea
        label="None"
        placeholder="리사이즈 불가"
        resize="none"
        maxLength={200}
      />
    </div>
  ),
};

// 7. 실제 사용 예시
export const UsageExample: Story = {
  args: {},
  render: () => {
    const FeedbackForm = () => {
      const [feedback, setFeedback] = useState("");
      const maxLen = 500;

      return (
        <div
          style={{
            maxWidth: "400px",
            padding: "2rem",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        >
          <h3
            style={{
              margin: "0 0 0.25rem 0",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            피드백
          </h3>
          <p
            style={{
              margin: "0 0 1.25rem 0",
              fontSize: "13px",
              color: "#6b7280",
            }}
          >
            서비스 개선을 위해 의견을 남겨주세요.
          </p>
          <Textarea
            label="내용"
            labelType="required"
            isInfoIcon
            placeholder="피드백을 입력해주세요"
            maxLength={maxLen}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            helpMessage={
              feedback.length > maxLen
                ? `${maxLen}자 이하로 작성해주세요`
                : feedback.length > 0
                  ? "감사합니다!"
                  : "최소 10자 이상 입력해주세요"
            }
            helpMessageType={
              feedback.length > maxLen
                ? "error"
                : feedback.length >= 10
                  ? "success"
                  : "normal"
            }
            rows={6}
            styleOverride={{ width: "100%" }}
          />
        </div>
      );
    };
    return <FeedbackForm />;
  },
};
