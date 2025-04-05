
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  UserCheck, 
  Calendar, 
  ThumbsUp,
  Users,
  TrendingUp,
  Award,
  Globe,
  BookOpen 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface IPost {
  id: string;
  author: {
    id: string;
    name: string;
    country: string;
    level: string;
  };
  title: string;
  content: string;
  time: string;
  likes: number;
  comments: Array<any>;
}

interface IStudyPartner {
  id: string;
  name: string;
  country: string;
  level: string;
  targetScore: string;
  online: boolean;
}

interface IEvent {
  id: string;
  title: string;
  date: string;
  type: string;
  attendees: number;
}

const AdminCommunityTab = () => {
  const [communityPosts, setCommunityPosts] = useState<IPost[]>([]);
  const [studyPartners, setStudyPartners] = useState<IStudyPartner[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [activeTab, setActiveTab] = useState('discussions');
  
  useEffect(() => {
    try {
      const storedPosts = localStorage.getItem('neplia_community_posts');
      const storedPartners = localStorage.getItem('neplia_study_partners');
      const storedEvents = localStorage.getItem('neplia_community_events');
      
      if (storedPosts) {
        setCommunityPosts(JSON.parse(storedPosts));
      }
      
      if (storedPartners) {
        setStudyPartners(JSON.parse(storedPartners));
      }
      
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
    } catch (error) {
      console.error('Error loading community data:', error);
    }
  }, []);

  return (
    <section className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Community Management
        </h2>
        <p className="text-muted-foreground mt-2">
          Monitor and manage community activities, discussions, and user engagement
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div 
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-5 shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="h-8 w-8 text-blue-100" />
            <h3 className="font-medium text-xl">Discussions</h3>
          </div>
          <div className="text-3xl font-bold mb-1">{communityPosts.length || 0}</div>
          <p className="text-blue-100 text-sm">Active threads</p>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-5 shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <UserCheck className="h-8 w-8 text-purple-100" />
            <h3 className="font-medium text-xl">Study Partners</h3>
          </div>
          <div className="text-3xl font-bold mb-1">{studyPartners.filter(p => p.online).length || 0}</div>
          <p className="text-purple-100 text-sm">Active users</p>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl p-5 shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-8 w-8 text-amber-100" />
            <h3 className="font-medium text-xl">Events</h3>
          </div>
          <div className="text-3xl font-bold mb-1">{events.length || 0}</div>
          <p className="text-amber-100 text-sm">Upcoming events</p>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl p-5 shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Award className="h-8 w-8 text-emerald-100" />
            <h3 className="font-medium text-xl">Achievements</h3>
          </div>
          <div className="text-3xl font-bold mb-1">156</div>
          <p className="text-emerald-100 text-sm">Badges awarded</p>
        </motion.div>
      </div>
      
      <div className="flex overflow-x-auto pb-2 gap-2">
        <Button 
          variant={activeTab === 'discussions' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('discussions')}
          className={`rounded-full ${activeTab === 'discussions' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Discussions
        </Button>
        <Button 
          variant={activeTab === 'partners' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('partners')}
          className={`rounded-full ${activeTab === 'partners' ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
        >
          <UserCheck className="mr-2 h-4 w-4" />
          Study Partners
        </Button>
        <Button 
          variant={activeTab === 'events' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('events')}
          className={`rounded-full ${activeTab === 'events' ? 'bg-amber-600 hover:bg-amber-700' : ''}`}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Events
        </Button>
        <Button 
          variant={activeTab === 'analytics' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('analytics')}
          className={`rounded-full ${activeTab === 'analytics' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          Analytics
        </Button>
        <Button 
          variant={activeTab === 'users' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('users')}
          className={`rounded-full ${activeTab === 'users' ? 'bg-rose-600 hover:bg-rose-700' : ''}`}
        >
          <Users className="mr-2 h-4 w-4" />
          Users
        </Button>
      </div>
      
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50">
        <CardHeader className={`pb-2 border-b ${
          activeTab === 'discussions' ? 'bg-indigo-50' : 
          activeTab === 'partners' ? 'bg-purple-50' : 
          activeTab === 'events' ? 'bg-amber-50' : 
          activeTab === 'analytics' ? 'bg-emerald-50' : 
          'bg-rose-50'
        }`}>
          <CardTitle className={`text-xl ${
            activeTab === 'discussions' ? 'text-indigo-700' : 
            activeTab === 'partners' ? 'text-purple-700' : 
            activeTab === 'events' ? 'text-amber-700' : 
            activeTab === 'analytics' ? 'text-emerald-700' : 
            'text-rose-700'
          }`}>
            {activeTab === 'discussions' && 'Community Discussions'}
            {activeTab === 'partners' && 'Active Study Partners'}
            {activeTab === 'events' && 'Upcoming Events'}
            {activeTab === 'analytics' && 'Community Analytics'}
            {activeTab === 'users' && 'Community Members'}
          </CardTitle>
          <CardDescription>
            {activeTab === 'discussions' && 'Manage and moderate discussion threads and posts'}
            {activeTab === 'partners' && 'View and manage study partner connections'}
            {activeTab === 'events' && 'Upcoming virtual study sessions and workshops'}
            {activeTab === 'analytics' && 'Community engagement and growth metrics'}
            {activeTab === 'users' && 'Manage community members and permissions'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          {activeTab === 'discussions' && (
            <div className="space-y-6">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className={`bg-indigo-50 text-indigo-700`}>
                    <tr>
                      <th className="text-left p-3 font-medium">Title</th>
                      <th className="text-left p-3 font-medium">Author</th>
                      <th className="text-left p-3 font-medium">Posted</th>
                      <th className="text-left p-3 font-medium">Engagement</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {communityPosts.length > 0 ? (
                      communityPosts.map(post => (
                        <tr key={post.id} className="hover:bg-muted/20">
                          <td className="p-3 font-medium">{post.title}</td>
                          <td className="p-3">{post.author.name}</td>
                          <td className="p-3">{post.time}</td>
                          <td className="p-3">
                            <div className="flex items-center">
                              <ThumbsUp className="h-4 w-4 text-indigo-400 mr-1" />
                              <span className="mr-3 text-indigo-600">{post.likes}</span>
                              <MessageCircle className="h-4 w-4 text-indigo-400 mr-1" />
                              <span className="text-indigo-600">{post.comments.length}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700">View</Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                          <MessageCircle className="h-10 w-10 mx-auto mb-2 text-indigo-200" />
                          <p>No discussion posts yet</p>
                          <Button variant="outline" size="sm" className="mt-4 border-indigo-200 text-indigo-600 hover:bg-indigo-50">Create First Discussion</Button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'partners' && (
            <div className="space-y-6">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className={`bg-purple-50 text-purple-700`}>
                    <tr>
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Country</th>
                      <th className="text-left p-3 font-medium">Current Level</th>
                      <th className="text-left p-3 font-medium">Target Score</th>
                      <th className="text-left p-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {studyPartners.length > 0 ? (
                      studyPartners.map(partner => (
                        <tr key={partner.id} className="hover:bg-muted/20">
                          <td className="p-3 font-medium">{partner.name}</td>
                          <td className="p-3">{partner.country}</td>
                          <td className="p-3">{partner.level}</td>
                          <td className="p-3">{partner.targetScore}</td>
                          <td className="p-3">
                            <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                              partner.online 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-500'
                            }`}>
                              {partner.online ? 'Online' : 'Offline'}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                          <UserCheck className="h-10 w-10 mx-auto mb-2 text-purple-200" />
                          <p>No study partners available</p>
                          <Button variant="outline" size="sm" className="mt-4 border-purple-200 text-purple-600 hover:bg-purple-50">Add Study Partner</Button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className={`bg-amber-50 text-amber-700`}>
                    <tr>
                      <th className="text-left p-3 font-medium">Event Title</th>
                      <th className="text-left p-3 font-medium">Date</th>
                      <th className="text-left p-3 font-medium">Type</th>
                      <th className="text-left p-3 font-medium">Attendees</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {events.length > 0 ? (
                      events.map(event => (
                        <tr key={event.id} className="hover:bg-muted/20">
                          <td className="p-3 font-medium">{event.title}</td>
                          <td className="p-3">{event.date}</td>
                          <td className="p-3">{event.type}</td>
                          <td className="p-3">{event.attendees}</td>
                          <td className="p-3">
                            <Button variant="outline" size="sm" className="border-amber-200 text-amber-600 hover:bg-amber-50 hover:text-amber-700">Details</Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                          <Calendar className="h-10 w-10 mx-auto mb-2 text-amber-200" />
                          <p>No upcoming events</p>
                          <Button variant="outline" size="sm" className="mt-4 border-amber-200 text-amber-600 hover:bg-amber-50">Schedule Event</Button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'analytics' && (
            <div className="p-8 text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-4 text-emerald-200" />
              <h3 className="text-xl font-medium text-emerald-700 mb-2">Analytics Dashboard Coming Soon</h3>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Our comprehensive analytics dashboard is currently under development. 
                You'll soon be able to track community engagement, content popularity, and user growth.
              </p>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div className="p-8 text-center">
              <Users className="h-16 w-16 mx-auto mb-4 text-rose-200" />
              <h3 className="text-xl font-medium text-rose-700 mb-2">User Management Coming Soon</h3>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Our user management system is currently being expanded.
                Soon you'll be able to view detailed profiles, manage permissions, and handle user reports.
              </p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="border-t p-4 flex flex-wrap gap-4">
          <Button className={`bg-indigo-600 hover:bg-indigo-700 text-white flex-grow md:flex-grow-0`}>
            <MessageCircle className="h-4 w-4 mr-2" />
            Manage Discussions
          </Button>
          <Button className={`bg-purple-600 hover:bg-purple-700 text-white flex-grow md:flex-grow-0`}>
            <UserCheck className="h-4 w-4 mr-2" />
            Study Partners
          </Button>
          <Button className={`bg-amber-600 hover:bg-amber-700 text-white flex-grow md:flex-grow-0`}>
            <Calendar className="h-4 w-4 mr-2" />
            Events Calendar
          </Button>
          <Button className={`bg-emerald-600 hover:bg-emerald-700 text-white flex-grow md:flex-grow-0`}>
            <Globe className="h-4 w-4 mr-2" />
            Global Community
          </Button>
          <Button className={`bg-rose-600 hover:bg-rose-700 text-white flex-grow md:flex-grow-0`}>
            <BookOpen className="h-4 w-4 mr-2" />
            Resources
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default AdminCommunityTab;
