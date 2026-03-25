import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import Icon from "../../base/icon/Icon";
import Checkbox from "../../forms/checkbox/Checkbox";
import Pagination from "../../navigation/pagination/Pagination";
import "./Table.scss";

export interface TableProps<TData> {
  /**
   * 테이블 데이터
   */
  data: TData[];
  /**
   * 컬럼 정의 (TanStack Table ColumnDef 기반)
   */
  columns: ColumnDef<TData, unknown>[];
  /**
   * 행 선택 활성화 여부
   * @default false
   */
  enableRowSelection?: boolean;
  /**
   * 정렬 활성화 여부 (Figma 디자인엔 없지만 기능 제공)
   * @default true
   */
  enableSorting?: boolean;
  /**
   * 전역 필터(검색) 활성화 여부
   * @default false
   */
  enableGlobalFilter?: boolean;
  /**
   * 페이지네이션 활성화 여부
   * @default false
   */
  enablePagination?: boolean;
  /**
   * 페이지당 행 수
   * @default 10
   */
  pageSize?: number;
  /**
   * 행 클릭 핸들러
   */
  onRowClick?: (row: TData) => void;
  /**
   * 선택된 행 변경 핸들러
   */
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  /**
   * 빈 데이터 메시지
   * @default "데이터가 없습니다."
   */
  emptyMessage?: string;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 인라인 스타일 (style prop 충돌 방지)
   */
  styleOverride?: React.CSSProperties;
}

function Table<TData>({
  data,
  columns,
  enableRowSelection = false,
  enableSorting = true,
  enableGlobalFilter = false,
  enablePagination = false,
  pageSize = 10,
  onRowClick,
  onRowSelectionChange,
  emptyMessage = "데이터가 없습니다.",
  className = "",
  styleOverride,
}: TableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize });

  // 행 선택 컬럼 자동 추가
  const selectionColumn: ColumnDef<TData, unknown> = {
    id: "__select__",
    size: 48,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onChange={(checked) => table.toggleAllPageRowsSelected(checked)}
        aria-label="전체 선택"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        indeterminate={row.getIsSomeSelected()}
        onChange={(checked) => row.toggleSelected(checked)}
        aria-label="행 선택"
      />
    ),
    enableSorting: false,
  };

  const finalColumns = enableRowSelection
    ? [selectionColumn, ...columns]
    : columns;

  const table = useReactTable({
    data,
    columns: finalColumns,
    state: {
      sorting,
      rowSelection,
      columnFilters,
      globalFilter,
      pagination,
    },
    enableRowSelection,
    enableSorting,
    enableGlobalFilter,
    onSortingChange: setSorting,
    onRowSelectionChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(rowSelection) : updater;
      setRowSelection(next);
      if (onRowSelectionChange) {
        const selectedRows = Object.keys(next)
          .filter((key) => next[key])
          .map((key) => data[Number(key)]);
        onRowSelectionChange(selectedRows);
      }
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  });

  const classNames = ["table-wrapper", className].filter(Boolean).join(" ");
  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  return (
    <div className={classNames} style={styleOverride}>
      {/* 전역 필터 검색창 */}
      {enableGlobalFilter && (
        <div className="table-wrapper__toolbar">
          <div className="table-wrapper__search">
            <Icon name="search" size={16} className="table-wrapper__search-icon" />
            <input
              className="table-wrapper__search-input"
              type="text"
              placeholder="검색..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* 테이블 */}
      <div className="table-wrapper__scroll">
        <table className="table">
          <thead className="table__head">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="table__row table__row--header">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      className={[
                        "table__th",
                        canSort && "table__th--sortable",
                        sortDir && "table__th--sorted",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      aria-sort={
                        sortDir === "asc"
                          ? "ascending"
                          : sortDir === "desc"
                          ? "descending"
                          : canSort
                          ? "none"
                          : undefined
                      }
                    >
                      <span className="table__th-inner">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {canSort && (
                          <span className="table__sort-icon">
                            {sortDir === "asc" ? (
                              <Icon name="chevron-up" size={14} />
                            ) : sortDir === "desc" ? (
                              <Icon name="chevron-down" size={14} />
                            ) : (
                              <Icon name="chevrons-up-down" size={14} className="table__sort-icon--idle" />
                            )}
                          </span>
                        )}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody className="table__body">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  className="table__td table__td--empty"
                  colSpan={finalColumns.length}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={[
                    "table__row",
                    "table__row--body",
                    row.getIsSelected() && "table__row--selected",
                    onRowClick && "table__row--clickable",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="table__td">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {enablePagination && totalPages > 1 && (
        <div className="table-wrapper__pagination">
          <span className="table-wrapper__count">
            총 {table.getFilteredRowModel().rows.length}개 중{" "}
            {pagination.pageIndex * pagination.pageSize + 1}–
            {Math.min(
              (pagination.pageIndex + 1) * pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}
            개
          </span>
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onChange={(page) => table.setPageIndex(page - 1)}
          />
        </div>
      )}
    </div>
  );
}

export default Table;
