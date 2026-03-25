import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Chips from "./Chips";

const meta = {
  title: "Data Display/Chips",
  component: Chips,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
선택 가능한 필터, 태그, 상태 표시에 사용하는 Chips 컴포넌트입니다.

**특징:**
- 2가지 variant: \`default\` (선택형, leadingIcon + trailing X), \`status\` (상태 표시, 아이콘 고정)
- status variant 3가지 스타일: \`filled\`, \`transparent\`, \`outline\`
- 5가지 status: \`information\`, \`success\`, \`error\`, \`warning\`, \`neutral\`
- default variant 상태: Default, Hover, Press, Focus, Selected, Disabled, Draggable

Figma 디자인 시스템을 기반으로 제작되었습니다.
      `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
      description: "칩에 표시될 텍스트",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "status"],
      description: "칩 종류 (default: 선택형, status: 상태 표시)",
    },
    status: {
      control: { type: "select" },
      options: ["information", "success", "error", "warning", "neutral"],
      description: "상태 (variant='status'일 때 사용)",
    },
    styleVariant: {
      control: { type: "select" },
      options: ["filled", "transparent", "outline"],
      description: "스타일 변형 (variant='status'일 때 사용, Figma 기준)",
    },
    selected: {
      control: { type: "boolean" },
      description: "선택 상태 (variant='default'일 때)",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성 상태",
    },
    draggable: {
      control: { type: "boolean" },
      description: "드래그 가능 여부",
    },
    leadingIcon: {
      control: { type: "select" },
      options: [undefined, "map-pin", "user", "info", "check", "avatar"],
      description: "리딩 아이콘 이름 (Lucide Icons 기준) 또는 'avatar'",
    },
    showTrailingIcon: {
      control: { type: "boolean" },
      description: "trailing X 버튼 표시 여부 (variant='default'일 때)",
    },
    onClick: {
      action: "clicked",
      description: "클릭 이벤트 핸들러",
    },
    onDelete: {
      action: "deleted",
      description: "삭제(X) 버튼 클릭 핸들러",
    },
  },
} satisfies Meta<typeof Chips>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    label: "Label",
    variant: "default",
    leadingIcon: "map-pin",
    showTrailingIcon: true,
  },
};

// 2. 모든 조합 — Figma 레이아웃 기준
export const AllVariants: Story = {
  args: {
    label: "Label",
    variant: "default",
    leadingIcon: "map-pin",
    showTrailingIcon: true,
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Default Chip — Selected=False / Selected=True */}
      <div>
        <h3
          style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}
        >
          Chip (Default)
        </h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <div
            style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
          >
            <span style={{ fontSize: "12px", color: "#6b7280", width: "80px" }}>
              Unselected
            </span>
            <Chips label="Label" leadingIcon="map-pin" />
            <Chips label="Label" leadingIcon="map-pin" disabled />
          </div>
          <div
            style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
          >
            <span style={{ fontSize: "12px", color: "#6b7280", width: "80px" }}>
              Selected
            </span>
            <Chips label="Label" leadingIcon="map-pin" selected />
            <Chips label="Label" leadingIcon="map-pin" selected disabled />
          </div>
        </div>
      </div>

      {/* Status Chip — filled × transparent × outline */}
      <div>
        <h3
          style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: "600" }}
        >
          Status Chip
        </h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {(["filled", "transparent", "outline"] as const).map((sv) => (
            <div
              key={sv}
              style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
            >
              <span
                style={{ fontSize: "12px", color: "#6b7280", width: "80px" }}
              >
                {sv}
              </span>
              {(
                [
                  "information",
                  "success",
                  "error",
                  "warning",
                  "neutral",
                ] as const
              ).map((s) => (
                <Chips
                  key={s}
                  variant="status"
                  status={s}
                  styleVariant={sv}
                  label="status chip"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// 3. 비활성화
export const Disabled: Story = {
  args: {
    label: "Disabled",
    variant: "default",
    leadingIcon: "map-pin",
    showTrailingIcon: true,
    disabled: true,
  },
};

// 4. 아바타 리딩 아이콘
export const WithAvatar: Story = {
  args: {
    label: "Label",
    variant: "default",
    leadingIcon: "avatar",
    avatarInitial: "W",
    showTrailingIcon: true,
  },
};

// 5. 실제 사용 예시
export const UsageExample: Story = {
  args: {
    label: "React",
    variant: "default",
    leadingIcon: "map-pin",
  },
  render: () => {
    const [chips, setChips] = React.useState([
      { id: 1, label: "서울", selected: true },
      { id: 2, label: "부산", selected: false },
      { id: 3, label: "제주", selected: false },
      { id: 4, label: "대구", selected: false },
    ]);

    const toggle = (id: number) =>
      setChips((prev) =>
        prev.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c))
      );

    const remove = (id: number) =>
      setChips((prev) => prev.filter((c) => c.id !== id));

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          minWidth: "320px",
        }}
      >
        {/* 필터 칩 */}
        <div
          style={{
            padding: "1rem",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "#6b7280",
              marginBottom: "0.75rem",
            }}
          >
            지역 필터
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {chips.map((chip) => (
              <Chips
                key={chip.id}
                label={chip.label}
                leadingIcon="map-pin"
                selected={chip.selected}
                onClick={() => toggle(chip.id)}
                onDelete={() => remove(chip.id)}
              />
            ))}
          </div>
        </div>

        {/* 상태 칩 */}
        <div
          style={{
            padding: "1rem",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "#6b7280",
              marginBottom: "0.75rem",
            }}
          >
            배포 상태
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <Chips
              variant="status"
              status="success"
              styleVariant="filled"
              label="배포 완료"
            />
            <Chips
              variant="status"
              status="warning"
              styleVariant="filled"
              label="검토 중"
            />
            <Chips
              variant="status"
              status="error"
              styleVariant="outline"
              label="배포 실패"
            />
            <Chips
              variant="status"
              status="information"
              styleVariant="transparent"
              label="대기 중"
            />
          </div>
        </div>
      </div>
    );
  },
};
