
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Shield } from 'lucide-react';
import UsersList from '@/components/admin/UsersList';
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
import { useUser } from '@/contexts/UserContext';

const AdminUsersTab = () => {
  const { toast } = useToast();
  const { signup } = useUser();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleAddUser = () => {
    setIsCreateDialogOpen(true);
    setError('');
    setNewAdmin({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAdmin(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    setError('');
    
    if (!newAdmin.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    
    if (!newAdmin.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    
    if (!newAdmin.email.trim()) {
      setError("Email is required");
      return false;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(newAdmin.email)) {
      setError("Invalid email format");
      return false;
    }
    
    if (!newAdmin.password) {
      setError("Password is required");
      return false;
    }
    
    if (newAdmin.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    
    if (newAdmin.password !== newAdmin.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    return true;
  };

  const handleCreateAdmin = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Create the admin user with preset admin flag
      const success = await signup({
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName,
        email: newAdmin.email,
        password: newAdmin.password,
        testType: 'academic', // Default value
        targetScore: '7', // Default value
        examDate: new Date().toISOString().split('T')[0], // Today's date
        isAdmin: true // This is the key - force this user to be admin
      });
      
      if (success) {
        toast({
          title: "Admin Created",
          description: `${newAdmin.firstName} ${newAdmin.lastName} has been created with admin privileges`,
        });
        setIsCreateDialogOpen(false);
      } else {
        setError("Failed to create admin account. Email may already be in use.");
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
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
      <UsersList />

      {/* Create Admin Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Create Admin Account
            </DialogTitle>
            <DialogDescription>
              Create a new administrator account with full system access.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  name="firstName" 
                  placeholder="John" 
                  value={newAdmin.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  name="lastName" 
                  placeholder="Doe" 
                  value={newAdmin.lastName}
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
                placeholder="admin@example.com" 
                value={newAdmin.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                value={newAdmin.password}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                name="confirmPassword" 
                type="password" 
                value={newAdmin.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            
            {error && (
              <div className="text-sm font-medium text-destructive">{error}</div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateAdmin} 
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              <Shield className="h-4 w-4 mr-1" />
              Create Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AdminUsersTab;
