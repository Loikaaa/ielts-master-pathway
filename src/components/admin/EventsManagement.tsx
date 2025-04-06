
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, Check, Eye, Search, Trash, UserCheck, UserX, X } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  host: string;
  participants: number;
  type: string;
}

interface EventRegistration {
  userId: string;
  eventId: string;
  registeredOn: string;
  status: 'confirmed' | 'pending' | 'canceled';
  userEmail?: string;
  userName?: string;
}

const EventsManagement = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<EventRegistration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  useEffect(() => {
    // Load events from localStorage
    try {
      const storedEvents = localStorage.getItem('neplia_community_events');
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
      
      const storedRegistrations = localStorage.getItem('neplia_event_registrations');
      if (storedRegistrations) {
        setRegistrations(JSON.parse(storedRegistrations));
        setFilteredRegistrations(JSON.parse(storedRegistrations));
      }
    } catch (error) {
      console.error('Error loading event data:', error);
      toast({
        title: "Error",
        description: "Failed to load event data",
        variant: "destructive",
      });
    }
  }, [toast]);
  
  // Filter registrations when search or status filter changes
  useEffect(() => {
    let filtered = [...registrations];
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(reg => reg.status === statusFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(reg => 
        (reg.userName && reg.userName.toLowerCase().includes(term)) ||
        (reg.userEmail && reg.userEmail.toLowerCase().includes(term)) ||
        getEventTitle(reg.eventId).toLowerCase().includes(term)
      );
    }
    
    setFilteredRegistrations(filtered);
  }, [registrations, searchTerm, statusFilter]);
  
  const getEventTitle = (eventId: string): string => {
    const event = events.find(e => e.id === eventId);
    return event ? event.title : 'Unknown Event';
  };
  
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'pending':
        return 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20';
      case 'canceled':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
    }
  };
  
  const handleUpdateStatus = (userId: string, eventId: string, newStatus: 'confirmed' | 'pending' | 'canceled') => {
    const updatedRegistrations = registrations.map(reg => {
      if (reg.userId === userId && reg.eventId === eventId) {
        return { ...reg, status: newStatus };
      }
      return reg;
    });
    
    setRegistrations(updatedRegistrations);
    
    try {
      localStorage.setItem('neplia_event_registrations', JSON.stringify(updatedRegistrations));
      
      toast({
        title: "Status Updated",
        description: `Registration ${newStatus === 'confirmed' ? 'confirmed' : newStatus === 'canceled' ? 'canceled' : 'marked as pending'} successfully.`,
      });
    } catch (error) {
      console.error('Error saving updated registrations:', error);
      toast({
        title: "Error",
        description: "Failed to update registration status",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteRegistration = (userId: string, eventId: string) => {
    const updatedRegistrations = registrations.filter(
      reg => !(reg.userId === userId && reg.eventId === eventId)
    );
    
    setRegistrations(updatedRegistrations);
    
    try {
      localStorage.setItem('neplia_event_registrations', JSON.stringify(updatedRegistrations));
      
      toast({
        title: "Registration Deleted",
        description: "The registration has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error saving updated registrations:', error);
      toast({
        title: "Error",
        description: "Failed to delete registration",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Event Registrations</CardTitle>
          <CardDescription>
            Manage participant registrations for upcoming community events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-10" 
                placeholder="Search by user or event name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {filteredRegistrations.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Event</TableHead>
                    <TableHead>Participant</TableHead>
                    <TableHead>Registered On</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.map((registration) => (
                    <TableRow key={`${registration.userId}-${registration.eventId}`}>
                      <TableCell className="font-medium">{getEventTitle(registration.eventId)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{registration.userName || 'N/A'}</span>
                          <span className="text-xs text-muted-foreground">{registration.userEmail}</span>
                        </div>
                      </TableCell>
                      <TableCell>{registration.registeredOn}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadgeColor(registration.status)}>
                          {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {registration.status !== 'confirmed' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 gap-1 text-green-600 border-green-200 hover:bg-green-50"
                              onClick={() => handleUpdateStatus(registration.userId, registration.eventId, 'confirmed')}
                            >
                              <UserCheck className="h-3.5 w-3.5" />
                              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Confirm</span>
                            </Button>
                          )}
                          {registration.status !== 'canceled' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 gap-1 text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleUpdateStatus(registration.userId, registration.eventId, 'canceled')}
                            >
                              <UserX className="h-3.5 w-3.5" />
                              <span className="sr-only sm:not-sr-only">Cancel</span>
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 gap-1 text-destructive hover:bg-red-50"
                            onClick={() => handleDeleteRegistration(registration.userId, registration.eventId)}
                          >
                            <Trash className="h-3.5 w-3.5" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 border rounded-md">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No registrations found</h3>
              <p className="text-muted-foreground mb-4">
                {registrations.length > 0 
                  ? 'No registrations match your current filters.'
                  : 'There are no event registrations in the system yet.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventsManagement;
