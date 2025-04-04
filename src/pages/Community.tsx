
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
  Edit,
  Flag,
  Globe,
  Heart,
  MessageCircle,
  MessageSquare,
  Mic,
  Search,
  Send,
  Share2,
  Tag,
  ThumbsUp,
  User,
  Users,
  Video,
  X
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
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

interface IMentor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  specialty: string;
  bio: string;
  availability: string;
  rating: number;
  reviews: number;
  hourlyRate: string;
}

// MOCK DATA
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

// New mentor data
const initialMentors: IMentor[] = [
  {
    id: "mentor-1",
    name: 'Dr. Robert Chen',
    role: 'Former IELTS Examiner',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    specialty: 'Writing Assessment',
    bio: 'With 15 years of experience as an IELTS examiner, I specialize in helping students understand the assessment criteria and improve their writing skills.',
    availability: 'Mon-Fri, 9AM-5PM GMT',
    rating: 4.9,
    reviews: 128,
    hourlyRate: '$45'
  },
  {
    id: "mentor-2",
    name: 'Sophia Williams',
    role: 'Language Coach',
    avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
    specialty: 'Speaking Fluency',
    bio: 'I help students overcome speaking anxiety and develop natural fluency for the IELTS speaking test, with focus on pronunciation and intonation.',
    availability: 'Weekends, 10AM-8PM GMT',
    rating: 4.8,
    reviews: 93,
    hourlyRate: '$40'
  },
  {
    id: "mentor-3",
    name: 'David Thompson',
    role: 'Test Prep Specialist',
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    specialty: 'Reading & Listening',
    bio: 'Specialized in teaching effective strategies for the Reading and Listening modules, with emphasis on time management and prediction skills.',
    availability: 'Tue-Sat, 2PM-10PM GMT',
    rating: 4.7,
    reviews: 76,
    hourlyRate: '$38'
  },
  {
    id: "mentor-4",
    name: 'Maria Garcia',
    role: 'IELTS Trainer & Linguist',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    specialty: 'Grammar & Vocabulary',
    bio: 'As a linguist with CELTA certification, I help students expand their lexical resource and improve grammatical accuracy for better IELTS scores.',
    availability: 'Mon-Thu, 12PM-8PM GMT',
    rating: 4.9,
    reviews: 112,
    hourlyRate: '$42'
  },
  {
    id: "mentor-5",
    name: 'Dr. James Peterson',
    role: 'Academic Director',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    specialty: 'Overall Test Strategy',
    bio: 'With a PhD in Applied Linguistics, I provide comprehensive IELTS preparation with focus on academic writing and research skills.',
    availability: 'Wed-Sun, 9AM-7PM GMT',
    rating: 5.0,
    reviews: 145,
    hourlyRate: '$50'
  }
];

