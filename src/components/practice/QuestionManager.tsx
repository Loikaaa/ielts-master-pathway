import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { Clock, AlertTriangle, AlertCircle, Loader2, ChevronLeft, ChevronRight, Star, Award, Info, BookOpen, Pencil, Mic, Headphones } from 'lucide-react';
import { useQuestions } from '@/contexts/QuestionsContext';
import { motion, AnimatePresence } from 'framer-motion';

interface QuestionManagerProps {
  audioPermissionGranted?: boolean;
}

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
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [warningShown, setWarningShown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const { toast } = useToast();
  const { questions: contextQuestions, loading: contextLoading } = useQuestions();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const getSkillColor = (skillType: string | undefined) => {
    switch (skillType) {
      case 'reading': return 'reading';
      case 'writing': return 'writing';
      case 'speaking': return 'speaking';
      case 'listening': return 'listening';
      default: return 'primary';
    }
  };

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

  const handleShowCorrectAnswers = () => {
    setShowCorrectAnswers(true);
  };

  const backToDashboard = () => {
    navigate('/practice');
  };

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

  const getTestTime = (): string => {
    const date = new Date();
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  if (isLoading || contextLoading) {
    return (
      <div className="container mx-auto p-4 mt-4">
        <Card className="bg-white/90 backdrop-blur-sm border border-primary/20 shadow-lg">
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
        <Card className="bg-white/90 backdrop-blur-sm border border-primary/20 shadow-lg">
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
            <Button onClick={backToDashboard} className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary/90 transition-all duration-300">
              <ChevronLeft className="h-4 w-4 mr-2" /> Back to Practice
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
        showCorrectAnswers={showCorrectAnswers}
        onShowCorrectAnswers={handleShowCorrectAnswers}
        questions={questions}
        userAnswers={answers}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const skillColor = getSkillColor(skillType);

  return (
    <motion.div 
      className="container mx-auto p-4"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full bg-${skillColor} flex items-center justify-center mr-3 shadow-md`}>
              {skillType === 'reading' && <BookOpen className="h-4 w-4 text-white" />}
              {skillType === 'writing' && <Pencil className="h-4 w-4 text-white" />}
              {skillType === 'speaking' && <Mic className="h-4 w-4 text-white" />}
              {skillType === 'listening' && <Headphones className="h-4 w-4 text-white" />}
            </div>
            <h2 className={`text-2xl font-bold text-${skillColor}`}>
              {skillType.charAt(0).toUpperCase() + skillType.slice(1)} Practice
            </h2>
          </div>
          
          {timeRemaining !== null && (
            <div className={`flex items-center bg-${skillColor}/10 px-4 py-2 rounded-full border border-${skillColor}/20 shadow-sm`}>
              <Clock className={`h-4 w-4 mr-2 text-${skillColor}`} />
              <span className={`${timeRemaining < 300 ? 'text-destructive font-bold animate-pulse' : `text-${skillColor} font-medium`}`}>
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
        
        <Progress value={progress} className={`h-2 bg-muted [&>div]:bg-${skillColor}`} />
      </div>

      <Card className={`mb-6 overflow-hidden border-${skillColor}/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm`}>
        <div className={`h-1 w-full bg-${skillColor}`}></div>
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className={`border-${skillColor}/30 hover:bg-${skillColor}/10 hover:text-${skillColor} transition-all`}
        >
          <ChevronLeft className="h-4 w-4 mr-2" /> Previous
        </Button>
        
        {currentQuestionIndex < questions.length - 1 ? (
          <Button 
            onClick={handleNext} 
            className={`bg-${skillColor} hover:bg-${skillColor}/90 transition-all`}
          >
            Next <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit} 
            variant="default" 
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary/90 transition-all duration-300"
          >
            Submit <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>

      <div className="fixed bottom-4 right-4 opacity-10 hover:opacity-30 transition-opacity">
        <div className={`bg-${skillColor}/20 p-3 rounded-full`}>
          {skillType === 'reading' && <Book className={`h-8 w-8 text-${skillColor}`} />}
          {skillType === 'writing' && <Pencil className={`h-8 w-8 text-${skillColor}`} />}
          {skillType === 'speaking' && <Mic className={`h-8 w-8 text-${skillColor}`} />}
          {skillType === 'listening' && <Headphones className={`h-8 w-8 text-${skillColor}`} />}
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionManager;
