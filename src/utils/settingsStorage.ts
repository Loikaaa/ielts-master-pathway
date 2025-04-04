
/**
 * Utility functions for storing and retrieving settings
 * Enhanced for CMS portability across domains
 */

// Global settings prefix - can be customized during installation
const STORAGE_PREFIX = 'cms_settings';

// Save settings to localStorage with domain isolation
export const saveSettings = (settings: any) => {
  try {
    // Merge with existing settings instead of replacing them
    const existingSettings = getSettings() || {};
    const mergedSettings = { ...existingSettings, ...settings };
    
    localStorage.setItem(`${STORAGE_PREFIX}`, JSON.stringify(mergedSettings));
    console.info('Saving settings:', mergedSettings);
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
};

// Get settings from localStorage
export const getSettings = () => {
  try {
    const settings = localStorage.getItem(`${STORAGE_PREFIX}`);
    return settings ? JSON.parse(settings) : null;
  } catch (error) {
    console.error('Error retrieving settings:', error);
    return null;
  }
};

// Get a specific setting by key
export const getSetting = (key: string) => {
  const settings = getSettings();
  return settings ? settings[key] : null;
};

// Check if maintenance mode is enabled
export const isMaintenanceMode = () => {
  try {
    const settings = getSettings();
    // Ensure we check for exact true value
    return settings?.maintenance?.scheduledMaintenance === true;
  } catch (error) {
    console.error('Error checking maintenance mode:', error);
    return false;
  }
};

// Get maintenance message
export const getMaintenanceMessage = () => {
  try {
    const settings = getSettings();
    return settings?.maintenance?.maintenanceMessage || 'System maintenance in progress. Please try again later.';
  } catch (error) {
    console.error('Error getting maintenance message:', error);
    return 'System maintenance in progress. Please try again later.';
  }
};

// Get database configuration
export const getDatabaseConfig = () => {
  try {
    const settings = getSettings();
    return settings?.database || {
      host: '',
      port: '',
      user: '',
      password: '',
      database: '',
      connected: false
    };
  } catch (error) {
    console.error('Error getting database config:', error);
    return {
      host: '',
      port: '',
      user: '',
      password: '',
      database: '',
      connected: false
    };
  }
};

// Check if database is configured and connected
export const isDatabaseConnected = () => {
  try {
    const dbConfig = getDatabaseConfig();
    return dbConfig.connected === true && 
           dbConfig.host && 
           dbConfig.database && 
           dbConfig.user && 
           (dbConfig.password || dbConfig.lastConnected);
  } catch (error) {
    console.error('Error checking database connection:', error);
    return false;
  }
};

// Validate if a database domain is valid and follows naming conventions
export const validateDatabaseDomain = (host: string, database: string, user: string) => {
  if (!host || !database || !user) return false;
  
  // Extract domain from hostname
  const domain = extractDomainFromHost(host);
  
  // Check if database name and username follow the domain pattern
  // For example: If domain is "example.com", database name should contain "example"
  const databasePattern = extractBaseDomain(domain);
  
  if (databasePattern) {
    // Check if database name or username contains the domain pattern
    return database.toLowerCase().includes(databasePattern.toLowerCase()) || 
           user.toLowerCase().includes(databasePattern.toLowerCase());
  }
  
  return true; // If no pattern can be extracted, consider it valid
};

// Helper function to extract domain from host
const extractDomainFromHost = (host: string) => {
  // If it's an IP address, return it as is
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host)) {
    return host;
  }
  
  // Extract domain from hostname
  const parts = host.split('.');
  if (parts.length >= 2) {
    return parts.slice(-2).join('.');
  }
  
  return host;
};

// Helper to extract the base part of a domain (e.g., "example" from "example.com")
const extractBaseDomain = (domain: string) => {
  if (!domain) return null;
  
  const parts = domain.split('.');
  if (parts.length > 0) {
    return parts[0]; // Return the first part
  }
  
  return null;
};

// Save database configuration
export const saveDatabaseConfig = (config: any) => {
  // Validate required fields
  if (!config.host || !config.database || !config.user) {
    console.error('Cannot save database config: missing required fields');
    return false;
  }
  
  // Validate domain pattern matching for non-localhost environments
  const isLocalhost = config.host.indexOf('localhost') >= 0 || config.host.indexOf('127.0.0.1') >= 0;
  
  if (!isLocalhost && !validateDatabaseDomain(config.host, config.database, config.user)) {
    console.error('Cannot save database config: database name or username should match domain pattern');
    return false;
  }
  
  const settings = getSettings() || {};
  
  // If a connection test was performed successfully, record the data accessed
  if (config.connected && config.lastConnected) {
    console.info(`Database connection established: ${config.user}@${config.host}/${config.database}`);
    // In a real application, this would log to the server and possibly record analytics
  }
  
  settings.database = config;
  return saveSettings(settings);
};

