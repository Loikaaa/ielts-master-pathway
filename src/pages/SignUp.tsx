
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { detectUserCountry } from '@/utils/countryDetection';
import { useUser } from '@/contexts/UserContext';
import { Loader2 } from 'lucide-react';
import OAuthButtons from '@/components/OAuthButtons';

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userCountry, setUserCountry] = useState<string>('');
  const { signup, signupWithOAuth } = useUser();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchCountry = async () => {
      const country = await detectUserCountry();
      setUserCountry(country);
    };
    
    fetchCountry();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        testType: 'General',
        targetScore: '7.0',
        examDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        country: userCountry,
      };
      
      const success = await signup(userData);
      
      if (success) {
        toast({
          title: "Account created!",
          description: "Welcome to your IELTS preparation journey.",
        });
        navigate('/onboarding');
      } else {
        setError('Failed to create account. Email might already be registered.');
        toast({
          title: "Sign up failed",
          description: "Failed to create account. Please try again with a different email.",
          variant: "destructive"
        });
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      toast({
        title: "Sign up failed",
        description: "An error occurred during sign up. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignup = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    setError('');
    
    try {
      console.log(`Attempting ${provider} signup`);
      
      // Default country info
      const countryInfo = userCountry || 'Unknown';
      
      // Simulate OAuth signup
      const success = await signupWithOAuth(provider, countryInfo);
      
      if (success) {
        toast({
          title: "Account created!",
          description: `Welcome to your IELTS preparation journey. Your account was created with ${provider}.`,
        });
        navigate('/onboarding');
      } else {
        setError(`Failed to create account with ${provider}. You may already have an account.`);
        toast({
          title: "Sign up failed",
          description: `Failed to create account with ${provider}. Please try again or use email signup.`,
          variant: "destructive"
        });
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      toast({
        title: "Sign up failed",
        description: "An error occurred during sign up. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex items-center justify-center w-full pt-16 pb-12 px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] -left-[10%] w-1/2 h-1/2 bg-speaking/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-[10%] -right-[10%] w-1/2 h-1/2 bg-reading/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -top-[10%] -right-[10%] w-1/3 h-1/3 bg-listening/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-[30%] -left-[10%] w-1/3 h-1/3 bg-writing/20 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        
        {/* IELTS skill icons background */}
        <div className="absolute inset-0 opacity-5 flex flex-wrap justify-center items-center">
          {Array(20).fill(0).map((_, i) => (
            <div key={i} className={`w-24 h-24 m-8 flex items-center justify-center text-4xl opacity-20 
              ${i % 4 === 0 ? 'text-writing' : i % 4 === 1 ? 'text-reading' : i % 4 === 2 ? 'text-listening' : 'text-speaking'}`}>
              {i % 4 === 0 ? '✏️' : i % 4 === 1 ? '📚' : i % 4 === 2 ? '👂' : '🗣️'}
            </div>
          ))}
        </div>

        <Card className="w-full max-w-md shadow-xl relative z-10 border-primary/20 bg-white/90 backdrop-blur-lg">
          <CardHeader className="space-y-1 bg-gradient-to-br from-primary/10 to-accent/20 rounded-t-lg">
            <CardTitle className="text-2xl text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Start your IELTS journey today
              {userCountry && (
                <span className="block mt-1 text-sm">
                  Joining from <span className="font-medium text-primary">{userCountry}</span>!
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <OAuthButtons
              onOAuthLogin={handleOAuthSignup}
              isLoading={isLoading}
              className="mb-4"
            />
            
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-muted-foreground">or sign up with email</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="John" 
                    required 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe" 
                    required 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
