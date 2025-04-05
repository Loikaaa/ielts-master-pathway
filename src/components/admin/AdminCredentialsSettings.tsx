
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Save, Loader2, Mail, Lock, EyeIcon, EyeOffIcon } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';

// Form validation schema
const credentialsSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type CredentialsFormValues = z.infer<typeof credentialsSchema>;

const AdminCredentialsSettings = () => {
  const { toast } = useToast();
  const { updateAdminCredentials, currentUser, users } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [adminUserCount, setAdminUserCount] = useState(0);

  const form = useForm<CredentialsFormValues>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      email: currentUser?.email === 'govindabohara726@gmail.com' ? currentUser.email : 'govindabohara726@gmail.com',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    // Count admin users for display
    const adminCount = users.filter(user => user.isAdmin === true).length;
    setAdminUserCount(adminCount);
  }, [users]);

  const onSubmit = async (values: CredentialsFormValues) => {
    setIsSubmitting(true);
    try {
      // Log admin credential update attempt
      console.log(`Attempting to update admin credentials for ${values.email}`);
      
      // Update admin credentials
      const success = updateAdminCredentials(values.email, values.password);

      if (success) {
        toast({
          title: "Admin credentials updated",
          description: "The admin login details have been successfully updated.",
        });
        form.reset({
          email: values.email,
          password: '',
          confirmPassword: '',
        });
        
        // Log successful credential update (this would normally go to a backend)
        console.log(`Admin credentials updated successfully: ${values.email}`);
      } else {
        toast({
          title: "Update failed",
          description: "Failed to update admin credentials.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating admin credentials:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-amber-500" />
          <CardTitle>Admin Credentials</CardTitle>
        </div>
        <CardDescription>
          Update the administrator login credentials. This will change the login details for the main admin account.
          <div className="mt-2 text-xs p-2 bg-muted/50 rounded-md">
            <p className="font-medium">System Status</p>
            <p>Total admin users: {adminUserCount}</p>
            <p>Last updated: {new Date().toLocaleString()}</p>
          </div>
        </CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    Admin Email
                  </FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    This email will be used for the administrator login
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Lock className="mr-2 h-4 w-4 text-muted-foreground" />
                    New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        {...field}
                        className="pr-10" 
                      />
                      <button 
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={toggleShowPassword}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Password must be at least 6 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Lock className="mr-2 h-4 w-4 text-muted-foreground" />
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showConfirmPassword ? "text" : "password"} 
                        {...field}
                        className="pr-10" 
                      />
                      <button 
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={toggleShowConfirmPassword}
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update Admin Credentials
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AdminCredentialsSettings;
