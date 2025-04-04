
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/components/ui/use-toast';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertCircle,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  Globe,
  Heart,
  MessageCircle,
  MessageSquare,
  Mic,
  Search,
  Share2,
  Tag,
  ThumbsUp,
  User,
  Users,
  Video,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

// Interfaces
interface IAuthor {
  id: string;
  name: string;
  avatar: string;
  country: string;
  level: string;
}

interface IComment {
  id: string;
  content: string;
  author: IAuthor;
  time: string;
  likes: number;
}

interface IPost {
  id: string;
  author: IAuthor;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  isLiked?: boolean;
  comments: IComment[];
  time: string;
}

interface IStudyPartner {
  id: string;
  name: string;
  avatar: string;
  country: string;
  level: string;
  targetScore: string;
  interests: string[];
  online: boolean;
}

interface IEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  host: string;
  attendees: number;
  type: string;
  isAttending?: boolean;
}

// MOCK DATA
// Mock data for the community posts with more detailed content
const initialDiscussionPosts: IPost[] = [
  {
    id: "post-1",
    author: {
      id: "user-1",
      name: 'Elena Kim',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      country: 'South Korea',
      level: 'Band 7.5'
    },
    title: 'Tips for improving Speaking fluency in Part 2',
    content: 'I\'ve been struggling with the 2-minute long turn in Speaking Part 2. My mind goes blank even with preparation time. Any suggestions on how to improve fluency and organize thoughts quickly? I\'ve tried recording myself, but I still find it difficult to maintain a steady flow of ideas.',
    tags: ['Speaking', 'Fluency', 'Part 2'],
    likes: 24,
    comments: [
      {
        id: "comment-1-1",
        author: {
          id: "user-2",
          name: 'Ahmed Hassan',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          country: 'Egypt',
          level: 'Band 6.5'
        },
        content: 'I found that using a mind-mapping technique in the preparation minute helps. Jot down 3-4 main points and quickly think of examples.',
        time: '1 hour ago',
        likes: 3
      }
    ],
    time: '2 hours ago'
  },
  {
    id: "post-2",
    author: {
      id: "user-2",
      name: 'Ahmed Hassan',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      country: 'Egypt',
      level: 'Band 6.5'
    },
    title: 'Writing Task 2: How detailed should examples be?',
    content: 'When writing Task 2 essays, I\'m never sure how detailed my examples should be. Should I use personal experiences, hypothetical scenarios, or real-world events? What\'s the best approach? I tend to write too much about one example and then run out of words for my conclusion.',
    tags: ['Writing', 'Task 2', 'Examples'],
    likes: 18,
    comments: [],
    time: '5 hours ago'
  },
  {
    id: "post-3",
    author: {
      id: "user-3",
      name: 'Maria Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
      country: 'Brazil',
      level: 'Band 8.0'
    },
    title: 'Reading strategies for matching headings questions',
    content: 'I\'ve found a technique that worked well for me with matching headings questions in the Reading section. I first identify keywords in the headings, then skim each paragraph to find those keywords or synonyms. After that, I read more carefully to confirm the match. Has anyone else tried this approach or has a better method?',
    tags: ['Reading', 'Matching Headings', 'Strategy'],
    likes: 32,
    comments: [
      {
        id: "comment-3-1",
        author: {
          id: "user-4",
          name: 'James Wilson',
          avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
          country: 'Canada',
          level: 'Band 7.0'
        },
        content: 'That\'s exactly what I do! I also recommend looking for topic sentences at the beginning and end of paragraphs as they often summarize the main idea.',
        time: '12 hours ago',
        likes: 5
      }
    ],
    time: '1 day ago'
  }
];

