
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Globe, ExternalLink, Copy, Check, Trash2, Facebook, Mail, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { saveSettings, getSettings } from '@/utils/settingsStorage';

interface Integration {
  id: string;
  name: string;
  apiKey: string;
  enabled: boolean;
  url: string;
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
  type?: 'api' | 'oauth';
}

const IntegrationsSettings = () => {
  const [newIntegration, setNewIntegration] = useState({
    name: '',
    apiKey: '',
    url: '',
    clientId: '',
    clientSecret: '',
    redirectUri: '',
    type: 'api'
  });
  const [integrations, setIntegrations] = useState<Integration[]>(() => {
    const settings = getSettings() || {};
    return settings.integrations || [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'api' | 'oauth'>('api');

  // Check if OAuth providers are configured
  const [oauthProviders, setOauthProviders] = useState({
    google: false,
    facebook: false
  });

  useEffect(() => {
    const googleIntegration = integrations.find(i => i.name.toLowerCase().includes('google') && i.type === 'oauth');
    const facebookIntegration = integrations.find(i => i.name.toLowerCase().includes('facebook') && i.type === 'oauth');
    
    setOauthProviders({
      google: !!googleIntegration && googleIntegration.enabled,
      facebook: !!facebookIntegration && facebookIntegration.enabled
    });
  }, [integrations]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewIntegration(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (id: string, checked: boolean) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id ? { ...integration, enabled: checked } : integration
      )
    );
    
    // Save to storage after toggling
    const settings = getSettings() || {};
    settings.integrations = integrations.map(integration => 
      integration.id === id ? { ...integration, enabled: checked } : integration
    );
    saveSettings(settings);
    
    toast.success(`Integration ${checked ? 'enabled' : 'disabled'}`);
    
    // Update OAuth providers state if needed
    const updatedIntegration = integrations.find(i => i.id === id);
    if (updatedIntegration && updatedIntegration.type === 'oauth') {
      if (updatedIntegration.name.toLowerCase().includes('google')) {
        setOauthProviders(prev => ({ ...prev, google: checked }));
      } else if (updatedIntegration.name.toLowerCase().includes('facebook')) {
        setOauthProviders(prev => ({ ...prev, facebook: checked }));
      }
    }
  };

  const handleAddIntegration = () => {
    if (!newIntegration.name.trim()) {
      toast.error('Integration name is required');
      return;
    }
    
    if (activeTab === 'api' && !newIntegration.apiKey.trim()) {
      toast.error('API key is required');
      return;
    }
    
    if (activeTab === 'oauth' && (!newIntegration.clientId.trim() || !newIntegration.clientSecret.trim())) {
      toast.error('Client ID and Client Secret are required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const newItem: Integration = {
        id: `int-${Date.now()}`,
        name: newIntegration.name,
        apiKey: activeTab === 'api' ? newIntegration.apiKey : '',
        url: newIntegration.url,
        enabled: true,
        type: activeTab,
        clientId: activeTab === 'oauth' ? newIntegration.clientId : undefined,
        clientSecret: activeTab === 'oauth' ? newIntegration.clientSecret : undefined,
        redirectUri: activeTab === 'oauth' ? newIntegration.redirectUri : undefined
      };
      
      const updatedIntegrations = [...integrations, newItem];
      setIntegrations(updatedIntegrations);
      
      // Save to storage
      const settings = getSettings() || {};
      settings.integrations = updatedIntegrations;
      saveSettings(settings);
      
      // Reset form
      setNewIntegration({
        name: '',
        apiKey: '',
        url: '',
        clientId: '',
        clientSecret: '',
        redirectUri: '',
        type: activeTab
      });
      
      toast.success('Integration added successfully');
      
      // Update OAuth providers state if needed
      if (activeTab === 'oauth') {
        if (newIntegration.name.toLowerCase().includes('google')) {
          setOauthProviders(prev => ({ ...prev, google: true }));
        } else if (newIntegration.name.toLowerCase().includes('facebook')) {
          setOauthProviders(prev => ({ ...prev, facebook: true }));
        }
      }
    } catch (error) {
      toast.error('Failed to add integration');
      console.error('Error adding integration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteIntegration = (id: string) => {
    try {
      const integrationToDelete = integrations.find(i => i.id === id);
      const updatedIntegrations = integrations.filter(integration => integration.id !== id);
      setIntegrations(updatedIntegrations);
      
      // Save to storage
      const settings = getSettings() || {};
      settings.integrations = updatedIntegrations;
      saveSettings(settings);
      
      toast.success('Integration removed');
      
      // Update OAuth providers state if needed
      if (integrationToDelete && integrationToDelete.type === 'oauth') {
        if (integrationToDelete.name.toLowerCase().includes('google')) {
          setOauthProviders(prev => ({ ...prev, google: false }));
        } else if (integrationToDelete.name.toLowerCase().includes('facebook')) {
          setOauthProviders(prev => ({ ...prev, facebook: false }));
        }
      }
    } catch (error) {
      toast.error('Failed to remove integration');
      console.error('Error removing integration:', error);
    }
  };

  const copyApiKey = (id: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
    toast.success('Value copied to clipboard');
  };

  const OAuthForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Service Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Google OAuth"
            value={newIntegration.name}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="clientId">Client ID</Label>
          <Input
            id="clientId"
            name="clientId"
            placeholder="your-client-id"
            value={newIntegration.clientId}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="clientSecret">Client Secret</Label>
        <Input
          id="clientSecret"
          name="clientSecret"
          placeholder="your-client-secret"
          type="password"
          value={newIntegration.clientSecret}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="redirectUri">Redirect URI</Label>
        <Input
          id="redirectUri"
          name="redirectUri"
          placeholder="https://yourdomain.com/auth/callback"
          value={newIntegration.redirectUri}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
  
  const ApiKeyForm = () => (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Integration Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Google Maps"
            value={newIntegration.name}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key</Label>
          <Input
            id="apiKey"
            name="apiKey"
            placeholder="xxxx-xxxx-xxxx"
            value={newIntegration.apiKey}
            onChange={handleInputChange}
            type="password"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="url">API Endpoint (Optional)</Label>
        <Input
          id="url"
          name="url"
          placeholder="https://api.example.com/v1"
          value={newIntegration.url}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Third-Party Integrations
        </CardTitle>
        <CardDescription>
          Manage connections to external services, APIs, and OAuth providers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Button 
              variant={activeTab === 'api' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setActiveTab('api')}
            >
              <Globe className="mr-2 h-4 w-4" />
              API Keys
            </Button>
            <Button 
              variant={activeTab === 'oauth' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setActiveTab('oauth')}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              OAuth Providers
            </Button>
          </div>
          
          <h3 className="text-lg font-medium">
            {activeTab === 'api' ? 'Add New API Integration' : 'Add OAuth Provider'}
          </h3>
          <div className="grid gap-4">
            {activeTab === 'api' ? <ApiKeyForm /> : <OAuthForm />}
            
            <Button 
              onClick={handleAddIntegration} 
              disabled={isLoading || !newIntegration.name || (activeTab === 'api' && !newIntegration.apiKey) || (activeTab === 'oauth' && (!newIntegration.clientId || !newIntegration.clientSecret))}
            >
              {isLoading ? 'Adding...' : 'Add Integration'}
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Active Integrations</h3>
          {integrations.length === 0 ? (
            <p className="text-sm text-muted-foreground">No integrations configured yet.</p>
          ) : (
            <div className="space-y-4">
              {integrations.map((integration) => (
                <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium flex items-center">
                      {integration.type === 'oauth' && 
                        (integration.name.toLowerCase().includes('google') ? 
                          <svg viewBox="0 0 24 24" width="16" height="16" className="mr-2" xmlns="http://www.w3.org/2000/svg">
                            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                            </g>
                          </svg>
                          : integration.name.toLowerCase().includes('facebook') ?
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mr-2" viewBox="0 0 24 24">
                            <path fill="#4267B2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          : <Globe className="mr-2 h-4 w-4 text-primary" />)
                      }
                      {integration.name}
                    </h4>
                    
                    {integration.type === 'oauth' ? (
                      <div className="space-y-1 mt-1">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-muted-foreground">
                            Client ID: •••••••••{integration.clientId?.slice(-4) || ''}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => copyApiKey(`${integration.id}-clientid`, integration.clientId || '')}
                          >
                            {copied === `${integration.id}-clientid` ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-muted-foreground">
                            Client Secret: •••••••••{integration.clientSecret?.slice(-4) || ''}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => copyApiKey(`${integration.id}-secret`, integration.clientSecret || '')}
                          >
                            {copied === `${integration.id}-secret` ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                        {integration.redirectUri && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <ExternalLink className="h-3 w-3" />
                            {integration.redirectUri}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="text-sm text-muted-foreground">
                          API Key: •••••••••{integration.apiKey.slice(-4)}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => copyApiKey(integration.id, integration.apiKey)}
                        >
                          {copied === integration.id ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    )}
                    
                    {integration.url && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <ExternalLink className="h-3 w-3" />
                        {integration.url}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`enable-${integration.id}`} className="text-sm">Enable</Label>
                      <Switch
                        id={`enable-${integration.id}`}
                        checked={integration.enabled}
                        onCheckedChange={(checked) => handleSwitchChange(integration.id, checked)}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleDeleteIntegration(integration.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Quick guide for OAuth setup */}
        <div className="bg-muted p-4 rounded-lg mt-6">
          <h4 className="font-medium mb-2">OAuth Setup Guide</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">1</span>
              <span>Create developer accounts on <a href="https://developers.facebook.com" target="_blank" className="text-primary underline">Facebook</a> or <a href="https://console.developers.google.com" target="_blank" className="text-primary underline">Google</a></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">2</span>
              <span>Set your redirect URI to match your application's authentication callback endpoint</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">3</span>
              <span>Copy the Client ID and Client Secret provided by the service</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">4</span>
              <span>Add them here and enable the integration</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationsSettings;
