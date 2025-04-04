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
import { Edit, Trash2, ShieldCheck, Shield, Mail, Calendar, Target, Wifi, Clock } from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const UsersList = () => {
  const { users, setUserAsAdmin } = useUser();
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    isAdmin: false,
    testType: '',
    targetScore: '',
    examDate: ''
  });
  const [activeTab, setActiveTab] = useState("profile");

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditedUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin || false,
      testType: user.testType || '',
      targetScore: user.targetScore || '',
      examDate: user.examDate || ''
    });
    setIsEditDialogOpen(true);
    setActiveTab("profile");
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

  const handleSelectChange = (name: string, value: string) => {
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveUser = () => {
    if (!selectedUser) return;
    
    // Handle admin status change
    if (editedUser.isAdmin && !selectedUser.isAdmin) {
      setUserAsAdmin(selectedUser.id);
      toast({
        title: "Admin Rights Granted",
        description: `${editedUser.firstName} ${editedUser.lastName} has been made an administrator.`
      });
    } else if (!editedUser.isAdmin && selectedUser.isAdmin) {
      toast({
        title: "Admin Rights Removed",
        description: `${editedUser.firstName} ${editedUser.lastName} is no longer an administrator.`
      });
      // In a real app, we would have a removeAdmin function
    }
    
    setIsEditDialogOpen(false);
    toast({
      title: "User Updated",
      description: `User ${editedUser.firstName} ${editedUser.lastName} has been updated.`
    });
  };

  const getTestTypeBadgeStyle = (testType: string | undefined) => {
    switch(testType) {
      case 'academic':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'general':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const sendVerificationEmail = (email: string) => {
    toast({
      title: "Verification Email Sent",
      description: `A verification email has been sent to ${email}.`
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
              <TableHead>IP Address</TableHead>
              <TableHead>Last Login</TableHead>
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
                <TableCell colSpan={10} className="text-center">No users registered yet</TableCell>
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
                    <div className="flex items-center">
                      <Wifi className="h-3 w-3 mr-1 text-primary" />
                      {user.ipAddress || 'Unknown'}
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.lastLogin ? (
                      <div className="flex items-center text-xs">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        {format(new Date(user.lastLogin), 'PPp')}
                      </div>
                    ) : 'Never'}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getTestTypeBadgeStyle(user.testType)}>
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

        {/* Enhanced Edit User Dialog with Tabs */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update user information and permissions
              </DialogDescription>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="access">Access & Permissions</TabsTrigger>
                <TabsTrigger value="security">Security Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-4">
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
                  <div className="flex gap-2">
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={editedUser.email}
                      onChange={handleInputChange}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sendVerificationEmail(editedUser.email)}
                      title="Resend verification email"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="testType">Test Type</Label>
                    <Select 
                      value={editedUser.testType} 
                      onValueChange={(value) => handleSelectChange('testType', value)}
                    >
                      <SelectTrigger id="testType">
                        <SelectValue placeholder="Select test type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="general">General Training</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetScore">Target Score</Label>
                    <Select 
                      value={editedUser.targetScore} 
                      onValueChange={(value) => handleSelectChange('targetScore', value)}
                    >
                      <SelectTrigger id="targetScore">
                        <SelectValue placeholder="Select target score" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">Band 6</SelectItem>
                        <SelectItem value="6.5">Band 6.5</SelectItem>
                        <SelectItem value="7">Band 7</SelectItem>
                        <SelectItem value="7.5">Band 7.5</SelectItem>
                        <SelectItem value="8+">Band 8+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="examDate">Exam Date</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="examDate" 
                      name="examDate" 
                      type="date" 
                      value={editedUser.examDate}
                      onChange={handleInputChange}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      title="View calendar"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="access" className="space-y-4">
                <div className="border rounded-md p-4 bg-muted/10">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="isAdmin" 
                      checked={editedUser.isAdmin}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <div className="flex flex-col">
                      <Label htmlFor="isAdmin" className="flex items-center gap-2 font-medium">
                        <Shield className="h-4 w-4 text-amber-500" />
                        Administrator Access
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Grants full access to all admin features and user management
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="block mb-1">Additional Permissions</Label>
                  <div className="border rounded-md divide-y">
                    <div className="p-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Content Management</p>
                        <p className="text-xs text-muted-foreground">Create and edit content</p>
                      </div>
                      <Checkbox disabled checked={editedUser.isAdmin} />
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">User Management</p>
                        <p className="text-xs text-muted-foreground">Manage other users</p>
                      </div>
                      <Checkbox disabled checked={editedUser.isAdmin} />
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">System Settings</p>
                        <p className="text-xs text-muted-foreground">Configure system settings</p>
                      </div>
                      <Checkbox disabled checked={editedUser.isAdmin} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Note: Individual permissions can only be set for non-admin users
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">IP Address</Label>
                  <div className="flex items-center p-3 rounded-md bg-muted/50">
                    <Wifi className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-mono">{selectedUser?.ipAddress || 'Unknown'}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last detected IP address for this user
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Last Login</Label>
                  <div className="flex items-center p-3 rounded-md bg-muted/50">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>
                      {selectedUser?.lastLogin 
                        ? format(new Date(selectedUser.lastLogin), 'PPp') 
                        : 'Never logged in'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Account Created</Label>
                  <div className="flex items-center p-3 rounded-md bg-muted/50">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    <span>
                      {selectedUser?.created 
                        ? format(new Date(selectedUser.created), 'PPp') 
                        : 'Unknown'}
                    </span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
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
