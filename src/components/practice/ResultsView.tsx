
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, Award, AlertCircle } from 'lucide-react';

interface ResultsViewProps {
  skillType: 'reading' | 'writing' | 'speaking' | 'listening';
  score: number;
  totalPossible: number;
  resultTime: string;
  onBackToPractice: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({
  skillType,
  score,
  totalPossible,
  resultTime,
  onBackToPractice
}) => {
  const getBandScoreEstimate = (skillType: string, percentCorrect: number): number => {
    // This is a simplified band score estimation based on IELTS scoring guidelines
    // In a real IELTS test, band scores are determined by complex formulas per section
    const percentage = (score / totalPossible) * 100;
    
    if (percentage >= 90) return 9.0;
    if (percentage >= 85) return 8.5;
    if (percentage >= 80) return 8.0;
    if (percentage >= 75) return 7.5;
    if (percentage >= 70) return 7.0;
    if (percentage >= 65) return 6.5;
    if (percentage >= 60) return 6.0;
    if (percentage >= 55) return 5.5;
    if (percentage >= 50) return 5.0;
    if (percentage >= 45) return 4.5;
    if (percentage >= 40) return 4.0;
    if (percentage >= 35) return 3.5;
    if (percentage >= 30) return 3.0;
    return 2.5;
  };
  
  const percentage = totalPossible > 0 ? Math.round((score / totalPossible) * 100) : 0;
  const bandScoreEstimate = getBandScoreEstimate(skillType, percentage);
  
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
          </CardContent>
          
          <CardFooter>
            <Button onClick={onBackToPractice} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Practice
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ResultsView;
