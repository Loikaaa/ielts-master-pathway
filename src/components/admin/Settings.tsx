
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Save, 
  RefreshCcw, 
  Cog, 
  Bell, 
  Palette, 
  Globe, 
  Mail, 
  Users, 
  Database, 
  ServerCog, 
  Cloud, 
  Lock, 
  FileJson
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define schemas for different settings sections
const securitySchema = z.object({
  twoFactorAuth: z.boolean().default(true),
  sessionTimeout: z.number().min(5).max(120),
  maxLoginAttempts: z.number().min(3).max(10),
  passwordExpiry: z.number().min(30).max(180),
  blockUnknownIPs: z.boolean().default(false),
});

const notificationSchema = z.object({
  emailNotifications: z.boolean().default(true),
  loginAlerts: z.boolean().default(true),
  contentUpdates: z.boolean().default(true),
  systemAlerts: z.boolean().default(true),
  weeklyReports: z.boolean().default(false),
});

const appearanceSchema = z.object({
  themeName: z.string(),
  primaryColor: z.string(),
  accentColor: z.string(),
  fontFamily: z.string(),
  enableAnimations: z.boolean().default(true),
  highContrastMode: z.boolean().default(false),
});

const apiSchema = z.object({
  throttleRequests: z.boolean().default(true),
  maxRequestsPerMin: z.number().min(10).max(1000),
  enableCaching: z.boolean().default(true),
  cacheTTL: z.number().min(0).max(86400),
  enableCORS: z.boolean().default(true),
  allowedOrigins: z.string(),
});

const maintenanceSchema = z.object({
  scheduledMaintenance: z.boolean().default(false),
  maintenanceMessage: z.string().optional(),
  backupFrequency: z.enum(['daily', 'weekly', 'monthly']),
  retentionPeriod: z.number().min(1).max(90),
  enableLogging: z.boolean().default(true),
  logLevel: z.enum(['error', 'warn', 'info', 'debug']),
});

type SettingsSectionProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

