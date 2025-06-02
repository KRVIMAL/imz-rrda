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
