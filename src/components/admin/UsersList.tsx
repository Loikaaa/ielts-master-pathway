
import React, { useState } from 'react';
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
import { Edit, Trash2, ShieldCheck, Shield } from 'lucide-react';
import { useUser, User } from '@/contexts/UserContext';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const UsersList = () => {
  const { users, setUserAsAdmin } = useUser();
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    isAdmin: false
  });

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditedUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin || false
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    toast({
      title: "Delete User",
      description: `Delete functionality for user ${userId} is coming soon.`,
      variant: "destructive"
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setEditedUser(prev => ({
      ...prev,
      isAdmin: checked
    }));
  };

  const handleSaveUser = () => {
    if (!selectedUser) return;
    
    if (editedUser.isAdmin && !selectedUser.isAdmin) {
      setUserAsAdmin(selectedUser.id);
      toast({
        title: "Admin Rights Granted",
        description: `${editedUser.firstName} ${editedUser.lastName} has been made an administrator.`
      });
    }
    
    setIsEditDialogOpen(false);
    toast({
      title: "User Updated",
      description: `User ${editedUser.firstName} ${editedUser.lastName} has been updated.`
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
              <TableHead>Role</TableHead>
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
                <TableCell colSpan={8} className="text-center">No users registered yet</TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        Admin
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                        User
                      </Badge>
                    )}
                  </TableCell>
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
                      <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
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

        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update user information and permissions
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName" 
                    value={editedUser.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    name="lastName" 
                    value={editedUser.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={editedUser.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isAdmin" 
                  checked={editedUser.isAdmin}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="isAdmin" className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Administrator Access
                </Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveUser}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default UsersList;
