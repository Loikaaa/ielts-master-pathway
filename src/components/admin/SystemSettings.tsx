
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Settings, Bell, Globe, Shield, Database, ServerCog, Save, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import MaintenanceSettings from './MaintenanceSettings';
import AnalyticsSettings from './AnalyticsSettings';
import AdminCredentialsSettings from './AdminCredentialsSettings';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching last saved time from backend
    const savedTime = localStorage.getItem('system_settings_last_saved');
    if (savedTime) {
      setLastSaved(new Date(JSON.parse(savedTime)));
    }
  }, []);

  const handleSaveAllSettings = () => {
    setIsLoading(true);
    
    // Simulate saving to backend
    setTimeout(() => {
      const now = new Date();
      localStorage.setItem('system_settings_last_saved', JSON.stringify(now.toISOString()));
      setLastSaved(now);
      
      setIsLoading(false);
      toast({
        title: "Settings saved",
        description: "All system settings have been successfully saved.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">System Settings</h2>
          {lastSaved && (
            <p className="text-sm text-muted-foreground">
              Last saved: {lastSaved.toLocaleString()}
            </p>
          )}
        </div>
        <Button onClick={handleSaveAllSettings} disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save All Settings
            </>
          )}
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
          
          <Card className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Application Status</h4>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Active</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Last checked: {new Date().toLocaleString()}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Storage Usage</h4>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full w-1/4"></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Using approximately 25% of available storage
                  </p>
                </div>
              </div>
              <p className="text-center text-muted-foreground">Additional general settings will be implemented soon.</p>
            </div>
          </Card>
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
          
          <Card className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Email notification system status: <span className="text-amber-600 font-medium">Not configured</span>
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Push Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Push notification system status: <span className="text-amber-600 font-medium">Not configured</span>
                  </p>
                </div>
              </div>
              <p className="text-center text-muted-foreground">Additional notification settings will be implemented soon.</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <h3 className="text-lg font-medium">Analytics & Tracking</h3>
          <p className="text-muted-foreground">Configure analytics and user tracking settings.</p>
          
          <AnalyticsSettings />
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <h3 className="text-lg font-medium">Database Settings</h3>
          <p className="text-muted-foreground">Configure database connection settings.</p>
          
          <Card className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Database Type</h4>
                  <p className="text-sm">
                    <span className="font-medium">Local Storage</span> (Browser-based storage)
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Data is stored locally in the user's browser
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Connection Status</h4>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Connected</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Last verified: {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <Database className="h-4 w-4 mr-2" />
                  Configure External Database
                </Button>
              </div>
              <p className="text-center text-muted-foreground mt-4">Additional database configuration options will be implemented soon.</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
