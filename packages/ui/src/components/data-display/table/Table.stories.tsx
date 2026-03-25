import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { type ColumnDef } from "@tanstack/react-table";
import Table from "./Table";
import Avatar from "../../base/avatar/Avatar";
import Chips from "../../base/chips/Chips";
import Icon from "../../base/icon/Icon";

// ===================
// 샘플 데이터 타입
// ===================
interface User {
  id: number;
  name: string;
  school: string;
  gender: "남자" | "여자";
  email: string;
  phone: string;
  address: string;
  status: "배송완료" | "배송 준비중" | "반품 요청";
}

const USERS: User[] = [
  { id: 1, name: "오민준", school: "경희대학교", gender: "남자", email: "ha345@kakao.com", phone: "010-8901-4567", address: "경기도 광명시", status: "배송완료" },
  { id: 2, name: "박서아", school: "안동대학교", gender: "남자", email: "seo567@gmail.com", phone: "010-7890-3456", address: "경기도 남양주시", status: "배송 준비중" },
  { id: 3, name: "이서현", school: "단국대학교", gender: "여자", email: "sohn678@gmail.com", phone: "010-5678-9012", address: "경기도 의정부시", status: "배송 준비중" },
  { id: 4, name: "최수아", school: "숭실대학교", gender: "여자", email: "lee@gmail.com", phone: "010-6789-0123", address: "부산광역시 해운대구", status: "배송 준비중" },
  { id: 5, name: "윤수민", school: "한남대학교", gender: "남자", email: "song345@gmail.com", phone: "010-4567-8901", address: "충청남도 천안시", status: "배송 준비중" },
  { id: 6, name: "김민재", school: "영지대학교", gender: "남자", email: "sohn678@gmail.com", phone: "010-5678-1234", address: "경상북도 경주시", status: "배송 준비중" },
  { id: 7, name: "오예린", school: "한양대학교", gender: "여자", email: "lee@gmail.com", phone: "010-4567-8901", address: "경기도 평택시", status: "배송 준비중" },
  { id: 8, name: "이준호", school: "덕어여자대학교", gender: "여자", email: "ahn890@naver.com", phone: "010-3456-7890", address: "경기도 안양시", status: "반품 요청" },
  { id: 9, name: "박지훈", school: "서울대학교", gender: "남자", email: "park123@gmail.com", phone: "010-1234-5678", address: "서울시 관악구", status: "배송완료" },
  { id: 10, name: "김채원", school: "연세대학교", gender: "여자", email: "kim456@naver.com", phone: "010-9876-5432", address: "서울시 서대문구", status: "배송완료" },
  { id: 11, name: "이도현", school: "고려대학교", gender: "남자", email: "lee789@gmail.com", phone: "010-2345-6789", address: "서울시 성북구", status: "배송 준비중" },
  { id: 12, name: "최유나", school: "이화여자대학교", gender: "여자", email: "choi012@gmail.com", phone: "010-3456-7890", address: "서울시 마포구", status: "반품 요청" },
];

// ===================
// 상태 → Chips props 매핑
// ===================
const statusChipsProps = (status: User["status"]) => {
  const map: Record<User["status"], { status: "success" | "information" | "error"; label: string }> = {
    "배송완료":   { status: "success",     label: "배송완료" },
    "배송 준비중": { status: "information", label: "배송 준비중" },
    "반품 요청":  { status: "error",       label: "반품 요청" },
  };
  return map[status];
};

// ===================
// 컬럼 정의
// ===================
const userColumns: ColumnDef<User, unknown>[] = [
  {
    id: "profile",
    header: "사용자",
    accessorFn: (row) => row.name,
    cell: ({ row }) => (
      <div className="table-cell-profile">
        <Avatar type="initial" size="sm" initial={row.original.name[0]} />
        <div className="table-cell-profile__text">
          <span className="table-cell-profile__name">{row.original.name}</span>
          <span className="table-cell-profile__desc">{row.original.school}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "gender",
    header: "성별",
    size: 80,
  },
  {
    accessorKey: "email",
    header: "이메일 주소",
  },
  {
    accessorKey: "phone",
    header: "연락처",
  },
  {
    accessorKey: "address",
    header: "주소",
  },
  {
    accessorKey: "status",
    header: "주문 상태",
    cell: ({ getValue }) => {
      const s = getValue() as User["status"];
      const props = statusChipsProps(s);
      return (
        <Chips
          variant="status"
          styleVariant="filled"
          status={props.status}
          label={props.label}
        />
      );
    },
    enableSorting: false,
  },
];

const actionColumns: ColumnDef<User, unknown>[] = [
  ...userColumns,
  {
    id: "actions",
    header: "",
    size: 80,
    enableSorting: false,
    cell: ({ row }) => (
      <div className="table-cell-action">
        <button
          style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: "4px", color: "#4b5563" }}
          onClick={(e) => { e.stopPropagation(); alert(`편집: ${row.original.name}`); }}
          aria-label="편집"
        >
          <Icon name="pencil" size={16} />
        </button>
        <button
          style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: "4px", color: "#dc2626" }}
          onClick={(e) => { e.stopPropagation(); alert(`삭제: ${row.original.name}`); }}
          aria-label="삭제"
        >
          <Icon name="trash-2" size={16} />
        </button>
      </div>
    ),
  },
];

