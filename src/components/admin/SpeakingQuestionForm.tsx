
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2 } from 'lucide-react';

interface SpeakingQuestionFormProps {
  onSave: (formData: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const SpeakingQuestionForm: React.FC<SpeakingQuestionFormProps> = ({ 
  onSave, 
  onCancel,
  initialData 
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    difficulty: initialData?.difficulty || 'medium',
    partNumber: initialData?.partNumber || 1,
    promptText: initialData?.promptText || '',
    followUpQuestions: initialData?.followUpQuestions || [''],
    preparationTime: initialData?.preparationTime || (initialData?.partNumber === 2 ? 60 : 0),
    responseTime: initialData?.responseTime || getDefaultResponseTime(initialData?.partNumber || 1),
    sampleResponse: initialData?.sampleResponse || '',
  });

  function getDefaultResponseTime(partNumber: number): number {
    switch (partNumber) {
      case 1: return 60;  // 1-2 minutes for part 1
      case 2: return 120; // 2 minutes for part 2
      case 3: return 300; // 5 minutes for part 3
      default: return 60;
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDifficultyChange = (value: string) => {
    setFormData({ ...formData, difficulty: value });
  };

  const handlePartNumberChange = (value: string) => {
    const partNumber = parseInt(value);
    // Update times based on part number
    const preparationTime = partNumber === 2 ? 60 : 0;
    const responseTime = getDefaultResponseTime(partNumber);
    
    setFormData({ 
      ...formData, 
      partNumber,
      preparationTime,
      responseTime
    });
  };

  const updateFollowUpQuestion = (index: number, value: string) => {
    const newFollowUpQuestions = [...formData.followUpQuestions];
    newFollowUpQuestions[index] = value;
    setFormData({ ...formData, followUpQuestions: newFollowUpQuestions });
  };

  const addFollowUpQuestion = () => {
    setFormData({ 
      ...formData, 
      followUpQuestions: [...formData.followUpQuestions, ''] 
    });
  };

  const removeFollowUpQuestion = (index: number) => {
    const newFollowUpQuestions = [...formData.followUpQuestions];
    newFollowUpQuestions.splice(index, 1);
    setFormData({ ...formData, followUpQuestions: newFollowUpQuestions });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty follow-up questions
    const filteredFollowUpQuestions = formData.followUpQuestions.filter(q => q.trim() !== '');
    onSave({
      ...formData,
      followUpQuestions: filteredFollowUpQuestions
    });
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
              placeholder="e.g. Speaking Test: Part 1 - Introduction"
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
          <label className="block text-sm font-medium mb-1">Speaking Test Part</label>
          <RadioGroup value={formData.partNumber.toString()} onValueChange={handlePartNumberChange}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="1" id="part-1" className="mt-1" />
                <div>
                  <Label htmlFor="part-1" className="font-medium">Part 1</Label>
                  <p className="text-xs text-muted-foreground">
                    Introduction and interview with general questions about familiar topics. Approximately 4-5 minutes.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="2" id="part-2" className="mt-1" />
                <div>
                  <Label htmlFor="part-2" className="font-medium">Part 2</Label>
                  <p className="text-xs text-muted-foreground">
                    Long turn. The candidate speaks for 1-2 minutes on a given topic with 1 minute preparation time.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="3" id="part-3" className="mt-1" />
                <div>
                  <Label htmlFor="part-3" className="font-medium">Part 3</Label>
                  <p className="text-xs text-muted-foreground">
                    Two-way discussion with more abstract questions related to Part 2 topic. Approximately 4-5 minutes.
                  </p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formData.partNumber === 2 && (
            <div>
              <label className="block text-sm font-medium mb-1">Preparation Time (seconds)</label>
              <Input
                type="number"
                name="preparationTime"
                value={formData.preparationTime}
                onChange={handleInputChange}
                min={0}
                max={300}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Typically 60 seconds for Part 2
              </p>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1">Response Time (seconds)</label>
            <Input
              type="number"
              name="responseTime"
              value={formData.responseTime}
              onChange={handleInputChange}
              min={10}
              max={600}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.partNumber === 1 ? 'Typically 60 seconds for Part 1 questions' : 
               formData.partNumber === 2 ? 'Typically 120 seconds (2 minutes) for Part 2' :
               'Typically 300 seconds (5 minutes) for Part 3 discussion'}
            </p>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            {formData.partNumber === 2 ? 'Topic Card/Cue Card' : 'Main Question/Prompt'}
          </label>
          <Textarea
            name="promptText"
            value={formData.promptText}
            onChange={handleInputChange}
            placeholder={formData.partNumber === 2 ? 
              "Describe a time when... You should say:\n- When this happened\n- Where you were\n- Who you were with\n- How you felt about it" : 
              "Enter the main speaking prompt or question here"
            }
            className="min-h-[150px]"
            required
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Follow-up Questions</label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={addFollowUpQuestion}
            >
              <PlusCircle className="h-3 w-3 mr-1" />
              Add Question
            </Button>
          </div>
          
          {formData.followUpQuestions.map((question, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                value={question}
                onChange={(e) => updateFollowUpQuestion(index, e.target.value)}
                placeholder={`Follow-up question ${index + 1}`}
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                onClick={() => removeFollowUpQuestion(index)}
                disabled={formData.followUpQuestions.length <= 1}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          <p className="text-xs text-muted-foreground mt-1">
            {formData.partNumber === 1 ? 'These are the examiner\'s questions about familiar topics' : 
             formData.partNumber === 2 ? 'Optional: Additional questions the examiner might ask after the long turn' :
             'These are the discussion questions for Part 3'}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Sample Response (for marking reference)</label>
          <Textarea
            name="sampleResponse"
            value={formData.sampleResponse}
            onChange={handleInputChange}
            placeholder="Enter a sample response or model answer"
            className="min-h-[150px]"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Optional: Provide examples of good responses for examiner reference
          </p>
        </div>
        
        <div className="flex justify-end space-x-2 pt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Save Speaking Task
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SpeakingQuestionForm;
