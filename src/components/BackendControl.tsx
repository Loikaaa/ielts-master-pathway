import React, { useState, useEffect } from 'react';
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
  Settings,
  ExternalLink,
  Mail
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
import { getDataSourceConnections, saveDataSourceConnection, getDatabaseConfig } from '@/utils/settingsStorage';
import DatabaseConfig from '@/components/admin/DatabaseConfig';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const BackendControl = () => {
  const { questions, loading } = useQuestions();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [connectedSources, setConnectedSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const readingCount = questions.filter(q => q.skillType === 'reading').length;
  const writingCount = questions.filter(q => q.skillType === 'writing').length;
  const listeningCount = questions.filter(q => q.skillType === 'listening').length;
  const speakingCount = questions.filter(q => q.skillType === 'speaking').length;
  const totalCount = questions.length;

  useEffect(() => {
    const sources = getDataSourceConnections();
    setConnectedSources(sources);
  }, []);

  const handleBack = () => navigate(-1);
  const handleForward = () => navigate(1);

  const handleOpenConnectionDialog = (source) => {
    setSelectedSource(source);
    setIsDialogOpen(true);
  };

  const handleAddNewSource = () => {
    toast.info("To add a new data source, you need to configure it manually in the database settings");
    navigate("/admin-backend?tab=settings");
    setActiveTab("settings");
  };

  const isDatabaseConnected = () => {
    const dbConfig = getDatabaseConfig();
    return dbConfig.connected === true;
  };

  return (
    <div className="space-y-6">
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
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <ServerCog className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Database</span>
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
                Database and external API connections (requires manual configuration)
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
                        source.type === 'email' ? <Mail className={`h-5 w-5 ${
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
                      onClick={() => handleOpenConnectionDialog(source)}
                    >
                      <ExternalLink className="mr-1 h-4 w-4" />
                      Configure
                    </Button>
                  </div>
                ))}

                <Button className="w-full mt-4" onClick={handleAddNewSource}>
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

        <TabsContent value="database" className="space-y-6">
          <DatabaseConfig />
          
          <Card>
            <CardHeader>
              <CardTitle>Connected Data Sources</CardTitle>
              <CardDescription>
                Database and external API connections (requires manual configuration)
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
                        source.type === 'email' ? <Mail className={`h-5 w-5 ${
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
                      onClick={() => handleOpenConnectionDialog(source)}
                    >
                      <ExternalLink className="mr-1 h-4 w-4" />
                      Configure
                    </Button>
                  </div>
                ))}

                <Button className="w-full mt-4" onClick={handleAddNewSource}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Data Source
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <SettingsComponent />
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Configure {selectedSource?.name}</DialogTitle>
            <DialogDescription>
              Manual configuration required for data connections
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {selectedSource?.type === 'postgres' ? (
              <div className="text-center">
                <Database className="h-12 w-12 mx-auto text-primary mb-4" />
                <p className="mb-4">
                  To configure your database connection, please use the dedicated Database tab.
                </p>
                <Button 
                  onClick={() => {
                    setIsDialogOpen(false);
                    setActiveTab("database");
                  }}
                  className="w-full"
                >
                  Go to Database Configuration
                </Button>
              </div>
            ) : selectedSource?.type === 'email' ? (
              <div className="text-center">
                <Mail className="h-12 w-12 mx-auto text-primary mb-4" />
                <p className="mb-4">
                  Email service requires a separate configuration with SMTP settings.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  In a production environment, you would configure SMTP server, port, credentials, and email templates.
                </p>
                <Button 
                  onClick={() => {
                    toast.info("Email configuration will be available in a separate component");
                    setIsDialogOpen(false);
                  }}
                  className="w-full"
                >
                  Configure Email Settings
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="p-3 rounded-full bg-primary/10 mx-auto w-fit mb-4">
                  {selectedSource?.type === 'auth' ? <Users className="h-12 w-12 text-primary" /> :
                   selectedSource?.type === 'storage' ? <FileJson className="h-12 w-12 text-primary" /> :
                   <BarChart4 className="h-12 w-12 text-primary" />}
                </div>
                <p className="mb-4">
                  To configure this connection, you must access the dedicated admin interface for {selectedSource?.name}.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Connection status is determined by manually setting up integration parameters and credentials.
                </p>
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      toast.info(`Configuration for ${selectedSource?.name} would open in a new tab in a real environment`);
                      setIsDialogOpen(false);
                    }}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Configuration Interface
                  </Button>
                  <Button 
                    onClick={() => {
                      setIsDialogOpen(false);
                      setActiveTab("settings");
                    }}
                  >
                    Go to Settings
                  </Button>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BackendControl;
