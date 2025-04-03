
import React, { useState } from 'react';
import { ReadingQuestion } from '@/types/questions';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

interface ReadingQuestionViewProps {
  question: ReadingQuestion;
  onAnswer: (questionId: string, answer: any) => void;
  answer?: any;
}

const ReadingQuestionView: React.FC<ReadingQuestionViewProps> = ({
  question,
  onAnswer,
  answer = {},
}) => {
  const handleAnswerChange = (subQuestionId: string, value: any) => {
    const newAnswer = { ...answer, [subQuestionId]: value };
    onAnswer(question.id, newAnswer);
  };

  return (
    <div>
      <div className="bg-muted/30 p-6 rounded-lg mb-6 max-h-[400px] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{question.passageTitle}</h2>
        <div className="prose prose-sm max-w-none">
          {question.passageText.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {question.questions.map((subQuestion) => (
          <div key={subQuestion.id} className="border-b pb-4">
            <h3 className="font-medium mb-3">{subQuestion.questionText}</h3>

            {subQuestion.questionType === 'multiple-choice' && subQuestion.options && (
              <RadioGroup
                value={answer[subQuestion.id] || ''}
                onValueChange={(value) => handleAnswerChange(subQuestion.id, value)}
              >
                <div className="space-y-2">
                  {subQuestion.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${subQuestion.id}-option-${idx}`} />
                      <Label htmlFor={`${subQuestion.id}-option-${idx}`}>{option}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {subQuestion.questionType === 'true-false-not-given' && (
              <RadioGroup
                value={answer[subQuestion.id] || ''}
                onValueChange={(value) => handleAnswerChange(subQuestion.id, value)}
              >
                <div className="space-y-2">
                  {['True', 'False', 'Not Given'].map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${subQuestion.id}-option-${idx}`} />
                      <Label htmlFor={`${subQuestion.id}-option-${idx}`}>{option}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {subQuestion.questionType === 'matching-headings' && subQuestion.options && (
              <RadioGroup
                value={answer[subQuestion.id] || ''}
                onValueChange={(value) => handleAnswerChange(subQuestion.id, value)}
              >
                <div className="space-y-2">
                  {subQuestion.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${subQuestion.id}-option-${idx}`} />
                      <Label htmlFor={`${subQuestion.id}-option-${idx}`}>{option}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {subQuestion.questionType === 'summary-completion' && (
              <Input
                placeholder="Enter your answer"
                value={answer[subQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(subQuestion.id, e.target.value)}
                className="max-w-md"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingQuestionView;
