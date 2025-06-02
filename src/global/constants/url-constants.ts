
export class UrlConstants {
  landingViewPath = "/";
  devicesViewPath = "/devices";
  addDeviceViewPath = `${this.devicesViewPath}/add`;
  editDeviceViewPath = `${this.devicesViewPath}/edit`;

}
let urls = new UrlConstants();
export default urls;
