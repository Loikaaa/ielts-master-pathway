
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, Database, Globe, Key, Lock, Server, User } from 'lucide-react';
import { toast } from 'sonner';
import { getDatabaseConfig, saveDatabaseConfig, getDataSourceConnections, saveDataSourceConnection } from '@/utils/settingsStorage';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DatabaseConfig = () => {
  const [config, setConfig] = useState({
    host: '',
    port: '',
    user: '',
    password: '',
    database: '',
    connected: false,
    lastConnected: '',
    dbType: 'mysql'
  });

  const [dataSources, setDataSources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [domainBased, setDomainBased] = useState(true);
  const [formErrors, setFormErrors] = useState({
    host: false,
    database: false,
    user: false,
    password: false
  });

  useEffect(() => {
    const savedConfig = getDatabaseConfig();
    setConfig(prev => ({
      ...prev,
      ...savedConfig,
      password: savedConfig.password ? '••••••••' : '',
      dbType: savedConfig.dbType || 'mysql'
    }));
    
    // Load data sources
    const sources = getDataSourceConnections();
    setDataSources(sources);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {
      host: !config.host,
      database: !config.database,
      user: !config.user,
      password: false
    };
    
    if (!config.password && !getDatabaseConfig().password) {
      errors.password = true;
    }
    
    setFormErrors(errors);
    return !errors.host && !errors.database && !errors.user && !errors.password;
  };

  const handleSave = () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsLoading(true);
    try {
      const configToSave = {
        ...config,
        password: config.password === '••••••••' ? undefined : config.password,
        connected: false,
        dbType: config.dbType
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

  const extractDomainFromHost = (host: string): string => {
    // Remove protocol if present
    let domain = host.replace(/^https?:\/\//, '');
    
    // Remove port if present
    domain = domain.split(':')[0];
    
    // Remove path if present
    domain = domain.split('/')[0];
    
    return domain;
  };

  const testConnection = () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields. Database name and credentials are required.');
      return;
    }
    
    setIsTesting(true);
    
    // Simulate database connection test
    setTimeout(() => {
      // Extract domain for domain-based connection
      const domain = extractDomainFromHost(config.host);
      
      // Simple validation - in a real app this would be an actual DB connection test
      const isValidDomain = config.host === 'localhost' || 
                          config.host.includes('.') || 
                          config.host.includes('database.com');
      
      const success = config.database && 
                    config.user && 
                    (config.password || getDatabaseConfig().password) &&
                    isValidDomain;
      
      if (success) {
        const now = new Date().toISOString();
        const updatedConfig = {
          ...config,
          connected: true,
          lastConnected: now,
          password: config.password === '••••••••' ? undefined : config.password
        };
        
        setConfig(prev => ({
          ...prev,
          connected: true,
          lastConnected: now
        }));
        
        saveDatabaseConfig(updatedConfig);
        
        // Also update the data source status
        saveDataSourceConnection('Main Database', 'connected', config.dbType);
        const updatedSources = dataSources.map(source => 
          source.name === 'Main Database' 
            ? { ...source, status: 'connected', lastSynced: new Date().toLocaleString() } 
            : source
        );
        setDataSources(updatedSources);
        
        // Success message with domain info if domain-based
        if (domainBased) {
          toast.success(`Successfully connected to database "${config.database}" on domain "${domain}"`);
        } else {
          toast.success(`Successfully connected to database "${config.database}" on ${config.host}`);
        }
        
        console.log('Connected to database:', config.database, 'as user:', config.user, 'on domain:', domain);
      } else {
        toast.error('Database connection failed. Please check your credentials and try again.');
        
        if (!isValidDomain) {
          toast.error('Invalid host/domain. Please enter a valid database host.');
        }
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
              Successfully connected to {config.dbType.toUpperCase()} database <strong>{config.database}</strong> as user <strong>{config.user}</strong>. 
              Last connection: {config.lastConnected ? new Date(config.lastConnected).toLocaleString() : 'Unknown'}
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
            <Label htmlFor="dbType">Database Type</Label>
            <Select value={config.dbType} onValueChange={(value) => handleSelectChange('dbType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select database type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mysql">MySQL</SelectItem>
                <SelectItem value="postgres">PostgreSQL</SelectItem>
                <SelectItem value="mariadb">MariaDB</SelectItem>
                <SelectItem value="sqlite">SQLite</SelectItem>
                <SelectItem value="mssql">MS SQL Server</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="connectionType">Connection Method</Label>
            <Select value={domainBased ? "domain" : "direct"} onValueChange={(value) => setDomainBased(value === "domain")}>
              <SelectTrigger>
                <SelectValue placeholder="Select connection method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="domain">Domain-based Connection</SelectItem>
                <SelectItem value="direct">Direct Connection</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="host" className="flex items-center gap-2">
              {domainBased ? <Globe className="h-4 w-4" /> : <Server className="h-4 w-4" />} 
              {domainBased ? "Domain" : "Host/Server"} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="host"
              name="host"
              placeholder={domainBased ? "yourdomain.com" : "localhost or database URL"}
              value={config.host}
              onChange={handleInputChange}
              className={formErrors.host ? "border-red-500" : ""}
            />
            {formErrors.host && (
              <p className="text-red-500 text-xs mt-1">{domainBased ? "Domain" : "Host/Server"} is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="port">Port (optional)</Label>
            <Input
              id="port"
              name="port"
              placeholder={config.dbType === 'mysql' ? "3306" : config.dbType === 'postgres' ? "5432" : "1433"}
              value={config.port}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" /> Database Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="database"
            name="database"
            placeholder={domainBased ? "yourdomain_db" : "myDatabase"}
            value={config.database}
            onChange={handleInputChange}
            className={formErrors.database ? "border-red-500" : ""}
          />
          {formErrors.database && (
            <p className="text-red-500 text-xs mt-1">Database name is required</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="user" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Username <span className="text-red-500">*</span>
            </Label>
            <Input
              id="user"
              name="user"
              placeholder={domainBased ? "yourdomain_user" : "database user"}
              value={config.user}
              onChange={handleInputChange}
              className={formErrors.user ? "border-red-500" : ""}
            />
            {formErrors.user && (
              <p className="text-red-500 text-xs mt-1">Username is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" /> Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={config.password}
              onChange={handleInputChange}
              className={formErrors.password ? "border-red-500" : ""}
            />
            {formErrors.password && (
              <p className="text-red-500 text-xs mt-1">Password is required</p>
            )}
          </div>
        </div>

        <div className="mt-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            <Key className="h-3.5 w-3.5" />
            {domainBased ? 
              "Uses your domain name to connect to the corresponding database on your hosting provider." : 
              "For demonstration purposes only. In a production environment, these would connect to an actual database."}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={testConnection} 
          disabled={isTesting}
        >
          {isTesting ? 'Testing...' : 'Test Connection'}
        </Button>
        <Button 
          onClick={handleSave} 
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Configuration'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DatabaseConfig;
