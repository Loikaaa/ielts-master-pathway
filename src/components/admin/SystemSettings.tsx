
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Settings, Bell, Globe, Shield, Database, ServerCog } from 'lucide-react';
import MaintenanceSettings from './MaintenanceSettings';
import AnalyticsSettings from './AnalyticsSettings';
import AdminCredentialsSettings from './AdminCredentialsSettings';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">System Settings</h2>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 mb-6">
          <TabsTrigger value="general" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Admin</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center">
            <ServerCog className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Maintenance</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center">
            <Database className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Database</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <h3 className="text-lg font-medium">General Settings</h3>
          <p className="text-muted-foreground">Configure general application settings.</p>
          
          <div className="bg-muted/50 p-6 rounded-lg">
            <p className="text-center text-muted-foreground">General settings will be implemented soon.</p>
          </div>
        </TabsContent>

        <TabsContent value="admin" className="space-y-4">
          <h3 className="text-lg font-medium">Administrator Settings</h3>
          <p className="text-muted-foreground">Manage administrator accounts and access.</p>
          
          <AdminCredentialsSettings />
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <h3 className="text-lg font-medium">Maintenance Mode</h3>
          <p className="text-muted-foreground">Configure maintenance mode settings for your application.</p>
          
          <MaintenanceSettings />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <h3 className="text-lg font-medium">Notification Settings</h3>
          <p className="text-muted-foreground">Configure notification preferences.</p>
          
          <div className="bg-muted/50 p-6 rounded-lg">
            <p className="text-center text-muted-foreground">Notification settings will be implemented soon.</p>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <h3 className="text-lg font-medium">Analytics & Tracking</h3>
          <p className="text-muted-foreground">Configure analytics and user tracking settings.</p>
          
          <AnalyticsSettings />
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <h3 className="text-lg font-medium">Database Settings</h3>
          <p className="text-muted-foreground">Configure database connection settings.</p>
          
          <div className="bg-muted/50 p-6 rounded-lg">
            <p className="text-center text-muted-foreground">Database settings will be implemented soon.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
