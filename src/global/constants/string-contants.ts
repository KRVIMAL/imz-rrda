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


  // Client specific
  ADD_CLIENT = "Add Client";
  UPDATE_CLIENT = "Update Client";
  EDIT_CLIENT = "Edit Client";


   // Vehicle specific
  ADD_VEHICLE = "Add Vehicle";
  UPDATE_VEHICLE = "Update Vehicle";
  EDIT_VEHICLE = "Edit Vehicle";

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

  // Client form labels
  CLIENT_NAME = "Client Name";
  CONTACT_NAME = "Contact Name";
  EMAIL_ID = "Email ID";
  CONTACT_NO = "Contact No";
  PAN_NUMBER = "Pan Number";
  AADHAR_NUMBER = "Aadhar Number";
  GST_NUMBER = "GST Number";
  STATE_NAME = "State Name";
  CITY_NAME = "City Name";
  REMARK = "Remark";


  // Vehicle form labels
  BRAND_NAME = "Brand Name";
  VEHICLE_TYPE = "Vehicle Type";
  ICON = "Icon";
  
  // Validation messages
  REQUIRED_FIELD = "This field is required";
  INVALID_IP_FORMAT = "Invalid IP Address format";
  INVALID_PORT_RANGE = "Port must be between 1 and 65535";
  INVALID_EMAIL_FORMAT = "Invalid email format";
  INVALID_CONTACT_FORMAT = "Invalid contact number format";
  INVALID_PAN_FORMAT = "Invalid PAN format";
  INVALID_AADHAR_FORMAT = "Invalid Aadhar format";
  INVALID_GST_FORMAT = "Invalid GST format";
}

let strings = new StringConstants();
export default strings;