
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Database,
  ServerCog,
  Upload,
  Download,
  FileJson,
  Users,
  GanttChart,
  BarChart4,
  BookOpen,
  FileText,
  Mic,
  Brain,
  Link as LinkIcon,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowLeft,
  ArrowRight,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useQuestions } from '@/contexts/QuestionsContext';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SettingsComponent from '@/components/admin/Settings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const BackendControl = () => {
  const { questions, loading } = useQuestions();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Get question counts by type
  const readingCount = questions.filter(q => q.skillType === 'reading').length;
  const writingCount = questions.filter(q => q.skillType === 'writing').length;
  const listeningCount = questions.filter(q => q.skillType === 'listening').length;
  const speakingCount = questions.filter(q => q.skillType === 'speaking').length;
  const totalCount = questions.length;

  // Navigation handlers
  const handleBack = () => navigate(-1);
  const handleForward = () => navigate(1);

  // Mock connected data sources
  const connectedSources = [
    { name: 'Main Database', status: 'connected', type: 'postgres', lastSynced: '5 minutes ago' },
    { name: 'User Authentication', status: 'connected', type: 'auth', lastSynced: '10 minutes ago' },
    { name: 'File Storage', status: 'connected', type: 'storage', lastSynced: '30 minutes ago' },
    { name: 'Analytics', status: 'disconnected', type: 'analytics', lastSynced: 'Never' }
  ];

  // Connect data source handler
  const handleConnectSource = (sourceName: string) => {
    toast.success(`Connected to ${sourceName} successfully!`);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Controls */}
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
        
        <h1 className="text-2xl font-bold">Backend Control Panel</h1>
        
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <ServerCog className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Backend Dashboard</CardTitle>
                  <CardDescription>Manage your IELTS preparation system</CardDescription>
                </div>
                <Database className="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-accent/50 p-4 rounded-lg flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ServerCog className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Server Status</div>
                    <div className="text-sm text-muted-foreground">Online</div>
                  </div>
                </div>
                <div className="bg-accent/50 p-4 rounded-lg flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Active Users</div>
                    <div className="text-sm text-muted-foreground">1,245</div>
                  </div>
                </div>
                <div className="bg-accent/50 p-4 rounded-lg flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BarChart4 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">API Usage</div>
                    <div className="text-sm text-muted-foreground">76%</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Database Storage</span>
                  <span>68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>API Rate Limit</span>
                  <span>42%</span>
                </div>
                <Progress value={42} className="h-2" />
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => toast.success("Data upload started")}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Data
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => toast.success("Data export successful")}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => toast.success("API Logs opened")}>
                <FileJson className="h-4 w-4 mr-2" />
                API Logs
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connected Data Sources</CardTitle>
              <CardDescription>
                Database and external API connections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        source.status === 'connected' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {source.type === 'postgres' ? <Database className={`h-5 w-5 ${
                          source.status === 'connected' ? 'text-green-600' : 'text-red-600'
                        }`} /> :
                        source.type === 'auth' ? <Users className={`h-5 w-5 ${
                          source.status === 'connected' ? 'text-green-600' : 'text-red-600'
                        }`} /> :
                        source.type === 'storage' ? <FileJson className={`h-5 w-5 ${
                          source.status === 'connected' ? 'text-green-600' : 'text-red-600'
                        }`} /> :
                        <BarChart4 className={`h-5 w-5 ${
                          source.status === 'connected' ? 'text-green-600' : 'text-red-600'
                        }`} />}
                      </div>
                      <div>
                        <div className="font-medium flex items-center">
                          {source.name}
                          {source.status === 'connected' ? 
                            <CheckCircle className="ml-2 h-4 w-4 text-green-600" /> : 
                            <AlertCircle className="ml-2 h-4 w-4 text-red-600" />}
                        </div>
                        <div className="text-xs text-muted-foreground">Last synced: {source.lastSynced}</div>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant={source.status === 'connected' ? 'outline' : 'default'}
                      onClick={() => source.status !== 'connected' && handleConnectSource(source.name)}
                    >
                      {source.status === 'connected' ? (
                        <LinkIcon className="mr-1 h-4 w-4" />
                      ) : (
                        <LinkIcon className="mr-1 h-4 w-4" />
                      )}
                      {source.status === 'connected' ? 'Configure' : 'Connect'}
                    </Button>
                  </div>
                ))}

                <Button className="w-full mt-4" onClick={() => toast.success("Adding new data source")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Data Source
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Question Statistics</CardTitle>
              <CardDescription>
                Overview of content in your IELTS preparation system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-reading/10 p-4 rounded-lg flex flex-col items-center text-center">
                    <BookOpen className="h-8 w-8 text-reading mb-2" />
                    <div className="text-2xl font-bold">{readingCount}</div>
                    <div className="text-sm text-muted-foreground">Reading Tests</div>
                  </div>
                  
                  <div className="bg-writing/10 p-4 rounded-lg flex flex-col items-center text-center">
                    <FileText className="h-8 w-8 text-writing mb-2" />
                    <div className="text-2xl font-bold">{writingCount}</div>
                    <div className="text-sm text-muted-foreground">Writing Tasks</div>
                  </div>
                  
                  <div className="bg-speaking/10 p-4 rounded-lg flex flex-col items-center text-center">
                    <Mic className="h-8 w-8 text-speaking mb-2" />
                    <div className="text-2xl font-bold">{speakingCount}</div>
                    <div className="text-sm text-muted-foreground">Speaking Tests</div>
                  </div>
                  
                  <div className="bg-listening/10 p-4 rounded-lg flex flex-col items-center text-center">
                    <Brain className="h-8 w-8 text-listening mb-2" />
                    <div className="text-2xl font-bold">{listeningCount}</div>
                    <div className="text-sm text-muted-foreground">Listening Tests</div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button asChild>
                    <Link to="/admin-dashboard">
                      Manage Content
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent API Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { endpoint: "/api/exams/list", method: "GET", status: 200, time: "2m ago" },
                  { endpoint: "/api/user/progress", method: "POST", status: 201, time: "15m ago" },
                  { endpoint: "/api/writing/assessment", method: "POST", status: 200, time: "32m ago" },
                  { endpoint: "/api/speaking/samples", method: "GET", status: 200, time: "1h ago" },
                  { endpoint: "/api/auth/login", method: "POST", status: 200, time: "2h ago" }
                ].map((request, i) => (
                  <div key={i} className="flex items-center justify-between p-2 border-b last:border-0">
                    <div>
                      <div className="font-mono text-sm">{request.endpoint}</div>
                      <div className="text-xs text-muted-foreground">{request.time}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        request.method === "GET" ? "bg-blue-100 text-blue-800" :
                        request.method === "POST" ? "bg-green-100 text-green-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {request.method}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        request.status >= 200 && request.status < 300 ? "bg-green-100 text-green-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <SettingsComponent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackendControl;
