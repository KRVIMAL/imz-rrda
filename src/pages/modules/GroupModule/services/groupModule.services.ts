// Group Module services with pagination support
import { Row } from "../../../../components/ui/DataTable/types";
import {
  getRequest,
  postRequest,
  patchRequest,
} from "../../../../core-services/rest-api/apiHelpers";
import urls from "../../../../global/constants/UrlConstants";

// Define interfaces for API responses
interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

interface GroupModuleData {
  _id: string;
  groupMasterId: string;
  groupType: string;
  stateName: string;
  cityName: string;
  remark: string;
  contactNo: string;
  status: string;
  createdTime: string;
  updatedTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface GroupModulesListResponse {
  data: GroupModuleData[];
  pagination: {
    page: number;
    limit: number;
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

// Transform API group module data to Row format
const transformGroupModuleToRow = (groupModule: GroupModuleData): Row => ({
  id: groupModule._id,
  groupMasterId: groupModule.groupMasterId,
  groupType: groupModule.groupType,
  stateName: groupModule.stateName,
  cityName: groupModule.cityName,
  remark: groupModule.remark,
  contactNo: groupModule.contactNo,
  status: groupModule.status,
  createdTime: new Date(groupModule.createdTime).toISOString().split("T")[0],
  updatedTime: new Date(groupModule.updatedTime).toISOString().split("T")[0],
  inactiveTime: new Date(groupModule.updatedTime).toISOString().split("T")[0],
});

export const groupModuleServices = {
  getAll: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Row>> => {
    try {
      const response: ApiResponse<GroupModulesListResponse> = await getRequest(
        urls.groupModuleViewPath,
        {
          page,
          limit,
        }
      );

      if (response.success) {
        return {
          data: response.data.data.map(transformGroupModuleToRow),
          total: response.data.pagination.total,
          page: response.data.pagination.page,
          limit: response.data.pagination.limit,
          totalPages: response.data.pagination.totalPages,
          hasNext: response.data.pagination.hasNext,
          hasPrev: response.data.pagination.hasPrev,
        };
      } else {
        throw new Error(response.message || "Failed to fetch group modules");
      }
    } catch (error: any) {
      console.error("Error fetching group modules:", error.message);
      throw new Error(error.message || "Failed to fetch group modules");
    }
  },

  getById: async (id: string | number): Promise<Row | null> => {
    try {
      const response: ApiResponse<GroupModuleData> = await getRequest(
        `${urls.groupModuleViewPath}/${id}`
      );

      if (response.success) {
        return transformGroupModuleToRow(response.data);
      } else {
        throw new Error(response.message || "Group Module not found");
      }
    } catch (error: any) {
      console.error("Error fetching group module:", error.message);
      if (
        error.message.includes("not found") ||
        error.message.includes("404")
      ) {
        return null;
      }
      throw new Error(error.message || "Failed to fetch group module");
    }
  },

  create: async (
    groupModuleData: Partial<Row>
  ): Promise<{ groupModule: Row; message: string }> => {
    try {
      const payload = {
        groupType: groupModuleData.groupType,
        stateName: groupModuleData.stateName,
        cityName: groupModuleData.cityName,
        remark: groupModuleData.remark,
        contactNo: groupModuleData.contactNo,
      };

      const response: ApiResponse<GroupModuleData> = await postRequest(
        urls.groupModuleViewPath,
        payload
      );

      if (response.success) {
        return {
          groupModule: transformGroupModuleToRow(response.data),
          message: response.message || "Group Module created successfully",
        };
      } else {
        throw new Error(response.message || "Failed to create group module");
      }
    } catch (error: any) {
      console.error("Error creating group module:", error.message);
      throw new Error(error.message || "Failed to create group module");
    }
  },

  update: async (
    id: string | number,
    groupModuleData: Partial<Row>
  ): Promise<{ groupModule: Row; message: string }> => {
    try {
      const payload: any = {};

      // Only include fields that are provided
      if (groupModuleData.groupType !== undefined) payload.groupType = groupModuleData.groupType;
      if (groupModuleData.stateName !== undefined) payload.stateName = groupModuleData.stateName;
      if (groupModuleData.cityName !== undefined) payload.cityName = groupModuleData.cityName;
      if (groupModuleData.remark !== undefined) payload.remark = groupModuleData.remark;
      if (groupModuleData.contactNo !== undefined) payload.contactNo = groupModuleData.contactNo;
      if (groupModuleData.status !== undefined) payload.status = groupModuleData.status;

      const response: ApiResponse<GroupModuleData> = await patchRequest(
        `${urls.groupModuleViewPath}/${id}`,
        payload
      );

      if (response.success) {
        return {
          groupModule: transformGroupModuleToRow(response.data),
          message: response.message || "Group Module updated successfully",
        };
      } else {
        throw new Error(response.message || "Failed to update group module");
      }
    } catch (error: any) {
      console.error("Error updating group module:", error.message);
      throw new Error(error.message || "Failed to update group module");
    }
  },

  inactivate: async (id: string | number): Promise<{ message: string }> => {
    try {
      const response: ApiResponse<GroupModuleData> = await patchRequest(
        `${urls.groupModuleViewPath}/${id}`,
        {
          status: "inactive",
        }
      );

      if (response.success) {
        return {
          message: response.message || "Group Module inactivated successfully",
        };
      } else {
        throw new Error(response.message || "Failed to inactivate group module");
      }
    } catch (error: any) {
      console.error("Error inactivating group module:", error.message);
      throw new Error(error.message || "Failed to inactivate group module");
    }
  },

  search: async (
    searchText: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Row>> => {
    try {
      if (!searchText.trim()) {
        return groupModuleServices.getAll(page, limit);
      }

      const response: ApiResponse<GroupModulesListResponse> = await getRequest(
        `${urls.groupModuleViewPath}/search`,
        {
          search: searchText.trim(),
          page,
          limit,
        }
      );

      if (response.success) {
        return {
          data: response.data.data.map(transformGroupModuleToRow),
          total: response.data.pagination.total,
          page: response.data.pagination.page,
          limit: response.data.pagination.limit,
          totalPages: response.data.pagination.totalPages,
          hasNext: response.data.pagination.hasNext,
          hasPrev: response.data.pagination.hasPrev,
        };
      } else {
        throw new Error(response.message || "Search failed");
      }
    } catch (error: any) {
      console.error("Error searching group modules:", error.message);
      throw new Error(error.message || "Search failed");
    }
  },
};