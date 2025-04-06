
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Plus, X } from 'lucide-react';
import { Discussion } from './DiscussionBoard';

interface DiscussionFormProps {
  onSubmit: (discussion: Omit<Discussion, 'id' | 'replies' | 'likes' | 'author' | 'authorAvatar' | 'date'>) => void;
  onCancel: () => void;
  availableTags: string[];
}

const DiscussionForm: React.FC<DiscussionFormProps> = ({ onSubmit, onCancel, availableTags }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    tags?: string;
  }>({});

  const handleAddTag = (tag: string) => {
    if (!tag.trim() || tags.includes(tag)) return;
    setTags([...tags, tag]);
    setNewTag('');
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const validateForm = () => {
    const newErrors: {
      title?: string;
      content?: string;
      tags?: string;
    } = {};

    if (!title.trim()) {
      newErrors.title = 'Please enter a title for your discussion';
    } else if (title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters long';
    }

    if (!content.trim()) {
      newErrors.content = 'Please enter some content for your discussion';
    } else if (content.length < 20) {
      newErrors.content = 'Content must be at least 20 characters long';
    }

    if (tags.length === 0) {
      newErrors.tags = 'Please add at least one tag';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const discussion = {
      title,
      content,
      tags,
      comments: []
    };

    onSubmit(discussion);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center">
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              className="mr-2" 
              onClick={onCancel}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle>Create New Discussion</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a descriptive title"
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && <p className="text-destructive text-sm">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your question or share your experience in detail..."
              rows={8}
              className={errors.content ? "border-destructive" : ""}
            />
            {errors.content && <p className="text-destructive text-sm">{errors.content}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} className="bg-primary">
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex">
              <Input
                id="newTag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="mr-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag(newTag);
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => handleAddTag(newTag)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {errors.tags && <p className="text-destructive text-sm">{errors.tags}</p>}
          </div>

          <div>
            <Label>Common Tags</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {availableTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-primary/5 hover:bg-primary/10 cursor-pointer"
                  onClick={() => {
                    if (!tags.includes(tag)) {
                      setTags([...tags, tag]);
                    }
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Create Discussion
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default DiscussionForm;
