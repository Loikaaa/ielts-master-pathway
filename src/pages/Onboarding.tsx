
import React from 'react';
import OnboardingQuiz from '@/components/OnboardingQuiz';
import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';

const Onboarding = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="flex items-center space-x-2 mb-8">
          <Book className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Neplia IELTS</span>
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <OnboardingQuiz />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
