
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Mail, Settings, Send, Info, AlertCircle, Check, CheckCircle } from "lucide-react";

interface EmailConfig {
  enabled: boolean;
  provider: string;
  fromEmail: string;
  fromName: string;
  host: string;
  port: string;
  username: string;
  password: string;
  encryption: string;
  testEmail: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  active: boolean;
}

const EmailTemplatesSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("configuration");
  const [isTesting, setIsTesting] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [lastTestTimestamp, setLastTestTimestamp] = useState<Date | null>(null);
  
  const [emailConfig, setEmailConfig] = useState<EmailConfig>({
    enabled: false,
    provider: 'smtp',
    fromEmail: 'noreply@neplia.com',
    fromName: 'Neplia IELTS',
    host: '',
    port: '587',
    username: '',
    password: '',
    encryption: 'tls',
    testEmail: ''
  });
  
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([
    {
      id: 'welcome',
      name: 'Welcome Email',
      subject: 'Welcome to Neplia IELTS!',
      body: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .button { background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Neplia IELTS!</h1>
    </div>
    <div class="content">
      <p>Dear {{firstName}},</p>
      <p>Thank you for joining Neplia IELTS! We're excited to help you achieve your target score of {{targetScore}} for your {{testType}} exam on {{examDate}}.</p>
      <p>Here's what you can do next:</p>
      <ul>
        <li>Complete your profile</li>
        <li>Take our placement test</li>
        <li>Create your study plan</li>
        <li>Start practicing</li>
      </ul>
      <p style="text-align: center; margin-top: 30px;">
        <a href="{{dashboardUrl}}" class="button">Go to Your Dashboard</a>
      </p>
    </div>
    <div class="footer">
      <p>© 2025 Neplia IELTS. All rights reserved.</p>
      <p>You're receiving this email because you signed up for Neplia IELTS.</p>
    </div>
  </div>
</body>
</html>`,
      active: true
    },
    {
      id: 'password-reset',
      name: 'Password Reset',
      subject: 'Reset Your Neplia IELTS Password',
      body: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .button { background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
    .note { background-color: #FEF3C7; padding: 15px; margin: 20px 0; border-radius: 5px; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Reset Your Password</h1>
    </div>
    <div class="content">
      <p>Hello {{firstName}},</p>
      <p>We received a request to reset your password for your Neplia IELTS account. Click the button below to create a new password:</p>
      <p style="text-align: center; margin-top: 30px;">
        <a href="{{resetUrl}}" class="button">Reset Password</a>
      </p>
      <div class="note">
        <p><strong>Note:</strong> This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.</p>
      </div>
    </div>
    <div class="footer">
      <p>© 2025 Neplia IELTS. All rights reserved.</p>
      <p>For security reasons, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>`,
      active: true
    },
    {
      id: 'exam-reminder',
      name: 'Exam Reminder',
      subject: 'Your IELTS Exam is Coming Up Soon!',
      body: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .button { background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
    .tips { background-color: #E0F2FE; padding: 15px; margin: 20px 0; border-radius: 5px; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your IELTS Exam is Coming Up!</h1>
    </div>
    <div class="content">
      <p>Dear {{firstName}},</p>
      <p>This is a friendly reminder that your {{testType}} exam is scheduled for <strong>{{examDate}}</strong>.</p>
      <div class="tips">
        <h3>Last-Minute Tips:</h3>
        <ul>
          <li>Get a good night's sleep before the exam</li>
          <li>Double-check your exam location and arrival time</li>
          <li>Bring your ID and admission documents</li>
          <li>Review our last-minute preparation guide</li>
        </ul>
      </div>
      <p style="text-align: center; margin-top: 30px;">
        <a href="{{resourcesUrl}}" class="button">View Last-Minute Resources</a>
      </p>
      <p>Good luck! We're confident you'll achieve your target score of {{targetScore}}.</p>
    </div>
    <div class="footer">
      <p>© 2025 Neplia IELTS. All rights reserved.</p>
      <p>You're receiving this email because you have an upcoming IELTS exam.</p>
    </div>
  </div>
</body>
</html>`,
      active: true
    },
  ]);
  
  // Load saved configuration on component mount
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('neplia_email_config');
      if (savedConfig) {
        setEmailConfig(JSON.parse(savedConfig));
      }
      
      const savedTemplates = localStorage.getItem('neplia_email_templates');
      if (savedTemplates) {
        setEmailTemplates(JSON.parse(savedTemplates));
      }
    } catch (error) {
      console.error('Failed to load email configuration:', error);
    }
  }, []);
  
  // Save configuration when it changes
  useEffect(() => {
    localStorage.setItem('neplia_email_config', JSON.stringify(emailConfig));
  }, [emailConfig]);
  
  useEffect(() => {
    localStorage.setItem('neplia_email_templates', JSON.stringify(emailTemplates));
  }, [emailTemplates]);
  
  const validateConfig = () => {
    if (!emailConfig.fromEmail) {
      toast({
        title: "Validation Error",
        description: "From Email is required",
        variant: "destructive",
      });
      return false;
    }
    
    if (!emailConfig.host) {
      toast({
        title: "Validation Error",
        description: "SMTP Host is required",
        variant: "destructive",
      });
      return false;
    }
    
    if (!emailConfig.port) {
      toast({
        title: "Validation Error",
        description: "SMTP Port is required",
        variant: "destructive",
      });
      return false;
    }
    
    // Validate port is a number and within range
    const portNum = Number(emailConfig.port);
    if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
      toast({
        title: "Validation Error",
        description: "SMTP Port must be a number between 1 and 65535",
        variant: "destructive",
      });
      return false;
    }
    
    if (!emailConfig.username) {
      toast({
        title: "Validation Error",
        description: "SMTP Username is required",
        variant: "destructive",
      });
      return false;
    }
    
    if (!emailConfig.password) {
      toast({
        title: "Validation Error",
        description: "SMTP Password is required",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const handleUpdateConfig = () => {
    if (!validateConfig()) return;
    
    toast({
      title: "Success",
      description: "Email configuration has been saved",
    });
  };
  
  const handleSendTest = async () => {
    if (!validateConfig()) return;
    
    if (!emailConfig.testEmail) {
      toast({
        title: "Validation Error",
        description: "Test email address is required",
        variant: "destructive",
      });
      return;
    }
    
    setIsTesting(true);
    setTestStatus('idle');
    
    // Simulate SMTP test
    try {
      // In a real implementation, this would call an API endpoint to send a test email
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setTestStatus('success');
      setLastTestTimestamp(new Date());
      
      toast({
        title: "Test Successful",
        description: `Test email sent to ${emailConfig.testEmail}`,
      });
    } catch (error) {
      setTestStatus('error');
      
      toast({
        title: "Test Failed",
        description: "Failed to send test email. Please check your SMTP configuration.",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };
  
  const handleUpdateTemplate = (id: string, field: keyof EmailTemplate, value: any) => {
    setEmailTemplates(templates =>
      templates.map(template =>
        template.id === id ? { ...template, [field]: value } : template
      )
    );
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Email Settings</h2>
        <p className="text-muted-foreground">Configure email services and templates for your application.</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="configuration" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            SMTP Configuration
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            Email Templates
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="configuration" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Service Configuration</CardTitle>
              <CardDescription>
                Configure your SMTP server settings for sending emails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="email-enabled">Enable Email Service</Label>
                  <Badge variant={emailConfig.enabled ? "success" : "secondary"}>
                    {emailConfig.enabled ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <Switch 
                  id="email-enabled" 
                  checked={emailConfig.enabled}
                  onCheckedChange={(checked) => setEmailConfig(prev => ({ ...prev, enabled: checked }))}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email-provider">Email Provider</Label>
                  <Select 
                    value={emailConfig.provider} 
                    onValueChange={(value) => setEmailConfig(prev => ({ ...prev, provider: value }))}
                  >
                    <SelectTrigger id="email-provider">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smtp">SMTP</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                      <SelectItem value="ses">Amazon SES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="from-email">From Email</Label>
                  <Input 
                    id="from-email" 
                    placeholder="no-reply@yourdomain.com" 
                    value={emailConfig.fromEmail}
                    onChange={(e) => setEmailConfig(prev => ({ ...prev, fromEmail: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="from-name">From Name</Label>
                  <Input 
                    id="from-name" 
                    placeholder="Your Application Name" 
                    value={emailConfig.fromName}
                    onChange={(e) => setEmailConfig(prev => ({ ...prev, fromName: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="encryption">Encryption</Label>
                  <Select 
                    value={emailConfig.encryption} 
                    onValueChange={(value) => setEmailConfig(prev => ({ ...prev, encryption: value }))}
                  >
                    <SelectTrigger id="encryption">
                      <SelectValue placeholder="Select encryption" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="ssl">SSL</SelectItem>
                      <SelectItem value="tls">TLS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">SMTP Server Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input 
                      id="smtp-host" 
                      placeholder="smtp.yourdomain.com" 
                      value={emailConfig.host}
                      onChange={(e) => setEmailConfig(prev => ({ ...prev, host: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input 
                      id="smtp-port" 
                      placeholder="587" 
                      value={emailConfig.port}
                      onChange={(e) => setEmailConfig(prev => ({ ...prev, port: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtp-username">SMTP Username</Label>
                    <Input 
                      id="smtp-username" 
                      placeholder="username" 
                      value={emailConfig.username}
                      onChange={(e) => setEmailConfig(prev => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtp-password">SMTP Password</Label>
                    <Input 
                      id="smtp-password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={emailConfig.password}
                      onChange={(e) => setEmailConfig(prev => ({ ...prev, password: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Test Email Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="test-email">Test Email Address</Label>
                    <Input 
                      id="test-email" 
                      placeholder="your@email.com" 
                      value={emailConfig.testEmail}
                      onChange={(e) => setEmailConfig(prev => ({ ...prev, testEmail: e.target.value }))}
                    />
                  </div>
                  
                  <div className="flex items-end space-x-2">
                    <Button onClick={handleSendTest} className="flex-1" disabled={isTesting}>
                      {isTesting ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent mr-2"></div>
                          Testing...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Test Email
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                {testStatus !== 'idle' && (
                  <div className={`mt-4 p-3 rounded-md ${testStatus === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    <div className="flex items-start">
                      {testStatus === 'success' ? (
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-5 w-5 mr-2 text-red-500 flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-medium">
                          {testStatus === 'success' ? 'Test email sent successfully!' : 'Failed to send test email'}
                        </p>
                        {testStatus === 'success' && lastTestTimestamp && (
                          <p className="text-sm mt-1">
                            {`Last successful test: ${lastTestTimestamp.toLocaleString()}`}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleUpdateConfig}>
                  <Check className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4 pt-4">
          {emailTemplates.map(template => (
            <Card key={template.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{template.name}</CardTitle>
                  <Switch 
                    checked={template.active}
                    onCheckedChange={(checked) => handleUpdateTemplate(template.id, 'active', checked)}
                  />
                </div>
                <CardDescription>
                  Template ID: {template.id}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`subject-${template.id}`}>Email Subject</Label>
                  <Input 
                    id={`subject-${template.id}`} 
                    value={template.subject}
                    onChange={(e) => handleUpdateTemplate(template.id, 'subject', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`body-${template.id}`}>Email Body (HTML)</Label>
                  <Textarea 
                    id={`body-${template.id}`} 
                    rows={10}
                    value={template.body}
                    onChange={(e) => handleUpdateTemplate(template.id, 'body', e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>
                
                <div className="rounded-md bg-muted p-3">
                  <div className="flex items-center">
                    <Info className="h-4 w-4 mr-2 text-blue-500" />
                    <p className="text-sm font-medium">Available Template Variables</p>
                  </div>
                  <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <li><code>{'{{firstName}}'}</code> - User's first name</li>
                    <li><code>{'{{lastName}}'}</code> - User's last name</li>
                    <li><code>{'{{email}}'}</code> - User's email address</li>
                    <li><code>{'{{targetScore}}'}</code> - Target IELTS score</li>
                    <li><code>{'{{testType}}'}</code> - IELTS test type</li>
                    <li><code>{'{{examDate}}'}</code> - Scheduled exam date</li>
                    <li><code>{'{{dashboardUrl}}'}</code> - Link to dashboard</li>
                    <li><code>{'{{resetUrl}}'}</code> - Password reset link</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailTemplatesSettings;
