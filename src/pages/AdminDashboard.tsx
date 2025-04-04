
import React, { useState, useEffect } from 'react';
import { useQuestions } from '@/contexts/QuestionsContext';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  FileText, 
  Users, 
  Settings, 
  MessageCircle, 
  Calendar, 
  UserCheck, 
  ThumbsUp, 
  Shield, 
  Database, 
  BarChart4, 
  Gauge, 
  Server 
} from 'lucide-react';
import { Question } from '@/types/questions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminOverviewTab from '@/components/admin/AdminOverviewTab';
import AdminCommunityTab from '@/components/admin/AdminCommunityTab';
import AdminUsersTab from '@/components/admin/AdminUsersTab';
import AdminContentTab from '@/components/admin/AdminContentTab';

const AdminDashboard = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Only loading state is needed here, admin check is done by the wrapper
    setIsLoading(false);
  }, [currentUser]);

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
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-primary mr-4" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
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
