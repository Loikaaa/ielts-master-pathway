
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { BarChart4, LineChart, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { getAnalyticsConfig, saveAnalyticsConfig } from '@/utils/settingsStorage';

const AnalyticsSettings = () => {
  const [analyticsConfig, setAnalyticsConfig] = useState({
    googleAnalyticsId: '',
    facebookPixelId: '',
    mixpanelToken: '',
    enabled: false
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load existing analytics configuration
    const config = getAnalyticsConfig();
    setAnalyticsConfig(config);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnalyticsConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setAnalyticsConfig(prev => ({
      ...prev,
      enabled: checked
    }));
  };

  const handleSave = () => {
    setIsLoading(true);
    try {
      saveAnalyticsConfig(analyticsConfig);
      toast.success('Analytics settings saved successfully!');
      
      // If analytics is enabled, inform user about page reload
      if (analyticsConfig.enabled && 
        (analyticsConfig.googleAnalyticsId || 
         analyticsConfig.facebookPixelId || 
         analyticsConfig.mixpanelToken)) {
        toast.info('Analytics will be active after page reload');
      }
    } catch (error) {
      toast.error('Failed to save analytics settings');
      console.error('Error saving analytics settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart4 className="h-5 w-5 text-primary" />
          Analytics Configuration
        </CardTitle>
        <CardDescription>
          Configure third-party analytics services to track website usage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="analytics-enabled" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Enable Analytics Tracking
          </Label>
          <Switch
            id="analytics-enabled"
            checked={analyticsConfig.enabled}
            onCheckedChange={handleSwitchChange}
          />
        </div>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="googleAnalyticsId">Google Analytics ID (GA4)</Label>
            <Input
              id="googleAnalyticsId"
              name="googleAnalyticsId"
              placeholder="G-XXXXXXXXXX"
              value={analyticsConfig.googleAnalyticsId}
              onChange={handleInputChange}
              disabled={!analyticsConfig.enabled}
            />
            <p className="text-xs text-muted-foreground">Enter your Google Analytics 4 measurement ID</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
            <Input
              id="facebookPixelId"
              name="facebookPixelId"
              placeholder="XXXXXXXXXXXXXXXXXX"
              value={analyticsConfig.facebookPixelId}
              onChange={handleInputChange}
              disabled={!analyticsConfig.enabled}
            />
            <p className="text-xs text-muted-foreground">Enter your Facebook Pixel tracking ID</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mixpanelToken">Mixpanel Token</Label>
            <Input
              id="mixpanelToken"
              name="mixpanelToken"
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={analyticsConfig.mixpanelToken}
              onChange={handleInputChange}
              disabled={!analyticsConfig.enabled}
            />
            <p className="text-xs text-muted-foreground">Enter your Mixpanel project token</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={isLoading} className="ml-auto">
          {isLoading ? 'Saving...' : 'Save Analytics Settings'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AnalyticsSettings;
