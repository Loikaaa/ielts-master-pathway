
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import EventRegistration from '@/components/community/EventRegistration';
import DiscussionBoard from '@/components/community/DiscussionBoard';
import { 
  MessageSquare, 
  Users, 
  BookOpen, 
  Calendar, 
  Award, 
  Clock, 
  ThumbsUp, 
  MessageCircle,
  Heart,
  Share2,
  Send,
  Search,
  Filter,
  Sparkles,
  PlusCircle,
  User,
  Flag,
  CalendarCheck
} from 'lucide-react';

interface EventRegistration {
  userId: string;
  eventId: string;
  registeredOn: string;
  status: 'confirmed' | 'pending' | 'canceled';
  userEmail?: string;
  userName?: string;
}

const Community = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('discussions');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);
  
  useEffect(() => {
    try {
      const storedRegistrations = localStorage.getItem('neplia_event_registrations');
      if (storedRegistrations) {
        setEventRegistrations(JSON.parse(storedRegistrations));
      }
    } catch (error) {
      console.error('Error loading event registrations:', error);
    }
  }, []);

  const studyGroups = [
    {
      id: 1,
      name: "Speaking Practice Partners",
      members: 48,
      description: "Find partners for regular speaking practice sessions. We organize weekly Zoom calls where members pair up to practice IELTS speaking topics.",
      tags: ["Speaking", "Practice Partners", "Weekly Sessions"],
      activity: "Very Active",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      name: "Writing Task 2 Workshop",
      members: 63,
      description: "A collaborative group focused on improving Writing Task 2 essays. Members share essays for peer review and our moderators provide detailed feedback.",
      tags: ["Writing", "Essay Review", "Feedback"],
      activity: "Active",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      name: "Academic Reading Intensive",
      members: 37,
      description: "Focus on strategies for complex academic reading passages. We work through challenging IELTS reading passages together and discuss techniques.",
      tags: ["Reading", "Academic", "Strategy"],
      activity: "Moderately Active",
      image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];
  
  const events = [
    {
      id: "1",
      title: "Free Mock Speaking Test Workshop",
      date: "April 10, 2025",
      time: "18:00 - 20:00 GMT",
      host: "IELTS Instructor David Wilson",
      description: "Join our certified IELTS examiner for a free workshop simulating the IELTS Speaking test. Volunteers will have their speaking assessed live with feedback.",
      participants: 120,
      type: "Online",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "2",
      title: "Writing Task 1: Data Analysis Masterclass",
      date: "April 15, 2025",
      time: "14:00 - 15:30 GMT",
      host: "Academic Writing Coach Emma Brown",
      description: "Learn how to quickly analyze graphs, charts and diagrams for Writing Task 1. This session will cover the key vocabulary and structures needed for high scores.",
      participants: 85,
      type: "Online",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "3",
      title: "IELTS Success Stories: Q&A Panel",
      date: "April 20, 2025",
      time: "17:00 - 18:30 GMT",
      host: "Community Moderator Team",
      description: "A panel of successful test-takers who achieved band scores of 8+ will share their preparation strategies and answer your questions live.",
      participants: 200,
      type: "Online",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];
  
  useEffect(() => {
    try {
      localStorage.setItem('neplia_community_events', JSON.stringify(events));
    } catch (error) {
      console.error('Error saving events to localStorage:', error);
    }
  }, []);
  
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
  
  const handleJoinGroup = () => {
    toast({
      title: "Request Sent!",
      description: "Your request to join the group has been sent to the moderators.",
    });
  };
  
  const handleOpenEventRegistration = (event: any) => {
    setSelectedEvent(event);
    setShowRegistrationDialog(true);
  };
  
  const handleRegisterEvent = (eventId: string, userData: { name: string; email: string; agreeToTerms: boolean }) => {
    const existingRegistration = eventRegistrations.find(
      reg => reg.eventId === eventId && reg.userEmail === userData.email
    );
    
    if (existingRegistration) {
      toast({
        title: "Already Registered",
        description: "You are already registered for this event. Check your email for details.",
      });
      return;
    }
    
    const newRegistration: EventRegistration = {
      userId: `user-${Date.now()}`,
      eventId: eventId,
      userEmail: userData.email,
      userName: userData.name,
      registeredOn: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    
    const updatedRegistrations = [...eventRegistrations, newRegistration];
    setEventRegistrations(updatedRegistrations);
    
    try {
      localStorage.setItem('neplia_event_registrations', JSON.stringify(updatedRegistrations));
    } catch (error) {
      console.error('Error saving registration:', error);
    }
    
    toast({
      title: "Registration Successful!",
      description: "Your registration request has been submitted. Check your email for confirmation details.",
    });
  };

  const checkIfRegistered = (eventId: string) => {
    return eventRegistrations.some(reg => reg.eventId === eventId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="relative mb-8 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
              alt="Community" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-8">
              <motion.h1 
                className="text-3xl md:text-5xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                IELTS Community
              </motion.h1>
              <motion.p 
                className="text-white/90 max-w-2xl text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Connect with fellow IELTS test-takers, join study groups, share resources, and participate in events to help you achieve your target score.
              </motion.p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div 
              className="bg-card rounded-lg p-4 text-center shadow-sm border border-primary/10"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Users className="mx-auto h-8 w-8 text-primary mb-2" />
              <p className="text-2xl font-bold">12,450+</p>
              <p className="text-muted-foreground text-sm">Active Members</p>
            </motion.div>
            <motion.div 
              className="bg-card rounded-lg p-4 text-center shadow-sm border border-primary/10"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <MessageSquare className="mx-auto h-8 w-8 text-primary mb-2" />
              <p className="text-2xl font-bold">5,280+</p>
              <p className="text-muted-foreground text-sm">Discussions</p>
            </motion.div>
            <motion.div 
              className="bg-card rounded-lg p-4 text-center shadow-sm border border-primary/10"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Users className="mx-auto h-8 w-8 text-primary mb-2" />
              <p className="text-2xl font-bold">76+</p>
              <p className="text-muted-foreground text-sm">Study Groups</p>
            </motion.div>
            <motion.div 
              className="bg-card rounded-lg p-4 text-center shadow-sm border border-primary/10"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Calendar className="mx-auto h-8 w-8 text-primary mb-2" />
              <p className="text-2xl font-bold">120+</p>
              <p className="text-muted-foreground text-sm">Events per Month</p>
            </motion.div>
          </div>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab as any} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="discussions" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Discussions
                </TabsTrigger>
                <TabsTrigger value="studyGroups" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Study Groups
                </TabsTrigger>
                <TabsTrigger value="events" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Events
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="discussions">
              <DiscussionBoard />
            </TabsContent>
            
            <TabsContent value="studyGroups">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Active Study Groups</h2>
                <Button className="bg-primary">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Group
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {studyGroups.map((group) => (
                  <motion.div 
                    key={group.id}
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="overflow-hidden h-full flex flex-col">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={group.image} 
                          alt={group.name} 
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>{group.name}</CardTitle>
                          <Badge 
                            variant="outline" 
                            className={`
                              ${group.activity === 'Very Active' ? 'bg-green-500/10 text-green-500' : 
                                group.activity === 'Active' ? 'bg-blue-500/10 text-blue-500' : 
                                'bg-amber-500/10 text-amber-500'}
                            `}
                          >
                            {group.activity}
                          </Badge>
                        </div>
                        <CardDescription>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{group.members} members</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-muted-foreground mb-4">{group.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {group.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="bg-primary/5">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button onClick={handleJoinGroup} className="w-full bg-primary">
                          Join Group
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline">
                  Browse More Groups
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="events">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Upcoming Events</h2>
                <Button className="bg-primary">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
              </div>
              
              <div className="space-y-6">
                {events.map((event) => {
                  const isRegistered = checkIfRegistered(event.id);
                  
                  return (
                    <motion.div 
                      key={event.id}
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                            <img 
                              src={event.image} 
                              alt={event.title} 
                              className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                            />
                          </div>
                          <div className="md:w-2/3 flex flex-col">
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-xl">{event.title}</CardTitle>
                                  <CardDescription className="flex items-center mt-1">
                                    <User className="h-4 w-4 mr-1" />
                                    Hosted by {event.host}
                                  </CardDescription>
                                </div>
                                <Badge className="bg-primary">{event.type}</Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                              <div className="flex items-center text-sm mb-2">
                                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{event.date}</span>
                                <Clock className="h-4 w-4 mx-2 text-muted-foreground" />
                                <span>{event.time}</span>
                              </div>
                              <p className="text-muted-foreground mb-4">{event.description}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Users className="h-4 w-4 mr-1" />
                                <span>{event.participants} participants registered</span>
                              </div>
                            </CardContent>
                            <CardFooter className="border-t pt-4">
                              {isRegistered ? (
                                <Button disabled className="bg-green-600 hover:bg-green-700">
                                  <CalendarCheck className="h-4 w-4 mr-2" />
                                  Registration Pending
                                </Button>
                              ) : (
                                <Button 
                                  onClick={() => handleOpenEventRegistration(event)} 
                                  className="bg-primary"
                                >
                                  <CalendarCheck className="h-4 w-4 mr-2" />
                                  Register Now
                                </Button>
                              )}
                              <Button variant="outline" className="ml-2">
                                <Calendar className="h-4 w-4 mr-2" />
                                Add to Calendar
                              </Button>
                            </CardFooter>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline">
                  View All Events
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Latest Community Activity</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-[19px] w-0.5 bg-border" />
              <motion.div 
                className="space-y-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={item} className="flex gap-4">
                  <div className="relative z-10">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <Card className="flex-grow">
                    <CardHeader className="py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="https://randomuser.me/api/portraits/women/32.jpg" alt="User" />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Sofia Chen</span>
                        <span className="text-muted-foreground">joined the</span>
                        <span className="font-medium">Speaking Practice Partners</span>
                        <span className="text-muted-foreground">group</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">10 minutes ago</div>
                    </CardHeader>
                  </Card>
                </motion.div>
                
                <motion.div variants={item} className="flex gap-4">
                  <div className="relative z-10">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <Card className="flex-grow">
                    <CardHeader className="py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="https://randomuser.me/api/portraits/men/45.jpg" alt="User" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">John Doe</span>
                        <span className="text-muted-foreground">posted in</span>
                        <span className="font-medium">Reading section: Time management strategies</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">30 minutes ago</div>
                    </CardHeader>
                    <CardContent className="py-0 text-sm">
                      <p>"I've found that spending 2-3 minutes planning before starting each passage helps me..."</p>
                    </CardContent>
                    <CardFooter className="pt-2 pb-3">
                      <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-primary">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        5
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-primary">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                
                <motion.div variants={item} className="flex gap-4">
                  <div className="relative z-10">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <Card className="flex-grow">
                    <CardHeader className="py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" />
                          <AvatarFallback>MP</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Mira Patel</span>
                        <span className="text-muted-foreground">achieved her target IELTS score of</span>
                        <Badge className="bg-gradient-to-r from-amber-400 to-amber-600">8.0</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                    </CardHeader>
                    <CardContent className="py-0 pb-2">
                      <p className="text-sm">After 3 months of preparation, I finally achieved my target score! Thank you to everyone in this community who helped me along the way. Special thanks to the Writing Task 2 Workshop group!</p>
                    </CardContent>
                    <CardFooter className="pt-2 pb-3">
                      <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-primary">
                        <Heart className="h-3 w-3 mr-1" />
                        42
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-primary">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        12 Comments
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Join the Conversation</CardTitle>
                <CardDescription>Share your IELTS experience or ask a question</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="What's on your mind about IELTS?"
                  className="mb-4"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    Cancel
                  </Button>
                  <Button className="bg-primary">
                    <Send className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      
      {selectedEvent && (
        <EventRegistration
          isOpen={showRegistrationDialog}
          onClose={() => setShowRegistrationDialog(false)}
          event={selectedEvent}
          onRegister={handleRegisterEvent}
        />
      )}
    </div>
  );
};

export default Community;
