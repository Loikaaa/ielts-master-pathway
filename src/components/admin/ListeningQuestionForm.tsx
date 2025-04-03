
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface ListeningQuestionFormProps {
  onSave: (formData: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const ListeningQuestionForm: React.FC<ListeningQuestionFormProps> = ({ 
  onSave, 
  onCancel,
  initialData 
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    difficulty: initialData?.difficulty || 'medium',
    sectionNumber: initialData?.sectionNumber || 1,
    audioUrl: initialData?.audioUrl || '',
    transcript: initialData?.transcript || '',
    timeLimit: initialData?.timeLimit || 600, // 10 minutes default
    questions: initialData?.questions || [],
  });

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDifficultyChange = (value: string) => {
    setFormData({ ...formData, difficulty: value });
  };

  const handleSectionChange = (value: string) => {
    setFormData({ ...formData, sectionNumber: parseInt(value) });
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
              placeholder="e.g. Listening Test Section 1"
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
        
        <div>
          <label className="block text-sm font-medium mb-1">Section Number</label>
          <RadioGroup value={formData.sectionNumber.toString()} onValueChange={handleSectionChange}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="1" id="section-1" className="mt-1" />
                <div>
                  <Label htmlFor="section-1" className="font-medium">Section 1</Label>
                  <p className="text-xs text-muted-foreground">
                    Everyday social context dialogue
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="2" id="section-2" className="mt-1" />
                <div>
                  <Label htmlFor="section-2" className="font-medium">Section 2</Label>
                  <p className="text-xs text-muted-foreground">
                    Everyday social context monologue
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="3" id="section-3" className="mt-1" />
                <div>
                  <Label htmlFor="section-3" className="font-medium">Section 3</Label>
                  <p className="text-xs text-muted-foreground">
                    Educational/training context dialogue
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="4" id="section-4" className="mt-1" />
                <div>
                  <Label htmlFor="section-4" className="font-medium">Section 4</Label>
                  <p className="text-xs text-muted-foreground">
                    Educational/academic monologue
                  </p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Time Limit (seconds)</label>
            <Input
              type="number"
              name="timeLimit"
              value={formData.timeLimit}
              onChange={handleInputChange}
              min={60}
              max={1200}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Audio URL</label>
            <Input
              name="audioUrl"
              value={formData.audioUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/audio.mp3"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Transcript</label>
          <Textarea
            name="transcript"
            value={formData.transcript}
            onChange={handleInputChange}
            placeholder="Enter the full transcript of the audio recording"
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
                                <RadioGroupItem value="form-completion" id="type-form" />
                                <Label htmlFor="type-form">Form Completion</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="sentence-completion" id="type-sentence" />
                                <Label htmlFor="type-sentence">Sentence Completion</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="map-labeling" id="type-map" />
                                <Label htmlFor="type-map">Map/Plan Labeling</Label>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        {formData.questions[activeQuestionIndex]?.questionType === 'multiple-choice' && (
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
                        
                        {['form-completion', 'sentence-completion', 'map-labeling'].includes(
                          formData.questions[activeQuestionIndex]?.questionType
                        ) && (
                          <div>
                            <label className="block text-sm font-medium mb-1">Correct Answer</label>
                            <Input
                              value={formData.questions[activeQuestionIndex]?.correctAnswer || ''}
                              onChange={(e) => updateQuestion(activeQuestionIndex, 'correctAnswer', e.target.value)}
                              placeholder="Enter the correct answer"
                              required
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              For multiple correct answers, separate with commas
                            </p>
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
            Save Listening Test
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ListeningQuestionForm;
