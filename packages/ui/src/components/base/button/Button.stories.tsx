import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Base/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: "Figma 디자인 시스템 기반 Button 컴포넌트입니다. 3가지 스타일(filled, outline, transparent)과 3가지 타입(primary, secondary, destructive)을 제공합니다.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["filled", "outline", "transparent"],
      description: "버튼 스타일 (filled: 채워진, outline: 테두리, transparent: 투명)",
    },
    type: {
      control: { type: "select" },
      options: ["primary", "secondary", "destructive"],
      description: "버튼 타입 (primary: 파란색, secondary: 회색, destructive: 빨간색)",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성화 여부",
    },
    loading: {
      control: { type: "boolean" },
      description: "로딩 상태 여부",
    },
    children: {
      control: { type: "text" },
      description: "버튼 내부 텍스트",
    },
    onClick: {
      action: "clicked",
      description: "클릭 이벤트 핸들러",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼
export const Default: Story = {
  args: {
    children: "Button",
  },
};

// Filled 스타일
export const Filled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button variant="filled" type="primary">
        Primary
      </Button>
      <Button variant="filled" type="secondary">
        Secondary
      </Button>
      <Button variant="filled" type="destructive">
        Destructive
      </Button>
    </div>
  ),
};

// Outline 스타일
export const Outline: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button variant="outline" type="primary">
        Primary
      </Button>
      <Button variant="outline" type="secondary">
        Secondary
      </Button>
      <Button variant="outline" type="destructive">
        Destructive
      </Button>
    </div>
  ),
};

// Transparent 스타일
export const Transparent: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button variant="transparent" type="primary">
        Primary
      </Button>
      <Button variant="transparent" type="secondary">
        Secondary
      </Button>
      <Button variant="transparent" type="destructive">
        Destructive
      </Button>
    </div>
  ),
};

// 로딩 상태
export const Loading: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button variant="filled" type="primary" loading>
          Primary Loading
        </Button>
        <Button variant="filled" type="secondary" loading>
          Secondary Loading
        </Button>
        <Button variant="filled" type="destructive" loading>
          Destructive Loading
        </Button>
      </div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button variant="outline" type="primary" loading>
          Primary Loading
        </Button>
        <Button variant="outline" type="secondary" loading>
          Secondary Loading
        </Button>
        <Button variant="outline" type="destructive" loading>
          Destructive Loading
        </Button>
      </div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button variant="transparent" type="primary" loading>
          Primary Loading
        </Button>
        <Button variant="transparent" type="secondary" loading>
          Secondary Loading
        </Button>
        <Button variant="transparent" type="destructive" loading>
          Destructive Loading
        </Button>
      </div>
    </div>
  ),
};

// 비활성화 상태
export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button variant="filled" type="primary" disabled>
          Primary Disabled
        </Button>
        <Button variant="filled" type="secondary" disabled>
          Secondary Disabled
        </Button>
        <Button variant="filled" type="destructive" disabled>
          Destructive Disabled
        </Button>
      </div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button variant="outline" type="primary" disabled>
          Primary Disabled
        </Button>
        <Button variant="outline" type="secondary" disabled>
          Secondary Disabled
        </Button>
        <Button variant="outline" type="destructive" disabled>
          Destructive Disabled
        </Button>
      </div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button variant="transparent" type="primary" disabled>
          Primary Disabled
        </Button>
        <Button variant="transparent" type="secondary" disabled>
          Secondary Disabled
        </Button>
        <Button variant="transparent" type="destructive" disabled>
          Destructive Disabled
        </Button>
      </div>
    </div>
  ),
};

