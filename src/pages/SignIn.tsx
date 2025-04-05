
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
import { Loader2, EyeIcon, EyeOffIcon } from 'lucide-react';

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userCountry, setUserCountry] = useState<string>('');
  const { login, users } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  
  // Track login attempts in localStorage
  useEffect(() => {
    const storedAttempts = localStorage.getItem('login_attempts');
    if (storedAttempts) {
      setLoginAttempts(parseInt(storedAttempts, 10));
    }
    
    // Clear login attempts after 12 hours
    const attemptTimestamp = localStorage.getItem('login_attempt_timestamp');
    if (attemptTimestamp) {
      const lastAttempt = new Date(parseInt(attemptTimestamp, 10));
      const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
      
      if (lastAttempt < twelveHoursAgo) {
        localStorage.removeItem('login_attempts');
        localStorage.removeItem('login_attempt_timestamp');
        setLoginAttempts(0);
      }
    }
  }, []);
  
  useEffect(() => {
    const fetchCountry = async () => {
      const country = await detectUserCountry();
      setUserCountry(country);
      
      // Log the country detection for analytics
      console.log('User country detected:', country);
    };
    
    fetchCountry();
  }, []);
  
  const updateLoginAttempts = () => {
    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);
    localStorage.setItem('login_attempts', newAttempts.toString());
    localStorage.setItem('login_attempt_timestamp', Date.now().toString());
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      console.log(`Attempting login for ${email}. Registered users:`, users.length);
      
      // Add small delay to simulate backend request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const success = await login(email, password);
      
      if (success) {
        // Reset login attempts on successful login
        localStorage.removeItem('login_attempts');
        localStorage.removeItem('login_attempt_timestamp');
        
        toast({
          title: "Sign in successful!",
          description: "Welcome back to your IELTS preparation journey.",
        });
        
        // Track successful login in analytics
        console.log(`User ${email} logged in successfully from ${userCountry}`);
        
        navigate('/dashboard');
      } else {
        updateLoginAttempts();
        
        // Show different messages based on number of attempts
        if (loginAttempts >= 5) {
          setError('Too many failed attempts. Please try again later or reset your password.');
        } else {
          setError('Invalid email or password. Please try again.');
        }
        
        toast({
          title: "Sign in failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      updateLoginAttempts();
      setError('An error occurred. Please try again later.');
      toast({
        title: "Sign in failed",
        description: "An error occurred during sign in. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex items-center justify-center w-full pt-16 pb-12 px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-1/2 h-1/2 bg-reading/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-[10%] -right-[10%] w-1/2 h-1/2 bg-speaking/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-[40%] -right-[10%] w-1/3 h-1/3 bg-writing/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-[40%] -left-[10%] w-1/3 h-1/3 bg-listening/20 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        
        {/* IELTS skill icons background */}
        <div className="absolute inset-0 opacity-5 flex flex-wrap justify-center items-center">
          {Array(20).fill(0).map((_, i) => (
            <div key={i} className={`w-24 h-24 m-8 flex items-center justify-center text-4xl opacity-20 
              ${i % 4 === 0 ? 'text-reading' : i % 4 === 1 ? 'text-writing' : i % 4 === 2 ? 'text-speaking' : 'text-listening'}`}>
              {i % 4 === 0 ? '📚' : i % 4 === 1 ? '✏️' : i % 4 === 2 ? '🗣️' : '👂'}
            </div>
          ))}
        </div>

        <Card className="w-full max-w-md shadow-xl relative z-10 border-primary/20 bg-white/90 backdrop-blur-lg">
          <CardHeader className="space-y-1 bg-gradient-to-br from-primary/10 to-accent/20 rounded-t-lg">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your IELTS preparation
              {userCountry && (
                <span className="block mt-1 text-sm">
                  Welcome from <span className="font-medium text-primary">{userCountry}</span>!
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
            {loginAttempts > 2 && (
              <div className="bg-amber-50 text-amber-800 p-3 rounded-md text-sm">
                <p className="font-medium">Multiple login attempts detected</p>
                <p className="text-xs mt-1">For security reasons, your account may be temporarily locked after too many failed attempts.</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading || loginAttempts >= 10}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading || loginAttempts >= 10}
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
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300"
                disabled={isLoading || loginAttempts >= 10}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : loginAttempts >= 10 ? (
                  "Account Locked - Try Later"
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
            
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-muted-foreground">Admin credentials</span>
              </div>
            </div>
            
            <div className="bg-muted/30 p-3 rounded-md text-sm">
              <p className="font-medium">Admin Email: <span className="text-primary">govindabohara726@gmail.com</span></p>
              <p className="font-medium">Admin Password: <span className="text-primary">Neplia726@</span></p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
