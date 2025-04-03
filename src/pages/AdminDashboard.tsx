
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  BookOpen, 
  Mic, 
  Headphones, 
  Plus, 
  PenSquare, 
  BookOpenCheck, 
  BarChart2, 
  FileEdit, 
  Users,
  Database,
  ServerCog,
  GanttChart,
  Settings,
  LineChart,
  PieChart,
  ArrowUpRight,
  TrendingUp,
  CircleUser,
  Bell,
  FileQuestion,
  Save,
  RefreshCcw,
  Cog,
  Shield,
  ArrowLeft,
  ArrowRight,
  ServerOff
} from "lucide-react";
import ReadingQuestionForm from '@/components/admin/ReadingQuestionForm';
import WritingQuestionForm from '@/components/admin/WritingQuestionForm';
import ListeningQuestionForm from '@/components/admin/ListeningQuestionForm';
import SpeakingQuestionForm from '@/components/admin/SpeakingQuestionForm';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useQuestions } from '@/contexts/QuestionsContext';
import { toast } from 'sonner';
import QuestionEditor from '@/components/admin/QuestionEditor';
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset
} from "@/components/ui/sidebar";
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import DatabaseManager from '@/components/admin/DatabaseManager';
import MaintenanceSettings from '@/components/admin/MaintenanceSettings';
import AnalyticsSettings from '@/components/admin/AnalyticsSettings';
import DatabaseConfig from '@/components/admin/DatabaseConfig';
import { getDataSourceConnections } from '@/utils/settingsStorage';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("reading");
  const [selectedFeature, setSelectedFeature] = useState("dashboard");
  const [activeSystemTab, setActiveSystemTab] = useState("general");
  const { addQuestion, questions } = useQuestions();
  const { toast: uiToast } = useToast();
  const navigate = useNavigate();
  const [connectedSources, setConnectedSources] = useState([]);

  // Load data sources on component mount
  useEffect(() => {
    const sources = getDataSourceConnections();
    setConnectedSources(sources);
  }, []);

  // Navigation handlers
  const handleBack = () => navigate(-1);
  const handleForward = () => navigate(1);

  // Get question counts by type
  const readingCount = questions.filter(q => q.skillType === 'reading').length || 124;
  const writingCount = questions.filter(q => q.skillType === 'writing').length || 87;
  const listeningCount = questions.filter(q => q.skillType === 'listening').length || 96;
  const speakingCount = questions.filter(q => q.skillType === 'speaking').length || 112;
  const totalQuestions = readingCount + writingCount + listeningCount + speakingCount;

  // Mock stats for the dashboard
  const mockStats = {
    usersCount: 7843,
    activeUsers: 2354,
    testsCompleted: 12879,
    avgScore: 7.6,
    dailyVisits: 843,
    monthlyGrowth: 18.7
  };

  // Form save and cancel handlers
  const handleSaveQuestion = (formData: any) => {
    console.log('Saving question data:', formData);
    
    // Prepare the question data with the proper format
    const questionData = {
      ...formData,
      id: `${activeTab}-${Date.now()}`,
      skillType: activeTab,
      points: formData.points || 10,
      // Convert minutes to seconds for time limit if needed
      timeLimit: activeTab === 'reading' || activeTab === 'writing' 
        ? formData.timeLimit * 60 
        : formData.timeLimit,
    };
    
    // Add the question to the context
    addQuestion(questionData);
    
    // Show success notification
    toast.success('Question saved successfully!');
    uiToast({
      title: "Question Added",
      description: "The question has been successfully added to the database.",
    });
  };

  const handleCancelForm = () => {
    // Handle cancellation (e.g., reset form, show confirmation, etc.)
    if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
      // Reset form or other state as needed
      toast.info('Question creation cancelled');
    }
  };

  // Handle settings save
  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  const AdminSidebar = () => (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="relative rounded-full h-8 w-8 flex items-center justify-center bg-primary/10 text-primary">
            <ServerCog className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
          </div>
          <div>
            <p className="text-sm font-bold">IELTS Pro Admin</p>
            <p className="text-xs text-muted-foreground">Content Management</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Core</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={selectedFeature === "dashboard"} onClick={() => setSelectedFeature("dashboard")}>
                <Link to="/admin-dashboard">
                  <BarChart2 className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={selectedFeature === "statistics"} onClick={() => setSelectedFeature("statistics")}>
                <button>
                  <LineChart className="h-4 w-4" />
                  <span>Statistics</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={selectedFeature === "users"} onClick={() => setSelectedFeature("users")}>
                <button>
                  <Users className="h-4 w-4" />
                  <span>User Management</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={selectedFeature === "reading"} onClick={() => setSelectedFeature("reading")}>
                <button>
                  <FileText className="h-4 w-4" />
                  <span>Reading Questions</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={selectedFeature === "writing"} onClick={() => setSelectedFeature("writing")}>
                <button>
                  <PenSquare className="h-4 w-4" />
                  <span>Writing Questions</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={selectedFeature === "listening"} onClick={() => setSelectedFeature("listening")}>
                <button>
                  <Headphones className="h-4 w-4" />
                  <span>Listening Questions</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={selectedFeature === "speaking"} onClick={() => setSelectedFeature("speaking")}>
                <button>
                  <Mic className="h-4 w-4" />
                  <span>Speaking Questions</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={selectedFeature === "blog"} onClick={() => setSelectedFeature("blog")}>
                <Link to="/admin-blog-manager">
                  <PenSquare className="h-4 w-4" />
                  <span>Blog Posts</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={selectedFeature === "settings"} onClick={() => setSelectedFeature("settings")}>
                <button>
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={selectedFeature === "database"} onClick={() => setSelectedFeature("database")}>
                <button>
                  <Database className="h-4 w-4" />
                  <span>Database</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={selectedFeature === "backend"} onClick={() => setSelectedFeature("backend")}>
                <Link to="/admin-backend">
                  <ServerCog className="h-4 w-4" />
                  <span>Backend Control</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="space-y-2 p-3">
          <div className="text-sm text-muted-foreground">
            Connected data sources: {connectedSources.filter(s => s.status === 'connected').length}/{connectedSources.length}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );

  const DashboardOverview = () => (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, manage your IELTS content here</p>
        </div>
        <div className="flex items-center gap-4">
          <Button size="icon" variant="outline" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary"></span>
          </Button>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-reading/10 to-transparent border-reading/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-reading/20 text-reading p-2 rounded-md">
                <FileText className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-reading" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Reading Questions</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold">{readingCount}</h3>
              <Badge variant="outline" className="text-xs bg-reading/10 text-reading">
                <TrendingUp className="h-3 w-3 mr-1" /> 12%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-writing/10 to-transparent border-writing/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-writing/20 text-writing p-2 rounded-md">
                <PenSquare className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-writing" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Writing Questions</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold">{writingCount}</h3>
              <Badge variant="outline" className="text-xs bg-writing/10 text-writing">
                <TrendingUp className="h-3 w-3 mr-1" /> 8%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-listening/10 to-transparent border-listening/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-listening/20 text-listening p-2 rounded-md">
                <Headphones className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-listening" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Listening Questions</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold">{listeningCount}</h3>
              <Badge variant="outline" className="text-xs bg-listening/10 text-listening">
                <TrendingUp className="h-3 w-3 mr-1" /> 10%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-speaking/10 to-transparent border-speaking/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-speaking/20 text-speaking p-2 rounded-md">
                <Mic className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-speaking" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Speaking Questions</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold">{speakingCount}</h3>
              <Badge variant="outline" className="text-xs bg-speaking/10 text-speaking">
                <TrendingUp className="h-3 w-3 mr-1" /> 15%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <BarChart2 className="mr-2 h-5 w-5 text-primary" />
              Performance Overview
            </CardTitle>
            <CardDescription>User activity and engagement stats</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="h-[240px] flex items-center justify-center bg-accent/30 rounded-md">
              <LineChart className="h-16 w-16 text-muted-foreground/50" />
              <span className="ml-2 text-muted-foreground/70">Performance Chart</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-muted-foreground">
            <div>Total Users: {mockStats.usersCount.toLocaleString()}</div>
            <div>Active Now: {mockStats.activeUsers.toLocaleString()}</div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              User Statistics
            </CardTitle>
            <CardDescription>User growth and engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center p-6">
              <div className="h-[180px] w-[180px] flex items-center justify-center relative">
                <PieChart className="h-full w-full text-muted-foreground/20 absolute" />
                <div className="text-center">
                  <div className="text-3xl font-bold">{mockStats.avgScore}</div>
                  <div className="text-sm text-muted-foreground">Avg. Score</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-accent/30 p-3 rounded-md">
                <div className="text-2xl font-bold">
                  {mockStats.dailyVisits}
                  <span className="text-xs text-green-500 font-normal ml-1">↑ 12%</span>
                </div>
                <div className="text-xs text-muted-foreground">Daily Visits</div>
              </div>
              <div className="bg-accent/30 p-3 rounded-md">
                <div className="text-2xl font-bold">
                  {mockStats.monthlyGrowth}%
                  <span className="text-xs text-green-500 font-normal ml-1">↑ 3%</span>
                </div>
                <div className="text-xs text-muted-foreground">Monthly Growth</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <BookOpenCheck className="mr-2 h-5 w-5 text-primary" />
              Practice Tests
            </CardTitle>
            <CardDescription>Test creation and completion stats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <div>
                <div className="text-3xl font-bold">47</div>
                <div className="text-sm text-muted-foreground">Total Tests</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{mockStats.testsCompleted.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Create New Test
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <FileQuestion className="mr-2 h-5 w-5 text-primary" />
              Recent Questions
            </CardTitle>
            <CardDescription>Latest added questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: "IELTS Reading Passage on Climate Change", type: "reading", date: "Apr 2, 2025" },
                { title: "Writing Task 2: Environment Essay", type: "writing", date: "Apr 1, 2025" },
                { title: "Listening Section 3: University Housing", type: "listening", date: "Mar 30, 2025" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-md hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-md flex items-center justify-center 
                      ${item.type === 'reading' ? 'bg-reading/20 text-reading' : 
                      item.type === 'writing' ? 'bg-writing/20 text-writing' : 
                      item.type === 'listening' ? 'bg-listening/20 text-listening' : 
                      'bg-speaking/20 text-speaking'}`}>
                      {item.type === 'reading' ? <FileText className="h-4 w-4" /> : 
                       item.type === 'writing' ? <PenSquare className="h-4 w-4" /> : 
                       item.type === 'listening' ? <Headphones className="h-4 w-4" /> : 
                       <Mic className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.date}</div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  const SystemSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
      
      <Tabs value={activeSystemTab} onValueChange={setActiveSystemTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="general" className="flex items-center gap-1">
            <Cog className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-1">
            <ServerOff className="h-4 w-4" />
            Maintenance
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-1">
            <Database className="h-4 w-4" />
            Database
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1">
            <BarChart2 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Configure security and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Enable for all administrators</span>
                    <Badge>Enabled</Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Session Timeout</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Automatic logout after inactivity</span>
                    <Badge variant="outline">30 minutes</Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Login Attempts</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Max attempts before lockout</span>
                    <Badge variant="outline">5 attempts</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cog className="h-5 w-5 mr-2 text-primary" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  System-wide configuration options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Auto Backup</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Scheduled database backups</span>
                    <Badge>Enabled</Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Error Logging</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Detail level of error logs</span>
                    <Badge variant="outline">Detailed</Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">System Timezone</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Default system timezone</span>
                    <Badge variant="outline">UTC</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RefreshCcw className="h-5 w-5 mr-2 text-primary" />
                  System Maintenance
                </CardTitle>
                <CardDescription>
                  Maintain system performance and data integrity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="w-full justify-start" onClick={() => toast.success("Cache cleared successfully")}>
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    Clear Cache
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => toast.success("Database backup started")}>
                    <Database className="h-4 w-4 mr-2" />
                    Backup Database
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => toast.success("API connections tested")}>
                    <ServerCog className="h-4 w-4 mr-2" />
                    Test API Connections
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="maintenance">
          <MaintenanceSettings />
        </TabsContent>
        
        <TabsContent value="database">
          <DatabaseConfig />
        </TabsContent>
        
        <TabsContent value="analytics">
          <AnalyticsSettings />
        </TabsContent>
      </Tabs>
    </div>
  );

  const QuestionCreator = () => (
    <Card>
      <CardHeader>
        <CardTitle>Question Creator</CardTitle>
        <CardDescription>Create new questions for each skill type</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="reading" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Reading
            </TabsTrigger>
            <TabsTrigger value="writing" className="flex items-center">
              <PenSquare className="mr-2 h-4 w-4" />
              Writing
            </TabsTrigger>
            <TabsTrigger value="listening" className="flex items-center">
              <Headphones className="mr-2 h-4 w-4" />
              Listening
            </TabsTrigger>
            <TabsTrigger value="speaking" className="flex items-center">
              <Mic className="mr-2 h-4 w-4" />
              Speaking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reading" className="mt-0">
            <ReadingQuestionForm 
              onSave={handleSaveQuestion} 
              onCancel={handleCancelForm} 
            />
          </TabsContent>

          <TabsContent value="writing" className="mt-0">
            <WritingQuestionForm 
              onSave={handleSaveQuestion} 
              onCancel={handleCancelForm} 
            />
          </TabsContent>

          <TabsContent value="listening" className="mt-0">
            <ListeningQuestionForm 
              onSave={handleSaveQuestion} 
              onCancel={handleCancelForm} 
            />
          </TabsContent>

          <TabsContent value="speaking" className="mt-0">
            <SpeakingQuestionForm 
              onSave={handleSaveQuestion} 
              onCancel={handleCancelForm} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );

  const renderFeatureContent = () => {
    switch (selectedFeature) {
      case "dashboard":
        return <DashboardOverview />;
      case "reading":
      case "writing":
      case "listening":
      case "speaking":
        return <QuestionEditor questionType={selectedFeature} />;
      case "database":
        return <DatabaseManager />;
      case "settings":
        return <SystemSettings />;
      case "statistics":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Statistics Dashboard</h2>
            <p>Detailed analytics and performance data will be displayed here.</p>
            <Card className="h-96 flex items-center justify-center">
              <LineChart className="h-16 w-16 text-muted-foreground/50" />
              <span className="ml-2 text-muted-foreground/70">Statistics coming soon</span>
            </Card>
          </div>
        );
      case "users":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">User Management</h2>
            <p>User accounts administration will be displayed here.</p>
            <Card className="h-96 flex items-center justify-center">
              <Users className="h-16 w-16 text-muted-foreground/50" />
              <span className="ml-2 text-muted-foreground/70">User management coming soon</span>
            </Card>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <DashboardOverview />
            <Separator />
            <QuestionCreator />
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex">
          <AdminSidebar />
          <SidebarInset className="px-6 py-6 mt-16">
            <div className="flex justify-between items-center mb-6">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleBack}
                className="h-10 w-10 rounded-full bg-background shadow hover:bg-accent/50 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Go back</span>
              </Button>
              
              <SidebarTrigger className="mb-4" />
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleForward}
                className="h-10 w-10 rounded-full bg-background shadow hover:bg-accent/50 transition-colors"
              >
                <ArrowRight className="h-5 w-5" />
                <span className="sr-only">Go forward</span>
              </Button>
            </div>
            
            {renderFeatureContent()}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
