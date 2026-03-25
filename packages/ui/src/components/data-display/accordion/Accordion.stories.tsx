import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionItem } from "./Accordion";

const meta = {
  title: "Data Display/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
콘텐츠를 접고 펼 수 있는 Accordion 컴포넌트입니다.

**특징:**
- 2가지 변형: \`default\` (구분선), \`bordered\` (테두리 박스)
- 단일/다중 확장: \`multiple\` prop
- CSS \`grid-template-rows\` 기반 부드러운 애니메이션
- 키보드 접근성: Enter/Space로 토글
- \`AccordionItem\`별 개별 비활성화 지원
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    multiple: {
      control: { type: "boolean" },
      description: "여러 항목 동시 확장 허용",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "bordered"],
      description: "스타일 변형",
    },
    disabled: {
      control: { type: "boolean" },
      description: "전체 비활성화",
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    variant: "default",
    multiple: false,
  },
  render: (args) => (
    <div style={{ width: "400px" }}>
      <Accordion {...args}>
        <AccordionItem value="1" title="아코디언 항목 1">
          아코디언 항목 1의 콘텐츠입니다. 클릭하면 펼쳐지고 다시 클릭하면 접힙니다.
        </AccordionItem>
        <AccordionItem value="2" title="아코디언 항목 2">
          아코디언 항목 2의 콘텐츠입니다. 다양한 내용을 담을 수 있습니다.
        </AccordionItem>
        <AccordionItem value="3" title="아코디언 항목 3">
          아코디언 항목 3의 콘텐츠입니다.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// 2. Bordered 변형
export const Bordered: Story = {
  args: {
    variant: "bordered",
  },
  render: (args) => (
    <div style={{ width: "400px" }}>
      <Accordion {...args}>
        <AccordionItem value="1" title="아코디언 항목 1">
          Bordered 스타일의 아코디언입니다. 전체가 테두리 박스로 감싸져 있습니다.
        </AccordionItem>
        <AccordionItem value="2" title="아코디언 항목 2">
          각 항목 사이에 구분선이 표시됩니다.
        </AccordionItem>
        <AccordionItem value="3" title="아코디언 항목 3">
          카드 스타일의 UI에 적합합니다.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// 3. 다중 확장
export const Multiple: Story = {
  args: {
    variant: "default",
    multiple: true,
  },
  render: (args) => (
    <div style={{ width: "400px" }}>
      <Accordion {...args} defaultExpanded={["1", "3"]}>
        <AccordionItem value="1" title="항목 1 (기본 열림)">
          multiple 모드에서는 여러 항목을 동시에 펼칠 수 있습니다.
        </AccordionItem>
        <AccordionItem value="2" title="항목 2">
          이 항목도 클릭하면 다른 항목이 닫히지 않습니다.
        </AccordionItem>
        <AccordionItem value="3" title="항목 3 (기본 열림)">
          defaultExpanded로 초기에 열린 항목을 지정할 수 있습니다.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// 4. 부제목 포함
export const WithSubtitle: Story = {
  args: {
    variant: "bordered",
  },
  render: (args) => (
    <div style={{ width: "400px" }}>
      <Accordion {...args}>
        <AccordionItem value="1" title="개인 정보" subtitle="이름, 이메일, 전화번호">
          이름: 홍길동
          <br />
          이메일: hong@example.com
          <br />
          전화번호: 010-1234-5678
        </AccordionItem>
        <AccordionItem value="2" title="보안 설정" subtitle="비밀번호, 2FA">
          비밀번호를 주기적으로 변경하세요. 2단계 인증을 활성화하면 보안이 강화됩니다.
        </AccordionItem>
        <AccordionItem value="3" title="알림 설정" subtitle="이메일, 푸시, SMS">
          알림 수신 방법을 설정할 수 있습니다.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// 5. 비활성화
export const Disabled: Story = {
  args: {
    variant: "default",
  },
  render: (args) => (
    <div style={{ width: "400px" }}>
      <Accordion {...args}>
        <AccordionItem value="1" title="활성 항목">
          이 항목은 정상적으로 동작합니다.
        </AccordionItem>
        <AccordionItem value="2" title="비활성 항목" disabled>
          이 항목은 비활성화되어 클릭할 수 없습니다.
        </AccordionItem>
        <AccordionItem value="3" title="활성 항목">
          이 항목도 정상적으로 동작합니다.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// 6. 전체 비활성화
export const AllDisabled: Story = {
  args: {
    variant: "bordered",
    disabled: true,
  },
  render: (args) => (
    <div style={{ width: "400px" }}>
      <Accordion {...args} defaultExpanded={["1"]}>
        <AccordionItem value="1" title="항목 1">
          전체 비활성화 상태에서도 이미 열린 항목의 콘텐츠는 보입니다.
        </AccordionItem>
        <AccordionItem value="2" title="항목 2">
          콘텐츠
        </AccordionItem>
        <AccordionItem value="3" title="항목 3">
          콘텐츠
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// 7. 실제 사용 예시 — FAQ
export const UsageExample: Story = {
  args: {},
  render: () => (
    <div style={{ width: "480px" }}>
      <h3 style={{ margin: "0 0 1rem 0", fontSize: "18px", fontWeight: "600" }}>
        자주 묻는 질문
      </h3>
      <Accordion variant="bordered" multiple>
        <AccordionItem value="q1" title="서비스 이용 요금은 어떻게 되나요?">
          기본 플랜은 무료이며, Pro 플랜은 월 9,900원입니다. Enterprise 플랜은 별도
          문의해 주세요. 연간 결제 시 20% 할인이 적용됩니다.
        </AccordionItem>
        <AccordionItem value="q2" title="데이터 백업은 어떻게 하나요?">
          설정 &gt; 데이터 관리에서 수동 백업이 가능합니다. Pro 이상 플랜에서는
          자동 백업이 매일 실행됩니다. 백업 데이터는 최대 30일간 보관됩니다.
        </AccordionItem>
        <AccordionItem value="q3" title="계정을 삭제하면 데이터는 어떻게 되나요?">
          계정 삭제 시 모든 데이터가 영구적으로 삭제됩니다. 삭제 요청 후 30일 이내에
          취소할 수 있으며, 이후에는 복구가 불가능합니다.
        </AccordionItem>
        <AccordionItem value="q4" title="팀원 초대는 어떻게 하나요?">
          설정 &gt; 팀 관리에서 이메일로 팀원을 초대할 수 있습니다. 초대된 팀원은
          이메일의 링크를 통해 가입 및 팀 합류가 가능합니다.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// 8. 두 변형 비교
export const VariantComparison: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div style={{ width: "320px" }}>
        <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: "600", color: "#6b7280" }}>
          Default
        </h3>
        <Accordion variant="default" defaultExpanded={["1"]}>
          <AccordionItem value="1" title="항목 1">콘텐츠 내용</AccordionItem>
          <AccordionItem value="2" title="항목 2">콘텐츠 내용</AccordionItem>
          <AccordionItem value="3" title="항목 3">콘텐츠 내용</AccordionItem>
        </Accordion>
      </div>
      <div style={{ width: "320px" }}>
        <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: "600", color: "#6b7280" }}>
          Bordered
        </h3>
        <Accordion variant="bordered" defaultExpanded={["1"]}>
          <AccordionItem value="1" title="항목 1">콘텐츠 내용</AccordionItem>
          <AccordionItem value="2" title="항목 2">콘텐츠 내용</AccordionItem>
          <AccordionItem value="3" title="항목 3">콘텐츠 내용</AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};
