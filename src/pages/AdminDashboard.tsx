
import React from 'react';
import { useQuestions } from '@/contexts/QuestionsContext';
import { useUser } from '@/contexts/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import UsersList from '@/components/admin/UsersList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText, Users, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { Question } from '@/types/questions';

const AdminDashboard = () => {
  const { isAdmin } = useUser();
  const navigate = useNavigate();
  const { questions } = useQuestions();
  
  // Redirect non-admin users
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleCreateNewTest = () => {
    navigate('/admin/create-test');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoForward = () => {
    navigate(1);
  };

  const recentQuestions = questions?.slice(0, 5) || [];

  // Helper function to get a display title for any question type
  const getQuestionTitle = (question: Question): string => {
    // Use type guards to safely access properties
    if (question.skillType === 'reading' && 'passageTitle' in question) {
      return question.passageTitle;
    } else if (question.skillType === 'writing' && 'prompt' in question) {
      return question.prompt.substring(0, 30) + '...';
    } else if (question.skillType === 'speaking' && 'promptText' in question) {
      return question.promptText.substring(0, 30) + '...';
    } else if (question.skillType === 'listening' && 'transcript' in question) {
      return `Listening Section ${question.sectionNumber}`;
    }
    
    // Use type assertion for safety as a fallback
    return `Question ${(question as any).id || 'Unknown'}`;
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex items-center mb-4">
        <div className="flex items-center mr-4">
          <Button variant="ghost" size="icon" onClick={handleGoBack} className="mr-1">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleGoForward}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      
      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Create New Test</CardTitle>
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
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>User Management</CardTitle>
            <CardDescription>View and manage user accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Review user profiles, manage permissions, and monitor user activity.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/admin/users">
                <Users className="h-4 w-4 mr-2" /> Manage Users
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>System Settings</CardTitle>
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
      
      {/* Recent Questions */}
      <section className="space-y-4">
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
      
      {/* User Management Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <UsersList />
      </section>
      
      {/* Blog Management Section */}
      <section className="space-y-4">
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
      
      {/* Community Management Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Community Management</h2>
        <Card>
          <CardHeader>
            <CardTitle>Community Overview</CardTitle>
            <CardDescription>Monitor and manage community discussions and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Community Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-background rounded-lg border p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Discussions</h3>
                  <p className="text-2xl font-bold">3,245</p>
                </div>
                <div className="bg-background rounded-lg border p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Active Study Partners</h3>
                  <p className="text-2xl font-bold">842</p>
                </div>
                <div className="bg-background rounded-lg border p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Upcoming Events</h3>
                  <p className="text-2xl font-bold">42</p>
                </div>
                <div className="bg-background rounded-lg border p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Reported Content</h3>
                  <p className="text-2xl font-bold text-red-500">7</p>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-medium mb-2">Recent Community Activity</h3>
                <ul className="space-y-2">
                  {[
                    { type: 'post', user: 'Elena Kim', content: 'Posted a new discussion about Speaking fluency', time: '2 hours ago' },
                    { type: 'comment', user: 'Ahmed Hassan', content: 'Commented on Writing Task 2 discussion', time: '5 hours ago' },
                    { type: 'event', user: 'Dr. Emily Chen', content: 'Created a new workshop event: Writing Task 2', time: '1 day ago' },
                    { type: 'report', user: 'James Wilson', content: 'Reported a comment as inappropriate', time: '1 day ago' },
                    { type: 'partner', user: 'Maria Rodriguez', content: 'Joined as a study partner', time: '2 days ago' }
                  ].map((activity, index) => (
                    <li key={index} className="border-b last:border-0 pb-2">
                      <div className="flex justify-between">
                        <div>
                          <span className="font-medium">{activity.user}</span>
                          <span className="text-muted-foreground"> {activity.content}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/admin/community-management">Manage Community</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};

export default AdminDashboard;
