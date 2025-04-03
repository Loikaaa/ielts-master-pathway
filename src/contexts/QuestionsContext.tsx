
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
  createNewTest: (name: string, skillTypes: string[]) => string;
  getRecentQuestions: (limit?: number) => Question[];
  loading: boolean;
};

// Create the context with a default value
const QuestionsContext = createContext<QuestionsContextType>({
  questions: [],
  addQuestion: () => {},
  updateQuestion: () => {},
  deleteQuestion: () => {},
  getQuestionsByType: () => [],
  createNewTest: () => '',
  getRecentQuestions: () => [],
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

  // Initialize with stored questions or mock questions on component mount
  useEffect(() => {
    // Try to load questions from localStorage first
    const loadQuestions = async () => {
      try {
        const storedQuestions = localStorage.getItem('ieltsQuestions');
        
        if (storedQuestions) {
          console.log('Loading questions from localStorage');
          setQuestions(JSON.parse(storedQuestions));
        } else {
          console.log('No stored questions found, using mock data');
          // If no stored questions, use mock data
          setQuestions(mockQuestions);
          // Save mock questions to localStorage for future use
          localStorage.setItem('ieltsQuestions', JSON.stringify(mockQuestions));
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to load questions:', error);
        // Fallback to mock data if there's an error
        setQuestions(mockQuestions);
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  // Save questions to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      console.log('Saving questions to localStorage:', questions);
      localStorage.setItem('ieltsQuestions', JSON.stringify(questions));
    }
  }, [questions, loading]);

  // Add a new question
  const addQuestion = (question: Question) => {
    console.log('Adding question:', question);
    setQuestions(prevQuestions => {
      const newQuestions = [...prevQuestions, question];
      return newQuestions;
    });
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
  
  // Get recent questions with optional limit
  const getRecentQuestions = (limit: number = 5): Question[] => {
    // Sort questions by most recently added (assuming newer questions have higher IDs or later timestamps)
    // In a real app, you would have a createdAt field to sort by
    return [...questions]
      .sort((a, b) => {
        // Sort by ID as a proxy for creation time
        // If you have a createdAt timestamp, use that instead
        const idA = a.id.toString();
        const idB = b.id.toString();
        return idB.localeCompare(idA);
      })
      .slice(0, limit);
  };
  
  // Create a new test composed of questions from specified skill types
  const createNewTest = (name: string, skillTypes: string[]): string => {
    const testId = `test-${Date.now()}`;
    
    // In a real implementation, you would likely:
    // 1. Create a test entity in your database
    // 2. Associate selected questions with this test
    // 3. Return the test ID for navigation
    
    console.log(`Created new test: ${name} with skill types: ${skillTypes.join(', ')}`);
    
    // For now, we'll just return the test ID
    // In a real app, you'd save this to localStorage or a database
    return testId;
  };

  // Context value
  const value = {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestionsByType,
    createNewTest,
    getRecentQuestions,
    loading,
  };

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
};
