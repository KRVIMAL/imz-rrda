import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FiHome, FiUsers, FiPlus } from "react-icons/fi";
import ModuleHeader from "../../../../components/ui/ModuleHeader";
import CustomInput from "../../../../components/ui/CustomInput";
import Select from "../../../../components/ui/Select";
import Card from "../../../../components/ui/Card";
import {
  groupMasterServices,
  GroupModuleForDropdown,
  DeviceForImei,
} from "../services/groupMaster.services";
import urls from "../../../../global/constants/UrlConstants";
import strings from "../../../../global/constants/StringConstants";
import toast from "react-hot-toast";

// Form state type
interface GroupMasterFormState {
  groupName: {
    value: string;
    error: string;
  };
  groupModule: {
    value: string;
    error: string;
  };
  imei: {
    value: string[];
    error: string;
  };
  status: {
    value: string;
    error: string;
  };
}

// Initial form state
const initialFormState = (preState?: any): GroupMasterFormState => ({
  groupName: {
    value: preState?.groupName || "",
    error: "",
  },
  groupModule: {
    value: preState?.groupModule || "",
    error: "",
  },
  imei: {
    value: preState?.imei || [],
    error: "",
  },
  status: {
    value: preState?.status || "active",
    error: "",
  },
});

const AddEditGroupMasterForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<GroupMasterFormState>(
    initialFormState()
  );

  // Dropdown data
  const [groupModules, setGroupModules] = useState<GroupModuleForDropdown[]>(
    []
  );
  const [devices, setDevices] = useState<DeviceForImei[]>([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(false);

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const breadcrumbs = [
    { label: strings.HOME, href: urls.landingViewPath, icon: FiHome },
    {
      label: strings.GROUP_MASTERS,
      href: urls.groupMastersViewPath,
      icon: FiUsers,
    },
    {
      label: isEdit ? strings.EDIT_GROUP_MASTER : strings.ADD_GROUP_MASTER,
      isActive: true,
      icon: FiPlus,
    },
  ];

  useEffect(() => {
    const initializeForm = async () => {
      await loadDropdownData();

      if (isEdit && id) {
        // Check if data is passed via navigation state first
        const { state } = location;
        if (state?.groupMasterData) {
          console.log("Using navigation state data:", state.groupMasterData);

          // Ensure IMEI array contains only string IDs
          const cleanedData = {
            ...state.groupMasterData,
            imei: Array.isArray(state.groupMasterData.imei)
              ? state.groupMasterData.imei.filter(
                  (id: any) => typeof id === "string" && id.trim()
                )
              : [],
          };

          setFormData(initialFormState(cleanedData));
        } else {
          // Fallback to API call
          await loadGroupMaster();
        }
      }
    };

    initializeForm();
  }, [isEdit, id, location]);

  const loadDropdownData = async () => {
    setLoadingDropdowns(true);
    try {
      const [groupModulesData, devicesData] = await Promise.all([
        groupMasterServices.getGroupModules(),
        groupMasterServices.getDevicesForImei(),
      ]);

      setGroupModules(groupModulesData);
      setDevices(devicesData);

      console.log("Dropdown data loaded:", {
        groupModules: groupModulesData.length,
        devices: devicesData.length,
      });
    } catch (error: any) {
      console.error("Error loading dropdown data:", error);
      toast.error("Failed to load form data");
    } finally {
      setLoadingDropdowns(false);
    }
  };

  const loadGroupMaster = async () => {
    setLoading(true);
    try {
      const groupMaster = await groupMasterServices.getById(id!);
      if (groupMaster) {
        console.log("Loaded group master data:", groupMaster);

        // Ensure IMEI array contains only string IDs
        const cleanedGroupMaster = {
          ...groupMaster,
          imei: Array.isArray(groupMaster.imei)
            ? groupMaster.imei.filter(
                (id) => typeof id === "string" && id.trim()
              )
            : [],
        };

        setFormData(initialFormState(cleanedGroupMaster));
      } else {
        navigate(urls.groupMastersViewPath);
      }
    } catch (error: any) {
      console.error("Error loading group master:", error);
      toast.error(error.message || "Failed to fetch group master");
      navigate(urls.groupMastersViewPath);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof GroupMasterFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          value: e.target.value,
          error: "",
        },
      }));
    };

  const handleSelectChange =
    (field: keyof GroupMasterFormState) =>
    (value: string | string[] | null) => {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          value:
            field === "imei"
              ? (value as string[]) || []
              : (value as string) || "",
          error: "",
        },
      }));
    };

  const handleBlur = (field: keyof GroupMasterFormState) => () => {
    const value = formData[field].value;
    let error = "";

    switch (field) {
      case "groupName":
        if (!value || (typeof value === "string" && !value.trim())) {
          error = "Group Name is required";
        }
        break;
      case "groupModule":
        if (!value || (typeof value === "string" && !value.trim())) {
          error = "Group Module is required";
        }
        break;
      case "status":
        if (!value || (typeof value === "string" && !value.trim())) {
          error = "Status is required";
        }
        break;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], error },
    }));
  };

  const validateForm = (): boolean => {
    const errors: Partial<GroupMasterFormState> = {};
    let isValid = true;

    // Group Name validation
    if (!formData.groupName.value.trim()) {
      errors.groupName = {
        ...formData.groupName,
        error: "Group Name is required",
      };
      isValid = false;
    }

    // Group Module validation
    if (!formData.groupModule.value.trim()) {
      errors.groupModule = {
        ...formData.groupModule,
        error: "Group Module is required",
      };
      isValid = false;
    }

    // Status validation
    if (!formData.status.value.trim()) {
      errors.status = { ...formData.status, error: "Status is required" };
      isValid = false;
    }

    if (!isValid) {
      setFormData((prev) => ({ ...prev, ...errors }));
    }

    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      // Ensure IMEI array contains only string IDs, no duplicates
      const imeiArray = Array.isArray(formData.imei.value)
        ? formData.imei.value
        : [];
      const uniqueImeiIds = [
        ...new Set(
          imeiArray.filter((id) => typeof id === "string" && id.trim())
        ),
      ];

      const groupMasterData = {
        groupName: formData.groupName.value,
        groupModule: formData.groupModule.value,
        imei: uniqueImeiIds, // Array of device-onboarding IDs (strings only)
        status: formData.status.value,
      };

      console.log("Saving group master data:", groupMasterData); // Debug log

      const result = isEdit
        ? await groupMasterServices.update(id!, groupMasterData)
        : await groupMasterServices.create(groupMasterData);
      toast.success(result.message);

      setTimeout(() => {
        navigate(urls.groupMastersViewPath);
      }, 1500);
    } catch (error: any) {
      console.error("Error saving group master:", error);
      toast.error(error.message || "Failed to save group master");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(urls.groupMastersViewPath);
  };

  // Create options for dropdowns
  const groupModuleOptions = groupModules.map((groupModule) => ({
    value: groupModule._id,
    label: `${groupModule.groupType} (${groupModule.stateName} - ${groupModule.cityName})`,
  }));

  const imeiOptions = devices.map((device) => ({
    value: device._id,
    label: `${device.deviceIMEI} - ${device.vehicleDescription}`,
  }));

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
        title={isEdit ? strings.EDIT_GROUP_MASTER : strings.ADD_GROUP_MASTER}
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
            {loadingDropdowns && (
              <div className="flex items-center justify-center py-4 mb-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                <span className="ml-2 text-gray-600">Loading form data...</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <CustomInput
                  label={strings.GROUP_NAME}
                  value={formData.groupName.value}
                  onChange={handleInputChange("groupName")}
                  onBlur={handleBlur("groupName")}
                  required
                  placeholder="Enter group name"
                  disabled={saving || loadingDropdowns}
                  autoValidate={false}
                  error={formData.groupName.error}
                />
              </div>

              <div>
                <Select
                  label={strings.GROUP_MODULE}
                  options={groupModuleOptions}
                  value={formData.groupModule.value}
                  onChange={handleSelectChange("groupModule")}
                  placeholder="Select Group Module"
                  required
                  disabled={saving || loadingDropdowns}
                  error={formData.groupModule.error}
                />
              </div>

              <div className="md:col-span-2">
                <Select
                  label={strings.SELECT_ASSET_IMEI}
                  options={imeiOptions}
                  value={formData.imei.value}
                  onChange={handleSelectChange("imei")}
                  placeholder="Select Assets/IMEI..."
                  multiple
                  disabled={saving || loadingDropdowns}
                  error={formData.imei.error}
                  helper="You can select multiple devices"
                />
              </div>

              {isEdit && (
                <div>
                  <Select
                    label="Status"
                    options={statusOptions}
                    value={formData.status.value}
                    onChange={handleSelectChange("status")}
                    placeholder="Select Status"
                    required
                    disabled={saving || loadingDropdowns}
                    error={formData.status.error}
                  />
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AddEditGroupMasterForm;
