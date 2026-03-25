import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Carousel from "./Carousel";

// 슬라이드 1 — 히어로 배너 (텍스트 + 파랑 배경)
const heroBannerSlide = (
  key: string,
  bg: string,
  color: string,
  title: string,
  sub: string
) => ({
  key,
  content: (
    <div
      style={{
        width: "100%",
        height: "360px",
        background: bg,
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        padding: "40px",
        boxSizing: "border-box" as const,
      }}
    >
      <p
        style={{
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: "3px",
          color,
          opacity: 0.6,
          margin: 0,
        }}
      >
        SUBTITLE
      </p>
      <h2
        style={{
          fontSize: "40px",
          fontWeight: 700,
          color,
          margin: 0,
          textAlign: "center" as const,
        }}
      >
        {title}
      </h2>
      <p style={{ fontSize: "15px", color, opacity: 0.75, margin: 0 }}>{sub}</p>
    </div>
  ),
});

// 슬라이드 2 — 상품 카드
const productCardSlide = (
  key: string,
  name: string,
  price: string,
  badge: string,
  bg: string
) => ({
  key,
  content: (
    <div
      style={{
        width: "100%",
        height: "360px",
        background: "#f9fafb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
        boxSizing: "border-box" as const,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "32px",
          alignItems: "center",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "200px",
            height: "200px",
            background: bg,
            borderRadius: "12px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
          }}
        >
          🛍️
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column" as const,
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#2563eb",
              background: "#eff6ff",
              padding: "2px 8px",
              borderRadius: "99px",
              alignSelf: "flex-start" as const,
            }}
          >
            {badge}
          </span>
          <h3
            style={{
              fontSize: "24px",
              fontWeight: 700,
              margin: 0,
              color: "#111827",
            }}
          >
            {name}
          </h3>
          <p
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#2563eb",
              margin: 0,
            }}
          >
            {price}
          </p>
          <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
            지금 주문하면 내일 도착
          </p>
        </div>
      </div>
    </div>
  ),
});

