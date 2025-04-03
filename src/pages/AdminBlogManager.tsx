import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  Eye, 
  Image as ImageIcon, 
  BarChart2, 
  PenSquare, 
  Users, 
  FileText, 
  Headphones, 
  Mic, 
  ServerCog 
} from 'lucide-react';
import BlogPostForm from '@/components/admin/BlogPostForm';
import { Link } from 'react-router-dom';
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

const sampleBlogPosts = [
  {
    id: '1',
    title: 'Top Strategies to Improve Your IELTS Reading Score',
    excerpt: 'Master the reading section with these proven techniques that have helped thousands of students achieve band 7+.',
    author: 'Dr. Sarah Johnson',
    date: 'March 28, 2025',
    category: 'Reading',
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: '2',
    title: 'Common Grammar Mistakes to Avoid in IELTS Writing',
    excerpt: 'Eliminate these frequent errors that cost test-takers valuable points in the writing section.',
    author: 'James Wilson',
    date: 'March 20, 2025',
    category: 'Writing',
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'How to Handle Difficult Accents in the Listening Test',
    excerpt: 'Build your confidence with unfamiliar accents using these practical exercises and approach.',
    author: 'Emma Reynolds',
    date: 'March 15, 2025',
    category: 'Listening',
    status: 'draft',
    coverImage: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const AdminBlogManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
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

  const handleEditPost = (post) => {
    setCurrentPost(post);
    setShowForm(true);
  };

  const handleNewPost = () => {
    setCurrentPost(null);
    setShowForm(true);
  };

  const handleBackToList = () => {
    setShowForm(false);
    setCurrentPost(null);
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
              <SidebarMenuButton asChild>
                <Link to="/admin-dashboard">
                  <BarChart2 className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
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
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="mr-2" />
                  {showForm && (
                    <Button variant="ghost" size="sm" onClick={handleBackToList} className="mr-2">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                  )}
                  <h1 className="text-3xl font-bold">
                    {showForm 
                      ? currentPost 
                        ? `Edit Blog Post: ${currentPost.title}` 
                        : 'Create New Blog Post' 
                      : 'Blog Management'}
                  </h1>
                </div>
                {!showForm ? (
                  <Button onClick={handleNewPost}>
                    <Plus className="mr-2 h-4 w-4" /> Create New Post
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button variant="outline" asChild>
                      <Link to="/resources/blog">
                        <Eye className="mr-2 h-4 w-4" /> Preview Blog
                      </Link>
                    </Button>
                  </div>
                )}
              </div>

              {showForm ? (
                <BlogPostForm initialData={currentPost} />
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
                        <Card key={post.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                              <div className="md:w-48 h-32 relative">
                                {post.coverImage ? (
                                  <img 
                                    src={post.coverImage} 
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-muted">
                                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                  </div>
                                )}
                                {post.featured && (
                                  <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    Featured
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col md:flex-row justify-between p-6 flex-grow">
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
                                <div className="flex items-center gap-2 mt-4 md:mt-0 md:ml-4">
                                  <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                                    <Edit className="h-4 w-4 mr-1" />
                                    Edit
                                  </Button>
                                  <Button variant="destructive" size="sm">
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                  </Button>
                                </div>
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
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminBlogManager;
