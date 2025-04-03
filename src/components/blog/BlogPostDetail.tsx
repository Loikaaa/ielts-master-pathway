
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Calendar, Clock, Tag, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface BlogPostDetailProps {
  post: {
    id: string;
    title: string;
    content: string;
    coverImage: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    tags: string[];
  };
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <span className="inline-block bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full mb-4">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden mb-8">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="prose prose-lg max-w-none">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t flex flex-wrap gap-2">
          <Tag className="h-5 w-5 text-muted-foreground" />
          {post.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-accent px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Card className="mt-8 bg-muted/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Related Articles</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/resources/blog" className="block">
              <div className="bg-card hover:bg-accent/10 transition-colors p-4 rounded-lg">
                <h4 className="font-medium mb-1">How to Approach the IELTS Speaking Test</h4>
                <p className="text-sm text-muted-foreground">Tips and strategies for acing the speaking section</p>
              </div>
            </Link>
            <Link to="/resources/blog" className="block">
              <div className="bg-card hover:bg-accent/10 transition-colors p-4 rounded-lg">
                <h4 className="font-medium mb-1">Writing Task 2: Structure and Strategy</h4>
                <p className="text-sm text-muted-foreground">Learn how to organize your essay for maximum impact</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-center">
        <Button asChild variant="outline" className="gap-2">
          <Link to="/resources/blog">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Blog
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default BlogPostDetail;