// 슬라이드 3 — 공지 / 알림
const announcementSlide = (
  key: string,
  icon: string,
  title: string,
  desc: string,
  bg: string
) => ({
  key,
  content: (
    <div
      style={{
        width: "100%",
        height: "360px",
        background: bg,
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "40px",
        boxSizing: "border-box" as const,
      }}
    >
      <div style={{ fontSize: "56px" }}>{icon}</div>
      <h3
        style={{
          fontSize: "24px",
          fontWeight: 700,
          margin: 0,
          color: "#111827",
          textAlign: "center" as const,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "15px",
          color: "#4b5563",
          margin: 0,
          textAlign: "center" as const,
          maxWidth: "400px",
        }}
      >
        {desc}
      </p>
      <button
        style={{
          marginTop: "8px",
          padding: "10px 24px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        자세히 보기
      </button>
    </div>
  ),
});

// 슬라이드 4 — 통계/지표 카드
const statsSlide = {
  key: "stats",
  content: (
    <div
      style={{
        width: "100%",
        height: "360px",
        background: "#1e3a8a",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        gap: "32px",
        padding: "40px",
        boxSizing: "border-box" as const,
      }}
    >
      <h3
        style={{
          fontSize: "20px",
          fontWeight: 600,
          color: "#bfdbfe",
          margin: 0,
        }}
      >
        이번 달 성과
      </h3>
      <div style={{ display: "flex", gap: "48px" }}>
        {[
          { label: "신규 가입", value: "1,284", unit: "명" },
          { label: "총 매출", value: "₩48.2M", unit: "" },
          { label: "전환율", value: "3.8", unit: "%" },
        ].map(({ label, value, unit }) => (
          <div key={label} style={{ textAlign: "center" as const }}>
            <p
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: "#ffffff",
                margin: 0,
              }}
            >
              {value}
              <span style={{ fontSize: "18px" }}>{unit}</span>
            </p>
            <p
              style={{ fontSize: "13px", color: "#93c5fd", margin: "4px 0 0" }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
};

const SLIDES_5 = [
  heroBannerSlide(
    "hero1",
    "#dbeafe",
    "#1e3a8a",
    "새로운 디자인 시스템",
    "Figma 기반으로 제작된 컴포넌트 라이브러리"
  ),
  productCardSlide("product", "Pro 플랜", "₩29,000 / 월", "인기", "#e0f2fe"),
  announcementSlide(
    "notice",
    "🎉",
    "v2.0 업데이트 출시",
    "새로운 컴포넌트 20종과 다크 모드 지원이 추가되었습니다.",
    "#fefce8"
  ),
  statsSlide,
  heroBannerSlide(
    "hero2",
    "#1e3a8a",
    "#ffffff",
    "함께 만들어가는 디자인",
    "모든 팀원이 하나의 언어로 소통합니다"
  ),
];

const SLIDES_3 = SLIDES_5.slice(0, 3);

const meta = {
  title: "Data Display/Carousel",
  component: Carousel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
콘텐츠를 슬라이드 형식으로 표시하는 Carousel 컴포넌트입니다.

**특징:**
- 슬라이드 콘텐츠는 \`ReactNode\`로 자유롭게 구성
- 화살표 크기: \`sm\` (32px), \`lg\` (40px)
- 인디케이터 dot: 2~5개 (선택된 dot은 파랑)
- \`autoPlay\` prop으로 자동 슬라이드 지원
- 키보드 접근성: aria-roledescription, role="tab"

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    arrowSize: {
      control: { type: "select" },
      options: ["sm", "lg"],
      description: "화살표 크기 (sm: 32px, lg: 40px)",
    },
    autoPlay: {
      control: { type: "number" },
      description: "자동 슬라이드 간격 (ms, 0이면 비활성)",
    },
    showIndicator: {
      control: { type: "boolean" },
      description: "인디케이터 dot 표시 여부",
    },
    showArrows: {
      control: { type: "boolean" },
      description: "화살표 표시 여부",
    },
    onChange: {
      action: "changed",
      description: "슬라이드 변경 핸들러",
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    slides: SLIDES_5,
    defaultIndex: 0,
    arrowSize: "sm",
    showIndicator: true,
    showArrows: true,
  },
};

// 2. 모든 조합 — arrowSize × indicator
export const AllVariants: Story = {
  args: {
    slides: SLIDES_5,
    defaultIndex: 0,
    arrowSize: "sm",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <div>
        <h3
          style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}
        >
          Arrow sm (32px) — 5 slides
        </h3>
        <Carousel slides={SLIDES_5} arrowSize="sm" />
      </div>

      <div>
        <h3
          style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}
        >
          Arrow lg (40px) — 3 slides
        </h3>
        <Carousel slides={SLIDES_3} arrowSize="lg" />
      </div>

      <div>
        <h3
          style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}
        >
          Indicator only (no arrows)
        </h3>
        <Carousel slides={SLIDES_3} showArrows={false} />
      </div>

      <div>
        <h3
          style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}
        >
          Arrows only (no indicator)
        </h3>
        <Carousel slides={SLIDES_3} showIndicator={false} />
      </div>
    </div>
  ),
};

// 3. 자동 슬라이드
export const AutoPlay: Story = {
  args: {
    slides: SLIDES_5,
    autoPlay: 2000,
    arrowSize: "sm",
  },
};

// 4. 실제 사용 예시 — 다양한 콘텐츠 슬라이드
export const UsageExample: Story = {
  args: {
    slides: SLIDES_5,
    defaultIndex: 0,
    arrowSize: "lg",
  },
  render: () => {
    const [current, setCurrent] = useState(0);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "800px",
        }}
      >
        <Carousel
          slides={SLIDES_5}
          arrowSize="lg"
          onChange={setCurrent}
          defaultIndex={0}
        />
        <p style={{ fontSize: "13px", color: "#6b7280", textAlign: "center" }}>
          현재 슬라이드: {current + 1} / {SLIDES_5.length}
        </p>
      </div>
    );
  },
};
