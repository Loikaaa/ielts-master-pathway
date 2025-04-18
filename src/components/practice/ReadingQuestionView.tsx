
import React, { useState } from 'react';
import { ReadingQuestion } from '@/types/questions';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
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
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 10;
  const totalPages = Math.ceil(question.questions.length / questionsPerPage);

  const handleAnswerChange = (subQuestionId: string, value: any) => {
    const newAnswer = { ...answer, [subQuestionId]: value };
    onAnswer(question.id, newAnswer);
  };
  
  const startIndex = currentPage * questionsPerPage;
  const endIndex = Math.min(startIndex + questionsPerPage, question.questions.length);
  const currentQuestions = question.questions.slice(startIndex, endIndex);

  // Renders different question types
  const renderQuestionInput = (subQuestion: any, index: number) => {
    switch (subQuestion.questionType) {
      case 'multiple-choice':
        return (
          <RadioGroup
            value={answer[subQuestion.id] || ''}
            onValueChange={(value) => handleAnswerChange(subQuestion.id, value)}
          >
            <div className="space-y-2 pl-7">
              {subQuestion.options?.map((option: string, idx: number) => (
                <div key={idx} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${subQuestion.id}-option-${idx}`} />
                  <Label htmlFor={`${subQuestion.id}-option-${idx}`}>{option}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );

      case 'true-false-not-given':
        return (
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
        );

      case 'yes-no-not-given':
        return (
          <RadioGroup
            value={answer[subQuestion.id] || ''}
            onValueChange={(value) => handleAnswerChange(subQuestion.id, value)}
          >
            <div className="space-y-2 pl-7">
              {['Yes', 'No', 'Not Given'].map((option, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${subQuestion.id}-option-${idx}`} />
                  <Label htmlFor={`${subQuestion.id}-option-${idx}`}>{option}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );

      case 'matching-headings':
        return (
          <Select
            value={answer[subQuestion.id] || ''}
            onValueChange={(value) => handleAnswerChange(subQuestion.id, value)}
          >
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Select a heading" />
            </SelectTrigger>
            <SelectContent>
              {subQuestion.options?.map((option: string, idx: number) => (
                <SelectItem key={idx} value={option}>
                  {idx + 1}. {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'matching-information':
        return (
          <Select
            value={answer[subQuestion.id] || ''}
            onValueChange={(value) => handleAnswerChange(subQuestion.id, value)}
          >
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Select paragraph" />
            </SelectTrigger>
            <SelectContent>
              {subQuestion.paragraphRefs?.map((paragraph: string, idx: number) => (
                <SelectItem key={idx} value={paragraph}>
                  Paragraph {paragraph}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'matching-features':
        return (
          <Select
            value={answer[subQuestion.id] || ''}
            onValueChange={(value) => handleAnswerChange(subQuestion.id, value)}
          >
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Select a feature" />
            </SelectTrigger>
            <SelectContent>
              {subQuestion.features?.map((feature: string, idx: number) => (
                <SelectItem key={idx} value={feature}>
                  {String.fromCharCode(65 + idx)}. {feature}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'matching-sentence-endings':
        return (
          <Select
            value={answer[subQuestion.id] || ''}
            onValueChange={(value) => handleAnswerChange(subQuestion.id, value)}
          >
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Select ending" />
            </SelectTrigger>
            <SelectContent>
              {subQuestion.sentenceEndings?.map((ending: string, idx: number) => (
                <SelectItem key={idx} value={ending}>
                  {String.fromCharCode(65 + idx)}. {ending}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'sentence-completion':
      case 'summary-completion':
        return (
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
        );

      default:
        return null;
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
      {/* Mobile Tabs (Only visible on small screens) */}
      <div className="md:hidden w-full mb-4">
        <Tabs defaultValue="questions" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="passage" className="flex-1">Passage</TabsTrigger>
            <TabsTrigger value="questions" className="flex-1">Questions</TabsTrigger>
          </TabsList>
          <TabsContent value="passage">
            <div className="overflow-y-auto max-h-[400px] p-4 border rounded-md">
              <h2 className="text-xl font-bold mb-4">{question.passageTitle}</h2>
              <div className="prose prose-sm max-w-none">
                {question.passageText.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">
                    <span className="font-bold text-primary">{String.fromCharCode(65 + idx)}. </span>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="questions">
            <div className="space-y-6 p-4">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="font-medium">Questions {startIndex + 1}-{endIndex} of {question.questions.length}</h3>
                <div className="text-sm text-muted-foreground">Page {currentPage + 1} of {totalPages}</div>
              </div>
              
              {currentQuestions.map((subQuestion, index) => (
                <div key={subQuestion.id} className="border-b pb-4">
                  <h3 className="font-medium mb-3">
                    <span className="inline-block w-7 text-primary font-bold">{startIndex + index + 1}.</span>
                    {subQuestion.questionText}
                  </h3>
                  {renderQuestionInput(subQuestion, startIndex + index)}
                </div>
              ))}
              
              <div className="flex justify-between mt-6 pt-2">
                <Button 
                  variant="outline" 
                  onClick={handlePrevPage} 
                  disabled={currentPage === 0}
                  size="sm"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleNextPage} 
                  disabled={currentPage === totalPages - 1}
                  size="sm"
                >
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Desktop layout (2 columns) */}
      <div className="hidden md:block border-r overflow-y-auto max-h-[600px] p-6">
        <div className="bg-background pt-1 pb-2 mb-2 sticky top-0 z-10">
          <h2 className="text-xl font-bold">{question.passageTitle}</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Remember: In IELTS Reading, you have 60 minutes to complete all 40 questions.
            Read the passage carefully and answer questions based only on the information provided.
          </p>
        </div>
        <div className="prose prose-sm max-w-none">
          {question.passageText.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">
              <span className="font-bold text-primary">{String.fromCharCode(65 + idx)}. </span>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      
      <div className="hidden md:block overflow-y-auto max-h-[600px] p-6">
        <div className="mb-4 sticky top-0 bg-background pt-1 pb-2 z-10">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Questions {startIndex + 1}-{endIndex}</h3>
            <div className="text-sm text-muted-foreground">Page {currentPage + 1} of {totalPages}</div>
          </div>
          <p className="text-xs text-muted-foreground">
            Answer all questions based only on the information in the reading passage.
            Spelling mistakes will be marked as incorrect.
          </p>
        </div>
        <div className="space-y-6">
          {currentQuestions.map((subQuestion, index) => (
            <div key={subQuestion.id} className="border-b pb-4">
              <h3 className="font-medium mb-3">
                <span className="inline-block w-7 text-primary font-bold">{startIndex + index + 1}.</span>
                {subQuestion.questionText}
              </h3>
              {renderQuestionInput(subQuestion, startIndex + index)}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-6 pt-2">
          <Button 
            variant="outline" 
            onClick={handlePrevPage} 
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          <Button 
            variant="outline" 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages - 1}
          >
            Next <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReadingQuestionView;