// 모든 조합 보기 (Figma 디자인과 동일)
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>
          Filled Style
        </h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.5rem" }}>
          <Button variant="filled" type="primary">Primary</Button>
          <Button variant="filled" type="secondary">Secondary</Button>
          <Button variant="filled" type="destructive">Destructive</Button>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.5rem" }}>
          <Button variant="filled" type="primary" loading>Primary Loading</Button>
          <Button variant="filled" type="secondary" loading>Secondary Loading</Button>
          <Button variant="filled" type="destructive" loading>Destructive Loading</Button>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button variant="filled" type="primary" disabled>Primary Disabled</Button>
          <Button variant="filled" type="secondary" disabled>Secondary Disabled</Button>
          <Button variant="filled" type="destructive" disabled>Destructive Disabled</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>
          Outline Style
        </h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.5rem" }}>
          <Button variant="outline" type="primary">Primary</Button>
          <Button variant="outline" type="secondary">Secondary</Button>
          <Button variant="outline" type="destructive">Destructive</Button>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.5rem" }}>
          <Button variant="outline" type="primary" loading>Primary Loading</Button>
          <Button variant="outline" type="secondary" loading>Secondary Loading</Button>
          <Button variant="outline" type="destructive" loading>Destructive Loading</Button>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button variant="outline" type="primary" disabled>Primary Disabled</Button>
          <Button variant="outline" type="secondary" disabled>Secondary Disabled</Button>
          <Button variant="outline" type="destructive" disabled>Destructive Disabled</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>
          Transparent Style
        </h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.5rem" }}>
          <Button variant="transparent" type="primary">Primary</Button>
          <Button variant="transparent" type="secondary">Secondary</Button>
          <Button variant="transparent" type="destructive">Destructive</Button>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.5rem" }}>
          <Button variant="transparent" type="primary" loading>Primary Loading</Button>
          <Button variant="transparent" type="secondary" loading>Secondary Loading</Button>
          <Button variant="transparent" type="destructive" loading>Destructive Loading</Button>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button variant="transparent" type="primary" disabled>Primary Disabled</Button>
          <Button variant="transparent" type="secondary" disabled>Secondary Disabled</Button>
          <Button variant="transparent" type="destructive" disabled>Destructive Disabled</Button>
        </div>
      </div>
    </div>
  ),
};

// 상호작용 예시
export const Interactive: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
        버튼에 마우스를 올리거나 클릭해보세요 (hover, active 상태 확인)
      </p>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button variant="filled" type="primary" onClick={() => alert("Primary Filled clicked!")}>
          Primary Filled
        </Button>
        <Button variant="outline" type="secondary" onClick={() => alert("Secondary Outline clicked!")}>
          Secondary Outline
        </Button>
        <Button variant="transparent" type="destructive" onClick={() => alert("Destructive Transparent clicked!")}>
          Destructive Transparent
        </Button>
      </div>
    </div>
  ),
};

// 실제 사용 예시
export const UsageExample: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "400px" }}>
      <div style={{ 
        padding: "1.5rem", 
        border: "1px solid #e5e7eb", 
        borderRadius: "8px",
        backgroundColor: "#f9fafb"
      }}>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "18px", fontWeight: "600" }}>
          계정 삭제
        </h3>
        <p style={{ margin: "0 0 1.5rem 0", fontSize: "14px", color: "#6b7280" }}>
          이 작업은 되돌릴 수 없습니다. 계정과 모든 데이터가 영구적으로 삭제됩니다.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
          <Button variant="outline" type="secondary">
            취소
          </Button>
          <Button variant="filled" type="destructive">
            계정 삭제
          </Button>
        </div>
      </div>
      
      <div style={{ 
        padding: "1.5rem", 
        border: "1px solid #e5e7eb", 
        borderRadius: "8px",
        backgroundColor: "#f9fafb"
      }}>
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "18px", fontWeight: "600" }}>
          프로젝트 생성
        </h3>
        <p style={{ margin: "0 0 1.5rem 0", fontSize: "14px", color: "#6b7280" }}>
          새로운 프로젝트를 생성하시겠습니까?
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
          <Button variant="transparent" type="secondary">
            나중에
          </Button>
          <Button variant="outline" type="primary">
            템플릿 선택
          </Button>
          <Button variant="filled" type="primary">
            새로 만들기
          </Button>
        </div>
      </div>
    </div>
  ),
};
