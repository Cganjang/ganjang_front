# @weavekit/ui

Figma 디자인 시스템 기반 React UI 컴포넌트 라이브러리입니다.

[![npm version](https://img.shields.io/npm/v/@weavekit/ui)](https://www.npmjs.com/package/@weavekit/ui)
[![license](https://img.shields.io/npm/l/@weavekit/ui)](./LICENSE)
[![Storybook](https://img.shields.io/badge/Storybook-live-ff4785?logo=storybook&logoColor=white)](https://weave-ui-storybook.vercel.app)

**[📖 Live Storybook →](https://weave-ui-storybook.vercel.app)**

---

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
import { Button, Toast, Drawer } from "@weavekit/ui";

function App() {
  return (
    <div>
      <Button variant="filled" type="primary">시작하기</Button>
      <Toast status="success" title="저장되었습니다." />
    </div>
  );
}
```

---

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
| `Card` | 콘텐츠 카드 |
| `Table` | TanStack Table 기반 데이터 테이블 |

### Feedback

| 컴포넌트 | 설명 |
|---------|------|
| `Spinner` | 로딩 스피너 |
| `Skeleton` | 스켈레톤 로딩 |
| `Alert` | 인라인 알림 메시지 (success/error/warning/info) |
| `Toast` | 토스트 알림 (자동 닫힘 지원) |
| `EmptyState` | 빈 상태 안내 화면 |
| `ProgressBar` | 진행률 표시 바 |

### Forms

| 컴포넌트 | 설명 |
|---------|------|
| `Checkbox` | 체크박스 (indeterminate 지원) |
| `Radio` | 라디오 버튼 |
| `RadioButtonGroup` | 라디오 버튼 그룹 |
| `Switch` | 토글 스위치 |
| `Input` | 텍스트 입력 |
| `Textarea` | 멀티라인 입력 |
| `Select` | 드롭다운 선택 |
| `SearchInput` | 검색 입력 (clear/loading 지원) |
| `Slider` | 범위 슬라이더 |
| `FileUpload` | 파일 업로드 (drag & drop 지원) |
| `DatePicker` | 날짜 선택 |

### Navigation

| 컴포넌트 | 설명 |
|---------|------|
| `Tabs` | 탭 (underline/box) |
| `BottomNav` | 모바일 하단 네비게이션 |
| `Pagination` | 페이지네이션 |
| `SideNav` | 사이드 네비게이션 |
| `Breadcrumbs` | 브레드크럼 |

### Overlay

| 컴포넌트 | 설명 |
|---------|------|
| `Modal` | 다이얼로그 모달 |
| `Drawer` | 슬라이드 패널 (left/right/top/bottom) |
| `Tooltip` | 툴팁 |
| `Accordion` | 아코디언 (접기/펼치기) |

### Layout

| 컴포넌트 | 설명 |
|---------|------|
| `Header` | 상단 네비게이션 헤더 |

---

## 사용 예시

### Button

```tsx
import { Button } from "@weavekit/ui";

<Button variant="filled" type="primary">확인</Button>
<Button variant="outline" type="secondary">취소</Button>
<Button variant="filled" type="destructive" loading>삭제 중...</Button>
```

### Toast

```tsx
import { Toast } from "@weavekit/ui";
import { useState } from "react";

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>알림 표시</Button>
      <Toast
        isVisible={visible}
        status="success"
        title="저장되었습니다."
        description="변경 사항이 성공적으로 저장되었습니다."
        duration={3000}
        onClose={() => setVisible(false)}
      />
    </>
  );
}
```

### Drawer

```tsx
import { Drawer, Button } from "@weavekit/ui";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>열기</Button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        position="right"
        title="설정"
        footer={<Button onClick={() => setOpen(false)}>닫기</Button>}
      >
        <p>드로어 콘텐츠</p>
      </Drawer>
    </>
  );
}
```

### SearchInput

```tsx
import { SearchInput } from "@weavekit/ui";
import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");

  return (
    <SearchInput
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onSearch={(val) => console.log("검색:", val)}
      onClear={() => setQuery("")}
      placeholder="검색어를 입력하세요"
    />
  );
}
```

### Table

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

---

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
