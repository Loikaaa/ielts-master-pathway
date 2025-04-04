
import React from 'react';
import { useQuestions } from '@/contexts/QuestionsContext';
import { useUser } from '@/contexts/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  FileText, 
  Users, 
  Settings, 
  Shield, 
  Server,
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  Lightbulb,
  Database,
  Activity,
  CircleUser,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { Question } from '@/types/questions';
import { useToast } from '@/components/ui/use-toast';
import { getDatabaseConfig } from '@/utils/settingsStorage';

const AdminOverviewTab = () => {
  const { questions } = useQuestions();
  const { users } = useUser();
  const { toast } = useToast();
  
  const handleCreateNewTest = () => {
    // Trigger the content tab
    const contentTabTrigger = document.querySelector('[data-value="content"]');
    if (contentTabTrigger) {
      (contentTabTrigger as HTMLElement).click();
    }
  };

  const dbConfig = getDatabaseConfig();
  const databaseConnected = dbConfig.connected;

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

  const getRandomStat = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const stats = [
    { label: 'Active Users', value: users.length, icon: CircleUser, color: 'bg-blue-50 text-blue-500' },
    { label: 'Questions', value: questions?.length || 0, icon: HelpCircle, color: 'bg-violet-50 text-violet-500' },
    { label: 'System Uptime', value: '99.8%', icon: Activity, color: 'bg-green-50 text-green-500' },
    { label: 'Database Status', value: databaseConnected ? 'Connected' : 'Offline', icon: Database, color: databaseConnected ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500' }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
              <div className={`absolute inset-0 w-2 ${stat.color.split(' ')[0]}`}></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Activity Charts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">System Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                User Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <div className="flex items-center justify-center h-[150px]">
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sessions Today</span>
                    <span className="font-semibold">{getRandomStat(20, 50)}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${getRandomStat(65, 85)}%` }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm">New Registrations</span>
                    <span className="font-semibold">{getRandomStat(5, 15)}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-violet-500 h-full rounded-full" style={{ width: `${getRandomStat(25, 45)}%` }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm">Practice Tests</span>
                    <span className="font-semibold">{getRandomStat(30, 70)}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${getRandomStat(55, 95)}%` }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                System Calendar
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center p-2 rounded-md bg-blue-50 text-blue-700">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">Database Backup - 01:00 AM</span>
                </div>
                <div className="flex items-center p-2 rounded-md bg-amber-50 text-amber-700">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  <span className="text-sm">New Feature Deployment - 3:00 PM</span>
                </div>
                <div className="flex items-center p-2 rounded-md bg-green-50 text-green-700">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  <span className="text-sm">New Course Release - Tomorrow</span>
                </div>
                <div className="flex items-center p-2 rounded-md bg-purple-50 text-purple-700">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm">User Webinar - Friday, 5:00 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Quick Action Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-primary shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <PlusCircle className="h-5 w-5 mr-2 text-primary" />
                Create New Test
              </CardTitle>
              <CardDescription>Add IELTS practice questions</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-sm text-muted-foreground">
                Create new reading, writing, speaking, or listening test questions.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCreateNewTest}>
                <PlusCircle className="h-4 w-4 mr-2" /> Create Test
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-l-4 border-l-violet-500 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Users className="h-5 w-5 mr-2 text-violet-500" />
                User Management
              </CardTitle>
              <CardDescription>Manage user accounts</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-sm text-muted-foreground">
                Review profiles, manage permissions, and monitor activity.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full border-violet-200 text-violet-700 hover:bg-violet-50" 
                onClick={() => document.querySelector('[data-value="users"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))}
              >
                <Users className="h-4 w-4 mr-2" /> Users
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-l-4 border-l-emerald-500 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Server className="h-5 w-5 mr-2 text-emerald-500" />
                System Settings
              </CardTitle>
              <CardDescription>Configure system</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-sm text-muted-foreground">
                Adjust application settings and system preferences.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50" 
                onClick={() => document.querySelector('[data-value="settings"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))}
              >
                <Settings className="h-4 w-4 mr-2" /> Settings
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      
      {/* Recent Questions Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Recent Questions</h2>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Recently Added Questions</CardTitle>
            <CardDescription>Click on a question to edit or view details</CardDescription>
          </CardHeader>
          <CardContent>
            {recentQuestions.length > 0 ? (
              <ul className="space-y-2">
                {recentQuestions.map((question) => (
                  <li key={question.id} className="border-b pb-2 last:border-0">
                    <button 
                      onClick={handleCreateNewTest}
                      className="w-full flex items-start p-2 hover:bg-muted rounded-md transition-colors text-left"
                    >
                      <div className={`p-2 rounded-full mr-3 ${
                        question.skillType === 'reading' ? 'bg-blue-100 text-blue-600' :
                        question.skillType === 'writing' ? 'bg-emerald-100 text-emerald-600' :
                        question.skillType === 'speaking' ? 'bg-amber-100 text-amber-600' :
                        'bg-violet-100 text-violet-600'
                      }`}>
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {question.skillType.charAt(0).toUpperCase() + question.skillType.slice(1)}: {getQuestionTitle(question)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Difficulty: {question.difficulty} | Created: {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto bg-muted/50 p-4 rounded-full w-fit mb-3">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-medium">No questions have been created yet.</p>
                <Button variant="outline" className="mt-4" onClick={handleCreateNewTest}>
                  <PlusCircle className="h-4 w-4 mr-2" /> Create Your First Question
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t">
            <Button variant="outline" className="w-full" onClick={handleCreateNewTest}>
              View All Questions
            </Button>
          </CardFooter>
        </Card>
      </section>
      
      {/* Blog Management Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Blog Management</h2>
        <Card className="shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              Manage Blog Posts
            </CardTitle>
            <CardDescription>Add, edit, or delete blog posts and articles.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Publish educational content and announcements for your users.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full md:w-auto">
              <Link to="/admin-blog-manager">Go to Blog Manager</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};

export default AdminOverviewTab;
