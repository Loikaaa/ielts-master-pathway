
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Send, Edit, AlertCircle, Check, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { saveSettings, getSettings } from '@/utils/settingsStorage';

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
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop');

  useEffect(() => {
    // Load existing email templates or use defaults
    const settings = getSettings() || {};
    const savedTemplates = settings.emailTemplates || DEFAULT_TEMPLATES;
    setTemplates(savedTemplates);
    
    if (savedTemplates.length > 0) {
      setSelectedTemplate(savedTemplates[0]);
    }
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
    
    // Save to storage
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

  const handleSaveTemplate = () => {
    if (!selectedTemplate) return;
    
    setIsSaving(true);
    
    try {
      const updatedTemplates = templates.map(template => 
        template.id === selectedTemplate.id ? selectedTemplate : template
      );
      
      setTemplates(updatedTemplates);
      
      // Save to storage
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
    
    setIsSending(true);
    
    // Simulate sending test email
    setTimeout(() => {
      toast.success(`Test email sent to ${testEmailAddress}`);
      setIsSending(false);
    }, 1500);
  };

  const copyTemplate = () => {
    if (!selectedTemplate) return;
    
    // Create a deep copy with new ID
    const newTemplate: EmailTemplate = {
      ...selectedTemplate,
      id: `${selectedTemplate.id}-copy-${Date.now()}`,
      name: `${selectedTemplate.name} (Copy)`
    };
    
    const updatedTemplates = [...templates, newTemplate];
    setTemplates(updatedTemplates);
    
    // Save to storage
    const settings = getSettings() || {};
    settings.emailTemplates = updatedTemplates;
    saveSettings(settings);
    
    // Select the new template
    setSelectedTemplate(newTemplate);
    setIsEditing(true);
    
    toast.success('Template copied successfully');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          Email Templates
        </CardTitle>
        <CardDescription>
          Manage and customize email notifications sent to users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Template List */}
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
          
          {/* Template Editor */}
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
                  /* Edit Mode */
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
                  /* Preview Mode */
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
                          <p className="text-xs text-muted-foreground">From: your-app@example.com</p>
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
                          disabled={isSending || !selectedTemplate.enabled}
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
      </CardContent>
    </Card>
  );
};

export default EmailTemplatesSettings;
