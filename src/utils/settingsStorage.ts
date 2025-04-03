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

// Save database configuration
export const saveDatabaseConfig = (config: any) => {
  // Validate required fields
  if (!config.host || !config.database || !config.user) {
    console.error('Cannot save database config: missing required fields');
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
      connected: false
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
      connected: false
    };
  }
};

// Save email configuration
export const saveEmailConfig = (config: any) => {
  // Validate required fields
  if (!config.smtpServer || !config.username || !config.fromEmail) {
    console.error('Cannot save email config: missing required fields');
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

// Blog post functions
export const getBlogPosts = () => {
  try {
    const settings = getSettings();
    return settings?.blogPosts || [
      {
        id: 'blog1',
        title: 'Top Strategies to Improve Your IELTS Reading Score',
        excerpt: 'Master the reading section with these proven techniques that have helped thousands of students achieve band 7+.',
        coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        author: 'Dr. Sarah Johnson',
        date: 'March 28, 2025',
        readTime: '8 min read',
        category: 'Reading',
        tags: ['reading', 'strategy', 'time management'],
        featured: true,
        content: 'This is a sample blog post about IELTS reading strategies. In this post, we explore various techniques to improve your reading score.\n\nTime management is crucial in the IELTS reading section. Many test-takers struggle to complete all questions within the given time frame.\n\nHere are some key strategies:\n\n1. Skim the passage before reading in detail\n2. Look for keywords in questions\n3. Don\'t spend too much time on difficult questions\n4. Practice reading academic texts regularly',
        status: 'published'
      },
      {
        id: 'blog2',
        title: 'Common Grammar Mistakes to Avoid in IELTS Writing',
        excerpt: 'Eliminate these frequent errors that cost test-takers valuable points in the writing section.',
        coverImage: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        author: 'James Wilson',
        date: 'March 20, 2025',
        readTime: '6 min read',
        category: 'Writing',
        tags: ['writing', 'grammar', 'mistakes'],
        featured: false,
        content: 'Grammar mistakes can significantly impact your IELTS writing score. This post covers the most common errors and how to avoid them.\n\nSubject-verb agreement is a frequent issue among test-takers. Remember that a singular subject requires a singular verb, and a plural subject requires a plural verb.\n\nArticle usage (a, an, the) is another challenging area, especially for speakers of languages that don\'t have articles.\n\nHere are some commonly confused words:\n\n- Effect vs. Affect\n- Their vs. There vs. They\'re\n- Its vs. It\'s',
        status: 'published'
      }
    ];
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return [];
  }
};

export const saveBlogPost = (post: any) => {
  try {
    const settings = getSettings() || {};
    const blogPosts = settings.blogPosts || [];
    
    // Check if post exists already (for updates)
    const existingPostIndex = blogPosts.findIndex(p => p.id === post.id);
    
    if (existingPostIndex >= 0) {
      // Update existing post
      blogPosts[existingPostIndex] = post;
    } else {
      // Add new post
      blogPosts.push(post);
    }
    
    settings.blogPosts = blogPosts;
    return saveSettings(settings);
  } catch (error) {
    console.error('Error saving blog post:', error);
    return false;
  }
};

export const deleteBlogPost = (postId: string) => {
  try {
    const settings = getSettings() || {};
    const blogPosts = settings.blogPosts || [];
    
    settings.blogPosts = blogPosts.filter(post => post.id !== postId);
    return saveSettings(settings);
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
};