// ===================
// Meta
// ===================
const meta = {
  title: "Data Display/Table",
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
TanStack Table 기반의 데이터 테이블 컴포넌트입니다.

**기본 기능:**
- 정렬 (\`enableSorting\`) — 헤더 클릭으로 오름/내림차순 전환
- 행 선택 (\`enableRowSelection\`) — 체크박스 + 전체선택 (indeterminate 지원)
- 전역 필터 (\`enableGlobalFilter\`) — 전체 데이터 검색
- 페이지네이션 (\`enablePagination\`) — 기존 Pagination 컴포넌트 연결

**셀 유형 (Figma 기준):**
- Text — 기본 텍스트, 선택적 description
- Profile — Avatar + 이름 + 소속
- Status — Chips 컴포넌트 (status variant)
- Checkbox — 행 선택 (enableRowSelection 시 자동 추가)
- Action — 편집/삭제 등 액션 버튼

컬럼 정의는 TanStack Table의 \`ColumnDef\`를 그대로 사용합니다.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    enableRowSelection: {
      control: { type: "boolean" },
      description: "행 선택 활성화",
    },
    enableSorting: {
      control: { type: "boolean" },
      description: "정렬 활성화",
    },
    enableGlobalFilter: {
      control: { type: "boolean" },
      description: "전역 검색 활성화",
    },
    enablePagination: {
      control: { type: "boolean" },
      description: "페이지네이션 활성화",
    },
    pageSize: {
      control: { type: "number" },
      description: "페이지당 행 수",
    },
    emptyMessage: {
      control: { type: "text" },
      description: "빈 데이터 메시지",
    },
    onRowClick: { action: "row clicked" },
    onRowSelectionChange: { action: "selection changed" },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    data: USERS.slice(0, 8),
    columns: userColumns,
    enableSorting: true,
  },
};

// 2. 행 선택
export const WithRowSelection: Story = {
  args: {
    data: USERS.slice(0, 8),
    columns: userColumns,
    enableRowSelection: true,
    enableSorting: true,
  },
};

// 3. 전역 필터 + 정렬
export const WithGlobalFilter: Story = {
  args: {
    data: USERS,
    columns: userColumns,
    enableSorting: true,
    enableGlobalFilter: true,
  },
};

// 4. 페이지네이션
export const WithPagination: Story = {
  args: {
    data: USERS,
    columns: userColumns,
    enableSorting: true,
    enablePagination: true,
    pageSize: 5,
  },
};

// 5. 빈 데이터
export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyMessage: "조회된 사용자가 없습니다.",
  },
};

// 6. 실제 사용 예시 — 모든 기능 활성화
export const UsageExample: Story = {
  args: {
    data: USERS,
    columns: actionColumns,
    enableRowSelection: true,
    enableSorting: true,
    enableGlobalFilter: true,
    enablePagination: true,
    pageSize: 5,
  },
  render: () => {
    const [selected, setSelected] = useState<User[]>([]);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>사용자 목록</h3>
          {selected.length > 0 && (
            <span style={{ fontSize: "13px", color: "#2563eb", fontWeight: 500 }}>
              {selected.length}명 선택됨
            </span>
          )}
        </div>
        <Table
          data={USERS}
          columns={actionColumns}
          enableRowSelection
          enableSorting
          enableGlobalFilter
          enablePagination
          pageSize={5}
          onRowSelectionChange={setSelected}
          onRowClick={(row) => console.log("clicked:", row.name)}
        />
      </div>
    );
  },
};
