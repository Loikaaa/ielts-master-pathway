import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Book, LogIn, Mail, Lock, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';
import { getSettings } from '@/utils/settingsStorage';
import NavBar from '@/components/NavBar';

// Define form validation schema
const signinSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type SigninFormValues = z.infer<typeof signinSchema>;

const SignIn = () => {
  const { login, isAdmin } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [oauthProviders, setOauthProviders] = useState({
    google: false,
    facebook: false
  });

  // Extract the destination from location state (if present)
  const from = location.state?.from?.pathname || '/dashboard';
  
  console.log('SignIn: Attempted redirect from:', from);

  // Initialize form
  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Load OAuth provider configurations
  useEffect(() => {
    const settings = getSettings() || {};
    const integrations = settings.integrations || [];
    
    const googleIntegration = integrations.find((i: any) => 
      i.name.toLowerCase().includes('google') && 
      i.type === 'oauth' && 
      i.enabled
    );
    
    const facebookIntegration = integrations.find((i: any) => 
      i.name.toLowerCase().includes('facebook') && 
      i.type === 'oauth' && 
      i.enabled
    );
    
    setOauthProviders({
      google: !!googleIntegration,
      facebook: !!facebookIntegration
    });
  }, []);

  const onSubmit = async (values: SigninFormValues) => {
    console.log('SignIn: Attempting login with:', values.email);
    setIsSubmitting(true);
    try {
      // Call login function from UserContext
      const success = await login(values.email, values.password);

      if (success) {
        // Success! Show message
        toast({
          title: "Login successful!",
          description: "Welcome back to Neplia IELTS.",
        });
        
        console.log('SignIn: Login successful, isAdmin:', isAdmin);
        console.log('SignIn: Redirect destination:', from);
        
        // If the user is an admin and being redirected from an admin page, send them there
        // Otherwise, go to dashboard
        if (isAdmin && from.includes('/admin')) {
          console.log('SignIn: Redirecting to admin page:', from);
          navigate(from);
        } else if (isAdmin) {
          // If they're admin but not coming from admin page, ask if they want to go to admin
          toast({
            title: "Admin account detected",
            description: "You can access the admin dashboard from the navigation menu.",
          });
          console.log('SignIn: Redirecting admin to dashboard');
          navigate('/dashboard');
        } else {
          console.log('SignIn: Redirecting regular user to dashboard');
          navigate('/dashboard');
        }
      } else {
        console.log('SignIn: Login failed - invalid credentials');
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Get Google OAuth settings
    const settings = getSettings() || {};
    const integrations = settings.integrations || [];
    const googleIntegration = integrations.find((i: any) => 
      i.name.toLowerCase().includes('google') && 
      i.type === 'oauth' && 
      i.enabled
    );
    
    // If no Google integration is configured, show a message
    if (!googleIntegration) {
      toast({
        title: "Google Authentication Not Configured",
        description: "Please contact your administrator to set up Google authentication.",
        variant: "destructive"
      });
      return;
    }
    
    // Open a popup window for Google authentication with the configured client ID
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const clientId = googleIntegration.clientId || 'demo_client_id';
    const redirectUri = googleIntegration.redirectUri || 'https://neplia.com/auth/google';
    
    window.open(
      `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${encodeURIComponent(redirectUri)}&prompt=consent&response_type=code&client_id=${clientId}&scope=profile+email&access_type=offline`,
      'Google Sign In',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );
    
    toast({
      title: "Google Authentication",
      description: "A popup window has been opened for Google authentication. Please complete the sign-in process there.",
    });
  };

  const handleFacebookSignIn = () => {
    // Get Facebook OAuth settings
    const settings = getSettings() || {};
    const integrations = settings.integrations || [];
    const facebookIntegration = integrations.find((i: any) => 
      i.name.toLowerCase().includes('facebook') && 
      i.type === 'oauth' && 
      i.enabled
    );
    
    // If no Facebook integration is configured, show a message
    if (!facebookIntegration) {
      toast({
        title: "Facebook Authentication Not Configured",
        description: "Please contact your administrator to set up Facebook authentication.",
        variant: "destructive"
      });
      return;
    }
    
    // Open a popup window for Facebook authentication with the configured client ID
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const clientId = facebookIntegration.clientId || 'demo_client_id';
    const redirectUri = facebookIntegration.redirectUri || 'https://neplia.com/auth/facebook';
    
    window.open(
      `https://www.facebook.com/v18.0/dialog/oauth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=email,public_profile`,
      'Facebook Sign In',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );
    
    toast({
      title: "Facebook Authentication",
      description: "A popup window has been opened for Facebook authentication. Please complete the sign-in process there.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Add NavBar */}
      <NavBar />
      
      {/* Stylish background with animated gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950"></div>
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-gradient-to-t from-indigo-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-1/3 h-1/3 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-1/4 h-1/4 bg-gradient-to-l from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAwMDAwOSI+PC9yZWN0Pgo8L3N2Zz4=')] opacity-20"></div>
      </div>

      <div className="pt-16 w-full max-w-md">
        <Link to="/" className="flex items-center space-x-2 mb-8 animate-fade-in justify-center">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
            <Book className="h-10 w-10 text-primary relative z-10" />
          </div>
          <span className="font-bold text-2xl bg-gradient-to-r from-indigo-600 via-blue-500 to-emerald-400 text-transparent bg-clip-text">Neplia IELTS</span>
        </Link>
        
        <Card className="w-full animate-fade-in bg-card/70 dark:bg-card/40 backdrop-blur-sm shadow-xl border-muted/10">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <LogIn className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your IELTS preparation
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
                      <FormLabel className="flex items-center text-foreground">
                        <Mail className="mr-2 h-4 w-4 text-primary" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="your.email@example.com" 
                          className="bg-background/50" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="flex items-center text-foreground">
                          <Lock className="mr-2 h-4 w-4 text-primary" />
                          Password
                        </FormLabel>
                        <Link to="/forgot-password" className="text-sm text-primary font-medium hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input 
                          type="password" 
                          className="bg-background/50" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white shadow-md" 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In with Email
                    </>
                  )}
                </Button>
                
                {(oauthProviders.facebook || oauthProviders.google) && (
                  <>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {oauthProviders.facebook && (
                        <Button 
                          variant="outline" 
                          className="bg-[#4267B2]/10 hover:bg-[#4267B2]/20 border-[#4267B2]/20 text-[#4267B2]"
                          type="button"
                          onClick={handleFacebookSignIn}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4267B2" className="mr-2" viewBox="0 0 24 24">
                            <path d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                            <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                            <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                            <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                          </svg>
                          Facebook
                        </Button>
                      )}
                      {oauthProviders.google && (
                        <Button 
                          variant="outline" 
                          className="bg-white hover:bg-gray-100 border-gray-300 text-gray-700"
                          type="button"
                          onClick={handleGoogleSignIn}
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16" className="mr-2" xmlns="http://www.w3.org/2000/svg">
                            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                            </g>
                          </svg>
                          Google
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex flex-col px-8 pb-8">
                <div className="text-center text-sm mt-4">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-primary font-medium hover:underline">
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>
        
        <div className="mt-8 text-center text-sm text-muted-foreground animate-fade-in">
          <p>© {new Date().getFullYear()} Neplia IELTS. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
