
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  ArrowRight,
  CheckCircle,
  LogIn,
  UserPlus
} from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/20 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-card rounded-2xl p-8 md:p-12 shadow-lg border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ready to Ace Your IELTS?</h2>
              <p className="text-muted-foreground mb-6">
                Start your journey to IELTS success today with our proven methodology and adaptive learning platform.
              </p>
              
              <ul className="space-y-3 mb-6">
                {[
                  'Personalized study plans',
                  'AI-powered feedback',
                  'Full-length practice tests',
                  '24/7 support from experts'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex gap-3">
                <Button asChild size="lg" variant="outline">
                  <Link to="/signin">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild size="lg">
                  <Link to="/signup">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-accent/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Choose Your Plan</h3>
              
              <div className="space-y-4">
                <div className="bg-background rounded-lg p-4 border">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Free Trial</h4>
                      <p className="text-sm text-muted-foreground">7 days of limited access</p>
                    </div>
                    <span className="text-lg font-bold">$0</span>
                  </div>
                  <Button variant="outline" className="w-full mt-2" asChild>
                    <Link to="/signup">Try Free</Link>
                  </Button>
                </div>
                
                <div className="bg-background rounded-lg p-4 border border-primary relative">
                  <div className="absolute -top-3 right-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    POPULAR
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Premium</h4>
                      <p className="text-sm text-muted-foreground">Full access for 3 months</p>
                    </div>
                    <span className="text-lg font-bold">$99</span>
                  </div>
                  <Button className="w-full mt-2" asChild>
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
