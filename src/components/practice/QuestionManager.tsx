import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Question, ReadingQuestion, WritingQuestion, SpeakingQuestion, ListeningQuestion } from '@/types/questions';
import ReadingQuestionView from './ReadingQuestionView';
import WritingQuestionView from './WritingQuestionView';
import SpeakingQuestionView from './SpeakingQuestionView';
import ListeningQuestionView from './ListeningQuestionView';
import ResultsView from './ResultsView';
import { useToast } from '@/components/ui/use-toast';
import { Clock, AlertTriangle, AlertCircle, Loader2 } from 'lucide-react';
import { useQuestions } from '@/contexts/QuestionsContext';

interface QuestionManagerProps {
  audioPermissionGranted?: boolean;
}

// Type guards to narrow down question types
const isReadingQuestion = (question: Question): question is ReadingQuestion => 
  question.skillType === 'reading';

const isWritingQuestion = (question: Question): question is WritingQuestion => 
  question.skillType === 'writing';

const isSpeakingQuestion = (question: Question): question is SpeakingQuestion => 
  question.skillType === 'speaking';

const isListeningQuestion = (question: Question): question is ListeningQuestion => 
  question.skillType === 'listening';

const QuestionManager: React.FC<QuestionManagerProps> = ({ audioPermissionGranted }) => {
  const { skillType, practiceId } = useParams<{ skillType: string; practiceId: string }>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [warningShown, setWarningShown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const { toast } = useToast();
  const { questions: contextQuestions, loading: contextLoading } = useQuestions();

  // Load questions from QuestionsContext
  useEffect(() => {
    if (contextLoading) {
      return; // Wait until context is loaded
    }

    if (!skillType) {
      setLoadError("No skill type specified");
      setIsLoading(false);
      return;
    }

    console.log("QuestionManager: Loading questions for skillType:", skillType, "practiceId:", practiceId);
    console.log("Available questions from context:", contextQuestions);
    
    if (!contextQuestions || contextQuestions.length === 0) {
      console.error("No questions available in context");
      setLoadError("Failed to load questions data");
      setIsLoading(false);
      return;
    }
    
    let filteredQuestions: Question[] = [];
    
    if (practiceId) {
      // First try to find a specific question by ID
      const specificQuestion = contextQuestions.find(q => q.id === practiceId);
      if (specificQuestion) {
        console.log("Found specific question:", specificQuestion);
        filteredQuestions = [specificQuestion];
      } else {
        // If no specific question found, filter by skill type
        console.log("No specific question found, filtering by skill type");
        filteredQuestions = contextQuestions.filter(q => q.skillType === skillType);
      }
    } else {
      // Fallback to filter by skill type only
      console.log("No practiceId provided, filtering by skill type only");
      filteredQuestions = contextQuestions.filter(q => q.skillType === skillType);
    }
    
    console.log(`Loading questions for ${skillType} practice with id ${practiceId}`, filteredQuestions);
    
    if (filteredQuestions.length === 0) {
      console.error(`No questions found for ${skillType} and id ${practiceId}`);
      setLoadError(`No ${skillType} questions found`);
      setIsLoading(false);
      return;
    }
    
    setQuestions(filteredQuestions);
    
    // Reset state when questions change
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    
    // Set initial time remaining
    if (filteredQuestions.length > 0) {
      const firstQuestion = filteredQuestions[0];
      let initialTime = firstQuestion.timeLimit || null;
      
      // For speaking questions, add preparation time
      if (isSpeakingQuestion(firstQuestion)) {
        initialTime = (firstQuestion.preparationTime || 0) + (firstQuestion.responseTime || 0);
      }
      
      setTimeRemaining(initialTime);
      console.log("Setting initial time remaining:", initialTime);
    }
    
    setIsLoading(false);
  }, [skillType, practiceId, contextQuestions, contextLoading]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    console.log("Submitting answers:", { ...answers, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);

      // Update timer for next question (only for writing and speaking which have per-question timers)
      const nextQuestion = questions[currentQuestionIndex + 1];
      if (isWritingQuestion(nextQuestion) && nextQuestion.taskType === 'task1' && currentQuestionIndex === 0) {
        setTimeRemaining(nextQuestion.timeLimit || null);
        setWarningShown(false);
      } else if (isWritingQuestion(nextQuestion) && nextQuestion.taskType === 'task2' && currentQuestionIndex === 1) {
        setTimeRemaining(nextQuestion.timeLimit || null);
        setWarningShown(false);
      } else if (isSpeakingQuestion(nextQuestion)) {
        setTimeRemaining((nextQuestion.preparationTime || 0) + (nextQuestion.responseTime || 0));
        setWarningShown(false);
      }
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);

      // Update timer for previous question (only for writing and speaking which have per-question timers)
      const prevQuestion = questions[currentQuestionIndex - 1];
      if (isWritingQuestion(prevQuestion) && prevQuestion.taskType === 'task1' && currentQuestionIndex === 1) {
        setTimeRemaining(prevQuestion.timeLimit || null);
        setWarningShown(false);
      } else if (isWritingQuestion(prevQuestion) && prevQuestion.taskType === 'task2' && currentQuestionIndex === 2) {
        setTimeRemaining(prevQuestion.timeLimit || null);
        setWarningShown(false);
      } else if (isSpeakingQuestion(prevQuestion)) {
        setTimeRemaining((prevQuestion.preparationTime || 0) + (prevQuestion.responseTime || 0));
        setWarningShown(false);
      }
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  // Calculate score for results
  const calculateScore = (): number => {
    if (!questions.length) return 0;
    
    let score = 0;
    questions.forEach(question => {
      if (isReadingQuestion(question) || isListeningQuestion(question)) {
        question.questions.forEach(subQuestion => {
          const userAnswer = answers[subQuestion.id];
          if (userAnswer && 
             (userAnswer === subQuestion.correctAnswer || 
              (Array.isArray(userAnswer) && 
               Array.isArray(subQuestion.correctAnswer) && 
               JSON.stringify(userAnswer.sort()) === JSON.stringify(subQuestion.correctAnswer.sort())))) {
            score += 1;
          }
        });
      }
    });
    return score;
  };

  // Calculate total possible score
  const calculateTotalPossible = (): number => {
    if (!questions.length) return 0;
    
    let total = 0;
    questions.forEach(question => {
      if (isReadingQuestion(question) || isListeningQuestion(question)) {
        total += question.questions.length;
      }
    });
    return total;
  };

  // Format test time for results
  const getTestTime = (): string => {
    const date = new Date();
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  if (isLoading || contextLoading) {
    return (
      <div className="container mx-auto p-4 mt-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Loading...</h2>
            <p>Please wait while we prepare your practice session.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loadError || !skillType || questions.length === 0) {
    return (
      <div className="container mx-auto p-4 mt-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              {loadError || `No ${skillType || 'practice'} questions found`}
            </h2>
            <p className="text-muted-foreground mb-4">
              {skillType 
                ? `We couldn't find any ${skillType} questions${practiceId ? ` with ID ${practiceId}` : ''}. Try creating some in the admin panel.`
                : 'No skill type specified. Please select a practice type.'}
            </p>
            <Button onClick={() => window.location.href = '/practice'}>
              Back to Practice
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    return (
      <ResultsView 
        skillType={skillType as 'reading' | 'writing' | 'speaking' | 'listening'} 
        score={calculateScore()}
        totalPossible={calculateTotalPossible()}
        resultTime={getTestTime()}
        onBackToPractice={() => setShowResults(false)} 
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">
            {skillType.charAt(0).toUpperCase() + skillType.slice(1)} Practice
          </h2>
          
          {timeRemaining !== null && (
            <div className="flex items-center bg-muted px-3 py-1 rounded-md">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className={`${timeRemaining < 300 ? 'text-destructive font-bold' : ''}`}>
                Time: {formatTime(timeRemaining)}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium">
            {Math.round(progress)}% Complete
          </span>
        </div>
        
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-6">
        <CardContent className="p-0">
          {isReadingQuestion(currentQuestion) && (
            <ReadingQuestionView 
              question={currentQuestion} 
              onAnswer={handleAnswer} 
              answer={answers[currentQuestion.id]} 
            />
          )}
          
          {isWritingQuestion(currentQuestion) && (
            <WritingQuestionView 
              question={currentQuestion} 
              onAnswer={handleAnswer} 
              answer={answers[currentQuestion.id]} 
            />
          )}
          
          {isSpeakingQuestion(currentQuestion) && (
            <SpeakingQuestionView 
              question={currentQuestion} 
              onAnswer={handleAnswer} 
              answer={answers[currentQuestion.id]}
              audioPermissionGranted={audioPermissionGranted}
            />
          )}
          
          {isListeningQuestion(currentQuestion) && (
            <ListeningQuestionView 
              question={currentQuestion} 
              onAnswer={handleAnswer} 
              answer={answers[currentQuestion.id]} 
            />
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        
        {currentQuestionIndex < questions.length - 1 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit} variant="default">Submit</Button>
        )}
      </div>
    </div>
  );
};

export default QuestionManager;
