
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    timeLimit: initialData?.timeLimit ? initialData.timeLimit / 60 : 60, // Convert seconds to minutes for UI
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

  // For matching-information question type
  const updateParagraphRefs = (questionIndex: number, values: string[]) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex] = { 
      ...newQuestions[questionIndex], 
      paragraphRefs: values
    };
    setFormData({ ...formData, questions: newQuestions });
  };

  // For matching-features question type
  const updateFeatures = (questionIndex: number, values: string[]) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex] = { 
      ...newQuestions[questionIndex], 
      features: values
    };
    setFormData({ ...formData, questions: newQuestions });
  };

  // For matching-sentence-endings question type
  const updateSentenceEndings = (questionIndex: number, values: string[]) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex] = { 
      ...newQuestions[questionIndex], 
      sentenceEndings: values
    };
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleAddMatchingItem = (questionIndex: number, type: 'paragraphRefs' | 'features' | 'sentenceEndings') => {
    const newQuestions = [...formData.questions];
    const question = newQuestions[questionIndex];
    
    if (!question[type]) {
      question[type] = [];
    }
    
    question[type] = [...question[type], ''];
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleUpdateMatchingItem = (
    questionIndex: number, 
    itemIndex: number, 
    value: string, 
    type: 'paragraphRefs' | 'features' | 'sentenceEndings'
  ) => {
    const newQuestions = [...formData.questions];
    const question = newQuestions[questionIndex];
    const items = [...question[type]];
    items[itemIndex] = value;
    question[type] = items;
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleRemoveMatchingItem = (
    questionIndex: number, 
    itemIndex: number, 
    type: 'paragraphRefs' | 'features' | 'sentenceEndings'
  ) => {
    const newQuestions = [...formData.questions];
    const question = newQuestions[questionIndex];
    const items = [...question[type]];
    items.splice(itemIndex, 1);
    question[type] = items;
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate questions
    if (formData.questions.length === 0) {
      alert("Please add at least one question");
      return;
    }
    
    // Make sure every question has required fields
    for (const question of formData.questions) {
      if (!question.questionText || !question.questionType) {
        alert("Please fill in all required fields for each question");
        return;
      }
      
      if (!question.correctAnswer) {
        alert("Please specify the correct answer for each question");
        return;
      }
    }
    
    onSave(formData);
  };

  const renderQuestionTypeFields = (questionIndex: number) => {
    const question = formData.questions[questionIndex];
    const questionType = question.questionType;
    
    switch (questionType) {
      case 'multiple-choice':
        return (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Options</label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => addOption(questionIndex)}
              >
                <PlusCircle className="h-3 w-3 mr-1" />
                Add Option
              </Button>
            </div>
            
            {question.options?.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2 mb-2">
                <Input
                  value={option}
                  onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                  placeholder={`Option ${optionIndex + 1}`}
                  required
                />
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id={`correct-${optionIndex}`}
                    checked={question.correctAnswer === option}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateQuestion(questionIndex, 'correctAnswer', option);
                      }
                    }}
                  />
                  <Label htmlFor={`correct-${optionIndex}`}>Correct</Label>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeOption(questionIndex, optionIndex)}
                  disabled={question.options.length <= 2}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        );
        
      case 'true-false-not-given':
      case 'yes-no-not-given':
        const options = questionType === 'true-false-not-given'
          ? ['True', 'False', 'Not Given']
          : ['Yes', 'No', 'Not Given'];
        
        return (
          <div>
            <label className="block text-sm font-medium mb-2">Correct Answer</label>
            <RadioGroup 
              value={question.correctAnswer || options[0]}
              onValueChange={(value) => updateQuestion(questionIndex, 'correctAnswer', value)}
            >
              <div className="flex space-x-4">
                {options.map((option, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`answer-${option.toLowerCase()}`} />
                    <Label htmlFor={`answer-${option.toLowerCase()}`}>{option}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        );
        
      case 'matching-information':
        return (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Paragraph References</label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => handleAddMatchingItem(questionIndex, 'paragraphRefs')}
              >
                <PlusCircle className="h-3 w-3 mr-1" />
                Add Paragraph
              </Button>
            </div>
            
            {(question.paragraphRefs || []).map((ref, refIndex) => (
              <div key={refIndex} className="flex items-center space-x-2 mb-2">
                <Input
                  value={ref}
                  onChange={(e) => handleUpdateMatchingItem(
                    questionIndex, 
                    refIndex, 
                    e.target.value, 
                    'paragraphRefs'
                  )}
                  placeholder={`Paragraph ${refIndex + 1}`}
                  className="flex-1"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id={`correct-para-${refIndex}`}
                    checked={question.correctAnswer === ref}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateQuestion(questionIndex, 'correctAnswer', ref);
                      }
                    }}
                  />
                  <Label htmlFor={`correct-para-${refIndex}`}>Correct</Label>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleRemoveMatchingItem(
                    questionIndex, 
                    refIndex, 
                    'paragraphRefs'
                  )}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        );
        
      case 'matching-headings':
      case 'matching-features':
        const itemType = questionType === 'matching-headings' ? 'options' : 'features';
        const itemLabel = questionType === 'matching-headings' ? 'Headings' : 'Features';
        
        return (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">{itemLabel}</label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => {
                  if (questionType === 'matching-headings') {
                    addOption(questionIndex);
                  } else {
                    handleAddMatchingItem(questionIndex, 'features');
                  }
                }}
              >
                <PlusCircle className="h-3 w-3 mr-1" />
                Add {itemLabel.slice(0, -1)}
              </Button>
            </div>
            
            {(question[itemType] || []).map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center space-x-2 mb-2">
                <Input
                  value={item}
                  onChange={(e) => {
                    if (questionType === 'matching-headings') {
                      updateOption(questionIndex, itemIndex, e.target.value);
                    } else {
                      handleUpdateMatchingItem(
                        questionIndex, 
                        itemIndex, 
                        e.target.value, 
                        'features'
                      );
                    }
                  }}
                  placeholder={`${itemLabel.slice(0, -1)} ${itemIndex + 1}`}
                  className="flex-1"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id={`correct-${itemType}-${itemIndex}`}
                    checked={question.correctAnswer === item}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateQuestion(questionIndex, 'correctAnswer', item);
                      }
                    }}
                  />
                  <Label htmlFor={`correct-${itemType}-${itemIndex}`}>Correct</Label>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    if (questionType === 'matching-headings') {
                      removeOption(questionIndex, itemIndex);
                    } else {
                      handleRemoveMatchingItem(
                        questionIndex, 
                        itemIndex, 
                        'features'
                      );
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        );
        
      case 'matching-sentence-endings':
        return (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Sentence Endings</label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => handleAddMatchingItem(questionIndex, 'sentenceEndings')}
              >
                <PlusCircle className="h-3 w-3 mr-1" />
                Add Ending
              </Button>
            </div>
            
            {(question.sentenceEndings || []).map((ending, endingIndex) => (
              <div key={endingIndex} className="flex items-center space-x-2 mb-2">
                <Input
                  value={ending}
                  onChange={(e) => handleUpdateMatchingItem(
                    questionIndex, 
                    endingIndex, 
                    e.target.value, 
                    'sentenceEndings'
                  )}
                  placeholder={`Ending ${endingIndex + 1}`}
                  className="flex-1"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id={`correct-ending-${endingIndex}`}
                    checked={question.correctAnswer === ending}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateQuestion(questionIndex, 'correctAnswer', ending);
                      }
                    }}
                  />
                  <Label htmlFor={`correct-ending-${endingIndex}`}>Correct</Label>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleRemoveMatchingItem(
                    questionIndex, 
                    endingIndex, 
                    'sentenceEndings'
                  )}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        );
        
      case 'sentence-completion':
      case 'summary-completion':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Correct Answer</label>
            <Input
              value={question.correctAnswer || ''}
              onChange={(e) => updateQuestion(questionIndex, 'correctAnswer', e.target.value)}
              placeholder="Enter the correct answer"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              For multiple answer questions, separate answers with commas.
            </p>
          </div>
        );
        
      default:
        return null;
    }
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
                          <Select 
                            value={formData.questions[activeQuestionIndex]?.questionType || 'multiple-choice'}
                            onValueChange={(value) => {
                              // Reset options if changing question type
                              const newQuestion = {
                                ...formData.questions[activeQuestionIndex],
                                questionType: value,
                                correctAnswer: ''
                              };
                              
                              // Initialize specific fields based on question type
                              if (value === 'multiple-choice') {
                                newQuestion.options = ['', '', '', ''];
                              } else if (value === 'matching-headings') {
                                newQuestion.options = ['', '', '', ''];
                              } else if (value === 'matching-information') {
                                newQuestion.paragraphRefs = ['A', 'B', 'C', 'D'];
                              } else if (value === 'matching-features') {
                                newQuestion.features = ['', '', '', ''];
                              } else if (value === 'matching-sentence-endings') {
                                newQuestion.sentenceEndings = ['', '', '', ''];
                              }
                              
                              const newQuestions = [...formData.questions];
                              newQuestions[activeQuestionIndex] = newQuestion;
                              setFormData({ ...formData, questions: newQuestions });
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select question type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                              <SelectItem value="true-false-not-given">True/False/Not Given</SelectItem>
                              <SelectItem value="yes-no-not-given">Yes/No/Not Given</SelectItem>
                              <SelectItem value="matching-information">Matching Information</SelectItem>
                              <SelectItem value="matching-headings">Matching Headings</SelectItem>
                              <SelectItem value="matching-features">Matching Features</SelectItem>
                              <SelectItem value="matching-sentence-endings">Matching Sentence Endings</SelectItem>
                              <SelectItem value="sentence-completion">Sentence Completion</SelectItem>
                              <SelectItem value="summary-completion">Summary Completion</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {renderQuestionTypeFields(activeQuestionIndex)}
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
