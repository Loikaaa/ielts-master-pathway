
/**
 * Utility functions for storing and retrieving settings
 */

// Save settings to localStorage
export const saveSettings = (settings: any) => {
  try {
    localStorage.setItem('settings', JSON.stringify(settings));
    console.info('Saving settings:', settings);
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
