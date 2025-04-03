
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
  Mail,
  Monitor,
  Server,
  Shield,
  Activity,
  Clock
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
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BackendControl = () => {
  const { questions, loading } = useQuestions();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [connectedSources, setConnectedSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const readingCount = questions.filter(q => q.skillType === 'reading').length;
  const writingCount = questions.filter(q => q.skillType === 'writing').length;
  const listeningCount = questions.filter(q => q.skillType === 'listening').length;
  const speakingCount = questions.filter(q => q.skillType === 'speaking').length;
  const totalCount = questions.length;

  useEffect(() => {
    const sources = getDataSourceConnections();
    setConnectedSources(sources);
    
    // Simulate loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
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

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-primary border-opacity-20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="text-muted-foreground">Loading backend console...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in bg-background">
      {/* Top navigation bar */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b p-4 mb-6 -mx-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleBack}
            className="h-10 w-10 rounded-full bg-background shadow hover:bg-accent/50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Go back</span>
          </Button>
          
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ServerCog className="h-6 w-6 text-primary" />
            Backend Control Panel
          </h1>
          
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
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-7xl mx-auto">
        <TabsList className="grid grid-cols-3 w-full mb-6 bg-accent/70 p-1 rounded-xl">
          <TabsTrigger value="dashboard" className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md transition-all">
            <Monitor className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md transition-all">
            <Database className="h-4 w-4" />
            <span>Database</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md transition-all">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6 animate-slide-up">
          {/* System status card */}
          <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="bg-card pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    System Status
                  </CardTitle>
                  <CardDescription>Real-time overview of your backend</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    Online
                  </Badge>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    v1.2.0
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card rounded-xl shadow-sm border p-4 flex items-center gap-3 transition-transform hover:scale-[1.01]">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Server className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Server Status</div>
                    <div className="text-sm text-green-600 font-medium flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                      Operational
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-xl shadow-sm border p-4 flex items-center gap-3 transition-transform hover:scale-[1.01]">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Active Users</div>
                    <div className="text-sm text-muted-foreground">1,245</div>
                  </div>
                </div>
                <div className="bg-card rounded-xl shadow-sm border p-4 flex items-center gap-3 transition-transform hover:scale-[1.01]">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Uptime</div>
                    <div className="text-sm text-muted-foreground">99.8% (30d)</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1.5">
                      <Database className="h-4 w-4 text-primary" />
                      Database Storage
                    </span>
                    <span className="font-medium">68%</span>
                  </div>
                  <Progress value={68} className="h-2 bg-primary/20" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1.5">
                      <Shield className="h-4 w-4 text-primary" />
                      API Rate Limit
                    </span>
                    <span className="font-medium">42%</span>
                  </div>
                  <Progress value={42} className="h-2 bg-primary/20" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 bg-card border-t">
              <Button variant="outline" className="flex-1 bg-background/80" onClick={() => toast.success("Data upload started")}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Data
              </Button>
              <Button variant="outline" className="flex-1 bg-background/80" onClick={() => toast.success("Data export successful")}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" className="flex-1 bg-background/80" onClick={() => toast.success("API Logs opened")}>
                <FileJson className="h-4 w-4 mr-2" />
                API Logs
              </Button>
            </CardFooter>
          </Card>

          {/* Connected data sources */}
          <Card className="shadow-md border-none">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-primary" /> 
                Connected Data Sources
              </CardTitle>
              <CardDescription>
                Database and external API connections (requires manual configuration)
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {connectedSources.length > 0 ? (
                  connectedSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-xl hover:bg-accent/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-full ${
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
                        variant="outline"
                        className="bg-card"
                        onClick={() => handleOpenConnectionDialog(source)}
                      >
                        <ExternalLink className="mr-1 h-4 w-4" />
                        Configure
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-primary/10 mx-auto w-fit p-3 rounded-full mb-3">
                      <LinkIcon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No Data Sources Connected</h3>
                    <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                      Configure database connection or add custom data sources to connect to your backend systems.
                    </p>
                  </div>
                )}

                <Button className="w-full mt-4" onClick={handleAddNewSource}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Data Source
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Question statistics card */}
          <Card className="shadow-md border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-background to-accent/30 border-b">
              <CardTitle className="flex items-center gap-2">
                <BarChart4 className="h-5 w-5 text-primary" />
                Question Statistics
              </CardTitle>
              <CardDescription>
                Overview of content in your IELTS preparation system
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-reading/5 border border-reading/20 p-4 rounded-lg flex flex-col items-center text-center shadow-sm transition-transform hover:translate-y-[-2px]">
                    <div className="bg-reading/10 p-2 rounded-full mb-2">
                      <BookOpen className="h-6 w-6 text-reading" />
                    </div>
                    <div className="text-2xl font-bold text-reading">{readingCount}</div>
                    <div className="text-sm text-muted-foreground">Reading Tests</div>
                  </div>
                  
                  <div className="bg-writing/5 border border-writing/20 p-4 rounded-lg flex flex-col items-center text-center shadow-sm transition-transform hover:translate-y-[-2px]">
                    <div className="bg-writing/10 p-2 rounded-full mb-2">
                      <FileText className="h-6 w-6 text-writing" />
                    </div>
                    <div className="text-2xl font-bold text-writing">{writingCount}</div>
                    <div className="text-sm text-muted-foreground">Writing Tasks</div>
                  </div>
                  
                  <div className="bg-speaking/5 border border-speaking/20 p-4 rounded-lg flex flex-col items-center text-center shadow-sm transition-transform hover:translate-y-[-2px]">
                    <div className="bg-speaking/10 p-2 rounded-full mb-2">
                      <Mic className="h-6 w-6 text-speaking" />
                    </div>
                    <div className="text-2xl font-bold text-speaking">{speakingCount}</div>
                    <div className="text-sm text-muted-foreground">Speaking Tests</div>
                  </div>
                  
                  <div className="bg-listening/5 border border-listening/20 p-4 rounded-lg flex flex-col items-center text-center shadow-sm transition-transform hover:translate-y-[-2px]">
                    <div className="bg-listening/10 p-2 rounded-full mb-2">
                      <Brain className="h-6 w-6 text-listening" />
                    </div>
                    <div className="text-2xl font-bold text-listening">{listeningCount}</div>
                    <div className="text-sm text-muted-foreground">Listening Tests</div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button asChild>
                    <Link to="/admin-dashboard">
                      Manage Content
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent API requests */}
          <Card className="shadow-md border-none">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent API Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  { endpoint: "/api/exams/list", method: "GET", status: 200, time: "2m ago" },
                  { endpoint: "/api/user/progress", method: "POST", status: 201, time: "15m ago" },
                  { endpoint: "/api/writing/assessment", method: "POST", status: 200, time: "32m ago" },
                  { endpoint: "/api/speaking/samples", method: "GET", status: 200, time: "1h ago" },
                  { endpoint: "/api/auth/login", method: "POST", status: 200, time: "2h ago" }
                ].map((request, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border-b last:border-0 hover:bg-accent/10 transition-colors">
                    <div>
                      <div className="font-mono text-sm flex items-center gap-2">
                        {request.endpoint}
                        <Badge variant="outline" className="text-xs h-5">API v1</Badge>
                      </div>
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

        <TabsContent value="database" className="space-y-6 animate-slide-up">
          <DatabaseConfig />
          
          <Card className="shadow-md border-none">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Email Service Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure email service for notifications and user communication
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  Not Connected
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="text-center p-6 bg-accent/30 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-3">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-1">Email Service Setup</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Configure your email service to send notifications, password resets, and other communications to users.
                </p>
                <Button onClick={() => toast.info("Email configuration will be available in a future update")}>
                  Configure Email Service
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">SMTP Server</label>
                  <Input placeholder="smtp.example.com" disabled />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">SMTP Port</label>
                  <Input placeholder="587" disabled />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email (From)</label>
                  <Input placeholder="noreply@example.com" disabled />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Authentication</label>
                  <Select disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose authentication type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="plain">Plain</SelectItem>
                      <SelectItem value="login">Login</SelectItem>
                      <SelectItem value="cram-md5">CRAM-MD5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t flex justify-between">
              <Button variant="outline" disabled>
                Test Connection
              </Button>
              <Button disabled>
                Save Configuration
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="animate-slide-up">
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
