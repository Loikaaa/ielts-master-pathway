import React, { useState, useEffect } from 'react';
import { useQuestions } from '@/contexts/QuestionsContext';
import { useUser } from '@/contexts/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import UsersList from '@/components/admin/UsersList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText, Users, Settings, MessageCircle, Calendar, UserCheck, ThumbsUp, Shield, Database, BarChart4, Gauge, Server } from 'lucide-react';
import { Question } from '@/types/questions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface IPost {
  id: string;
  author: {
    id: string;
    name: string;
    country: string;
    level: string;
  };
  title: string;
  content: string;
  time: string;
  likes: number;
  comments: Array<any>;
}

interface IStudyPartner {
  id: string;
  name: string;
  country: string;
  level: string;
  targetScore: string;
  online: boolean;
}

interface IEvent {
  id: string;
  title: string;
  date: string;
  type: string;
  attendees: number;
}

const AdminDashboard = () => {
  const { isAdmin } = useUser();
  const navigate = useNavigate();
  const { questions } = useQuestions();
  
  const [communityPosts, setCommunityPosts] = useState<IPost[]>([]);
  const [studyPartners, setStudyPartners] = useState<IStudyPartner[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  useEffect(() => {
    try {
      const storedPosts = localStorage.getItem('neplia_community_posts');
      const storedPartners = localStorage.getItem('neplia_study_partners');
      const storedEvents = localStorage.getItem('neplia_community_events');
      
      if (storedPosts) {
        setCommunityPosts(JSON.parse(storedPosts));
      }
      
      if (storedPartners) {
        setStudyPartners(JSON.parse(storedPartners));
      }
      
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
    } catch (error) {
      console.error('Error loading community data:', error);
    }
  }, []);

  const handleCreateNewTest = () => {
    navigate('/admin/create-test');
  };

  const recentQuestions = questions?.slice(0, 5) || [];

  const getQuestionTitle = (question: Question): string => {
    if (question.skillType === 'reading' && 'passageTitle' in question) {
      return question.passageTitle;
    } else if (question.skillType === 'writing' && 'prompt' in question) {
      return question.prompt.substring(0, 30) + '...';
    } else if (question.skillType === 'speaking' && 'promptText' in question) {
      return question.promptText.substring(0, 30) + '...';
    } else if (question.skillType === 'listening' && 'sectionNumber' in question) {
      return `Listening Section ${question.sectionNumber}`;
    }
    
    return `Question ${(question as any).id || 'Unknown'}`;
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="rounded-lg bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-6 mb-6 border border-indigo-200 dark:border-indigo-800/30">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-primary mr-4" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        <p className="text-muted-foreground mt-2">
          Manage content, users, and system settings from this central administrative hub.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">
            <Gauge className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="community">
            <MessageCircle className="h-4 w-4 mr-2" />
            Community Manager
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="content">
            <FileText className="h-4 w-4 mr-2" />
            Content Management
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <PlusCircle className="h-5 w-5 mr-2 text-primary" />
                  Create New Test
                </CardTitle>
                <CardDescription>Add new IELTS practice questions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Create new reading, writing, speaking, or listening test questions for students.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleCreateNewTest}>
                  <PlusCircle className="h-4 w-4 mr-2" /> Create New Test
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border-l-4 border-l-violet-500">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-violet-500" />
                  User Management
                </CardTitle>
                <CardDescription>View and manage user accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Review user profiles, manage permissions, and monitor user activity.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("users")}>
                  <Users className="h-4 w-4 mr-2" /> Manage Users
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border-l-4 border-l-emerald-500">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Server className="h-5 w-5 mr-2 text-emerald-500" />
                  System Settings
                </CardTitle>
                <CardDescription>Configure system parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Adjust application settings, notification rules, and system preferences.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/admin/settings">
                    <Settings className="h-4 w-4 mr-2" /> System Settings
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">Recent Questions</h2>
            <Card>
              <CardHeader>
                <CardTitle>Recently Added Questions</CardTitle>
                <CardDescription>Click on a question to edit or view details</CardDescription>
              </CardHeader>
              <CardContent>
                {recentQuestions.length > 0 ? (
                  <ul className="space-y-2">
                    {recentQuestions.map((question) => (
                      <li key={question.id} className="border-b pb-2 last:border-0">
                        <Link 
                          to={`/admin/edit-question/${question.id}`}
                          className="flex items-start p-2 hover:bg-muted rounded-md transition-colors"
                        >
                          <FileText className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">
                              {question.skillType.charAt(0).toUpperCase() + question.skillType.slice(1)}: {getQuestionTitle(question)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Difficulty: {question.difficulty} | Created: {new Date().toLocaleDateString()}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No questions have been created yet.</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/admin/questions">
                    View All Questions
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </section>
          
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">Blog Management</h2>
            <Card>
              <CardHeader>
                <CardTitle>Manage Blog Posts</CardTitle>
                <CardDescription>Add, edit, or delete blog posts and articles.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Publish educational content and announcements for your users.</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/admin-blog-manager">Go to Blog Manager</Link>
                </Button>
              </CardFooter>
            </Card>
          </section>
        </TabsContent>
        
        <TabsContent value="community">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Community Management</h2>
            <Card>
              <CardHeader>
                <CardTitle>Community Overview</CardTitle>
                <CardDescription>Monitor and manage community discussions and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-background rounded-lg border p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Discussions</h3>
                      <p className="text-2xl font-bold">{communityPosts.length || 0}</p>
                    </div>
                    <div className="bg-background rounded-lg border p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Active Study Partners</h3>
                      <p className="text-2xl font-bold">{studyPartners.filter(p => p.online).length || 0}</p>
                    </div>
                    <div className="bg-background rounded-lg border p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Upcoming Events</h3>
                      <p className="text-2xl font-bold">{events.length || 0}</p>
                    </div>
                    <div className="bg-background rounded-lg border p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Reported Content</h3>
                      <p className="text-2xl font-bold text-red-500">0</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Latest Community Discussions</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left p-3 font-medium">Title</th>
                            <th className="text-left p-3 font-medium">Author</th>
                            <th className="text-left p-3 font-medium">Posted</th>
                            <th className="text-left p-3 font-medium">Engagement</th>
                            <th className="text-left p-3 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {communityPosts.slice(0, 5).map(post => (
                            <tr key={post.id}>
                              <td className="p-3">{post.title}</td>
                              <td className="p-3">{post.author.name}</td>
                              <td className="p-3">{post.time}</td>
                              <td className="p-3">
                                <div className="flex items-center">
                                  <ThumbsUp className="h-4 w-4 text-muted-foreground mr-1" />
                                  <span className="mr-3">{post.likes}</span>
                                  <MessageCircle className="h-4 w-4 text-muted-foreground mr-1" />
                                  <span>{post.comments.length}</span>
                                </div>
                              </td>
                              <td className="p-3">
                                <Button variant="outline" size="sm">View</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Active Study Partners</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left p-3 font-medium">Name</th>
                            <th className="text-left p-3 font-medium">Country</th>
                            <th className="text-left p-3 font-medium">Current Level</th>
                            <th className="text-left p-3 font-medium">Target Score</th>
                            <th className="text-left p-3 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {studyPartners.slice(0, 5).map(partner => (
                            <tr key={partner.id}>
                              <td className="p-3">{partner.name}</td>
                              <td className="p-3">{partner.country}</td>
                              <td className="p-3">{partner.level}</td>
                              <td className="p-3">{partner.targetScore}</td>
                              <td className="p-3">
                                <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                                  partner.online 
                                    ? 'bg-green-500/10 text-green-500' 
                                    : 'bg-muted text-muted-foreground'
                                }`}>
                                  {partner.online ? 'Online' : 'Offline'}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left p-3 font-medium">Event Title</th>
                            <th className="text-left p-3 font-medium">Date</th>
                            <th className="text-left p-3 font-medium">Type</th>
                            <th className="text-left p-3 font-medium">Attendees</th>
                            <th className="text-left p-3 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {events.slice(0, 5).map(event => (
                            <tr key={event.id}>
                              <td className="p-3">{event.title}</td>
                              <td className="p-3">{event.date}</td>
                              <td className="p-3">{event.type}</td>
                              <td className="p-3">{event.attendees}</td>
                              <td className="p-3">
                                <Button variant="outline" size="sm">Details</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <Button className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Manage Discussions
                  </Button>
                  <Button className="w-full">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Study Partners
                  </Button>
                  <Button className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Events Calendar
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </section>
        </TabsContent>
        
        <TabsContent value="users">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">User Management</h2>
            <UsersList />
          </section>
        </TabsContent>
        
        <TabsContent value="content">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Content Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Practice Tests</CardTitle>
                  <CardDescription>Manage all practice test content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Add, edit, or remove reading, writing, listening, and speaking questions.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleCreateNewTest}>
                    <PlusCircle className="h-4 w-4 mr-2" /> Create New Test
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Blog Posts</CardTitle>
                  <CardDescription>Manage educational articles and announcements</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Publish helpful IELTS tips, study guides, and platform announcements.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to="/admin-blog-manager">
                      <PlusCircle className="h-4 w-4 mr-2" /> Manage Blog
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
