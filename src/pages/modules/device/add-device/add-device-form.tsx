import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FiHome, FiHardDrive, FiPlus } from "react-icons/fi";
import ModuleHeader from "../../../../components/ui/ModuleHeader";
import CustomInput from "../../../../components/ui/CustomInput";
import Select from "../../../../components/ui/Select";
import Card from "../../../../components/ui/Card";
import { deviceServices } from "../services/devices.sevices";
import strings from "../../../../global/constants/string-contants";
import urls from "../../../../global/constants/url-constants";
import toast from "react-hot-toast";

// Form state type
interface DeviceFormState {
  modelName: {
    value: string;
    error: string;
  };
  manufacturerName: {
    value: string;
    error: string;
  };
  deviceType: {
    value: string;
    error: string;
  };
  ipAddress: {
    value: string;
    error: string;
  };
  port: {
    value: string;
    error: string;
  };
  status: {
    value: string;
    error: string;
  };
}

// Initial form state
const initialFormState = (preState?: any): DeviceFormState => ({
  modelName: {
    value: preState?.modelName || "",
    error: "",
  },
  manufacturerName: {
    value: preState?.manufacturerName || "",
    error: "",
  },
  deviceType: {
    value: preState?.deviceType || "iot",
    error: "",
  },
  ipAddress: {
    value: preState?.ipAddress || "",
    error: "",
  },
  port: {
    value: preState?.port?.toString() || "",
    error: "",
  },
  status: {
    value: preState?.status || "inactive",
    error: "",
  },
});

const AddEditDeviceForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<DeviceFormState>(initialFormState());

  const deviceTypeOptions = [
    { value: "iot", label: "IoT Device" },
    { value: "lock", label: "Smart Lock" },
    { value: "tracker", label: "GPS Tracker" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const breadcrumbs = [
    { label: strings.HOME, href: urls.landingViewPath, icon: FiHome },
    { label: strings.DEVICES, href: urls.devicesViewPath, icon: FiHardDrive },
    {
      label: isEdit ? strings.EDIT_DEVICE : strings.ADD_DEVICE,
      isActive: true,
      icon: FiPlus,
    },
  ];

  useEffect(() => {
    if (isEdit && id) {
      // Get data from navigation state first, fallback to API
      const { state } = location;
      console.log({ state });

      if (state?.deviceData) {
        setFormData(initialFormState(state.deviceData));
      } else {
        loadDevice(); // Only call API if no data passed
      }
    }
  }, [isEdit, id]);

  const loadDevice = async () => {
    setLoading(true);
    try {
      const device = await deviceServices.getById(id!);
      if (device) {
        setFormData(initialFormState(device));
      } else {
        // toast.error(error.message)
        // showMessage("error", "Device not found");
        navigate(urls.devicesViewPath);
      }
    } catch (error: any) {
      console.error("Error loading device:", error);
      toast.error(error.message || "Failed to fetch device");
      navigate(urls.devicesViewPath);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof DeviceFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          value: e.target.value,
          error: "", // Clear error when user types
        },
      }));
    };

  const handleSelectChange =
    (field: keyof DeviceFormState) => (value: string | string[] | null) => {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          value: value as string,
          error: "",
        },
      }));
    };

  const validateForm = (): boolean => {
    const errors: Partial<DeviceFormState> = {};
    let isValid = true;

    // Model Name validation
    if (!formData.modelName.value.trim()) {
      errors.modelName = {
        ...formData.modelName,
        error: "Model Name is required",
      };
      isValid = false;
    }

    // Manufacturer Name validation
    if (!formData.manufacturerName.value.trim()) {
      errors.manufacturerName = {
        ...formData.manufacturerName,
        error: "Manufacturer Name is required",
      };
      isValid = false;
    }

    // IP Address validation
    if (!formData.ipAddress.value.trim()) {
      errors.ipAddress = {
        ...formData.ipAddress,
        error: "IP Address is required",
      };
      isValid = false;
    } else {
      const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
      if (!ipRegex.test(formData.ipAddress.value)) {
        errors.ipAddress = {
          ...formData.ipAddress,
          error: "Invalid IP Address format",
        };
        isValid = false;
      }
    }

    // Port validation
    if (!formData.port.value.trim()) {
      errors.port = { ...formData.port, error: "Port is required" };
      isValid = false;
    } else {
      const portNum = parseInt(formData.port.value);
      if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
        errors.port = {
          ...formData.port,
          error: "Port must be between 1 and 65535",
        };
        isValid = false;
      }
    }

    // Update form data with errors
    setFormData((prev) => ({
      ...prev,
      ...errors,
    }));

    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const deviceData = {
        modelName: formData.modelName.value,
        manufacturerName: formData.manufacturerName.value,
        deviceType: formData.deviceType.value,
        ipAddress: formData.ipAddress.value,
        port: formData.port.value,
        status: formData.status.value,
      };

      const result = isEdit
        ? await deviceServices.update(id!, deviceData)
        : await deviceServices.create(deviceData);
      toast.success(result.message);

      // Navigate back after a short delay to show the success message
      setTimeout(() => {
        navigate(urls.devicesViewPath);
      }, 1500);
    } catch (error: any) {
      console.error("Error saving device:", error);
      toast.error(error.message || "Failed to save device");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(urls.devicesViewPath);
  };

  if (loading && isEdit) {
    return (
      <div className="min-h-screen bg-theme-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-secondary">
      <ModuleHeader
        title={isEdit ? strings.EDIT_DEVICE : strings.ADD_DEVICE}
        breadcrumbs={breadcrumbs}
        showCancelButton
        showSaveButton
        onSaveClick={handleSave}
        onCancelClick={handleCancel}
        saveText={saving ? "Saving..." : "Save"}
      />

      <div className="p-6">
        <Card>
          <Card.Body className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <CustomInput
                  label="Model Name"
                  value={formData.modelName.value}
                  onChange={handleInputChange("modelName")}
                  required
                  placeholder="Enter model name"
                  disabled={saving}
                />
                {formData.modelName.error && (
                  <p className="mt-1 text-sm text-red-600">
                    {formData.modelName.error}
                  </p>
                )}
              </div>

              <div>
                <CustomInput
                  label="Manufacturer Name"
                  value={formData.manufacturerName.value}
                  onChange={handleInputChange("manufacturerName")}
                  required
                  placeholder="Enter manufacturer name"
                  disabled={saving}
                />
                {formData.manufacturerName.error && (
                  <p className="mt-1 text-sm text-red-600">
                    {formData.manufacturerName.error}
                  </p>
                )}
              </div>

              <div>
                <Select
                  label="Device Type"
                  options={deviceTypeOptions}
                  value={formData.deviceType.value}
                  onChange={handleSelectChange("deviceType")}
                  required
                  disabled={saving}
                />
                {formData.deviceType.error && (
                  <p className="mt-1 text-sm text-red-600">
                    {formData.deviceType.error}
                  </p>
                )}
              </div>

              <div>
                <CustomInput
                  label="IP Address"
                  value={formData.ipAddress.value}
                  onChange={handleInputChange("ipAddress")}
                  required
                  placeholder="192.168.1.100"
                  disabled={saving}
                />
                {formData.ipAddress.error && (
                  <p className="mt-1 text-sm text-red-600">
                    {formData.ipAddress.error}
                  </p>
                )}
              </div>

              <div>
                <CustomInput
                  label="Port"
                  type="number"
                  value={formData.port.value}
                  onChange={handleInputChange("port")}
                  required
                  placeholder="8080"
                  disabled={saving}
                />
                {formData.port.error && (
                  <p className="mt-1 text-sm text-red-600">
                    {formData.port.error}
                  </p>
                )}
              </div>

              <div>
                <Select
                  label="Status"
                  options={statusOptions}
                  value={formData.status.value}
                  onChange={handleSelectChange("status")}
                  required
                  disabled={saving}
                />
                {formData.status.error && (
                  <p className="mt-1 text-sm text-red-600">
                    {formData.status.error}
                  </p>
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AddEditDeviceForm;
