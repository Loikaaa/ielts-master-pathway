
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-reading"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-writing"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-speaking"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full bg-listening"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Master IELTS with <span className="text-primary">AI-Powered</span> Learning
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
            The world's most advanced IELTS preparation platform that combines adaptive learning with expert guidance for guaranteed results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <Button size="lg" className="gap-2">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Take Placement Test
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