// Get email configuration
export const getEmailConfig = () => {
  try {
    const settings = getSettings();
    return settings?.email || {
      smtpServer: '',
      port: '',
      username: '',
      password: '',
      fromEmail: '',
      enableSSL: true,
      connected: false,
      connectionTested: false,
      lastConnected: ''
    };
  } catch (error) {
    console.error('Error getting email config:', error);
    return {
      smtpServer: '',
      port: '',
      username: '',
      password: '',
      fromEmail: '',
      enableSSL: true,
      connected: false,
      connectionTested: false,
      lastConnected: ''
    };
  }
};

// Validate if an email server configuration is valid
export const validateEmailConfig = (config: any) => {
  const errors = [];
  
  if (!config.smtpServer) {
    errors.push('SMTP server is required');
  } else {
    // Validate known email providers
    const validDomains = [
      'gmail.com', 'outlook.com', 'office365.com', 'hotmail.com', 'yahoo.com',
      'zoho.com', 'mail.com', 'aol.com', 'yandex.com', 'protonmail.com',
      'icloud.com', 'fastmail.com', 'gmx.com', 'mailgun.org', 'sendgrid.net',
      'amazonses.com', 'sparkpost.com', 'postmarkapp.com', 'mailchimp.com'
    ];
    
    // Extract domain from server
    let domain = config.smtpServer;
    if (domain.includes('.')) {
      const parts = domain.split('.');
      if (parts.length >= 2) {
        // Get last two parts
        domain = parts.slice(-2).join('.');
      }
    }
    
    // Skip domain check for IP addresses (local development)
    const isIpAddress = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(config.smtpServer);
    
    if (!isIpAddress && !validDomains.some(validDomain => domain.includes(validDomain))) {
      errors.push('SMTP server domain is not recognized');
    }
  }
  
  if (!config.port) {
    errors.push('Port is required');
  } else {
    const port = parseInt(config.port);
    if (isNaN(port) || port < 1 || port > 65535) {
      errors.push('Port must be a valid number between 1 and 65535');
    }
  }
  
  if (!config.username) {
    errors.push('Username is required');
  }
  
  if (!config.fromEmail) {
    errors.push('From email is required');
  } else if (!/^\S+@\S+\.\S+$/.test(config.fromEmail)) {
    errors.push('From email must be a valid email address');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

// Test email server connection
export const testEmailConnection = async (config: any) => {
  try {
    // Validate configuration
    const validation = validateEmailConfig(config);
    if (!validation.isValid) {
      return {
        success: false,
        message: validation.errors.join(', ')
      };
    }
    
    // In a real app, we would make an actual SMTP connection test here
    // For this demo, we'll just simulate a successful connection if validation passes
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      message: 'Connection successful'
    };
  } catch (error) {
    console.error('Error testing email connection:', error);
    return {
      success: false,
      message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

// Save email configuration
export const saveEmailConfig = (config: any) => {
  // Validate required fields
  const validation = validateEmailConfig(config);
  if (!validation.isValid) {
    console.error('Cannot save email config:', validation.errors);
    return false;
  }
  
  const settings = getSettings() || {};
  settings.email = config;
  return saveSettings(settings);
};

// Get analytics tracking IDs
export const getAnalyticsConfig = () => {
  try {
    const settings = getSettings();
    return settings?.analytics || {
      googleAnalyticsId: '',
      facebookPixelId: '',
      mixpanelToken: '',
      enabled: false
    };
  } catch (error) {
    console.error('Error getting analytics config:', error);
    return {
      googleAnalyticsId: '',
      facebookPixelId: '',
      mixpanelToken: '',
      enabled: false
    };
  }
};

// Get security settings
export const getSecuritySettings = () => {
  try {
    const settings = getSettings();
    return settings?.security || {
      twoFactorAuth: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordExpiry: 90,
      blockUnknownIPs: false
    };
  } catch (error) {
    console.error('Error getting security settings:', error);
    return {
      twoFactorAuth: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordExpiry: 90,
      blockUnknownIPs: false
    };
  }
};

// Save analytics configuration
export const saveAnalyticsConfig = (config: any) => {
  const settings = getSettings() || {};
  settings.analytics = config;
  return saveSettings(settings);
};

// Save maintenance settings
export const saveMaintenanceSettings = (maintenance: any) => {
  const settings = getSettings() || {};
  settings.maintenance = maintenance;
  return saveSettings(settings);
};

// Save security settings
export const saveSecuritySettings = (security: any) => {
  const settings = getSettings() || {};
  settings.security = security;
  return saveSettings(settings);
};

// Get data source connections
export const getDataSourceConnections = () => {
  try {
    const settings = getSettings();
    return settings?.dataSources || [
      { name: 'Main Database', status: 'disconnected', type: 'postgres', lastSynced: 'Never' },
      { name: 'Email Service', status: 'disconnected', type: 'email', lastSynced: 'Never' },
      { name: 'User Authentication', status: 'disconnected', type: 'auth', lastSynced: 'Never' },
      { name: 'File Storage', status: 'disconnected', type: 'storage', lastSynced: 'Never' },
      { name: 'Analytics', status: 'disconnected', type: 'analytics', lastSynced: 'Never' }
    ];
  } catch (error) {
    console.error('Error getting data sources:', error);
    return [
      { name: 'Main Database', status: 'disconnected', type: 'postgres', lastSynced: 'Never' },
      { name: 'Email Service', status: 'disconnected', type: 'email', lastSynced: 'Never' },
      { name: 'User Authentication', status: 'disconnected', type: 'auth', lastSynced: 'Never' },
      { name: 'File Storage', status: 'disconnected', type: 'storage', lastSynced: 'Never' },
      { name: 'Analytics', status: 'disconnected', type: 'analytics', lastSynced: 'Never' }
    ];
  }
};

// Save data source connection
export const saveDataSourceConnection = (name: string, status: string, type: string) => {
  try {
    const settings = getSettings() || {};
    const dataSources = settings.dataSources || [
      { name: 'Main Database', status: 'disconnected', type: 'postgres', lastSynced: 'Never' },
      { name: 'Email Service', status: 'disconnected', type: 'email', lastSynced: 'Never' },
      { name: 'User Authentication', status: 'disconnected', type: 'auth', lastSynced: 'Never' },
      { name: 'File Storage', status: 'disconnected', type: 'storage', lastSynced: 'Never' },
      { name: 'Analytics', status: 'disconnected', type: 'analytics', lastSynced: 'Never' }
    ];
    
    const now = new Date().toLocaleString();
    const updatedSources = dataSources.map(source => {
      if (source.name === name) {
        return { ...source, status, lastSynced: status === 'connected' ? now : source.lastSynced };
      }
      return source;
    });
    
    settings.dataSources = updatedSources;
    return saveSettings(settings);
  } catch (error) {
    console.error('Error saving data source connection:', error);
    return false;
  }
};

// Get site settings
export const getSiteSettings = () => {
  try {
    const settings = getSettings();
    return settings?.site || {
      title: 'CMS Website',
      description: 'A customizable content management system',
      keywords: '',
      favicon: '',
      logo: '',
      theme: 'light',
      language: 'en'
    };
  } catch (error) {
    console.error('Error getting site settings:', error);
    return {
      title: 'CMS Website',
      description: 'A customizable content management system',
      keywords: '',
      favicon: '',
      logo: '',
      theme: 'light',
      language: 'en'
    };
  }
};

// Save site settings
export const saveSiteSettings = (site: any) => {
  const settings = getSettings() || {};
  settings.site = site;
  return saveSettings(settings);
};

// Get installation settings
export const getInstallationSettings = () => {
  try {
    const settings = getSettings();
    return settings?.installation || {
      domain: window.location.hostname,
      installDate: null,
      version: '1.0.0',
      isInstalled: false,
      license: '',
      adminEmail: ''
    };
  } catch (error) {
    console.error('Error getting installation settings:', error);
    return {
      domain: window.location.hostname,
      installDate: null,
      version: '1.0.0',
      isInstalled: false,
      license: '',
      adminEmail: ''
    };
  }
};

// Save installation settings
export const saveInstallationSettings = (installation: any) => {
  const settings = getSettings() || {};
  settings.installation = installation;
  return saveSettings(settings);
};

// Export all settings (for backup)
export const exportAllSettings = () => {
  try {
    const settings = getSettings();
    if (!settings) {
      return { success: false, message: 'No settings found to export' };
    }
    
    // Create a JSON string with all settings
    const settingsJSON = JSON.stringify(settings, null, 2);
    
    // Create a Blob from the JSON
    const blob = new Blob([settingsJSON], { type: 'application/json' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cms-settings-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return { success: true, message: 'Settings exported successfully' };
  } catch (error) {
    console.error('Error exporting settings:', error);
    return { 
      success: false, 
      message: 'Failed to export settings: ' + (error instanceof Error ? error.message : 'Unknown error')
    };
  }
};

// Import settings (from backup)
export const importSettings = async (file: File) => {
  try {
    // Read the JSON file
    const text = await file.text();
    const importedSettings = JSON.parse(text);
    
    if (!importedSettings) {
      return { success: false, message: 'Invalid settings file' };
    }
    
    // Merge with existing settings or replace completely
    if (saveSettings(importedSettings)) {
      return { success: true, message: 'Settings imported successfully' };
    } else {
      throw new Error('Failed to save imported settings');
    }
  } catch (error) {
    console.error('Error importing settings:', error);
    return { 
      success: false, 
      message: 'Failed to import settings: ' + (error instanceof Error ? error.message : 'Unknown error')
    };
  }
};

// Clear all settings (useful for uninstallation)
export const clearAllSettings = () => {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}`);
    return { success: true, message: 'All settings cleared successfully' };
  } catch (error) {
    console.error('Error clearing settings:', error);
    return { 
      success: false, 
      message: 'Failed to clear settings: ' + (error instanceof Error ? error.message : 'Unknown error')
    };
  }
};
