
import React from 'react';
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
  BarChart4
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const BackendControl = () => {
  return (
    <div className="space-y-6">
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
          <Button variant="outline" className="flex-1">
            <Upload className="h-4 w-4 mr-2" />
            Upload Data
          </Button>
          <Button variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" className="flex-1">
            <FileJson className="h-4 w-4 mr-2" />
            API Logs
          </Button>
        </CardFooter>
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
    </div>
  );
};

export default BackendControl;
