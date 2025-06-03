// Updated driver services with proper pagination response
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

interface DriverData {
  _id: string;
  name: string;
  contactNo: string;
  email: string;
  licenseNo: string;
  adharNo: string;
  status: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface DriversListResponse {
  data: DriverData[];
  pagination: {
    page: string;
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

// Transform API driver data to Row format
const transformDriverToRow = (driver: DriverData): Row => ({
  id: driver._id,
  name: driver.name,
  contactNo: driver.contactNo,
  email: driver.email,
  licenseNo: driver.licenseNo,
  adharNo: driver.adharNo,
  status: driver.status || (driver.isActive ? "active" : "inactive"),
  createdTime: new Date(driver.createdAt).toISOString().split("T")[0],
  updatedTime: new Date(driver.updatedAt).toISOString().split("T")[0],
  inactiveTime: new Date(driver.updatedAt).toISOString().split("T")[0],
});

export const driverServices = {
  getAll: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Row>> => {
    try {
      const response: ApiResponse<DriversListResponse> = await getRequest(
        urls.driversViewPath,
        {
          page,
          limit,
        }
      );

      if (response.success) {
        return {
          data: response.data.data.map(transformDriverToRow),
          total: response.data.pagination.total,
          page: parseInt(response.data.pagination.page),
          limit: parseInt(response.data.pagination.limit),
          totalPages: response.data.pagination.totalPages,
          hasNext: response.data.pagination.hasNext,
          hasPrev: response.data.pagination.hasPrev,
        };
      } else {
        throw new Error(response.message || "Failed to fetch drivers");
      }
    } catch (error: any) {
      console.error("Error fetching drivers:", error.message);
      throw new Error(error.message || "Failed to fetch drivers");
    }
  },

  getById: async (id: string | number): Promise<Row | null> => {
    try {
      const response: ApiResponse<DriverData> = await getRequest(
        `${urls.driversViewPath}/${id}`
      );

      if (response.success) {
        return transformDriverToRow(response.data);
      } else {
        throw new Error(response.message || "Driver not found");
      }
    } catch (error: any) {
      console.error("Error fetching driver:", error.message);
      // Return null if driver not found instead of throwing
      if (
        error.message.includes("not found") ||
        error.message.includes("404")
      ) {
        return null;
      }
      throw new Error(error.message || "Failed to fetch driver");
    }
  },

  create: async (
    driverData: Partial<Row>
  ): Promise<{ driver: Row; message: string }> => {
    try {
      const payload = {
        name: driverData.name,
        contactNo: driverData.contactNo,
        email: driverData.email,
        licenseNo: driverData.licenseNo,
        adharNo: driverData.adharNo,
        status: driverData.status,
      };

      const response: ApiResponse<DriverData> = await postRequest(
        urls.driversViewPath,
        payload
      );

      if (response.success) {
        return {
          driver: transformDriverToRow(response.data),
          message: response.message || "Driver created successfully",
        };
      } else {
        throw new Error(response.message || "Failed to create driver");
      }
    } catch (error: any) {
      console.error("Error creating driver:", error.message);
      throw new Error(error.message || "Failed to create driver");
    }
  },

  update: async (
    id: string | number,
    driverData: Partial<Row>
  ): Promise<{ driver: Row; message: string }> => {
    try {
      const payload: any = {};

      // Only include fields that are provided
      if (driverData.name !== undefined) payload.name = driverData.name;
      if (driverData.contactNo !== undefined) payload.contactNo = driverData.contactNo;
      if (driverData.email !== undefined) payload.email = driverData.email;
      if (driverData.licenseNo !== undefined) payload.licenseNo = driverData.licenseNo;
      if (driverData.adharNo !== undefined) payload.adharNo = driverData.adharNo;
      if (driverData.status !== undefined) payload.status = driverData.status;

      const response: ApiResponse<DriverData> = await patchRequest(
        `${urls.driversViewPath}/${id}`,
        payload
      );

      if (response.success) {
        return {
          driver: transformDriverToRow(response.data),
          message: response.message || "Driver updated successfully",
        };
      } else {
        throw new Error(response.message || "Failed to update driver");
      }
    } catch (error: any) {
      console.error("Error updating driver:", error.message);
      throw new Error(error.message || "Failed to update driver");
    }
  },

  inactivate: async (id: string | number): Promise<{ message: string }> => {
    try {
      const response: ApiResponse<DriverData> = await patchRequest(
        `${urls.driversViewPath}/${id}`,
        {
          status: "inactive",
        }
      );

      if (response.success) {
        return {
          message: response.message || "Driver inactivated successfully",
        };
      } else {
        throw new Error(response.message || "Failed to inactivate driver");
      }
    } catch (error: any) {
      console.error("Error inactivating driver:", error.message);
      throw new Error(error.message || "Failed to inactivate driver");
    }
  },

  search: async (
    searchText: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Row>> => {
    try {
      // If search is empty, return all drivers
      if (!searchText.trim()) {
        return driverServices.getAll(page, limit);
      }

      const response: ApiResponse<DriversListResponse> = await getRequest(
        urls.driversViewPath,
        {
          searchText: searchText.trim(),
          page,
          limit,
        }
      );

      if (response.success) {
        return {
          data: response.data.data.map(transformDriverToRow),
          total: response.data.pagination.total,
          page: parseInt(response.data.pagination.page),
          limit: parseInt(response.data.pagination.limit),
          totalPages: response.data.pagination.totalPages,
          hasNext: response.data.pagination.hasNext,
          hasPrev: response.data.pagination.hasPrev,
        };
      } else {
        throw new Error(response.message || "Search failed");
      }
    } catch (error: any) {
      console.error("Error searching drivers:", error.message);
      throw new Error(error.message || "Search failed");
    }
  },
};