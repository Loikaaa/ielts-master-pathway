
import React, { useState } from 'react';
import { ReadingQuestion } from '@/types/questions';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, ChevronLeft, BookOpen } from 'lucide-react';

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
  const [showPassageOnMobile, setShowPassageOnMobile] = useState(false);

  const handleAnswerChange = (subQuestionId: string, value: any) => {
    const newAnswer = { ...answer, [subQuestionId]: value };
    onAnswer(question.id, newAnswer);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
      {/* Mobile Tabs (Only visible on small screens) */}
      <div className="md:hidden w-full mb-4">
        <Tabs defaultValue="passage" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="passage" className="flex-1">Passage</TabsTrigger>
            <TabsTrigger value="questions" className="flex-1">Questions</TabsTrigger>
          </TabsList>
          <TabsContent value="passage">
            <div className="overflow-y-auto max-h-[400px] p-4 border rounded-md">
              <h2 className="text-xl font-bold mb-4">{question.passageTitle}</h2>
              <div className="prose prose-sm max-w-none">
                {question.passageText.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="questions">
            <div className="space-y-6 p-4">
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
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Desktop layout (2 columns) */}
      <div className="hidden md:block border-r overflow-y-auto max-h-[600px] p-6">
        <div className="sticky top-0 bg-background pt-1 pb-2 mb-2">
          <h2 className="text-xl font-bold">{question.passageTitle}</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Remember: In IELTS Reading, you have 60 minutes to complete all 40 questions.
            Read the passage carefully and answer questions based only on the information provided.
          </p>
        </div>
        <div className="prose prose-sm max-w-none">
          {question.passageText.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
      
      <div className="hidden md:block overflow-y-auto max-h-[600px] p-6">
        <div className="mb-4 sticky top-0 bg-background pt-1 pb-2 z-10">
          <h3 className="text-lg font-semibold">Questions</h3>
          <p className="text-xs text-muted-foreground">
            Answer all questions based only on the information in the reading passage.
            Spelling mistakes will be marked as incorrect.
          </p>
        </div>
        <div className="space-y-6">
          {question.questions.map((subQuestion, index) => (
            <div key={subQuestion.id} className="border-b pb-4">
              <h3 className="font-medium mb-3">
                <span className="inline-block w-7 text-primary font-bold">{index + 1}.</span>
                {subQuestion.questionText}
              </h3>

              {subQuestion.questionType === 'multiple-choice' && subQuestion.options && (
                <RadioGroup
                  value={answer[subQuestion.id] || ''}
                  onValueChange={(value) => handleAnswerChange(subQuestion.id, value)}
                >
                  <div className="space-y-2 pl-7">
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
                  <div className="space-y-2 pl-7">
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
                  <div className="space-y-2 pl-7">
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
                <div className="pl-7">
                  <Input
                    placeholder="Enter your answer"
                    value={answer[subQuestion.id] || ''}
                    onChange={(e) => handleAnswerChange(subQuestion.id, e.target.value)}
                    className="max-w-md"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Note: Spelling must be correct. Write exactly as in the passage.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingQuestionView;
