
import React from 'react';
import { useQuestions } from '@/contexts/QuestionsContext';
import { useUser } from '@/contexts/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import UsersList from '@/components/admin/UsersList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText, Users, Settings } from 'lucide-react';
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
    
    // At this point, TypeScript might not know which specific question type we have
    // So we need to handle this case safely by using type assertion
    return `Question ${(question as any).id || 'Unknown'}`;
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
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
    </div>
  );
};

export default AdminDashboard;
