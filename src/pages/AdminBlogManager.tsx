
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import BlogPostForm from '@/components/admin/BlogPostForm';

// Sample blog posts data
const sampleBlogPosts = [
  {
    id: '1',
    title: 'Top Strategies to Improve Your IELTS Reading Score',
    excerpt: 'Master the reading section with these proven techniques that have helped thousands of students achieve band 7+.',
    author: 'Dr. Sarah Johnson',
    date: 'March 28, 2025',
    category: 'Reading',
    status: 'published'
  },
  {
    id: '2',
    title: 'Common Grammar Mistakes to Avoid in IELTS Writing',
    excerpt: 'Eliminate these frequent errors that cost test-takers valuable points in the writing section.',
    author: 'James Wilson',
    date: 'March 20, 2025',
    category: 'Writing',
    status: 'published'
  },
  {
    id: '3',
    title: 'How to Handle Difficult Accents in the Listening Test',
    excerpt: 'Build your confidence with unfamiliar accents using these practical exercises and approach.',
    author: 'Emma Reynolds',
    date: 'March 15, 2025',
    category: 'Listening',
    status: 'draft'
  }
];

const AdminBlogManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredBlogPosts = sampleBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'published' && post.status === 'published') ||
                      (activeTab === 'draft' && post.status === 'draft');
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'View All Posts' : <><Plus className="mr-2 h-4 w-4" /> Create New Post</>}
          </Button>
        </div>

        {showForm ? (
          <BlogPostForm />
        ) : (
          <>
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search blog posts..." 
                      className="pl-9" 
                      value={searchTerm} 
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Tabs 
                    defaultValue="all" 
                    value={activeTab} 
                    onValueChange={setActiveTab}
                    className="w-full sm:w-auto"
                  >
                    <TabsList className="w-full">
                      <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                      <TabsTrigger value="published" className="flex-1">Published</TabsTrigger>
                      <TabsTrigger value="draft" className="flex-1">Drafts</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {filteredBlogPosts.length > 0 ? (
                filteredBlogPosts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row justify-between p-6">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {post.status === 'published' ? 'Published' : 'Draft'}
                            </span>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              {post.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold">{post.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{post.excerpt}</p>
                          <div className="flex items-center mt-2 text-xs text-muted-foreground">
                            <span>{post.author}</span>
                            <span className="mx-2">•</span>
                            <span>{post.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 md:mt-0">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No blog posts found.</p>
                </Card>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminBlogManager;
