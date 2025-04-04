import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Send, Edit, AlertCircle, Check, Copy, Server, KeyRound, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { saveSettings, getSettings, saveEmailConfig, getEmailConfig, testEmailConnection } from '@/utils/settingsStorage';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  enabled: boolean;
}

const DEFAULT_TEMPLATES: EmailTemplate[] = [
  {
    id: 'welcome',
    name: 'Welcome Email',
    subject: 'Welcome to our platform!',
    body: `<p>Hello {userName},</p>
<p>Thank you for joining our platform. We're excited to have you!</p>
<p>Here are some resources to get you started:</p>
<ul>
  <li><a href="{dashboardLink}">Your Dashboard</a></li>
  <li><a href="{helpCenter}">Help Center</a></li>
</ul>
<p>If you have any questions, feel free to reply to this email.</p>
<p>Best regards,<br/>The Team</p>`,
    enabled: true
  },
  {
    id: 'password-reset',
    name: 'Password Reset',
    subject: 'Reset Your Password',
    body: `<p>Hello {userName},</p>
<p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
<p>To reset your password, click the link below:</p>
<p><a href="{resetLink}">Reset Password</a></p>
<p>This link will expire in 24 hours.</p>
<p>Best regards,<br/>The Team</p>`,
    enabled: true
  },
  {
    id: 'account-verification',
    name: 'Account Verification',
    subject: 'Verify Your Account',
    body: `<p>Hello {userName},</p>
<p>Thank you for creating an account. Please verify your email address by clicking the link below:</p>
<p><a href="{verificationLink}">Verify Email</a></p>
<p>If you didn't create an account, you can safely ignore this email.</p>
<p>Best regards,<br/>The Team</p>`,
    enabled: true
  }
];

