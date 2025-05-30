// src/components/ui/DataTable/types.ts - Updated types
export interface Column {
    field: string;
    headerName: string;
    width?: number;
    type?: 'string' | 'number' | 'boolean' | 'date' | 'actions';
    editable?: boolean;
    align?: 'left' | 'center' | 'right';
    headerAlign?: 'left' | 'center' | 'right';
    hide?: boolean;
    sortable?: boolean;
    filterable?: boolean;
    renderCell?: (params: CellParams) => React.ReactNode;
    renderEditCell?: (params: EditCellParams) => React.ReactNode;
  }
  
  export interface Row {
    id: string | number;
    [key: string]: any;
    isNew?: boolean;
  }
  
  export interface CellParams {
    id: string | number;
    field: string;
    value: any;
    row: Row;
  }
  
  export interface EditCellParams extends CellParams {
    onChange: (value: any) => void;
    onSave: () => void;
    onCancel: () => void;
  }
  
  export type RowMode = 'view' | 'edit';
  
  export interface RowModesModel {
    [id: string | number]: { mode: RowMode; fieldToFocus?: string };
  }
  
  export interface FilterCondition {
    id: string;
    column: string;
    operator: 'contains' | 'notContains' | 'equals' | 'notEquals' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'greaterThanOrEqual' | 'lessThanOrEqual' | 'isEmpty' | 'isNotEmpty';
    value: string;
  }
  
  export interface ColumnState {
    field: string;
    visible: boolean;
    pinned?: 'left' | 'right' | null;
    width?: number;
    sortDirection?: 'asc' | 'desc' | null;
  }
  
  export interface DataTableProps {
    columns: Column[];
    rows: Row[];
    loading?: boolean;
    onSaveRow?: (id: string | number, updatedRow: Row, oldRow: Row, rows: Row[]) => void;
    onDeleteRow?: (id: string | number, deletedRow: Row, rows: Row[]) => void;
    createRowData?: (rows: Row[]) => Partial<Row>;
    noActionColumn?: boolean;
    pageSize?: number;
    pageSizeOptions?: number[];
    checkboxSelection?: boolean;
    disableColumnMenu?: boolean;
    toolbar?: React.ComponentType<any>;
    className?: string;
    onColumnStateChange?: (columnStates: ColumnState[]) => void;
    initialColumnStates?: ColumnState[];
  }