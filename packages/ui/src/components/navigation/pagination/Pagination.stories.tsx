import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Pagination from "@ui/components/navigation/pagination/Pagination";

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
페이지 이동을 위한 Pagination 컴포넌트입니다.

**특징:**
- Page 버튼: Default, Hover, Selected, More(…) 4가지 상태
- Control 버튼 (← → « »): Default, Hover, Active, Disabled
- 페이지 수가 많을 때 ellipsis(…) 자동 처리
- \`siblingCount\`로 현재 페이지 주변 표시 개수 조절
- \`showFirstLast\`로 « » 버튼 표시 여부 조절

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    page: {
      control: { type: "number", min: 1 },
      description: "현재 페이지 (1-based)",
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "전체 페이지 수",
    },
    siblingCount: {
      control: { type: "number", min: 0, max: 3 },
      description: "현재 페이지 주변 표시할 페이지 수 (기본값: 2)",
    },
    showFirstLast: {
      control: { type: "boolean" },
      description: "« » 첫/끝 이동 버튼 표시 여부",
    },
    onChange: {
      action: "changed",
      description: "페이지 변경 핸들러",
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    page: 1,
    totalPages: 7,
    siblingCount: 2,
    showFirstLast: true,
  },
};

// 2. 모든 조합 — Figma 레이아웃 기준
export const AllVariants: Story = {
  args: {
    page: 1,
    totalPages: 7,
    siblingCount: 2,
    showFirstLast: true,
  },
  render: () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(4);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* 일반형 — 전체 페이지 표시 */}
        <div>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>
            일반형 (1 / 7)
          </h3>
          <Pagination
            page={page1}
            totalPages={7}
            siblingCount={2}
            onChange={setPage1}
          />
        </div>

        {/* Ellipsis형 — … 표시 */}
        <div>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>
            Ellipsis형 (4 / 20)
          </h3>
          <Pagination
            page={page2}
            totalPages={20}
            siblingCount={2}
            onChange={setPage2}
          />
        </div>

        {/* 처음/끝 버튼 없음 */}
        <div>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}>
            showFirstLast=false
          </h3>
          <Pagination
            page={page2}
            totalPages={20}
            siblingCount={2}
            showFirstLast={false}
            onChange={setPage2}
          />
        </div>
      </div>
    );
  },
};

// 3. 첫 페이지 (Control 비활성)
export const FirstPage: Story = {
  args: {
    page: 1,
    totalPages: 10,
    siblingCount: 2,
  },
};

// 4. 마지막 페이지 (Control 비활성)
export const LastPage: Story = {
  args: {
    page: 10,
    totalPages: 10,
    siblingCount: 2,
  },
};

// 5. 실제 사용 예시
export const UsageExample: Story = {
  args: {
    page: 1,
    totalPages: 50,
  },
  render: () => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = 487;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", minWidth: "480px" }}>
        {/* 테이블 영역 */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              background: "#f9fafb",
              borderBottom: "1px solid #e5e7eb",
              fontSize: "13px",
              fontWeight: "600",
              color: "#374151",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>이름</span>
            <span>상태</span>
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              style={{
                padding: "12px 16px",
                borderBottom: i < 4 ? "1px solid #f3f4f6" : "none",
                fontSize: "13px",
                color: "#1f2937",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>항목 {(page - 1) * itemsPerPage + i + 1}</span>
              <span style={{ color: "#6b7280" }}>정상</span>
            </div>
          ))}
        </div>

        {/* Pagination 영역 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "13px", color: "#6b7280" }}>
            총 {totalItems}개 중 {(page - 1) * itemsPerPage + 1}–
            {Math.min(page * itemsPerPage, totalItems)}개
          </span>
          <Pagination
            page={page}
            totalPages={totalPages}
            siblingCount={2}
            onChange={setPage}
          />
        </div>
      </div>
    );
  },
};
