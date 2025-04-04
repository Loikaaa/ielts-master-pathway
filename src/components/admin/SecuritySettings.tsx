
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Shield, Lock, Clock, Key, UserX, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { getSecuritySettings, saveSecuritySettings } from '@/utils/settingsStorage';

const SecuritySettings = () => {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordExpiry: 90,
    blockUnknownIPs: false
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load existing security settings
    const settings = getSecuritySettings();
    setSecuritySettings(settings);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: parseInt(value, 10) || value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSecuritySettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSave = () => {
    setIsLoading(true);
    try {
      saveSecuritySettings(securitySettings);
      toast.success('Security settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save security settings');
      console.error('Error saving security settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Security Configuration
        </CardTitle>
        <CardDescription>
          Configure application security settings and access controls
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="two-factor-auth" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Enable Two-Factor Authentication (2FA)
          </Label>
          <Switch
            id="two-factor-auth"
            checked={securitySettings.twoFactorAuth}
            onCheckedChange={(checked) => handleSwitchChange('twoFactorAuth', checked)}
          />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="block-unknown-ips" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Block Access from Unknown IP Addresses
          </Label>
          <Switch
            id="block-unknown-ips"
            checked={securitySettings.blockUnknownIPs}
            onCheckedChange={(checked) => handleSwitchChange('blockUnknownIPs', checked)}
          />
        </div>

        <div className="space-y-2 mt-4">
          <Label htmlFor="sessionTimeout" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Session Timeout (minutes)
          </Label>
          <Input
            id="sessionTimeout"
            name="sessionTimeout"
            type="number"
            min="1"
            max="120"
            value={securitySettings.sessionTimeout}
            onChange={handleInputChange}
          />
          <p className="text-xs text-muted-foreground">How long until an inactive session expires</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxLoginAttempts" className="flex items-center gap-2">
            <UserX className="h-4 w-4" />
            Maximum Login Attempts
          </Label>
          <Input
            id="maxLoginAttempts"
            name="maxLoginAttempts"
            type="number"
            min="1"
            max="10"
            value={securitySettings.maxLoginAttempts}
            onChange={handleInputChange}
          />
          <p className="text-xs text-muted-foreground">Number of failed attempts before account lockout</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="passwordExpiry" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Password Expiry (days)
          </Label>
          <Input
            id="passwordExpiry"
            name="passwordExpiry"
            type="number"
            min="0"
            max="365"
            value={securitySettings.passwordExpiry}
            onChange={handleInputChange}
          />
          <p className="text-xs text-muted-foreground">Days until password must be changed (0 = never)</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={isLoading} className="ml-auto">
          {isLoading ? 'Saving...' : 'Save Security Settings'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SecuritySettings;
