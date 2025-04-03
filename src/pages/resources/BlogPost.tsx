
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogPostDetail from '@/components/blog/BlogPostDetail';
import { getBlogPosts } from '@/utils/settingsStorage';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const BlogPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Get the blog post from localStorage
    const posts = getBlogPosts();
    console.log("Available blog posts:", posts);
    
    if (posts && posts.length > 0) {
      const foundPost = posts.find(p => p.id === postId);
      
      if (foundPost) {
        console.log("Found blog post:", foundPost);
        setPost(foundPost);
      } else {
        console.warn("Blog post not found for ID:", postId);
      }
    } else {
      console.warn("No blog posts found in storage");
    }
    
    setLoading(false);
  }, [postId]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow pt-20 pb-12 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow pt-20 pb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist or may have been removed.</p>
            <Button onClick={() => navigate('/resources/blog')}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/resources/blog')} 
            className="mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
          <BlogPostDetail post={post} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
