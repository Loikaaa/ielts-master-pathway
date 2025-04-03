
/**
 * Utility functions for storing and retrieving settings
 */

// Save settings to localStorage
export const saveSettings = (settings: any) => {
  try {
    // Merge with existing settings instead of replacing them
    const existingSettings = getSettings() || {};
    const mergedSettings = { ...existingSettings, ...settings };
    
    localStorage.setItem('settings', JSON.stringify(mergedSettings));
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
    const settings = localStorage.getItem('settings');
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
    console.info('Checking maintenance mode with settings:', settings);
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
      database: '',
      connected: false
    };
  } catch (error) {
    console.error('Error getting database config:', error);
    return {
      host: '',
      port: '',
      user: '',
      database: '',
      connected: false
    };
  }
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

// Save database configuration
export const saveDatabaseConfig = (config: any) => {
  const settings = getSettings() || {};
  settings.database = config;
  return saveSettings(settings);
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
      { name: 'User Authentication', status: 'disconnected', type: 'auth', lastSynced: 'Never' },
      { name: 'File Storage', status: 'disconnected', type: 'storage', lastSynced: 'Never' },
      { name: 'Analytics', status: 'disconnected', type: 'analytics', lastSynced: 'Never' }
    ];
  } catch (error) {
    console.error('Error getting data sources:', error);
    return [
      { name: 'Main Database', status: 'disconnected', type: 'postgres', lastSynced: 'Never' },
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
