
import React, { useState, useEffect } from 'react';
import { useQuestions } from '@/contexts/QuestionsContext';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Users, 
  Settings, 
  MessageCircle, 
  Gauge, 
  Shield, 
  LogOut,
  Database,
  ServerCog,
  LayoutDashboard,
  Bell,
  Code,
  Palette,
  LineChart,
  Server,
  CloudCog,
  Globe,
  Lock,
  CreditCard,
  Mail,
  UploadCloud
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import AdminOverviewTab from '@/components/admin/AdminOverviewTab';
import AdminCommunityTab from '@/components/admin/AdminCommunityTab';
import AdminUsersTab from '@/components/admin/AdminUsersTab';
import AdminContentTab from '@/components/admin/AdminContentTab';
import DatabaseConfig from '@/components/admin/DatabaseConfig';
import DatabaseManager from '@/components/admin/DatabaseManager';
import UIComponentsManager from '@/components/admin/UIComponentsManager';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar';

const AdminDashboard = () => {
  const { currentUser, logout, isAdmin } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    if (!currentUser) {
      console.log('AdminDashboard: No current user, redirecting to signin');
      toast({
        title: "Authentication required",
        description: "Please sign in to access the admin dashboard",
        variant: "destructive"
      });
      navigate('/signin');
      return;
    }
    
    // Check if user is admin
    if (!isAdmin) {
      console.log('AdminDashboard: User is not admin, redirecting to dashboard');
      toast({
        title: "Access denied",
        description: "You do not have administrative privileges",
        variant: "destructive"
      });
      navigate('/dashboard');
      return;
    }
    
    console.log('AdminDashboard: User is admin, showing admin dashboard');
    setIsLoading(false);
  }, [currentUser, isAdmin, navigate, toast]);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Enhanced menu items for the sidebar
  const mainNavigationItems = [
    { id: 'overview', title: 'Dashboard Overview', icon: Gauge },
    { id: 'community', title: 'Community Management', icon: MessageCircle },
    { id: 'users', title: 'User Management', icon: Users },
    { id: 'content', title: 'Content Management', icon: FileText },
  ];

  const frontendItems = [
    { id: 'ui-components', title: 'UI Components', icon: Palette },
    { id: 'analytics', title: 'Analytics Dashboard', icon: LineChart },
    { id: 'themes', title: 'Theme Configuration', icon: Palette },
  ];

  const backendItems = [
    { id: 'database', title: 'Database Configuration', icon: Database },
    { id: 'database-manager', title: 'Database Manager', icon: Server },
    { id: 'api-endpoints', title: 'API Endpoints', icon: Code },
    { id: 'server-settings', title: 'Server Configuration', icon: ServerCog },
    { id: 'cloud-services', title: 'Cloud Services', icon: CloudCog },
  ];

  const systemItems = [
    { id: 'security', title: 'Security & Access', icon: Lock },
    { id: 'integrations', title: 'Third-party Integrations', icon: Globe },
    { id: 'payment-gateway', title: 'Payment Gateway', icon: CreditCard },
    { id: 'email-templates', title: 'Email Templates', icon: Mail },
    { id: 'backup-restore', title: 'Backup & Restore', icon: UploadCloud },
    { id: 'settings', title: 'System Settings', icon: Settings },
  ];

  // Render the content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverviewTab />;
      case 'community':
        return <AdminCommunityTab />;
      case 'users':
        return <AdminUsersTab />;
      case 'content':
        return <AdminContentTab />;
      case 'database':
        return <DatabaseConfig />;
      case 'database-manager':
        return <DatabaseManager />;
      case 'ui-components':
        return <UIComponentsManager />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'themes':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Theme Configuration</h2>
            <p className="text-muted-foreground">Configure application themes and visual styles.</p>
            <UIComponentsManager />
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">System Settings</h2>
            <p className="text-muted-foreground">Configure system-wide settings and preferences.</p>
          </div>
        );
      case 'api-endpoints':
      case 'server-settings':
      case 'cloud-services':
      case 'security':
      case 'integrations':
      case 'payment-gateway':
      case 'email-templates':
      case 'backup-restore':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{activeTab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
            <p className="text-muted-foreground">This feature will be implemented soon.</p>
          </div>
        );
      default:
        return <AdminOverviewTab />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/10">
        {/* Sidebar - Now on the left */}
        <Sidebar side="left" variant="floating" collapsible="icon">
          <SidebarHeader className="flex h-16 items-center border-b px-6">
            <div className="flex items-center gap-2 font-semibold">
              <Shield className="h-5 w-5 text-primary" />
              Admin Controls
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainNavigationItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        isActive={activeTab === item.id}
                        onClick={() => setActiveTab(item.id)}
                        tooltip={item.title}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Frontend Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {frontendItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        isActive={activeTab === item.id}
                        onClick={() => setActiveTab(item.id)}
                        tooltip={item.title}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Backend Configuration</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {backendItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        isActive={activeTab === item.id}
                        onClick={() => setActiveTab(item.id)}
                        tooltip={item.title}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>System</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {systemItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        isActive={activeTab === item.id}
                        onClick={() => setActiveTab(item.id)}
                        tooltip={item.title}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-xs text-muted-foreground">Admin Panel v1.0</span>
              </div>
              <SidebarTrigger />
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </div>
          </header>
          
          {/* Main dashboard content */}
          <main className="flex flex-1">
            <SidebarInset className="p-4 md:p-6 pt-0">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                {renderTabContent()}
              </div>
            </SidebarInset>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
