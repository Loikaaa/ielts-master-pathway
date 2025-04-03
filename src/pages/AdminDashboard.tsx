
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  BookOpen, 
  Mic, 
  Headphones, 
  Plus, 
  PenSquare, 
  BookOpenCheck, 
  BarChart2, 
  FileEdit, 
  Users,
  Database,
  ServerCog,
  GanttChart
} from "lucide-react";
import ReadingQuestionForm from '@/components/admin/ReadingQuestionForm';
import WritingQuestionForm from '@/components/admin/WritingQuestionForm';
import ListeningQuestionForm from '@/components/admin/ListeningQuestionForm';
import SpeakingQuestionForm from '@/components/admin/SpeakingQuestionForm';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useQuestions } from '@/contexts/QuestionsContext';
import { toast } from 'sonner';
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset
} from "@/components/ui/sidebar";
import { Progress } from '@/components/ui/progress';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("reading");
  const { addQuestion, questions } = useQuestions();
  const { toast: uiToast } = useToast();

  // Get question counts by type
  const readingCount = questions.filter(q => q.skillType === 'reading').length;
  const writingCount = questions.filter(q => q.skillType === 'writing').length;
  const listeningCount = questions.filter(q => q.skillType === 'listening').length;
  const speakingCount = questions.filter(q => q.skillType === 'speaking').length;

  // Form save and cancel handlers
  const handleSaveQuestion = (formData: any) => {
    console.log('Saving question data:', formData);
    
    // Prepare the question data with the proper format
    const questionData = {
      ...formData,
      id: `${activeTab}-${Date.now()}`,
      skillType: activeTab,
      points: formData.points || 10,
      // Convert minutes to seconds for time limit if needed
      timeLimit: activeTab === 'reading' || activeTab === 'writing' 
        ? formData.timeLimit * 60 
        : formData.timeLimit,
    };
    
    // Add the question to the context
    addQuestion(questionData);
    
    // Show success notification
    toast.success('Question saved successfully!');
    uiToast({
      title: "Question Added",
      description: "The question has been successfully added to the database.",
    });
  };

  const handleCancelForm = () => {
    // Handle cancellation (e.g., reset form, show confirmation, etc.)
    if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
      // Reset form or other state as needed
      toast.info('Question creation cancelled');
    }
  };

  const AdminSidebar = () => (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <ServerCog className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Admin Portal</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
                <Link to="/admin-dashboard">
                  <BarChart2 className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/admin-blog-manager">
                  <PenSquare className="h-4 w-4" />
                  <span>Blog Manager</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <Users className="h-4 w-4" />
                  <span>User Management</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <FileText className="h-4 w-4" />
                  <span>Reading</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <PenSquare className="h-4 w-4" />
                  <span>Writing</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <Headphones className="h-4 w-4" />
                  <span>Listening</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <Mic className="h-4 w-4" />
                  <span>Speaking</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="space-y-4 p-2">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span>Storage</span>
              <span>68%</span>
            </div>
            <Progress value={68} className="h-2" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex">
          <AdminSidebar />
          <SidebarInset className="px-4 py-8 mt-16">
            <div className="container mx-auto">
              <div className="mb-6">
                <SidebarTrigger className="mb-4" />
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <BarChart2 className="mr-2 h-5 w-5 text-primary" />
                      Question Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <span className="text-3xl font-bold">{readingCount || 124}</span>
                        <span className="text-sm text-muted-foreground">Reading Questions</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-3xl font-bold">{writingCount || 87}</span>
                        <span className="text-sm text-muted-foreground">Writing Questions</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-3xl font-bold">{listeningCount || 96}</span>
                        <span className="text-sm text-muted-foreground">Listening Questions</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-3xl font-bold">{speakingCount || 112}</span>
                        <span className="text-sm text-muted-foreground">Speaking Questions</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <BookOpenCheck className="mr-2 h-5 w-5 text-primary" />
                      Practice Tests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col mb-3">
                      <span className="text-3xl font-bold">47</span>
                      <span className="text-sm text-muted-foreground">Total Practice Tests</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-1.5 h-3.5 w-3.5" />
                      Create New Test
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <FileEdit className="mr-2 h-5 w-5 text-primary" />
                      Content Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <Button variant="outline" asChild size="sm">
                      <Link to="/admin-blog-manager">
                        <PenSquare className="mr-1.5 h-3.5 w-3.5" />
                        Manage Blog Posts
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                      Manage Resources
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Question Creator</CardTitle>
                  <CardDescription>Create new questions for each skill type</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-4 mb-6">
                      <TabsTrigger value="reading" className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        Reading
                      </TabsTrigger>
                      <TabsTrigger value="writing" className="flex items-center">
                        <PenSquare className="mr-2 h-4 w-4" />
                        Writing
                      </TabsTrigger>
                      <TabsTrigger value="listening" className="flex items-center">
                        <Headphones className="mr-2 h-4 w-4" />
                        Listening
                      </TabsTrigger>
                      <TabsTrigger value="speaking" className="flex items-center">
                        <Mic className="mr-2 h-4 w-4" />
                        Speaking
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="reading" className="mt-0">
                      <ReadingQuestionForm 
                        onSave={handleSaveQuestion} 
                        onCancel={handleCancelForm} 
                      />
                    </TabsContent>

                    <TabsContent value="writing" className="mt-0">
                      <WritingQuestionForm 
                        onSave={handleSaveQuestion} 
                        onCancel={handleCancelForm} 
                      />
                    </TabsContent>

                    <TabsContent value="listening" className="mt-0">
                      <ListeningQuestionForm 
                        onSave={handleSaveQuestion} 
                        onCancel={handleCancelForm} 
                      />
                    </TabsContent>

                    <TabsContent value="speaking" className="mt-0">
                      <SpeakingQuestionForm 
                        onSave={handleSaveQuestion} 
                        onCancel={handleCancelForm} 
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
