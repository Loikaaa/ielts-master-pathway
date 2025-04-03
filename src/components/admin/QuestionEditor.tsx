import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Trash2, Edit, Eye } from 'lucide-react';
import ReadingQuestionForm from './ReadingQuestionForm';
import WritingQuestionForm from './WritingQuestionForm';
import SpeakingQuestionForm from './SpeakingQuestionForm';
import ListeningQuestionForm from './ListeningQuestionForm';
import { useToast } from '@/components/ui/use-toast';
import { useQuestions } from '@/contexts/QuestionsContext';
import { Question } from '@/types/questions';

interface QuestionEditorProps {
  questionType: 'reading' | 'writing' | 'speaking' | 'listening';
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ questionType }) => {
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'edit'>('list');
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const { toast } = useToast();
  const { questions, addQuestion, updateQuestion, deleteQuestion, getQuestionsByType } = useQuestions();
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const questionsByType = getQuestionsByType(questionType);
    setFilteredQuestions(questionsByType);
    console.log(`Loaded ${questionsByType.length} ${questionType} questions:`, questionsByType);
  }, [questionType, questions, getQuestionsByType]);

  const getQuestionTypeName = () => {
    switch (questionType) {
      case 'reading': return 'Reading';
      case 'writing': return 'Writing';
      case 'speaking': return 'Speaking';
      case 'listening': return 'Listening';
      default: return '';
    }
  };

  const handleAdd = () => {
    setSelectedQuestion(null);
    setActiveTab('add');
  };

  const handleEdit = (question: any) => {
    setSelectedQuestion(question);
    setActiveTab('edit');
  };

  const handleDelete = (id: string) => {
    deleteQuestion(id);
    
    toast({
      title: "Question Deleted",
      description: "The question has been successfully deleted.",
    });
  };

  const handleSave = (formData: any) => {
    console.log('Saving question data:', formData);
    
    const newQuestion: Question = {
      ...formData,
      id: activeTab === 'edit' && selectedQuestion ? selectedQuestion.id : `${questionType}-${Date.now()}`,
      skillType: questionType,
      points: formData.points || 10,
      timeLimit: formData.timeLimit * 60 || 3600,
    };
    
    if (activeTab === 'edit' && selectedQuestion) {
      updateQuestion(selectedQuestion.id, newQuestion);
      toast({
        title: "Question Updated",
        description: "The question has been successfully updated.",
      });
    } else {
      addQuestion(newQuestion);
      toast({
        title: "Question Added",
        description: "The new question has been successfully added.",
      });
    }
    
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

  const getQuestionDetails = (question: Question) => {
    switch (questionType) {
      case 'reading':
        const readingQ = question as any;
        return {
          title: readingQ.passageTitle || 'Untitled Reading Test',
          numQuestions: readingQ.questions?.length || 0,
        };
      case 'writing':
        const writingQ = question as any;
        return {
          title: writingQ.prompt?.substring(0, 50) + '...' || 'Untitled Writing Test',
          numQuestions: 1,
        };
      case 'speaking':
        const speakingQ = question as any;
        return {
          title: `Speaking Part ${speakingQ.partNumber}`,
          numQuestions: speakingQ.followUpQuestions?.length || 1,
        };
      case 'listening':
        const listeningQ = question as any;
        return {
          title: `Listening Section ${listeningQ.sectionNumber}`,
          numQuestions: listeningQ.questions?.length || 0,
        };
      default:
        return {
          title: 'Untitled',
          numQuestions: 0,
        };
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
            {filteredQuestions.length > 0 ? (
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
                  {filteredQuestions.map((question) => {
                    const details = getQuestionDetails(question);
                    const createdDate = new Date().toISOString().split('T')[0];
                    
                    return (
                      <TableRow key={question.id}>
                        <TableCell className="font-medium">{details.title}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            question.difficulty === 'easy' ? 'bg-green-100 text-green-800' : 
                            question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>{details.numQuestions}</TableCell>
                        <TableCell>{createdDate}</TableCell>
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
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center p-6 bg-accent/20 rounded-md">
                <p className="text-muted-foreground mb-2">No {getQuestionTypeName()} questions found</p>
                <Button onClick={handleAdd}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Your First Question
                </Button>
              </div>
            )}
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
