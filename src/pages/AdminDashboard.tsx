import React from 'react';
import { useQuestions } from '@/contexts/QuestionsContext';
import { useUser } from '@/contexts/UserContext';
import { Navigate } from 'react-router-dom';
import UsersList from '@/components/admin/UsersList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { isAdmin } = useUser();
  
  // Redirect non-admin users
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* User Management Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <UsersList />
      </section>
      
      {/* Mock IELTS Questions Management Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Mock IELTS Questions Management</h2>
        <Card>
          <CardHeader>
            <CardTitle>Manage Questions</CardTitle>
            <CardDescription>Add, edit, or delete mock IELTS questions.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Functionality to manage mock IELTS questions will be implemented here.</p>
            <Button asChild>
              <Link to="/admin-blog-manager">Go to Blog Manager</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AdminDashboard;
