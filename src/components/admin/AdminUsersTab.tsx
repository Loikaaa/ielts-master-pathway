
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users } from 'lucide-react';
import UsersList from '@/components/admin/UsersList';
import { useToast } from '@/components/ui/use-toast';

const AdminUsersTab = () => {
  const { toast } = useToast();

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
      <UsersList />
    </section>
  );
};

export default AdminUsersTab;
