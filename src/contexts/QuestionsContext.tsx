
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Question } from '@/types/questions';
import { mockQuestions } from '@/data/mockQuestions';

// Define the context type
type QuestionsContextType = {
  questions: Question[];
  addQuestion: (question: Question) => void;
  updateQuestion: (id: string, updatedQuestion: Question) => void;
  deleteQuestion: (id: string) => void;
  getQuestionsByType: (skillType: string) => Question[];
  loading: boolean;
};

// Create the context with a default value
const QuestionsContext = createContext<QuestionsContextType>({
  questions: [],
  addQuestion: () => {},
  updateQuestion: () => {},
  deleteQuestion: () => {},
  getQuestionsByType: () => [],
  loading: true,
});

// Custom hook to use the questions context
export const useQuestions = () => useContext(QuestionsContext);

// Props type for the provider component
type QuestionsProviderProps = {
  children: ReactNode;
};

// Provider component
export const QuestionsProvider: React.FC<QuestionsProviderProps> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize with mock questions on component mount
  useEffect(() => {
    // Simulate loading data from an API
    const loadQuestions = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we're using the mock data
        setQuestions(mockQuestions);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load questions:', error);
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  // Add a new question
  const addQuestion = (question: Question) => {
    console.log('Adding question:', question);
    setQuestions(prevQuestions => [...prevQuestions, question]);
  };

  // Update an existing question
  const updateQuestion = (id: string, updatedQuestion: Question) => {
    console.log('Updating question:', id, updatedQuestion);
    setQuestions(prevQuestions =>
      prevQuestions.map(q => (q.id === id ? updatedQuestion : q))
    );
  };

  // Delete a question
  const deleteQuestion = (id: string) => {
    console.log('Deleting question:', id);
    setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
  };

  // Get questions by skill type
  const getQuestionsByType = (skillType: string): Question[] => {
    return questions.filter(q => q.skillType === skillType);
  };

  // Context value
  const value = {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestionsByType,
    loading,
  };

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
};
