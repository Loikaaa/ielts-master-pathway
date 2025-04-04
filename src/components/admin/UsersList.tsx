
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useUser, User } from '@/contexts/UserContext';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

const UsersList = () => {
  const { users } = useUser();
  const { toast } = useToast();

  const handleEditUser = (userId: string) => {
    toast({
      title: "Edit User",
      description: `Edit functionality for user ${userId} is coming soon.`
    });
  };

  const handleDeleteUser = (userId: string) => {
    toast({
      title: "Delete User",
      description: `Delete functionality for user ${userId} is coming soon.`,
      variant: "destructive"
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Registered Users</CardTitle>
        <CardDescription>
          View and manage all registered users in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of all registered users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Test Type</TableHead>
              <TableHead>Target Score</TableHead>
              <TableHead>Exam Date</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">No users registered yet</TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      user.testType === 'academic' 
                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' 
                        : user.testType === 'general' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-100'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                    }>
                      {user.testType === 'academic' ? 'Academic' : 
                       user.testType === 'general' ? 'General Training' : 
                       'Undecided'}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.targetScore}</TableCell>
                  <TableCell>{user.examDate}</TableCell>
                  <TableCell>
                    {user.created instanceof Date 
                      ? format(user.created, 'PPP') 
                      : format(new Date(user.created), 'PPP')}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditUser(user.id)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(user.id)}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UsersList;
