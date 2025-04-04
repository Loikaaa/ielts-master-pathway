
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  UserCheck, 
  Calendar, 
  ThumbsUp 
} from 'lucide-react';

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
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Community Management</h2>
      <Card>
        <CardHeader>
          <CardTitle>Community Overview</CardTitle>
          <CardDescription>Monitor and manage community discussions and activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-background rounded-lg border p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Discussions</h3>
                <p className="text-2xl font-bold">{communityPosts.length || 0}</p>
              </div>
              <div className="bg-background rounded-lg border p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Active Study Partners</h3>
                <p className="text-2xl font-bold">{studyPartners.filter(p => p.online).length || 0}</p>
              </div>
              <div className="bg-background rounded-lg border p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Upcoming Events</h3>
                <p className="text-2xl font-bold">{events.length || 0}</p>
              </div>
              <div className="bg-background rounded-lg border p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Reported Content</h3>
                <p className="text-2xl font-bold text-red-500">0</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Latest Community Discussions</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 font-medium">Title</th>
                      <th className="text-left p-3 font-medium">Author</th>
                      <th className="text-left p-3 font-medium">Posted</th>
                      <th className="text-left p-3 font-medium">Engagement</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {communityPosts.slice(0, 5).map(post => (
                      <tr key={post.id}>
                        <td className="p-3">{post.title}</td>
                        <td className="p-3">{post.author.name}</td>
                        <td className="p-3">{post.time}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="mr-3">{post.likes}</span>
                            <MessageCircle className="h-4 w-4 text-muted-foreground mr-1" />
                            <span>{post.comments.length}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Active Study Partners</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Country</th>
                      <th className="text-left p-3 font-medium">Current Level</th>
                      <th className="text-left p-3 font-medium">Target Score</th>
                      <th className="text-left p-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {studyPartners.slice(0, 5).map(partner => (
                      <tr key={partner.id}>
                        <td className="p-3">{partner.name}</td>
                        <td className="p-3">{partner.country}</td>
                        <td className="p-3">{partner.level}</td>
                        <td className="p-3">{partner.targetScore}</td>
                        <td className="p-3">
                          <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                            partner.online 
                              ? 'bg-green-500/10 text-green-500' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {partner.online ? 'Online' : 'Offline'}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 font-medium">Event Title</th>
                      <th className="text-left p-3 font-medium">Date</th>
                      <th className="text-left p-3 font-medium">Type</th>
                      <th className="text-left p-3 font-medium">Attendees</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {events.slice(0, 5).map(event => (
                      <tr key={event.id}>
                        <td className="p-3">{event.title}</td>
                        <td className="p-3">{event.date}</td>
                        <td className="p-3">{event.type}</td>
                        <td className="p-3">{event.attendees}</td>
                        <td className="p-3">
                          <Button variant="outline" size="sm">Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <Button className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              Manage Discussions
            </Button>
            <Button className="w-full">
              <UserCheck className="h-4 w-4 mr-2" />
              Study Partners
            </Button>
            <Button className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Events Calendar
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default AdminCommunityTab;
