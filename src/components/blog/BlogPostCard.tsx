
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
    featured?: boolean;
  };
}

const BlogPostCard: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col group">
      <Link to={`/resources/blog/${post.id}`} className="flex-grow flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={post.coverImage} 
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
            {post.tags.map((tag, index) => (
              <span key={index} className="text-xs bg-accent px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Link>
      
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

export default BlogPostCard;
