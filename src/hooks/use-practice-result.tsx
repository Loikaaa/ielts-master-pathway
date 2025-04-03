
import { useUserProgress } from '@/contexts/UserProgressContext';
import { useCallback } from 'react';
import { BookOpen, FileText, Brain, Mic } from 'lucide-react';

// Interface for practice results
export interface PracticeResult {
  skillType: 'reading' | 'writing' | 'listening' | 'speaking';
  score: number;
  totalPossible: number;
  title?: string;
  details?: string;
}

// Hook to handle practice results
export const usePracticeResult = () => {
  const { updateSkillScore, addActivity } = useUserProgress();
  
  // Convert skillType to icon name
  const getIconForSkill = (skillType: string): string => {
    switch (skillType) {
      case 'reading': return 'BookOpen';
      case 'writing': return 'FileText';
      case 'listening': return 'Brain';
      case 'speaking': return 'Mic';
      default: return 'BookOpen';
    }
  };
  
  // Get IELTS band score from percentage
  const getBandScore = (percentage: number): number => {
    if (percentage >= 90) return 9.0;
    if (percentage >= 85) return 8.5;
    if (percentage >= 80) return 8.0;
    if (percentage >= 75) return 7.5;
    if (percentage >= 70) return 7.0;
    if (percentage >= 65) return 6.5;
    if (percentage >= 60) return 6.0;
    if (percentage >= 55) return 5.5;
    if (percentage >= 50) return 5.0;
    if (percentage >= 45) return 4.5;
    if (percentage >= 40) return 4.0;
    if (percentage >= 35) return 3.5;
    if (percentage >= 30) return 3.0;
    return 2.5;
  };
  
  // Submit practice result to update progress
  const submitResult = useCallback((result: PracticeResult) => {
    const { skillType, score, totalPossible, title } = result;
    
    // Calculate percentage and band score
    const percentage = totalPossible > 0 ? (score / totalPossible) * 100 : 0;
    const bandScore = getBandScore(percentage);
    
    // Update the user's skill score
    updateSkillScore(skillType, bandScore);
    
    // Record the activity
    addActivity({
      activity: title || `Completed ${skillType.charAt(0).toUpperCase() + skillType.slice(1)} Practice`,
      result: `${score}/${totalPossible} questions (Band ${bandScore.toFixed(1)})`,
      time: new Date().toLocaleString(),
      icon: getIconForSkill(skillType),
      color: skillType,
      skillType
    });
    
    // Return the calculated band score for use in the UI
    return bandScore;
  }, [updateSkillScore, addActivity]);
  
  return { submitResult };
};

// Export a function to use in ResultsView.tsx
export const submitPracticeResult = (result: PracticeResult) => {
  const { submitResult } = usePracticeResult();
  return submitResult(result);
};
