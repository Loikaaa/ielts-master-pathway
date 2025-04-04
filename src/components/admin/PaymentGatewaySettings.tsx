
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, DollarSign, Lock, CreditCardIcon, Check, AlertCircle, Info } from 'lucide-react';
import { toast } from 'sonner';
import { saveSettings, getSettings } from '@/utils/settingsStorage';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
    autoCapture: true,
    lastVerified: ''
  });
  
  const [paypalSettings, setPaypalSettings] = useState({
    enabled: false,
    clientId: '',
    clientSecret: '',
    useTestMode: true,
    supportedCurrencies: ['USD', 'EUR', 'GBP'],
    autoCapture: true,
    lastVerified: ''
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
    
    // Reset connection status on credential change
    setConnectionStatus(null);
  };

  const handlePaypalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaypalSettings(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset connection status on credential change
    setConnectionStatus(null);
  };

  const handleStripeSwitchChange = (name: string, checked: boolean) => {
    setStripeSettings(prev => ({
      ...prev,
      [name]: checked
    }));
    
    // Reset connection status on major settings change
    if (name === 'enabled' || name === 'useTestMode') {
      setConnectionStatus(null);
    }
  };

  const handlePaypalSwitchChange = (name: string, checked: boolean) => {
    setPaypalSettings(prev => ({
      ...prev,
      [name]: checked
    }));
    
    // Reset connection status on major settings change
    if (name === 'enabled' || name === 'useTestMode') {
      setConnectionStatus(null);
    }
  };

  const validateStripeKey = (key: string, type: 'publishable' | 'secret'): boolean => {
    if (!key) return false;
    
    // Basic Stripe key validation patterns
    const publishablePattern = /^pk_(test|live)_[a-zA-Z0-9]{24,}$/;
    const secretPattern = /^sk_(test|live)_[a-zA-Z0-9]{24,}$/;
    
    if (type === 'publishable') {
      if (!publishablePattern.test(key)) {
        toast.error('Invalid Stripe publishable key format. It should start with pk_test_ or pk_live_');
        return false;
      }
      
      // Validate test/live mode consistency
      if (stripeSettings.useTestMode && !key.startsWith('pk_test_')) {
        toast.error('You are in test mode but provided a live publishable key');
        return false;
      }
      
      if (!stripeSettings.useTestMode && !key.startsWith('pk_live_')) {
        toast.error('You are in live mode but provided a test publishable key');
        return false;
      }
    } else {
      if (!secretPattern.test(key)) {
        toast.error('Invalid Stripe secret key format. It should start with sk_test_ or sk_live_');
        return false;
      }
      
      // Validate test/live mode consistency
      if (stripeSettings.useTestMode && !key.startsWith('sk_test_')) {
        toast.error('You are in test mode but provided a live secret key');
        return false;
      }
      
      if (!stripeSettings.useTestMode && !key.startsWith('sk_live_')) {
        toast.error('You are in live mode but provided a test secret key');
        return false;
      }
    }
    
    return true;
  };

  const validatePaypalCredentials = (clientId: string, clientSecret: string): boolean => {
    if (!clientId || !clientSecret) return false;
    
    // Basic validation for PayPal credentials (check for minimum length)
    if (clientId.length < 20) {
      toast.error('PayPal Client ID appears to be invalid (too short)');
      return false;
    }
    
    if (clientSecret.length < 20) {
      toast.error('PayPal Client Secret appears to be invalid (too short)');
      return false;
    }
    
    return true;
  };

  const handleSaveSettings = () => {
    setIsLoading(true);
    
    try {
      // Validate credentials before saving
      if (stripeSettings.enabled) {
        const keyToCheck = stripeSettings.useTestMode 
          ? stripeSettings.testPublishableKey || stripeSettings.livePublishableKey
          : stripeSettings.livePublishableKey;
          
        const secretToCheck = stripeSettings.useTestMode
          ? stripeSettings.testSecretKey || stripeSettings.liveSecretKey
          : stripeSettings.liveSecretKey;
          
        if (!keyToCheck || !secretToCheck) {
          toast.error('Stripe is enabled but API keys are missing');
          setIsLoading(false);
          return;
        }
      }
      
      if (paypalSettings.enabled) {
        if (!paypalSettings.clientId || !paypalSettings.clientSecret) {
          toast.error('PayPal is enabled but credentials are missing');
          setIsLoading(false);
          return;
        }
      }
      
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
    setConnectionStatus(null);
    
    // Simulate API call to test connection with validation
    setTimeout(() => {
      if (activeTab === 'stripe') {
        // Determine which keys to use based on mode
        const publishableKey = stripeSettings.useTestMode 
          ? stripeSettings.testPublishableKey || stripeSettings.livePublishableKey
          : stripeSettings.livePublishableKey;
          
        const secretKey = stripeSettings.useTestMode
          ? stripeSettings.testSecretKey || stripeSettings.liveSecretKey
          : stripeSettings.liveSecretKey;
        
        // Validate key format first
        if (!validateStripeKey(publishableKey, 'publishable') || !validateStripeKey(secretKey, 'secret')) {
          setConnectionStatus('failed');
          setTestConnectionLoading(false);
          return;
        }
        
        // Simulate successful verification
        setConnectionStatus('connected');
        toast.success('Successfully connected to Stripe API');
        
        // Update the last verified timestamp
        const now = new Date().toISOString();
        setStripeSettings(prev => ({
          ...prev,
          lastVerified: now
        }));
        
        // Also save this to settings
        const settings = getSettings() || {};
        if (!settings.paymentGateways) settings.paymentGateways = {};
        settings.paymentGateways.stripe = {
          ...stripeSettings,
          lastVerified: now
        };
        saveSettings(settings);
        
      } else if (activeTab === 'paypal') {
        if (!validatePaypalCredentials(paypalSettings.clientId, paypalSettings.clientSecret)) {
          setConnectionStatus('failed');
          setTestConnectionLoading(false);
          return;
        }
        
        // Simulate successful verification
        setConnectionStatus('connected');
        toast.success('Successfully connected to PayPal API');
        
        // Update the last verified timestamp
        const now = new Date().toISOString();
        setPaypalSettings(prev => ({
          ...prev,
          lastVerified: now
        }));
        
        // Also save this to settings
        const settings = getSettings() || {};
        if (!settings.paymentGateways) settings.paymentGateways = {};
        settings.paymentGateways.paypal = {
          ...paypalSettings,
          lastVerified: now
        };
        saveSettings(settings);
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
            {stripeSettings.lastVerified && (
              <Alert className="bg-green-50 border-green-200">
                <Check className="h-5 w-5 text-green-600" />
                <AlertTitle>Stripe API Connected</AlertTitle>
                <AlertDescription>
                  Last verified: {new Date(stripeSettings.lastVerified).toLocaleString()}
                </AlertDescription>
              </Alert>
            )}
            
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
            
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-5 w-5 text-blue-600" />
              <AlertTitle>API Keys Required</AlertTitle>
              <AlertDescription>
                You are in {stripeSettings.useTestMode ? 'test' : 'live'} mode. Please enter valid Stripe {stripeSettings.useTestMode ? 'test' : 'live'} keys.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="livePublishableKey" className="text-sm font-medium">
                  {stripeSettings.useTestMode ? 'Test' : 'Live'} Publishable Key
                </Label>
                <Input
                  id="livePublishableKey"
                  name={stripeSettings.useTestMode ? 'testPublishableKey' : 'livePublishableKey'}
                  placeholder={stripeSettings.useTestMode ? 'pk_test_...' : 'pk_live_...'}
                  value={stripeSettings.useTestMode ? stripeSettings.testPublishableKey : stripeSettings.livePublishableKey}
                  onChange={handleStripeInputChange}
                  disabled={!stripeSettings.enabled}
                />
                <p className="text-xs text-muted-foreground">
                  {stripeSettings.useTestMode 
                    ? 'Starts with pk_test_' 
                    : 'Starts with pk_live_'}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="liveSecretKey" className="text-sm font-medium">
                  {stripeSettings.useTestMode ? 'Test' : 'Live'} Secret Key
                </Label>
                <Input
                  id="liveSecretKey"
                  name={stripeSettings.useTestMode ? 'testSecretKey' : 'liveSecretKey'}
                  placeholder={stripeSettings.useTestMode ? 'sk_test_...' : 'sk_live_...'}
                  type="password"
                  value={stripeSettings.useTestMode ? stripeSettings.testSecretKey : stripeSettings.liveSecretKey}
                  onChange={handleStripeInputChange}
                  disabled={!stripeSettings.enabled}
                />
                <p className="text-xs text-muted-foreground">
                  {stripeSettings.useTestMode 
                    ? 'Starts with sk_test_' 
                    : 'Starts with sk_live_'}
                </p>
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
                disabled={testConnectionLoading || !stripeSettings.enabled || 
                  !(stripeSettings.useTestMode 
                    ? stripeSettings.testPublishableKey && stripeSettings.testSecretKey
                    : stripeSettings.livePublishableKey && stripeSettings.liveSecretKey)}
                className="mr-2"
              >
                {testConnectionLoading ? 'Testing...' : 'Verify API Keys'}
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
            {paypalSettings.lastVerified && (
              <Alert className="bg-green-50 border-green-200">
                <Check className="h-5 w-5 text-green-600" />
                <AlertTitle>PayPal API Connected</AlertTitle>
                <AlertDescription>
                  Last verified: {new Date(paypalSettings.lastVerified).toLocaleString()}
                </AlertDescription>
              </Alert>
            )}
            
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
            
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-5 w-5 text-blue-600" />
              <AlertTitle>API Credentials Required</AlertTitle>
              <AlertDescription>
                You are in {paypalSettings.useTestMode ? 'sandbox' : 'live'} mode. Please enter valid PayPal {paypalSettings.useTestMode ? 'sandbox' : 'live'} credentials.
              </AlertDescription>
            </Alert>
            
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
                {testConnectionLoading ? 'Testing...' : 'Verify API Credentials'}
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
