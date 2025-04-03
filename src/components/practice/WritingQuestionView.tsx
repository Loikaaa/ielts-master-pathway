
import React from 'react';
import { WritingQuestion } from '@/types/questions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clock, HelpCircle } from 'lucide-react';

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
  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;
  const isWordLimitExceeded = wordCount > question.wordLimit;

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

        <div className="text-sm text-muted-foreground">
          Write at least {question.wordLimit} words.
        </div>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="Write your answer here..."
          className="min-h-[300px]"
          value={answer}
          onChange={(e) => onAnswer(question.id, e.target.value)}
        />

        <div className="flex justify-between items-center">
          <div className={`text-sm ${isWordLimitExceeded ? 'text-destructive' : 'text-muted-foreground'}`}>
            Word count: {wordCount} / {question.wordLimit}
          </div>
          <Button variant="outline" size="sm" className="flex items-center">
            <HelpCircle className="h-4 w-4 mr-1" />
            Writing tips
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WritingQuestionView;
