export class UrlConstants {
  landingViewPath = "/";

  // Device URLs
  devicesViewPath = "/devices";
  addDeviceViewPath = `${this.devicesViewPath}/add`;
  editDeviceViewPath = `${this.devicesViewPath}/edit`; 

  // Client URLs
  clientsViewPath = "/clients";
  addClientViewPath = `${this.clientsViewPath}/add`;
  editClientViewPath = `${this.clientsViewPath}/edit`;

  // Vehicle URLs
  vehiclesViewPath = "/vehicles";
  addVehicleViewPath = `${this.vehiclesViewPath}/add`;
  editVehicleViewPath = `${this.vehiclesViewPath}/edit`;
}
let urls = new UrlConstants();
export default urls;
