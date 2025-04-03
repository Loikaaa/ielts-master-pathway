
import React, { useState, useEffect } from 'react';
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
  ServerCog,
  ChevronRight,
  Calendar,
  Star,
  Tag,
  MoreHorizontal
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { getBlogPosts, deleteBlogPost } from '@/utils/settingsStorage';

const AdminBlogManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [blogPosts, setBlogPosts] = useState([]);

  // Load blog posts from localStorage
  useEffect(() => {
    const posts = getBlogPosts();
    console.log("Loaded blog posts:", posts);
    setBlogPosts(posts);
  }, []);

  const filteredBlogPosts = blogPosts.filter(post => {
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
    // Refresh blog posts
    setBlogPosts(getBlogPosts());
  };

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      const success = deleteBlogPost(postId);
      if (success) {
        toast.success("Blog post deleted successfully");
        // Refresh blog posts
        setBlogPosts(getBlogPosts());
      } else {
        toast.error("Failed to delete blog post");
      }
    }
  };

  const getStatusBadgeClass = (status) => {
    if (status === 'published') {
      return 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300';
    } else {
      return 'bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-300';
    }
  };

  const getCategoryClass = (category) => {
    switch(category.toLowerCase()) {
      case 'reading':
        return 'bg-reading/10 text-reading';
      case 'writing':
        return 'bg-writing/10 text-writing';
      case 'listening':
        return 'bg-listening/10 text-listening';
      case 'speaking':
        return 'bg-speaking/10 text-speaking';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  const AdminSidebar = () => (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary text-primary-foreground">
            <ServerCog className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold">IELTS Admin</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/admin-dashboard" className="group">
                  <BarChart2 className="h-4 w-4 transition-colors group-hover:text-primary" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
                <Link to="/admin-blog-manager" className="group">
                  <PenSquare className="h-4 w-4 transition-colors group-hover:text-primary" />
                  <span>Blog Manager</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/admin-backend" className="group">
                  <ServerCog className="h-4 w-4 transition-colors group-hover:text-primary" />
                  <span>System Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="#" className="group">
                  <Users className="h-4 w-4 transition-colors group-hover:text-primary" />
                  <span>User Management</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="#" className="group">
                  <FileText className="h-4 w-4 transition-colors group-hover:text-primary" />
                  <span>Reading</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="#" className="group">
                  <PenSquare className="h-4 w-4 transition-colors group-hover:text-primary" />
                  <span>Writing</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="#" className="group">
                  <Headphones className="h-4 w-4 transition-colors group-hover:text-primary" />
                  <span>Listening</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="#" className="group">
                  <Mic className="h-4 w-4 transition-colors group-hover:text-primary" />
                  <span>Speaking</span>
                </Link>
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
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-accent/50">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">admin@ielts.com</p>
            </div>
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
                  <Button onClick={handleNewPost} className="mt-4 md:mt-0 bg-primary hover:bg-primary/90 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Create New Post
                  </Button>
                ) : (
                  <div className="flex space-x-2 mt-4 md:mt-0">
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
                  <Card className="mb-6 border border-border/50 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-grow">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Search blog posts..." 
                            className="pl-9 border-border/50" 
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
                          <TabsList className="w-full grid grid-cols-3 h-10">
                            <TabsTrigger value="all" className="text-sm">All Posts</TabsTrigger>
                            <TabsTrigger value="published" className="text-sm">Published</TabsTrigger>
                            <TabsTrigger value="draft" className="text-sm">Drafts</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4">
                    {filteredBlogPosts.length > 0 ? (
                      filteredBlogPosts.map((post) => (
                        <Card key={post.id} className="overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow">
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
                                  <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Star className="h-3 w-3" />
                                    <span>Featured</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col md:flex-row justify-between p-6 flex-grow">
                                <div className="flex-grow">
                                  <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${getStatusBadgeClass(post.status)}`}>
                                      {post.status === 'published' ? 
                                        <>
                                          <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                          Published
                                        </> : 
                                        <>
                                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                                          Draft
                                        </>
                                      }
                                    </span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${getCategoryClass(post.category)}`}>
                                      <Tag className="h-3 w-3" />
                                      {post.category}
                                    </span>
                                  </div>
                                  <h3 className="text-lg font-semibold">{post.title}</h3>
                                  <p className="text-sm text-muted-foreground mt-1">{post.excerpt}</p>
                                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                                    <span>{post.author}</span>
                                    <span className="mx-2">•</span>
                                    <span className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {post.date}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 mt-4 md:mt-0 md:ml-4">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem onClick={() => handleEditPost(post)}>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem asChild>
                                        <Link to={`/resources/blog`}>
                                          <Eye className="h-4 w-4 mr-2" />
                                          Preview
                                        </Link>
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem 
                                        className="text-destructive" 
                                        onClick={() => handleDeletePost(post.id)}
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                  <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                                    <Edit className="h-4 w-4 mr-1" />
                                    Edit
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => handleDeletePost(post.id)}
                                  >
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
                      <Card className="p-8 text-center border border-border/50">
                        <div className="flex flex-col items-center py-8">
                          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                            <FileText className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <p className="text-muted-foreground mb-4">No blog posts found.</p>
                          <Button onClick={handleNewPost}>
                            <Plus className="mr-2 h-4 w-4" /> Create New Post
                          </Button>
                        </div>
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
