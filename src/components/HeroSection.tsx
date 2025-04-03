
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-reading/10 blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-writing/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-speaking/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full bg-listening/10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium animate-fade-in">
            Prepare for IELTS with Confidence
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Master IELTS with <span className="text-primary">AI-Powered</span> Learning
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
            The world's most advanced IELTS preparation platform that combines adaptive learning with expert guidance for guaranteed results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <Button size="lg" className="gap-2" asChild>
              <Link to="/signup">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/onboarding">
                Take Placement Test
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link to="/exam-content">
                <BookOpen className="h-4 w-4 mr-2" />
                Exam Guide
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border flex flex-wrap justify-center gap-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="text-center">
              <p className="font-bold text-2xl text-foreground">97%</p>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl text-foreground">500K+</p>
              <p className="text-sm text-muted-foreground">Students</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl text-foreground">7.5+</p>
              <p className="text-sm text-muted-foreground">Average Band Score</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl text-foreground">150+</p>
              <p className="text-sm text-muted-foreground">Countries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