// Storage keys
const POSTS_STORAGE_KEY = 'neplia_community_posts';
const PARTNERS_STORAGE_KEY = 'neplia_study_partners';
const EVENTS_STORAGE_KEY = 'neplia_community_events';
const MENTORS_STORAGE_KEY = 'neplia_community_mentors';

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
  
  // State for editing posts
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editPostTitle, setEditPostTitle] = useState('');
  const [editPostContent, setEditPostContent] = useState('');
  const [editPostTags, setEditPostTags] = useState('');
  
  // State for study partners
  const [studyPartners, setStudyPartners] = useState<IStudyPartner[]>([]);
  const [partnerSearchQuery, setPartnerSearchQuery] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<IStudyPartner | null>(null);
  const [conversationMessage, setConversationMessage] = useState('');
  const [conversations, setConversations] = useState<{[key: string]: {message: string, sender: string, time: string}[]}>({});
  
  // State for events
  const [events, setEvents] = useState<IEvent[]>([]);
  const [eventSearchQuery, setEventSearchQuery] = useState('');
  
  // State for mentors
  const [mentors, setMentors] = useState<IMentor[]>([]);
  const [mentorSearchQuery, setMentorSearchQuery] = useState('');
  const [showAllMentors, setShowAllMentors] = useState(false);
  
  // Dialog states
  const [isNewPostDialogOpen, setIsNewPostDialogOpen] = useState(false);
  const [isPostDetailDialogOpen, setIsPostDetailDialogOpen] = useState(false);
  const [isContactPartnerDialogOpen, setIsContactPartnerDialogOpen] = useState(false);
  const [isStartConversationDialogOpen, setIsStartConversationDialogOpen] = useState(false);
  const [isAllMentorsDialogOpen, setIsAllMentorsDialogOpen] = useState(false);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const loadData = () => {
      try {
        const storedPosts = localStorage.getItem(POSTS_STORAGE_KEY);
        const storedPartners = localStorage.getItem(PARTNERS_STORAGE_KEY);
        const storedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
        const storedMentors = localStorage.getItem(MENTORS_STORAGE_KEY);
        
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
        
        if (storedMentors) {
          setMentors(JSON.parse(storedMentors));
        } else {
          setMentors(initialMentors);
          localStorage.setItem(MENTORS_STORAGE_KEY, JSON.stringify(initialMentors));
        }
      } catch (error) {
        console.error('Error loading community data:', error);
        // Fallback to initial data
        setDiscussionPosts(initialDiscussionPosts);
        setStudyPartners(initialStudyPartners);
        setEvents(initialEvents);
        setMentors(initialMentors);
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
  
  useEffect(() => {
    if (mentors.length > 0) {
      localStorage.setItem(MENTORS_STORAGE_KEY, JSON.stringify(mentors));
    }
  }, [mentors]);
  
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
  
  // Filter mentors based on search query
  const filteredMentors = mentors.filter(mentor => 
    mentor.name.toLowerCase().includes(mentorSearchQuery.toLowerCase()) || 
    mentor.specialty.toLowerCase().includes(mentorSearchQuery.toLowerCase()) ||
    mentor.role.toLowerCase().includes(mentorSearchQuery.toLowerCase())
  );
  
  // Check if the current user is the author of a post
  const isPostAuthor = (post: IPost) => {
    if (!currentUser) return false;
    return post.author.id === currentUser.id;
  };
  
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
  
  // Handle editing a post
  const handleEditPost = () => {
    if (!selectedPost || !currentUser) return;
    
    if (!isPostAuthor(selectedPost)) {
      toast({
        title: "Permission denied",
        description: "You can only edit your own posts",
        variant: "destructive"
      });
      return;
    }
    
    if (!editPostTitle.trim() || !editPostContent.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and content for your post",
        variant: "destructive"
      });
      return;
    }
    
    const tagsArray = editPostTags.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    const updatedPost = {
      ...selectedPost,
      title: editPostTitle,
      content: editPostContent,
      tags: tagsArray.length > 0 ? tagsArray : ['General'],
      time: 'Edited just now'
    };
    
    setDiscussionPosts(prevPosts => 
      prevPosts.map(post => post.id === selectedPost.id ? updatedPost : post)
    );
    
    setSelectedPost(updatedPost);
    setIsEditingPost(false);
    
    toast({
      title: "Post updated",
      description: "Your discussion has been updated successfully"
    });
  };
  
  // Start editing a post
  const startEditingPost = (post: IPost) => {
    if (!isPostAuthor(post)) {
      toast({
        title: "Permission denied",
        description: "You can only edit your own posts",
        variant: "destructive"
      });
      return;
    }
    
    setEditPostTitle(post.title);
    setEditPostContent(post.content);
    setEditPostTags(post.tags.join(', '));
    setIsEditingPost(true);
  };
  
  // Cancel editing a post
  const cancelEditingPost = () => {
    setIsEditingPost(false);
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
    
    // Also update selected post if it's the one being liked
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => {
        if (!prev) return null;
        if (prev.isLiked) {
          return { ...prev, likes: prev.likes - 1, isLiked: false };
        } else {
          return { ...prev, likes: prev.likes + 1, isLiked: true };
        }
      });
    }
  };
  
  // Handle opening a post detail
  const handleOpenPostDetail = (post: IPost) => {
    setSelectedPost(post);
    setIsPostDetailDialogOpen(true);
    setIsEditingPost(false);
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
  
  // Handle start conversation
  const handleStartConversation = (partner: IStudyPartner) => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to start a conversation",
        variant: "destructive"
      });
      navigate('/signin');
      return;
    }
    
    setSelectedPartner(partner);
    setIsStartConversationDialogOpen(true);
  };
  
  // Handle sending message in conversation
  const handleSendConversationMessage = () => {
    if (!selectedPartner || !conversationMessage.trim()) return;
    
    const partnerId = selectedPartner.id;
    const newMessage = {
      message: conversationMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString()
    };
    
    setConversations(prev => {
      const existingConversation = prev[partnerId] || [];
      return {
        ...prev,
        [partnerId]: [...existingConversation, newMessage]
      };
    });
    
    setConversationMessage('');
    
    // Simulate partner response after a short delay
    setTimeout(() => {
      const responseMessages = [
        "Thanks for reaching out! I'd be happy to practice together.",
        "That's a great question about IELTS. Let me think about it.",
        "Yes, I'm available for a study session this weekend.",
        "I'm preparing for the speaking test too. We should practice together!",
        "That's an interesting perspective on the writing task."
      ];
      
      const partnerResponse = {
        message: responseMessages[Math.floor(Math.random() * responseMessages.length)],
        sender: 'partner',
        time: new Date().toLocaleTimeString()
      };
      
      setConversations(prev => {
        const existingConversation = prev[partnerId] || [];
        return {
          ...prev,
          [partnerId]: [...existingConversation, partnerResponse]
        };
      });
    }, 1500);
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
  
  // Handle view all mentors
  const handleViewAllMentors = () => {
    setMentorSearchQuery('');
    setIsAllMentorsDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-3/4">
              <Tabs defaultValue="discussions" className="w-full">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="discussions" className="flex-1">Discussions</TabsTrigger>
                  <TabsTrigger value="study-partners" className="flex-1">Study Partners</TabsTrigger>
                  <TabsTrigger value="events" className="flex-1">Events</TabsTrigger>
                  <TabsTrigger value="mentors" className="flex-1">Mentors</TabsTrigger>
                </TabsList>
                
                {/* Discussions Tab */}
                <TabsContent value="discussions" className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">IELTS Discussions</h2>
                    <Button onClick={() => setIsNewPostDialogOpen(true)}>Start Discussion</Button>
                  </div>
                  
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input 
                      placeholder="Search discussions..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {filteredPosts.length > 0 ? (
                    <div className="space-y-4">
                      {filteredPosts.map((post) => (
                        <Card key={post.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{post.author.name}</div>
                                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Globe size={12} />
                                    {post.author.country} • {post.author.level}
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">{post.time}</div>
                            </div>
                            <CardTitle className="mt-2 text-lg cursor-pointer hover:text-primary transition-colors" onClick={() => handleOpenPostDetail(post)}>
                              {post.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm line-clamp-3">{post.content}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {post.tags.map((tag, idx) => (
                                <div key={idx} className="text-xs bg-muted px-2 py-1 rounded-md flex items-center gap-1">
                                  <Tag size={12} />
                                  {tag}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="pt-2 flex justify-between">
                            <div className="flex items-center gap-4">
                              <button 
                                onClick={() => handleLikePost(post.id)} 
                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                <ThumbsUp size={16} className={post.isLiked ? "text-primary fill-primary" : ""} />
                                <span>{post.likes}</span>
                              </button>
                              <button 
                                onClick={() => handleOpenPostDetail(post)} 
                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                <MessageCircle size={16} />
                                <span>{post.comments.length}</span>
                              </button>
                            </div>
                            <div className="flex items-center gap-2">
                              {isPostAuthor(post) && (
                                <Button variant="ghost" size="sm" onClick={() => startEditingPost(post)}>
                                  <Edit size={14} className="mr-1" />
                                  Edit
                                </Button>
                              )}
                              <Button variant="outline" size="sm" onClick={() => handleOpenPostDetail(post)}>
                                Read More
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🔍</div>
                      <h3 className="text-lg font-medium">No matching posts found</h3>
                      <p className="text-muted-foreground mt-2">Try different search terms or start a new discussion</p>
                      <Button onClick={() => setIsNewPostDialogOpen(true)} className="mt-4">
                        Start New Discussion
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                {/* Study Partners Tab */}
                <TabsContent value="study-partners" className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Find Study Partners</h2>
                  </div>
                  
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input 
                      placeholder="Search by name, country, or interests..." 
                      className="pl-10"
                      value={partnerSearchQuery}
                      onChange={(e) => setPartnerSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {filteredPartners.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredPartners.map((partner) => (
                        <Card key={partner.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <div className="flex items-center gap-2">
                                <div className="relative">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src={partner.avatar} alt={partner.name} />
                                    <AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  {partner.online && (
                                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium">{partner.name}</div>
                                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Globe size={12} />
                                    {partner.country}
                                  </div>
                                </div>
                              </div>
                              <div className="space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className={partner.online ? "text-green-500" : "text-muted-foreground"}
                                >
                                  {partner.online ? "Online" : "Offline"}
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="text-muted-foreground">Current Level</div>
                                <div>{partner.level}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Target Score</div>
                                <div>{partner.targetScore}</div>
                              </div>
                            </div>
                            <div className="mt-4">
                              <div className="text-muted-foreground text-sm mb-2">Interests</div>
                              <div className="flex flex-wrap gap-2">
                                {partner.interests.map((interest, idx) => (
                                  <div key={idx} className="text-xs bg-muted px-2 py-1 rounded-md">
                                    {interest}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-2 flex justify-between">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1 mr-2"
                              onClick={() => handleContactPartner(partner)}
                            >
                              <MessageSquare size={14} className="mr-1" />
                              Contact
                            </Button>
                            <Button 
                              size="sm" 
                              className="flex-1"
                              disabled={!partner.online}
                              onClick={() => handlePracticeWithPartner(partner)}
                            >
                              <Users size={14} className="mr-1" />
                              Practice
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🔍</div>
                      <h3 className="text-lg font-medium">No matching study partners found</h3>
                      <p className="text-muted-foreground mt-2">Try different search terms</p>
                    </div>
                  )}
                </TabsContent>
                
                {/* Events Tab */}
                <TabsContent value="events" className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Upcoming Events</h2>
                  </div>
                  
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input 
                      placeholder="Search events..." 
                      className="pl-10"
                      value={eventSearchQuery}
                      onChange={(e) => setEventSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {filteredEvents.length > 0 ? (
                    <div className="space-y-4">
                      {filteredEvents.map((event) => (
                        <Card key={event.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <div>
                                <div className="flex items-center">
                                  <div className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${
                                    event.type === 'Workshop' ? 'bg-blue-100 text-blue-800' : 
                                    event.type === 'Practice Session' ? 'bg-green-100 text-green-800' : 
                                    'bg-purple-100 text-purple-800'
                                  } mr-2`}>
                                    {event.type}
                                  </div>
                                  <CardTitle className="text-lg">{event.title}</CardTitle>
                                </div>
                                <CardDescription className="mt-1">Hosted by {event.host}</CardDescription>
                              </div>
                              <Button 
                                variant={event.isAttending ? "secondary" : "outline"}
                                size="sm"
                                onClick={() => handleJoinEvent(event.id)}
                              >
                                {event.isAttending ? "Attending" : "Join"}
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm">{event.description}</p>
                            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                              <div className="flex items-center">
                                <Calendar size={16} className="mr-2 text-muted-foreground" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock size={16} className="mr-2 text-muted-foreground" />
                                <span>{event.time}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-2 flex justify-between">
                            <div className="text-sm text-muted-foreground flex items-center">
                              <Users size={16} className="mr-1" />
                              <span>{event.attendees} people attending</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleAddToCalendar(event)}
                            >
                              <Calendar size={14} className="mr-1" />
                              Add to Calendar
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">📅</div>
                      <h3 className="text-lg font-medium">No matching events found</h3>
                      <p className="text-muted-foreground mt-2">Try different search terms</p>
                    </div>
                  )}
                </TabsContent>
                
                {/* Mentors Tab */}
                <TabsContent value="mentors" className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">IELTS Mentors</h2>
                    <Button onClick={handleViewAllMentors}>View All</Button>
                  </div>
                  
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input 
                      placeholder="Search mentors..." 
                      className="pl-10"
                      value={mentorSearchQuery}
                      onChange={(e) => setMentorSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {filteredMentors.length > 0 ? (
                    <div className="space-y-4">
                      {(showAllMentors ? filteredMentors : filteredMentors.slice(0, 3)).map((mentor) => (
                        <Card key={mentor.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={mentor.avatar} alt={mentor.name} />
                                  <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-base">{mentor.name}</CardTitle>
                                  <CardDescription className="mt-0">{mentor.role}</CardDescription>
                                </div>
                              </div>
                              <div className="text-sm">
                                <div className="font-medium text-right">{mentor.hourlyRate}</div>
                                <div className="text-muted-foreground">per hour</div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="mb-3 flex items-center justify-between">
                              <div className="text-sm font-semibold">Specialty: {mentor.specialty}</div>
                              <div className="flex items-center">
                                <div className="text-amber-500 flex items-center mr-1">
                                  {Array(5).fill(0).map((_, i) => (
                                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(mentor.rating) ? 'fill-current' : 'fill-gray-300'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                  ))}
                                </div>
                                <div className="text-xs text-muted-foreground">({mentor.reviews} reviews)</div>
                              </div>
                            </div>
                            <p className="text-sm line-clamp-2">{mentor.bio}</p>
                            <div className="mt-3 text-xs text-muted-foreground">
                              <span className="flex items-center">
                                <Calendar size={12} className="mr-1" />
                                Available: {mentor.availability}
                              </span>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Button className="w-full">
                              Book a Session
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                      
                      {!showAllMentors && filteredMentors.length > 3 && (
                        <div className="text-center">
                          <Button variant="outline" onClick={() => setShowAllMentors(true)}>
                            Show All Mentors
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🔍</div>
                      <h3 className="text-lg font-medium">No matching mentors found</h3>
                      <p className="text-muted-foreground mt-2">Try different search terms</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="md:w-1/4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      <BookOpen size={16} className="mr-2" />
                      Study Resources
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Video size={16} className="mr-2" />
                      Video Lessons
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <MessageSquare size={16} className="mr-2" />
                      Discussion Forums
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <AlertCircle size={16} className="mr-2" />
                      Test Day Tips
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>• Be respectful and supportive</p>
                    <p>• Share authentic experiences</p>
                    <p>• Provide constructive feedback</p>
                    <p>• No spamming or self-promotion</p>
                    <p>• Use appropriate language</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Create New Post Dialog */}
      <Dialog open={isNewPostDialogOpen} onOpenChange={setIsNewPostDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Start a Discussion</DialogTitle>
            <DialogDescription>
              Share your questions, insights, or experiences with the IELTS community
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="post-title" className="text-sm font-medium">Title</label>
              <Input
                id="post-title"
                placeholder="Write a descriptive title"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="post-content" className="text-sm font-medium">Content</label>
              <Textarea
                id="post-content"
                placeholder="Share your thoughts, questions, or experiences..."
                className="min-h-[150px]"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="post-tags" className="text-sm font-medium">
                Tags (comma-separated)
              </label>
              <Input
                id="post-tags"
                placeholder="e.g. Speaking, Writing, Grammar"
                value={newPostTags}
                onChange={(e) => setNewPostTags(e.target.value)}
              />
              <div className="text-xs text-muted-foreground">
                Add relevant tags to help others find your post
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewPostDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePost}>
              Post Discussion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Post Detail Dialog */}
      <Dialog open={isPostDetailDialogOpen} onOpenChange={setIsPostDetailDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedPost && (
            <>
              <DialogHeader>
                <div className="flex justify-between">
                  <div className="space-y-1">
                    {!isEditingPost ? (
                      <DialogTitle>{selectedPost.title}</DialogTitle>
                    ) : (
                      <Input
                        value={editPostTitle}
                        onChange={(e) => setEditPostTitle(e.target.value)}
                        className="font-bold text-xl"
                      />
                    )}
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedPost.author.avatar} alt={selectedPost.author.name} />
                        <AvatarFallback>{selectedPost.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{selectedPost.author.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Globe size={12} />
                          {selectedPost.author.country} • {selectedPost.time}
                        </div>
                      </div>
                    </div>
                  </div>
                  {isPostAuthor(selectedPost) && !isEditingPost && (
                    <Button variant="ghost" size="sm" onClick={() => startEditingPost(selectedPost)}>
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                  )}
                </div>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {!isEditingPost ? (
                  <div className="space-y-4">
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {selectedPost.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map((tag, idx) => (
                        <div key={idx} className="text-xs bg-muted px-2 py-1 rounded-md flex items-center gap-1">
                          <Tag size={12} />
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Textarea
                      value={editPostContent}
                      onChange={(e) => setEditPostContent(e.target.value)}
                      className="min-h-[150px]"
                    />
                    <div className="space-y-2">
                      <label htmlFor="edit-post-tags" className="text-sm font-medium">
                        Tags (comma-separated)
                      </label>
                      <Input
                        id="edit-post-tags"
                        placeholder="e.g. Speaking, Writing, Grammar"
                        value={editPostTags}
                        onChange={(e) => setEditPostTags(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-4 pt-2">
                  <button 
                    onClick={() => handleLikePost(selectedPost.id)} 
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ThumbsUp size={16} className={selectedPost.isLiked ? "text-primary fill-primary" : ""} />
                    <span>{selectedPost.likes} likes</span>
                  </button>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MessageCircle size={16} />
                    <span>{selectedPost.comments.length} comments</span>
                  </div>
                </div>
                
                {isEditingPost && (
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={cancelEditingPost}>
                      Cancel
                    </Button>
                    <Button onClick={handleEditPost}>
                      Save Changes
                    </Button>
                  </div>
                )}
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium text-sm mb-4">Comments</h3>
                  
                  <div className="flex gap-2 mb-6">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser ? 'https://randomuser.me/api/portraits/lego/1.jpg' : ''} />
                      <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder={currentUser ? "Add a comment..." : "Sign in to comment"}
                        className="resize-none"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        disabled={!currentUser}
                      />
                      <div className="flex justify-end mt-2">
                        <Button 
                          size="sm" 
                          onClick={handleAddComment}
                          disabled={!currentUser || !newComment.trim()}
                        >
                          <Send size={14} className="mr-1" />
                          Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {selectedPost.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-muted rounded-md p-3">
                            <div className="flex justify-between items-center mb-1">
                              <div className="font-medium text-sm">{comment.author.name}</div>
                              <div className="text-xs text-muted-foreground">{comment.time}</div>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                          <div className="ml-1 mt-1">
                            <button className="text-xs text-muted-foreground hover:text-primary transition-colors px-2 py-1">
                              <ThumbsUp size={12} className="inline mr-1" />
                              {comment.likes > 0 ? comment.likes : "Like"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {selectedPost.comments.length === 0 && (
                      <div className="text-center text-sm text-muted-foreground py-4">
                        No comments yet. Be the first to comment!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Contact Partner Dialog */}
      <Dialog open={isContactPartnerDialogOpen} onOpenChange={setIsContactPartnerDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedPartner && (
            <>
              <DialogHeader>
                <DialogTitle>Contact {selectedPartner.name}</DialogTitle>
                <DialogDescription>
                  Send a message to start a conversation
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedPartner.avatar} alt={selectedPartner.name} />
                    <AvatarFallback>{selectedPartner.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedPartner.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {selectedPartner.country} • {selectedPartner.level}
                    </div>
                  </div>
                  <div className={`ml-auto px-2 py-1 rounded text-xs ${selectedPartner.online ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                    {selectedPartner.online ? "Online" : "Offline"}
                  </div>
                </div>
                
                <Textarea
                  placeholder="Write your message here..."
                  className="min-h-[120px]"
                />
                
                <div className="text-xs text-muted-foreground">
                  <p>• Introduce yourself and your IELTS goals</p>
                  <p>• Suggest specific areas you'd like to practice</p>
                  <p>• Propose a time for a practice session if interested</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsContactPartnerDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendMessage}>
                  <Send size={14} className="mr-1" />
                  Send Message
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Conversation Dialog */}
      <Dialog open={isStartConversationDialogOpen} onOpenChange={setIsStartConversationDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedPartner && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedPartner.avatar} alt={selectedPartner.name} />
                    <AvatarFallback>{selectedPartner.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle>{selectedPartner.name}</DialogTitle>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Globe size={12} />
                      {selectedPartner.country} • {selectedPartner.level}
                    </div>
                  </div>
                  <div className={`ml-auto px-2 py-1 rounded text-xs ${selectedPartner.online ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                    {selectedPartner.online ? "Online" : "Offline"}
                  </div>
                </div>
              </DialogHeader>
              <div className="py-4 h-[300px] flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {conversations[selectedPartner.id]?.length > 0 ? (
                    conversations[selectedPartner.id].map((msg, idx) => (
                      <div 
                        key={idx} 
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                            msg.sender === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}
                        >
                          <div>{msg.message}</div>
                          <div className={`text-xs mt-1 ${
                            msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            {msg.time}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                      <div>
                        <MessageSquare size={40} className="mx-auto mb-2 opacity-20" />
                        <p>No messages yet</p>
                        <p className="text-xs">Start the conversation by sending a message.</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={conversationMessage}
                    onChange={(e) => setConversationMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && conversationMessage.trim()) {
                        handleSendConversationMessage();
                      }
                    }}
                  />
                  <Button 
                    size="icon" 
                    onClick={handleSendConversationMessage}
                    disabled={!conversationMessage.trim()}
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* All Mentors Dialog */}
      <Dialog open={isAllMentorsDialogOpen} onOpenChange={setIsAllMentorsDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>All IELTS Mentors</DialogTitle>
            <DialogDescription>
              Browse and connect with experienced IELTS mentors
            </DialogDescription>
          </DialogHeader>
          <div className="relative my-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input 
              placeholder="Search by name, specialty, or role..." 
              className="pl-10"
              value={mentorSearchQuery}
              onChange={(e) => setMentorSearchQuery(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto py-2">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={mentor.avatar} alt={mentor.name} />
                        <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{mentor.name}</CardTitle>
                        <CardDescription className="mt-0">{mentor.role}</CardDescription>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-right">{mentor.hourlyRate}</div>
                      <div className="text-muted-foreground">per hour</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-sm font-semibold">Specialty: {mentor.specialty}</div>
                    <div className="flex items-center">
                      <div className="text-amber-500 flex items-center mr-1">
                        {Array(5).fill(0).map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < Math.floor(mentor.rating) ? 'fill-current' : 'fill-gray-300'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">({mentor.reviews} reviews)</div>
                    </div>
                  </div>
                  <p className="text-sm line-clamp-2">{mentor.bio}</p>
                  <div className="mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar size={12} className="mr-1" />
                      Available: {mentor.availability}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button className="w-full">
                    Book a Session
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Community;
