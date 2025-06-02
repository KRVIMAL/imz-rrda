
export class UrlConstants {
  landingViewPath = "/";

  // Device URLs
  devicesViewPath = "/devices";
  addDeviceViewPath = `${this.devicesViewPath}/add`;
  editDeviceViewPath = `${this.devicesViewPath}/edit`;


   // Client URLs
  clientsViewPath = "/clients";
  addClientViewPath = `${this.clientsViewPath}/add`;
  editClientViewPath = `${this.clientsViewPath}/edit`
}
let urls = new UrlConstants();
export default urls;
