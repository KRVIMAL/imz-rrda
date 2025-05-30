import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiHardDrive } from "react-icons/fi";
import ModuleHeader from "../../../components/ui/ModuleHeader";
import DataTable from "../../../components/ui/DataTable/DataTable";
import { Column, Row } from "../../../components/ui/DataTable/types";

const DeviceList: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [devices, setDevices] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock device data
  const mockDevices: Row[] = [
    {
      id: 1,
      deviceCode: "DEV001",
      deviceName: "GPS Tracker Alpha",
      deviceType: "GPS",
      status: "Active",
      location: "New York",
      lastSeen: "2024-01-15",
      batteryLevel: 85,
    },
    {
      id: 2,
      deviceCode: "DEV002",
      deviceName: "Temperature Sensor Beta",
      deviceType: "Sensor",
      status: "Inactive",
      location: "California",
      lastSeen: "2024-01-10",
      batteryLevel: 42,
    },
    {
      id: 3,
      deviceCode: "DEV003",
      deviceName: "Camera Module Gamma",
      deviceType: "Camera",
      status: "Active",
      location: "Texas",
      lastSeen: "2024-01-16",
      batteryLevel: 91,
    },
    {
      id: 4,
      deviceCode: "DEV001",
      deviceName: "GPS Tracker Alpha",
      deviceType: "GPS",
      status: "Active",
      location: "New York",
      lastSeen: "2024-01-15",
      batteryLevel: 85,
    },
    {
      id: 5,
      deviceCode: "DEV002",
      deviceName: "Temperature Sensor Beta",
      deviceType: "Sensor",
      status: "Inactive",
      location: "California",
      lastSeen: "2024-01-10",
      batteryLevel: 42,
    },
    {
      id: 6,
      deviceCode: "DEV003",
      deviceName: "Camera Module Gamma",
      deviceType: "Camera",
      status: "Active",
      location: "Texas",
      lastSeen: "2024-01-16",
      batteryLevel: 91,
    },
    {
      id: 7,
      deviceCode: "DEV001",
      deviceName: "GPS Tracker Alpha",
      deviceType: "GPS",
      status: "Active",
      location: "New York",
      lastSeen: "2024-01-15",
      batteryLevel: 85,
    },
    {
      id: 8,
      deviceCode: "DEV002",
      deviceName: "Temperature Sensor Beta",
      deviceType: "Sensor",
      status: "Inactive",
      location: "California",
      lastSeen: "2024-01-10",
      batteryLevel: 42,
    },
    {
      id: 9,
      deviceCode: "DEV003",
      deviceName: "Camera Module Gamma",
      deviceType: "Camera",
      status: "Active",
      location: "Texas",
      lastSeen: "2024-01-16",
      batteryLevel: 91,
    },
    {
      id: 10,
      deviceCode: "DEV001",
      deviceName: "GPS Tracker Alpha",
      deviceType: "GPS",
      status: "Active",
      location: "New York",
      lastSeen: "2024-01-15",
      batteryLevel: 85,
    },
    {
      id: 11,
      deviceCode: "DEV002",
      deviceName: "Temperature Sensor Beta",
      deviceType: "Sensor",
      status: "Inactive",
      location: "California",
      lastSeen: "2024-01-10",
      batteryLevel: 42,
    },
    {
      id: 12,
      deviceCode: "DEV003",
      deviceName: "Camera Module Gamma",
      deviceType: "Camera",
      status: "Active",
      location: "Texas",
      lastSeen: "2024-01-16",
      batteryLevel: 91,
    },
  ];

  const columns: Column[] = [
    {
      field: "deviceCode",
      headerName: "Device Code",
      width: 120,
      editable: false,
    },
    {
      field: "deviceName",
      headerName: "Device Name",
      width: 200,
      editable: true,
    },
    {
      field: "deviceType",
      headerName: "Type",
      width: 120,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      editable: true,
      renderCell: (params) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            params.value === "Active"
              ? "bg-success-100 text-success-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
      editable: true,
    },
    {
      field: "lastSeen",
      headerName: "Last Seen",
      width: 120,
      type: "date",
      editable: false,
    },
    {
      field: "batteryLevel",
      headerName: "Battery %",
      width: 100,
      type: "number",
      editable: false,
      renderCell: (params) => (
        <div className="flex items-center space-x-2">
          <div className="w-12 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                params.value > 60
                  ? "bg-success-500"
                  : params.value > 30
                  ? "bg-warning-500"
                  : "bg-error-500"
              }`}
              style={{ width: `${params.value}%` }}
            ></div>
          </div>
          <span className="text-xs">{params.value}%</span>
        </div>
      ),
    },
  ];

  const breadcrumbs = [
    { label: "Home", href: "/", icon: FiHome },
    { label: "Devices", isActive: true, icon: FiHardDrive },
  ];

  const tabs = [
    {
      key: "all",
      label: "All",
      count: mockDevices.length,
      isActive: activeTab === "all",
    },
    {
      key: "active",
      label: "Active",
      count: mockDevices.filter((d) => d.status === "Active").length,
      isActive: activeTab === "active",
    },
    {
      key: "inactive",
      label: "Inactive",
      count: mockDevices.filter((d) => d.status === "Inactive").length,
      isActive: activeTab === "inactive",
    },
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setDevices(mockDevices);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddDevice = () => {
    navigate("/device/add");
  };

  const handleSaveDevice = (
    id: string | number,
    updatedRow: Row,
    oldRow: Row,
    rows: Row[]
  ) => {
    console.log("Saving device:", updatedRow);
    // Handle save logic here
  };

  const handleDeleteDevice = (
    id: string | number,
    deletedRow: Row,
    rows: Row[]
  ) => {
    console.log("Deleting device:", deletedRow);
    setDevices(devices.filter((device) => device.id !== id));
  };

  const createRowData = (rows: Row[]) => {
    const newId = Math.max(...rows.map((r) => Number(r.id) || 0)) + 1;
    return {
      id: newId,
      deviceCode: `DEV${String(newId).padStart(3, "0")}`,
      deviceName: "",
      deviceType: "",
      status: "Inactive",
      location: "",
      lastSeen: new Date().toISOString().split("T")[0],
      batteryLevel: 0,
    };
  };

  const filteredDevices = devices.filter((device) => {
    if (activeTab === "active") return device.status === "Active";
    if (activeTab === "inactive") return device.status === "Inactive";
    return true;
  });

  return (
    <div className="min-h-screen bg-theme-secondary">
      <ModuleHeader
        title="Devices"
        breadcrumbs={breadcrumbs}
        showAddButton
        addButtonText="Add Device"
        onAddClick={handleAddDevice}
        showSearch
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search devices..."
        tabs={tabs}
        onTabChange={setActiveTab}
      />

      <div className="p-6">
        <DataTable
          columns={columns}
          rows={filteredDevices}
          loading={loading}
          onSaveRow={handleSaveDevice}
          onDeleteRow={handleDeleteDevice}
          createRowData={createRowData}
          pageSize={10}
          pageSizeOptions={[5, 10, 25, 50]}
        />
      </div>
    </div>
  );
};

export default DeviceList;
