
import React from 'react';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { FileText, Brain, BookOpen, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const RecommendedSteps: React.FC = () => {
  const { userProgress } = useUserProgress();
  const navigate = useNavigate();
  
  // Determine the weakest skills to recommend
  const skillScores = [
    { type: 'writing', score: userProgress.skillScores.writing, icon: FileText, color: 'writing', label: 'Writing' },
    { type: 'listening', score: userProgress.skillScores.listening, icon: Brain, color: 'listening', label: 'Listening' },
    { type: 'reading', score: userProgress.skillScores.reading, icon: BookOpen, color: 'reading', label: 'Reading' },
    { type: 'speaking', score: userProgress.skillScores.speaking, icon: Mic, color: 'speaking', label: 'Speaking' }
  ];
  
  // Sort by score (lowest first) to focus on weakest areas
  skillScores.sort((a, b) => a.score - b.score);
  
  // Take the top 3 weakest skills for recommendations
  const recommendations = skillScores.slice(0, 3);
  
  // Recommendation content based on skill type
  const getRecommendation = (type: string) => {
    switch (type) {
      case 'writing':
        return {
          title: 'Complete Writing Task',
          description: 'Practice Task 1 - Chart Description',
          action: () => navigate('/practice/session/writing')
        };
      case 'listening':
        return {
          title: 'Listening Practice',
          description: 'Section 3 - Academic Discussion',
          action: () => navigate('/practice/session/listening')
        };
      case 'reading':
        return {
          title: 'Reading Comprehension',
          description: 'Academic Reading - Scanning Technique',
          action: () => navigate('/practice/session/reading')
        };
      case 'speaking':
        return {
          title: 'Speaking Practice',
          description: 'Part 2 - Long Turn Task',
          action: () => navigate('/practice/session/speaking')
        };
      default:
        return {
          title: 'Vocabulary Review',
          description: 'Academic Word List - Set 3',
          action: () => navigate('/practice')
        };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {recommendations.map((skill, index) => {
        const recommendation = getRecommendation(skill.type);
        return (
          <div key={index} className={`bg-${skill.color}/10 p-4 rounded-lg`}>
            <skill.icon className={`h-6 w-6 text-${skill.color} mb-2`} />
            <h3 className="font-medium mb-1">{recommendation.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{recommendation.description}</p>
            <Button size="sm" variant="outline" className="w-full" onClick={recommendation.action}>
              Start Now
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default RecommendedSteps;