// Mock data for study partners
const initialStudyPartners: IStudyPartner[] = [
  {
    id: "partner-1",
    name: 'James Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    country: 'Canada',
    level: 'Band 7.0',
    targetScore: 'Band 8.0',
    interests: ['Speaking practice', 'Academic Writing'],
    online: true
  },
  {
    id: "partner-2",
    name: 'Akira Tanaka',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    country: 'Japan',
    level: 'Band 6.5',
    targetScore: 'Band 7.0',
    interests: ['Listening practice', 'Pronunciation'],
    online: true
  },
  {
    id: "partner-3",
    name: 'Fatima Al-Farsi',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    country: 'Oman',
    level: 'Band 7.5',
    targetScore: 'Band 8.0',
    interests: ['Reading strategies', 'Academic vocabulary'],
    online: false
  },
  {
    id: "partner-4",
    name: 'Luis Mendoza',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    country: 'Mexico',
    level: 'Band 6.0',
    targetScore: 'Band 7.0',
    interests: ['General Training Writing', 'Speaking fluency'],
    online: true
  }
];

// Mock data for upcoming events
const initialEvents: IEvent[] = [
  {
    id: "event-1",
    title: 'Writing Task 2 Workshop',
    description: 'Learn effective strategies for argument development and coherence in Writing Task 2 essays',
    date: 'April 10, 2025',
    time: '10:00 AM GMT',
    host: 'Dr. Emily Chen',
    attendees: 45,
    type: 'Workshop'
  },
  {
    id: "event-2",
    title: 'Speaking Practice Group',
    description: 'Join our weekly speaking practice session with fellow test-takers and receive feedback from experts',
    date: 'April 12, 2025',
    time: '2:00 PM GMT',
    host: 'Michael Brown',
    attendees: 18,
    type: 'Practice Session'
  },
  {
    id: "event-3",
    title: 'Ask Me Anything: IELTS Examiner',
    description: 'Former IELTS examiner answers your questions about the test and scoring criteria',
    date: 'April 15, 2025',
    time: '5:00 PM GMT',
    host: 'Sarah Thompson',
    attendees: 87,
    type: 'Q&A Session'
  }
];

// Storage keys
const POSTS_STORAGE_KEY = 'neplia_community_posts';
const PARTNERS_STORAGE_KEY = 'neplia_study_partners';
const EVENTS_STORAGE_KEY = 'neplia_community_events';

