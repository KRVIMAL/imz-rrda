// src/pages/Dashboard.tsx - Updated with theme support
import React from 'react';
import { FiUsers, FiMap, FiBarChart, FiAlertTriangle } from 'react-icons/fi';

const Dashboard: React.FC = () => {
  const stats = [
    { name: 'Total Devices', value: '1,234', icon: FiUsers, change: '+12%', changeType: 'positive' },
    { name: 'Active Projects', value: '56', icon: FiMap, change: '+5%', changeType: 'positive' },
    { name: 'Completion Rate', value: '85%', icon: FiBarChart, change: '+3%', changeType: 'positive' },
    { name: 'Alerts', value: '23', icon: FiAlertTriangle, change: '-2%', changeType: 'negative' },
  ];

  return (
    <div className="fade-in">
      <h1 className="text-heading-1 text-text-primary mb-lg">Dashboard</h1>
      
      <div className="grid-responsive mb-xl">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-md">
                  <p className="text-body-small font-medium text-text-muted">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-heading-2 text-text-primary">{stat.value}</p>
                    <p className={`ml-2 text-body-small font-medium ${
                      stat.changeType === 'positive' ? 'text-success-600' : 'text-error-600'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
        <div className="card">
          <div className="card-header">
            <h3 className="text-heading-3 text-text-primary">Recent Activity</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <p className="text-body-small text-text-secondary">
                    Device installation completed in Sector {i}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-heading-3 text-text-primary">Quick Actions</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              <button className="btn btn-primary w-full">
                Generate Report
              </button>
              <button className="btn btn-secondary w-full">
                View Map
              </button>
              <button className="btn btn-secondary w-full">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;