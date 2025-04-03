
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Tag, Filter } from 'lucide-react';
import BlogPostCard from '@/components/blog/BlogPostCard';

// Sample blog posts data
const blogPosts = [
  {
    id: 'blog1',
    title: 'Top Strategies to Improve Your IELTS Reading Score',
    excerpt: 'Master the reading section with these proven techniques that have helped thousands of students achieve band 7+.',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: 'Dr. Sarah Johnson',
    date: 'March 28, 2025',
    readTime: '8 min read',
    category: 'Reading',
    tags: ['reading', 'strategy', 'time management'],
    featured: true
  },
  {
    id: 'blog2',
    title: 'Common Grammar Mistakes to Avoid in IELTS Writing',
    excerpt: 'Eliminate these frequent errors that cost test-takers valuable points in the writing section.',
    coverImage: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: 'James Wilson',
    date: 'March 20, 2025',
    readTime: '6 min read',
    category: 'Writing',
    tags: ['writing', 'grammar', 'mistakes']
  },
  {
    id: 'blog3',
    title: 'How to Handle Difficult Accents in the Listening Test',
    excerpt: 'Build your confidence with unfamiliar accents using these practical exercises and approach.',
    coverImage: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: 'Emma Reynolds',
    date: 'March 15, 2025',
    readTime: '7 min read',
    category: 'Listening',
    tags: ['listening', 'accents', 'comprehension']
  },
  {
    id: 'blog4',
    title: 'Speaking Confidently: Overcoming Nervousness in Part 2',
    excerpt: 'Learn techniques to remain calm and articulate during the challenging individual long turn.',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: 'Michael Chang',
    date: 'March 10, 2025',
    readTime: '5 min read',
    category: 'Speaking',
    tags: ['speaking', 'confidence', 'nervousness']
  },
  {
    id: 'blog5',
    title: 'IELTS vs TOEFL: Which English Test Should You Take?',
    excerpt: 'A comprehensive comparison of the two major English proficiency tests to help you make the right choice.',
    coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: 'Dr. Lisa Zhang',
    date: 'March 5, 2025',
    readTime: '10 min read',
    category: 'General',
    tags: ['comparison', 'exams', 'decision']
  },
  {
    id: 'blog6',
    title: 'The Ultimate IELTS Preparation Timeline',
    excerpt: 'Plan your study schedule efficiently with this week-by-week guide to maximize your score.',
    coverImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: 'Robert Garcia',
    date: 'February 28, 2025',
    readTime: '9 min read',
    category: 'General',
    tags: ['planning', 'schedule', 'preparation']
  }
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [activeTag, setActiveTag] = useState('');
  
  // Get all unique tags
  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];
  
  // Filter posts based on search term, active tab and tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = 
      activeTab === 'all' || 
      post.category.toLowerCase() === activeTab.toLowerCase();
    
    const matchesTag = 
      activeTag === '' || 
      post.tags.includes(activeTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  // Get featured post
  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">IELTS Blog</h1>
              <p className="text-muted-foreground">Expert insights and strategies to boost your IELTS performance</p>
            </div>
          </div>
          
          {featuredPost && (
            <div className="mb-12 bg-accent/20 rounded-xl overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 h-64 lg:h-auto relative">
                  <img 
                    src={featuredPost.coverImage} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </div>
                <div className="lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
                  <div className="inline-block bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full mb-4">
                    Featured Post
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm">
                      <span className="mr-4">{featuredPost.author}</span>
                      <span className="text-muted-foreground">{featuredPost.date}</span>
                    </div>
                    <Button asChild>
                      <a href={`/resources/blog/${featuredPost.id}`}>Read More</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-card rounded-xl border p-4 mb-8">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search blog posts..." 
                  className="pl-9" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Button variant="outline" size="sm" className="whitespace-nowrap">
                    <Tag className="h-4 w-4 mr-2" />
                    {activeTag ? activeTag : "Filter by Tag"}
                  </Button>
                  {activeTag && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 absolute right-0 top-0 -mt-1 -mr-1"
                      onClick={() => setActiveTag('')}
                    >
                      ×
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Tag cloud */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {allTags.map(tag => (
                  <Button 
                    key={tag} 
                    variant={activeTag === tag ? "default" : "outline"} 
                    size="sm"
                    className="text-xs rounded-full"
                    onClick={() => setActiveTag(tag === activeTag ? '' : tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            )}
          </div>
          
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="reading">Reading</TabsTrigger>
              <TabsTrigger value="writing">Writing</TabsTrigger>
              <TabsTrigger value="speaking">Speaking</TabsTrigger>
              <TabsTrigger value="listening">Listening</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No blog posts found matching your search criteria.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setActiveTag('');
                      setActiveTab('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {['reading', 'writing', 'speaking', 'listening', 'general'].map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                {filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                      <BlogPostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No blog posts found in this category.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm('');
                        setActiveTag('');
                        setActiveTab('all');
                      }}
                    >
                      View All Posts
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-12 flex justify-center">
            <Button variant="outline" className="flex items-center">
              Load More Articles
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
