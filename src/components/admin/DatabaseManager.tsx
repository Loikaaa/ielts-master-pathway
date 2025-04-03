
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
import { Button } from '@/components/ui/button';
import { 
  Database, 
  Server, 
  RefreshCw, 
  Download, 
  Upload, 
  Search,
  Plus,
  MoreHorizontal,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  AlertTriangle,
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
import { useQuestions } from '@/contexts/QuestionsContext';

// Interface for table data
interface TableData {
  name: string;
  rows: number;
  lastModified: string;
  size: string;
  status: 'healthy' | 'warning' | 'error';
}

// Interface for query data
interface QueryData {
  query: string;
  timestamp: string;
  duration: string;
  status: 'success' | 'error';
}

const DatabaseManager = () => {
  const [activeTab, setActiveTab] = useState<string>("tables");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { questions } = useQuestions();
  
  // Derived table data based on questions context
  const [tables, setTables] = useState<TableData[]>([]);
  const [recentQueries, setRecentQueries] = useState<QueryData[]>([]);
  
  useEffect(() => {
    // Simulate loading time for database connection
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!isLoading) {
      // Generate table data based on questions
      const questionsByType = {
        reading: questions.filter(q => q.skillType === 'reading'),
        writing: questions.filter(q => q.skillType === 'writing'),
        speaking: questions.filter(q => q.skillType === 'speaking'),
        listening: questions.filter(q => q.skillType === 'listening')
      };
      
      // Create table representation for the database
      const generatedTables: TableData[] = [
        {
          name: "users",
          rows: Math.floor(Math.random() * 2000) + 1000,
          lastModified: new Date().toISOString().split('T')[0],
          size: `${(Math.random() * 10).toFixed(1)} MB`,
          status: 'healthy'
        },
        {
          name: "questions",
          rows: questions.length,
          lastModified: new Date().toISOString().split('T')[0],
          size: `${(questions.length * 0.02).toFixed(1)} MB`,
          status: 'healthy'
        },
        {
          name: "reading_questions",
          rows: questionsByType.reading.length,
          lastModified: new Date().toISOString().split('T')[0],
          size: `${(questionsByType.reading.length * 0.05).toFixed(1)} MB`,
          status: questionsByType.reading.length > 0 ? 'healthy' : 'warning'
        },
        {
          name: "writing_questions",
          rows: questionsByType.writing.length,
          lastModified: new Date().toISOString().split('T')[0],
          size: `${(questionsByType.writing.length * 0.03).toFixed(1)} MB`,
          status: questionsByType.writing.length > 0 ? 'healthy' : 'warning'
        },
        {
          name: "speaking_questions",
          rows: questionsByType.speaking.length,
          lastModified: new Date().toISOString().split('T')[0],
          size: `${(questionsByType.speaking.length * 0.02).toFixed(1)} MB`,
          status: questionsByType.speaking.length > 0 ? 'healthy' : 'warning'
        },
        {
          name: "listening_questions",
          rows: questionsByType.listening.length,
          lastModified: new Date().toISOString().split('T')[0],
          size: `${(questionsByType.listening.length * 0.04).toFixed(1)} MB`,
          status: questionsByType.listening.length > 0 ? 'healthy' : 'warning'
        },
        {
          name: "user_responses",
          rows: Math.floor(Math.random() * 5000) + 500,
          lastModified: new Date().toISOString().split('T')[0],
          size: `${(Math.random() * 15).toFixed(1)} MB`,
          status: Math.random() > 0.8 ? 'error' : 'healthy'
        }
      ];
      
      setTables(generatedTables);
      
      // Generate realistic query data
      const tableNames = generatedTables.map(t => t.name);
      const generatedQueries: QueryData[] = [
        {
          query: `SELECT * FROM ${tableNames[Math.floor(Math.random() * tableNames.length)]} LIMIT 100`,
          timestamp: "2 minutes ago",
          duration: `${Math.floor(Math.random() * 200) + 50}ms`,
          status: 'success'
        },
        {
          query: `SELECT COUNT(*) FROM questions GROUP BY skill_type`,
          timestamp: "15 minutes ago",
          duration: `${Math.floor(Math.random() * 100) + 20}ms`,
          status: 'success'
        },
        {
          query: `UPDATE ${tableNames[Math.floor(Math.random() * tableNames.length)]} SET updated_at = NOW() WHERE id = ${Math.floor(Math.random() * 100) + 1}`,
          timestamp: "45 minutes ago",
          duration: `${Math.floor(Math.random() * 150) + 30}ms`,
          status: 'success'
        },
        {
          query: `INSERT INTO ${tableNames[Math.floor(Math.random() * tableNames.length)]} (name, created_at) VALUES ('New Record', NOW())`,
          timestamp: "2 hours ago",
          duration: `${Math.floor(Math.random() * 80) + 40}ms`,
          status: 'success'
        },
        {
          query: `SELECT * FROM non_existent_table WHERE invalid_column = 'value'`,
          timestamp: "3 hours ago",
          duration: `${Math.floor(Math.random() * 50) + 10}ms`,
          status: 'error'
        }
      ];
      
      setRecentQueries(generatedQueries);
    }
  }, [isLoading, questions]);
  
  const filteredTables = tables.filter(table => 
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBackupDatabase = () => {
    toast.success("Database backup started");
    // In a real application, this would trigger an API call to backup the database
  };

  const handleOptimizeDatabase = () => {
    toast.success("Database optimization complete");
    // In a real application, this would trigger an API call to optimize the database
  };

  const handleRestoreDatabase = () => {
    toast.success("Database restore completed successfully");
    // In a real application, this would trigger an API call to restore the database
  };
  
  const handleRefreshData = () => {
    setIsLoading(true);
    // Simulate refreshing database data
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Database data refreshed");
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary border-opacity-20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <p className="text-lg font-medium text-muted-foreground">Connecting to database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Database Management</h2>
          <p className="text-muted-foreground">View and manage your database tables and data</p>
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
          <Button variant="outline" onClick={handleRefreshData}>
            <Server className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Database overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md transition-transform hover:scale-[1.01]">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="p-2 bg-blue-100 rounded-full">
                <Database className="h-5 w-5 text-blue-600" />
              </div>
              <Badge>PostgreSQL</Badge>
            </div>
            <h3 className="text-2xl font-bold">{tables.reduce((acc, table) => acc + table.rows, 0).toLocaleString()} rows</h3>
            <p className="text-sm text-muted-foreground">Total Records</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md transition-transform hover:scale-[1.01]">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="p-2 bg-green-100 rounded-full">
                <Server className="h-5 w-5 text-green-600" />
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-800">Online</Badge>
            </div>
            <h3 className="text-2xl font-bold">{tables.length}</h3>
            <p className="text-sm text-muted-foreground">Database Tables</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md transition-transform hover:scale-[1.01]">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="p-2 bg-purple-100 rounded-full">
                <Database className="h-5 w-5 text-purple-600" />
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <h3 className="text-2xl font-bold">{tables.reduce((acc, table) => acc + parseFloat(table.size), 0).toFixed(1)} MB</h3>
            <p className="text-sm text-muted-foreground">Total Database Size</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
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
                  <Input 
                    placeholder="Search tables..." 
                    className="pl-8" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button size="sm" onClick={() => toast.info("Table creation would be implemented here")}>
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
                    {filteredTables.length > 0 ? (
                      filteredTables.map((table) => (
                        <TableRow key={table.name} className="hover:bg-accent/20 transition-colors">
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
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          {searchTerm ? "No tables found matching your search" : "No tables found in database"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="queries">
              <div className="space-y-4">
                {recentQueries.map((query, index) => (
                  <div key={index} className="border rounded-lg p-3 transition-colors hover:bg-accent/10">
                    <div className="flex justify-between mb-2">
                      <div className="text-xs text-muted-foreground">{query.timestamp}</div>
                      <Badge variant={query.status === "success" ? "outline" : "destructive"} className={query.status === "success" ? "bg-green-50 text-green-700" : ""}>
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
                        Copy
                      </Button>
                      <Button size="sm" variant="ghost" 
                        onClick={() => toast.success("Query would run again (operation simulated)")}
                      >
                        Run Again
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
            Last refresh: <span className="font-medium">{new Date().toLocaleString()}</span>
          </div>
          <Button onClick={handleRefreshData}>Refresh Data</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DatabaseManager;