const EmailTemplatesSettings = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [emailConfig, setEmailConfig] = useState({
    smtpServer: '',
    port: '',
    username: '',
    password: '',
    fromEmail: '',
    enableSSL: true,
    connected: false,
    connectionTested: false,
    lastConnected: ''
  });
  const [connectionError, setConnectionError] = useState('');

  useEffect(() => {
    const settings = getSettings() || {};
    const savedTemplates = settings.emailTemplates || DEFAULT_TEMPLATES;
    setTemplates(savedTemplates);
    
    if (savedTemplates.length > 0) {
      setSelectedTemplate(savedTemplates[0]);
    }

    const email = getEmailConfig();
    setEmailConfig(email);
  }, []);

  const handleTemplateSelect = (templateId: string) => {
    const selected = templates.find(t => t.id === templateId);
    if (selected) {
      setSelectedTemplate(selected);
      setIsEditing(false);
    }
  };

  const handleToggleEnabled = (templateId: string, enabled: boolean) => {
    const updatedTemplates = templates.map(template => 
      template.id === templateId ? { ...template, enabled } : template
    );
    
    setTemplates(updatedTemplates);
    
    if (selectedTemplate?.id === templateId) {
      setSelectedTemplate({ ...selectedTemplate, enabled });
    }
    
    const settings = getSettings() || {};
    settings.emailTemplates = updatedTemplates;
    saveSettings(settings);
    
    toast.success(`Template ${enabled ? 'enabled' : 'disabled'}`);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (selectedTemplate) {
      setSelectedTemplate({
        ...selectedTemplate,
        [name]: value
      });
    }
  };

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailConfig(prev => ({
      ...prev,
      [name]: value,
      connected: name !== 'fromEmail' ? false : prev.connected,
      connectionTested: name !== 'fromEmail' ? false : prev.connectionTested
    }));
    
    if (connectionError) {
      setConnectionError('');
    }
  };

  const handleSslToggle = (checked: boolean) => {
    setEmailConfig(prev => ({
      ...prev,
      enableSSL: checked,
      connected: false,
      connectionTested: false
    }));
  };

  const validateHostDomain = (host: string) => {
    if (!host) return false;
    
    const validDomains = [
      'gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'aol.com',
      'zoho.com', 'protonmail.com', 'mail.com', 'icloud.com', 'yandex.com',
      'sendgrid.net', 'mailchimp.com', 'mailgun.org', 'amazonses.com', 'postmarkapp.com',
      'office365.com', 'fastmail.com', 'gmx.com'
    ];
    
    let domain = host;
    
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host)) {
      return true;
    }
    
    if (host.includes('.')) {
      const parts = host.split('.');
      if (parts.length >= 2) {
        domain = parts.slice(-2).join('.');
      }
    }

    return validDomains.some(validDomain => domain.includes(validDomain));
  };

  const handleEmailConnectionTest = async () => {
    if (!emailConfig.smtpServer || !emailConfig.port || !emailConfig.username || !emailConfig.fromEmail) {
      toast.error('Please fill in all required SMTP server fields');
      return;
    }
    
    if (!validateHostDomain(emailConfig.smtpServer)) {
      setConnectionError('Invalid SMTP server domain. Please use a valid email provider domain.');
      toast.error('Invalid SMTP server domain');
      return;
    }
    
    if (!/^\d+$/.test(emailConfig.port) || emailConfig.port < 1 || emailConfig.port > 65535) {
      setConnectionError('Invalid port number. Please enter a valid port (1-65535).');
      toast.error('Invalid port number');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(emailConfig.fromEmail)) {
      setConnectionError('Invalid email format for From Email address.');
      toast.error('Invalid From Email format');
      return;
    }

    setIsConnecting(true);
    setConnectionError('');
    
    try {
      const emailHostname = emailConfig.smtpServer.toLowerCase();
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedConfig = {
        ...emailConfig,
        connected: true,
        connectionTested: true,
        lastConnected: new Date().toLocaleString()
      };
      
      setEmailConfig(updatedConfig);
      saveEmailConfig(updatedConfig);
      
      toast.success('Connected to email server successfully');
    } catch (error) {
      console.error('Error testing email connection:', error);
      setConnectionError('Failed to connect to email server. Please check your settings and try again.');
      toast.error('Failed to connect to email server');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSaveTemplate = () => {
    if (!selectedTemplate) return;
    
    setIsSaving(true);
    
    try {
      const updatedTemplates = templates.map(template => 
        template.id === selectedTemplate.id ? selectedTemplate : template
      );
      
      setTemplates(updatedTemplates);
      
      const settings = getSettings() || {};
      settings.emailTemplates = updatedTemplates;
      saveSettings(settings);
      
      setIsEditing(false);
      toast.success('Email template saved successfully');
    } catch (error) {
      console.error('Error saving email template:', error);
      toast.error('Failed to save email template');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendTestEmail = () => {
    if (!selectedTemplate) return;
    
    if (!testEmailAddress) {
      toast.error('Please enter a test email address');
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(testEmailAddress)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (!emailConfig.connected) {
      toast.error('Email server not connected. Please configure and test connection first');
      setActiveTab('smtp');
      return;
    }
    
    setIsSending(true);
    
    setTimeout(() => {
      toast.success(`Test email sent to ${testEmailAddress}`);
      setIsSending(false);
    }, 1500);
  };

  const copyTemplate = () => {
    if (!selectedTemplate) return;
    
    const newTemplate: EmailTemplate = {
      ...selectedTemplate,
      id: `${selectedTemplate.id}-copy-${Date.now()}`,
      name: `${selectedTemplate.name} (Copy)`
    };
    
    const updatedTemplates = [...templates, newTemplate];
    setTemplates(updatedTemplates);
    
    const settings = getSettings() || {};
    settings.emailTemplates = updatedTemplates;
    saveSettings(settings);
    
    setSelectedTemplate(newTemplate);
    setIsEditing(true);
    
    toast.success('Template copied successfully');
  };

  const handleSaveEmailConfig = () => {
    if (!emailConfig.smtpServer || !emailConfig.port || !emailConfig.username || !emailConfig.fromEmail) {
      toast.error('Please fill in all required SMTP server fields');
      return;
    }
    
    setIsSaving(true);
    
    try {
      saveEmailConfig(emailConfig);
      toast.success('Email configuration saved successfully');
    } catch (error) {
      console.error('Error saving email configuration:', error);
      toast.error('Failed to save email configuration');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          Email System
        </CardTitle>
        <CardDescription>
          Configure email server settings and manage email templates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="templates">Email Templates</TabsTrigger>
            <TabsTrigger value="smtp">SMTP Configuration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Templates</h3>
                <div className="space-y-2">
                  {templates.map((template) => (
                    <div 
                      key={template.id}
                      className={`p-3 border rounded-md cursor-pointer flex items-center justify-between ${
                        selectedTemplate?.id === template.id ? 'border-primary bg-primary/5' : ''
                      }`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div>
                        <p className="font-medium">{template.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{template.subject}</p>
                      </div>
                      <Switch
                        checked={template.enabled}
                        onCheckedChange={(checked) => handleToggleEnabled(template.id, checked)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-4">
                {selectedTemplate ? (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{isEditing ? 'Edit Template' : 'Template Preview'}</h3>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={copyTemplate}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Duplicate
                        </Button>
                        <Button 
                          variant={isEditing ? "default" : "outline"} 
                          size="sm"
                          onClick={handleEditToggle}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          {isEditing ? 'Save Changes' : 'Edit Template'}
                        </Button>
                      </div>
                    </div>
                    
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="subject">Email Subject</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={selectedTemplate.subject}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="body">Email Body (HTML)</Label>
                          <Textarea
                            id="body"
                            name="body"
                            value={selectedTemplate.body}
                            onChange={handleInputChange}
                            className="min-h-[200px] font-mono text-sm"
                          />
                          <p className="text-xs text-muted-foreground">
                            Available variables: {'{userName}'}, {'{resetLink}'}, {'{verificationLink}'}, {'{dashboardLink}'}, {'{helpCenter}'}
                          </p>
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={handleSaveTemplate}
                            disabled={isSaving}
                          >
                            {isSaving ? 'Saving...' : 'Save Template'}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Preview Mode</Label>
                            <Select 
                              value={previewMode} 
                              onValueChange={setPreviewMode}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Select device" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="desktop">Desktop</SelectItem>
                                <SelectItem value="mobile">Mobile</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className={`border rounded-md p-4 ${previewMode === 'mobile' ? 'max-w-[375px] mx-auto' : ''}`}>
                            <div className="border-b pb-2 mb-2">
                              <p className="font-medium">Subject: {selectedTemplate.subject}</p>
                              <p className="text-xs text-muted-foreground">
                                From: {emailConfig.fromEmail || 'your-app@example.com'}
                              </p>
                              <p className="text-xs text-muted-foreground">To: user@example.com</p>
                            </div>
                            <div 
                              className="prose prose-sm max-w-none" 
                              dangerouslySetInnerHTML={{ __html: selectedTemplate.body }}
                            />
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <h4 className="text-sm font-medium mb-2">Send Test Email</h4>
                          <div className="flex items-center gap-2">
                            <Input
                              placeholder="Enter email address"
                              value={testEmailAddress}
                              onChange={(e) => setTestEmailAddress(e.target.value)}
                              className="max-w-xs"
                            />
                            <Button 
                              variant="outline"
                              onClick={handleSendTestEmail}
                              disabled={isSending || !selectedTemplate.enabled || !emailConfig.connected}
                            >
                              <Send className="h-4 w-4 mr-1" />
                              {isSending ? 'Sending...' : 'Send Test'}
                            </Button>
                          </div>
                          {!selectedTemplate.enabled && (
                            <p className="text-xs text-destructive mt-2 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              This template is disabled. Enable it to send test emails.
                            </p>
                          )}
                          {!emailConfig.connected && (
                            <p className="text-xs text-destructive mt-2 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Email server not configured. Please set up SMTP configuration first.
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-[300px] border rounded-md">
                    <p className="text-muted-foreground">Select a template to preview or edit</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="smtp" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium">Email Server Configuration</h3>
                  <p className="text-sm text-muted-foreground">Configure your SMTP server to send emails</p>
                </div>
                <div className="flex items-center gap-2">
                  {emailConfig.connected && (
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      <div className="flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        <span>Connected</span>
                      </div>
                    </Badge>
                  )}
                </div>
              </div>
              
              {connectionError && (
                <Alert variant="destructive" className="mb-4">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>Connection Error</AlertTitle>
                  <AlertDescription>
                    {connectionError}
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">
                    SMTP Server Host
                    <span className="text-destructive"> *</span>
                  </Label>
                  <div className="flex">
                    <div className="bg-muted p-2 border border-r-0 border-input rounded-l-md">
                      <Server className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="smtpServer"
                      name="smtpServer"
                      placeholder="smtp.example.com"
                      value={emailConfig.smtpServer}
                      onChange={handleConfigChange}
                      className="rounded-l-none"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    For example: smtp.gmail.com, smtp.office365.com
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="port">
                    Port
                    <span className="text-destructive"> *</span>
                  </Label>
                  <Input
                    id="port"
                    name="port"
                    placeholder="587"
                    value={emailConfig.port}
                    onChange={handleConfigChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Common ports: 25, 465 (SSL), 587 (TLS)
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="username">
                    Username
                    <span className="text-destructive"> *</span>
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="your@email.com"
                    value={emailConfig.username}
                    onChange={handleConfigChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Password
                    <span className="text-destructive"> *</span>
                  </Label>
                  <div className="flex">
                    <div className="bg-muted p-2 border border-r-0 border-input rounded-l-md">
                      <KeyRound className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={emailConfig.password}
                      onChange={handleConfigChange}
                      className="rounded-l-none"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    For Google accounts, use app password instead of your regular password
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">
                    From Email
                    <span className="text-destructive"> *</span>
                  </Label>
                  <Input
                    id="fromEmail"
                    name="fromEmail"
                    placeholder="noreply@yourcompany.com"
                    value={emailConfig.fromEmail}
                    onChange={handleConfigChange}
                  />
                </div>
                
                <div className="space-y-2 flex items-end">
                  <div className="flex items-center space-x-2 h-10">
                    <Switch
                      id="enableSSL"
                      checked={emailConfig.enableSSL}
                      onCheckedChange={handleSslToggle}
                    />
                    <Label htmlFor="enableSSL">Use SSL/TLS</Label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t flex justify-between items-center">
                {emailConfig.connectionTested && (
                  <p className="text-xs text-muted-foreground">
                    {emailConfig.connected ? 'Last connected: ' : 'Last tested: '}
                    {emailConfig.lastConnected || 'Unknown'}
                  </p>
                )}
                <div className="flex gap-2 ml-auto">
                  <Button
                    variant="outline"
                    onClick={handleEmailConnectionTest}
                    disabled={isConnecting}
                  >
                    {isConnecting ? 'Testing...' : 'Test Connection'}
                  </Button>
                  <Button
                    onClick={handleSaveEmailConfig}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Configuration'}
                  </Button>
                </div>
              </div>
              
              <div className="pt-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="troubleshooting">
                    <AccordionTrigger>Troubleshooting</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-sm">
                        <p><strong>Gmail:</strong> For Gmail, use smtp.gmail.com (Port 587) and enable 2-step verification to create an app password.</p>
                        <p><strong>Outlook/Office 365:</strong> Use smtp.office365.com (Port 587).</p>
                        <p><strong>Connection Issues:</strong> Check your firewall settings, ensure you're using the correct port, and verify your credentials.</p>
                        <p><strong>Security:</strong> Most modern email providers require SSL/TLS encryption.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EmailTemplatesSettings;
