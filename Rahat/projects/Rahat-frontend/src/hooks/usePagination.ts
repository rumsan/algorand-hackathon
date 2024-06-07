import { useMemo } from 'react';

export const DOTS = '...';

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({ totalCount, pageSize, siblingCount = 1, currentPage }) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    if (totalPageCount <= 1) {
      return [];
    }

    const totalPageNumbers = siblingCount * 2 + 3;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    let startPage = leftSiblingIndex;
    let endPage = rightSiblingIndex;

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    if (shouldShowLeftDots && !shouldShowRightDots) {
      startPage = totalPageCount - (siblingCount * 2 + 1);
    } else if (!shouldShowLeftDots && shouldShowRightDots) {
      endPage = siblingCount * 2 + 2;
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      if (currentPage - siblingCount > 2) {
        startPage = currentPage - siblingCount;
      } else {
        startPage = 2;
      }

      if (currentPage + siblingCount < totalPageCount - 1) {
        endPage = currentPage + siblingCount;
      } else {
        endPage = totalPageCount - 1;
      }
    }

    const pages = range(startPage, endPage);

    if (shouldShowLeftDots && shouldShowRightDots) {
      pages.unshift(DOTS);
      pages.push(DOTS);
    } else if (shouldShowLeftDots) {
      pages.unshift(DOTS);
    } else if (shouldShowRightDots) {
      pages.push(DOTS);
    }

    return pages;
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
