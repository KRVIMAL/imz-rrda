// src/components/ui/DataTable/Pagination.tsx - Updated Pagination Component
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Button from "../Button";
import Select from "../Select";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  pageSizeOptions: number[];
  totalRows: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions,
  totalRows,
  onPageChange,
  onPageSizeChange,
}) => {
  const startRow = totalRows > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endRow = Math.min(currentPage * pageSize, totalRows);

  const pageSizeSelectOptions = pageSizeOptions.map((size) => ({
    value: size.toString(),
    label: size.toString(),
  }));

  const handlePageSizeChange = (value: string | string[] | null) => {
    if (value && typeof value === "string") {
      onPageSizeChange(Number(value));
    }
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(maxPagesToShow / 2);
      let start = currentPage - half;
      let end = currentPage + half;

      if (start < 1) {
        start = 1;
        end = maxPagesToShow;
      }

      if (end > totalPages) {
        end = totalPages;
        start = totalPages - maxPagesToShow + 1;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border-light bg-theme-primary relative">
      {/* Left side - Rows per page */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-text-secondary">Rows per page:</span>
        <div className="w-20 relative z-50">
          <Select
            options={pageSizeSelectOptions}
            value={pageSize.toString()}
            onChange={handlePageSizeChange}
            searchable={false}
            clearable={false}
            size="sm"
            className="relative z-50"
          />
        </div>
      </div>

      {/* Right side - Page info and navigation */}
      <div className="flex items-center space-x-4">
        {/* Row count info */}
        <span className="text-sm text-text-secondary">
          {totalRows > 0 ? `${startRow}-${endRow} of ${totalRows}` : "0 of 0"}
        </span>

        {/* Page navigation */}
        <div className="flex items-center space-x-1">
          {/* First page button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={currentPage <= 1}
            className="p-2"
            title="First page"
          >
            <span className="text-xs">««</span>
          </Button>

          {/* Previous page button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="p-2"
            title="Previous page"
          >
            <FiChevronLeft className="w-4 h-4" />
          </Button>

          {/* Page numbers */}
          {pageNumbers.map((pageNum) => (
            <Button
              key={pageNum}
              variant={pageNum === currentPage ? "primary" : "secondary"}
              size="sm"
              onClick={() => onPageChange(pageNum)}
              className="px-3 py-1 min-w-[32px]"
            >
              {pageNum}
            </Button>
          ))}

          {/* Next page button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="p-2"
            title="Next page"
          >
            <FiChevronRight className="w-4 h-4" />
          </Button>

          {/* Last page button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage >= totalPages}
            className="p-2"
            title="Last page"
          >
            <span className="text-xs">»»</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
