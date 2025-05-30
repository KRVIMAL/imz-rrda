// src/pages/modules/clients/ClientList.tsx - Client list (similar structure)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiUsers } from 'react-icons/fi';
import ModuleHeader from '../../../components/ui/ModuleHeader';
import DataTable from '../../../components/ui/DataTable/DataTable';
import { Column, Row } from '../../../components/ui/DataTable/types';

const ClientList: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  
  const mockClients: Row[] = [
    {
      id: 1,
      clientCode: 'CLI001',
      companyName: 'Tech Solutions Inc',
      contactPerson: 'John Smith',
      email: 'john@techsolutions.com',
      phone: '+1234567890',
      status: 'Active',
      location: 'New York'
    }
  ];

  const columns: Column[] = [
    { field: 'clientCode', headerName: 'Client Code', width: 120 },
    { field: 'companyName', headerName: 'Company Name', width: 200, editable: true },
    { field: 'contactPerson', headerName: 'Contact Person', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    { field: 'phone', headerName: 'Phone', width: 150, editable: true },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 100,
      renderCell: (params) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          params.value === 'Active' ? 'bg-success-100 text-success-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {params.value}
        </span>
      )
    }
  ];

  const breadcrumbs = [
    { label: 'Home', href: '/', icon: FiHome },
    { label: 'Clients', isActive: true, icon: FiUsers }
  ];

  return (
    <div className="min-h-screen bg-theme-secondary">
      <ModuleHeader
        title="Clients"
        breadcrumbs={breadcrumbs}
        showAddButton
        addButtonText="Add Client"
        onAddClick={() => navigate('/clients/add')}
        showSearch
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search clients..."
      />
      
      <div className="p-6">
        <DataTable
          columns={columns}
          rows={mockClients}
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ClientList;