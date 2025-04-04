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
          <div className="flex flex
