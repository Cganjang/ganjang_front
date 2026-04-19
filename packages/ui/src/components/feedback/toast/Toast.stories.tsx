import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Toast from "./Toast";

const meta = {
  title: "Feedback/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "사용자에게 일시적인 알림을 표시하는 Toast 컴포넌트입니다. 성공, 오류, 경고, 정보 등 다양한 상태를 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story, context) => {
      const [isVisible, setIsVisible] = React.useState<boolean>(
        context.args.isVisible ?? true
      );

      React.useEffect(() => {
        setIsVisible(context.args.isVisible ?? true);
      }, [context.args.isVisible]);

      return (
        <Story
          args={{
            ...context.args,
            isVisible,
            onClose: () => setIsVisible(false),
          }}
        />
      );
    },
  ],
  argTypes: {
    isVisible: {
      control: "boolean",
      description: "Toast 표시 여부",
    },
    status: {
      control: "select",
      options: ["success", "error", "warning", "info"],
      description: "알림 유형",
    },
    title: {
      control: "text",
      description: "제목 (필수)",
    },
    description: {
      control: "text",
      description: "설명 (선택)",
    },
    duration: {
      control: "number",
      description: "자동 닫힘 시간 (ms, 0이면 자동 닫힘 없음)",
    },
    showCloseButton: {
      control: "boolean",
      description: "닫기 버튼 표시 여부",
    },
    onClose: {
      description: "닫기 콜백 함수",
    },
    className: {
      control: "text",
      description: "추가 className",
    },
    styleOverride: {
      description: "인라인 스타일",
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Toast (info 상태)
 */
export const Default: Story = {
  args: {
    title: "알림",
    description: "이것은 기본 Toast 알림입니다.",
    status: "info",
    duration: 5000,
    showCloseButton: true,
  },
};

/**
 * 모든 상태 표시
 */
export const AllVariants: Story = {
  render: () => {
    const [visibleStatus, setVisibleStatus] = React.useState<
      "success" | "error" | "warning" | "info"
    >("success");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Toast
          isVisible={visibleStatus === "success"}
          status="success"
          title="성공"
          description="작업이 성공적으로 완료되었습니다."
          showCloseButton={true}
          onClose={() => setVisibleStatus("error")}
          duration={0}
        />
        <Toast
          isVisible={visibleStatus === "error"}
          status="error"
          title="오류"
          description="문제가 발생했습니다. 다시 시도해주세요."
          showCloseButton={true}
          onClose={() => setVisibleStatus("warning")}
          duration={0}
        />
        <Toast
          isVisible={visibleStatus === "warning"}
          status="warning"
          title="경고"
          description="주의가 필요합니다."
          showCloseButton={true}
          onClose={() => setVisibleStatus("info")}
          duration={0}
        />
        <Toast
          isVisible={visibleStatus === "info"}
          status="info"
          title="정보"
          description="추가 정보를 제공합니다."
          showCloseButton={true}
          onClose={() => setVisibleStatus("success")}
          duration={0}
        />
      </div>
    );
  },
};

/**
 * 제목만 표시
 */
export const TitleOnly: Story = {
  args: {
    title: "저장되었습니다",
    status: "success",
    duration: 0,
  },
};

/**
 * 닫기 버튼 없음
 */
export const WithoutCloseButton: Story = {
  args: {
    title: "로딩 중",
    description: "작업을 처리하고 있습니다...",
    status: "info",
    showCloseButton: false,
    duration: 0,
  },
};

/**
 * 성공 상태
 */
export const Success: Story = {
  args: {
    title: "성공",
    description: "작업이 성공적으로 완료되었습니다.",
    status: "success",
    duration: 0,
  },
};

/**
 * 오류 상태
 */
export const Error: Story = {
  args: {
    title: "오류 발생",
    description: "예기치 않은 오류가 발생했습니다.",
    status: "error",
    duration: 0,
  },
};

/**
 * 경고 상태
 */
export const Warning: Story = {
  args: {
    title: "경고",
    description: "이 작업은 되돌릴 수 없습니다.",
    status: "warning",
    duration: 0,
  },
};

/**
 * 제어된 상태 (isVisible prop 제어)
 */
export const Controlled: Story = {
  render: () => {
    const [isVisible, setIsVisible] = React.useState(true);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? "Toast 숨기기" : "Toast 표시하기"}
        </button>
        <Toast
          isVisible={isVisible}
          status="info"
          title="제어된 Toast"
          description="버튼으로 표시/숨김을 제어할 수 있습니다."
          onClose={() => setIsVisible(false)}
          duration={0}
        />
      </div>
    );
  },
};

/**
 * 실제 사용 예시 (자동 닫힘 포함)
 */
export const UsageExample: Story = {
  render: () => {
    const [toasts, setToasts] = React.useState<
      Array<{
        id: number;
        status: "success" | "error" | "warning" | "info";
        title: string;
        description: string;
      }>
    >([]);

    const showToast = (
      status: "success" | "error" | "warning" | "info",
      title: string,
      description: string
    ) => {
      const id = Date.now();
      setToasts([
        ...toasts,
        {
          id,
          status,
          title,
          description,
        },
      ]);
    };

    const removeToast = (id: number) => {
      setToasts(toasts.filter((toast) => toast.id !== id));
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button onClick={() => showToast("success", "성공", "저장되었습니다.")}>
            성공
          </button>
          <button onClick={() => showToast("error", "오류", "오류가 발생했습니다.")}>
            오류
          </button>
          <button onClick={() => showToast("warning", "경고", "주의가 필요합니다.")}>
            경고
          </button>
          <button onClick={() => showToast("info", "정보", "추가 정보입니다.")}>
            정보
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              isVisible={true}
              status={toast.status}
              title={toast.title}
              description={toast.description}
              duration={5000}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </div>
    );
  },
};
