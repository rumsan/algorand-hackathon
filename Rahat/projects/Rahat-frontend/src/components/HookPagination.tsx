import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePagination, DOTS } from '../hooks/usePagination';

export default function Hookpagination({ total, limit, currentPage, setCurrentPage, setLimit }) {
  const totalNumberOfPages = Math.ceil(total / limit);

  const paginationRange = usePagination({
    currentPage,
    totalCount: total,
    siblingCount: 1,
    pageSize: limit,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <div className="flex justify-center my-4">
      <div className="flex items-center space-x-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                disabled={currentPage === 1}
                onClick={() => {
                  if (currentPage > 1) {
                    console.log(`Previous Page: ${currentPage - 1}`);
                    setCurrentPage(currentPage - 1);
                  }
                }}
              />
            </PaginationItem>
            {paginationRange.map((number, index) => {
              if (number === DOTS) {
                return (
                  <PaginationItem key={`dots-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return (
                <PaginationItem key={number}>
                  <PaginationLink
                    href="#"
                    onClick={() => {
                      console.log(`Set Page: ${number}`);
                      setCurrentPage(number);
                    }}
                    active={currentPage === number}
                  >
                    {number}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext
                href="#"
                disabled={currentPage === totalNumberOfPages}
                onClick={() => {
                  if (currentPage < totalNumberOfPages) {
                    console.log(`Next Page: ${currentPage + 1}`);
                    setCurrentPage(currentPage + 1);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <select
          value={limit}
          className="form-select cursor-pointer transition-all duration-6900 ease-in-out px-2 py-1 rounded-lg"
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={6}>6</option>
          <option value={12}>12</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
}
