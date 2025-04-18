
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, Award, AlertCircle, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { usePracticeResult } from '@/hooks/use-practice-result';
import { toast } from '@/hooks/use-toast';
import { Question, ReadingQuestion, ListeningQuestion } from '@/types/questions';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ResultsViewProps {
  skillType: 'reading' | 'writing' | 'speaking' | 'listening';
  score: number;
  totalPossible: number;
  resultTime: string;
  onBackToPractice: () => void;
  title?: string;
  showCorrectAnswers?: boolean;
  onShowCorrectAnswers?: () => void;
  questions?: Question[];
  userAnswers?: Record<string, any>;
}

const ResultsView: React.FC<ResultsViewProps> = ({
  skillType,
  score,
  totalPossible,
  resultTime,
  onBackToPractice,
  title,
  showCorrectAnswers = false,
  onShowCorrectAnswers,
  questions = [],
  userAnswers = {}
}) => {
  const { submitResult } = usePracticeResult();
  const [bandScoreEstimate, setBandScoreEstimate] = useState<number>(0);
  const [resultsSubmitted, setResultsSubmitted] = useState<boolean>(false);
  
  useEffect(() => {
    // Submit results automatically when the component mounts
    if (!resultsSubmitted && (skillType === 'reading' || skillType === 'listening')) {
      const bandScore = submitResult({
        skillType,
        score,
        totalPossible,
        title: title || `${skillType.charAt(0).toUpperCase() + skillType.slice(1)} Test`
      });
      
      setBandScoreEstimate(bandScore);
      setResultsSubmitted(true);
      
      toast({
        title: "Results saved",
        description: "Your performance has been recorded in your progress tracking."
      });
    }
  }, [submitResult, skillType, score, totalPossible, resultsSubmitted, title]);
  
  const percentage = totalPossible > 0 ? Math.round((score / totalPossible) * 100) : 0;
  
  const getResultDescription = () => {
    if (skillType === 'reading' || skillType === 'listening') {
      return "Your results are available now. This is an estimated band score based on your performance.";
    } else if (skillType === 'writing') {
      return "Your writing responses will be evaluated within 2 hours. Check back later for your results.";
    } else {
      return "Your speaking responses will be evaluated within 4 hours. Check back later for your results.";
    }
  };

  const getEvaluationCriteria = () => {
    if (skillType === 'writing') {
      return [
        "Task Achievement/Response",
        "Coherence and Cohesion",
        "Lexical Resource",
        "Grammatical Range and Accuracy"
      ];
    } else if (skillType === 'speaking') {
      return [
        "Fluency and Coherence",
        "Lexical Resource",
        "Grammatical Range and Accuracy",
        "Pronunciation"
      ];
    }
    return [];
  };
  
  // Handler for writing and speaking tests that need manual evaluation
  const handleSubmitForEvaluation = () => {
    // For demonstration, we'll simulate submission
    toast({
      title: "Submitted for evaluation",
      description: `Your ${skillType} test has been submitted and will be evaluated soon.`
    });
    
    // In a real application, this would send the user's responses to a backend for evaluation
    submitResult({
      skillType,
      score: Math.floor(totalPossible * 0.65), // Estimate a band 6.5 score for demonstration
      totalPossible,
      title: title || `${skillType.charAt(0).toUpperCase() + skillType.slice(1)} Test`,
      details: "Pending expert evaluation"
    });
    
    setResultsSubmitted(true);
  };

  // Function to render the correct answers section
  const renderCorrectAnswers = () => {
    if (!(skillType === 'reading' || skillType === 'listening') || !showCorrectAnswers || !questions.length) {
      return null;
    }

    return (
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-medium mb-4">Correct Answers</h3>
        <Accordion type="single" collapsible className="w-full">
          {questions.map((question, qIndex) => {
            if ((question as ReadingQuestion).questions) {
              const subQuestions = (question as ReadingQuestion | ListeningQuestion).questions;
              return (
                <AccordionItem key={qIndex} value={`question-${qIndex}`}>
                  <AccordionTrigger className="hover:bg-muted/50 px-3 py-2 rounded-md">
                    <div className="flex items-start">
                      <span className="font-medium">{question.skillType === 'reading' ? 'Reading' : 'Listening'} Questions</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2">
                    <div className="space-y-4">
                      {subQuestions.map((subQuestion, index) => {
                        const userAnswer = userAnswers[subQuestion.id];
                        const isCorrect = userAnswer === subQuestion.correctAnswer ||
                          (Array.isArray(userAnswer) && Array.isArray(subQuestion.correctAnswer) &&
                           JSON.stringify([...userAnswer].sort()) === JSON.stringify([...subQuestion.correctAnswer].sort()));
                        
                        return (
                          <div key={subQuestion.id} className="border-b pb-3 last:border-0">
                            <div className="flex items-start mb-1">
                              <div className="mt-0.5 mr-2">
                                {isCorrect ? (
                                  <Check className="h-5 w-5 text-green-500" />
                                ) : (
                                  <X className="h-5 w-5 text-red-500" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{index + 1}. {subQuestion.questionText}</p>
                                <div className="mt-1 flex flex-col space-y-1">
                                  <p className="text-sm">
                                    <span className="text-muted-foreground">Your answer: </span>
                                    <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                                      {userAnswer || "Not answered"}
                                    </span>
                                  </p>
                                  <p className="text-sm">
                                    <span className="text-muted-foreground">Correct answer: </span>
                                    <span className="text-green-600 font-medium">{subQuestion.correctAnswer}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            }
            return null;
          })}
        </Accordion>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center justify-between">
              <CardTitle className="capitalize">
                {skillType} Test Results
              </CardTitle>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{resultTime}</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="flex flex-col items-center mb-6">
              {(skillType === 'reading' || skillType === 'listening') ? (
                <>
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold">{bandScoreEstimate.toFixed(1)}</span>
                  </div>
                  <h3 className="text-lg font-medium">Estimated Band Score</h3>
                  <p className="text-sm text-muted-foreground">
                    You answered {score} out of {totalPossible} questions correctly ({percentage}%)
                  </p>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-yellow-100 rounded-full">
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-medium">Awaiting Evaluation</h3>
                </div>
              )}
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg mb-4">
              <p>{getResultDescription()}</p>
            </div>
            
            {(skillType === 'writing' || skillType === 'speaking') && (
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 text-orange-700">
                <h4 className="font-medium mb-1">{skillType === 'writing' ? 'Writing' : 'Speaking'} Evaluation in Progress</h4>
                <p className="text-sm">
                  Your {skillType} responses are being evaluated based on:
                </p>
                <ul className="text-sm list-disc ml-5 mt-2">
                  {getEvaluationCriteria().map((criteria, index) => (
                    <li key={index}>{criteria}</li>
                  ))}
                </ul>
              </div>
            )}

            {(skillType === 'reading' || skillType === 'listening') && (
              <div className="mt-6 border-t pt-4">
                <h4 className="font-medium mb-3">IELTS {skillType === 'reading' ? 'Reading' : 'Listening'} Rules:</h4>
                <ul className="text-sm list-disc ml-5">
                  {skillType === 'reading' ? (
                    <>
                      <li>40 questions must be completed in 60 minutes</li>
                      <li>Spelling mistakes count as wrong answers</li>
                      <li>Answers must match the text exactly</li>
                      <li>No extra time is given to transfer answers</li>
                    </>
                  ) : (
                    <>
                      <li>40 questions with audio played once only</li>
                      <li>30 minutes listening + 10 minutes to transfer answers</li>
                      <li>Plurals must be marked correctly (e.g., book vs. books)</li>
                      <li>Numbers should be written as digits (e.g., "20" not "twenty")</li>
                    </>
                  )}
                </ul>
              </div>
            )}

            {/* Render correct answers if showCorrectAnswers is true */}
            {showCorrectAnswers && renderCorrectAnswers()}
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button onClick={onBackToPractice} className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Practice
            </Button>
            
            {(skillType === 'writing' || skillType === 'speaking') && !resultsSubmitted && (
              <Button 
                onClick={handleSubmitForEvaluation} 
                variant="outline"
                className="w-full sm:w-auto"
              >
                Submit for Evaluation
              </Button>
            )}

            {(skillType === 'reading' || skillType === 'listening') && !showCorrectAnswers && (
              <Button 
                onClick={onShowCorrectAnswers} 
                variant="outline"
                className="w-full sm:w-auto"
              >
                Show Correct Answers
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ResultsView;
