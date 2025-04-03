
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface WritingQuestionFormProps {
  onSave: (formData: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const WritingQuestionForm: React.FC<WritingQuestionFormProps> = ({ 
  onSave, 
  onCancel,
  initialData 
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    difficulty: initialData?.difficulty || 'medium',
    taskType: initialData?.taskType || 'task1',
    prompt: initialData?.prompt || '',
    wordLimit: initialData?.wordLimit || 250,
    timeLimit: initialData?.timeLimit || (initialData?.taskType === 'task2' ? 40 : 20),
    imageUrl: initialData?.imageUrl || '',
    sampleAnswer: initialData?.sampleAnswer || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDifficultyChange = (value: string) => {
    setFormData({ ...formData, difficulty: value });
  };

  const handleTaskTypeChange = (value: string) => {
    // Automatically update time limit when task type changes
    const newTimeLimit = value === 'task2' ? 40 : 20;
    const newWordLimit = value === 'task2' ? 250 : 150;
    
    setFormData({ 
      ...formData, 
      taskType: value, 
      timeLimit: newTimeLimit,
      wordLimit: newWordLimit
    });
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
              placeholder="e.g. Academic Writing Task 1"
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
          <label className="block text-sm font-medium mb-1">Task Type</label>
          <RadioGroup value={formData.taskType} onValueChange={handleTaskTypeChange}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="task1" id="task-type-1" className="mt-1" />
                <div>
                  <Label htmlFor="task-type-1" className="font-medium">Task 1</Label>
                  <p className="text-xs text-muted-foreground">
                    Describing a chart, graph, table, map, or process. Minimum 150 words in 20 minutes.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="task2" id="task-type-2" className="mt-1" />
                <div>
                  <Label htmlFor="task-type-2" className="font-medium">Task 2</Label>
                  <p className="text-xs text-muted-foreground">
                    Essay writing on a given topic. Minimum 250 words in 40 minutes.
                  </p>
                </div>
              </div>
            </div>
          </RadioGroup>
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
          
          <div>
            <label className="block text-sm font-medium mb-1">Word Limit</label>
            <Input
              type="number"
              name="wordLimit"
              value={formData.wordLimit}
              onChange={handleInputChange}
              min={50}
              max={500}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Minimum number of words the student should write
            </p>
          </div>
        </div>
        
        {formData.taskType === 'task1' && (
          <div>
            <label className="block text-sm font-medium mb-1">Image URL (for graphs, charts, maps, etc.)</label>
            <Input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Optional: Add a URL for the visual to be described
            </p>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium mb-1">Task Prompt</label>
          <Textarea
            name="prompt"
            value={formData.prompt}
            onChange={handleInputChange}
            placeholder="Enter the task prompt or question here"
            className="min-h-[150px]"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Sample Answer (for marking reference)</label>
          <Textarea
            name="sampleAnswer"
            value={formData.sampleAnswer}
            onChange={handleInputChange}
            placeholder="Enter a sample answer or model response"
            className="min-h-[200px]"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Optional: Provide a model answer that shows expected response quality
          </p>
        </div>
        
        <div className="flex justify-end space-x-2 pt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Save Writing Task
          </Button>
        </div>
      </div>
    </form>
  );
};

export default WritingQuestionForm;
