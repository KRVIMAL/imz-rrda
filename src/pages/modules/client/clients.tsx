import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiUsers } from 'react-icons/fi';
import ModuleHeader from '../../../components/ui/ModuleHeader';
import DataTable from '../../../components/ui/DataTable/DataTable';
import { Column, Row } from '../../../components/ui/DataTable/types';
import { clientServices } from './services/clients.services';

const Clients: React.FC = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  const columns: Column[] = [
    { field: 'clientName', headerName: 'Client/Transporter Name', width: 200, editable: true },
    { field: 'contactName', headerName: 'Contact Name', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    { field: 'contactNo', headerName: 'Contact No', width: 130, editable: true },
    { field: 'panNumber', headerName: 'PAN Number', width: 120, editable: true },
    { field: 'aadharNumber', headerName: 'Aadhar Number', width: 130, editable: true },
    { field: 'gstNumber', headerName: 'GST Number', width: 150, editable: true },
    { field: 'stateName', headerName: 'State', width: 120, editable: true },
    { field: 'cityName', headerName: 'City', width: 120, editable: true },
    { field: 'remark', headerName: 'Remark', width: 150, editable: true },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 100,
      renderCell: (params) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          params.value === 'active' ? 'bg-success-100 text-success-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {params.value === 'active' ? 'Active' : 'Inactive'}
        </span>
      )
    },
    { field: 'createdTime', headerName: 'Created', width: 120, type: 'date' },
    { field: 'updatedTime', headerName: 'Updated', width: 120, type: 'date' },
    { field: 'inactiveTime', headerName: 'Inactive Time', width: 120, type: 'date' }
  ];

  const breadcrumbs = [
    { label: 'Home', href: '/', icon: FiHome },
    { label: 'Clients', isActive: true, icon: FiUsers }
  ];

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    setLoading(true);
    try {
      const data = await clientServices.getAll();
      setClients(data);
    } catch (error) {
      console.error('Error loading clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = () => {
    navigate('/clients/add');
  };

  const handleSaveClient = async (id: string | number, updatedRow: Row, oldRow: Row, rows: Row[]) => {
    try {
      await clientServices.update(id, updatedRow);
      await loadClients();
    } catch (error) {
      console.error('Error updating client:', error);
      setClients(rows.map(r => r.id === id ? oldRow : r));
    }
  };

  const handleDeleteClient = async (id: string | number, deletedRow: Row, rows: Row[]) => {
    try {
      await clientServices.inactivate(id);
      await loadClients();
    } catch (error) {
      console.error('Error inactivating client:', error);
      setClients(rows);
    }
  };

  const createRowData = (rows: Row[]) => {
    const newId = Math.max(...rows.map(r => Number(r.id) || 0)) + 1;
    return {
      id: newId,
      clientName: '',
      contactName: '',
      email: '',
      contactNo: '',
      panNumber: '',
      aadharNumber: '',
      gstNumber: '',
      stateName: '',
      cityName: '',
      remark: '',
      status: 'inactive',
      createdTime: new Date().toISOString().split('T')[0],
      updatedTime: new Date().toISOString().split('T')[0],
      inactiveTime: ''
    };
  };

  return (
    <div className="min-h-screen bg-theme-secondary">
      <ModuleHeader
        title="Clients / Transporters / Contractors"
        breadcrumbs={breadcrumbs}
        showAddButton
        addButtonText="Add Client"
        onAddClick={handleAddClient}
      />
      
      <div className="p-6">
        <DataTable
          columns={columns}
          rows={clients}
          loading={loading}
          onSaveRow={handleSaveClient}
          onDeleteRow={handleDeleteClient}
          createRowData={createRowData}
          pageSize={10}
          pageSizeOptions={[5, 10, 25, 50]}
        />
      </div>
    </div>
  );
};

export default Clients;