import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Feedback/Spinner",
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component: "Figma 디자인 기반 로딩 스피너 컴포넌트입니다. 4가지 크기와 2가지 타입을 제공합니다.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "스피너 크기 (sm: 16px, md: 24px, lg: 32px, xl: 48px)",
    },
    type: {
      control: { type: "select" },
      options: ["primary", "secondary"],
      description: "스피너 색상 타입 (primary: 파란색, secondary: 회색)",
    },
    "aria-label": {
      control: { type: "text" },
      description: "접근성을 위한 라벨",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스피너
export const Default: Story = {
  args: {},
};

// Primary 타입
export const Primary: Story = {
  args: {
    type: "primary",
  },
};

// Secondary 타입
export const Secondary: Story = {
  args: {
    type: "secondary",
  },
};

// 크기별 스피너들
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <Spinner size="sm" />
        <div style={{ marginTop: "0.5rem", fontSize: "12px" }}>Small (16px)</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Spinner size="md" />
        <div style={{ marginTop: "0.5rem", fontSize: "12px" }}>Medium (24px)</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Spinner size="lg" />
        <div style={{ marginTop: "0.5rem", fontSize: "12px" }}>Large (32px)</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Spinner size="xl" />
        <div style={{ marginTop: "0.5rem", fontSize: "12px" }}>Extra Large (48px)</div>
      </div>
    </div>
  ),
};

// 모든 조합 (Figma 디자인과 동일)
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>
          Primary Type
        </h3>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <Spinner type="primary" size="sm" />
            <div style={{ marginTop: "0.5rem", fontSize: "12px" }}>sm-16px</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <Spinner type="primary" size="md" />
            <div style={{ marginTop: "0.5rem", fontSize: "12px" }}>md-24px</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <Spinner type="primary" size="lg" />
            <div style={{ marginTop: "0.5rem", fontSize: "12px" }}>lg-32px</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <Spinner type="primary" size="xl" />
            <div style={{ marginTop: "0.5rem", fontSize: "12px" }}>xl-48px</div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>
          Secondary Type
        </h3>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <Spinner type="secondary" size="sm" />
            <div style={{ marginTop: "0.5rem", fontSize: "12px" }}>sm-16px</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <Spinner type="secondary" size="md" />
            <div style={{ marginTop: "0.5rem", fontSize: "12px" }}>md-24px</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <Spinner type="secondary" size="lg" />
            <div style={{ marginTop: "0.5rem", fontSize: "12px" }}>lg-32px</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <Spinner type="secondary" size="xl" />
            <div style={{ marginTop: "0.5rem", fontSize: "12px" }}>xl-48px</div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// 실제 사용 예시
export const UsageExample: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Spinner size="sm" />
        <span>로딩 중...</span>
      </div>
      <div style={{ 
        padding: "1rem", 
        border: "1px solid #e5e7eb", 
        borderRadius: "8px",
        textAlign: "center"
      }}>
        <Spinner size="lg" />
        <div style={{ marginTop: "1rem" }}>데이터를 불러오는 중입니다</div>
      </div>
    </div>
  ),
};
