
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Clock, Database, SaveAll, ServerOff } from 'lucide-react';
import { toast } from 'sonner';
import { getSettings, saveMaintenanceSettings } from '@/utils/settingsStorage';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const MaintenanceSettings = () => {
  const [maintenanceConfig, setMaintenanceConfig] = useState({
    scheduledMaintenance: false,
    maintenanceMessage: 'System maintenance in progress. Please try again later.',
    backupFrequency: 'daily',
    retentionPeriod: 30,
    enableLogging: true,
    logLevel: 'info'
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load existing maintenance configuration
    const settings = getSettings();
    if (settings?.maintenance) {
      setMaintenanceConfig(prev => ({
        ...prev,
        ...settings.maintenance
      }));
    }
  }, []);

  const handleSwitchChange = (checked: boolean) => {
    setMaintenanceConfig(prev => ({
      ...prev,
      scheduledMaintenance: checked
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMaintenanceConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setMaintenanceConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMaintenanceConfig(prev => ({
      ...prev,
      [name]: parseInt(value, 10)
    }));
  };

  const handleSave = () => {
    setIsLoading(true);
    try {
      saveMaintenanceSettings(maintenanceConfig);
      toast.success('Maintenance settings saved successfully!');
      
      if (maintenanceConfig.scheduledMaintenance) {
        toast.info('Maintenance mode is now active. Users will see the maintenance page.');
      } else {
        toast.info('Maintenance mode has been disabled.');
      }
    } catch (error) {
      toast.error('Failed to save maintenance settings');
      console.error('Error saving maintenance settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ServerOff className="h-5 w-5 text-primary" />
          Maintenance Settings
        </CardTitle>
        <CardDescription>
          Configure system maintenance mode and backup settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {maintenanceConfig.scheduledMaintenance && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Maintenance Mode Active</AlertTitle>
            <AlertDescription>
              The site is currently in maintenance mode. Only administrators can access the site.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="maintenance-enabled" className="flex items-center gap-2">
            <ServerOff className="h-4 w-4" />
            Enable Maintenance Mode
          </Label>
          <Switch
            id="maintenance-enabled"
            checked={maintenanceConfig.scheduledMaintenance}
            onCheckedChange={handleSwitchChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
          <Textarea
            id="maintenanceMessage"
            name="maintenanceMessage"
            placeholder="Message to display during maintenance"
            value={maintenanceConfig.maintenanceMessage}
            onChange={handleInputChange}
            className="min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground">This message will be displayed to users during maintenance mode.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="backupFrequency" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Backup Frequency
            </Label>
            <Select 
              value={maintenanceConfig.backupFrequency}
              onValueChange={(value) => handleSelectChange('backupFrequency', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="retentionPeriod" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Retention Period (days)
            </Label>
            <Input
              id="retentionPeriod"
              name="retentionPeriod"
              type="number"
              value={maintenanceConfig.retentionPeriod}
              onChange={handleNumberChange}
              min="1"
              max="365"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="enableLogging">Enable Maintenance Logging</Label>
            <Switch
              id="enableLogging"
              checked={maintenanceConfig.enableLogging}
              onCheckedChange={(checked) => setMaintenanceConfig(prev => ({
                ...prev,
                enableLogging: checked
              }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logLevel">Log Level</Label>
            <Select 
              value={maintenanceConfig.logLevel}
              onValueChange={(value) => handleSelectChange('logLevel', value)}
              disabled={!maintenanceConfig.enableLogging}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select log level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warn">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="debug">Debug</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={isLoading} className="ml-auto">
          <SaveAll className="mr-2 h-4 w-4" />
          {isLoading ? 'Saving...' : 'Save Maintenance Settings'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MaintenanceSettings;
