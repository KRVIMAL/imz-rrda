// src/components/Sidebar.tsx - Updated with theme support
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiMap,
  // FiBarChart3,
  FiAlertTriangle,
  FiSettings,
  FiUsers,
  FiFileText,
  FiMenu,
  FiX,
  FiGrid,
  FiHardDrive,
} from "react-icons/fi";

const sidebarItems = [
  { name: "Dashboard", href: "/", icon: FiHome },
  { name: "Map View", href: "/map", icon: FiMap },
  { name: "Style Guide", href: "/styleguide", icon: FiUsers },
  { name: "Analytics", href: "/analytics", icon: FiMap },
  { name: "Select Demo", href: "/selectdemo", icon: FiFileText },
  { name: "Input Demo", href: "/inputdemo", icon: FiFileText },
  { name: "Table Demo", href: "/table-demo", icon: FiGrid },
  { name: "Devices", href: "/devices", icon: FiHardDrive },
  { name: "Vehicles", href: "/vehicles", icon: FiUsers },
  { name: "Drivers", href: "/drivers", icon: FiHardDrive },
  { name: "Clients", href: "/clients", icon: FiUsers },
  { name: "Vehicles Master", href: "/vehicle-masters", icon: FiUsers },
  { name: "Reports", href: "/reports", icon: FiFileText },
  { name: "Alerts", href: "/alerts", icon: FiAlertTriangle },
  { name: "Users", href: "/users", icon: FiUsers },
  { name: "Settings", href: "/settings", icon: FiSettings },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <div
      className={`bg-gray-900 text-white min-h-screen fixed left-0 top-16 z-fixed transition-all duration-normal ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-md">
        {/* Toggle Button */}
        <div className="flex justify-end mb-md">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-300 hover:text-white p-1 rounded-md hover:bg-gray-700 transition-colors duration-fast"
          >
            {isCollapsed ? (
              <FiMenu className="h-5 w-5" />
            ) : (
              <FiX className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active" : ""}`
              }
              title={isCollapsed ? item.name : ""}
            >
              <item.icon
                className={`h-5 w-5 ${isCollapsed ? "mx-auto" : "mr-3"}`}
              />
              <span
                className={`transition-opacity duration-normal ${
                  isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                }`}
              >
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
