
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface ReadingQuestionFormProps {
  onSave: (formData: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const ReadingQuestionForm: React.FC<ReadingQuestionFormProps> = ({ 
  onSave, 
  onCancel,
  initialData 
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    difficulty: initialData?.difficulty || 'medium',
    passageTitle: initialData?.passageTitle || '',
    passageText: initialData?.passageText || '',
    questions: initialData?.questions || [],
    timeLimit: initialData?.timeLimit || 60,
  });

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDifficultyChange = (value: string) => {
    setFormData({ ...formData, difficulty: value });
  };

  const addQuestion = () => {
    const newQuestions = [...formData.questions];
    newQuestions.push({
      id: `q-${Date.now()}`,
      questionText: '',
      questionType: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: ''
    });
    
    setFormData({ ...formData, questions: newQuestions });
    setActiveQuestionIndex(newQuestions.length - 1);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = [...formData.questions];
    newQuestions.splice(index, 1);
    setFormData({ ...formData, questions: newQuestions });
    
    if (activeQuestionIndex >= newQuestions.length) {
      setActiveQuestionIndex(Math.max(0, newQuestions.length - 1));
    }
  };

  const updateQuestion = (index: number, key: string, value: any) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = { ...newQuestions[index], [key]: value };
    setFormData({ ...formData, questions: newQuestions });
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...formData.questions];
    const options = [...newQuestions[questionIndex].options];
    options[optionIndex] = value;
    newQuestions[questionIndex].options = options;
    setFormData({ ...formData, questions: newQuestions });
  };

  const addOption = (questionIndex: number) => {
    const newQuestions = [...formData.questions];
    const options = [...newQuestions[questionIndex].options, ''];
    newQuestions[questionIndex].options = options;
    setFormData({ ...formData, questions: newQuestions });
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...formData.questions];
    const options = [...newQuestions[questionIndex].options];
    options.splice(optionIndex, 1);
    newQuestions[questionIndex].options = options;
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Test Title</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g. Academic Reading Test 1"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Difficulty Level</label>
            <RadioGroup value={formData.difficulty} onValueChange={handleDifficultyChange}>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="easy" id="difficulty-easy" />
                  <Label htmlFor="difficulty-easy">Easy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="difficulty-medium" />
                  <Label htmlFor="difficulty-medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hard" id="difficulty-hard" />
                  <Label htmlFor="difficulty-hard">Hard</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Time Limit (minutes)</label>
            <Input
              type="number"
              name="timeLimit"
              value={formData.timeLimit}
              onChange={handleInputChange}
              min={1}
              max={120}
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Passage Title</label>
          <Input
            name="passageTitle"
            value={formData.passageTitle}
            onChange={handleInputChange}
            placeholder="Enter the title of the reading passage"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Reading Passage</label>
          <Textarea
            name="passageText"
            value={formData.passageText}
            onChange={handleInputChange}
            placeholder="Enter the reading passage text here"
            className="min-h-[200px]"
            required
          />
        </div>
        
        <div className="pt-6 border-t">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Questions</h3>
            <Button type="button" onClick={addQuestion}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
          
          {formData.questions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1 space-y-2">
                {formData.questions.map((q, index) => (
                  <div 
                    key={index}
                    className={`p-3 border rounded-md flex justify-between items-center cursor-pointer ${
                      activeQuestionIndex === index ? 'bg-primary/10 border-primary' : ''
                    }`}
                    onClick={() => setActiveQuestionIndex(index)}
                  >
                    <span>Question {index + 1}</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeQuestion(index);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="md:col-span-3">
                {formData.questions.length > 0 && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Question Text</label>
                          <Textarea
                            value={formData.questions[activeQuestionIndex]?.questionText || ''}
                            onChange={(e) => updateQuestion(activeQuestionIndex, 'questionText', e.target.value)}
                            placeholder="Enter the question text"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Question Type</label>
                          <RadioGroup 
                            value={formData.questions[activeQuestionIndex]?.questionType || 'multiple-choice'}
                            onValueChange={(value) => updateQuestion(activeQuestionIndex, 'questionType', value)}
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="multiple-choice" id="type-multiple-choice" />
                                <Label htmlFor="type-multiple-choice">Multiple Choice</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="true-false-not-given" id="type-tfng" />
                                <Label htmlFor="type-tfng">True/False/Not Given</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="matching-headings" id="type-matching" />
                                <Label htmlFor="type-matching">Matching Headings</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="summary-completion" id="type-summary" />
                                <Label htmlFor="type-summary">Summary Completion</Label>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        {['multiple-choice', 'matching-headings'].includes(formData.questions[activeQuestionIndex]?.questionType) && (
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="block text-sm font-medium">Options</label>
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                onClick={() => addOption(activeQuestionIndex)}
                              >
                                <PlusCircle className="h-3 w-3 mr-1" />
                                Add Option
                              </Button>
                            </div>
                            
                            {formData.questions[activeQuestionIndex]?.options?.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center space-x-2 mb-2">
                                <Input
                                  value={option}
                                  onChange={(e) => updateOption(activeQuestionIndex, optionIndex, e.target.value)}
                                  placeholder={`Option ${optionIndex + 1}`}
                                  required
                                />
                                <div className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`correct-${optionIndex}`}
                                    checked={formData.questions[activeQuestionIndex]?.correctAnswer === option}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        updateQuestion(activeQuestionIndex, 'correctAnswer', option);
                                      }
                                    }}
                                  />
                                  <Label htmlFor={`correct-${optionIndex}`}>Correct</Label>
                                </div>
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => removeOption(activeQuestionIndex, optionIndex)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {formData.questions[activeQuestionIndex]?.questionType === 'true-false-not-given' && (
                          <div>
                            <label className="block text-sm font-medium mb-2">Correct Answer</label>
                            <RadioGroup 
                              value={formData.questions[activeQuestionIndex]?.correctAnswer || 'True'}
                              onValueChange={(value) => updateQuestion(activeQuestionIndex, 'correctAnswer', value)}
                            >
                              <div className="flex space-x-4">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="True" id="answer-true" />
                                  <Label htmlFor="answer-true">True</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="False" id="answer-false" />
                                  <Label htmlFor="answer-false">False</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="Not Given" id="answer-not-given" />
                                  <Label htmlFor="answer-not-given">Not Given</Label>
                                </div>
                              </div>
                            </RadioGroup>
                          </div>
                        )}
                        
                        {formData.questions[activeQuestionIndex]?.questionType === 'summary-completion' && (
                          <div>
                            <label className="block text-sm font-medium mb-1">Correct Answer</label>
                            <Input
                              value={formData.questions[activeQuestionIndex]?.correctAnswer || ''}
                              onChange={(e) => updateQuestion(activeQuestionIndex, 'correctAnswer', e.target.value)}
                              placeholder="Enter the correct answer"
                              required
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center p-6 bg-accent/20 rounded-md">
              <p className="text-muted-foreground mb-2">No questions added yet</p>
              <Button type="button" onClick={addQuestion}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Your First Question
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-2 pt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Save Reading Test
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ReadingQuestionForm;
