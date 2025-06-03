import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard.pages";
import MapView from "./pages/MapView";
import Analytics from "./pages/analytics.pages";
import StyleGuide from "./pages/StyleGuide";
import ProtectedRoute from "./components/protectedRoute.components";
import Layout from "./components/layout.components";
import SelectDemo from "./pages/SelectDemo";
import InputDemo from "./pages/InputDemo";
import DataTableDemo from "./pages/data-table-demo.pages";
import Devices from "./pages/modules/device/devices";
import AddDeviceForm from "./pages/modules/device/add-device/add-device-form";
import Clients from "./pages/modules/client/clients";
import AddClientForm from "./pages/modules/client/add-client/add-client-form";
import { Toaster } from "react-hot-toast";
import Vehicles from "./pages/modules/vehicle/vehicles";
import AddEditVehicleForm from "./pages/modules/vehicle/add-vehicle/add-vehicle-form";
import Drivers from "./pages/masters/driver/Drivers";
import AddEditDriverForm from "./pages/masters/driver/add-driver/add-driver-form";
import VehicleMasters from "./pages/masters/vehicle-masters/VehicleMasters";
import AddEditVehicleMasterForm from "./pages/masters/vehicle-masters/add-vehicle-master/AddEditVehicleMasterForm";
import DeviceOnboarding from "./pages/modules/device-onboarding/device-onboarding";
import AddEditDeviceOnboardingForm from "./pages/modules/device-onboarding/add-device-onboarding/add-device-onboarding-form";
function App() {
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
                      <Route path="/map" element={<MapView />} />
                      <Route path="/styleguide" element={<StyleGuide />} />
                      <Route path="/analytics" element={<Analytics />} />
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
                        path="/users"
                        element={
                          <div className="card card-body">Users Page</div>
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
