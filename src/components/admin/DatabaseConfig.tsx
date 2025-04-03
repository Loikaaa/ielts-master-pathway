
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, Database, Key, Lock, Server, User } from 'lucide-react';
import { toast } from 'sonner';
import { getDatabaseConfig, saveDatabaseConfig } from '@/utils/settingsStorage';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const DatabaseConfig = () => {
  const [config, setConfig] = useState({
    host: '',
    port: '',
    user: '',
    password: '',
    database: '',
    connected: false,
    lastConnected: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    // Load existing database configuration
    const savedConfig = getDatabaseConfig();
    setConfig(prev => ({
      ...prev,
      ...savedConfig,
      password: savedConfig.password ? '••••••••' : '' // Mask password if exists
    }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsLoading(true);
    try {
      // Don't save the masked password - only save if changed
      const configToSave = {
        ...config,
        password: config.password === '••••••••' ? undefined : config.password
      };
      
      saveDatabaseConfig(configToSave);
      toast.success('Database configuration saved successfully!');
    } catch (error) {
      toast.error('Failed to save database configuration');
      console.error('Error saving database config:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = () => {
    setIsTesting(true);
    
    // Simulate a connection test - in a real app this would connect to your backend
    setTimeout(() => {
      const success = Math.random() > 0.3; // Simulate 70% success rate for demo
      
      if (success) {
        const now = new Date().toISOString();
        setConfig(prev => ({
          ...prev,
          connected: true,
          lastConnected: now
        }));
        
        // Save the updated connection status
        saveDatabaseConfig({
          ...config,
          connected: true,
          lastConnected: now,
          password: config.password === '••••••••' ? undefined : config.password
        });
        
        toast.success('Database connection successful!');
      } else {
        toast.error('Database connection failed. Please check your credentials.');
      }
      
      setIsTesting(false);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Database Connection
        </CardTitle>
        <CardDescription>
          Configure your database connection settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {config.connected && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle>Connected</AlertTitle>
            <AlertDescription>
              Database is currently connected. Last connection: {config.lastConnected ? new Date(config.lastConnected).toLocaleString() : 'Unknown'}
            </AlertDescription>
          </Alert>
        )}
        
        {!config.connected && config.host && (
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <AlertTitle>Not Connected</AlertTitle>
            <AlertDescription>
              Database connection is not active. Please test your connection.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="host" className="flex items-center gap-2">
              <Server className="h-4 w-4" /> Host
            </Label>
            <Input
              id="host"
              name="host"
              placeholder="localhost or database URL"
              value={config.host}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="port">Port</Label>
            <Input
              id="port"
              name="port"
              placeholder="5432"
              value={config.port}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" /> Database Name
          </Label>
          <Input
            id="database"
            name="database"
            placeholder="myDatabase"
            value={config.database}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="user" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Username
            </Label>
            <Input
              id="user"
              name="user"
              placeholder="database user"
              value={config.user}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" /> Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={config.password}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mt-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            <Key className="h-3.5 w-3.5" />
            Your database credentials are stored securely in local storage for demonstration purposes.
            In a production environment, these should be stored server-side.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={testConnection} 
          disabled={isTesting || !config.host || !config.database}
        >
          {isTesting ? 'Testing...' : 'Test Connection'}
        </Button>
        <Button 
          onClick={handleSave} 
          disabled={isLoading || !config.host || !config.database}
        >
          {isLoading ? 'Saving...' : 'Save Configuration'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DatabaseConfig;
