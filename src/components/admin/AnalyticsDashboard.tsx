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
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  LineChart as LineChartIcon, 
  BarChart as BarChartIcon, 
  PieChart as PieChartIcon,
  Download,
  RefreshCw,
  Zap,
  Users,
  Clock,
  Globe,
  Smartphone,
  Laptop
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const userActivityData = [
  { name: 'Jan', visitors: 1200, pageViews: 4500, sessions: 2300 },
  { name: 'Feb', visitors: 1900, pageViews: 5700, sessions: 3100 },
  { name: 'Mar', visitors: 1700, pageViews: 5200, sessions: 2800 },
  { name: 'Apr', visitors: 2100, pageViews: 6300, sessions: 3300 },
  { name: 'May', visitors: 2500, pageViews: 7100, sessions: 3900 },
  { name: 'Jun', visitors: 2300, pageViews: 6800, sessions: 3600 },
  { name: 'Jul', visitors: 2700, pageViews: 7600, sessions: 4200 },
];

const deviceData = [
  { name: 'Desktop', value: 58 },
  { name: 'Mobile', value: 32 },
  { name: 'Tablet', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const AnalyticsDashboard = () => {
  const [timeframe, setTimeframe] = useState('7days');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Analytics data refreshed');
    }, 1000);
  };
  
  const handleExport = () => {
    toast.success('Analytics data exported to CSV');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Monitor user activity and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24hours">Last 24 Hours</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="12months">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm transition-all hover:shadow-md">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">+12.5%</Badge>
            </div>
            <h3 className="text-2xl font-bold">2,543</h3>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm transition-all hover:shadow-md">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="p-2 bg-green-100 rounded-full">
                <Zap className="h-5 w-5 text-green-600" />
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">+8.2%</Badge>
            </div>
            <h3 className="text-2xl font-bold">7,842</h3>
            <p className="text-sm text-muted-foreground">Page Views</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm transition-all hover:shadow-md">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="p-2 bg-purple-100 rounded-full">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <Badge variant="outline" className="bg-purple-50 text-purple-700">+5.3%</Badge>
            </div>
            <h3 className="text-2xl font-bold">3:24</h3>
            <p className="text-sm text-muted-foreground">Avg. Session Duration</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm transition-all hover:shadow-md">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="p-2 bg-amber-100 rounded-full">
                <Globe className="h-5 w-5 text-amber-600" />
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-700">+2.7%</Badge>
            </div>
            <h3 className="text-2xl font-bold">42.3%</h3>
            <p className="text-sm text-muted-foreground">Conversion Rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Engagement Analytics</CardTitle>
          <CardDescription>View detailed analytics of your application usage</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <LineChartIcon className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="demographics" className="flex items-center gap-1">
                <BarChartIcon className="h-4 w-4" />
                Demographics
              </TabsTrigger>
              <TabsTrigger value="devices" className="flex items-center gap-1">
                <PieChartIcon className="h-4 w-4" />
                Devices
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={userActivityData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="visitors" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="pageViews" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sessions" 
                      stroke="#ffc658" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#8884d8]"></div>
                    <span className="text-sm font-medium">Visitors</span>
                  </div>
                  <p className="ml-5 mt-1 text-2xl font-bold">12,400</p>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#82ca9d]"></div>
                    <span className="text-sm font-medium">Page Views</span>
                  </div>
                  <p className="ml-5 mt-1 text-2xl font-bold">37,200</p>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#ffc658]"></div>
                    <span className="text-sm font-medium">Sessions</span>
                  </div>
                  <p className="ml-5 mt-1 text-2xl font-bold">23,200</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="demographics">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { age: '18-24', male: 520, female: 480, other: 35 },
                      { age: '25-34', male: 780, female: 690, other: 58 },
                      { age: '35-44', male: 610, female: 590, other: 42 },
                      { age: '45-54', male: 410, female: 380, other: 29 },
                      { age: '55-64', male: 280, female: 310, other: 21 },
                      { age: '65+', male: 120, female: 190, other: 15 }
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="male" name="Male" fill="#8884d8" />
                    <Bar dataKey="female" name="Female" fill="#82ca9d" />
                    <Bar dataKey="other" name="Other" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="rounded-lg border p-3">
                  <span className="text-sm text-muted-foreground">Top Country</span>
                  <div className="mt-1 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    <span className="font-medium">United States</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">42% of users</p>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-sm text-muted-foreground">Top City</span>
                  <div className="mt-1 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    <span className="font-medium">New York</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">12% of users</p>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-sm text-muted-foreground">Gender Ratio</span>
                  <div className="mt-1 flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-medium">M: 51% | F: 46% | O: 3%</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">2,720 identified users</p>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-sm text-muted-foreground">Avg. Age</span>
                  <div className="mt-1 flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-medium">34.5 years</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Based on profile data</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="devices">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1 flex items-center justify-center">
                  <div className="h-[300px] w-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={deviceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {deviceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <h3 className="font-medium mb-4">Device & Browser Breakdown</h3>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Device Type</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {deviceData.map((item, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{item.name}</span>
                              <span className="font-medium">{item.value}%</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full" 
                                style={{ 
                                  width: `${item.value}%`, 
                                  backgroundColor: COLORS[index % COLORS.length] 
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-green-600" />
                          <span className="font-medium">Browser Breakdown</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[
                          { name: 'Chrome', value: 64 },
                          { name: 'Safari', value: 18 },
                          { name: 'Firefox', value: 10 },
                          { name: 'Edge', value: 6 },
                          { name: 'Others', value: 2 }
                        ].map((item, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{item.name}</span>
                              <span className="font-medium">{item.value}%</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full bg-green-500" 
                                style={{ width: `${item.value}%`, opacity: 0.5 + (0.5 * (1 - index * 0.2)) }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t flex justify-between px-6 py-4">
          <div className="text-sm text-muted-foreground">
            Last updated: <span className="font-medium">{new Date().toLocaleString()}</span>
          </div>
          <Button onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
