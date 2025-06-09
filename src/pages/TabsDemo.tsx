// src/pages/TabsDemo.tsx - Complete usage examples for all tab patterns

import React, { useState } from "react";
// import Tabs, { TabItem, TabPanel, TabGroup } from "../components/ui/Tabs";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import CustomInput from "../components/ui/CustomInput";
import {
  FiUser,
  FiSettings,
  FiShield,
  FiBell,
  FiHome,
  FiFile,
} from "react-icons/fi";
import Tabs, { TabGroup, TabItem, TabPanel } from "../components/ui/Tabs";

const TabsDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // ==============================================
  // PATTERN 1: MAIN TABS COMPONENT (RECOMMENDED)
  // ==============================================

  // Simple tabs data
  const basicTabs: TabItem[] = [
    {
      id: "profile",
      label: "Profile",
      icon: FiUser,
      content: (
        <TabPanel>
          <h3 className="text-heading-3 text-text-primary mb-md">
            Profile Settings
          </h3>
          <div className="space-y-md">
            <CustomInput label="Full Name" placeholder="John Doe" />
            <CustomInput
              label="Email"
              type="email"
              placeholder="john@example.com"
            />
            <CustomInput
              label="Phone"
              type="tel"
              placeholder="(555) 123-4567"
            />
          </div>
          <Button variant="primary" className="mt-lg">
            Save Profile
          </Button>
        </TabPanel>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      icon: FiSettings,
      badge: "3",
      content: (
        <TabPanel>
          <h3 className="text-heading-3 text-text-primary mb-md">
            Application Settings
          </h3>
          <div className="space-y-md">
            <div className="flex items-center justify-between p-md bg-theme-tertiary rounded-md">
              <span className="text-body text-text-primary">
                Email Notifications
              </span>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between p-md bg-theme-tertiary rounded-md">
              <span className="text-body text-text-primary">Dark Mode</span>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </TabPanel>
      ),
    },
    {
      id: "security",
      label: "Security",
      icon: FiShield,
      content: (
        <TabPanel>
          <h3 className="text-heading-3 text-text-primary mb-md">
            Security Settings
          </h3>
          <div className="space-y-md">
            <CustomInput label="Current Password" type="password" />
            <CustomInput label="New Password" type="password" />
            <CustomInput label="Confirm Password" type="password" />
          </div>
          <Button variant="primary" className="mt-lg">
            Update Password
          </Button>
        </TabPanel>
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: FiBell,
      disabled: true, // This tab is disabled
      content: (
        <TabPanel>
          <p>Notifications settings coming soon...</p>
        </TabPanel>
      ),
    },
  ];

  return (
    <div className="space-y-xl">
      <div>
        <h1 className="text-heading-1 text-text-primary mb-md">
          Tabs Component Demo
        </h1>
        <p className="text-body text-text-secondary">
          Multiple patterns for creating tabs in your application.
        </p>
      </div>

      {/* ==============================================
          PATTERN 1: MAIN TABS COMPONENT (MOST COMMON)
          ============================================== */}
      <Card>
        <Card.Header>
          <h2 className="text-heading-2 text-text-primary">
            Pattern 1: Main Tabs Component
          </h2>
          <p className="text-body-small text-text-secondary mt-sm">
            Complete tabs solution with all features built-in.{" "}
            <strong>This is the recommended approach.</strong>
          </p>
        </Card.Header>
        <Card.Body>
          {/* Basic Usage */}
          <div className="mb-xl">
            <h3 className="text-heading-3 text-text-primary mb-md">
              Basic Usage
            </h3>
            <Tabs
              tabs={basicTabs}
              defaultActiveTab="profile"
              onTabChange={(tabId) => console.log("Tab changed to:", tabId)}
            />
          </div>

          {/* Different Variants */}
          <div className="space-y-xl">
            <div>
              <h3 className="text-heading-3 text-text-primary mb-md">
                Variant: Pills
              </h3>
              <Tabs
                tabs={basicTabs.slice(0, 3)}
                variant="pills"
                defaultActiveTab="profile"
              />
            </div>

            <div>
              <h3 className="text-heading-3 text-text-primary mb-md">
                Variant: Cards
              </h3>
              <Tabs
                tabs={basicTabs.slice(0, 3)}
                variant="cards"
                defaultActiveTab="settings"
              />
            </div>

            <div>
              <h3 className="text-heading-3 text-text-primary mb-md">
                Variant: Minimal
              </h3>
              <Tabs
                tabs={basicTabs.slice(0, 3)}
                variant="minimal"
                defaultActiveTab="security"
              />
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Controlled Tabs Example */}
      <Card>
        <Card.Header>
          <h2 className="text-heading-2 text-text-primary">Controlled Tabs</h2>
          <p className="text-body-small text-text-secondary mt-sm">
            When you need to control the active tab from parent component.
          </p>
        </Card.Header>
        <Card.Body>
          <div className="mb-md">
            <p className="text-body text-text-secondary mb-md">
              Current active tab: <strong>{activeTab}</strong>
            </p>
            <div className="flex space-x-md mb-lg">
              <Button size="sm" onClick={() => setActiveTab("profile")}>
                Go to Profile
              </Button>
              <Button size="sm" onClick={() => setActiveTab("settings")}>
                Go to Settings
              </Button>
              <Button size="sm" onClick={() => setActiveTab("security")}>
                Go to Security
              </Button>
            </div>
          </div>

          <Tabs
            tabs={basicTabs.slice(0, 3)}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant="underlined"
          />
        </Card.Body>
      </Card>

      {/* Vertical Tabs */}
      <Card>
        <Card.Header>
          <h2 className="text-heading-2 text-text-primary">Vertical Tabs</h2>
        </Card.Header>
        <Card.Body>
          <Tabs
            tabs={basicTabs.slice(0, 3)}
            orientation="vertical"
            defaultActiveTab="profile"
            variant="pills"
          />
        </Card.Body>
      </Card>

      {/* ==============================================
          PATTERN 2: COMPOUND COMPONENTS (ADVANCED)
          ============================================== */}
      <Card>
        <Card.Header>
          <h2 className="text-heading-2 text-text-primary">
            Pattern 2: Compound Components
          </h2>
          <p className="text-body-small text-text-secondary mt-sm">
            More flexible but requires more code. Use when you need custom
            layouts.
          </p>
        </Card.Header>
        <Card.Body>
          <TabGroup className="space-y-lg">
            <TabGroup.List>
              <TabGroup.Tab onClick={() => console.log("Dashboard clicked")}>
                <FiHome className="w-4 h-4 mr-2" />
                Dashboard
              </TabGroup.Tab>
              <TabGroup.Tab>
                <FiFile className="w-4 h-4 mr-2" />
                Reports
              </TabGroup.Tab>
              <TabGroup.Tab disabled>
                <FiSettings className="w-4 h-4 mr-2" />
                Settings (Disabled)
              </TabGroup.Tab>
            </TabGroup.List>

            <TabGroup.Panels>
              <TabGroup.Panel>
                <div className="p-lg bg-theme-tertiary rounded-md">
                  <h3 className="text-heading-3 text-text-primary mb-md">
                    Dashboard Content
                  </h3>
                  <p className="text-body text-text-secondary">
                    This is the dashboard content using compound components
                    pattern.
                  </p>
                </div>
              </TabGroup.Panel>
            </TabGroup.Panels>
          </TabGroup>
        </Card.Body>
      </Card>

      {/* Advanced Features */}
      <Card>
        <Card.Header>
          <h2 className="text-heading-2 text-text-primary">
            Advanced Features
          </h2>
        </Card.Header>
        <Card.Body>
          <div className="space-y-xl">
            {/* Full Width */}
            <div>
              <h3 className="text-heading-3 text-text-primary mb-md">
                Full Width Tabs
              </h3>
              <Tabs tabs={basicTabs.slice(0, 3)} fullWidth variant="pills" />
            </div>

            {/* Different Sizes */}
            <div>
              <h3 className="text-heading-3 text-text-primary mb-md">
                Different Sizes
              </h3>
              <div className="space-y-lg">
                <div>
                  <h4 className="text-body font-medium text-text-primary mb-sm">
                    Small
                  </h4>
                  <Tabs tabs={basicTabs.slice(0, 3)} size="sm" />
                </div>
                <div>
                  <h4 className="text-body font-medium text-text-primary mb-sm">
                    Large
                  </h4>
                  <Tabs tabs={basicTabs.slice(0, 3)} size="lg" />
                </div>
              </div>
            </div>

            {/* Lazy Loading */}
            <div>
              <h3 className="text-heading-3 text-text-primary mb-md">
                Lazy Loading
              </h3>
              <p className="text-body-small text-text-secondary mb-md">
                Only renders the active tab content (better performance for
                heavy content).
              </p>
              <Tabs tabs={basicTabs.slice(0, 3)} lazy={true} variant="cards" />
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Usage Code Examples */}
      <Card>
        <Card.Header>
          <h2 className="text-heading-2 text-text-primary">Code Examples</h2>
        </Card.Header>
        <Card.Body>
          <div className="space-y-lg">
            <div>
              <h3 className="text-heading-3 text-text-primary mb-md">
                1. Basic Usage (Recommended)
              </h3>
              <pre className="bg-theme-tertiary p-md rounded-md text-caption text-text-secondary overflow-auto">
                {`import Tabs, { TabItem } from '../components/ui/Tabs';

const tabs: TabItem[] = [
  {
    id: 'tab1',
    label: 'Tab 1',
    icon: FiUser,
    content: <div>Content for tab 1</div>
  },
  {
    id: 'tab2', 
    label: 'Tab 2',
    badge: '5',
    content: <div>Content for tab 2</div>
  }
];

<Tabs 
  tabs={tabs}
  defaultActiveTab="tab1"
  variant="underlined"
  onTabChange={(id) => console.log(id)}
/>`}
              </pre>
            </div>

            <div>
              <h3 className="text-heading-3 text-text-primary mb-md">
                2. Compound Components (Advanced)
              </h3>
              <pre className="bg-theme-tertiary p-md rounded-md text-caption text-text-secondary overflow-auto">
                {`import { TabGroup } from '../components/ui/Tabs';

<TabGroup>
  <TabGroup.List>
    <TabGroup.Tab>Tab 1</TabGroup.Tab>
    <TabGroup.Tab>Tab 2</TabGroup.Tab>
  </TabGroup.List>
  <TabGroup.Panels>
    <TabGroup.Panel>
      Content 1
    </TabGroup.Panel>
  </TabGroup.Panels>
</TabGroup>`}
              </pre>
            </div>

            <div>
              <h3 className="text-heading-3 text-text-primary mb-md">
                3. TabPanel Helper
              </h3>
              <pre className="bg-theme-tertiary p-md rounded-md text-caption text-text-secondary overflow-auto">
                {`import { TabPanel } from '../components/ui/Tabs';

// Use TabPanel for consistent spacing in tab content
content: (
  <TabPanel>
    <h3>Title</h3>
    <p>Content with consistent spacing</p>
    <Button>Action</Button>
  </TabPanel>
)`}
              </pre>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TabsDemo;
