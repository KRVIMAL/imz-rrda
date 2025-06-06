import apiClient from "./api-client";

// Helper for GET requests
export const getRequest = async (url: string, params = {}) => {
  try {
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error: any) {
    // Extract error message from backend response
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.errors ||
      error.message ||
      "API GET request failed";
    throw new Error(errorMessage);
  }
};

// Helper for POST requests
export const postRequest = async (url: string, data = {}) => {
  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error: any) {
    // Extract error message from backend response
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.errors ||
      error.message ||
      "API POST request failed";
    throw new Error(errorMessage);
  }
};

// Helper for PATCH requests
export const patchRequest = async (url: string, data = {}) => {
  try {
    const response = await apiClient.patch(url, data);
    return response.data;
  } catch (error: any) {
    // Extract error message from backend response
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.errors ||
      error.message ||
      "API PATCH request failed";
    throw new Error(errorMessage);
  }
};

// Helper for DELETE requests
export const deleteRequest = async (url: string) => {
  try {
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error: any) {
    // Extract error message from backend response
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.errors ||
      error.message ||
      "API DELETE request failed";
    throw new Error(errorMessage);
  }
};

// Helper for PUT requests
export const putRequest = async (url: string, data = {}) => {
  try {
    const response = await apiClient.put(url, data);
    return response.data;
  } catch (error: any) {
    // Extract error message from backend response
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.errors ||
      error.message ||
      "API PUT request failed";
    throw new Error(errorMessage);
  }
};

export const exportService = {
  exportData: async (
    modulePath: string,
    format: "csv" | "xlsx" | "pdf",
    filename?: string
  ) => {
    try {
      const response = await fetch(
        `http://192.168.1.36:9876${modulePath}?format=${format}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add authentication headers if needed
            // 'Authorization': `Bearer ${getAuthToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Export failed: ${response.statusText}`);
      }

      const blob = await response.blob();

      // Create download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      const timestamp = new Date().toISOString().split("T")[0];
      const defaultFilename = filename || "export";
      a.download = `${defaultFilename}-${timestamp}.${format}`;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      return { success: true };
    } catch (error: any) {
      console.error("Export error:", error);
      throw new Error(error.message || "Export failed");
    }
  },
};
