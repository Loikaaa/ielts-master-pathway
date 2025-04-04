
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Settings, RefreshCw, Save } from 'lucide-react';
import { toast } from 'sonner';
import SecuritySettings from './SecuritySettings';
import IntegrationsSettings from './IntegrationsSettings';
import PaymentGatewaySettings from './PaymentGatewaySettings';
import EmailTemplatesSettings from './EmailTemplatesSettings';
import AnalyticsSettings from './AnalyticsSettings';
import MaintenanceSettings from '@/components/admin/MaintenanceSettings';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('security');
  const [isLoading, setIsLoading] = useState(false);

  const handleExportSettings = () => {
    try {
      const settings = localStorage.getItem('settings');
      if (!settings) {
        toast.error('No settings found to export');
        return;
      }
      
      // Create a blob and download it
      const blob = new Blob([settings], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `system-settings-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Settings exported successfully');
    } catch (error) {
      console.error('Error exporting settings:', error);
      toast.error('Failed to export settings');
    }
  };

  const handleImportSettings = () => {
    // Create file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      setIsLoading(true);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const parsedSettings = JSON.parse(content);
          
          // Validate settings
          if (typeof parsedSettings !== 'object') {
            throw new Error('Invalid settings format');
          }
          
          // Store settings
          localStorage.setItem('settings', content);
          
          toast.success('Settings imported successfully');
          toast.info('Please refresh the page to apply imported settings', {
            action: {
              label: 'Refresh',
              onClick: () => window.location.reload(),
            },
          });
        } catch (error) {
          console.error('Error importing settings:', error);
          toast.error('Failed to import settings: Invalid format');
        } finally {
          setIsLoading(false);
        }
      };
      
      reader.onerror = () => {
        toast.error('Failed to read the file');
        setIsLoading(false);
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all system settings? This action cannot be undone.')) {
      localStorage.removeItem('settings');
      toast.success('Settings reset successfully');
      toast.info('Please refresh the page to apply changes', {
        action: {
          label: 'Refresh',
          onClick: () => window.location.reload(),
        },
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          System Settings
        </CardTitle>
        <CardDescription>
          Configure global system settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="security" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="email">Email Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="integrations">
            <IntegrationsSettings />
          </TabsContent>
          
          <TabsContent value="payment">
            <PaymentGatewaySettings />
          </TabsContent>
          
          <TabsContent value="email">
            <EmailTemplatesSettings />
          </TabsContent>
          
          <TabsContent value="analytics">
            <AnalyticsSettings />
          </TabsContent>
          
          <TabsContent value="maintenance">
            <MaintenanceSettings />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleExportSettings}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            Export Settings
          </Button>
          <Button 
            variant="outline" 
            onClick={handleImportSettings}
            disabled={isLoading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Import Settings
          </Button>
        </div>
        <Button 
          variant="destructive" 
          onClick={handleReset}
        >
          Reset All Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SystemSettings;
