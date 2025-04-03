
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Users, Calendar, Settings, PenSquare, BookOpen, MessageSquare, BarChart, ChevronRight, ChevronLeft, Headphones, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import QuestionEditor from '@/components/admin/QuestionEditor';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-16 pb-12 flex">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-accent/30 border-r transition-all duration-300 h-[calc(100vh-10rem)] sticky top-20`}>
          <div className="flex justify-end p-2">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="space-y-1 px-2">
            <Button 
              variant={activeSection === 'overview' ? 'secondary' : 'ghost'} 
              className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}
              onClick={() => handleSectionChange('overview')}
            >
              <BarChart className="h-4 w-4 mr-2" />
              {isSidebarOpen && <span>Overview</span>}
            </Button>
            
            <Button 
              variant={activeSection === 'content' ? 'secondary' : 'ghost'} 
              className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}
              onClick={() => handleSectionChange('content')}
            >
              <FileText className="h-4 w-4 mr-2" />
              {isSidebarOpen && <span>Content Management</span>}
            </Button>
            
            <Button 
              variant={activeSection === 'reading' ? 'secondary' : 'ghost'} 
              className={`w-full justify-start ${!isSidebarOpen && 'justify-center pl-8'}`}
              onClick={() => handleSectionChange('reading')}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              {isSidebarOpen && <span>Reading</span>}
            </Button>
            
            <Button 
              variant={activeSection === 'writing' ? 'secondary' : 'ghost'} 
              className={`w-full justify-start ${!isSidebarOpen && 'justify-center pl-8'}`}
              onClick={() => handleSectionChange('writing')}
            >
              <PenSquare className="h-4 w-4 mr-2" />
              {isSidebarOpen && <span>Writing</span>}
            </Button>
            
            <Button 
              variant={activeSection === 'listening' ? 'secondary' : 'ghost'} 
              className={`w-full justify-start ${!isSidebarOpen && 'justify-center pl-8'}`}
              onClick={() => handleSectionChange('listening')}
            >
              <Headphones className="h-4 w-4 mr-2" />
              {isSidebarOpen && <span>Listening</span>}
            </Button>
            
            <Button 
              variant={activeSection === 'speaking' ? 'secondary' : 'ghost'} 
              className={`w-full justify-start ${!isSidebarOpen && 'justify-center pl-8'}`}
              onClick={() => handleSectionChange('speaking')}
            >
              <Mic className="h-4 w-4 mr-2" />
              {isSidebarOpen && <span>Speaking</span>}
            </Button>
            
            <Button 
              variant={activeSection === 'users' ? 'secondary' : 'ghost'} 
              className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}
              onClick={() => handleSectionChange('users')}
            >
              <Users className="h-4 w-4 mr-2" />
              {isSidebarOpen && <span>User Management</span>}
            </Button>
            
            <Button 
              variant={activeSection === 'settings' ? 'secondary' : 'ghost'} 
              className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}
              onClick={() => handleSectionChange('settings')}
            >
              <Settings className="h-4 w-4 mr-2" />
              {isSidebarOpen && <span>Settings</span>}
            </Button>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your IELTS preparation platform</p>
          </div>
          
          {activeSection === 'overview' && (
            <div>
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
                      <Button className="flex flex-col h-auto py-4" variant="outline" onClick={() => setActiveSection('content')}>
                        <PenSquare className="h-5 w-5 mb-2" />
                        <span>Create Content</span>
                      </Button>
                      <Button className="flex flex-col h-auto py-4" variant="outline" onClick={() => setActiveSection('users')}>
                        <Users className="h-5 w-5 mb-2" />
                        <span>Manage Users</span>
                      </Button>
                      <Button className="flex flex-col h-auto py-4" variant="outline" onClick={() => setActiveSection('reading')}>
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
            </div>
          )}

          {activeSection === 'content' && (
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>
                  Manage all content across your IELTS platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveSection('reading')}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-primary" />
                        Reading Material
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">Manage reading passages, exercises, and practice tests.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveSection('writing')}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center">
                        <PenSquare className="h-5 w-5 mr-2 text-primary" />
                        Writing Tasks
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">Edit writing prompts, examples, and assessment criteria.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveSection('listening')}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center">
                        <Headphones className="h-5 w-5 mr-2 text-primary" />
                        Listening Tests
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">Update audio content, transcripts, and questions.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveSection('speaking')}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center">
                        <Mic className="h-5 w-5 mr-2 text-primary" />
                        Speaking Modules
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">Edit speaking topics, sample answers and guidelines.</p>
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
          )}
          
          {activeSection === 'reading' && (
            <QuestionEditor questionType="reading" />
          )}
          
          {activeSection === 'writing' && (
            <QuestionEditor questionType="writing" />
          )}
          
          {activeSection === 'listening' && (
            <QuestionEditor questionType="listening" />
          )}
          
          {activeSection === 'speaking' && (
            <QuestionEditor questionType="speaking" />
          )}
          
          {activeSection === 'users' && (
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage student accounts and admin privileges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-lg font-medium">Active Users</h3>
                  <Button>Add New User</Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active' },
                      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active' },
                      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Student', status: 'Inactive' },
                    ].map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="destructive" size="sm">Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
          
          {activeSection === 'settings' && (
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure system-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">General Settings</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Platform Name</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border rounded mt-1" 
                            defaultValue="IELTS Preparation Platform" 
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Contact Email</label>
                          <input 
                            type="email" 
                            className="w-full p-2 border rounded mt-1" 
                            defaultValue="contact@ieltsplatform.com" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Exam Settings</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Default Time Limit (Reading)</label>
                          <input 
                            type="number" 
                            className="w-full p-2 border rounded mt-1" 
                            defaultValue="60" 
                          />
                          <p className="text-xs text-muted-foreground mt-1">In minutes</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Default Time Limit (Writing)</label>
                          <input 
                            type="number" 
                            className="w-full p-2 border rounded mt-1" 
                            defaultValue="60" 
                          />
                          <p className="text-xs text-muted-foreground mt-1">In minutes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
