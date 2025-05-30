// src/components/ui/DataTable/DataTable.tsx - Complete updated component
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Column, Row, RowModesModel, DataTableProps, FilterCondition, ColumnState } from './types';
import TableToolbar from './TableToolbar';
import TableCell from './TableCell';
import EditableCell from './EditableCell';
import ActionButtons from './ActionButtons';
import Pagination from './Pagination';
import ColumnHeaderMenu from './ColumnHeaderMenu';
import { FiFilter, FiArrowUp } from 'react-icons/fi';
import Button from '../Button';

const DataTable: React.FC<DataTableProps> = ({
  columns: initialColumns,
  rows: externalRows,
  loading = false,
  onSaveRow,
  onDeleteRow,
  createRowData,
  noActionColumn = false,
  pageSize: initialPageSize = 25,
  pageSizeOptions = [5, 10, 25, 50, 100],
  checkboxSelection = false,
  disableColumnMenu = false,
  toolbar: CustomToolbar,
  className = ''
}) => {
  const [internalRows, setInternalRows] = useState<Row[]>(externalRows);
  const [rowModesModel, setRowModesModel] = useState<any>({});
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [filters, setFilters] = useState<FilterCondition[]>([]);
  const [showFilterComponent, setShowFilterComponent] = useState(false);

  // Column states for pinning, visibility, etc.
  const [columnStates, setColumnStates] = useState<ColumnState[]>(() =>
    initialColumns.map(col => ({
      field: col.field,
      visible: !col.hide,
      pinned: null,
      sortDirection: null
    }))
  );

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState<{ [key: string]: boolean }>(() => {
    const visibility: { [key: string]: boolean } = {};
    initialColumns.forEach(col => {
      visibility[col.field] = !col.hide;
    });
    return visibility;
  });

  // Add actions column if needed
  const columns = useMemo(() => {
    if (noActionColumn) return initialColumns;
    
    const actionsColumn: Column = {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      type: 'actions',
      align: 'center',
      editable: false,
      sortable: false,
      filterable: false
    };
    
    return [...initialColumns, actionsColumn];
  }, [initialColumns, noActionColumn]);

  // Update internal rows when external rows change
  useEffect(() => {
    setInternalRows(externalRows);
  }, [externalRows]);

  // Apply filters to data
  const applyFilters = (data: Row[], filterConditions: FilterCondition[]) => {
    return data.filter(row => {
      return filterConditions.every(filter => {
        const cellValue = String(row[filter.column] || '').toLowerCase();
        const filterValue = filter.value.toLowerCase();

        switch (filter.operator) {
          case 'contains':
            return cellValue.includes(filterValue);
          case 'notContains':
            return !cellValue.includes(filterValue);
          case 'equals':
            return cellValue === filterValue;
          case 'notEquals':
            return cellValue !== filterValue;
          case 'startsWith':
            return cellValue.startsWith(filterValue);
          case 'endsWith':
            return cellValue.endsWith(filterValue);
          case 'greaterThan':
            return parseFloat(cellValue) > parseFloat(filterValue);
          case 'lessThan':
            return parseFloat(cellValue) < parseFloat(filterValue);
          case 'greaterThanOrEqual':
            return parseFloat(cellValue) >= parseFloat(filterValue);
          case 'lessThanOrEqual':
            return parseFloat(cellValue) <= parseFloat(filterValue);
          case 'isEmpty':
            return !cellValue || cellValue.trim() === '';
          case 'isNotEmpty':
            return cellValue && cellValue.trim() !== '';
          default:
            return true;
        }
      });
    });
  };

  // Filter and sort data
  const processedRows = useMemo(() => {
    let filtered = internalRows;

    // Apply search filter
    if (searchValue) {
      filtered = filtered.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }

    // Apply advanced filters
    if (filters.length > 0) {
      filtered = applyFilters(filtered, filters);
    }

    // Apply sorting
    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        
        if (aVal === bVal) return 0;
        
        const comparison = aVal < bVal ? -1 : 1;
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [internalRows, searchValue, sortField, sortDirection, filters]);

  // Pagination
  const totalPages = Math.ceil(processedRows.length / pageSize);
  const paginatedRows = processedRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Handle row editing
  const handleEditClick = (id: string | number) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: 'edit' }
    });
  };

  const handleSaveClick = (id: string | number) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: 'view' }
    });
  };

  const handleCancelClick = (id: string | number) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: 'view' }
    });
    
    const editedRow = internalRows.find(row => row.id === id);
    if (editedRow?.isNew) {
      setInternalRows(internalRows.filter(row => row.id !== id));
    }
  };

  const handleDeleteClick = (id: string | number) => {
    const rowToDelete = internalRows.find(row => row.id === id);
    if (rowToDelete) {
      setInternalRows(internalRows.filter(row => row.id !== id));
      onDeleteRow?.(id, rowToDelete, internalRows);
    }
  };

  const handleCellValueChange = (id: string | number, field: string, value: any) => {
    setInternalRows(rows =>
      rows.map(row => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const processRowUpdate = (id: string | number) => {
    const updatedRow = internalRows.find(row => row.id === id);
    if (updatedRow) {
      const oldRow = externalRows.find(row => row.id === id);
      const finalRow = { ...updatedRow, isNew: false };
      
      setInternalRows(rows =>
        rows.map(row => (row.id === id ? finalRow : row))
      );
      
      onSaveRow?.(id, finalRow, oldRow || updatedRow, internalRows);
    }
  };

  const handleColumnVisibilityChange = (field: string, visible: boolean) => {
    setVisibleColumns(prev => ({ ...prev, [field]: visible }));
  };

  const handleSort = (field: string, direction?: 'asc' | 'desc' | null) => {
    if (direction !== undefined) {
      if (direction === null) {
        setSortField('');
        setSortDirection('asc');
      } else {
        setSortField(field);
        setSortDirection(direction);
      }
    } else {
      // Toggle sort
      if (sortField === field) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortField(field);
        setSortDirection('asc');
      }
    }

    // Update column state
    setColumnStates(prev =>
      prev.map(cs => 
        cs.field === field 
          ? { ...cs, sortDirection: direction || (sortField === field && sortDirection === 'asc' ? 'desc' : 'asc') }
          : { ...cs, sortDirection: null }
      )
    );
  };

  const handlePin = (field: string, position: 'left' | 'right' | null) => {
    setColumnStates(prev =>
      prev.map(cs => cs.field === field ? { ...cs, pinned: position } : cs)
    );
  };

  const handleHideColumn = (field: string) => {
    setVisibleColumns(prev => ({ ...prev, [field]: false }));
  };

  const handleOpenColumnFilter = (field: string) => {
    setShowFilterComponent(true);
    // Add a filter for this specific column if none exists
    if (!filters.some(f => f.column === field)) {
      const newFilter: FilterCondition = {
        id: Date.now().toString(),
        column: field,
        operator: 'contains',
        value: ''
      };
      setFilters(prev => [...prev, newFilter]);
    }
  };

  // Get ordered columns (pinned left, normal, pinned right)
  const orderedColumns = useMemo(() => {
    const pinnedLeft = columns.filter(col => {
      const state = columnStates.find(cs => cs.field === col.field);
      return state?.pinned === 'left';
    });
    
    const normal = columns.filter(col => {
      const state = columnStates.find(cs => cs.field === col.field);
      return !state?.pinned;
    });
    
    const pinnedRight = columns.filter(col => {
      const state = columnStates.find(cs => cs.field === col.field);
      return state?.pinned === 'right';
    });
    
    return [...pinnedLeft, ...normal, ...pinnedRight];
  }, [columns, columnStates]);

  const ToolbarComponent = CustomToolbar || TableToolbar;

  // Check if all columns are hidden
  const allColumnsHidden = Object.values(visibleColumns).every(visible => !visible);

  return (
    <div className={`bg-theme-primary border border-border-light rounded-lg overflow-hidden ${className}`}>
      {/* Toolbar */}
      <ToolbarComponent
        columns={columns}
        rows={internalRows}
        setRows={setInternalRows}
        setRowModesModel={setRowModesModel}
        createRowData={createRowData}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        visibleColumns={visibleColumns}
        onColumnVisibilityChange={handleColumnVisibilityChange}
        showAddButton={!noActionColumn}
        filters={filters}
        onFiltersChange={setFilters}
        showColumnMenu={showColumnMenu}
        setShowColumnMenu={setShowColumnMenu}
        showFilterComponent={showFilterComponent}
        setShowFilterComponent={setShowFilterComponent}
      />

      {/* Table */}
      <div className="overflow-x-auto overflow-y-visible">
      {allColumnsHidden ? (
          <div className="px-4 py-16 text-center">
            <div className="space-y-4">
              <p className="text-heading-2 text-text-muted">No columns</p>
              <Button
                variant="primary"
                onClick={() => setShowColumnMenu(true)}
                className="text-primary-500 hover:text-primary-600"
              >
                MANAGE COLUMNS
              </Button>
            </div>
          </div>
        ) : (
          <table className="w-full">
            {/* Header */}
            <thead className="bg-theme-secondary border-b border-border-light">
              <tr>
                {orderedColumns
                  .filter(col => visibleColumns[col.field])
                  .map(column => {
                    const headerAlign = column.headerAlign || column.align || 'left';
                    const alignClasses = {
                      left: 'text-left',
                      center: 'text-center',
                      right: 'text-right'
                    };
                    
                    const columnState = columnStates.find(cs => cs.field === column.field) || {
                      field: column.field,
                      visible: true,
                      pinned: null,
                      sortDirection: null
                    };

                    const hasFilter = filters.some(f => f.column === column.field);

                    return (
                      <th
                        key={column.field}
                        className={`px-4 py-3 font-semibold text-text-primary ${alignClasses[headerAlign]} group relative hover:bg-theme-tertiary transition-colors ${
                          columnState.pinned ? 'sticky bg-theme-secondary' : ''
                        } ${
                          columnState.pinned === 'left' ? 'left-0 z-10' : ''
                        } ${
                          columnState.pinned === 'right' ? 'right-0 z-10' : ''
                        }`}
                        style={{ width: column.width }}
                      >
                        <div className="flex items-center justify-between">
                          <div 
                            className="flex items-center space-x-1 cursor-pointer"
                            onClick={() => column.sortable !== false && handleSort(column.field)}
                          >
                            <span>{column.headerName}</span>
                            {sortField === column.field && (
                              <span className="text-xs">
                                {sortDirection === 'asc' ? '↑' : '↓'}
                              </span>
                            )}
                            {hasFilter && (
                              <FiFilter className="w-3 h-3 text-primary-500" />
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* Sort Arrow - visible on hover */}
                            {column.sortable !== false && (
                              <button
                                onClick={() => handleSort(column.field)}
                                className="p-1 rounded hover:bg-theme-accent"
                              >
                                <FiArrowUp className={`w-4 h-4 ${
                                  sortField === column.field && sortDirection === 'asc' 
                                    ? 'text-primary-500' 
                                    : 'text-text-muted'
                                }`} />
                              </button>
                            )}
                            
                            {/* Three dots menu */}
                            <ColumnHeaderMenu
                              column={column}
                              columnState={columnState}
                              onSort={handleSort}
                              onPin={handlePin}
                              onHide={handleHideColumn}
                              onOpenColumnManager={() => setShowColumnMenu(true)}
                              onOpenFilter={handleOpenColumnFilter}
                              hasFilter={hasFilter}
                            />
                          </div>
                        </div>
                      </th>
                    );
                  })}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={orderedColumns.filter(col => visibleColumns[col.field]).length} className="px-4 py-8 text-center text-text-muted">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500"></div>
                      <span>Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedRows.length === 0 ? (
                <tr>
                  <td colSpan={orderedColumns.filter(col => visibleColumns[col.field]).length} className="px-4 py-8 text-center text-text-muted">
                    No data available
                  </td>
                </tr>
              ) : (
                paginatedRows.map((row, rowIndex) => {
                  const isEditing = rowModesModel[row.id]?.mode === 'edit';
                  
                  return (
                    <tr
                      key={row.id}
                      className={`border-b border-border-light hover:bg-theme-tertiary transition-colors ${
                        rowIndex % 2 === 0 ? 'bg-theme-primary' : 'bg-theme-secondary'
                      }`}
                    >
                      {orderedColumns
                        .filter(col => visibleColumns[col.field])
                        .map(column => {
                          const cellParams = {
                            id: row.id,
                            field: column.field,
                            value: row[column.field],
                            row
                          };

                          const columnState = columnStates.find(cs => cs.field === column.field);

                          if (column.field === 'actions') {
                            return (
                              <td key={column.field} className={`${
                                columnState?.pinned ? 'sticky bg-inherit' : ''
                              } ${
                                columnState?.pinned === 'left' ? 'left-0 z-10' : ''
                              } ${
                                columnState?.pinned === 'right' ? 'right-0 z-10' : ''
                              }`}>
                                <ActionButtons
                                  isEditing={isEditing}
                                  onEdit={() => handleEditClick(row.id)}
                                  onSave={() => {
                                    processRowUpdate(row.id);
                                    handleSaveClick(row.id);
                                  }}
                                  onCancel={() => handleCancelClick(row.id)}
                                  onDelete={() => handleDeleteClick(row.id)}
                                />
                              </td>
                            );
                          }

                          return (
                            <td key={column.field} className={`${
                              columnState?.pinned ? 'sticky bg-inherit' : ''
                            } ${
                              columnState?.pinned === 'left' ? 'left-0 z-10' : ''
                            } ${
                              columnState?.pinned === 'right' ? 'right-0 z-10' : ''
                            }`}>
                              {isEditing && column.editable ? (
                                <EditableCell
                                  {...cellParams}
                                  onChange={(value) => handleCellValueChange(row.id, column.field, value)}
                                  onSave={() => {
                                    processRowUpdate(row.id);
                                    handleSaveClick(row.id);
                                  }}
                                  onCancel={() => handleCancelClick(row.id)}
                                />
                              ) : (
                                <TableCell
                                  params={cellParams}
                                  column={column}
                                  isEditing={isEditing}
                                  onStartEdit={() => column.editable && handleEditClick(row.id)}
                                />
                              )}
                            </td>
                          );
                        })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!allColumnsHidden && processedRows.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          totalRows={processedRows.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      )}
    </div>
  );
};

export default DataTable;

