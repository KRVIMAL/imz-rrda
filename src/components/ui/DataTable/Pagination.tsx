 // src/components/ui/DataTable/Pagination.tsx
  import React from 'react';
  import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
  import Button from '../Button';
  import Select from '../Select';
  
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
    onPageSizeChange
  }) => {
    const startRow = (currentPage - 1) * pageSize + 1;
    const endRow = Math.min(currentPage * pageSize, totalRows);
  
    const pageSizeSelectOptions = pageSizeOptions.map(size => ({
      value: size.toString(),
      label: size.toString()
    }));
  
    return (
      <div className="flex items-center justify-between px-4 py-3 border-t border-border-light bg-theme-primary">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-text-secondary">
            Rows per page:
          </span>
          <Select
            options={pageSizeSelectOptions}
            value={pageSize.toString()}
            onChange={(value) => onPageSizeChange(Number(value))}
            searchable={false}
            clearable={false}
            className="w-20"
          />
        </div>
  
        <div className="flex items-center space-x-4">
          <span className="text-sm text-text-secondary">
            {startRow}-{endRow} of {totalRows}
          </span>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="p-2"
            >
              <FiChevronLeft className="w-4 h-4" />
            </Button>
            
            <span className="px-3 py-1 text-sm text-text-primary">
              {currentPage} of {totalPages}
            </span>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="p-2"
            >
              <FiChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Pagination;