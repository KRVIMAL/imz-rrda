export class UrlConstants {

  baseURL=import.meta.env.VITE_API_BASE_URL_LOCAL;
  landingViewPath = "/";

  // Device URLs
  devicesViewPath = "/devices";
  addDeviceViewPath = `${this.devicesViewPath}/add`;
  editDeviceViewPath = `${this.devicesViewPath}/edit`; 

  // Client URLs
  clientsViewPath = "/clients";
  addClientViewPath = `${this.clientsViewPath}/add`;
  editClientViewPath = `${this.clientsViewPath}/edit`;


  // Driver URLs
  driversViewPath = "/drivers";
  addDriverViewPath = `${this.driversViewPath}/add`;
  editDriverViewPath = `${this.driversViewPath}/edit`;

  // Vehicle URLs
  vehiclesViewPath = "/vehicles";
  addVehicleViewPath = `${this.vehiclesViewPath}/add`;
  editVehicleViewPath = `${this.vehiclesViewPath}/edit`;


  // Vehicle Master URLs 
  vehicleMastersViewPath = "/vehicle-masters";
  addVehicleMasterViewPath = `${this.vehicleMastersViewPath}/add`;
  editVehicleMasterViewPath = `${this.vehicleMastersViewPath}/edit`;


   // Device On-boarding URLs 
  deviceOnboardingViewPath = "/devices-onboarding";
  addDeviceOnboardingViewPath = `${this.deviceOnboardingViewPath}/add`;
  editDeviceOnboardingViewPath = `${this.deviceOnboardingViewPath}/edit`;


  // Groups URLs (old)
  groupsViewPath = "/groups";
  addGroupViewPath = `${this.groupsViewPath}/add`;
  editGroupViewPath = `${this.groupsViewPath}/edit`;

  // Group Module URLs - ADD THESE (new)
  groupModuleViewPath = "/group-master";  // Note: API endpoint is /group-master
  addGroupModuleViewPath = `${this.groupModuleViewPath}/add`;
  editGroupModuleViewPath = `${this.groupModuleViewPath}/edit`;


 groupMastersViewPath = "/group-master";  // Note: API endpoint is /group-master
  // addGroupModuleViewPath = `${this.groupModuleViewPath}/add`;
  // editGroupModuleViewPath = `${this.groupModuleViewPath}/edit`;

  // Users URLs - ADD THESE
  usersViewPath = "/users";
  addUserViewPath = `${this.usersViewPath}/add`;
  editUserViewPath = `${this.usersViewPath}/edit`;

    // Roles URLs - ADD THESE
  rolesViewPath = "/roles";
  addRoleViewPath = `${this.rolesViewPath}/add`;
  editRoleViewPath = `${this.rolesViewPath}/edit`;

  // Accounts URLs 
  accountsViewPath = "/accounts";
  addAccountViewPath = `${this.accountsViewPath}/add`;
  editAccountViewPath = `${this.accountsViewPath}/edit`;

}
let urls = new UrlConstants();
export default urls;
