
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
  Bell
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import AdminOverviewTab from '@/components/admin/AdminOverviewTab';
import AdminCommunityTab from '@/components/admin/AdminCommunityTab';
import AdminUsersTab from '@/components/admin/AdminUsersTab';
import AdminContentTab from '@/components/admin/AdminContentTab';
import DatabaseConfig from '@/components/admin/DatabaseConfig';
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

  // Menu items for the sidebar
  const sidebarItems = [
    { id: 'overview', title: 'Overview', icon: Gauge },
    { id: 'community', title: 'Community', icon: MessageCircle },
    { id: 'users', title: 'User Management', icon: Users },
    { id: 'content', title: 'Content Management', icon: FileText },
    { id: 'database', title: 'Database Config', icon: Database },
    { id: 'settings', title: 'Settings', icon: Settings },
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
      case 'settings':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">System Settings</h2>
            <p className="text-muted-foreground">Configure system-wide settings and preferences.</p>
          </div>
        );
      default:
        return <AdminOverviewTab />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/10">
        {/* Main content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
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

        {/* Sidebar */}
        <Sidebar side="right" variant="floating" collapsible="icon">
          <SidebarHeader className="flex h-16 items-center border-b px-6">
            <div className="flex items-center gap-2 font-semibold">
              <LayoutDashboard className="h-5 w-5" />
              Admin Controls
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
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
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Maintenance">
                      <ServerCog className="mr-2 h-4 w-4" />
                      <span>Maintenance</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Notifications">
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
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
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