const Community = () => {
  const { currentUser } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State for discussion posts
  const [discussionPosts, setDiscussionPosts] = useState<IPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('');
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [newComment, setNewComment] = useState('');
  
  // State for study partners
  const [studyPartners, setStudyPartners] = useState<IStudyPartner[]>([]);
  const [partnerSearchQuery, setPartnerSearchQuery] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<IStudyPartner | null>(null);
  
  // State for events
  const [events, setEvents] = useState<IEvent[]>([]);
  const [eventSearchQuery, setEventSearchQuery] = useState('');
  
  // Dialog states
  const [isNewPostDialogOpen, setIsNewPostDialogOpen] = useState(false);
  const [isPostDetailDialogOpen, setIsPostDetailDialogOpen] = useState(false);
  const [isContactPartnerDialogOpen, setIsContactPartnerDialogOpen] = useState(false);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const loadData = () => {
      try {
        const storedPosts = localStorage.getItem(POSTS_STORAGE_KEY);
        const storedPartners = localStorage.getItem(PARTNERS_STORAGE_KEY);
        const storedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
        
        if (storedPosts) {
          setDiscussionPosts(JSON.parse(storedPosts));
        } else {
          setDiscussionPosts(initialDiscussionPosts);
          localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(initialDiscussionPosts));
        }
        
        if (storedPartners) {
          setStudyPartners(JSON.parse(storedPartners));
        } else {
          setStudyPartners(initialStudyPartners);
          localStorage.setItem(PARTNERS_STORAGE_KEY, JSON.stringify(initialStudyPartners));
        }
        
        if (storedEvents) {
          setEvents(JSON.parse(storedEvents));
        } else {
          setEvents(initialEvents);
          localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(initialEvents));
        }
      } catch (error) {
        console.error('Error loading community data:', error);
        // Fallback to initial data
        setDiscussionPosts(initialDiscussionPosts);
        setStudyPartners(initialStudyPartners);
        setEvents(initialEvents);
      }
    };
    
    loadData();
  }, []);
  
  // Save data to localStorage when it changes
  useEffect(() => {
    if (discussionPosts.length > 0) {
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(discussionPosts));
    }
  }, [discussionPosts]);
  
  useEffect(() => {
    if (studyPartners.length > 0) {
      localStorage.setItem(PARTNERS_STORAGE_KEY, JSON.stringify(studyPartners));
    }
  }, [studyPartners]);
  
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    }
  }, [events]);
  
  // Filter posts based on search query
  const filteredPosts = discussionPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Filter study partners based on search query
  const filteredPartners = studyPartners.filter(partner => 
    partner.name.toLowerCase().includes(partnerSearchQuery.toLowerCase()) || 
    partner.country.toLowerCase().includes(partnerSearchQuery.toLowerCase()) ||
    partner.interests.some(interest => interest.toLowerCase().includes(partnerSearchQuery.toLowerCase()))
  );
  
  // Filter events based on search query
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(eventSearchQuery.toLowerCase()) || 
    event.description.toLowerCase().includes(eventSearchQuery.toLowerCase()) ||
    event.type.toLowerCase().includes(eventSearchQuery.toLowerCase())
  );
  
  // Handle creating a new post
  const handleCreatePost = () => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a post",
        variant: "destructive"
      });
      navigate('/signin');
      return;
    }
    
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and content for your post",
        variant: "destructive"
      });
      return;
    }
    
    const tagsArray = newPostTags.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    const newPost: IPost = {
      id: `post-${Date.now()}`,
      author: {
        id: currentUser.id,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg', // Default avatar
        country: 'Unknown',
        level: 'Band 6.0'
      },
      title: newPostTitle,
      content: newPostContent,
      tags: tagsArray.length > 0 ? tagsArray : ['General'],
      likes: 0,
      isLiked: false,
      comments: [],
      time: 'Just now'
    };
    
    setDiscussionPosts([newPost, ...discussionPosts]);
    
    // Reset form
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostTags('');
    setIsNewPostDialogOpen(false);
    
    toast({
      title: "Post created",
      description: "Your discussion has been posted successfully"
    });
  };
  
  // Handle post like
  const handleLikePost = (postId: string) => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like posts",
        variant: "destructive"
      });
      navigate('/signin');
      return;
    }
    
    setDiscussionPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        if (post.isLiked) {
          return { ...post, likes: post.likes - 1, isLiked: false };
        } else {
          return { ...post, likes: post.likes + 1, isLiked: true };
        }
      }
      return post;
    }));
  };
  
  // Handle opening a post detail
  const handleOpenPostDetail = (post: IPost) => {
    setSelectedPost(post);
    setIsPostDetailDialogOpen(true);
  };
  
  // Handle adding a comment
  const handleAddComment = () => {
    if (!currentUser || !selectedPost) return;
    
    if (!newComment.trim()) {
      toast({
        title: "Empty comment",
        description: "Please enter some text before submitting your comment",
        variant: "destructive"
      });
      return;
    }
    
    const newCommentObj: IComment = {
      id: `comment-${selectedPost.id}-${Date.now()}`,
      author: {
        id: currentUser.id,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
        country: 'Unknown',
        level: 'Band 6.0'
      },
      content: newComment,
      time: 'Just now',
      likes: 0
    };
    
    const updatedPost = {
      ...selectedPost,
      comments: [newCommentObj, ...selectedPost.comments]
    };
    
    setDiscussionPosts(prevPosts => 
      prevPosts.map(post => post.id === selectedPost.id ? updatedPost : post)
    );
    
    setSelectedPost(updatedPost);
    setNewComment('');
    
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully"
    });
  };
  
  // Handle joining an event
  const handleJoinEvent = (eventId: string) => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to join events",
        variant: "destructive"
      });
      navigate('/signin');
      return;
    }
    
    setEvents(prevEvents => prevEvents.map(event => {
      if (event.id === eventId) {
        if (event.isAttending) {
          toast({
            title: "Event left",
            description: "You are no longer attending this event"
          });
          return { ...event, attendees: event.attendees - 1, isAttending: false };
        } else {
          toast({
            title: "Event joined",
            description: "You are now registered for this event"
          });
          return { ...event, attendees: event.attendees + 1, isAttending: true };
        }
      }
      return event;
    }));
  };
  
  // Handle contacting a study partner
  const handleContactPartner = (partner: IStudyPartner) => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to contact study partners",
        variant: "destructive"
      });
      navigate('/signin');
      return;
    }
    
    setSelectedPartner(partner);
    setIsContactPartnerDialogOpen(true);
  };
  
  // Handle practice with partner
  const handlePracticeWithPartner = (partner: IStudyPartner) => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to practice with study partners",
        variant: "destructive"
      });
      navigate('/signin');
      return;
    }
    
    if (!partner.online) {
      toast({
        title: "Partner offline",
        description: "This study partner is currently offline. Try again later or send them a message.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Practice session initiated",
      description: `Starting a practice session with ${partner.name}. They will be notified.`
    });
    
    // This would typically connect to a real-time communication service
    console.log(`Practice session requested with ${partner.name}`);
  };
  
  // Handle sending message to partner
  const handleSendMessage = () => {
    if (!selectedPartner) return;
    
    toast({
      title: "Message sent",
      description: `Your message has been sent to ${selectedPartner.name}`
    });
    
    setIsContactPartnerDialogOpen(false);
  };
  
  // Handle adding to calendar
  const handleAddToCalendar = (event: IEvent) => {
    toast({
      title: "Added to calendar",
      description: `${event.title} has been added to your calendar`
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Community</h1>
              <p className="text-muted-foreground">Connect with fellow test-takers and experts worldwide</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button onClick={() => {
                if (!currentUser) {
                  toast({
                    title: "Authentication required",
                    description: "Please sign in to create a discussion",
                    variant: "destructive"
                  });
                  navigate('/signin');
                  return;
                }
                setIsNewPostDialogOpen(true);
              }}>
                <MessageSquare className="h-4 w-4 mr-2" />
                New Discussion
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="discussions">
                <TabsList className="mb-6">
                  <TabsTrigger value="discussions">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Discussions
                  </TabsTrigger>
                  <TabsTrigger value="studyPartners">
                    <Users className="h-4 w-4 mr-2" />
                    Study Partners
                  </TabsTrigger>
                  <TabsTrigger value="events">
                    <Calendar className="h-4 w-4 mr-2" />
                    Events
                  </TabsTrigger>
                </TabsList>
                
                {/* Discussions Tab */}
                <TabsContent value="discussions">
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search discussions..." 
                        className="pl-9" 
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button variant="outline" size="sm">Latest</Button>
                      <Button variant="outline" size="sm">Popular</Button>
                      <Button variant="outline" size="sm">
                        <Tag className="h-4 w-4 mr-1" />
                        Reading
                      </Button>
                      <Button variant="outline" size="sm">
                        <Tag className="h-4 w-4 mr-1" />
                        Writing
                      </Button>
                      <Button variant="outline" size="sm">
                        <Tag className="h-4 w-4 mr-1" />
                        Speaking
                      </Button>
                      <Button variant="outline" size="sm">
                        <Tag className="h-4 w-4 mr-1" />
                        Listening
                      </Button>
                    </div>
                  </div>
                  
                  {filteredPosts.length > 0 ? (
                    <div className="space-y-6">
                      {filteredPosts.map((post) => (
                        <Card key={post.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{post.author.name}</div>
                                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                                    <span className="flex items-center">
                                      <Flag className="h-3 w-3 mr-1" />
                                      {post.author.country}
                                    </span>
                                    <span>•</span>
                                    <span>{post.author.level}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground">{post.time}</div>
                            </div>
                            <CardTitle 
                              className="text-lg mt-3 cursor-pointer hover:text-primary transition-colors"
                              onClick={() => handleOpenPostDetail(post)}
                            >
                              {post.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p 
                              className="text-muted-foreground cursor-pointer"
                              onClick={() => handleOpenPostDetail(post)}
                            >
                              {post.content.length > 200 
                                ? `${post.content.substring(0, 200)}...` 
                                : post.content}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                              {post.tags.map((tag, index) => (
                                <div key={index} className="text-xs bg-accent text-accent-foreground rounded-full px-2 py-1">
                                  {tag}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="border-t pt-3">
                            <div className="flex items-center gap-4">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className={`h-8 ${post.isLiked ? 'text-primary' : 'text-muted-foreground'}`}
                                onClick={() => handleLikePost(post.id)}
                              >
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                {post.likes}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 text-muted-foreground"
                                onClick={() => handleOpenPostDetail(post)}
                              >
                                <MessageCircle className="h-4 w-4 mr-1" />
                                {post.comments.length}
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">
                                <Share2 className="h-4 w-4 mr-1" />
                                Share
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-12 text-center">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold text-lg mb-2">No discussions found</h3>
                      <p className="text-muted-foreground mb-6">
                        {searchQuery 
                          ? "No discussions match your search criteria. Try a different search term."
                          : "Be the first to start a discussion in this community!"}
                      </p>
                      <Button onClick={() => {
                        if (!currentUser) {
                          toast({
                            title: "Authentication required",
                            description: "Please sign in to create a discussion",
                            variant: "destructive"
                          });
                          navigate('/signin');
                          return;
                        }
                        setIsNewPostDialogOpen(true);
                      }}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Start a Discussion
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                {/* Study Partners Tab */}
                <TabsContent value="studyPartners">
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Find study partners..." 
                        className="pl-9"
                        value={partnerSearchQuery}
                        onChange={e => setPartnerSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setPartnerSearchQuery(partnerSearchQuery.includes('online') ? '' : 'online')}
                        className={partnerSearchQuery.includes('online') ? 'bg-primary/10' : ''}
                      >
                        Online Now
                      </Button>
                      <Button variant="outline" size="sm">Same Level</Button>
                      <Button variant="outline" size="sm">Same Target</Button>
                      <Button variant="outline" size="sm">
                        <Globe className="h-4 w-4 mr-1" />
                        Filter by Region
                      </Button>
                    </div>
                  </div>
                  
                  {filteredPartners.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredPartners.map((partner) => (
                        <Card key={partner.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between">
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <Avatar>
                                    <AvatarImage src={partner.avatar} alt={partner.name} />
                                    <AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  {partner.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium">{partner.name}</div>
                                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                                    <span className="flex items-center">
                                      <Flag className="h-3 w-3 mr-1" />
                                      {partner.country}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {partner.online ? (
                                <div className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Online</div>
                              ) : (
                                <div className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Offline</div>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              <div>
                                <div className="text-xs text-muted-foreground">Current Level</div>
                                <div>{partner.level}</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">Target Score</div>
                                <div>{partner.targetScore}</div>
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Interests</div>
                              <div className="flex flex-wrap gap-2">
                                {partner.interests.map((interest, index) => (
                                  <div key={index} className="text-xs bg-accent text-accent-foreground rounded-full px-2 py-1">
                                    {interest}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="border-t pt-3">
                            <div className="flex gap-2 w-full">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1"
                                onClick={() => handleContactPartner(partner)}
                              >
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                              <Button 
                                size="sm" 
                                className="flex-1"
                                disabled={!partner.online}
                                onClick={() => handlePracticeWithPartner(partner)}
                              >
                                <Mic className="h-4 w-4 mr-1" />
                                Practice
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-12 text-center">
                      <Users className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold text-lg mb-2">No study partners found</h3>
                      <p className="text-muted-foreground mb-6">
                        {partnerSearchQuery 
                          ? "No study partners match your search criteria. Try a different search term."
                          : "There are no study partners available at the moment."}
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                {/* Events Tab */}
                <TabsContent value="events">
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search events..." 
                        className="pl-9"
                        value={eventSearchQuery}
                        onChange={e => setEventSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button variant="outline" size="sm">This Week</Button>
                      <Button variant="outline" size="sm">This Month</Button>
                      <Button variant="outline" size="sm">
                        <BookOpen className="h-4 w-4 mr-1" />
                        Workshops
                      </Button>
                      <Button variant="outline" size="sm">
                        <User className="h-4 w-4 mr-1" />
                        Q&A Sessions
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4 mr-1" />
                        Practice Groups
                      </Button>
                    </div>
                  </div>
                  
                  {filteredEvents.length > 0 ? (
                    <div className="space-y-6">
                      {filteredEvents.map((event) => (
                        <Card key={event.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between">
                              <div>
                                <div className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full inline-block mb-2">
                                  {event.type}
                                </div>
                                <CardTitle className="text-lg">{event.title}</CardTitle>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium">{event.date}</div>
                                <div className="text-xs text-muted-foreground">{event.time}</div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-4">{event.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Host: {event.host}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{event.attendees} attending</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="border-t pt-3">
                            <div className="flex gap-2 w-full">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1"
                                onClick={() => handleAddToCalendar(event)}
                              >
                                <Calendar className="h-4 w-4 mr-1" />
                                Add to Calendar
                              </Button>
                              <Button 
                                size="sm" 
                                className={`flex-1 ${event.isAttending ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                onClick={() => handleJoinEvent(event.id)}
                              >
                                {event.isAttending ? 'Attending' : 'Join Event'}
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-12 text-center">
                      <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold text-lg mb-2">No events found</h3>
                      <p className="text-muted-foreground mb-6">
                        {eventSearchQuery 
                          ? "No events match your search criteria. Try a different search term."
                          : "There are no upcoming events at the moment."}
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Community Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span>Active Members</span>
                      </div>
                      <div className="font-medium">14,532</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <span>Countries</span>
                      </div>
                      <div className="font-medium">120+</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-muted-foreground" />
                        <span>Discussions</span>
                      </div>
                      <div className="font-medium">{discussionPosts.length + 8745}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <span>Events This Month</span>
                      </div>
                      <div className="font-medium">{events.length + 39}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Trending Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trending Topics</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Writing Task 2', 'Speaking Part 3', 'Reading Strategies',
                      'Vocabulary', 'Grammar', 'Time Management',
                      'Listening Section 4', 'Academic vs General', 'Band 7+',
                      'Test Day Tips'
                    ].map((tag, index) => (
                      <div key={index} className="text-sm bg-accent text-accent-foreground rounded-full px-3 py-1 cursor-pointer hover:bg-accent/70 transition-colors">
                        #{tag.replace(/\s+/g, '')}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Expert Mentors */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Expert Mentors</CardTitle>
                  <CardDescription>Connect with certified IELTS instructors</CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-4">
                    {[
                      {
                        name: 'Dr. Robert Chen',
                        role: 'Former IELTS Examiner',
                        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
                        specialty: 'Writing Assessment'
                      },
                      {
                        name: 'Sophia Williams',
                        role: 'Language Coach',
                        avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
                        specialty: 'Speaking Fluency'
                      },
                      {
                        name: 'David Thompson',
                        role: 'Test Prep Specialist',
                        avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
                        specialty: 'Reading & Listening'
                      }
                    ].map((mentor, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={mentor.avatar} alt={mentor.name} />
                          <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{mentor.name}</div>
                          <div className="text-xs text-muted-foreground">{mentor.role} • {mentor.specialty}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Mentors
                  </Button>
                </CardContent>
              </Card>
              
              {/* Community Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                      <span>Be respectful and supportive of all community members</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                      <span>No spamming, advertising, or off-topic discussions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                      <span>Do not share exam questions or materials from actual IELTS tests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                      <span>Give credit when using others' materials or resources</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* Create New Post Dialog */}
      <Dialog open={isNewPostDialogOpen} onOpenChange={setIsNewPostDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create a New Discussion</DialogTitle>
            <DialogDescription>
              Share your IELTS questions, tips, or experiences with the community
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="post-title" className="text-sm font-medium">Title</label>
              <Input
                id="post-title"
                placeholder="What's your question or topic?"
                value={newPostTitle}
                onChange={e => setNewPostTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="post-content" className="text-sm font-medium">Content</label>
              <Textarea
                id="post-content"
                placeholder="Share your thoughts, questions, or experiences..."
                className="min-h-[150px]"
                value={newPostContent}
                onChange={e => setNewPostContent(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="post-tags" className="text-sm font-medium">Tags</label>
              <Input
                id="post-tags"
                placeholder="e.g., Speaking, Writing, Band 7, Tips (comma separated)"
                value={newPostTags}
                onChange={e => setNewPostTags(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Separate tags with commas to help others find your post
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewPostDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreatePost}>Post Discussion</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Post Detail Dialog */}
      <Dialog open={isPostDetailDialogOpen} onOpenChange={setIsPostDetailDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Avatar>
                    <AvatarImage src={selectedPost.author.avatar} alt={selectedPost.author.name} />
                    <AvatarFallback>{selectedPost.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedPost.author.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="flex items-center">
                        <Flag className="h-3 w-3 mr-1" />
                        {selectedPost.author.country}
                      </span>
                      <span>•</span>
                      <span>{selectedPost.author.level}</span>
                      <span>•</span>
                      <span>{selectedPost.time}</span>
                    </div>
                  </div>
                </div>
                <DialogTitle className="text-xl mt-2">{selectedPost.title}</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-muted-foreground mb-4 whitespace-pre-line">{selectedPost.content}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPost.tags.map((tag, index) => (
                    <div key={index} className="text-xs bg-accent text-accent-foreground rounded-full px-2 py-1">
                      {tag}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 mb-6 border-t border-b py-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`h-8 ${selectedPost.isLiked ? 'text-primary' : 'text-muted-foreground'}`}
                    onClick={() => handleLikePost(selectedPost.id)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {selectedPost.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {selectedPost.comments.length}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
                
                {currentUser && (
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar>
                        <AvatarImage src="https://randomuser.me/api/portraits/lego/1.jpg" alt={`${currentUser.firstName} ${currentUser.lastName}`} />
                        <AvatarFallback>{currentUser.firstName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Textarea
                        placeholder="Add a comment..."
                        className="min-h-[80px]"
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleAddComment}>Post Comment</Button>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Comments ({selectedPost.comments.length})</h4>
                  {selectedPost.comments.length > 0 ? (
                    selectedPost.comments.map((comment) => (
                      <div key={comment.id} className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar>
                            <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{comment.author.name}</div>
                            <div className="text-xs text-muted-foreground">{comment.time}</div>
                          </div>
                        </div>
                        <p className="text-muted-foreground whitespace-pre-line">{comment.content}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {comment.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">
                            Reply
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-6">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Contact Study Partner Dialog */}
      <Dialog open={isContactPartnerDialogOpen} onOpenChange={setIsContactPartnerDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedPartner && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Avatar>
                    <AvatarImage src={selectedPartner.avatar} alt={selectedPartner.name} />
                    <AvatarFallback>{selectedPartner.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle>Message {selectedPartner.name}</DialogTitle>
                    <DialogDescription>
                      {selectedPartner.online ? 'Currently online' : 'Currently offline'}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <div className="text-xs text-muted-foreground">Country</div>
                      <div className="font-medium">{selectedPartner.country}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">IELTS Level</div>
                      <div className="font-medium">{selectedPartner.level}</div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="text-sm font-medium">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder={`Hi ${selectedPartner.name}, I'd like to practice IELTS with you...`}
                      className="min-h-[120px] mt-1"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsContactPartnerDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSendMessage}>Send Message</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Community;
