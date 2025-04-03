
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { BookOpen, Calendar, Clock, Search, Tag, User } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample blog posts data
const blogPosts = [
  {
    id: 'blog1',
    title: 'Top Strategies to Improve Your IELTS Reading Score',
    excerpt: 'Master the reading section with these proven techniques that have helped thousands of students achieve band 7+.',
    coverImage: 'https://placehold.co/600x400/png?text=Reading+Strategies',
    author: 'Dr. Sarah Johnson',
    date: 'March 28, 2025',
    readTime: '8 min read',
    category: 'Reading',
    tags: ['reading', 'strategy', 'time management']
  },
  {
    id: 'blog2',
    title: 'Common Grammar Mistakes to Avoid in IELTS Writing',
    excerpt: 'Eliminate these frequent errors that cost test-takers valuable points in the writing section.',
    coverImage: 'https://placehold.co/600x400/png?text=Writing+Tips',
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
    coverImage: 'https://placehold.co/600x400/png?text=Listening+Skills',
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
    coverImage: 'https://placehold.co/600x400/png?text=Speaking+Confidence',
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
    coverImage: 'https://placehold.co/600x400/png?text=IELTS+vs+TOEFL',
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
    coverImage: 'https://placehold.co/600x400/png?text=Preparation+Timeline',
    author: 'Robert Garcia',
    date: 'February 28, 2025',
    readTime: '9 min read',
    category: 'General',
    tags: ['planning', 'schedule', 'preparation']
  }
];

const Blog = () => {
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
          
          <div className="bg-card rounded-xl border p-4 mb-8">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search blog posts..." className="pl-9" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="whitespace-nowrap">
                  <Tag className="h-4 w-4 mr-2" />
                  Filter by Tag
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="reading">Reading</TabsTrigger>
              <TabsTrigger value="writing">Writing</TabsTrigger>
              <TabsTrigger value="speaking">Speaking</TabsTrigger>
              <TabsTrigger value="listening">Listening</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </TabsContent>
            
            {['reading', 'writing', 'speaking', 'listening', 'general'].map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts
                    .filter((post) => post.category.toLowerCase() === category)
                    .map((post) => (
                      <BlogPostCard key={post.id} post={post} />
                    ))}
                </div>
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

// Blog post card component
interface BlogPostProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    coverImage: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    tags: string[];
  };
}

const BlogPostCard: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
          {post.category}
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.map((tag, index) => (
            <span key={index} className="text-xs bg-accent px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex justify-between items-center">
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{post.author}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Blog;
