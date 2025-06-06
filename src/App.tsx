// App.tsx - Updated routing section
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard.pages";
import StyleGuide from "./pages/StyleGuide";
import ProtectedRoute from "./components/protectedRoute.components";
import Layout from "./components/layout.components";
import SelectDemo from "./pages/SelectDemo";
import InputDemo from "./pages/InputDemo";
import DataTableDemo from "./pages/data-table-demo.pages";
import Devices from "./pages/Modules/Devices/Devices";
import AddDeviceForm from "./pages/Modules/Devices/AddDevice/AddEditDeviceForm";
import Clients from "./pages/Modules/Clients/Clients";
import AddClientForm from "./pages/Modules/Clients/AddClient/AddEditClientForm";
import { Toaster } from "react-hot-toast";
import Vehicles from "./pages/Modules/Vehicles/Vehicles";
import AddEditVehicleForm from "./pages/Modules/Vehicles/AddVehicle/AddEditVehicleForm";
import Drivers from "./pages/Masters/Drivers/Drivers";
import AddEditDriverForm from "./pages/Masters/Drivers/AddDriver/AddEditDriverForm";
import VehicleMasters from "./pages/Masters/VehicleMaster/VehicleMasters";
import AddEditVehicleMasterForm from "./pages/Masters/VehicleMaster/AddVehicleMaster/AddEditVehicleMasterForm";
import DeviceOnboarding from "./pages/Modules/DeviceOnboardings/DeviceOnboarding";
import AddEditDeviceOnboardingForm from "./pages/Modules/DeviceOnboardings/AddDeviceOnboarding/AddEditDeviceOnboardingForm";

// Groups (Simple groups - Group Modules)
import Groups from "./pages/Modules/Groups/Groups";
import AddEditGroupForm from "./pages/Modules/Groups/AddEditGroupForm";

// Groups Master (Complex groups with IMEI)
import GroupsMaster from "./pages/Masters/GroupMaster/GroupsMaster";
import AddEditGroupsMasterForm from "./pages/Masters/GroupMaster/AddGroupsMaster/AddEditGroupsMasterForm";

import Roles from "./pages/Modules/Roles/Roles";
import AddEditRoleForm from "./pages/Modules/Roles/AddRole/AddEditRoleForm";
import Accounts from "./pages/Modules/Accounts/Accounts";
import AddEditAccountForm from "./pages/Modules/Accounts/AddAccount/AddEditAccountForm";
import Users from "./pages/Modules/Users/Users";
import AddEditUserForm from "./pages/Modules/Users/AddUser/AddEditUserForm";
import RoadMaster from "./pages/Masters/RoadMaster/RoadMaster";
import { useTokenExpiry } from "./hooks/useTokenExpiry";
function App() {
  useTokenExpiry();
  return (
    <ThemeProvider>
      <Toaster position="top-center" />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/styleguide" element={<StyleGuide />} />
                      <Route path="/selectDemo" element={<SelectDemo />} />
                      <Route path="/inputDemo" element={<InputDemo />} />
                      <Route path="/table-demo" element={<DataTableDemo />} />

                      {/* Device Module Routes */}
                      <Route path="/devices" element={<Devices />} />
                      <Route path="/devices/add" element={<AddDeviceForm />} />
                      <Route
                        path="/devices/edit/:id"
                        element={<AddDeviceForm />}
                      />

                      {/* Client Module Routes */}
                      <Route path="/clients" element={<Clients />} />
                      <Route path="/clients/add" element={<AddClientForm />} />
                      <Route
                        path="/clients/edit/:id"
                        element={<AddClientForm />}
                      />

                      {/* Vehicle Module Routes */}
                      <Route path="/vehicles" element={<Vehicles />} />
                      <Route
                        path="/vehicles/add"
                        element={<AddEditVehicleForm />}
                      />
                      <Route
                        path="/vehicles/edit/:id"
                        element={<AddEditVehicleForm />}
                      />

                      {/* Driver Master Routes */}
                      <Route path="/drivers" element={<Drivers />} />
                      <Route
                        path="/drivers/add"
                        element={<AddEditDriverForm />}
                      />
                      <Route
                        path="/drivers/edit/:id"
                        element={<AddEditDriverForm />}
                      />

                      {/* Vehicle Master Routes */}
                      <Route
                        path="/vehicle-masters"
                        element={<VehicleMasters />}
                      />
                      <Route
                        path="/vehicle-masters/add"
                        element={<AddEditVehicleMasterForm />}
                      />
                      <Route
                        path="/vehicle-masters/edit/:id"
                        element={<AddEditVehicleMasterForm />}
                      />

                      {/* Device onboarding module Routes */}
                      <Route
                        path="/devices-onboarding"
                        element={<DeviceOnboarding />}
                      />
                      <Route
                        path="/devices-onboarding/add"
                        element={<AddEditDeviceOnboardingForm />}
                      />
                      <Route
                        path="/devices-onboarding/edit/:id"
                        element={<AddEditDeviceOnboardingForm />}
                      />

                      {/* Groups Routes (Simple groups - Group Modules) */}
                      <Route path="/groups" element={<Groups />} />
                      <Route
                        path="/groups/add"
                        element={<AddEditGroupForm />}
                      />
                      <Route
                        path="/groups/edit/:id"
                        element={<AddEditGroupForm />}
                      />

                      {/* Groups Master Routes (Complex groups with IMEI) */}
                      <Route path="/groups-master" element={<GroupsMaster />} />
                      <Route
                        path="/groups-master/add"
                        element={<AddEditGroupsMasterForm />}
                      />
                      <Route
                        path="/groups-master/edit/:id"
                        element={<AddEditGroupsMasterForm />}
                      />

                      {/* Roles module Routes */}
                      <Route path="/roles" element={<Roles />} />
                      <Route path="/roles/add" element={<AddEditRoleForm />} />
                      <Route
                        path="/roles/edit/:id"
                        element={<AddEditRoleForm />}
                      />

                      {/* Accounts module Routes */}
                      <Route path="/accounts" element={<Accounts />} />
                      <Route
                        path="/accounts/add"
                        element={<AddEditAccountForm />}
                      />
                      <Route
                        path="/accounts/edit/:id"
                        element={<AddEditAccountForm />}
                      />

                      {/* Users module Routes */}
                      <Route path="/users" element={<Users />} />
                      <Route path="/users/add" element={<AddEditUserForm />} />
                      <Route
                        path="/users/edit/:id"
                        element={<AddEditUserForm />}
                      />

                      {/* Road Master Routes (Read-only) */}
                      <Route path="/roads" element={<RoadMaster />} />

                      {/* Other routes */}
                      <Route
                        path="/reports"
                        element={
                          <div className="card card-body">Reports Page</div>
                        }
                      />
                      <Route
                        path="/alerts"
                        element={
                          <div className="card card-body">Alerts Page</div>
                        }
                      />
                      <Route
                        path="/settings"
                        element={
                          <div className="card card-body">Settings Page</div>
                        }
                      />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
