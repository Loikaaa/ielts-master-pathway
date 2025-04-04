
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import QuestionEditor from './QuestionEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminContentTab = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'reading' | 'writing' | 'speaking' | 'listening'>('overview');
  
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Content Management</h2>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reading">Reading</TabsTrigger>
          <TabsTrigger value="writing">Writing</TabsTrigger>
          <TabsTrigger value="speaking">Speaking</TabsTrigger>
          <TabsTrigger value="listening">Listening</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
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
                <Button className="w-full" onClick={() => setActiveTab('reading')}>
                  <PlusCircle className="h-4 w-4 mr-2" /> Manage Question Content
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
        </TabsContent>
        
        <TabsContent value="reading">
          <QuestionEditor questionType="reading" />
        </TabsContent>
        
        <TabsContent value="writing">
          <QuestionEditor questionType="writing" />
        </TabsContent>
        
        <TabsContent value="speaking">
          <QuestionEditor questionType="speaking" />
        </TabsContent>
        
        <TabsContent value="listening">
          <QuestionEditor questionType="listening" />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default AdminContentTab;
