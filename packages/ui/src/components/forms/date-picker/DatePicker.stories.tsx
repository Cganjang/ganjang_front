import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DatePicker from "./DatePicker";

const meta = {
  title: "Forms/DatePicker",
  component: DatePicker,
  decorators: [
    (Story) => (
      <div style={{ minHeight: "400px", paddingTop: "16px" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
단일 날짜를 선택할 수 있는 DatePicker 컴포넌트입니다.

**특징:**
- Input 클릭 시 달력 팝업 표시
- 이전/다음 월 이동 가능
- 오늘 날짜 하이라이트 (파란 테두리)
- 선택된 날짜 하이라이트 (파란 배경)
- Label, HelpMessage 지원 (Input 컴포넌트와 동일한 패턴)
- disabled 상태 지원

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: false,
      description: "선택된 날짜 (제어 컴포넌트)",
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
      description: "날짜 변경 이벤트",
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태 — controls 패널 연동
export const Default: Story = {
  args: {
    label: "날짜",
    placeholder: "날짜 선택",
    helpMessage: "날짜를 선택해주세요",
    isInfoIcon: true,
  },
};

// 2. 제어 컴포넌트 예시
export const Controlled: Story = {
  args: {},
  render: () => {
    const ControlledExample = () => {
      const [date, setDate] = useState<Date | null>(null);

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <DatePicker
            label="예약 날짜"
            labelType="required"
            isInfoIcon
            placeholder="날짜를 선택해주세요"
            value={date}
            onChange={setDate}
            helpMessage={date ? `선택된 날짜: ${date.toLocaleDateString("ko-KR")}` : "날짜를 선택해주세요"}
            helpMessageType={date ? "success" : "normal"}
          />
        </div>
      );
    };
    return <ControlledExample />;
  },
};

// 3. 모든 상태
export const AllStates: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
      <DatePicker
        label="기본"
        isInfoIcon
        placeholder="날짜 선택"
        helpMessage="Help message"
      />
      <DatePicker
        label="선택됨"
        isInfoIcon
        defaultValue={new Date()}
        helpMessage="Help message"
      />
      <DatePicker
        label="에러"
        isInfoIcon
        placeholder="날짜 선택"
        helpMessage="날짜를 선택해주세요"
        error
      />
      <DatePicker
        label="비활성화"
        isInfoIcon
        placeholder="날짜 선택"
        helpMessage="Help message"
        disabled
      />
    </div>
  ),
};

// 4. 라벨 타입
export const LabelTypes: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      <DatePicker
        label="기본 라벨"
        labelType="none"
        placeholder="날짜 선택"
        isInfoIcon
      />
      <DatePicker
        label="선택 입력"
        labelType="optional"
        placeholder="날짜 선택"
        isInfoIcon
      />
      <DatePicker
        label="필수 입력"
        labelType="required"
        placeholder="날짜 선택"
        isInfoIcon
      />
      <DatePicker
        placeholder="라벨 없음"
        helpMessage="라벨 없이도 사용 가능"
      />
    </div>
  ),
};

// 5. Help message 타입
export const HelpMessageTypes: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      <DatePicker
        label="Normal"
        placeholder="날짜 선택"
        helpMessage="Help message"
        helpMessageType="normal"
      />
      <DatePicker
        label="Success"
        placeholder="날짜 선택"
        helpMessage="날짜가 선택되었습니다"
        helpMessageType="success"
        defaultValue={new Date()}
      />
      <DatePicker
        label="Error"
        placeholder="날짜 선택"
        helpMessage="날짜를 선택해주세요"
        error
      />
    </div>
  ),
};

// 6. Disabled
export const Disabled: Story = {
  args: {
    label: "비활성화 상태",
    placeholder: "날짜 선택",
    helpMessage: "선택할 수 없습니다",
    disabled: true,
    isInfoIcon: true,
  },
};

// 7. 실제 사용 예시 — 예약 폼
export const UsageExample: Story = {
  args: {},
  render: () => {
    const ReservationForm = () => {
      const [checkIn, setCheckIn] = useState<Date | null>(null);
      const [checkOut, setCheckOut] = useState<Date | null>(null);

      const isCheckOutError =
        checkIn != null &&
        checkOut != null &&
        checkOut <= checkIn;

      return (
        <div
          style={{
            maxWidth: "360px",
            padding: "2rem",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        >
          <h3
            style={{
              margin: "0 0 1.5rem 0",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            숙박 예약
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <DatePicker
              label="체크인"
              labelType="required"
              isInfoIcon
              placeholder="체크인 날짜 선택"
              value={checkIn}
              onChange={setCheckIn}
              styleOverride={{ width: "100%" }}
            />
            <DatePicker
              label="체크아웃"
              labelType="required"
              isInfoIcon
              placeholder="체크아웃 날짜 선택"
              value={checkOut}
              onChange={setCheckOut}
              error={isCheckOutError}
              helpMessage={
                isCheckOutError
                  ? "체크아웃은 체크인 이후 날짜여야 합니다"
                  : undefined
              }
              styleOverride={{ width: "100%" }}
            />
          </div>
        </div>
      );
    };
    return <ReservationForm />;
  },
};
