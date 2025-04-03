
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Question } from '@/types/questions';
import ReadingQuestionView from './ReadingQuestionView';
import WritingQuestionView from './WritingQuestionView';
import SpeakingQuestionView from './SpeakingQuestionView';
import ListeningQuestionView from './ListeningQuestionView';
import { ArrowLeft, Clock, Award, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import ResultsView from './ResultsView';

// This would normally come from an API or database
import { mockQuestions } from '@/data/mockQuestions';

interface QuestionManagerProps {
  skillType?: 'reading' | 'writing' | 'speaking' | 'listening';
  practiceItemId?: string;
  audioPermissionGranted?: boolean;
}

const QuestionManager: React.FC<QuestionManagerProps> = ({ 
  skillType: propSkillType,
  practiceItemId: propPracticeItemId,
  audioPermissionGranted
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { skillType: paramSkillType, practiceId: paramPracticeId } = useParams();
  const timerRef = useRef<HTMLDivElement>(null);
  
  const skillType = propSkillType || paramSkillType;
  const practiceItemId = propPracticeItemId || paramPracticeId;
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [stickyTimer, setStickyTimer] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [examResults, setExamResults] = useState<{
    score: number;
    totalPossible: number;
    resultTime: string;
  } | null>(null);
  
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
        
        // Set initial timer based on the skill type (IELTS timing rules)
        if (skillType === 'reading') {
          // IELTS Reading: 60 minutes for 40 questions
          setTimeRemaining(60 * 60); // 60 minutes in seconds
        } else if (skillType === 'listening') {
          // IELTS Listening: around 30 minutes for 40 questions
          setTimeRemaining(30 * 60); // 30 minutes in seconds
        } else if (skillType === 'writing') {
          // IELTS Writing: 60 minutes for 2 tasks
          setTimeRemaining(60 * 60); // 60 minutes in seconds
        } else if (skillType === 'speaking') {
          // Individual questions will have their own timers
          if (filteredQuestions[0].timeLimit) {
            setTimeRemaining(filteredQuestions[0].timeLimit);
          }
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

    // Listener for scroll to make timer sticky
    const handleScroll = () => {
      if (timerRef.current) {
        const rect = timerRef.current.getBoundingClientRect();
        if (rect.top <= 0) {
          setStickyTimer(true);
        } else {
          setStickyTimer(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [skillType, practiceItemId, toast, navigate]);
  
  useEffect(() => {
    // Timer effect
    if (timeRemaining === null) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 0) {
          clearInterval(timer);
          // Auto-submit when time is up
          if (prev === 0 && !examCompleted) {
            handleSubmit();
          }
          return 0;
        }
        
        // Show warning when 10% of time is left
        if (skillType === 'reading' && prev === Math.floor(60 * 60 * 0.1)) {
          setShowTimeWarning(true);
          toast({
            title: "Time is running out!",
            description: "You have less than 10% of your time remaining.",
            variant: "destructive",
          });
        } else if (skillType === 'listening' && prev === Math.floor(30 * 60 * 0.1)) {
          setShowTimeWarning(true);
          toast({
            title: "Time is running out!",
            description: "You have less than 10% of your time remaining.",
            variant: "destructive",
          });
        } else if (skillType === 'writing' && prev === Math.floor(60 * 60 * 0.1)) {
          setShowTimeWarning(true);
          toast({
            title: "Time is running out!",
            description: "You have less than 10% of your time remaining.",
            variant: "destructive",
          });
        } else if (skillType === 'speaking' && prev === Math.floor(questions[currentQuestionIndex]?.timeLimit! * 0.1)) {
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
  }, [timeRemaining, currentQuestionIndex, questions, toast, skillType, examCompleted]);
  
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
      
      // Only update timer for speaking questions
      if (skillType === 'speaking') {
        // Update timer for the next question
        const nextQuestion = questions[currentQuestionIndex + 1];
        if (nextQuestion.timeLimit) {
          setTimeRemaining(nextQuestion.timeLimit);
        }
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
      
      // Only update timer for speaking questions
      if (skillType === 'speaking') {
        // Update timer for the previous question
        const prevQuestion = questions[currentQuestionIndex - 1];
        if (prevQuestion.timeLimit) {
          setTimeRemaining(prevQuestion.timeLimit);
        }
      }
    }
  };
  
  const handleSubmit = () => {
    // In a real app, this would be an API call to submit answers
    console.log("Submitting answers:", answers);
    
    // Calculate score (simplified for demo)
    let correctAnswers = 0;
    let totalQuestions = 0;
    
    questions.forEach(question => {
      if ('questions' in question) {
        question.questions.forEach(subQ => {
          totalQuestions++;
          const userAnswer = answers[subQ.id];
          if (userAnswer && 
             (Array.isArray(subQ.correctAnswer) 
                ? subQ.correctAnswer.includes(userAnswer)
                : subQ.correctAnswer === userAnswer)) {
            correctAnswers++;
          }
        });
      } else {
        totalQuestions++;
        // For writing and speaking, we'd normally have a human evaluation
      }
    });
    
    let resultTime = "";
    if (skillType === 'reading' || skillType === 'listening') {
      resultTime = "Available now";
    } else if (skillType === 'writing') {
      resultTime = "Available in 2 hours";
    } else if (skillType === 'speaking') {
      resultTime = "Available in 4 hours";
    }
    
    // Set results
    setExamResults({
      score: correctAnswers,
      totalPossible: totalQuestions,
      resultTime
    });
    
    setExamCompleted(true);
    
    toast({
      title: "Practice completed!",
      description: "Your answers have been submitted for review.",
    });
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

  if (examCompleted && examResults) {
    return (
      <ResultsView 
        skillType={skillType as 'reading' | 'writing' | 'speaking' | 'listening'}
        score={examResults.score}
        totalPossible={examResults.totalPossible}
        resultTime={examResults.resultTime}
        onBackToPractice={() => navigate('/practice')}
      />
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6" ref={timerRef}>
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
          <div className={`flex items-center ${showTimeWarning ? 'animate-pulse text-red-500' : ''}`}>
            <Clock className={`mr-2 h-5 w-5 ${showTimeWarning ? 'text-red-500' : 'text-orange-500'}`} />
            <span className="font-mono font-medium">
              {formatTime(timeRemaining)}
            </span>
          </div>
        )}
      </div>
      
      {stickyTimer && timeRemaining !== null && (
        <div className={`fixed top-0 right-0 z-50 bg-background/90 backdrop-blur-sm py-2 px-4 border-l border-b rounded-bl-lg shadow-md flex items-center ${showTimeWarning ? 'animate-pulse text-red-500 border-red-500' : ''}`}>
          <Clock className={`mr-2 h-5 w-5 ${showTimeWarning ? 'text-red-500' : 'text-orange-500'}`} />
          <span className="font-mono font-medium">
            {formatTime(timeRemaining)}
          </span>
        </div>
      )}
      
      <Progress value={progress} className="mb-6" />
      
      <Card className="mb-6">
        <CardContent className={`pt-6 ${skillType === 'reading' ? 'p-0 overflow-hidden' : ''}`}>
          {currentQuestion.skillType === 'reading' && (
            <ReadingQuestionView 
              question={currentQuestion} 
              onAnswer={handleAnswer} 
              answer={answers[currentQuestion.id]}
            />
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
              audioPermissionGranted={audioPermissionGranted}
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
