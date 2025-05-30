
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { useUser } from '@/contexts/UserContext';

interface BlogPostProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    coverImage: string;
    author: string;
    date: string;
    readTime?: string;
    category: string;
    tags?: string[];
    featured?: boolean;
    content?: string;
    status?: string;
  };
}

const BlogPostCard: React.FC<BlogPostProps> = ({ post }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useUser();
  
  // Calculate read time if not provided
  const readTime = post.readTime || 
    (post.content ? `${Math.max(3, Math.ceil(post.content.length / 1000))} min read` : '5 min read');

  // Ensure we have a valid post ID for linking
  const postId = post.id || `post-${Date.now()}`;
  
  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Track user interaction with the blog post if user is logged in
    if (currentUser) {
      console.log(`User ${currentUser.email} clicked on blog post ${post.id}`);
      // Here you would typically send this data to a backend API
      // For now, we'll just show a toast notification
      toast({
        title: "Blog post accessed",
        description: `You're now viewing "${post.title}"`,
        duration: 3000,
      });
    }
    
    navigate(`/resources/blog/${postId}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col group">
      <div className="flex-grow flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={post.coverImage || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
          />
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
            {post.category}
          </div>
          {post.featured && (
            <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </div>
          )}
        </div>
        
        <CardHeader className="pb-2">
          <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags && post.tags.map((tag, index) => (
              <span key={index} className="text-xs bg-accent px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </div>
      
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
            <span>{readTime}</span>
          </div>
        </div>
      </CardFooter>
      <CardFooter className="pt-0">
        <Button 
          variant="ghost" 
          className="w-full justify-center text-primary hover:text-primary/80 hover:bg-primary/5"
          onClick={handleReadMore}
        >
          Read More <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
