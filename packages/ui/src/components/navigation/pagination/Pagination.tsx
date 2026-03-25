import React, { useMemo } from "react";
import Icon from "@ui/components/base/icon/Icon";
import "./Pagination.scss";

export interface PaginationProps {
  /**
   * 현재 페이지 (1-based, controlled)
   */
  page: number;
  /**
   * 전체 페이지 수
   */
  totalPages: number;
  /**
   * 페이지 변경 핸들러
   */
  onChange: (page: number) => void;
  /**
   * 현재 페이지 주변에 표시할 페이지 수
   * @default 2
   */
  siblingCount?: number;
  /**
   * 첫/끝 이동 버튼 표시 여부
   * @default true
   */
  showFirstLast?: boolean;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 인라인 스타일 (style prop 충돌 방지)
   */
  styleOverride?: React.CSSProperties;
}

const DOTS = "…";

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const usePagination = (page: number, totalPages: number, siblingCount: number) => {
  return useMemo(() => {
    // 총 페이지가 siblingCount * 2 + 5 이하면 전부 표시
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const leftRange = range(1, 3 + siblingCount * 2);
      return [...leftRange, DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightRange = range(totalPages - (3 + siblingCount * 2) + 1, totalPages);
      return [1, DOTS, ...rightRange];
    }

    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [1, DOTS, ...middleRange, DOTS, totalPages];
  }, [page, totalPages, siblingCount]);
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onChange,
  siblingCount = 2,
  showFirstLast = true,
  className = "",
  styleOverride,
}) => {
  const pageItems = usePagination(page, totalPages, siblingCount);

  const classNames = ["pagination", className].filter(Boolean).join(" ");

  const isFirst = page === 1;
  const isLast = page === totalPages;

  return (
    <nav
      className={classNames}
      style={styleOverride}
      aria-label="Pagination"
      role="navigation"
    >
      {/* « 처음 */}
      {showFirstLast && (
        <button
          className={["pagination__control", isFirst && "pagination__control--disabled"].filter(Boolean).join(" ")}
          onClick={() => !isFirst && onChange(1)}
          disabled={isFirst}
          aria-label="첫 페이지"
        >
          <Icon name="chevrons-left" size={16} />
        </button>
      )}

      {/* ‹ 이전 */}
      <button
        className={["pagination__control", isFirst && "pagination__control--disabled"].filter(Boolean).join(" ")}
        onClick={() => !isFirst && onChange(page - 1)}
        disabled={isFirst}
        aria-label="이전 페이지"
      >
        <Icon name="chevron-left" size={16} />
      </button>

      {/* 페이지 번호 */}
      {pageItems.map((item, idx) => {
        if (item === DOTS) {
          return (
            <span key={`dots-${idx}`} className="pagination__dots" aria-hidden="true">
              {DOTS}
            </span>
          );
        }

        const pageNum = item as number;
        const isSelected = pageNum === page;

        return (
          <button
            key={pageNum}
            className={["pagination__page", isSelected && "pagination__page--selected"].filter(Boolean).join(" ")}
            onClick={() => !isSelected && onChange(pageNum)}
            aria-current={isSelected ? "page" : undefined}
            aria-label={`${pageNum} 페이지`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* › 다음 */}
      <button
        className={["pagination__control", isLast && "pagination__control--disabled"].filter(Boolean).join(" ")}
        onClick={() => !isLast && onChange(page + 1)}
        disabled={isLast}
        aria-label="다음 페이지"
      >
        <Icon name="chevron-right" size={16} />
      </button>

      {/* » 마지막 */}
      {showFirstLast && (
        <button
          className={["pagination__control", isLast && "pagination__control--disabled"].filter(Boolean).join(" ")}
          onClick={() => !isLast && onChange(totalPages)}
          disabled={isLast}
          aria-label="마지막 페이지"
        >
          <Icon name="chevrons-right" size={16} />
        </button>
      )}
    </nav>
  );
};

export default Pagination;
