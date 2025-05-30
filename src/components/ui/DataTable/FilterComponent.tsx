// src/components/ui/DataTable/FilterComponent.tsx
import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom"
import { FiPlus, FiX, FiFilter, FiTrash2 } from "react-icons/fi";
import Button from "../Button";
import Select from "../Select";
import CustomInput from "../CustomInput";
import { Column, FilterCondition } from "./types";

interface FilterComponentProps {
  columns: Column[];
  filters: FilterCondition[];
  onFiltersChange: (filters: FilterCondition[]) => void;
  isOpen: boolean;
  onClose: () => void;
  anchorRef?: React.RefObject<HTMLDivElement>;
}

const operatorOptions = [
  { value: "contains", label: "Contains" },
  { value: "notContains", label: "Does not contain" },
  { value: "equals", label: "Equals" },
  { value: "notEquals", label: "Does not equal" },
  { value: "startsWith", label: "Starts with" },
  { value: "endsWith", label: "Ends with" },
  { value: "greaterThan", label: "Greater than" },
  { value: "lessThan", label: "Less than" },
  { value: "greaterThanOrEqual", label: "Greater than or equal" },
  { value: "lessThanOrEqual", label: "Less than or equal" },
  { value: "isEmpty", label: "Is empty" },
  { value: "isNotEmpty", label: "Is not empty" },
];

const FilterComponent: React.FC<FilterComponentProps> = ({
  columns,
  filters,
  onFiltersChange,
  isOpen,
  onClose,
  anchorRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const columnOptions = columns
    .filter((col) => col.field !== "actions" && col.filterable !== false)
    .map((col) => ({ value: col.field, label: col.headerName }));

  // Calculate position based on anchor element
  useEffect(() => {
    if (isOpen && anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen, anchorRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const addFilter = () => {
    const newFilter: FilterCondition = {
      id: Date.now().toString(),
      column: columnOptions[0]?.value || "",
      operator: "contains",
      value: "",
    };
    onFiltersChange([...filters, newFilter]);
  };

  const updateFilter = (
    id: string,
    field: keyof FilterCondition,
    value: any
  ) => {
    onFiltersChange(
      filters.map((filter) =>
        filter.id === id ? { ...filter, [field]: value } : filter
      )
    );
  };

  const removeFilter = (id: string) => {
    onFiltersChange(filters.filter((filter) => filter.id !== id));
  };

  const resetAllFilters = () => {
    onFiltersChange([]);
  };

  if (!isOpen) return null;

  const filterPortal = (
    <div 
      ref={containerRef}
      className="fixed w-96 bg-theme-primary border border-border-light rounded-lg shadow-xl"
      style={{
        top: position.top,
        left: position.left,
        zIndex: 10000,
        maxHeight: '80vh',
        maxWidth: 'calc(100vw - 32px)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border-light">
        <div className="flex items-center space-x-2">
          <FiFilter className="w-5 h-5 text-primary-500" />
          <h3 className="text-heading-3 text-text-primary">Filters</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-theme-tertiary rounded transition-colors"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>

      {/* Filter List */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {filters.length === 0 ? (
          <div className="text-center py-8 text-text-muted">
            <FiFilter className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">No filters applied</p>
            <p className="text-xs mt-1">Click "Add Filter" to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filters.map((filter, index) => (
              <div key={filter.id} className="p-4 border border-border-light rounded-lg bg-theme-secondary">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-text-primary">
                    Filter {index + 1}
                  </span>
                  <button
                    onClick={() => removeFilter(filter.id)}
                    className="p-1 text-error-500 hover:bg-error-50 rounded transition-colors"
                    title="Remove filter"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">
                      Columns
                    </label>
                    <Select
                      options={columnOptions}
                      value={filter.column}
                      onChange={(value) => updateFilter(filter.id, 'column', value as string)}
                      size="sm"
                      searchable={false}
                      placeholder="Select column"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">
                      Operator
                    </label>
                    <Select
                      options={operatorOptions}
                      value={filter.operator}
                      onChange={(value) => updateFilter(filter.id, 'operator', value as any)}
                      size="sm"
                      searchable={false}
                      placeholder="Select operator"
                    />
                  </div>
                  
                  {!['isEmpty', 'isNotEmpty'].includes(filter.operator) && (
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1">
                        Value
                      </label>
                      <CustomInput
                        value={filter.value}
                        onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                        placeholder="Filter value"
                        size="sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-border-light bg-theme-secondary rounded-b-lg">
        <Button
          variant="primary"
          size="sm"
          onClick={addFilter}
          className="flex items-center space-x-2"
          disabled={columnOptions.length === 0}
        >
          <FiPlus className="w-4 h-4" />
          <span>ADD FILTER</span>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={resetAllFilters}
          disabled={filters.length === 0}
          className="flex items-center space-x-2"
        >
          <FiX className="w-4 h-4" />
          <span>REMOVE ALL</span>
        </Button>
      </div>
    </div>
  );

  // Render as portal to document body
  return ReactDOM.createPortal(filterPortal, document.body);
};

export default FilterComponent;
