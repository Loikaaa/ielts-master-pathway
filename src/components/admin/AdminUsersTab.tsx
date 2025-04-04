
import React from 'react';
import UsersList from '@/components/admin/UsersList';

const AdminUsersTab = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">User Management</h2>
      <UsersList />
    </section>
  );
};

export default AdminUsersTab;
