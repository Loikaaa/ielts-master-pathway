
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { MessageSquare, ThumbsUp, MessageCircle, Filter, Search, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import DiscussionForm from './DiscussionForm';
import DiscussionDetail from './DiscussionDetail';

export interface Discussion {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  date: string;
  content: string;
  replies: number;
  likes: number;
  tags: string[];
  comments?: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  date: string;
  content: string;
  likes: number;
}

const DiscussionBoard = () => {
  const { toast } = useToast();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState<Discussion[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [showDiscussionForm, setShowDiscussionForm] = useState(false);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  // Load discussions from localStorage on mount
  useEffect(() => {
    try {
      const storedDiscussions = localStorage.getItem('neplia_community_discussions');
      if (storedDiscussions) {
        const parsedDiscussions = JSON.parse(storedDiscussions);
        setDiscussions(parsedDiscussions);
        setFilteredDiscussions(parsedDiscussions);
      } else {
        // Initialize with sample discussions if none exist
        const initialDiscussions = [
          {
            id: "1",
            title: "How to improve speaking fluency in 30 days?",
            author: "Emily Chen",
            authorAvatar: "https://randomuser.me/api/portraits/women/12.jpg",
            date: "April 3, 2025",
            content: "I've been stuck at band 6.5 in speaking for my last two IELTS attempts. My main issue is fluency - I often pause too much looking for the right words. Has anyone successfully improved their speaking fluency in a short time frame? What techniques worked for you?",
            replies: 18,
            likes: 32,
            tags: ["Speaking", "Fluency", "Practice"],
            comments: [
              {
                id: "1-1",
                author: "David Wilson",
                authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
                date: "April 3, 2025",
                content: "I improved my speaking fluency by recording myself daily and analyzing where I paused. I also practiced with language exchange partners online. The key is consistent daily practice even if it's just 20 minutes.",
                likes: 8
              },
              {
                id: "1-2",
                author: "Sarah Johnson",
                authorAvatar: "https://randomuser.me/api/portraits/women/45.jpg",
                date: "April 4, 2025",
                content: "Shadow speaking helped me a lot - listen to a native speaker and repeat immediately after them, trying to match their pace and intonation. I did this for 15 minutes every day and saw improvements within weeks.",
                likes: 12
              }
            ]
          },
          {
            id: "2",
            title: "Reading section: Time management strategies",
            author: "Michael Nguyen",
            authorAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
            date: "April 2, 2025",
            content: "I'm consistently running out of time on the reading section. I can understand the passages well but can't seem to get through all the questions. What strategies do you use to manage time effectively in the reading section? Do you read everything or use a skimming approach?",
            replies: 24,
            likes: 41,
            tags: ["Reading", "Time Management", "Strategy"],
            comments: [
              {
                id: "2-1",
                author: "Lisa Wong",
                authorAvatar: "https://randomuser.me/api/portraits/women/22.jpg",
                date: "April 2, 2025",
                content: "I always read the questions first, then skim the text to locate the relevant information. This helped me improve my time management significantly.",
                likes: 15
              }
            ]
          },
          {
            id: "3",
            title: "Writing Task 2: My journey from band 6 to 7.5",
            author: "Sarah Johnson",
            authorAvatar: "https://randomuser.me/api/portraits/women/45.jpg",
            date: "March 30, 2025",
            content: "I wanted to share my experience improving my Writing Task 2 score from band 6 to 7.5 in just two months. I'll outline the key changes I made to my approach, including how I structured my essays differently and expanded my vocabulary. Hope this helps others in the same situation!",
            replies: 56,
            likes: 89,
            tags: ["Writing", "Success Story", "Essay Structure"],
            comments: []
          },
          {
            id: "4",
            title: "Listening section: Dealing with different accents",
            author: "Raj Patel",
            authorAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
            date: "March 28, 2025",
            content: "I'm finding the variety of accents in the listening test challenging. I'm comfortable with standard British and American accents, but struggle with Australian, Scottish, etc. What resources do you recommend for practicing with different English accents?",
            replies: 13,
            likes: 27,
            tags: ["Listening", "Accents", "Resources"],
            comments: []
          }
        ];
        setDiscussions(initialDiscussions);
        setFilteredDiscussions(initialDiscussions);
        localStorage.setItem('neplia_community_discussions', JSON.stringify(initialDiscussions));
      }
    } catch (error) {
      console.error('Error loading discussions:', error);
      toast({
        title: "Error",
        description: "Failed to load discussions. Please try again.",
        variant: "destructive"
      });
    }
  }, [toast]);

  // Save discussions to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('neplia_community_discussions', JSON.stringify(discussions));
    } catch (error) {
      console.error('Error saving discussions:', error);
    }
  }, [discussions]);

  // Filter discussions based on search query and selected tags
  useEffect(() => {
    let results = discussions;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(discussion => 
        discussion.title.toLowerCase().includes(query) || 
        discussion.content.toLowerCase().includes(query)
      );
    }
    
    if (selectedTags.length > 0) {
      results = results.filter(discussion => 
        selectedTags.some(tag => discussion.tags.includes(tag))
      );
    }
    
    setFilteredDiscussions(results);
  }, [searchQuery, selectedTags, discussions]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleToggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const handleCreatePost = () => {
    setShowDiscussionForm(true);
  };

  const handleAddDiscussion = (newDiscussion: Omit<Discussion, 'id' | 'replies' | 'likes' | 'author' | 'authorAvatar' | 'date'>) => {
    const discussion: Discussion = {
      ...newDiscussion,
      id: `discussion-${Date.now()}`,
      author: "Current User", // In a real app, get this from user context
      authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg", // In a real app, get this from user context
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      replies: 0,
      likes: 0,
      comments: []
    };
    
    setDiscussions(prev => [discussion, ...prev]);
    setShowDiscussionForm(false);
    
    toast({
      title: "Discussion Created",
      description: "Your discussion has been posted successfully.",
    });
  };

  const handleLikeDiscussion = (discussionId: string) => {
    setDiscussions(prev => 
      prev.map(discussion => 
        discussion.id === discussionId 
          ? { ...discussion, likes: discussion.likes + 1 } 
          : discussion
      )
    );
  };

  const handleViewDiscussion = (discussion: Discussion) => {
    setSelectedDiscussion(discussion);
  };

  const handleAddComment = (discussionId: string, content: string) => {
    if (!content.trim()) return;
    
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: "Current User", // In a real app, get this from user context
      authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg", // In a real app, get this from user context
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      content,
      likes: 0
    };
    
    setDiscussions(prev => 
      prev.map(discussion => {
        if (discussion.id === discussionId) {
          const comments = discussion.comments || [];
          const updatedComments = [...comments, newComment];
          return { 
            ...discussion, 
            comments: updatedComments,
            replies: updatedComments.length
          };
        }
        return discussion;
      })
    );
    
    // If we're viewing this discussion, update the selected discussion too
    if (selectedDiscussion?.id === discussionId) {
      const comments = selectedDiscussion.comments || [];
      setSelectedDiscussion({
        ...selectedDiscussion,
        comments: [...comments, newComment],
        replies: comments.length + 1
      });
    }
    
    toast({
      title: "Comment Added",
      description: "Your comment has been posted successfully.",
    });
  };

  // Get all unique tags from discussions
  const allTags = [...new Set(discussions.flatMap(discussion => discussion.tags))];

  if (selectedDiscussion) {
    return (
      <DiscussionDetail
        discussion={selectedDiscussion}
        onBack={() => setSelectedDiscussion(null)}
        onAddComment={(content) => handleAddComment(selectedDiscussion.id, content)}
      />
    );
  }

  if (showDiscussionForm) {
    return (
      <DiscussionForm 
        onSubmit={handleAddDiscussion}
        onCancel={() => setShowDiscussionForm(false)}
        availableTags={allTags}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Recent Discussions</h2>
        <Button className="bg-primary" onClick={handleCreatePost}>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {allTags.map((tag) => (
          <Badge 
            key={tag} 
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className={`${selectedTags.includes(tag) ? 'bg-primary' : 'bg-primary/5 hover:bg-primary/10'} cursor-pointer`}
            onClick={() => handleToggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="flex gap-2 mb-6">
        <div className="relative flex-grow">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search discussions..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {filteredDiscussions.length > 0 ? (
          filteredDiscussions.map((discussion) => (
            <motion.div key={discussion.id} variants={item}>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-xl hover:text-primary transition-colors">
                      {discussion.title}
                    </CardTitle>
                    <div className="flex items-center text-muted-foreground text-sm">
                      {discussion.date}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={discussion.authorAvatar} alt={discussion.author} />
                      <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{discussion.author}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2 mb-4">{discussion.content}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {discussion.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="bg-primary/5 hover:bg-primary/10">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex gap-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => handleLikeDiscussion(discussion.id)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {discussion.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {discussion.replies}
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDiscussion(discussion)}
                  >
                    View Discussion
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No discussions found</h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchQuery || selectedTags.length > 0 
                  ? "No discussions match your current filters. Try adjusting your search criteria."
                  : "Be the first to start a discussion!"}
              </p>
              <Button onClick={handleCreatePost}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create New Discussion
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.div>
      
      {filteredDiscussions.length > 3 && (
        <div className="mt-6 text-center">
          <Button variant="outline" className="mr-2">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default DiscussionBoard;
