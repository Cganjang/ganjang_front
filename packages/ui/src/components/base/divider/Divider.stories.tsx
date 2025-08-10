import type { Meta, StoryObj } from "@storybook/react";
import Divider from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Base/Divider",
  component: Divider,
  parameters: {
    docs: {
      description: {
        component:
          "Figma 디자인 시스템 기반 Divider 컴포넌트입니다. 4가지 Size(sm-1px, md-2px, lg-4px, xl-8px)와 가로/세로 방향을 제공합니다.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "구분선 두께 (sm: 1px, md: 2px, lg: 4px, xl: 8px)",
    },
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "구분선 방향",
    },
    margin: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl"],
      description: "구분선 주변 여백",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 구분선
export const Default: Story = {
  args: {
    size: "sm",
    orientation: "horizontal",
    margin: "md",
  },
};

// 사이즈별 비교 (가로)
export const HorizontalSizes: Story = {
  render: () => (
    <div style={{ width: "300px" }}>
      <div style={{ marginBottom: "1rem" }}>
        <h4 
          style={{ 
            margin: "0 0 0.5rem 0", 
            fontSize: "14px" 
          }}
        >
          SM - 1px
        </h4>
        <Divider size="sm" margin="none" />
      </div>
      
      <div style={{ marginBottom: "1rem" }}>
        <h4 
          style={{ 
            margin: "0 0 0.5rem 0", 
            fontSize: "14px" 
          }}
        >
          MD - 2px
        </h4>
        <Divider size="md" margin="none" />
      </div>
      
      <div style={{ marginBottom: "1rem" }}>
        <h4 
          style={{ 
            margin: "0 0 0.5rem 0", 
            fontSize: "14px" 
          }}
        >
          LG - 4px
        </h4>
        <Divider size="lg" margin="none" />
      </div>
      
      <div>
        <h4 
          style={{ 
            margin: "0 0 0.5rem 0", 
            fontSize: "14px" 
          }}
        >
          XL - 8px
        </h4>
        <Divider size="xl" margin="none" />
      </div>
    </div>
  ),
};

// 세로 구분선
export const Vertical: Story = {
  render: () => (
    <div 
      style={{ 
        display: "flex", 
        alignItems: "center", 
        height: "100px" 
      }}
    >
      <span>왼쪽 콘텐츠</span>
      <Divider orientation="vertical" size="sm" margin="md" />
      <span>가운데 콘텐츠</span>
      <Divider orientation="vertical" size="md" margin="md" />
      <span>오른쪽 콘텐츠</span>
    </div>
  ),
};

// 실제 사용 예시
export const UsageExample: Story = {
  render: () => (
    <div 
      style={{ 
        maxWidth: "400px", 
        padding: "1rem", 
        border: "1px solid #e5e7eb", 
        borderRadius: "8px" 
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <h3 style={{ margin: "0 0 0.5rem 0" }}>
          사용자 정보
        </h3>
        <p style={{ margin: 0, color: "#6b7280" }}>
          이름: 홍길동
        </p>
        <p style={{ margin: 0, color: "#6b7280" }}>
          이메일: hong@example.com
        </p>
      </div>
      
      <Divider size="sm" margin="lg" />
      
      <div>
        <h3 style={{ margin: "0 0 0.5rem 0" }}>
          연락처
        </h3>
        <p style={{ margin: 0, color: "#6b7280" }}>
          전화: 010-1234-5678
        </p>
        <p style={{ margin: 0, color: "#6b7280" }}>
          주소: 서울시 강남구
        </p>
      </div>
    </div>
  ),
};
