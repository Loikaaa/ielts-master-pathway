
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
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  Database, 
  Table as TableIcon, 
  FileJson, 
  RefreshCw, 
  PlusCircle, 
  Download, 
  Upload, 
  Trash2,
  ChevronDown,
  Search,
  Filter,
  SlidersHorizontal
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DatabaseManager = () => {
  const [activeTab, setActiveTab] = useState('questions');
  const [selectedTable, setSelectedTable] = useState('questions');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock data for tables and records
  const mockTables = [
    { name: 'questions', count: 419, lastUpdated: '2025-04-01' },
    { name: 'users', count: 243, lastUpdated: '2025-04-02' },
    { name: 'progress', count: 612, lastUpdated: '2025-04-03' },
    { name: 'blog_posts', count: 38, lastUpdated: '2025-04-01' },
    { name: 'feedback', count: 127, lastUpdated: '2025-03-30' }
  ];

  const mockRecords = {
    questions: [
      { id: 'q-001', title: 'Reading Passage on Climate Change', type: 'reading', difficulty: 'medium', created_at: '2025-03-15' },
      { id: 'q-002', title: 'Writing Task 2: Environment Essay', type: 'writing', difficulty: 'hard', created_at: '2025-03-18' },
      { id: 'q-003', title: 'Listening Section 3: University Housing', type: 'listening', difficulty: 'medium', created_at: '2025-03-21' },
      { id: 'q-004', title: 'Speaking Part 2: Describe a Place', type: 'speaking', difficulty: 'easy', created_at: '2025-03-25' },
      { id: 'q-005', title: 'Reading Passage on Technology', type: 'reading', difficulty: 'hard', created_at: '2025-03-28' }
    ],
    users: [
      { id: 'u-001', name: 'John Doe', email: 'john@example.com', status: 'active', last_login: '2025-04-02' },
      { id: 'u-002', name: 'Jane Smith', email: 'jane@example.com', status: 'inactive', last_login: '2025-03-25' },
      { id: 'u-003', name: 'Mike Johnson', email: 'mike@example.com', status: 'active', last_login: '2025-04-01' }
    ],
    blog_posts: [
      { id: 'b-001', title: 'Top IELTS Tips for 2025', status: 'published', author: 'Admin', created_at: '2025-03-10' },
      { id: 'b-002', title: 'How to Improve Your Writing Score', status: 'draft', author: 'Admin', created_at: '2025-03-20' }
    ]
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Database Refreshed",
        description: "The latest data has been fetched from the database.",
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleImportData = () => {
    toast({
      title: "Import Started",
      description: "Data import process has been initiated.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Complete",
      description: "Data has been exported successfully.",
    });
  };

  const handleTableSelect = (table: string) => {
    setSelectedTable(table);
    setActiveTab(table);
  };

  const handleDeleteRecord = (id: string) => {
    if (confirm('Are you sure you want to delete this record? This action cannot be undone.')) {
      toast({
        title: "Record Deleted",
        description: `Record ${id} has been successfully deleted.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Database Management</h1>
          <p className="text-muted-foreground">Connect and manage your IELTS data collections</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefreshData} disabled={isLoading}>
            {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            Refresh
          </Button>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Table
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2 text-primary" />
              Tables
            </CardTitle>
            <CardDescription>
              Database tables and collections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search tables..." className="pl-8" />
              </div>
            </div>
            <div className="space-y-1 max-h-[400px] overflow-y-auto">
              {mockTables.map((table) => (
                <div 
                  key={table.name}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                    selectedTable === table.name ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
                  }`}
                  onClick={() => handleTableSelect(table.name)}
                >
                  <div className="flex items-center">
                    <TableIcon className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">{table.name}</span>
                  </div>
                  <Badge variant="outline">{table.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline" size="sm" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={handleImportData}>
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="capitalize">{selectedTable} Data</CardTitle>
                <CardDescription>
                  Manage your {selectedTable} collection
                </CardDescription>
              </div>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                {Object.keys(mockRecords).map((tableName) => (
                  <TabsTrigger 
                    key={tableName} 
                    value={tableName}
                    className="capitalize"
                  >
                    {tableName}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(mockRecords).map(([tableName, records]) => (
                <TabsContent key={tableName} value={tableName} className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder={`Search ${tableName}...`} className="pl-8" />
                      </div>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <SlidersHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <Select defaultValue="10">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Rows" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 rows</SelectItem>
                        <SelectItem value="25">25 rows</SelectItem>
                        <SelectItem value="50">50 rows</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {records.length > 0 && Object.keys(records[0]).map((key) => (
                            <TableHead key={key} className="capitalize">
                              <div className="flex items-center">
                                {key.replace('_', ' ')}
                                <ChevronDown className="ml-1 h-3 w-3" />
                              </div>
                            </TableHead>
                          ))}
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {records.map((record, index) => (
                          <TableRow key={index}>
                            {Object.entries(record).map(([key, value]) => (
                              <TableCell key={key}>
                                {key === 'status' ? (
                                  <Badge 
                                    variant={value === 'active' || value === 'published' ? 'success' : 
                                            value === 'inactive' ? 'secondary' : 'outline'}
                                  >
                                    {value}
                                  </Badge>
                                ) : key === 'difficulty' ? (
                                  <Badge 
                                    variant={value === 'easy' ? 'success' : 
                                            value === 'medium' ? 'warning' : 'destructive'}
                                  >
                                    {value}
                                  </Badge>
                                ) : (
                                  value
                                )}
                              </TableCell>
                            ))}
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <FileJson className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-destructive"
                                onClick={() => handleDeleteRecord(record.id as string)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Showing {records.length} of {mockTables.find(t => t.name === tableName)?.count || 0} entries
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>Previous</Button>
                      <Button variant="outline" size="sm">Next</Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Database Status</CardTitle>
          <CardDescription>
            Performance metrics and storage information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-accent/50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Storage Used</div>
              <div className="flex justify-between mb-1">
                <div className="text-2xl font-bold">68%</div>
                <div className="text-sm text-muted-foreground">5.4/8 GB</div>
              </div>
              <Progress value={68} className="h-2" />
            </div>
            
            <div className="bg-accent/50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Database Operations</div>
              <div className="text-2xl font-bold">1,432</div>
              <div className="text-xs text-green-600">↑ 12% from last week</div>
            </div>
            
            <div className="bg-accent/50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Average Query Time</div>
              <div className="text-2xl font-bold">53ms</div>
              <div className="text-xs text-green-600">↓ 8% from last week</div>
            </div>
            
            <div className="bg-accent/50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Total Tables</div>
              <div className="text-2xl font-bold">{mockTables.length}</div>
              <div className="text-xs text-muted-foreground">Last created: 2025-04-01</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Recent Database Operations</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Operation</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { op: 'INSERT', table: 'questions', status: 'success', time: '2m ago' },
                  { op: 'UPDATE', table: 'users', status: 'success', time: '15m ago' },
                  { op: 'DELETE', table: 'feedback', status: 'success', time: '30m ago' },
                  { op: 'SELECT', table: 'blog_posts', status: 'success', time: '1h ago' },
                  { op: 'INSERT BATCH', table: 'progress', status: 'failed', time: '2h ago' }
                ].map((op, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{op.op}</TableCell>
                    <TableCell>{op.table}</TableCell>
                    <TableCell>
                      <Badge variant={op.status === 'success' ? 'success' : 'destructive'}>
                        {op.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{op.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseManager;
