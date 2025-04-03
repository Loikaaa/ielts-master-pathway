import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Question, WritingQuestion } from '@/types/questions';
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

// Type guard function to check if a question is a WritingQuestion
const isWritingQuestion = (question: Question): question is WritingQuestion => {
  return question.skillType === 'writing';
};

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
  const [transferTime, setTransferTime] = useState(false);
  
  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
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
        
        if (skillType === 'reading') {
          setTimeRemaining(60 * 60);
        } else if (skillType === 'listening') {
          setTimeRemaining(30 * 60);
        } else if (skillType === 'writing') {
          setTimeRemaining(60 * 60);
        } else if (skillType === 'speaking') {
          if (filteredQuestions[0]?.timeLimit) {
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
    if (timeRemaining === null) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 0) {
          clearInterval(timer);
          if (prev === 0) {
            if (skillType === 'listening' && !transferTime) {
              setTransferTime(true);
              return 10 * 60;
            } else if (!examCompleted) {
              handleSubmit();
            }
          }
          return 0;
        }
        
        if (skillType === 'reading' && prev === Math.floor(60 * 60 * 0.1)) {
          setShowTimeWarning(true);
          toast({
            title: "Time is running out!",
            description: "You have less than 6 minutes remaining.",
            variant: "destructive",
          });
        } else if (skillType === 'listening' && !transferTime && prev === Math.floor(30 * 60 * 0.1)) {
          setShowTimeWarning(true);
          toast({
            title: "Time is running out!",
            description: "You have less than 3 minutes remaining.",
            variant: "destructive",
          });
        } else if (skillType === 'writing' && prev === Math.floor(60 * 60 * 0.1)) {
          setShowTimeWarning(true);
          toast({
            title: "Time is running out!",
            description: "You have less than 6 minutes remaining.",
            variant: "destructive",
          });
        } else if (transferTime && prev === Math.floor(10 * 60 * 0.2)) {
          setShowTimeWarning(true);
          toast({
            title: "Transfer time ending!",
            description: "You have 2 minutes left to transfer answers.",
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
  }, [timeRemaining, currentQuestionIndex, questions, toast, skillType, examCompleted, transferTime]);
  
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
      
      if (skillType === 'speaking') {
        const nextQuestion = questions[currentQuestionIndex + 1];
        if (nextQuestion?.timeLimit) {
          setTimeRemaining(nextQuestion.timeLimit);
        }
      } else if (skillType === 'writing') {
        const currentQuestion = questions[currentQuestionIndex];
        const nextQuestion = questions[currentQuestionIndex + 1];
        
        if (isWritingQuestion(currentQuestion) && isWritingQuestion(nextQuestion)) {
          if (currentQuestion.taskType === 'task1' && nextQuestion.taskType === 'task2') {
            setTimeRemaining(40 * 60);
          }
        }
      }
    } else {
      handleSubmit();
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowTimeWarning(false);
      
      if (skillType === 'speaking') {
        const prevQuestion = questions[currentQuestionIndex - 1];
        if (prevQuestion?.timeLimit) {
          setTimeRemaining(prevQuestion.timeLimit);
        }
      } else if (skillType === 'writing') {
        const currentQuestion = questions[currentQuestionIndex];
        const prevQuestion = questions[currentQuestionIndex - 1];
        
        if (isWritingQuestion(currentQuestion) && isWritingQuestion(prevQuestion)) {
          if (currentQuestion.taskType === 'task2' && prevQuestion.taskType === 'task1') {
            setTimeRemaining(20 * 60);
          }
        }
      }
    }
  };
  
  const handleSubmit = () => {
    console.log("Submitting answers:", answers);
    
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
            {transferTime && " - Transfer Time"}
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
          {transferTime && (
            <span className="text-xs ml-2">Transfer Time</span>
          )}
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

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">IELTS {skillType?.charAt(0).toUpperCase() + skillType?.slice(1)} Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-1">
            {skillType === 'reading' && (
              <>
                <li>• 60 minutes to complete 40 questions</li>
                <li>• No extra time to transfer answers</li>
                <li>• Spelling mistakes count as wrong answers</li>
                <li>• Answers must be exactly as in the text</li>
              </>
            )}
            {skillType === 'listening' && (
              <>
                <li>• 30 minutes listening + 10 minutes to transfer answers</li>
                <li>• Audio plays ONCE only</li>
                <li>• Write numbers as digits (e.g., "20" not "twenty")</li>
                <li>• Pay attention to plurals (e.g., "book" vs "books")</li>
              </>
            )}
            {skillType === 'writing' && (
              <>
                <li>• Task 1: 20 minutes, minimum 150 words</li>
                <li>• Task 2: 40 minutes, minimum 250 words</li>
                <li>• No bullet points/numbered lists – full sentences only</li>
                <li>• -1 Band Score if below minimum words</li>
              </>
            )}
            {skillType === 'speaking' && (
              <>
                <li>• Part 1: Introduction (4-5 minutes)</li>
                <li>• Part 2: Long turn with 1 minute preparation (3-4 minutes)</li>
                <li>• Part 3: Discussion (4-5 minutes)</li>
                <li>• Entire test is recorded (for re-marking)</li>
              </>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionManager;
