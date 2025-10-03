import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../pagination";
import type { Pagination as PaginationType } from "@/types";

interface Props {
  setPage: (page: number) => void;
  pagination: PaginationType;
}

export const PaginationController: React.FC<Props> = ({
  setPage,
  pagination,
}) => {
  const generatePageNumbers = () => {
    if (!pagination) return [];

    const { page, total_pages } = pagination;
    const pages = [];

    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(total_pages, page + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <>
      {pagination && pagination.total_pages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage(pagination.page - 1)}
                className={
                  pagination.page === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {generatePageNumbers().map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  onClick={() => setPage(pageNumber)}
                  isActive={pageNumber === pagination.page}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}

            {pagination.total_pages > 5 &&
              pagination.page < pagination.total_pages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage(pagination.page + 1)}
                className={
                  pagination.page === pagination.total_pages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};
