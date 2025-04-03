
import React from 'react';
import { Link } from 'react-router-dom';
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
import { Book, UserPlus, Calendar, Book as BookIcon, Pencil, Headphones, Mic, GraduationCap } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const SignUp = () => {
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
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="your.email@example.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input id="password" type="password" />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
              <Input id="confirmPassword" type="password" />
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-2">
              <label htmlFor="testType" className="text-sm font-medium">IELTS Test Type</label>
              <Select>
                <SelectTrigger id="testType">
                  <SelectValue placeholder="Select test type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="general">General Training</SelectItem>
                  <SelectItem value="undecided">Not Sure Yet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="targetScore" className="text-sm font-medium">Target Band Score</label>
              <Select>
                <SelectTrigger id="targetScore">
                  <SelectValue placeholder="Select target score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">Band 6</SelectItem>
                  <SelectItem value="6.5">Band 6.5</SelectItem>
                  <SelectItem value="7">Band 7</SelectItem>
                  <SelectItem value="7.5">Band 7.5</SelectItem>
                  <SelectItem value="8+">Band 8+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="examDate" className="text-sm font-medium">Planned Exam Date</label>
              <Input id="examDate" type="date" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full mb-4">
              <UserPlus className="mr-2 h-4 w-4" />
              Create Account
            </Button>
            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link to="/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
