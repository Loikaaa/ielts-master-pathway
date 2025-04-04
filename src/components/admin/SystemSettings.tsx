
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Settings, RefreshCw, Save, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import SecuritySettings from './SecuritySettings';
import IntegrationsSettings from './IntegrationsSettings';
import PaymentGatewaySettings from './PaymentGatewaySettings';
import EmailTemplatesSettings from './EmailTemplatesSettings';
import AnalyticsSettings from './AnalyticsSettings';
import MaintenanceSettings from '@/components/admin/MaintenanceSettings';
import { getSettings } from '@/utils/settingsStorage';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('security');
  const [isLoading, setIsLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    security: false,
    integrations: false,
    payment: false,
    email: false,
    analytics: false,
    maintenance: false
  });

  useEffect(() => {
    // Load system status from settings
    checkSystemStatus();
  }, []);

  const checkSystemStatus = () => {
    const settings = getSettings() || {};
    
    setSystemStatus({
      security: settings.security?.lastUpdated ? true : false,
      integrations: settings.integrations?.configured ? true : false,
      payment: settings.paymentGateways?.stripe?.lastVerified || settings.paymentGateways?.paypal?.lastVerified ? true : false,
      email: settings.email?.connected ? true : false,
      analytics: settings.analytics?.enabled ? true : false,
      maintenance: settings.maintenance ? true : false
    });
  };

  const handleExportSettings = () => {
    try {
      // Get all settings
      const settings = localStorage.getItem('settings');
      if (!settings) {
        toast.error('No settings found to export');
        return;
      }
      
      // Filter out sensitive information before exporting
      const parsedSettings = JSON.parse(settings);
      
      // Remove passwords and keys before exporting
      const sanitizedSettings = { ...parsedSettings };
      
      // Sanitize database credentials
      if (sanitizedSettings.database) {
        sanitizedSettings.database = {
          ...sanitizedSettings.database,
          password: sanitizedSettings.database.password ? '[REDACTED]' : undefined
        };
      }
      
      // Sanitize payment gateway credentials
      if (sanitizedSettings.paymentGateways) {
        if (sanitizedSettings.paymentGateways.stripe) {
          sanitizedSettings.paymentGateways.stripe = {
            ...sanitizedSettings.paymentGateways.stripe,
            liveSecretKey: sanitizedSettings.paymentGateways.stripe.liveSecretKey ? '[REDACTED]' : undefined,
            testSecretKey: sanitizedSettings.paymentGateways.stripe.testSecretKey ? '[REDACTED]' : undefined,
            webhookSecret: sanitizedSettings.paymentGateways.stripe.webhookSecret ? '[REDACTED]' : undefined
          };
        }
        
        if (sanitizedSettings.paymentGateways.paypal) {
          sanitizedSettings.paymentGateways.paypal = {
            ...sanitizedSettings.paymentGateways.paypal,
            clientSecret: sanitizedSettings.paymentGateways.paypal.clientSecret ? '[REDACTED]' : undefined
          };
        }
      }
      
      // Sanitize email credentials
      if (sanitizedSettings.email) {
        sanitizedSettings.email = {
          ...sanitizedSettings.email,
          password: sanitizedSettings.email.password ? '[REDACTED]' : undefined
        };
      }
      
      // Create a blob and download it
      const blob = new Blob([JSON.stringify(sanitizedSettings, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `system-settings-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Settings exported successfully (sensitive data redacted)');
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
          
          // Get existing settings to merge with imported ones
          const existingSettings = getSettings() || {};
          
          // Don't overwrite sensitive data if not provided in import
          if (parsedSettings.database && parsedSettings.database.password === '[REDACTED]' && existingSettings.database) {
            parsedSettings.database.password = existingSettings.database.password;
          }
          
          if (parsedSettings.paymentGateways) {
            if (parsedSettings.paymentGateways.stripe) {
              if (parsedSettings.paymentGateways.stripe.liveSecretKey === '[REDACTED]' && existingSettings.paymentGateways?.stripe) {
                parsedSettings.paymentGateways.stripe.liveSecretKey = existingSettings.paymentGateways.stripe.liveSecretKey;
              }
              if (parsedSettings.paymentGateways.stripe.testSecretKey === '[REDACTED]' && existingSettings.paymentGateways?.stripe) {
                parsedSettings.paymentGateways.stripe.testSecretKey = existingSettings.paymentGateways.stripe.testSecretKey;
              }
              if (parsedSettings.paymentGateways.stripe.webhookSecret === '[REDACTED]' && existingSettings.paymentGateways?.stripe) {
                parsedSettings.paymentGateways.stripe.webhookSecret = existingSettings.paymentGateways.stripe.webhookSecret;
              }
            }
            
            if (parsedSettings.paymentGateways.paypal && parsedSettings.paymentGateways.paypal.clientSecret === '[REDACTED]' && existingSettings.paymentGateways?.paypal) {
              parsedSettings.paymentGateways.paypal.clientSecret = existingSettings.paymentGateways.paypal.clientSecret;
            }
          }
          
          if (parsedSettings.email && parsedSettings.email.password === '[REDACTED]' && existingSettings.email) {
            parsedSettings.email.password = existingSettings.email.password;
          }
          
          // Store settings
          localStorage.setItem('settings', JSON.stringify(parsedSettings));
          
          // Update system status
          checkSystemStatus();
          
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
      setSystemStatus({
        security: false,
        integrations: false,
        payment: false,
        email: false,
        analytics: false,
        maintenance: false
      });
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
        <div className="mb-4">
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <AlertTitle>System Status</AlertTitle>
            <AlertDescription>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                <div className={`text-sm ${systemStatus.security ? 'text-green-600' : 'text-gray-500'}`}>
                  Security: {systemStatus.security ? 'Configured' : 'Not Set'}
                </div>
                <div className={`text-sm ${systemStatus.integrations ? 'text-green-600' : 'text-gray-500'}`}>
                  Integrations: {systemStatus.integrations ? 'Configured' : 'Not Set'}
                </div>
                <div className={`text-sm ${systemStatus.payment ? 'text-green-600' : 'text-gray-500'}`}>
                  Payment: {systemStatus.payment ? 'Connected' : 'Not Set'}
                </div>
                <div className={`text-sm ${systemStatus.email ? 'text-green-600' : 'text-gray-500'}`}>
                  Email: {systemStatus.email ? 'Connected' : 'Not Set'}
                </div>
                <div className={`text-sm ${systemStatus.analytics ? 'text-green-600' : 'text-gray-500'}`}>
                  Analytics: {systemStatus.analytics ? 'Enabled' : 'Disabled'}
                </div>
                <div className={`text-sm ${systemStatus.maintenance ? 'text-orange-500' : 'text-gray-500'}`}>
                  Maintenance: {systemStatus.maintenance ? 'Scheduled' : 'Off'}
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
        
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
