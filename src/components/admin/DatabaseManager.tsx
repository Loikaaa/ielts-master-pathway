
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
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { 
  Database, 
  Server, 
  FileJson, 
  RefreshCw, 
  Download, 
  Upload, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Search,
  Plus,
  MoreHorizontal,
  Trash2,
  Edit,
  Copy
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Settings from './Settings';

const DatabaseManager = () => {
  const [activeTab, setActiveTab] = useState<string>("tables");
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Mock tables for the database
  const tables = [
    { name: "users", rows: 2458, lastModified: "2025-04-01", size: "4.2 MB", status: "healthy" },
    { name: "questions", rows: 419, lastModified: "2025-04-02", size: "8.7 MB", status: "healthy" },
    { name: "responses", rows: 28654, lastModified: "2025-04-03", size: "15.3 MB", status: "warning" },
    { name: "practice_sessions", rows: 3471, lastModified: "2025-04-02", size: "2.8 MB", status: "healthy" },
    { name: "blog_posts", rows: 87, lastModified: "2025-04-01", size: "1.2 MB", status: "healthy" },
    { name: "user_progress", rows: 2104, lastModified: "2025-04-03", size: "3.6 MB", status: "error" },
  ];

  // Recent SQL queries
  const recentQueries = [
    { 
      query: "SELECT * FROM users WHERE last_login > NOW() - INTERVAL '7 days'", 
      timestamp: "10 minutes ago",
      duration: "234ms",
      status: "success"
    },
    { 
      query: "UPDATE questions SET difficulty = 'medium' WHERE id = 142", 
      timestamp: "25 minutes ago",
      duration: "105ms",
      status: "success"
    },
    { 
      query: "DELETE FROM responses WHERE created_at < NOW() - INTERVAL '1 year'", 
      timestamp: "1 hour ago",
      duration: "890ms",
      status: "success"
    },
    { 
      query: "INSERT INTO blog_posts (title, content, author_id) VALUES ('New IELTS Tips', 'Content here...', 12)", 
      timestamp: "3 hours ago",
      duration: "118ms",
      status: "success"
    },
    { 
      query: "SELECT AVG(score) FROM user_progress GROUP BY user_id ORDER BY AVG(score) DESC LIMIT 10", 
      timestamp: "5 hours ago",
      duration: "456ms",
      status: "error"
    },
  ];

  // Handle database actions
  const handleBackupDatabase = () => {
    toast.success("Database backup started");
  };

  const handleOptimizeDatabase = () => {
    toast.success("Database optimization complete");
  };

  const handleRestoreDatabase = () => {
    toast.success("Database restore completed successfully");
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  if (showSettings) {
    return <Settings />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Database Management</h2>
          <p className="text-muted-foreground">Manage your database tables and configuration</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBackupDatabase}>
            <Download className="h-4 w-4 mr-2" />
            Backup
          </Button>
          <Button variant="outline" onClick={handleRestoreDatabase}>
            <Upload className="h-4 w-4 mr-2" />
            Restore
          </Button>
          <Button variant="outline" onClick={handleOptimizeDatabase}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Optimize
          </Button>
          <Button variant="outline" onClick={handleShowSettings}>
            <FileJson className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Database overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="p-2 bg-blue-100 rounded-full">
                <Database className="h-5 w-5 text-blue-600" />
              </div>
              <Badge>PostgreSQL</Badge>
            </div>
            <h3 className="text-2xl font-bold">37.8 GB</h3>
            <p className="text-sm text-muted-foreground">Total Database Size</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="p-2 bg-green-100 rounded-full">
                <Server className="h-5 w-5 text-green-600" />
              </div>
              <Badge variant="outline">Online</Badge>
            </div>
            <h3 className="text-2xl font-bold">99.98%</h3>
            <p className="text-sm text-muted-foreground">Uptime This Month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="p-2 bg-purple-100 rounded-full">
                <FileJson className="h-5 w-5 text-purple-600" />
              </div>
              <Badge variant="secondary">16</Badge>
            </div>
            <h3 className="text-2xl font-bold">385,712</h3>
            <p className="text-sm text-muted-foreground">Total Records</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Database Explorer</CardTitle>
          <CardDescription>Browse and manage your database tables and queries</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="tables">Tables</TabsTrigger>
              <TabsTrigger value="queries">Recent Queries</TabsTrigger>
            </TabsList>

            <TabsContent value="tables">
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search tables..." className="pl-8" />
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Table
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Rows</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tables.map((table) => (
                      <TableRow key={table.name}>
                        <TableCell className="font-medium">{table.name}</TableCell>
                        <TableCell className="text-right">{table.rows.toLocaleString()}</TableCell>
                        <TableCell>{table.lastModified}</TableCell>
                        <TableCell>{table.size}</TableCell>
                        <TableCell>
                          {table.status === "healthy" ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                              Healthy
                            </Badge>
                          ) : table.status === "warning" ? (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">
                              <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                              Warning
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">
                              <XCircle className="h-3.5 w-3.5 mr-1" />
                              Error
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => toast.success(`Viewing ${table.name} table`)}>
                                <Search className="h-4 w-4 mr-2" />
                                View Data
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.success(`Editing ${table.name} structure`)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Structure
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.success(`Created backup of ${table.name}`)}>
                                <Copy className="h-4 w-4 mr-2" />
                                Backup Table
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => toast.error(`This would delete the ${table.name} table (operation not performed)`)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Table
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="queries">
              <div className="space-y-4">
                {recentQueries.map((query, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between mb-2">
                      <div className="text-xs text-muted-foreground">{query.timestamp}</div>
                      <Badge variant={query.status === "success" ? "outline" : "destructive"}>
                        {query.status === "success" ? "Success" : "Error"} - {query.duration}
                      </Badge>
                    </div>
                    <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                      {query.query}
                    </pre>
                    <div className="mt-2 flex justify-end gap-2">
                      <Button size="sm" variant="ghost" 
                        onClick={() => {
                          navigator.clipboard.writeText(query.query);
                          toast.success("Query copied to clipboard");
                        }}
                      >
                        <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                      </Button>
                      <Button size="sm" variant="ghost" 
                        onClick={() => toast.success("Query would run again (operation simulated)")}
                      >
                        <RefreshCw className="h-3.5 w-3.5 mr-1" /> Run Again
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t flex justify-between px-6 py-4">
          <div className="text-sm text-muted-foreground">
            Last backup: <span className="font-medium">April 3, 2025 at 08:45 AM</span>
          </div>
          <Button onClick={handleShowSettings}>Database Settings</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DatabaseManager;
