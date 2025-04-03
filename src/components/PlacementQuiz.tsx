
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
import { 
  CheckCircle, 
  ChevronRight,
  ChevronLeft,
  Calendar
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

// Enhanced quiz questions data
const quizQuestions = [
  {
    id: 1,
    question: "How would you rate your current English level?",
    options: [
      { id: 'a', text: "Beginner - I know basic phrases and vocabulary" },
      { id: 'b', text: "Intermediate - I can have simple conversations" },
      { id: 'c', text: "Upper Intermediate - I can communicate effectively in most situations" },
      { id: 'd', text: "Advanced - I'm fluent and comfortable with complex topics" }
    ]
  },
  {
    id: 2,
    question: "Have you taken the IELTS test before?",
    options: [
      { id: 'a', text: "No, this will be my first time" },
      { id: 'b', text: "Yes, once" },
      { id: 'c', text: "Yes, multiple times" }
    ]
  },
  {
    id: 3,
    question: "What's your target IELTS band score?",
    options: [
      { id: 'a', text: "5.0 - 5.5" },
      { id: 'b', text: "6.0 - 6.5" },
      { id: 'c', text: "7.0 - 7.5" },
      { id: 'd', text: "8.0 or higher" }
    ]
  },
  {
    id: 4,
    question: "Which IELTS skill do you find most challenging?",
    options: [
      { id: 'a', text: "Reading" },
      { id: 'b', text: "Writing" },
      { id: 'c', text: "Speaking" },
      { id: 'd', text: "Listening" }
    ]
  },
  {
    id: 5,
    question: "How much time can you dedicate to IELTS preparation per week?",
    options: [
      { id: 'a', text: "Less than 5 hours" },
      { id: 'b', text: "5-10 hours" },
      { id: 'c', text: "10-15 hours" },
      { id: 'd', text: "More than 15 hours" }
    ]
  },
  {
    id: 6,
    question: "What type of content do you prefer for learning English?",
    options: [
      { id: 'a', text: "Videos and visual content" },
      { id: 'b', text: "Reading articles and books" },
      { id: 'c', text: "Interactive exercises and quizzes" },
      { id: 'd', text: "Conversation practice with others" }
    ]
  },
  {
    id: 7,
    question: "Do you have a specific deadline for taking the IELTS exam?",
    options: [
      { id: 'a', text: "Within 1 month" },
      { id: 'b', text: "Within 3 months" },
      { id: 'c', text: "Within 6 months" },
      { id: 'd', text: "No specific deadline" }
    ]
  },
  {
    id: 8,
    question: "What is your primary reason for taking the IELTS test?",
    options: [
      { id: 'a', text: "Higher education (university admission)" },
      { id: 'b', text: "Immigration purposes" },
      { id: 'c', text: "Employment opportunities" },
      { id: 'd', text: "Personal development" }
    ]
  }
];

const PlacementQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);
  const [examDate, setExamDate] = useState<string>("");
  
  const handleAnswer = (questionId: number, optionId: string) => {
    setAnswers({
      ...answers,
      [questionId]: optionId
    });
  };
  
  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleExamDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExamDate(e.target.value);
  };
  
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Placement Quiz</CardTitle>
        <CardDescription>
          Answer a few questions to help us create your personalized study plan
        </CardDescription>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      
      <CardContent>
        {!completed ? (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              {quizQuestions[currentQuestion].question}
            </h3>
            
            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option) => (
                <div
                  key={option.id}
                  className={`
                    p-4 rounded-lg border cursor-pointer transition-colors
                    ${answers[quizQuestions[currentQuestion].id] === option.id 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:bg-accent'
                    }
                  `}
                  onClick={() => handleAnswer(quizQuestions[currentQuestion].id, option.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-5 h-5 rounded-full border flex items-center justify-center
                      ${answers[quizQuestions[currentQuestion].id] === option.id 
                        ? 'border-primary' 
                        : 'border-muted-foreground'
                      }
                    `}>
                      {answers[quizQuestions[currentQuestion].id] === option.id && (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      )}
                    </div>
                    <span>{option.text}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Special question for exam date if they have a deadline */}
            {currentQuestion === 6 && answers[7] !== 'd' && (
              <div className="mt-4 p-4 border rounded-lg bg-accent/20">
                <div className="space-y-2">
                  <Label htmlFor="exam-date">When do you plan to take your IELTS exam?</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="exam-date" 
                      type="date" 
                      value={examDate} 
                      onChange={handleExamDateChange} 
                      className="max-w-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
            <p className="text-muted-foreground mb-6">
              Based on your answers, we'll create a personalized study plan to help you reach your target IELTS score.
            </p>
            <Button size="lg">View Your Study Plan</Button>
          </div>
        )}
      </CardContent>
      
      {!completed && (
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          
          <Button 
            onClick={nextQuestion}
            disabled={!answers[quizQuestions[currentQuestion].id]}
          >
            {currentQuestion < quizQuestions.length - 1 ? (
              <>Next <ChevronRight className="ml-2 h-4 w-4" /></>
            ) : (
              'Complete'
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PlacementQuiz;
