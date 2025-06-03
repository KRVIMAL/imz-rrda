export class UrlConstants {

  baseURL="https://api-dev.k8s.imztech.io/api/v1/backend-admin/";
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
}
let urls = new UrlConstants();
export default urls;
