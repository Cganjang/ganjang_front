import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./Modal";
import Button from "@ui/components/base/button/Button";

const meta = {
  title: "Overlay/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
화면 중앙에 표시되는 Modal(다이얼로그)입니다.

**특징:**
- \`createPortal\`로 \`document.body\`에 렌더
- 배경 클릭·Esc·닫기 버튼으로 \`onClose\`
- 열릴 때 첫 포커스 가능 요소로 포커스, 닫을 때 이전 요소로 복원
- 본문 스크롤 잠금, 패널 내부 Tab 포커스 순환

Figma 디자인 시스템을 기준으로 토큰·타이포를 맞췄습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: { control: false },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "패널 최대 너비",
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
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <Button type="primary" variant="filled" onClick={() => setOpen(true)}>
          모달 열기
        </Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          title="모달 제목"
          footer={
            <>
              <Button
                type="secondary"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                취소
              </Button>
              <Button type="primary" variant="filled" onClick={() => setOpen(false)}>
                확인
              </Button>
            </>
          }
        >
          본문 영역입니다. 스크롤이 필요한 긴 콘텐츠도 패널 안에서 스크롤됩니다.
        </Modal>
      </div>
    );
  },
  args: {
    size: "md",
    closeOnBackdrop: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
};

export const Sizes: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState<"sm" | "md" | "lg" | "xl">("md");
    return (
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {(["sm", "md", "lg", "xl"] as const).map((s) => (
            <Button
              key={s}
              type="secondary"
              variant="outline"
              onClick={() => {
                setSize(s);
                setOpen(true);
              }}
            >
              {s}
            </Button>
          ))}
        </div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size={size}
          title={`크기: ${size}`}
        >
          최대 너비가 사이즈에 따라 달라집니다.
        </Modal>
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
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="스크롤 테스트"
          size="md"
        >
          {Array.from({ length: 40 }, (_, i) => (
            <p key={i} style={{ margin: "0 0 12px" }}>
              줄 {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          ))}
        </Modal>
      </div>
    );
  },
};

export const CloseOnlyHeader: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <Button type="primary" variant="filled" onClick={() => setOpen(true)}>
          제목 없이 X만
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          showCloseButton
          aria-label="이미지 미리보기"
        >
          제목이 없을 때는 <code>aria-label</code>로 대화상자 이름을 넘깁니다.
        </Modal>
      </div>
    );
  },
};
