// Device Data services for hex data and track data
import { Row } from "../../../../components/ui/DataTable/types";
import { getRequest } from "../../../../core-services/rest-api/apiHelpers";
import urls from "../../../../global/constants/UrlConstants";

// Define interfaces for API responses
interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

interface HexDataItem {
  _id: string;
  topic: string;
  partition: number;
  offset: number;
  timestamp: string;
  created_at: string;
  imei: string;
  rawHexData: string;
}

interface TrackDataItem {
  _id: string;
  gsmSignalStrength?: number;
  gnssPdop?: number;
  iccid2?: number;
  satellites?: number;
  analogInput1?: number;
  unknownFields?: Record<string, any>;
  ignition?: string;
  gnssStatus?: string;
  gnssHdop?: number;
  externalVoltage?: number;
  gsmAreaCode?: number;
  imei: string;
  dataMode?: string;
  sleepMode?: string;
  jamming?: string;
  motion?: string;
  dateTime: string;
  longitude?: number;
  bearing?: number;
  iccid1?: number;
  deviceType: string;
  latitude?: number;
  speed?: number;
  eventIoId?: number;
  totalIoElements?: number;
  activeGSMOperator?: number;
  priority?: number;
  digitalInput1?: number;
  gsmCellID?: number;
  altitude?: number;
  dateTimeUTC: string;
}

interface DataListResponse<T> {
  data: T[];
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

// Transform hex data to Row format
const transformHexDataToRow = (hexData: HexDataItem): Row => ({
  id: hexData._id,
  topic: hexData.topic,
  partition: hexData.partition,
  offset: hexData.offset,
  timestamp: new Date(hexData.timestamp).toLocaleString(),
  created_at: new Date(hexData.created_at).toLocaleString(),
  imei: hexData.imei,
  rawHexData: hexData.rawHexData,
});

// Transform track data to Row format
const transformTrackDataToRow = (trackData: TrackDataItem): Row => ({
  id: trackData._id,
  imei: trackData.imei,
  deviceType: trackData.deviceType || "N/A",
  dateTime: trackData.dateTime
    ? new Date(trackData.dateTime).toLocaleString()
    : "N/A",
  dateTimeUTC: trackData.dateTimeUTC
    ? new Date(trackData.dateTimeUTC).toLocaleString()
    : "N/A",
  latitude:
    trackData.latitude !== undefined ? trackData.latitude.toFixed(6) : "N/A",
  longitude:
    trackData.longitude !== undefined ? trackData.longitude.toFixed(6) : "N/A",
  speed: trackData.speed !== undefined ? trackData.speed : "N/A",
  bearing: trackData.bearing !== undefined ? trackData.bearing : "N/A",
  altitude: trackData.altitude !== undefined ? trackData.altitude : "N/A",
  satellites: trackData.satellites !== undefined ? trackData.satellites : "N/A",
  ignition: trackData.ignition || "N/A",
  motion: trackData.motion || "N/A",
  gsmSignalStrength:
    trackData.gsmSignalStrength !== undefined
      ? trackData.gsmSignalStrength
      : "N/A",
  externalVoltage:
    trackData.externalVoltage !== undefined ? trackData.externalVoltage : "N/A",
  digitalInput1:
    trackData.digitalInput1 !== undefined ? trackData.digitalInput1 : "N/A",
  analogInput1:
    trackData.analogInput1 !== undefined ? trackData.analogInput1 : "N/A",
  gsmAreaCode:
    trackData.gsmAreaCode !== undefined ? trackData.gsmAreaCode : "N/A",
  gsmCellID: trackData.gsmCellID !== undefined ? trackData.gsmCellID : "N/A",
  activeGSMOperator:
    trackData.activeGSMOperator !== undefined
      ? trackData.activeGSMOperator
      : "N/A",
  gnssStatus: trackData.gnssStatus || "N/A",
  jamming: trackData.jamming || "N/A",
  dataMode: trackData.dataMode || "N/A",
  sleepMode: trackData.sleepMode || "N/A",
  priority: trackData.priority !== undefined ? trackData.priority : "N/A",
  eventIoId: trackData.eventIoId !== undefined ? trackData.eventIoId : "N/A",
  totalIoElements:
    trackData.totalIoElements !== undefined ? trackData.totalIoElements : "N/A",
});

export const deviceDataServices = {
  // Get Hex Data
  getHexData: async (
    imei: string,
    startDate: string,
    endDate: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Row>> => {
    try {
      const response: ApiResponse<DataListResponse<HexDataItem>> =
        await getRequest(urls.hexDataViewPath, {
          imei,
          startDate,
          endDate,
          page,
          limit,
        });

      if (response.success) {
        return {
          data: response.data.data.map(transformHexDataToRow),
          total: response.data.pagination.total,
          page: parseInt(response.data.pagination.page),
          limit: parseInt(response.data.pagination.limit),
          totalPages: response.data.pagination.totalPages,
          hasNext: response.data.pagination.hasNext,
          hasPrev: response.data.pagination.hasPrev,
        };
      } else {
        throw new Error(response.message || "Failed to fetch hex data");
      }
    } catch (error: any) {
      console.error("Error fetching hex data:", error.message);
      throw new Error(error.message || "Failed to fetch hex data");
    }
  },

  // Get Track Data
  getTrackData: async (
    imei: string,
    startDate: string,
    endDate: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Row>> => {
    try {
      const response: ApiResponse<DataListResponse<TrackDataItem>> =
        await getRequest(urls.trackDataViewPath, {
          imei,
          startDate,
          endDate,
          page,
          limit,
        });
      if (response.success) {
        return {
          data: response.data.data.map(transformTrackDataToRow),
          total: response.data.pagination.total,
          page: parseInt(response.data.pagination.page),
          limit: parseInt(response.data.pagination.limit),
          totalPages: response.data.pagination.totalPages,
          hasNext: response.data.pagination.hasNext,
          hasPrev: response.data.pagination.hasPrev,
        };
      } else {
        throw new Error(response.message || "Failed to fetch track data");
      }
    } catch (error: any) {
      console.error("Error fetching track data:", error.message);
      throw new Error(error.message || "Failed to fetch track data");
    }
  },

  // Get available IMEIs (hardcoded for now, can be replaced with API call later)
  getAvailableIMEIs: async (): Promise<string[]> => {
    try {
      // Hardcoded IMEI list as requested
      // TODO: Replace with actual API call when available
      const hardcodedIMEIs = [
        "350317177912155",
        "350317177912156",
        "350317177912157",
        "350317177912158",
        "350317177912159",
        "350317177912160",
        "350317177912161",
        "350317177912162",
        "350317177912163",
        "350317177912164",
      ];

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 100));

      return hardcodedIMEIs;
    } catch (error: any) {
      console.error("Error fetching IMEIs:", error.message);
      throw new Error(error.message || "Failed to fetch IMEIs");
    }
  },
};
