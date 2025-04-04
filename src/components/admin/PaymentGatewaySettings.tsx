
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, DollarSign, Lock, CreditCardIcon, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { saveSettings, getSettings } from '@/utils/settingsStorage';

const PaymentGatewaySettings = () => {
  const [activeTab, setActiveTab] = useState('stripe');
  const [isLoading, setIsLoading] = useState(false);
  const [testConnectionLoading, setTestConnectionLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'failed' | null>(null);
  
  const [stripeSettings, setStripeSettings] = useState({
    enabled: false,
    livePublishableKey: '',
    liveSecretKey: '',
    testPublishableKey: '',
    testSecretKey: '',
    useTestMode: true,
    webhookSecret: '',
    supportedCurrencies: ['USD', 'EUR', 'GBP'],
    autoCapture: true
  });
  
  const [paypalSettings, setPaypalSettings] = useState({
    enabled: false,
    clientId: '',
    clientSecret: '',
    useTestMode: true,
    supportedCurrencies: ['USD', 'EUR', 'GBP'],
    autoCapture: true
  });

  useEffect(() => {
    // Load existing payment gateway settings
    const settings = getSettings() || {};
    if (settings.paymentGateways) {
      if (settings.paymentGateways.stripe) {
        setStripeSettings(settings.paymentGateways.stripe);
      }
      if (settings.paymentGateways.paypal) {
        setPaypalSettings(settings.paymentGateways.paypal);
      }
    }
  }, []);

  const handleStripeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStripeSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaypalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaypalSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStripeSwitchChange = (name: string, checked: boolean) => {
    setStripeSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handlePaypalSwitchChange = (name: string, checked: boolean) => {
    setPaypalSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSaveSettings = () => {
    setIsLoading(true);
    
    try {
      // Get existing settings
      const settings = getSettings() || {};
      
      // Update payment gateway settings
      settings.paymentGateways = {
        ...settings.paymentGateways,
        stripe: stripeSettings,
        paypal: paypalSettings
      };
      
      // Save settings
      saveSettings(settings);
      
      toast.success('Payment gateway settings saved successfully');
    } catch (error) {
      console.error('Error saving payment gateway settings:', error);
      toast.error('Failed to save payment gateway settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = () => {
    setTestConnectionLoading(true);
    
    // Simulate API call to test connection
    setTimeout(() => {
      if (activeTab === 'stripe' && stripeSettings.livePublishableKey && stripeSettings.liveSecretKey) {
        setConnectionStatus('connected');
        toast.success('Successfully connected to Stripe');
      } else if (activeTab === 'paypal' && paypalSettings.clientId && paypalSettings.clientSecret) {
        setConnectionStatus('connected');
        toast.success('Successfully connected to PayPal');
      } else {
        setConnectionStatus('failed');
        toast.error('Connection failed. Please check your credentials.');
      }
      setTestConnectionLoading(false);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Payment Gateway Configuration
        </CardTitle>
        <CardDescription>
          Configure payment processors to enable online payments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="stripe" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="stripe">Stripe</TabsTrigger>
            <TabsTrigger value="paypal">PayPal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stripe" className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="stripe-enabled" className="flex items-center gap-2">
                <CreditCardIcon className="h-4 w-4" />
                Enable Stripe Payments
              </Label>
              <Switch
                id="stripe-enabled"
                checked={stripeSettings.enabled}
                onCheckedChange={(checked) => handleStripeSwitchChange('enabled', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="stripe-test-mode" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Use Test Mode
              </Label>
              <Switch
                id="stripe-test-mode"
                checked={stripeSettings.useTestMode}
                onCheckedChange={(checked) => handleStripeSwitchChange('useTestMode', checked)}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="livePublishableKey" className="text-sm font-medium">
                  {stripeSettings.useTestMode ? 'Test' : 'Live'} Publishable Key
                </Label>
                <Input
                  id="livePublishableKey"
                  name="livePublishableKey"
                  placeholder="pk_live_..."
                  value={stripeSettings.livePublishableKey}
                  onChange={handleStripeInputChange}
                  disabled={!stripeSettings.enabled}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="liveSecretKey" className="text-sm font-medium">
                  {stripeSettings.useTestMode ? 'Test' : 'Live'} Secret Key
                </Label>
                <Input
                  id="liveSecretKey"
                  name="liveSecretKey"
                  placeholder="sk_live_..."
                  type="password"
                  value={stripeSettings.liveSecretKey}
                  onChange={handleStripeInputChange}
                  disabled={!stripeSettings.enabled}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhookSecret" className="text-sm font-medium">
                  Webhook Secret
                </Label>
                <Input
                  id="webhookSecret"
                  name="webhookSecret"
                  placeholder="whsec_..."
                  type="password"
                  value={stripeSettings.webhookSecret}
                  onChange={handleStripeInputChange}
                  disabled={!stripeSettings.enabled}
                />
              </div>
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="stripe-auto-capture" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Auto-capture Payments
              </Label>
              <Switch
                id="stripe-auto-capture"
                checked={stripeSettings.autoCapture}
                onCheckedChange={(checked) => handleStripeSwitchChange('autoCapture', checked)}
                disabled={!stripeSettings.enabled}
              />
            </div>
            
            <div className="mt-4">
              <Button 
                onClick={handleTestConnection} 
                variant="outline"
                disabled={testConnectionLoading || !stripeSettings.enabled || !stripeSettings.livePublishableKey || !stripeSettings.liveSecretKey}
                className="mr-2"
              >
                {testConnectionLoading ? 'Testing...' : 'Test Connection'}
              </Button>
              
              {connectionStatus && (
                <span className={`inline-flex items-center ml-2 text-sm ${connectionStatus === 'connected' ? 'text-green-600' : 'text-red-500'}`}>
                  {connectionStatus === 'connected' ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Connected
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Connection Failed
                    </>
                  )}
                </span>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="paypal" className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="paypal-enabled" className="flex items-center gap-2">
                <CreditCardIcon className="h-4 w-4" />
                Enable PayPal Payments
              </Label>
              <Switch
                id="paypal-enabled"
                checked={paypalSettings.enabled}
                onCheckedChange={(checked) => handlePaypalSwitchChange('enabled', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="paypal-test-mode" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Use Sandbox (Test Mode)
              </Label>
              <Switch
                id="paypal-test-mode"
                checked={paypalSettings.useTestMode}
                onCheckedChange={(checked) => handlePaypalSwitchChange('useTestMode', checked)}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientId" className="text-sm font-medium">
                  {paypalSettings.useTestMode ? 'Sandbox' : 'Live'} Client ID
                </Label>
                <Input
                  id="clientId"
                  name="clientId"
                  placeholder="Client ID..."
                  value={paypalSettings.clientId}
                  onChange={handlePaypalInputChange}
                  disabled={!paypalSettings.enabled}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clientSecret" className="text-sm font-medium">
                  {paypalSettings.useTestMode ? 'Sandbox' : 'Live'} Client Secret
                </Label>
                <Input
                  id="clientSecret"
                  name="clientSecret"
                  placeholder="Client Secret..."
                  type="password"
                  value={paypalSettings.clientSecret}
                  onChange={handlePaypalInputChange}
                  disabled={!paypalSettings.enabled}
                />
              </div>
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="paypal-auto-capture" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Auto-capture Payments
              </Label>
              <Switch
                id="paypal-auto-capture"
                checked={paypalSettings.autoCapture}
                onCheckedChange={(checked) => handlePaypalSwitchChange('autoCapture', checked)}
                disabled={!paypalSettings.enabled}
              />
            </div>
            
            <div className="mt-4">
              <Button 
                onClick={handleTestConnection} 
                variant="outline"
                disabled={testConnectionLoading || !paypalSettings.enabled || !paypalSettings.clientId || !paypalSettings.clientSecret}
                className="mr-2"
              >
                {testConnectionLoading ? 'Testing...' : 'Test Connection'}
              </Button>
              
              {connectionStatus && (
                <span className={`inline-flex items-center ml-2 text-sm ${connectionStatus === 'connected' ? 'text-green-600' : 'text-red-500'}`}>
                  {connectionStatus === 'connected' ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Connected
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Connection Failed
                    </>
                  )}
                </span>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSaveSettings} 
          disabled={isLoading} 
          className="ml-auto"
        >
          {isLoading ? 'Saving...' : 'Save Payment Settings'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentGatewaySettings;
