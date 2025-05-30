// src/pages/modules/devices/DeviceForm.tsx - Device add/edit form
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiHome, FiHardDrive, FiUser } from 'react-icons/fi';
import ModuleHeader from '../../../components/ui/ModuleHeader';
import CustomInput from '../../../components/ui/CustomInput';
import Select from '../../../components/ui/Select';
import Card from '../../../components/ui/Card';

const DeviceForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    deviceCode: '',
    deviceName: '',
    deviceType: '',
    status: 'Inactive',
    location: '',
    description: '',
    serialNumber: '',
    manufacturer: '',
    model: '',
    firmwareVersion: '',
    installationDate: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: ''
  });

  const deviceTypeOptions = [
    { value: 'GPS', label: 'GPS Tracker' },
    { value: 'Sensor', label: 'Sensor' },
    { value: 'Camera', label: 'Camera' },
    { value: 'Controller', label: 'Controller' }
  ];

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Maintenance', label: 'Maintenance' }
  ];

  const breadcrumbs = [
    { label: 'Home', href: '/', icon: FiHome },
    { label: 'Devices', href: '/devices', icon: FiHardDrive },
    { label: isEdit ? 'Edit Device' : 'Add Device', isActive: true, icon: FiUser }
  ];

  const tabs = [
    { key: 'personal', label: 'Device Info', isActive: activeTab === 'personal' },
    { key: 'contact', label: 'Contact', isActive: activeTab === 'contact' }
  ];

  useEffect(() => {
    if (isEdit) {
      // Load device data for editing
      setFormData({
        deviceCode: 'DEV001',
        deviceName: 'GPS Tracker Alpha',
        deviceType: 'GPS',
        status: 'Active',
        location: 'New York',
        description: 'Primary GPS tracking device',
        serialNumber: 'SN123456789',
        manufacturer: 'TechCorp',
        model: 'TC-GPS-001',
        firmwareVersion: '2.1.4',
        installationDate: '2024-01-01',
        contactPerson: 'John Doe',
        contactEmail: 'john.doe@example.com',
        contactPhone: '+1234567890'
      });
    }
  }, [isEdit]);

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

  const handleSave = () => {
    console.log('Saving device:', formData);
    // Handle save logic
    navigate('/devices');
  };

  const handleNext = () => {
    if (activeTab === 'personal') {
      setActiveTab('contact');
    } else {
      handleSave();
    }
  };

  const renderPersonalTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CustomInput
        label="Device Code"
        value={formData.deviceCode}
        onChange={handleInputChange('deviceCode')}
        required
        disabled={isEdit}
      />
      
      <CustomInput
        label="Device Name"
        value={formData.deviceName}
        onChange={handleInputChange('deviceName')}
        required
      />
      
      <Select
        label="Device Type"
        options={deviceTypeOptions}
        value={formData.deviceType}
        onChange={handleSelectChange('deviceType')}
        required
      />
      
      <Select
        label="Status"
        options={statusOptions}
        value={formData.status}
        onChange={handleSelectChange('status')}
        required
      />
      
      <CustomInput
        label="Location"
        value={formData.location}
        onChange={handleInputChange('location')}
      />
      
      <CustomInput
        label="Serial Number"
        value={formData.serialNumber}
        onChange={handleInputChange('serialNumber')}
      />
      
      <CustomInput
        label="Manufacturer"
        value={formData.manufacturer}
        onChange={handleInputChange('manufacturer')}
      />
      
      <CustomInput
        label="Model"
        value={formData.model}
        onChange={handleInputChange('model')}
      />
      
      <CustomInput
        label="Firmware Version"
        value={formData.firmwareVersion}
        onChange={handleInputChange('firmwareVersion')}
      />
      
      <CustomInput
        label="Installation Date"
        type="date"
        value={formData.installationDate}
        onChange={handleInputChange('installationDate')}
      />
      
      <div className="md:col-span-2">
        <CustomInput
          label="Description"
          value={formData.description}
          onChange={handleInputChange('description')}
          helperText="Provide a brief description of the device"
        />
      </div>
    </div>
  );

  const renderContactTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CustomInput
        label="Contact Person"
        value={formData.contactPerson}
        onChange={handleInputChange('contactPerson')}
      />
      
      <CustomInput
        label="Contact Email"
        type="email"
        value={formData.contactEmail}
        onChange={handleInputChange('contactEmail')}
      />
      
      <CustomInput
        label="Contact Phone"
        type="tel"
        value={formData.contactPhone}
        onChange={handleInputChange('contactPhone')}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-theme-secondary">
      <ModuleHeader
        title={isEdit ? 'Edit Device' : 'Device Details'}
        breadcrumbs={breadcrumbs}
        showCancelButton
        showNextButton
        nextText={activeTab === 'contact' ? 'Save' : 'Next'}
        onNextClick={handleNext}
        tabs={tabs}
        onTabChange={setActiveTab}
      />
      
      <div className="p-6">
        <Card>
          <Card.Body className="p-6">
            {activeTab === 'personal' ? renderPersonalTab() : renderContactTab()}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default DeviceForm;