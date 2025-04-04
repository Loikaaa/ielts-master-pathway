
import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users, Wifi, AlertTriangle } from 'lucide-react';
import UsersList from '@/components/admin/UsersList';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AdminUsersTab = () => {
  const { toast } = useToast();
  const { users } = useUser();

  // Calculate IP statistics
  const ipStats = useMemo(() => {
    const uniqueIPs = new Set(users.map(user => user.ipAddress).filter(Boolean));
    const usersWithoutIP = users.filter(user => !user.ipAddress).length;
    
    // Find duplicate IPs (same IP used by multiple users)
    const ipCounts: Record<string, number> = {};
    users.forEach(user => {
      if (user.ipAddress) {
        ipCounts[user.ipAddress] = (ipCounts[user.ipAddress] || 0) + 1;
      }
    });
    
    const duplicateIPs = Object.entries(ipCounts)
      .filter(([_, count]) => count > 1)
      .map(([ip, count]) => ({ ip, count }));
    
    return {
      uniqueIPCount: uniqueIPs.size,
      usersWithoutIP,
      duplicateIPs
    };
  }, [users]);

  const handleAddUser = () => {
    toast({
      title: "Add User",
      description: "This functionality will be implemented soon."
    });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <Button onClick={handleAddUser}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>
      
      {/* IP Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardContent className="pt-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Wifi className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unique IP Addresses</p>
                <p className="text-2xl font-bold">{ipStats.uniqueIPCount}</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-blue-100 text-blue-800">Tracked</Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Users Missing IP</p>
                <p className="text-2xl font-bold">{ipStats.usersWithoutIP}</p>
              </div>
            </div>
            {ipStats.usersWithoutIP > 0 ? (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Attention</Badge>
            ) : (
              <Badge variant="outline" className="bg-green-100 text-green-800">All Tracked</Badge>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <AlertTriangle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Shared IP Addresses</p>
                <p className="text-2xl font-bold">{ipStats.duplicateIPs.length}</p>
              </div>
            </div>
            {ipStats.duplicateIPs.length > 0 ? (
              <Badge variant="outline" className="bg-orange-100 text-orange-800">Review</Badge>
            ) : (
              <Badge variant="outline" className="bg-green-100 text-green-800">None</Badge>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Show duplicate IP warning if any exist */}
      {ipStats.duplicateIPs.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
          <div className="flex items-center gap-2 text-yellow-800 font-medium mb-1">
            <AlertTriangle className="h-4 w-4" />
            Multiple users sharing the same IP address
          </div>
          <p className="text-sm text-yellow-700 mb-2">
            The following IP addresses are being used by multiple users:
          </p>
          <div className="flex flex-wrap gap-2">
            {ipStats.duplicateIPs.map(({ ip, count }) => (
              <Badge key={ip} variant="outline" className="bg-yellow-100 text-yellow-800">
                <Wifi className="h-3 w-3 mr-1" /> {ip} ({count} users)
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <UsersList />
    </section>
  );
};

export default AdminUsersTab;
