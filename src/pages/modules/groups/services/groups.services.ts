// Groups services with proper pagination and IMEI relationship mapping
import { Row } from "../../../../components/ui/DataTable/types";
import {
  getRequest,
  postRequest,
  patchRequest,
} from "../../../../core-services/rest-api/apiHelpers";
import urls from "../../../../global/constants/url-constants";

// Define interfaces for API responses
interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

interface ImeiDevice {
  _id: string;
  account?: string;
  deviceIMEI: string;
  deviceSerialNo: string;
  simNo1: string;
  simNo2: string;
  simNo1Operator: string;
  simNo2Operator: string;
  vehicleDescription: string;
  vehicle?: string;
  driver?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface GroupData {
  _id: string;
  groupName: string;
  groupType: string;
  imei: ImeiDevice[] | string[]; // Can be populated objects or just IDs
  stateName: string;
  cityName: string;
  remark: string;
  contactNo: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface GroupsListResponse {
  data: GroupData[];
  pagination: {
    page: string | number;
    limit: string;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Pagination response interface
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Device for IMEI dropdown
export interface DeviceForImei {
  _id: string;
  deviceIMEI: string;
  deviceSerialNo: string;
  vehicleDescription: string;
}

// Transform API group data to Row format
const transformGroupToRow = (group: GroupData): Row => {
  // Handle IMEI array - extract IMEIs for display and IDs for edit
  let imeiDisplay = "N/A";
  let imeiIds: string[] = [];

  if (Array.isArray(group.imei)) {
    if (group.imei.length > 0) {
      // Check if items have deviceIMEI (populated) or are just strings (IDs)
      if (typeof group.imei[0] === 'object' && 'deviceIMEI' in group.imei[0]) {
        // Populated objects
        const populatedImei = group.imei as ImeiDevice[];
        imeiDisplay = populatedImei.map(device => device.deviceIMEI).join(", ");
        imeiIds = populatedImei.map(device => device._id);
      } else {
        // Just IDs
        imeiIds = group.imei as string[];
        imeiDisplay = `${imeiIds.length} device(s)`;
      }
    }
  }

  return {
    id: group._id,
    groupName: group.groupName,
    groupType: group.groupType,
    imeiDisplay: imeiDisplay,
    stateName: group.stateName,
    cityName: group.cityName,
    remark: group.remark,
    contactNo: group.contactNo,
    status: group.status,
    createdTime: new Date(group.createdAt).toISOString().split("T")[0],
    updatedTime: new Date(group.updatedAt).toISOString().split("T")[0],
    inactiveTime: new Date(group.updatedAt).toISOString().split("T")[0],
    // Store IMEI IDs for edit functionality
    imei: imeiIds,
  };
};

export const groupServices = {
  getAll: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Row>> => {
    try {
      const response: ApiResponse<GroupsListResponse> = await getRequest(
        urls.groupsViewPath,
        {
          page,
          limit,
        }
      );

      if (response.success) {
        return {
          data: response.data.data.map(transformGroupToRow),
          total: response.data.pagination.total,
          page: typeof response.data.pagination.page === 'string' 
            ? parseInt(response.data.pagination.page) 
            : response.data.pagination.page,
          limit: parseInt(response.data.pagination.limit),
          totalPages: response.data.pagination.totalPages,
          hasNext: response.data.pagination.hasNext,
          hasPrev: response.data.pagination.hasPrev,
        };
      } else {
        throw new Error(response.message || "Failed to fetch groups");
      }
    } catch (error: any) {
      console.error("Error fetching groups:", error.message);
      throw new Error(error.message || "Failed to fetch groups");
    }
  },

  getById: async (id: string | number): Promise<Row | null> => {
    try {
      const response: ApiResponse<GroupData> = await getRequest(
        `${urls.groupsViewPath}/${id}`
      );

      if (response.success) {
        return transformGroupToRow(response.data);
      } else {
        throw new Error(response.message || "Group not found");
      }
    } catch (error: any) {
      console.error("Error fetching group:", error.message);
      if (
        error.message.includes("not found") ||
        error.message.includes("404")
      ) {
        return null;
      }
      throw new Error(error.message || "Failed to fetch group");
    }
  },

  create: async (
    groupData: Partial<Row>
  ): Promise<{ group: Row; message: string }> => {
    try {
      const payload = {
        groupName: groupData.groupName,
        groupType: groupData.groupType,
        imei: groupData.imei || [], // Array of device-onboarding IDs
        stateName: groupData.stateName,
        cityName: groupData.cityName,
        remark: groupData.remark,
        contactNo: groupData.contactNo,
        status: groupData.status || "active",
      };

      const response: ApiResponse<GroupData> = await postRequest(
        urls.groupsViewPath,
        payload
      );

      if (response.success) {
        return {
          group: transformGroupToRow(response.data),
          message: response.message || "Group created successfully",
        };
      } else {
        throw new Error(response.message || "Failed to create group");
      }
    } catch (error: any) {
      console.error("Error creating group:", error.message);
      throw new Error(error.message || "Failed to create group");
    }
  },

  update: async (
    id: string | number,
    groupData: Partial<Row>
  ): Promise<{ group: Row; message: string }> => {
    try {
      const payload: any = {};

      // Only include fields that are provided
      if (groupData.groupName !== undefined) payload.groupName = groupData.groupName;
      if (groupData.groupType !== undefined) payload.groupType = groupData.groupType;
      if (groupData.imei !== undefined) payload.imei = groupData.imei;
      if (groupData.stateName !== undefined) payload.stateName = groupData.stateName;
      if (groupData.cityName !== undefined) payload.cityName = groupData.cityName;
      if (groupData.remark !== undefined) payload.remark = groupData.remark;
      if (groupData.contactNo !== undefined) payload.contactNo = groupData.contactNo;
      if (groupData.status !== undefined) payload.status = groupData.status;

      const response: ApiResponse<GroupData> = await patchRequest(
        `${urls.groupsViewPath}/${id}`,
        payload
      );

      if (response.success) {
        return {
          group: transformGroupToRow(response.data),
          message: response.message || "Group updated successfully",
        };
      } else {
        throw new Error(response.message || "Failed to update group");
      }
    } catch (error: any) {
      console.error("Error updating group:", error.message);
      throw new Error(error.message || "Failed to update group");
    }
  },

  inactivate: async (id: string | number): Promise<{ message: string }> => {
    try {
      const response: ApiResponse<GroupData> = await patchRequest(
        `${urls.groupsViewPath}/${id}`,
        {
          status: "inactive",
        }
      );

      if (response.success) {
        return {
          message: response.message || "Group inactivated successfully",
        };
      } else {
        throw new Error(response.message || "Failed to inactivate group");
      }
    } catch (error: any) {
      console.error("Error inactivating group:", error.message);
      throw new Error(error.message || "Failed to inactivate group");
    }
  },

  search: async (
    searchText: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Row>> => {
    try {
      if (!searchText.trim()) {
        return groupServices.getAll(page, limit);
      }

      const response: ApiResponse<GroupsListResponse> = await getRequest(
        urls.groupsViewPath,
        {
          searchText: searchText.trim(),
          page,
          limit,
        }
      );

      if (response.success) {
        return {
          data: response.data.data.map(transformGroupToRow),
          total: response.data.pagination.total,
          page: typeof response.data.pagination.page === 'string' 
            ? parseInt(response.data.pagination.page) 
            : response.data.pagination.page,
          limit: parseInt(response.data.pagination.limit),
          totalPages: response.data.pagination.totalPages,
          hasNext: response.data.pagination.hasNext,
          hasPrev: response.data.pagination.hasPrev,
        };
      } else {
        throw new Error(response.message || "Search failed");
      }
    } catch (error: any) {
      console.error("Error searching groups:", error.message);
      throw new Error(error.message || "Search failed");
    }
  },

  // Get devices for IMEI dropdown
  getDevicesForImei: async (): Promise<DeviceForImei[]> => {
    try {
      const response: ApiResponse<{ data: DeviceForImei[] }> = await getRequest(
        urls.deviceOnboardingViewPath,
        {
          page: 1,
          limit: 10, // Get all records
        }
      );

      if (response.success) {
        return response.data.data;
      } else {
        throw new Error(response.message || "Failed to fetch devices");
      }
    } catch (error: any) {
      console.error("Error fetching devices for IMEI:", error.message);
      throw new Error(error.message || "Failed to fetch devices");
    }
  },
};