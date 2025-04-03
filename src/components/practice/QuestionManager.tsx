
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Question } from '@/types/questions';
import ReadingQuestionView from './ReadingQuestionView';
import WritingQuestionView from './WritingQuestionView';
import SpeakingQuestionView from './SpeakingQuestionView';
import ListeningQuestionView from './ListeningQuestionView';
import { ArrowLeft, Clock, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

// This would normally come from an API or database
import { mockQuestions } from '@/data/mockQuestions';

interface QuestionManagerProps {
  skillType?: 'reading' | 'writing' | 'speaking' | 'listening';
  practiceItemId?: string;
}

const QuestionManager: React.FC<QuestionManagerProps> = ({ 
  skillType: propSkillType,
  practiceItemId: propPracticeItemId
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { skillType: paramSkillType, practiceId: paramPracticeId } = useParams();
  
  const skillType = propSkillType || paramSkillType;
  const practiceItemId = propPracticeItemId || paramPracticeId;
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        // Filter questions by skill type and practice item id
        const filteredQuestions = mockQuestions.filter(
          q => q.skillType === skillType
        );
        
        if (filteredQuestions.length === 0) {
          toast({
            title: "No questions found",
            description: "We couldn't find any questions for this practice session.",
            variant: "destructive",
          });
          navigate('/practice');
          return;
        }
        
        setQuestions(filteredQuestions);
        
        // Set initial timer based on the first question
        if (filteredQuestions[0].timeLimit) {
          setTimeRemaining(filteredQuestions[0].timeLimit);
        }
      } catch (error) {
        console.error("Error loading questions:", error);
        toast({
          title: "Failed to load questions",
          description: "There was an error loading the practice questions. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadQuestions();
  }, [skillType, practiceItemId, toast, navigate]);
  
  useEffect(() => {
    // Timer effect
    if (timeRemaining === null) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        
        // Show warning when 10% of time is left
        if (prev === Math.floor(questions[currentQuestionIndex].timeLimit! * 0.1)) {
          setShowTimeWarning(true);
          toast({
            title: "Time is running out!",
            description: "You have less than 10% of your time remaining.",
            variant: "destructive",
          });
        }
        
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeRemaining, currentQuestionIndex, questions, toast]);
  
  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowTimeWarning(false);
      
      // Update timer for the next question
      const nextQuestion = questions[currentQuestionIndex + 1];
      if (nextQuestion.timeLimit) {
        setTimeRemaining(nextQuestion.timeLimit);
      }
    } else {
      // Submit answers
      handleSubmit();
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowTimeWarning(false);
      
      // Update timer for the previous question
      const prevQuestion = questions[currentQuestionIndex - 1];
      if (prevQuestion.timeLimit) {
        setTimeRemaining(prevQuestion.timeLimit);
      }
    }
  };
  
  const handleSubmit = () => {
    // In a real app, this would be an API call to submit answers
    console.log("Submitting answers:", answers);
    
    toast({
      title: "Practice completed!",
      description: "Your answers have been submitted for review.",
    });
    
    // Navigate back to practice page after submission
    navigate('/practice');
  };
  
  const formatTime = (seconds: number): string => {
    if (seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-pulse w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4"></div>
          <p>Loading practice questions...</p>
        </div>
      </div>
    );
  }
  
  if (questions.length === 0) {
    return (
      <Card className="max-w-xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>No questions available</CardTitle>
        </CardHeader>
        <CardContent>
          <p>There are no questions available for this practice session.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate('/practice')}>Back to Practice</Button>
        </CardFooter>
      </Card>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/practice')}
          className="mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Practice
        </Button>
        
        <div className="flex-1">
          <h1 className="text-2xl font-bold capitalize">{skillType} Practice</h1>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
        
        {timeRemaining !== null && (
          <div className={`flex items-center sticky top-0 z-10 ${showTimeWarning ? 'animate-pulse text-red-500' : ''}`}>
            <Clock className={`mr-2 h-5 w-5 ${showTimeWarning ? 'text-red-500' : 'text-orange-500'}`} />
            <span className="font-mono font-medium">
              {formatTime(timeRemaining)}
            </span>
          </div>
        )}
      </div>
      
      <Progress value={progress} className="mb-6" />
      
      <Card className="mb-6">
        <CardContent className={`pt-6 ${skillType === 'reading' ? 'p-0 overflow-hidden' : ''}`}>
          {currentQuestion.skillType === 'reading' && (
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              <div className="border-r overflow-y-auto max-h-[600px] p-6">
                <h2 className="text-xl font-bold mb-4">{(currentQuestion as any).passageTitle}</h2>
                <div className="prose prose-sm max-w-none">
                  {(currentQuestion as any).passageText.split('\n').map((paragraph: string, idx: number) => (
                    <p key={idx} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="overflow-y-auto max-h-[600px] p-6">
                <ReadingQuestionView 
                  question={currentQuestion} 
                  onAnswer={handleAnswer} 
                  answer={answers[currentQuestion.id]}
                />
              </div>
            </div>
          )}
          
          {currentQuestion.skillType === 'writing' && (
            <WritingQuestionView 
              question={currentQuestion} 
              onAnswer={handleAnswer} 
              answer={answers[currentQuestion.id]}
            />
          )}
          
          {currentQuestion.skillType === 'speaking' && (
            <SpeakingQuestionView 
              question={currentQuestion} 
              onAnswer={handleAnswer} 
              answer={answers[currentQuestion.id]}
            />
          )}
          
          {currentQuestion.skillType === 'listening' && (
            <ListeningQuestionView 
              question={currentQuestion} 
              onAnswer={handleAnswer} 
              answer={answers[currentQuestion.id]}
            />
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            onClick={handlePrevious} 
            disabled={currentQuestionIndex === 0} 
            variant="outline"
          >
            Previous
          </Button>
          
          <Button 
            onClick={handleNext}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuestionManager;
