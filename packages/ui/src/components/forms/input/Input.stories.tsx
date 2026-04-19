import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta = {
  title: "Forms/Input",
  component: Input,
  decorators: [
    (Story, context) => {
      const [value, setValue] = React.useState<string>(context.args.value ?? "");
      React.useEffect(() => { setValue(context.args.value ?? ""); }, [context.args.value]);
      return <Story args={{ ...context.args, value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value) }} />;
    },
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Figma 디자인 시스템 기반 Input (TextField) 컴포넌트입니다.

**특징:**
- 7가지 상태: Default, Hover, Press, Focus, Filled, Error, Disabled
- Label 지원: 기존 Label 컴포넌트 재활용 (none/optional/required, info 아이콘)
- Help message: Normal, Success, Error 타입
- Leading / Trailing 아이콘 지원 (Lucide Icons)
- Figma 기준 \`width: 240px\`, \`field height: 40px\`

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
    leadingIcon: {
      control: { type: "text" },
      description: "앞쪽 아이콘 이름 (Lucide)",
    },
    trailingIcon: {
      control: { type: "text" },
      description: "뒤쪽 아이콘 이름 (Lucide)",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성화 여부",
    },
    error: {
      control: { type: "boolean" },
      description: "에러 상태",
    },
    htmlType: {
      control: { type: "select" },
      options: ["text", "password", "email", "number", "tel", "url"],
      description: "HTML input type",
    },
    onChange: {
      action: "changed",
      description: "변경 이벤트",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태 — controls 패널 연동
export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "placeholder",
    helpMessage: "Help message",
    isInfoIcon: true,
  },
};

// 2. 모든 상태 — Figma 디자인 매트릭스
export const AllStates: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
      <Input
        label="Label"
        isInfoIcon
        placeholder="placeholder"
        helpMessage="Help message"
      />
      <Input
        label="Label"
        isInfoIcon
        placeholder="placeholder"
        helpMessage="Help message"
        defaultValue="Filled value"
      />
      <Input
        label="Label"
        isInfoIcon
        placeholder="placeholder"
        helpMessage="Help message"
        helpMessageType="success"
        defaultValue="Valid input"
      />
      <Input
        label="Label"
        isInfoIcon
        placeholder="placeholder"
        helpMessage="Help message"
        error
        helpMessageType="error"
        defaultValue="placeholder"
      />
      <Input
        label="Label"
        isInfoIcon
        placeholder="placeholder"
        helpMessage="Help message"
        disabled
      />
    </div>
  ),
};

// 3. Help message 타입
export const HelpMessageTypes: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      <Input
        label="Normal"
        placeholder="placeholder"
        helpMessage="Help message"
        helpMessageType="normal"
      />
      <Input
        label="Success"
        placeholder="placeholder"
        helpMessage="Help message"
        helpMessageType="success"
        defaultValue="Valid input"
      />
      <Input
        label="Error"
        placeholder="placeholder"
        helpMessage="Help message"
        error
      />
    </div>
  ),
};

// 4. 아이콘 조합
export const WithIcons: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        <Input label="검색" placeholder="검색어 입력" leadingIcon="search" />
        <Input
          label="이메일"
          placeholder="email@example.com"
          leadingIcon="mail"
          htmlType="email"
        />
        <Input
          label="비밀번호"
          placeholder="비밀번호 입력"
          trailingIcon="eye"
          htmlType="password"
        />
      </div>
      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        <Input
          label="검색"
          placeholder="검색어 입력"
          leadingIcon="search"
          trailingIcon="x"
          defaultValue="검색어"
        />
        <Input
          label="URL"
          placeholder="https://"
          leadingIcon="globe"
          htmlType="url"
        />
      </div>
    </div>
  ),
};

// 5. 라벨 타입
export const LabelTypes: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      <Input
        label="기본 라벨"
        labelType="none"
        placeholder="placeholder"
        isInfoIcon
      />
      <Input
        label="선택 입력"
        labelType="optional"
        placeholder="placeholder"
        isInfoIcon
      />
      <Input
        label="필수 입력"
        labelType="required"
        placeholder="placeholder"
        isInfoIcon
      />
      <Input placeholder="라벨 없음" helpMessage="라벨 없이도 사용 가능" />
    </div>
  ),
};

// 6. 제어 컴포넌트
export const Controlled: Story = {
  args: {},
  render: () => {
    const ControlledExample = () => {
      const [value, setValue] = useState("");
      const isError = value.length > 0 && value.length < 3;
      const isSuccess = value.length >= 3;

      return (
        <Input
          label="닉네임"
          labelType="required"
          isInfoIcon
          placeholder="3자 이상 입력"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error={isError}
          helpMessage={
            isError
              ? "3자 이상 입력해주세요"
              : isSuccess
                ? "사용 가능한 닉네임입니다"
                : "영문, 한글, 숫자 사용 가능"
          }
          helpMessageType={isError ? "error" : isSuccess ? "success" : "normal"}
        />
      );
    };
    return <ControlledExample />;
  },
};

// 7. 실제 사용 예시 — 로그인 폼
export const UsageExample: Story = {
  args: {},
  render: () => {
    const LoginForm = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      return (
        <div
          style={{
            maxWidth: "320px",
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
            로그인
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Input
              label="이메일"
              labelType="required"
              placeholder="email@example.com"
              leadingIcon="mail"
              htmlType="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              styleOverride={{ width: "100%" }}
            />
            <Input
              label="비밀번호"
              labelType="required"
              placeholder="비밀번호 입력"
              trailingIcon="eye-off"
              htmlType="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helpMessage="8자 이상, 영문+숫자 조합"
              styleOverride={{ width: "100%" }}
            />
          </div>
        </div>
      );
    };
    return <LoginForm />;
  },
};
