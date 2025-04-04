
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Shield, Lock, Clock, Key, UserX, Globe, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { getSecuritySettings, saveSecuritySettings } from '@/utils/settingsStorage';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SecuritySettings = () => {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordExpiry: 90,
    blockUnknownIPs: false,
    lastUpdated: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    sessionTimeout: false,
    maxLoginAttempts: false,
    passwordExpiry: false
  });

  useEffect(() => {
    // Load existing security settings
    const settings = getSecuritySettings();
    setSecuritySettings(prev => ({
      ...prev,
      ...settings
    }));
  }, []);

  const validateSettings = () => {
    const errors = {
      sessionTimeout: securitySettings.sessionTimeout <= 0,
      maxLoginAttempts: securitySettings.maxLoginAttempts <= 0,
      passwordExpiry: securitySettings.passwordExpiry < 0
    };
    
    setFormErrors(errors);
    
    return !Object.values(errors).some(error => error);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value, 10);
    
    // Only update if it's a valid number
    if (!isNaN(numValue)) {
      setSecuritySettings(prev => ({
        ...prev,
        [name]: numValue
      }));
      
      // Clear any error for this field
      if (formErrors[name as keyof typeof formErrors]) {
        setFormErrors(prev => ({
          ...prev,
          [name]: false
        }));
      }
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSecuritySettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSave = () => {
    if (!validateSettings()) {
      toast.error('Please correct the errors before saving');
      return;
    }
    
    setIsLoading(true);
    try {
      // Set last updated timestamp
      const updatedSettings = {
        ...securitySettings,
        lastUpdated: new Date().toISOString()
      };
      
      saveSecuritySettings(updatedSettings);
      setSecuritySettings(updatedSettings);
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
        {securitySettings.lastUpdated && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle>Settings Active</AlertTitle>
            <AlertDescription>
              Security settings were last updated on {new Date(securitySettings.lastUpdated).toLocaleString()}
            </AlertDescription>
          </Alert>
        )}
        
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
            className={formErrors.sessionTimeout ? 'border-red-500' : ''}
          />
          {formErrors.sessionTimeout && (
            <p className="text-red-500 text-xs mt-1">Session timeout must be greater than 0</p>
          )}
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
            className={formErrors.maxLoginAttempts ? 'border-red-500' : ''}
          />
          {formErrors.maxLoginAttempts && (
            <p className="text-red-500 text-xs mt-1">Maximum login attempts must be greater than 0</p>
          )}
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
            className={formErrors.passwordExpiry ? 'border-red-500' : ''}
          />
          {formErrors.passwordExpiry && (
            <p className="text-red-500 text-xs mt-1">Password expiry cannot be negative</p>
          )}
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
