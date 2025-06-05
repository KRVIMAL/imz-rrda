export class StringConstants {
  // Modules
  DEVICE = "DEVICE";
  VEHICLE = "VEHICLE";
  DRIVER = "DRIVER";
  CLIENT = "CLIENT";
  TRANSPORTER = "TRANSPORTER";
  CONTRACTOR = "CONTRACTOR";
  VEHICLE_MASTERS = "Vehicle Masters";
  VEHICLE_MASTER = "VEHICLE_MASTER";
  DEVICE_ONBOARDING_MODULE = "DEVICE_ONBOARDING"; // Module identifier
  GROUPS_MODULE = "GROUPS";
  GROUP_MODULES_MODULE = "GROUP_MODULES";  // ADD THIS (replaces GROUPS_MODULE)
  ROLES_MODULE = "ROLES";
  ACCOUNTS_MODULE = "ACCOUNTS";
  USERS_MODULE = "USERS";
   ROAD_MASTER_MODULE = "ROAD_MASTER";  

  // Navigation
  HOME = "Home";
  DEVICES = "Devices";
  VEHICLES = "Vehicles";
  DRIVERS = "Drivers";
  CLIENTS = "Clients";
  TRANSPORTERS = "Transporters";
  CONTRACTORS = "Contractors";
  DEVICE_ONBOARDING = "Device On-boarding";
  GROUPS = "Groups";  // Keep old for backward compatibility
  GROUP_MODULES = "Group Modules";
  GROUP_MASTERS="Group Masters"
  ROLES = "Roles";
  ACCOUNTS = "Accounts";
  USERS = "Users";
  ROAD_MASTER = "Road Master";  


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
  EXPORT = "Export";  // ADD THIS



  // Device specific
  ADD_DEVICE = "Add Device";
  UPDATE_DEVICE = "Update Device";
  EDIT_DEVICE = "Edit Device";

  // Driver specific
  ADD_DRIVER = "Add Driver";
  UPDATE_DRIVER = "Update Driver";
  EDIT_DRIVER = "Edit Driver";

  // Vehicle Master specific
  ADD_VEHICLE_MASTER = "Add Vehicle Master";
  UPDATE_VEHICLE_MASTER = "Update Vehicle Master";
  EDIT_VEHICLE_MASTER = "Edit Vehicle Master";

  // Device On-boarding specific
  ADD_DEVICE_ONBOARDING = "Add Device On-boarding";
  UPDATE_DEVICE_ONBOARDING = "Update Device On-boarding";
  EDIT_DEVICE_ONBOARDING = "Edit Device On-boarding";

// Groups specific (old)
  ADD_GROUP = "Add Group";
  UPDATE_GROUP = "Update Group";
  EDIT_GROUP = "Edit Group";

  // Group Modules specific - ADD THESE (new)
  ADD_GROUP_MODULE = "Add Group Module";
  UPDATE_GROUP_MODULE = "Update Group Module";
  EDIT_GROUP_MODULE = "Edit Group Module";


  ADD_GROUP_MASTER = "Add Group Master";
  UPDATE_GROUP_MASTER = "Update Group Master";
  EDIT_GROUP_MASTER = "Edit Group Master";


  // Users specific 
  ADD_USER = "Add User";
  UPDATE_USER = "Update User";
  EDIT_USER = "Edit User";

   // Road Master specific - ADD THESE (Read-only module, no add/edit)
  VIEW_ROAD_MASTER = "View Road Master";
  EXPORT_ROAD_MASTER = "Export Road Master";

  // Roles specific
  ADD_ROLE = "Add Role";
  UPDATE_ROLE = "Update Role";
  EDIT_ROLE = "Edit Role";

  // Accounts specific
  ADD_ACCOUNT = "Add Account";
  UPDATE_ACCOUNT = "Update Account";
  EDIT_ACCOUNT = "Edit Account";

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

  // Driver form labels
  DRIVER_NAME = "Driver Name";
  DRIVER_CONTACT_NO = "Contact No";
  DRIVER_EMAIL = "Email";
  DRIVER_LICENSE_NO = "License No";
  DRIVER_ADHAR_NO = "Aadhar No";

  // Vehicle Master form labels
  VEHICLE_NUMBER = "Vehicle Number";
  CHASSIS_NUMBER = "Chassis Number";
  ENGINE_NUMBER = "Engine Number";
  VEHICLE_MODEL_NAME = "Vehicle Model";
  DRIVER_SELECTION = "Driver Selection";

  // Device On-boarding form labels
  ACCOUNT_NAME = "Account Name";
  DEVICE_IMEI = "Device IMEI";
  DEVICE_SERIAL_NO = "Device Serial No";
  SIM_NO_1 = "SIM No 1";
  SIM_NO_2 = "SIM No 2";
  SIM_NO_1_OPERATOR = "SIM No 1 Operator";
  SIM_NO_2_OPERATOR = "SIM No 2 Operator";
  VEHICLE_DESCRIPTION = "Vehicle Description";

// Groups form labels (old)
  GROUP_NAME = "Group Name";
  GROUP_TYPE = "Group Type";
  SELECT_ASSET_IMEI = "Select Asset/IMEI";
  // STATE_NAME = "State Name";
  // CITY_NAME = "City Name";
  // REMARK = "Remark";
  // CONTACT_NO = "Contact No";

  // Group Modules form labels - ADD THESE (new, simpler)
  // GROUP_TYPE = "Group Type";  // Already exists above
  // STATE_NAME = "State Name";  // Already exists above
  // CITY_NAME = "City Name";    // Already exists above
  // REMARK = "Remark";          // Already exists above
  // CONTACT_NO = "Contact No";  // Already exists above

  GROUP_MODULE = "Group Module"

  // Users form labels - ADD THESE
  SELECT_ACCOUNT_OR_GROUP = "Select Account or Group";
  USERNAME = "Username";
  FIRST_NAME = "First Name";
  MIDDLE_NAME = "Middle Name";
  LAST_NAME = "Last Name";
  EMAIL = "Email";
  PASSWORD = "Password";
  USER_ROLE = "User Role";

  // Roles form labels
  ROLE_NAME = "Role Name";
  DISPLAY_NAME = "Display Name";
  DESCRIPTION = "Description";
  MODULE_PERMISSIONS = "Module Permissions";
  USER_ROLE_TYPE = "User Role Type";

  // Accounts form labels - ADD THESE
  PARENT_ACCOUNT = "Parent Account";
  CLIENT_SELECTION = "Client Selection";

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
  INVALID_LICENSE_FORMAT = "Invalid license format";
  INVALID_IMEI_FORMAT = "IMEI should be 15-17 characters";
  INVALID_PASSWORD_LENGTH = "Password must be at least 6 characters";

  // Road Master labels - ADD THESE
  DISTRICT_NAME = "District Name";
  SCHEME_TYPE = "Scheme Type";
  PACKAGE_NO = "Package No";
  ROAD_CODE = "Road Code";
  ROAD_NAME = "Road Name";
  PIU_NAME = "PIU Name";
  CONTRACTOR_NAME = "Contractor Name";
  NO_OF_DEVICES = "No. of Devices";
  WORK_STAGE = "Work Stage";
  DEVICE_INSTALLATION_STATUS = "Device Installation Status";
  KML_DATA_STATUS = "KML Data Status";
  SANCTION_DATE = "Sanction Date";
  SANCTION_LENGTH = "Sanction Length";
  ACTIVITY_NAME = "Activity Name";
  ACTIVITY_QUANTITY = "Activity Quantity";
  ACTIVITY = "Activity";
  ACTUAL_ACTIVITY_START_DATE = "Actual Activity Start Date";
  ACTIVITY_COMPLETION_DATE = "Activity Completion Date";
  ACTUAL_ACTIVITY_COMPLETION_DATE = "Actual Activity Completion Date";
  AWARD_DATE = "Award Date";
  COMPLETED_ROAD_LENGTH = "Completed Road Length";
  COMPLETION_DATE = "Completion Date";
  EXECUTED_QUANTITY = "Executed Quantity";
  PIMS_FINALIZE_DATE = "PIMS Finalize Date";

}

let strings = new StringConstants();
export default strings;
