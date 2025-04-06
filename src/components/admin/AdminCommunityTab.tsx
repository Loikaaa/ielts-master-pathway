
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Users, Calendar } from 'lucide-react';
import EventsManagement from './EventsManagement';

const AdminCommunityTab = () => {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Community Management</h2>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="mb-4">
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="discussions" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Discussions
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Study Groups
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="events">
          <EventsManagement />
        </TabsContent>
        
        <TabsContent value="discussions">
          <div className="p-6 text-center border rounded-md">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Discussions Management</h3>
            <p className="text-muted-foreground">
              This feature will be available in the next update.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="groups">
          <div className="p-6 text-center border rounded-md">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Study Groups Management</h3>
            <p className="text-muted-foreground">
              This feature will be available in the next update.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCommunityTab;
