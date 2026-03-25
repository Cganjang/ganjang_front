import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Switch from "@ui/components/forms/switch/Switch";

const meta = {
  title: "Forms/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Figma 디자인 시스템 기반 Switch (토글) 컴포넌트입니다.

**특징:**
- 크기: 48×24 트랙, 20×20 인디케이터 (Figma 기준)
- 6가지 상태: Default, Hover, Press, Focus, Disabled, Error
- 아이콘 표시: \`showIcon\`으로 check/x 아이콘 토글
- 라벨 위치: \`labelDirection\`으로 좌/우 배치

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: { type: "boolean" },
      description: "선택 상태 (제어 컴포넌트)",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성화 여부",
    },
    error: {
      control: { type: "boolean" },
      description: "에러 상태",
    },
    showIcon: {
      control: { type: "boolean" },
      description: "인디케이터 내 아이콘 표시 여부 (check/x)",
    },
    label: {
      control: { type: "text" },
      description: "라벨 텍스트",
    },
    labelDirection: {
      control: { type: "select" },
      options: ["left", "right"],
      description: "라벨 위치 (Figma: Direction)",
    },
    onChange: {
      action: "changed",
      description: "변경 이벤트 핸들러",
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태 — controls 패널 연동
export const Default: Story = {
  args: {
    label: "Label",
    showIcon: false,
    labelDirection: "right",
  },
};

// 2. 모든 상태 조합 — Figma 디자인 매트릭스
export const AllStates: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* 아이콘 없음 */}
      <div>
        <h3
          style={{ margin: "0 0 1rem 0", fontSize: "14px", fontWeight: "600", color: "#6b7280" }}
        >
          아이콘 없음 (IsIcon=OFF)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <span style={{ width: "80px", fontSize: "13px", color: "#6b7280" }}>OFF</span>
            <Switch />
            <Switch disabled />
            <Switch error />
          </div>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <span style={{ width: "80px", fontSize: "13px", color: "#6b7280" }}>ON</span>
            <Switch defaultChecked />
            <Switch defaultChecked disabled />
            <Switch defaultChecked error />
          </div>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginTop: "0.25rem" }}>
            <span style={{ width: "80px" }} />
            <span style={{ width: "48px", textAlign: "center", fontSize: "11px", color: "#9ca3af" }}>Default</span>
            <span style={{ width: "48px", textAlign: "center", fontSize: "11px", color: "#9ca3af" }}>Disabled</span>
            <span style={{ width: "48px", textAlign: "center", fontSize: "11px", color: "#9ca3af" }}>Error</span>
          </div>
        </div>
      </div>

      {/* 아이콘 있음 */}
      <div>
        <h3
          style={{ margin: "0 0 1rem 0", fontSize: "14px", fontWeight: "600", color: "#6b7280" }}
        >
          아이콘 있음 (IsIcon=ON)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <span style={{ width: "80px", fontSize: "13px", color: "#6b7280" }}>OFF</span>
            <Switch showIcon />
            <Switch showIcon disabled />
            <Switch showIcon error />
          </div>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <span style={{ width: "80px", fontSize: "13px", color: "#6b7280" }}>ON</span>
            <Switch showIcon defaultChecked />
            <Switch showIcon defaultChecked disabled />
            <Switch showIcon defaultChecked error />
          </div>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginTop: "0.25rem" }}>
            <span style={{ width: "80px" }} />
            <span style={{ width: "48px", textAlign: "center", fontSize: "11px", color: "#9ca3af" }}>Default</span>
            <span style={{ width: "48px", textAlign: "center", fontSize: "11px", color: "#9ca3af" }}>Disabled</span>
            <span style={{ width: "48px", textAlign: "center", fontSize: "11px", color: "#9ca3af" }}>Error</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

// 3. 라벨 위치
export const LabelDirection: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h3
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: "600", color: "#6b7280" }}
        >
          Label Right (기본)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Switch label="Label" labelDirection="right" defaultChecked showIcon />
          <Switch label="Label" labelDirection="right" showIcon />
        </div>
      </div>
      <div>
        <h3
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: "600", color: "#6b7280" }}
        >
          Label Left
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Switch label="Label" labelDirection="left" defaultChecked showIcon />
          <Switch label="Label" labelDirection="left" showIcon />
        </div>
      </div>
    </div>
  ),
};

// 4. 제어 컴포넌트
export const Controlled: Story = {
  args: {},
  render: () => {
    const ControlledExample = () => {
      const [checked, setChecked] = useState(false);
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Switch
            label={checked ? "활성화됨" : "비활성화됨"}
            checked={checked}
            onChange={setChecked}
            showIcon
          />
          <p style={{ fontSize: "13px", color: "#6b7280" }}>
            상태: <strong>{checked ? "ON" : "OFF"}</strong>
          </p>
        </div>
      );
    };
    return <ControlledExample />;
  },
};

// 5. 실제 사용 예시
export const UsageExample: Story = {
  args: {},
  render: () => {
    const SettingsExample = () => {
      const [darkMode, setDarkMode] = useState(false);
      const [notifications, setNotifications] = useState(true);
      const [autoSave, setAutoSave] = useState(true);
      const [analytics, setAnalytics] = useState(false);

      return (
        <div
          style={{
            maxWidth: "360px",
            padding: "1.5rem",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        >
          <h3
            style={{
              margin: "0 0 1.25rem 0",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            설정
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: "14px", fontWeight: "500" }}>다크 모드</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>어두운 테마를 사용합니다</div>
              </div>
              <Switch checked={darkMode} onChange={setDarkMode} showIcon />
            </div>
            <hr style={{ border: "none", borderTop: "1px solid #f3f4f6", margin: 0 }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: "14px", fontWeight: "500" }}>알림</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>푸시 알림을 받습니다</div>
              </div>
              <Switch checked={notifications} onChange={setNotifications} showIcon />
            </div>
            <hr style={{ border: "none", borderTop: "1px solid #f3f4f6", margin: 0 }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: "14px", fontWeight: "500" }}>자동 저장</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>변경사항을 자동 저장합니다</div>
              </div>
              <Switch checked={autoSave} onChange={setAutoSave} />
            </div>
            <hr style={{ border: "none", borderTop: "1px solid #f3f4f6", margin: 0 }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: "14px", fontWeight: "500", color: "#6b7280" }}>분석 데이터</div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>사용 불가</div>
              </div>
              <Switch disabled showIcon />
            </div>
          </div>
        </div>
      );
    };
    return <SettingsExample />;
  },
};
