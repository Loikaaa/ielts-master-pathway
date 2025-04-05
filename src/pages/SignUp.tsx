
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { Book, UserPlus, Calendar, Book as BookIcon, Pencil, Headphones, Mic, GraduationCap, Loader2, Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';
import NavBar from '@/components/NavBar';

// Define form validation schema
const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  testType: z.string().min(1, 'Please select a test type'),
  targetScore: z.string().min(1, 'Please select a target score'),
  examDate: z.string().min(1, 'Please select an exam date'),
  country: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

// List of countries for the dropdown
interface Country {
  code: string;
  name: string;
}

const SignUp = () => {
  const { signup } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [userCountry, setUserCountry] = useState<string>('');
  const [isLoadingCountry, setIsLoadingCountry] = useState(true);

  // Initialize form
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      testType: '',
      targetScore: '',
      examDate: '',
      country: '',
    },
  });

  // Load countries and detect user country
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // Fetch list of countries
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        
        // Map and sort countries
        const formattedCountries = data
          .map((country: any) => ({
            code: country.cca2,
            name: country.name.common
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        
        setCountries(formattedCountries);
        
        // Try to detect user's country
        try {
          const ipResponse = await fetch('https://ipapi.co/json/');
          const ipData = await ipResponse.json();
          
          if (ipData && ipData.country_code) {
            setUserCountry(ipData.country_code);
            form.setValue('country', ipData.country_code);
          }
        } catch (error) {
          console.error('Error detecting country:', error);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
        // Fallback to a smaller list of common countries
        setCountries([
          { code: 'US', name: 'United States' },
          { code: 'GB', name: 'United Kingdom' },
          { code: 'CA', name: 'Canada' },
          { code: 'AU', name: 'Australia' },
          { code: 'IN', name: 'India' },
          { code: 'NP', name: 'Nepal' },
          { code: 'PK', name: 'Pakistan' },
          { code: 'CN', name: 'China' }
        ]);
      } finally {
        setIsLoadingCountry(false);
      }
    };
    
    fetchCountries();
  }, [form]);

  const onSubmit = async (values: SignupFormValues) => {
    setIsSubmitting(true);
    try {
      // Find country name from code
      const selectedCountry = countries.find(c => c.code === values.country);
      
      // Call signup function from UserContext
      const success = await signup({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        testType: values.testType,
        targetScore: values.targetScore,
        examDate: values.examDate,
        country: selectedCountry?.name || '',
        countryCode: values.country || '',
      });

      if (success) {
        toast({
          title: "Account created successfully!",
          description: "Welcome to Neplia IELTS. You are now logged in.",
        });
        // Redirect to dashboard or onboarding
        navigate('/dashboard');
      } else {
        toast({
          title: "Signup failed",
          description: "An account with this email may already exist.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Fixed NavBar */}
      <div className="sticky top-0 left-0 right-0 z-50">
        <NavBar />
      </div>
      
      {/* Main content */}
      <div className="py-10 px-4 relative">
        {/* Stylish IELTS-themed background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Main gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 dark:from-blue-950 dark:via-sky-950 dark:to-indigo-950"></div>
          
          {/* Abstract decorative elements */}
          <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-blue-400/5 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-indigo-400/5 to-transparent"></div>
          
          {/* Circular elements representing IELTS materials */}
          <div className="absolute top-40 left-10 md:left-[10%] w-40 h-40 bg-reading/5 rounded-full blur-3xl"></div>
          <div className="absolute top-60 right-10 md:right-[20%] w-60 h-60 bg-writing/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-20 md:left-[15%] w-80 h-80 bg-speaking/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 md:right-[10%] w-40 h-40 bg-listening/5 rounded-full blur-3xl"></div>
          
          {/* IELTS word pattern */}
          <div className="absolute inset-0 opacity-[0.02] overflow-hidden select-none pointer-events-none">
            <div className="absolute -rotate-12 top-1/4 left-0 right-0 text-9xl font-black text-foreground whitespace-nowrap" style={{
              backgroundImage: 'linear-gradient(90deg, transparent 0%, currentColor 25%, currentColor 75%, transparent 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}>
              READING WRITING LISTENING SPEAKING
            </div>
            <div className="absolute rotate-12 bottom-1/4 left-0 right-0 text-9xl font-black text-foreground whitespace-nowrap" style={{
              backgroundImage: 'linear-gradient(90deg, transparent 0%, currentColor 25%, currentColor 75%, transparent 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}>
              BAND 5 BAND 6 BAND 7 BAND 8 BAND 9
            </div>
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJub25lIiAvPgogIDxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1vcGFjaXR5PSIwLjAzIiB4PSIyIiB5PSIyIiAvPgo8L3N2Zz4=')] opacity-30"></div>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 pt-16">
          {/* IELTS Skills Section */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="bg-white/80 dark:bg-card/60 backdrop-blur-md rounded-xl p-8 shadow-xl space-y-8 border border-white/20 dark:border-white/5 h-full animate-fade-in">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-br from-primary to-blue-500 bg-clip-text text-transparent">Begin Your IELTS Journey</h3>
                <p className="text-muted-foreground mt-2">Prepare for success with our complete IELTS program</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 hover:bg-primary/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-reading/0 to-reading/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="bg-reading/10 p-3 rounded-full relative z-10">
                    <BookIcon className="h-5 w-5 text-reading" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-medium">Reading</h4>
                    <p className="text-sm text-muted-foreground">Improve your reading comprehension skills with passages that mirror the actual exam</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 hover:bg-primary/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-writing/0 to-writing/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="bg-writing/10 p-3 rounded-full relative z-10">
                    <Pencil className="h-5 w-5 text-writing" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-medium">Writing</h4>
                    <p className="text-sm text-muted-foreground">Master essay writing with expert feedback and structured templates</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 hover:bg-primary/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-listening/0 to-listening/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="bg-listening/10 p-3 rounded-full relative z-10">
                    <Headphones className="h-5 w-5 text-listening" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-medium">Listening</h4>
                    <p className="text-sm text-muted-foreground">Train your ear with diverse accents and realistic audio scenarios</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 hover:bg-primary/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-speaking/0 to-speaking/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="bg-speaking/10 p-3 rounded-full relative z-10">
                    <Mic className="h-5 w-5 text-speaking" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-medium">Speaking</h4>
                    <p className="text-sm text-muted-foreground">Practice with AI interviews for fluency and confidence building</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">Join thousands of successful test-takers who achieved their target scores with Neplia IELTS</p>
              </div>
            </div>
          </div>
          
          {/* Sign Up Form */}
          <Card className="lg:col-span-3 border-muted/10 bg-white/90 dark:bg-card/80 backdrop-blur-md shadow-xl animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-600/10 to-blue-600/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-600/10 to-blue-600/10 rounded-tr-full"></div>
            
            <CardHeader className="space-y-1">
              <div className="mx-auto h-14 w-14 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center mb-2 shadow-lg">
                <UserPlus className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-center">Create your account</CardTitle>
              <CardDescription className="text-center">
                Start your IELTS preparation journey today
              </CardDescription>
            </CardHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" className="bg-white/50 dark:bg-background/30 backdrop-blur-sm border-muted/30 focus:border-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" className="bg-white/50 dark:bg-background/30 backdrop-blur-sm border-muted/30 focus:border-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" className="bg-white/50 dark:bg-background/30 backdrop-blur-sm border-muted/30 focus:border-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" className="bg-white/50 dark:bg-background/30 backdrop-blur-sm border-muted/30 focus:border-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" className="bg-white/50 dark:bg-background/30 backdrop-blur-sm border-muted/30 focus:border-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Globe className="mr-2 h-4 w-4 text-primary" />
                          Country
                        </FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full bg-white/50 dark:bg-background/30 backdrop-blur-sm border-muted/30 focus:border-primary">
                              <SelectValue placeholder={isLoadingCountry ? "Detecting your country..." : "Select your country"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-[200px]">
                            {countries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {isLoadingCountry && (
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                            Detecting your location...
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white/90 dark:bg-card px-2 text-muted-foreground">IELTS Information</span>
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="testType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IELTS Test Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/50 dark:bg-background/30 backdrop-blur-sm border-muted/30 focus:border-primary">
                              <SelectValue placeholder="Select test type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="general">General Training</SelectItem>
                            <SelectItem value="undecided">Not Sure Yet</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="targetScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Band Score</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/50 dark:bg-background/30 backdrop-blur-sm border-muted/30 focus:border-primary">
                              <SelectValue placeholder="Select target score" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="6">Band 6</SelectItem>
                            <SelectItem value="6.5">Band 6.5</SelectItem>
                            <SelectItem value="7">Band 7</SelectItem>
                            <SelectItem value="7.5">Band 7.5</SelectItem>
                            <SelectItem value="8+">Band 8+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="examDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-primary" />
                          Planned Exam Date
                        </FormLabel>
                        <FormControl>
                          <Input type="date" className="bg-white/50 dark:bg-background/30 backdrop-blur-sm border-muted/30 focus:border-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                
                <CardFooter className="flex flex-col">
                  <Button 
                    className="w-full h-11 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white shadow-md"
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create Account
                      </>
                    )}
                  </Button>
                  <div className="text-center text-sm mt-4">
                    Already have an account?{' '}
                    <Link to="/signin" className="text-primary font-medium hover:underline">
                      Sign in
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground animate-fade-in">
          <p>© {new Date().getFullYear()} Neplia IELTS. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
