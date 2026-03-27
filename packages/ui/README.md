# @weavekit/ui

Figma 디자인 시스템 기반 React UI 컴포넌트 라이브러리입니다.

[![npm version](https://img.shields.io/npm/v/@weavekit/ui)](https://www.npmjs.com/package/@weavekit/ui)
[![license](https://img.shields.io/npm/l/@weavekit/ui)](./LICENSE)

## 설치

```bash
npm install @weavekit/ui
# or
pnpm add @weavekit/ui
# or
yarn add @weavekit/ui
```

## 시작하기

### 1. 스타일 import

앱 진입점에서 CSS를 한 번만 import해주세요.

```tsx
// main.tsx 또는 App.tsx
import "@weavekit/ui/styles";
```

TypeScript에서 타입 오류가 나는 경우 프로젝트에 `declarations.d.ts` 파일을 추가하세요:

```ts
declare module "@weavekit/ui/styles";
```

### 2. 컴포넌트 사용

```tsx
import { Button, Spinner } from "@weavekit/ui";

function App() {
  return (
    <div>
      <Button variant="filled" type="primary">
        시작하기
      </Button>
      <Spinner size="md" type="primary" />
    </div>
  );
}
```

## 컴포넌트 목록

### Base

| 컴포넌트 | 설명 |
|---------|------|
| `Button` | 다양한 variant/type 버튼 |
| `Icon` | Lucide Icons 기반 아이콘 |
| `Label` | 폼 라벨 (required/optional) |
| `Divider` | 구분선 (horizontal/vertical) |
| `Link` | 텍스트 링크 (underline/standalone) |

### Data Display

| 컴포넌트 | 설명 |
|---------|------|
| `Avatar` | 프로필 아바타 (initial/profile/icon) |
| `AvatarGroup` | 아바타 그룹 |
| `Badge` | 뱃지 (dot/number/letter) |
| `Chips` | 상태/선택 칩 |
| `Carousel` | 슬라이드 캐러셀 |
| `Table` | TanStack Table 기반 데이터 테이블 |

### Feedback

| 컴포넌트 | 설명 |
|---------|------|
| `Spinner` | 로딩 스피너 |
| `Skeleton` | 스켈레톤 로딩 |

### Forms

| 컴포넌트 | 설명 |
|---------|------|
| `Checkbox` | 체크박스 (indeterminate 지원) |
| `Radio` | 라디오 버튼 |
| `Switch` | 토글 스위치 |
| `Input` | 텍스트 입력 |
| `Textarea` | 멀티라인 입력 |
| `Select` | 드롭다운 선택 |

### Navigation

| 컴포넌트 | 설명 |
|---------|------|
| `Tabs` | 탭 (underline/box) |
| `BottomNav` | 모바일 하단 네비게이션 |
| `Pagination` | 페이지네이션 |
| `SideNav` | 사이드 네비게이션 |

### Layout

| 컴포넌트 | 설명 |
|---------|------|
| `Header` | 상단 네비게이션 헤더 |

## 사용 예시

### Button

```tsx
import { Button } from "@weavekit/ui";

<Button variant="filled" type="primary">확인</Button>
<Button variant="outline" type="secondary">취소</Button>
<Button variant="filled" type="destructive" loading>삭제 중...</Button>
```

### Table

`@tanstack/react-table`의 `ColumnDef`를 그대로 사용합니다.

```tsx
import { Table, Avatar, Chips } from "@weavekit/ui";
import type { ColumnDef } from "@tanstack/react-table";

interface User {
  name: string;
  status: "활성" | "비활성";
}

const columns: ColumnDef<User, unknown>[] = [
  {
    id: "name",
    header: "이름",
    accessorKey: "name",
    cell: ({ row }) => (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Avatar type="initial" size="sm" initial={row.original.name[0]} />
        <span>{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ getValue }) => (
      <Chips
        variant="status"
        styleVariant="filled"
        status={getValue() === "활성" ? "success" : "information"}
        label={getValue() as string}
      />
    ),
  },
];

<Table
  data={data}
  columns={columns}
  enableSorting
  enableRowSelection
  enablePagination
  pageSize={10}
/>
```

### SideNav

```tsx
import { SideNav } from "@weavekit/ui";

const groups = [
  {
    items: [
      { value: "home", label: "홈", icon: "home" },
      { value: "users", label: "사용자", icon: "users", badge: "10+" },
    ],
  },
  {
    heading: "설정",
    items: [
      { value: "settings", label: "설정", icon: "settings" },
    ],
  },
];

<SideNav
  groups={groups}
  value={activeMenu}
  type="full"
  onChange={setActiveMenu}
/>
```

## Peer Dependencies

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0"
}
```

## 요구사항

- React 19+
- Node.js 18+

## 라이선스

MIT
