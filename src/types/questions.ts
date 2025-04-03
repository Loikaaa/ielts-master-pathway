
export interface BaseQuestion {
  id: string;
  skillType: 'reading' | 'writing' | 'speaking' | 'listening';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  timeLimit?: number; // in seconds
}

export interface ReadingQuestion extends BaseQuestion {
  skillType: 'reading';
  passageTitle: string;
  passageText: string;
  questions: {
    id: string;
    questionText: string;
    questionType: 'multiple-choice' | 'true-false-not-given' | 'yes-no-not-given' | 'matching-information' | 
                  'matching-headings' | 'matching-features' | 'matching-sentence-endings' | 'sentence-completion' |
                  'summary-completion'; // Added summary-completion
    options?: string[];
    matchingOptions?: string[];
    features?: string[];
    sentenceEndings?: string[];
    paragraphRefs?: string[];
    correctAnswer: string | string[];
  }[];
}

export interface WritingQuestion extends BaseQuestion {
  skillType: 'writing';
  taskType: 'task1' | 'task2';
  prompt: string;
  wordLimit: number;
  imageUrl?: string; // For graphs, charts, etc. in Task 1
  sampleAnswer?: string;
}

export interface SpeakingQuestion extends BaseQuestion {
  skillType: 'speaking';
  partNumber: 1 | 2 | 3;
  promptText: string;
  followUpQuestions?: string[];
  preparationTime?: number; // in seconds
  responseTime?: number; // in seconds
  sampleResponse?: string;
}

export interface ListeningQuestion extends BaseQuestion {
  skillType: 'listening';
  sectionNumber: 1 | 2 | 3 | 4;
  audioUrl: string;
  transcript: string;
  questions: {
    id: string;
    questionText: string;
    questionType: 'form-completion' | 'multiple-choice' | 'map-labeling' | 'sentence-completion';
    options?: string[];
    correctAnswer: string | string[];
  }[];
}

export type Question = ReadingQuestion | WritingQuestion | SpeakingQuestion | ListeningQuestion;
