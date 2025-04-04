
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
import { useUser, User } from '@/contexts/UserContext';
import { format } from 'date-fns';

const UsersList = () => {
  const { users } = useUser();

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">No users registered yet</TableCell>
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
