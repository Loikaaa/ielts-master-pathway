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

  const databaseProviders = {
    mysql: ['mysql.com', 'planetscale.com', 'cleardb.com', 'aws.rds.amazonaws.com', 'localhost', '127.0.0.1'],
    postgres: ['postgres.com', 'postgresql.org', 'heroku.com', 'aws.rds.amazonaws.com', 'supabase.co', 'cockroachlabs.com', 'localhost', '127.0.0.1'],
    mariadb: ['mariadb.com', 'mariadb.org', 'aws.rds.amazonaws.com', 'localhost', '127.0.0.1'],
    sqlite: ['localhost', '127.0.0.1', 'file://'],
    mssql: ['sqlserver.com', 'azure.com', 'aws.rds.amazonaws.com', 'localhost', '127.0.0.1']
  };

  const extractDomainInfo = (host: string): { domain: string, pattern: string | null } => {
    let domain = host.replace(/^https?:\/\//, '');
    domain = domain.split(':')[0];
    domain = domain.split('/')[0];
    const parts = domain.split('.');
    const pattern = parts.length > 2 ? parts[0] : null;
    return { domain, pattern };
  };

  const validateDatabaseCredentials = (
    domain: string, 
    dbName: string, 
    username: string, 
    dbType: string
  ): { valid: boolean, message: string } => {
    const { pattern } = extractDomainInfo(domain);
    const matchingProvider = Object.entries(databaseProviders).find(([provider, domains]) => {
      return domains.some(d => domain.includes(d));
    });

    if (!matchingProvider) {
      return { 
        valid: false, 
        message: `The domain "${domain}" is not recognized as a valid database provider.` 
      };
    }

    if (pattern && domain !== 'localhost' && domain !== '127.0.0.1') {
      if (!dbName.includes(pattern) || !username.includes(pattern)) {
        return { 
          valid: false, 
          message: `For ${matchingProvider[0]} databases on "${domain}", both database name AND username must include "${pattern}".` 
        };
      }
    }

    if (dbType !== matchingProvider[0] && matchingProvider[0] !== 'localhost' && matchingProvider[0] !== '127.0.0.1') {
      return { 
        valid: false, 
        message: `You selected ${dbType} but the domain suggests you're using a ${matchingProvider[0]} database.` 
      };
    }

    return { valid: true, message: 'Database credentials validation passed.' };
  };

  useEffect(() => {
    const savedConfig = getDatabaseConfig();
    setConfig(prev => ({
      ...prev,
      ...savedConfig,
      password: savedConfig.password ? '••••••••' : '',
      dbType: savedConfig.dbType || 'mysql'
    }));
    
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

  const isDomainApproved = (domain: string, dbType: string): boolean => {
    return databaseProviders[dbType as keyof typeof databaseProviders]?.some(approvedDomain => 
      domain === approvedDomain || domain.endsWith('.' + approvedDomain)
    ) || false;
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

  const testConnection = () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields. Database name and credentials are required.');
      return;
    }
    
    setIsTesting(true);
    
    const { domain, pattern } = extractDomainInfo(config.host);
    
    const isValidDomain = isDomainApproved(domain, config.dbType);
    
    if (!isValidDomain) {
      toast.error(`Domain "${domain}" is not an approved database provider. Please use a legitimate database service.`);
      setIsTesting(false);
      return;
    }

    const credentialsValidation = validateDatabaseCredentials(
      domain, 
      config.database, 
      config.user, 
      config.dbType
    );

    if (!credentialsValidation.valid) {
      toast.error(credentialsValidation.message);
      setIsTesting(false);
      return;
    }
    
    setTimeout(() => {
      const success = config.database && 
                    config.user && 
                    (config.password || getDatabaseConfig().password) &&
                    isValidDomain && 
                    credentialsValidation.valid;
      
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
        
        const updatedSources = dataSources.map(source => 
          source.name === 'Main Database' 
            ? { ...source, status: 'connected', lastSynced: new Date().toLocaleString(), domains: [domain], dbName: config.database } 
            : source
        );
        setDataSources(updatedSources);
        
        saveDataSourceConnection('Main Database', 'connected', config.dbType);
        
        toast.success(`Successfully connected to ${config.dbType.toUpperCase()} database "${config.database}" on domain "${domain}"`);
        
        console.log('Connected to database:', config.database, 'as user:', config.user, 'on domain:', domain);
      } else {
        toast.error('Database connection failed. Please check your credentials and try again.');
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
            <p className="text-xs text-muted-foreground">
              {config.dbType === 'mysql' ? 'Example: myapp.mysql.com' : 
               config.dbType === 'postgres' ? 'Example: myapp.postgres.supabase.co' : 
               'Example: yourapp.database.com'}
            </p>
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
            placeholder="mydatabase_name"
            value={config.database}
            onChange={handleInputChange}
            className={formErrors.database ? "border-red-500" : ""}
          />
          {formErrors.database && (
            <p className="text-red-500 text-xs mt-1">Database name is required</p>
          )}
          <p className="text-xs text-muted-foreground">
            For hosted solutions, the database name often includes your domain or app name prefix
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="user" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Username <span className="text-red-500">*</span>
            </Label>
            <Input
              id="user"
              name="user"
              placeholder="database_user"
              value={config.user}
              onChange={handleInputChange}
              className={formErrors.user ? "border-red-500" : ""}
            />
            {formErrors.user && (
              <p className="text-red-500 text-xs mt-1">Username is required</p>
            )}
            <p className="text-xs text-muted-foreground">
              For hosted solutions, username often matches the domain/app prefix
            </p>
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
            Only approved database domains will be accepted for security reasons.
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
