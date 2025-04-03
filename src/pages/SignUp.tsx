
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
import { Book, UserPlus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-accent/30 px-4">
      <Link to="/" className="flex items-center space-x-2 mb-8">
        <Book className="h-6 w-6 text-primary" />
        <span className="font-bold text-xl">Neplia IELTS</span>
      </Link>
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Start your IELTS preparation journey today
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
  );
};

export default SignUp;
