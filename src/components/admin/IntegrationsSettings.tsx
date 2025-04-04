
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Globe, ExternalLink, Copy, Check, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { saveSettings, getSettings } from '@/utils/settingsStorage';

interface Integration {
  id: string;
  name: string;
  apiKey: string;
  enabled: boolean;
  url: string;
}

const IntegrationsSettings = () => {
  const [newIntegration, setNewIntegration] = useState({
    name: '',
    apiKey: '',
    url: ''
  });
  const [integrations, setIntegrations] = useState<Integration[]>(() => {
    const settings = getSettings() || {};
    return settings.integrations || [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

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
  };

  const handleAddIntegration = () => {
    if (!newIntegration.name.trim()) {
      toast.error('Integration name is required');
      return;
    }
    
    if (!newIntegration.apiKey.trim()) {
      toast.error('API key is required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const newItem: Integration = {
        id: `int-${Date.now()}`,
        name: newIntegration.name,
        apiKey: newIntegration.apiKey,
        url: newIntegration.url,
        enabled: true
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
        url: ''
      });
      
      toast.success('Integration added successfully');
    } catch (error) {
      toast.error('Failed to add integration');
      console.error('Error adding integration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteIntegration = (id: string) => {
    try {
      const updatedIntegrations = integrations.filter(integration => integration.id !== id);
      setIntegrations(updatedIntegrations);
      
      // Save to storage
      const settings = getSettings() || {};
      settings.integrations = updatedIntegrations;
      saveSettings(settings);
      
      toast.success('Integration removed');
    } catch (error) {
      toast.error('Failed to remove integration');
      console.error('Error removing integration:', error);
    }
  };

  const copyApiKey = (id: string, apiKey: string) => {
    navigator.clipboard.writeText(apiKey);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
    toast.success('API key copied to clipboard');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Third-Party Integrations
        </CardTitle>
        <CardDescription>
          Manage connections to external services and APIs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Add New Integration</h3>
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
            
            <Button 
              onClick={handleAddIntegration} 
              disabled={isLoading || !newIntegration.name || !newIntegration.apiKey}
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
                    <h4 className="font-medium">{integration.name}</h4>
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
      </CardContent>
    </Card>
  );
};

export default IntegrationsSettings;