const SettingsSection = ({ title, description, icon, children }: SettingsSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          {icon}
          <span className="ml-2">{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState('security');
  const [isLoading, setIsLoading] = useState(false);

  // Forms for each section
  const securityForm = useForm<z.infer<typeof securitySchema>>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordExpiry: 90,
      blockUnknownIPs: false,
    },
  });

  const notificationForm = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNotifications: true,
      loginAlerts: true,
      contentUpdates: true,
      systemAlerts: true,
      weeklyReports: false,
    },
  });

  const appearanceForm = useForm<z.infer<typeof appearanceSchema>>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: {
      themeName: 'Light',
      primaryColor: '#8B5CF6',
      accentColor: '#D946EF',
      fontFamily: 'Inter, sans-serif',
      enableAnimations: true,
      highContrastMode: false,
    },
  });

  const apiForm = useForm<z.infer<typeof apiSchema>>({
    resolver: zodResolver(apiSchema),
    defaultValues: {
      throttleRequests: true,
      maxRequestsPerMin: 120,
      enableCaching: true,
      cacheTTL: 3600,
      enableCORS: true,
      allowedOrigins: '*',
    },
  });

  const maintenanceForm = useForm<z.infer<typeof maintenanceSchema>>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: {
      scheduledMaintenance: false,
      maintenanceMessage: 'System maintenance in progress. Please try again later.',
      backupFrequency: 'daily',
      retentionPeriod: 30,
      enableLogging: true,
      logLevel: 'info',
    },
  });

  const handleSaveSettings = async (formData: any) => {
    setIsLoading(true);
    
    // Simulate API call
    try {
      console.log('Saving settings:', formData);
      
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecuritySubmit = (data: z.infer<typeof securitySchema>) => {
    handleSaveSettings({ security: data });
  };

  const handleNotificationSubmit = (data: z.infer<typeof notificationSchema>) => {
    handleSaveSettings({ notifications: data });
  };

  const handleAppearanceSubmit = (data: z.infer<typeof appearanceSchema>) => {
    handleSaveSettings({ appearance: data });
  };

  const handleAPISubmit = (data: z.infer<typeof apiSchema>) => {
    handleSaveSettings({ api: data });
  };

  const handleMaintenanceSubmit = (data: z.infer<typeof maintenanceSchema>) => {
    handleSaveSettings({ maintenance: data });
  };

  const handleClearCache = () => {
    setIsLoading(true);
    
    // Simulate clearing cache
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Cache cleared successfully');
    }, 1500);
  };

  const handleBackupNow = () => {
    setIsLoading(true);
    
    // Simulate database backup
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Database backup created successfully');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">API</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-2">
            <Cog className="h-4 w-4" />
            <span className="hidden sm:inline">Maintenance</span>
          </TabsTrigger>
        </TabsList>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <SettingsSection 
            title="Security Settings" 
            description="Configure security and access controls" 
            icon={<Shield className="h-5 w-5 text-primary" />}
          >
            <Form {...securityForm}>
              <form onSubmit={securityForm.handleSubmit(handleSecuritySubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={securityForm.control}
                    name="twoFactorAuth"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Two-Factor Authentication</FormLabel>
                          <FormDescription>
                            Require 2FA for all administrators
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={securityForm.control}
                    name="blockUnknownIPs"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Block Unknown IPs</FormLabel>
                          <FormDescription>
                            Only allow access from whitelisted IP addresses
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={securityForm.control}
                    name="sessionTimeout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Session Timeout (minutes)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                        </FormControl>
                        <FormDescription>
                          Automatic logout after inactivity
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={securityForm.control}
                    name="maxLoginAttempts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Login Attempts</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                        </FormControl>
                        <FormDescription>
                          Before account is temporarily locked
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={securityForm.control}
                    name="passwordExpiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Expiry (days)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                        </FormControl>
                        <FormDescription>
                          Force password change after this period
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                <Collapsible className="border rounded-md p-4">
                  <CollapsibleTrigger className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <Lock className="h-5 w-5 mr-2 text-primary" />
                      <span className="font-medium">Advanced Security Options</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Click to expand</div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="password-history" />
                        <label
                          htmlFor="password-history"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Enable password history (prevent reuse of last 5 passwords)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="enforce-complexity" />
                        <label
                          htmlFor="enforce-complexity"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Enforce password complexity requirements
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="audit-logs" defaultChecked />
                        <label
                          htmlFor="audit-logs"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Enable detailed security audit logs
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="geo-restriction" />
                        <label
                          htmlFor="geo-restriction"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Enable geographic login restrictions
                        </label>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Security Settings
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </SettingsSection>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <SettingsSection 
            title="Notification Settings" 
            description="Configure email and system notifications" 
            icon={<Bell className="h-5 w-5 text-primary" />}
          >
            <Form {...notificationForm}>
              <form onSubmit={notificationForm.handleSubmit(handleNotificationSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={notificationForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Email Notifications</FormLabel>
                          <FormDescription>
                            Receive system updates via email
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={notificationForm.control}
                    name="loginAlerts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Login Alerts</FormLabel>
                          <FormDescription>
                            Get notified of new account logins
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={notificationForm.control}
                    name="contentUpdates"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Content Updates</FormLabel>
                          <FormDescription>
                            Get notified when content is added or modified
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={notificationForm.control}
                    name="systemAlerts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">System Alerts</FormLabel>
                          <FormDescription>
                            Get notified of system issues and errors
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={notificationForm.control}
                    name="weeklyReports"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Weekly Reports</FormLabel>
                          <FormDescription>
                            Receive weekly activity and performance reports
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="p-4 border rounded-md bg-accent/20">
                  <h3 className="font-medium flex items-center mb-3">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Delivery Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">SMTP Server</label>
                      <Input defaultValue="smtp.example.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">SMTP Port</label>
                      <Input defaultValue="587" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">SMTP Username</label>
                      <Input defaultValue="notifications@example.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">SMTP Password</label>
                      <Input type="password" defaultValue="●●●●●●●●●●" />
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Test Email Connection
                  </Button>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Notification Settings
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </SettingsSection>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <SettingsSection 
            title="Appearance Settings" 
            description="Customize the look and feel of the admin interface" 
            icon={<Palette className="h-5 w-5 text-primary" />}
          >
            <Form {...appearanceForm}>
              <form onSubmit={appearanceForm.handleSubmit(handleAppearanceSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={appearanceForm.control}
                    name="themeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Theme</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <select
                              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              {...field}
                            >
                              <option value="Light">Light</option>
                              <option value="Dark">Dark</option>
                              <option value="System">System Default</option>
                            </select>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Choose your preferred color scheme
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={appearanceForm.control}
                    name="fontFamily"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Font Family</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <select
                              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              {...field}
                            >
                              <option value="Inter, sans-serif">Inter</option>
                              <option value="Roboto, sans-serif">Roboto</option>
                              <option value="'Open Sans', sans-serif">Open Sans</option>
                              <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                            </select>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Choose the font style for the application
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={appearanceForm.control}
                    name="primaryColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Color</FormLabel>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-md border" style={{ backgroundColor: field.value }}></div>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                        </div>
                        <FormDescription>
                          Main color used throughout the interface
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={appearanceForm.control}
                    name="accentColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accent Color</FormLabel>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-md border" style={{ backgroundColor: field.value }}></div>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                        </div>
                        <FormDescription>
                          Secondary color for highlights and accents
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={appearanceForm.control}
                    name="enableAnimations"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">UI Animations</FormLabel>
                          <FormDescription>
                            Enable motion animations in the interface
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={appearanceForm.control}
                    name="highContrastMode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">High Contrast</FormLabel>
                          <FormDescription>
                            Increase contrast for improved accessibility
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <Separator />
                
                <div className="p-4 border rounded-md bg-accent/20">
                  <h3 className="font-medium mb-3">Theme Preview</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="p-2 border rounded bg-background flex flex-col items-center justify-center text-center text-xs h-24">
                      <div className="rounded-full w-8 h-8 mb-2" style={{ backgroundColor: appearanceForm.getValues().primaryColor }}></div>
                      Primary
                    </div>
                    <div className="p-2 border rounded bg-background flex flex-col items-center justify-center text-center text-xs h-24">
                      <div className="rounded-full w-8 h-8 mb-2" style={{ backgroundColor: appearanceForm.getValues().accentColor }}></div>
                      Accent
                    </div>
                    <div className="p-2 border rounded bg-background flex flex-col items-center justify-center text-center text-xs h-24">
                      <div className="rounded-full w-8 h-8 mb-2 bg-background"></div>
                      Background
                    </div>
                    <div className="p-2 border rounded bg-background flex flex-col items-center justify-center text-center text-xs h-24">
                      <div className="rounded-full w-8 h-8 mb-2 bg-foreground"></div>
                      Foreground
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Appearance Settings
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </SettingsSection>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api" className="space-y-4">
          <SettingsSection 
            title="API Settings" 
            description="Configure API access and rate limits" 
            icon={<Globe className="h-5 w-5 text-primary" />}
          >
            <Form {...apiForm}>
              <form onSubmit={apiForm.handleSubmit(handleAPISubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={apiForm.control}
                    name="throttleRequests"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Rate Limiting</FormLabel>
                          <FormDescription>
                            Throttle API requests to prevent abuse
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={apiForm.control}
                    name="enableCaching"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Response Caching</FormLabel>
                          <FormDescription>
                            Cache API responses to improve performance
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={apiForm.control}
                    name="maxRequestsPerMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Requests per Minute</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value))}
                            disabled={!apiForm.getValues().throttleRequests}
                          />
                        </FormControl>
                        <FormDescription>
                          Maximum API requests allowed per minute per client
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={apiForm.control}
                    name="cacheTTL"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cache TTL (seconds)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value))}
                            disabled={!apiForm.getValues().enableCaching}
                          />
                        </FormControl>
                        <FormDescription>
                          Time to live for cached API responses
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={apiForm.control}
                  name="enableCORS"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">CORS Support</FormLabel>
                        <FormDescription>
                          Enable Cross-Origin Resource Sharing
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={apiForm.control}
                  name="allowedOrigins"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allowed Origins</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          disabled={!apiForm.getValues().enableCORS}
                          placeholder="* for all origins, or list domains (one per line): example.com, subdomain.example.com"
                        />
                      </FormControl>
                      <FormDescription>
                        List of domains allowed to access the API (one per line or * for all)
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <Collapsible className="border rounded-md p-4">
                  <CollapsibleTrigger className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <FileJson className="h-5 w-5 mr-2 text-primary" />
                      <span className="font-medium">API Authentication Options</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Click to expand</div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">API Key Authentication</div>
                          <div className="text-sm text-muted-foreground">Use API keys for authentication</div>
                        </div>
                        <Badge>Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">OAuth 2.0</div>
                          <div className="text-sm text-muted-foreground">Use OAuth for third-party authentication</div>
                        </div>
                        <Badge variant="outline">Disabled</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">JWT Authentication</div>
                          <div className="text-sm text-muted-foreground">Use JWT tokens for authentication</div>
                        </div>
                        <Badge>Enabled</Badge>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      Configure Authentication Settings
                    </Button>
                  </CollapsibleContent>
                </Collapsible>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save API Settings
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </SettingsSection>
        </TabsContent>

        {/* Maintenance Settings */}
        <TabsContent value="maintenance" className="space-y-4">
          <SettingsSection 
            title="System Maintenance" 
            description="Maintain system performance and data integrity" 
            icon={<Cog className="h-5 w-5 text-primary" />}
          >
            <Form {...maintenanceForm}>
              <form onSubmit={maintenanceForm.handleSubmit(handleMaintenanceSubmit)} className="space-y-4">
                <FormField
                  control={maintenanceForm.control}
                  name="scheduledMaintenance"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Maintenance Mode</FormLabel>
                        <FormDescription>
                          Take the site offline for maintenance
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={maintenanceForm.control}
                  name="maintenanceMessage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maintenance Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          disabled={!maintenanceForm.getValues().scheduledMaintenance}
                          placeholder="Message to display to users during maintenance"
                        />
                      </FormControl>
                      <FormDescription>
                        Message shown to users when site is in maintenance mode
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={maintenanceForm.control}
                    name="backupFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Backup Frequency</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <select
                              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              {...field}
                            >
                              <option value="daily">Daily</option>
                              <option value="weekly">Weekly</option>
                              <option value="monthly">Monthly</option>
                            </select>
                          </div>
                        </FormControl>
                        <FormDescription>
                          How often to run automated backups
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={maintenanceForm.control}
                    name="retentionPeriod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Retention Period (days)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                        </FormControl>
                        <FormDescription>
                          How long to keep backups before automatic deletion
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={maintenanceForm.control}
                    name="enableLogging"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">System Logging</FormLabel>
                          <FormDescription>
                            Enable detailed system activity logs
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={maintenanceForm.control}
                    name="logLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Log Level</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <select
                              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              {...field}
                              disabled={!maintenanceForm.getValues().enableLogging}
                            >
                              <option value="error">Error</option>
                              <option value="warn">Warning</option>
                              <option value="info">Info</option>
                              <option value="debug">Debug</option>
                            </select>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Detail level for system logs
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="p-4 border rounded-md bg-accent/20">
                  <h3 className="font-medium flex items-center mb-3">
                    <Database className="h-4 w-4 mr-2" />
                    Database Management
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" size="sm" className="w-full" onClick={handleClearCache}>
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      Clear Cache
                    </Button>
                    <Button variant="outline" size="sm" className="w-full" onClick={handleBackupNow}>
                      <Database className="mr-2 h-4 w-4" />
                      Backup Now
                    </Button>
                  </div>
                </div>

                <Collapsible className="border rounded-md p-4">
                  <CollapsibleTrigger className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <Cloud className="h-5 w-5 mr-2 text-primary" />
                      <span className="font-medium">Storage Management</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Click to expand</div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Database Storage</span>
                        <span>68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>File Storage</span>
                        <span>42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Backup Storage</span>
                        <span>23%</span>
                      </div>
                      <Progress value={23} className="h-2" />
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      Clean Up Old Files
                    </Button>
                  </CollapsibleContent>
                </Collapsible>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Maintenance Settings
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </SettingsSection>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
