
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
    <div className="min-h-screen bg-gradient-to-b from-accent/40 to-background py-12 px-4">
      <Link to="/" className="flex items-center space-x-2 mb-8 justify-center">
        <Book className="h-8 w-8 text-primary" />
        <span className="font-bold text-2xl">Neplia IELTS</span>
      </Link>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* IELTS Skills Section */}
        <div className="hidden lg:block lg:col-span-2">
          <div className="bg-card rounded-lg p-6 shadow-md space-y-6">
            <div className="text-center mb-8">
              <GraduationCap className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-bold">Begin Your IELTS Journey</h3>
              <p className="text-muted-foreground">Prepare for success with our complete IELTS program</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-reading/10 p-2 rounded-full">
                  <BookIcon className="h-5 w-5 text-reading" />
                </div>
                <div>
                  <h4 className="font-medium">Reading</h4>
                  <p className="text-sm text-muted-foreground">Improve your reading comprehension skills</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-writing/10 p-2 rounded-full">
                  <Pencil className="h-5 w-5 text-writing" />
                </div>
                <div>
                  <h4 className="font-medium">Writing</h4>
                  <p className="text-sm text-muted-foreground">Master essay writing with expert feedback</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-listening/10 p-2 rounded-full">
                  <Headphones className="h-5 w-5 text-listening" />
                </div>
                <div>
                  <h4 className="font-medium">Listening</h4>
                  <p className="text-sm text-muted-foreground">Train your ear with diverse accents</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-speaking/10 p-2 rounded-full">
                  <Mic className="h-5 w-5 text-speaking" />
                </div>
                <div>
                  <h4 className="font-medium">Speaking</h4>
                  <p className="text-sm text-muted-foreground">Practice with AI interviews for fluency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sign Up Form */}
        <Card className="lg:col-span-3">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
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
                          <Input placeholder="John" {...field} />
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
                          <Input placeholder="Doe" {...field} />
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
                        <Input type="email" placeholder="your.email@example.com" {...field} />
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
                          <Input type="password" {...field} />
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
                          <Input type="password" {...field} />
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
                        <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                        Country
                      </FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
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
                        <p className="text-xs text-muted-foreground">Detecting your location...</p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Separator className="my-6" />
                
                <FormField
                  control={form.control}
                  name="testType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IELTS Test Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
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
                          <SelectTrigger>
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
                      <FormLabel>Planned Exam Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              
              <CardFooter className="flex flex-col">
                <Button className="w-full mb-4" type="submit" disabled={isSubmitting}>
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
                <div className="text-center text-sm">
                  Already have an account?{' '}
                  <Link to="/signin" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
