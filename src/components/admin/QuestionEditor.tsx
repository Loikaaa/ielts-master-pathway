
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Trash2, Edit, Eye } from 'lucide-react';
import ReadingQuestionForm from './ReadingQuestionForm';
import WritingQuestionForm from './WritingQuestionForm';
import SpeakingQuestionForm from './SpeakingQuestionForm';
import ListeningQuestionForm from './ListeningQuestionForm';

interface QuestionEditorProps {
  questionType: 'reading' | 'writing' | 'speaking' | 'listening';
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ questionType }) => {
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'edit'>('list');
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);

  const getQuestionTypeName = () => {
    switch (questionType) {
      case 'reading': return 'Reading';
      case 'writing': return 'Writing';
      case 'speaking': return 'Speaking';
      case 'listening': return 'Listening';
      default: return '';
    }
  };

  // Mock questions data (in a real app, this would come from an API)
  const mockQuestions = [
    { id: '1', title: 'Academic Test 1', difficulty: 'medium', numQuestions: 40, created: '2025-03-15' },
    { id: '2', title: 'General Training Test 1', difficulty: 'easy', numQuestions: 38, created: '2025-03-10' },
    { id: '3', title: 'Academic Test 2', difficulty: 'hard', numQuestions: 40, created: '2025-02-28' },
  ];

  const handleAdd = () => {
    setSelectedQuestion(null);
    setActiveTab('add');
  };

  const handleEdit = (question: any) => {
    setSelectedQuestion(question);
    setActiveTab('edit');
  };

  const handleDelete = (id: string) => {
    // In a real app, this would make an API call to delete the question
    console.log(`Deleting question with ID: ${id}`);
  };

  const handleSave = (formData: any) => {
    // In a real app, this would make an API call to save the question
    console.log('Saving question data:', formData);
    setActiveTab('list');
  };

  const handleCancel = () => {
    setActiveTab('list');
  };

  const renderQuestionForm = () => {
    const props = {
      onSave: handleSave,
      onCancel: handleCancel,
      initialData: activeTab === 'edit' ? selectedQuestion : undefined
    };

    switch (questionType) {
      case 'reading':
        return <ReadingQuestionForm {...props} />;
      case 'writing':
        return <WritingQuestionForm {...props} />;
      case 'speaking':
        return <SpeakingQuestionForm {...props} />;
      case 'listening':
        return <ListeningQuestionForm {...props} />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{getQuestionTypeName()} Questions Management</CardTitle>
          {activeTab === 'list' && (
            <Button onClick={handleAdd}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New {getQuestionTypeName()} Question
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'list' | 'add' | 'edit')}>
          <TabsList className="mb-6">
            <TabsTrigger value="list">Question List</TabsTrigger>
            <TabsTrigger value="add" disabled={activeTab !== 'add'}>
              Add New Question
            </TabsTrigger>
            <TabsTrigger value="edit" disabled={activeTab !== 'edit'}>
              Edit Question
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>No. of Questions</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockQuestions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell className="font-medium">{question.title}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        question.difficulty === 'easy' ? 'bg-green-100 text-green-800' : 
                        question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{question.numQuestions}</TableCell>
                    <TableCell>{question.created}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(question)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(question.id)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="add">
            {renderQuestionForm()}
          </TabsContent>

          <TabsContent value="edit">
            {renderQuestionForm()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QuestionEditor;
