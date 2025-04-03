
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookOpen,
  Calendar,
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
  Video
} from 'lucide-react';

// Mock data for the community posts
const discussionPosts = [
  {
    id: 1,
    author: {
      name: 'Elena Kim',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      country: 'South Korea',
      level: 'Band 7.5'
    },
    title: 'Tips for improving Speaking fluency in Part 2',
    content: 'I've been struggling with the 2-minute long turn in Speaking Part 2. My mind goes blank even with preparation time. Any suggestions on how to improve fluency and organize thoughts quickly?',
    tags: ['Speaking', 'Fluency', 'Part 2'],
    likes: 24,
    comments: 12,
    time: '2 hours ago'
  },
  {
    id: 2,
    author: {
      name: 'Ahmed Hassan',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      country: 'Egypt',
      level: 'Band 6.5'
    },
    title: 'Writing Task 2: How detailed should examples be?',
    content: 'When writing Task 2 essays, I'm never sure how detailed my examples should be. Should I use personal experiences, hypothetical scenarios, or real-world events? What's the best approach?',
    tags: ['Writing', 'Task 2', 'Examples'],
    likes: 18,
    comments: 9,
    time: '5 hours ago'
  },
  {
    id: 3,
    author: {
      name: 'Maria Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
      country: 'Brazil',
      level: 'Band 8.0'
    },
    title: 'Reading strategies for matching headings questions',
    content: 'I've found a technique that worked well for me with matching headings questions in the Reading section. I first identify keywords in the headings, then skim each paragraph to find those keywords or synonyms. Has anyone else tried this?',
    tags: ['Reading', 'Matching Headings', 'Strategy'],
    likes: 32,
    comments: 15,
    time: '1 day ago'
  }
];

// Mock data for study partners
const studyPartners = [
  {
    id: 1,
    name: 'James Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    country: 'Canada',
    level: 'Band 7.0',
    targetScore: 'Band 8.0',
    interests: ['Speaking practice', 'Academic Writing'],
    online: true
  },
  {
    id: 2,
    name: 'Akira Tanaka',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    country: 'Japan',
    level: 'Band 6.5',
    targetScore: 'Band 7.0',
    interests: ['Listening practice', 'Pronunciation'],
    online: true
  },
  {
    id: 3,
    name: 'Fatima Al-Farsi',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    country: 'Oman',
    level: 'Band 7.5',
    targetScore: 'Band 8.0',
    interests: ['Reading strategies', 'Academic vocabulary'],
    online: false
  },
  {
    id: 4,
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
const upcomingEvents = [
  {
    id: 1,
    title: 'Writing Task 2 Workshop',
    description: 'Learn effective strategies for argument development and coherence in Writing Task 2 essays',
    date: 'April 10, 2025',
    time: '10:00 AM GMT',
    host: 'Dr. Emily Chen',
    attendees: 45,
    type: 'Workshop'
  },
  {
    id: 2,
    title: 'Speaking Practice Group',
    description: 'Join our weekly speaking practice session with fellow test-takers and receive feedback from experts',
    date: 'April 12, 2025',
    time: '2:00 PM GMT',
    host: 'Michael Brown',
    attendees: 18,
    type: 'Practice Session'
  },
  {
    id: 3,
    title: 'Ask Me Anything: IELTS Examiner',
    description: 'Former IELTS examiner answers your questions about the test and scoring criteria',
    date: 'April 15, 2025',
    time: '5:00 PM GMT',
    host: 'Sarah Thompson',
    attendees: 87,
    type: 'Q&A Session'
  }
];

const Community = () => {
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
              <Button>
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
                      <Input placeholder="Search discussions..." className="pl-9" />
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
                  
                  <div className="space-y-6">
                    {discussionPosts.map((post) => (
                      <Card key={post.id}>
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
                          <CardTitle className="text-lg mt-3">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{post.content}</p>
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
                            <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {post.comments}
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
                </TabsContent>
                
                {/* Study Partners Tab */}
                <TabsContent value="studyPartners">
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Find study partners..." className="pl-9" />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button variant="outline" size="sm">Online Now</Button>
                      <Button variant="outline" size="sm">Same Level</Button>
                      <Button variant="outline" size="sm">Same Target</Button>
                      <Button variant="outline" size="sm">
                        <Globe className="h-4 w-4 mr-1" />
                        Filter by Region
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {studyPartners.map((partner) => (
                      <Card key={partner.id}>
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
                            <Button variant="outline" size="sm" className="flex-1">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                            <Button size="sm" className="flex-1">
                              <Mic className="h-4 w-4 mr-1" />
                              Practice
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Events Tab */}
                <TabsContent value="events">
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search events..." className="pl-9" />
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
                  
                  <div className="space-y-6">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id}>
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
                            <Button variant="outline" size="sm" className="flex-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              Add to Calendar
                            </Button>
                            <Button size="sm" className="flex-1">
                              Join Event
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
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
                      <div className="font-medium">8,745</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <span>Events This Month</span>
                      </div>
                      <div className="font-medium">42</div>
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
                        #{tag}
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
      <Footer />
    </div>
  );
};

export default Community;
