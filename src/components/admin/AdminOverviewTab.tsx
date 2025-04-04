
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestions } from '@/contexts/QuestionsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  FileText, 
  Users, 
  Settings, 
  Shield, 
  Server 
} from 'lucide-react';
import { Question } from '@/types/questions';

const AdminOverviewTab = () => {
  const navigate = useNavigate();
  const { questions } = useQuestions();
  
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
    <>
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
            <Button variant="outline" className="w-full" onClick={() => document.querySelector('[data-value="users"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))}>
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
    </>
  );
};

export default AdminOverviewTab;
