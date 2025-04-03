
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Users, Calendar, Settings, PenSquare, BookOpen, MessageSquare, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your IELTS preparation platform</p>
            </div>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content Management</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Users className="mr-2 h-5 w-5 text-primary" />
                      Total Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">1,245</div>
                    <p className="text-muted-foreground text-sm">+24 this week</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-primary" />
                      Content Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">342</div>
                    <p className="text-muted-foreground text-sm">Across all modules</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      Upcoming Tests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">18</div>
                    <p className="text-muted-foreground text-sm">In the next 30 days</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { action: "New user registered", time: "10 minutes ago" },
                        { action: "Content updated in Reading section", time: "1 hour ago" },
                        { action: "New blog post published", time: "3 hours ago" },
                        { action: "User feedback received", time: "5 hours ago" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center border-b pb-2 last:border-0">
                          <span>{item.action}</span>
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Button className="flex flex-col h-auto py-4" variant="outline">
                        <PenSquare className="h-5 w-5 mb-2" />
                        <span>Create Content</span>
                      </Button>
                      <Button className="flex flex-col h-auto py-4" variant="outline">
                        <Users className="h-5 w-5 mb-2" />
                        <span>Manage Users</span>
                      </Button>
                      <Button className="flex flex-col h-auto py-4" variant="outline">
                        <BookOpen className="h-5 w-5 mb-2" />
                        <span>Edit Resources</span>
                      </Button>
                      <Button className="flex flex-col h-auto py-4" variant="outline">
                        <MessageSquare className="h-5 w-5 mb-2" />
                        <span>View Feedback</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                  <CardDescription>
                    Manage all content across your IELTS platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Reading Material</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Manage reading passages, exercises, and practice tests.</p>
                        <Button size="sm">Manage</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Writing Tasks</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Edit writing prompts, examples, and assessment criteria.</p>
                        <Button size="sm">Manage</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Listening Tests</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Update audio content, transcripts, and questions.</p>
                        <Button size="sm">Manage</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Speaking Modules</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Edit speaking topics, sample answers and guidelines.</p>
                        <Button size="sm">Manage</Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Resource Management</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                        <Link to="/admin/blog">
                          <div className="flex flex-col items-center">
                            <BookOpen className="h-6 w-6 mb-2" />
                            <span>Blog Posts</span>
                          </div>
                        </Link>
                      </Button>
                      
                      <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                        <Link to="/admin/success-stories">
                          <div className="flex flex-col items-center">
                            <BarChart className="h-6 w-6 mb-2" />
                            <span>Success Stories</span>
                          </div>
                        </Link>
                      </Button>
                      
                      <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                        <Link to="/admin/faq">
                          <div className="flex flex-col items-center">
                            <MessageSquare className="h-6 w-6 mb-2" />
                            <span>FAQ</span>
                          </div>
                        </Link>
                      </Button>
                      
                      <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                        <Link to="/admin/tips">
                          <div className="flex flex-col items-center">
                            <Settings className="h-6 w-6 mb-2" />
                            <span>IELTS Tips</span>
                          </div>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage student accounts and admin privileges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-accent/20 rounded-md">
                    <p className="text-muted-foreground">User management interface would appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure system-wide settings and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-accent/20 rounded-md">
                    <p className="text-muted-foreground">Platform settings interface would appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
