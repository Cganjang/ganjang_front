import React, { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Drawer from "./Drawer";
import Button from "@ui/components/base/button/Button";

const meta = {
  title: "Overlay/Drawer",
  component: Drawer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
화면 가장자리에서 슬라이드인 Drawer(드로어) 컴포넌트입니다.

**특징:**
- \`createPortal\`로 \`document.body\`에 렌더
- 좌/우/상/하 위치(position) 지원
- 배경 클릭·Esc·닫기 버튼으로 \`onClose\`
- transform으로 부드러운 슬라이드 애니메이션
- Modal과 달리 포커스 트랩 미지원 (간단한 사이드 패널 용도)

Figma 디자인 시스템을 기준으로 토큰·타이포를 맞췄습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story, context) => {
      const [open, setOpen] = useState<boolean>(context.args.open ?? false);
      useEffect(() => {
        setOpen(context.args.open ?? false);
      }, [context.args.open]);
      return (
        <Story
          args={{
            ...context.args,
            open,
            onClose: () => setOpen(false),
          }}
        />
      );
    },
  ],
  argTypes: {
    open: { control: false },
    position: {
      control: { type: "select" },
      options: ["left", "right", "top", "bottom"],
      description: "패널 표시 위치",
    },
    size: {
      control: { type: "text" },
      description: "패널 너비(좌/우) 또는 높이(상/하). 기본값: 좌/우=320px, 상/하=280px",
    },
    closeOnBackdrop: {
      control: { type: "boolean" },
      description: "배경 클릭 시 닫기",
    },
    closeOnEscape: {
      control: { type: "boolean" },
      description: "Esc 시 닫기",
    },
    showCloseButton: {
      control: { type: "boolean" },
      description: "헤더 닫기(X) 버튼",
    },
    onClose: { action: "close" },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <Button type="primary" variant="filled" onClick={() => setOpen(true)}>
          드로어 열기
        </Button>
        <Drawer
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          title="드로어 제목"
          footer={
            <Button
              type="primary"
              variant="filled"
              onClick={() => setOpen(false)}
            >
              확인
            </Button>
          }
        >
          드로어 본문 영역입니다. 부드러운 슬라이드 애니메이션으로 열리고
          닫힙니다.
        </Drawer>
      </div>
    );
  },
  args: {
    position: "left",
    closeOnBackdrop: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
};

export const Positions: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState<
      "left" | "right" | "top" | "bottom"
    >("left");

    return (
      <div
        style={{
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {(["left", "right", "top", "bottom"] as const).map((pos) => (
            <Button
              key={pos}
              type="secondary"
              variant="outline"
              onClick={() => {
                setPosition(pos);
                setOpen(true);
              }}
            >
              {pos}
            </Button>
          ))}
        </div>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          position={position}
          title={`드로어: ${position}`}
        >
          위치를 선택하면 그 방향에서 슬라이드 인합니다.
        </Drawer>
      </div>
    );
  },
};

export const WithFooter: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <Button type="primary" variant="filled" onClick={() => setOpen(true)}>
          액션 버튼 있는 드로어
        </Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="설정"
          position="right"
          footer={
            <>
              <Button
                type="secondary"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                취소
              </Button>
              <Button
                type="primary"
                variant="filled"
                onClick={() => setOpen(false)}
              >
                저장
              </Button>
            </>
          }
        >
          여러 설정 항목을 표시할 수 있습니다. 하단 footer에 액션 버튼을
          배치합니다.
        </Drawer>
      </div>
    );
  },
};

export const LongContent: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <Button type="primary" variant="filled" onClick={() => setOpen(true)}>
          긴 본문
        </Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="스크롤 테스트"
          position="left"
        >
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} style={{ margin: "0 0 12px" }}>
              줄 {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua.
            </p>
          ))}
        </Drawer>
      </div>
    );
  },
};

export const CustomSize: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState("320px");

    return (
      <div
        style={{
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <label>
            커스텀 너비:
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="예: 400px, 50vw"
              style={{
                marginLeft: 8,
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: 4,
              }}
            />
          </label>
          <Button
            type="primary"
            variant="filled"
            onClick={() => setOpen(true)}
          >
            드로어 열기
          </Button>
        </div>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="커스텀 크기"
          position="left"
          size={size}
        >
          입력한 크기로 드로어가 표시됩니다. (left/right는 너비, top/bottom은
          높이)
        </Drawer>
      </div>
    );
  },
};
