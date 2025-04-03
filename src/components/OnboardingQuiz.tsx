
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import PlacementQuiz from './PlacementQuiz';
import StudyPlanGenerator from './StudyPlanGenerator';

type Step = {
  id: number;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Welcome to Neplia IELTS",
    description: "Let's get to know you better to create your personalized IELTS preparation experience."
  },
  {
    id: 2,
    title: "Placement Quiz",
    description: "Answer a few questions to help us determine your current level and learning needs."
  },
  {
    id: 3,
    title: "Your Study Plan",
    description: "Review your personalized study plan based on your goals and current abilities."
  }
];

const OnboardingQuiz = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Function to receive answers from the PlacementQuiz
  const handleQuizComplete = (answers: Record<string, string>) => {
    setQuizAnswers(answers);
    nextStep();
  };
  
  const progress = (currentStep / steps.length) * 100;
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center py-8">
            <h3 className="text-2xl font-bold mb-4">Welcome to Your IELTS Journey!</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We're excited to help you achieve your target IELTS score. Our adaptive learning platform will create a personalized study plan just for you.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
              {[
                {
                  title: "Take the quiz",
                  description: "Answer a few questions about your goals and current level"
                },
                {
                  title: "Get your plan",
                  description: "Receive a customized study schedule based on your needs"
                },
                {
                  title: "Start practicing",
                  description: "Begin improving with our adaptive practice materials"
                }
              ].map((item, index) => (
                <div key={index} className="bg-accent/50 p-4 rounded-lg text-left">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                    {index + 1}
                  </div>
                  <h4 className="font-medium mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
            <Button size="lg" onClick={nextStep}>Let's Get Started</Button>
          </div>
        );
        
      case 2:
        // Pass an onComplete handler to PlacementQuiz
        return (
          <div>
            <PlacementQuiz />
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={() => {
                  // For demo purposes, set some default answers if none were provided
                  const demoAnswers = {
                    '1': 'b',
                    '2': 'a',
                    '3': 'c',
                    '4': 'b',
                    '5': 'b',
                    '6': 'c',
                    '7': 'b',
                    '8': 'a'
                  };
                  setQuizAnswers(demoAnswers);
                  nextStep();
                }}
              >
                Continue to Study Plan
              </Button>
            </div>
          </div>
        );
        
      case 3:
        return <StudyPlanGenerator quizAnswers={quizAnswers} />;
        
      default:
        return null;
    }
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {steps.length}
          </div>
        </div>
        <CardDescription>
          {steps[currentStep - 1].description}
        </CardDescription>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      
      <CardContent>
        {renderStepContent()}
      </CardContent>
      
      {currentStep > 1 && currentStep < 3 && (
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default OnboardingQuiz;
