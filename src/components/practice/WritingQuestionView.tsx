
import React, { useEffect, useState } from 'react';
import { WritingQuestion } from '@/types/questions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clock, HelpCircle, AlertCircle, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface WritingQuestionViewProps {
  question: WritingQuestion;
  onAnswer: (questionId: string, answer: any) => void;
  answer?: string;
}

const WritingQuestionView: React.FC<WritingQuestionViewProps> = ({
  question,
  onAnswer,
  answer = '',
}) => {
  const [wordCount, setWordCount] = useState(0);
  const isWordLimitExceeded = wordCount > question.wordLimit * 2; // Arbitrary upper limit for warning
  const isWordLimitMet = wordCount >= question.wordLimit;
  
  // Calculate word count using a more accurate method that follows IELTS rules
  useEffect(() => {
    if (!answer || answer.trim() === '') {
      setWordCount(0);
      return;
    }
    
    // Remove extra whitespace and count words according to IELTS rules
    // IELTS counts hyphenated words (e.g., "well-known") as ONE word
    // Numbers (e.g., "123") count as ONE word
    const text = answer.trim().replace(/\s+/g, ' ');
    
    // Split by spaces, but be careful with hyphenated words
    const words = text.split(' ').filter(word => word.length > 0);
    
    setWordCount(words.length);
  }, [answer]);
  
  // Calculate progress towards word limit
  const wordProgress = Math.min(100, (wordCount / question.wordLimit) * 100);

  return (
    <div>
      <div className="bg-muted/30 p-6 rounded-lg mb-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">
            {question.taskType === 'task1' ? 'Writing Task 1' : 'Writing Task 2'}
          </h2>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            {question.taskType === 'task1' ? '20 minutes' : '40 minutes'} suggested time
          </div>
        </div>

        {question.imageUrl && (
          <div className="mb-6">
            <img 
              src={question.imageUrl} 
              alt="Task visual" 
              className="max-w-full rounded-md border"
            />
          </div>
        )}

        <div className="prose prose-sm max-w-none mb-4">
          <p>{question.prompt}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-muted-foreground space-y-2 sm:space-y-0 sm:space-x-4">
          <div>
            Write at least {question.wordLimit} words. 
            {question.taskType === 'task1' 
              ? ' Spend about 20 minutes on this task.' 
              : ' Spend about 40 minutes on this task.'}
          </div>
          <div className="text-sm font-medium">
            {question.taskType === 'task1' ? 'Task 1/2' : 'Task 2/2'}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="Write your answer here..."
          className="min-h-[300px]"
          value={answer}
          onChange={(e) => onAnswer(question.id, e.target.value)}
        />

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className={`text-sm ${isWordLimitExceeded ? 'text-amber-500' : isWordLimitMet ? 'text-green-500' : 'text-muted-foreground'}`}>
              Word count: {wordCount} / {question.wordLimit} minimum
            </div>
            <Button variant="outline" size="sm" className="flex items-center">
              <HelpCircle className="h-4 w-4 mr-1" />
              Writing tips
            </Button>
          </div>
          
          <Progress 
            value={wordProgress} 
            className={`h-2 ${isWordLimitMet ? 'bg-green-200' : 'bg-muted'}`}
          />
          
          {isWordLimitMet && (
            <div className="flex items-center text-xs text-green-500">
              <Check className="h-3 w-3 mr-1" />
              You've reached the minimum word count. Continue developing your response if needed.
            </div>
          )}

          {isWordLimitExceeded && (
            <div className="flex items-center text-xs text-amber-500">
              <AlertCircle className="h-3 w-3 mr-1" />
              Your response is quite long. Focus on quality rather than quantity in IELTS writing.
            </div>
          )}

          {!isWordLimitMet && (
            <p className="text-xs text-muted-foreground">
              In IELTS, essays below the minimum word count lose marks. Aim for at least {question.wordLimit} words.
            </p>
          )}
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 text-sm text-yellow-800">
          <h4 className="font-medium mb-1">IELTS Writing Rules</h4>
          <ul className="list-disc ml-5 mt-1 space-y-1">
            <li>Full sentences only - no bullet points or lists</li>
            <li>One band score deduction if below minimum word count</li>
            <li>Hyphenated words (e.g., "well-known") count as ONE word</li>
            <li>Numbers (e.g., "123") count as ONE word</li>
            <li>Copied words from the prompt do NOT count toward your total</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WritingQuestionView;
