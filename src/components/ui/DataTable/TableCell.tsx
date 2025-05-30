 // src/components/ui/DataTable/TableCell.tsx
 import React from 'react';
 import { CellParams, Column } from './types';
 
 interface TableCellProps {
   params: CellParams;
   column: Column;
   isEditing: boolean;
   onStartEdit?: () => void;
 }
 
 const TableCell: React.FC<TableCellProps> = ({
   params,
   column,
   isEditing,
   onStartEdit
 }) => {
   const { value } = params;
   const align = column.align || 'left';
 
   const alignClasses = {
     left: 'text-left',
     center: 'text-center',
     right: 'text-right'
   };
 
   const formatValue = (val: any, type: string) => {
     if (val == null) return '';
     
     switch (type) {
       case 'number':
         return typeof val === 'number' ? val.toLocaleString() : val;
       case 'boolean':
         return val ? 'Yes' : 'No';
       case 'date':
         return val instanceof Date ? val.toLocaleDateString() : val;
       default:
         return String(val);
     }
   };
 
   if (column.renderCell) {
     return <>{column.renderCell(params)}</>;
   }
 
   return (
     <div
       className={`px-4 py-3 ${alignClasses[align]} ${
         column.editable && !isEditing ? 'cursor-pointer hover:bg-theme-tertiary' : ''
       }`}
       onClick={column.editable && !isEditing ? onStartEdit : undefined}
     >
       {formatValue(value, column.type || 'string')}
     </div>
   );
 };
 
 export default TableCell;