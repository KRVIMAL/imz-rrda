import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiHome, FiUsers, FiPlus } from 'react-icons/fi';
import ModuleHeader from '../../../../components/ui/ModuleHeader';
import CustomInput from '../../../../components/ui/CustomInput';
import Select from '../../../../components/ui/Select';
import Card from '../../../../components/ui/Card';
import { clientServices } from '../services/clients.services';

const AddClientForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
    status: 'active'
  });

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const breadcrumbs = [
    { label: 'Home', href: '/', icon: FiHome },
    { label: 'Clients', href: '/clients', icon: FiUsers },
    { label: isEdit ? 'Edit Client' : 'Add Client', isActive: true, icon: FiPlus }
  ];

  useEffect(() => {
    if (isEdit && id) {
      loadClient();
    }
  }, [isEdit, id]);

  const loadClient = async () => {
    setLoading(true);
    try {
      const client = await clientServices.getById(id!);
      if (client) {
        setFormData({
          clientName: client.clientName || '',
          contactName: client.contactName || '',
          email: client.email || '',
          contactNo: client.contactNo || '',
          panNumber: client.panNumber || '',
          aadharNumber: client.aadharNumber || '',
          gstNumber: client.gstNumber || '',
          stateName: client.stateName || '',
          cityName: client.cityName || '',
          remark: client.remark || '',
          status: client.status || 'active'
        });
      }
    } catch (error) {
      console.error('Error loading client:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSelectChange = (field: string) => (value: string | string[] | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value as string
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (isEdit) {
        await clientServices.update(id!, formData);
      } else {
        await clientServices.create(formData);
      }
      navigate('/clients');
    } catch (error) {
      console.error('Error saving client:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-secondary">
      <ModuleHeader
        title={isEdit ? 'Edit Client' : 'Add Client'}
        breadcrumbs={breadcrumbs}
        showCancelButton
        showSaveButton
        onSaveClick={handleSave}
      />
      
      <div className="p-6">
        <Card>
          <Card.Body className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomInput
                label="Client/Transporter/Contractor Name"
                value={formData.clientName}
                onChange={handleInputChange('clientName')}
                required
                placeholder="Enter company name"
              />
              
              <CustomInput
                label="Contact Name"
                value={formData.contactName}
                onChange={handleInputChange('contactName')}
                required
                placeholder="Enter contact person name"
              />
              
              <CustomInput
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
                placeholder="Enter email address"
              />
              
              <CustomInput
                label="Contact Number"
                type="tel"
                value={formData.contactNo}
                onChange={handleInputChange('contactNo')}
                required
                placeholder="Enter contact number"
              />
              
              <CustomInput
                label="PAN Number"
                value={formData.panNumber}
                onChange={handleInputChange('panNumber')}
                placeholder="Enter PAN number"
                validation={{
                  pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
                }}
              />
              
              <CustomInput
                label="Aadhar Number"
                value={formData.aadharNumber}
                onChange={handleInputChange('aadharNumber')}
                placeholder="Enter Aadhar number"
                validation={{
                  pattern: /^\d{4}-\d{4}-\d{4}$/
                }}
              />
              
              <CustomInput
                label="GST Number"
                value={formData.gstNumber}
                onChange={handleInputChange('gstNumber')}
                placeholder="Enter GST number"
              />
              
              <CustomInput
                label="State Name"
                value={formData.stateName}
                onChange={handleInputChange('stateName')}
                required
                placeholder="Enter state name"
              />
              
              <CustomInput
                label="City Name"
                value={formData.cityName}
                onChange={handleInputChange('cityName')}
                required
                placeholder="Enter city name"
              />
              
              <Select
                label="Status"
                options={statusOptions}
                value={formData.status}
                onChange={handleSelectChange('status')}
                required
              />
              
              <div className="md:col-span-2">
                <CustomInput
                  label="Remark"
                  value={formData.remark}
                  onChange={handleInputChange('remark')}
                  placeholder="Enter any remarks"
                />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AddClientForm;