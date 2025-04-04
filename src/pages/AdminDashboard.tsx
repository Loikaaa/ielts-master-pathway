
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
  LogOut
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminOverviewTab from '@/components/admin/AdminOverviewTab';
import AdminCommunityTab from '@/components/admin/AdminCommunityTab';
import AdminUsersTab from '@/components/admin/AdminUsersTab';
import AdminContentTab from '@/components/admin/AdminContentTab';

const AdminDashboard = () => {
  const { currentUser, logout, isAdmin } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in and is admin
    if (!currentUser) {
      console.log('AdminDashboard: No current user, redirecting to signin');
      navigate('/signin');
      return;
    }
    
    if (!isAdmin) {
      console.log('AdminDashboard: User is not admin, redirecting to dashboard');
      navigate('/dashboard');
      return;
    }
    
    console.log('AdminDashboard: User is admin, showing admin dashboard');
    setIsLoading(false);
  }, [currentUser, isAdmin, navigate]);

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

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="rounded-lg bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-6 mb-6 border border-indigo-200 dark:border-indigo-800/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-primary mr-4" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
        <p className="text-muted-foreground mt-2">
          Manage content, users, and system settings from this central administrative hub.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">
            <Gauge className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="community">
            <MessageCircle className="h-4 w-4 mr-2" />
            Community Manager
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="content">
            <FileText className="h-4 w-4 mr-2" />
            Content Management
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <AdminOverviewTab />
        </TabsContent>
        
        <TabsContent value="community">
          <AdminCommunityTab />
        </TabsContent>
        
        <TabsContent value="users">
          <AdminUsersTab />
        </TabsContent>
        
        <TabsContent value="content">
          <AdminContentTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
