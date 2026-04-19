import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SearchInput from "./SearchInput";

const meta = {
  title: "Forms/SearchInput",
  component: SearchInput,
  decorators: [
    (Story, context) => {
      const [value, setValue] = React.useState<string>(context.args.value ?? "");
      React.useEffect(() => {
        setValue(context.args.value ?? "");
      }, [context.args.value]);
      return (
        <Story
          args={{
            ...context.args,
            value,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value),
            onClear: () => setValue(""),
          }}
        />
      );
    },
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
검색 입력을 위한 SearchInput 컴포넌트입니다.

**특징:**
- 왼쪽에 search 아이콘 항상 표시
- 값이 있으면 오른쪽에 clear(x) 버튼 자동 표시
- loading 상태일 때 clear 대신 Spinner 표시
- Enter 키로 검색 실행 가능
- Input과 동일한 시각적 스타일 (40px height, rounded, border)
- 완전히 제어 가능한 컴포넌트 (controlled component)

Figma 디자인 시스템을 기반으로 제작되었습니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "text" },
      description: "입력값 (제어 컴포넌트)",
    },
    placeholder: {
      control: { type: "text" },
      description: "플레이스홀더",
    },
    loading: {
      control: { type: "boolean" },
      description: "로딩 상태 (검색 중)",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성화",
    },
    autoFocus: {
      control: { type: "boolean" },
      description: "자동 포커스",
    },
    onChange: {
      action: "changed",
      description: "변경 이벤트",
    },
    onSearch: {
      action: "searched",
      description: "검색 실행 (Enter 키 또는 버튼 클릭)",
    },
    onClear: {
      action: "cleared",
      description: "초기화 콜백",
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태 — controls 패널 연동
export const Default: Story = {
  args: {
    placeholder: "검색어를 입력하세요",
  },
};

// 2. 값이 있는 상태
export const WithValue: Story = {
  args: {
    value: "React",
    placeholder: "검색어를 입력하세요",
  },
};

// 3. 로딩 상태
export const Loading: Story = {
  args: {
    value: "TypeScript",
    placeholder: "검색어를 입력하세요",
    loading: true,
  },
};

// 4. 비활성화 상태
export const Disabled: Story = {
  args: {
    placeholder: "검색어를 입력하세요",
    disabled: true,
  },
};

// 5. 비활성화 + 값
export const DisabledWithValue: Story = {
  args: {
    value: "Disabled input",
    placeholder: "검색어를 입력하세요",
    disabled: true,
  },
};

// 6. 모든 상태 비교
export const AllStates: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "300px" }}>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "12px", color: "#6b7280" }}>
          기본
        </label>
        <SearchInput placeholder="검색어를 입력하세요" />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "12px", color: "#6b7280" }}>
          값 있음
        </label>
        <SearchInput value="검색어" placeholder="검색어를 입력하세요" onChange={() => {}} />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "12px", color: "#6b7280" }}>
          로딩 중
        </label>
        <SearchInput value="로딩중" loading placeholder="검색어를 입력하세요" onChange={() => {}} />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "12px", color: "#6b7280" }}>
          비활성화
        </label>
        <SearchInput placeholder="검색어를 입력하세요" disabled />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "12px", color: "#6b7280" }}>
          비활성화 + 값
        </label>
        <SearchInput value="비활성" placeholder="검색어를 입력하세요" disabled onChange={() => {}} />
      </div>
    </div>
  ),
};

// 7. 실제 사용 예시 — 상호작용
export const Interactive: Story = {
  args: {},
  render: () => {
    const SearchExample = () => {
      const [value, setValue] = useState("");
      const [loading, setLoading] = useState(false);
      const [results, setResults] = useState<string[]>([]);

      const handleSearch = (searchValue: string) => {
        if (!searchValue.trim()) {
          setResults([]);
          return;
        }

        setLoading(true);
        // 시뮬레이션: 1초 후 결과 반환
        setTimeout(() => {
          setResults([
            `"${searchValue}" 검색 결과 1`,
            `"${searchValue}" 검색 결과 2`,
            `"${searchValue}" 검색 결과 3`,
          ]);
          setLoading(false);
        }, 1000);
      };

      const handleClear = () => {
        setValue("");
        setResults([]);
      };

      return (
        <div style={{ width: "400px" }}>
          <SearchInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onSearch={handleSearch}
            onClear={handleClear}
            placeholder="검색어를 입력하세요 (Enter를 누르면 검색됩니다)"
            loading={loading}
          />

          {results.length > 0 && (
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                borderRadius: "8px",
                backgroundColor: "#f3f4f6",
              }}
            >
              <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "14px", fontWeight: "600" }}>
                검색 결과 ({results.length}개)
              </h4>
              <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
                {results.map((result, idx) => (
                  <li key={idx} style={{ fontSize: "14px", color: "#1f2937" }}>
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    };

    return <SearchExample />;
  },
};

// 8. 커스텀 플레이스홀더
export const CustomPlaceholder: Story = {
  args: {
    placeholder: "상품, 브랜드, 검색어 입력",
  },
};
