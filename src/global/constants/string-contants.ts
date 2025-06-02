export class StringConstants {
  // Modules
  DEVICE = "DEVICE";
  VEHICLE = "VEHICLE";
  DRIVER = "DRIVER";
  CLIENT = "CLIENT";
  TRANSPORTER = "TRANSPORTER";
  CONTRACTOR = "CONTRACTOR";

  // Navigation
  HOME = "Home";
  DEVICES = "Devices";
  VEHICLES = "Vehicles";
  DRIVERS = "Drivers";
  CLIENTS = "Clients";
  TRANSPORTERS = "Transporters";
  CONTRACTORS = "Contractors";

  // Status
  ACTIVE = "Active";
  INACTIVE = "Inactive";

  // Actions
  ADD = "Add";
  UPDATE = "Update";
  EDIT = "Edit";
  SEARCH = "Search";
  DELETE = "Delete";
  CANCEL = "Cancel";
  SAVE = "Save";
  NEXT = "Next";
  PREVIOUS = "Previous";

  // Device specific
  ADD_DEVICE = "Add Device";
  UPDATE_DEVICE = "Update Device";
  EDIT_DEVICE = "Edit Device";

  // Message types
  SUCCESS = "success";
  ERROR = "error";

  // Common form labels
  MODEL_NAME = "Model Name";
  MANUFACTURER_NAME = "Manufacturer Name";
  DEVICE_TYPE = "Device Type";
  IP_ADDRESS = "IP Address";
  PORT = "Port";
  STATUS = "Status";
  
  // Validation messages
  REQUIRED_FIELD = "This field is required";
  INVALID_IP_FORMAT = "Invalid IP Address format";
  INVALID_PORT_RANGE = "Port must be between 1 and 65535";
}

let strings = new StringConstants();
export default strings;