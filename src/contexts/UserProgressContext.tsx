
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for user progress tracking
export type SkillScore = {
  reading: number;
  writing: number;
  listening: number;
  speaking: number;
};

export type ProgressHistory = {
  date: string;
  scores: SkillScore;
};

export type UserActivity = {
  id: string;
  activity: string;
  result: string;
  time: string;
  timestamp: number;
  icon: string; // Using string for icon name
  color: string;
  skillType?: 'reading' | 'writing' | 'listening' | 'speaking' | 'vocabulary';
};

export type StudySession = {
  id: string;
  date: string;
  time: string;
  focus: string;
  complete: boolean;
};

export type UserProgress = {
  currentBand: number;
  targetBand: number;
  startDate: string;
  progressHistory: ProgressHistory[];
  skillScores: SkillScore;
  activities: UserActivity[];
  studyTime: {
    current: number; // in hours
    target: number;
    lastWeek: number;
  };
  studySessions: StudySession[];
  improvementAreas: {
    name: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
    progress: number;
    skillType: 'reading' | 'writing' | 'listening' | 'speaking' | 'vocabulary';
    icon: string;
  }[];
  achievements: {
    id: string;
    title: string;
    description: string;
    icon: string;
    achieved: boolean;
    date?: string;
  }[];
};

// Set initial state with zero scores
const initialProgress: UserProgress = {
  currentBand: 0,
  targetBand: 0,
  startDate: new Date().toISOString(),
  progressHistory: [
    {
      date: new Date().toISOString(),
      scores: { reading: 0, writing: 0, listening: 0, speaking: 0 }
    }
  ],
  skillScores: { reading: 0, writing: 0, listening: 0, speaking: 0 },
  activities: [],
  studyTime: {
    current: 0,
    target: 18,
    lastWeek: 0
  },
  studySessions: [],
  improvementAreas: [
    {
      name: "Writing Task 2",
      description: "Focus on essay structure and coherence",
      priority: "High",
      progress: 0,
      skillType: "writing",
      icon: "FileText"
    },
    {
      name: "Speaking Part 3",
      description: "Improve discussion on abstract topics",
      priority: "Medium",
      progress: 0,
      skillType: "speaking",
      icon: "Mic"
    },
    {
      name: "Reading Speed",
      description: "Practice skimming and scanning techniques",
      priority: "Medium",
      progress: 0,
      skillType: "reading",
      icon: "BookOpen"
    }
  ],
  achievements: [
    {
      id: "reading-master",
      title: "Reading Master",
      description: "Score 7.0 or above in Reading",
      icon: "Trophy",
      achieved: false
    },
    {
      id: "consistent-learner",
      title: "Consistent Learner",
      description: "Maintain a 7-day study streak",
      icon: "BookMarked",
      achieved: false
    },
    {
      id: "quick-improver",
      title: "Quick Improver",
      description: "Improve by 0.5 band score within a month",
      icon: "TrendingUp",
      achieved: false
    }
  ]
};

// Create context
type UserProgressContextType = {
  userProgress: UserProgress;
  updateSkillScore: (skillType: keyof SkillScore, score: number) => void;
  addActivity: (activity: Omit<UserActivity, 'id' | 'timestamp'>) => void;
  addStudySession: (session: Omit<StudySession, 'id'>) => void;
  completeStudySession: (sessionId: string) => void;
  editStudySession: (sessionId: string, updates: Partial<Omit<StudySession, 'id'>>) => void;
  deleteStudySession: (sessionId: string) => void;
  updateStudyTime: (hours: number) => void;
  viewDetailedAnalysis: () => void;
};

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export const UserProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    // Try to load user progress from localStorage
    const savedProgress = localStorage.getItem('userProgress');
    return savedProgress ? JSON.parse(savedProgress) : initialProgress;
  });

  // Save to localStorage whenever userProgress changes
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  // Update skill score and calculate overall band score
  const updateSkillScore = (skillType: keyof SkillScore, score: number) => {
    setUserProgress(prev => {
      // Update the specific skill score
      const newSkillScores = { ...prev.skillScores, [skillType]: score };
      
      // Calculate the new overall band score (average of all skills)
      const scores = Object.values(newSkillScores);
      const sum = scores.reduce((total, score) => total + score, 0);
      const newBand = parseFloat((sum / scores.length).toFixed(1));
      
      // Add to progress history if it's a new day or score changed significantly
      const today = new Date().toISOString().split('T')[0];
      const lastEntryDate = prev.progressHistory.length > 0 
        ? prev.progressHistory[prev.progressHistory.length - 1].date.split('T')[0]
        : '';
      
      let newProgressHistory = [...prev.progressHistory];
      if (today !== lastEntryDate) {
        newProgressHistory.push({
          date: new Date().toISOString(),
          scores: newSkillScores
        });
      } else {
        // Update the latest entry
        newProgressHistory[newProgressHistory.length - 1] = {
          date: new Date().toISOString(),
          scores: newSkillScores
        };
      }
      
      // Check for achievements
      const newAchievements = [...prev.achievements];
      
      // Reading Master achievement
      const readingMasterIndex = newAchievements.findIndex(a => a.id === 'reading-master');
      if (readingMasterIndex >= 0 && newSkillScores.reading >= 7.0 && !newAchievements[readingMasterIndex].achieved) {
        newAchievements[readingMasterIndex] = {
          ...newAchievements[readingMasterIndex],
          achieved: true,
          date: new Date().toISOString()
        };
        
        // Also add an activity for this achievement
        const achievementActivity: Omit<UserActivity, 'id' | 'timestamp'> = {
          activity: "Achievement Unlocked: Reading Master",
          result: "Scored 7.0 or above in Reading",
          time: new Date().toLocaleString(),
          icon: "Trophy",
          color: "primary"
        };
        addActivity(achievementActivity);
      }
      
      // Quick Improver achievement
      if (prev.progressHistory.length > 1) {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        
        // Find entry closest to one month ago
        const pastEntries = prev.progressHistory.filter(entry => 
          new Date(entry.date) <= oneMonthAgo
        );
        
        if (pastEntries.length > 0) {
          const pastEntry = pastEntries[pastEntries.length - 1];
          const pastScores = Object.values(pastEntry.scores);
          const pastSum = pastScores.reduce((total, score) => total + score, 0);
          const pastBand = pastSum / pastScores.length;
          
          const quickImproverIndex = newAchievements.findIndex(a => a.id === 'quick-improver');
          if (quickImproverIndex >= 0 && (newBand - pastBand) >= 0.5 && !newAchievements[quickImproverIndex].achieved) {
            newAchievements[quickImproverIndex] = {
              ...newAchievements[quickImproverIndex],
              achieved: true,
              date: new Date().toISOString()
            };
            
            // Also add an activity for this achievement
            const achievementActivity: Omit<UserActivity, 'id' | 'timestamp'> = {
              activity: "Achievement Unlocked: Quick Improver",
              result: "Improved by 0.5 band score within a month",
              time: new Date().toLocaleString(),
              icon: "TrendingUp",
              color: "primary"
            };
            addActivity(achievementActivity);
          }
        }
      }
      
      // Update improvement areas based on scores
      const newImprovementAreas = [...prev.improvementAreas];
      newImprovementAreas.forEach((area, index) => {
        if (area.skillType in newSkillScores) {
          const skillScore = newSkillScores[area.skillType as keyof SkillScore];
          // Higher skill score = higher progress on improvement area
          newImprovementAreas[index] = {
            ...area,
            progress: Math.min(100, skillScore * 10) // Convert score to percentage (max 100%)
          };
        }
      });
      
      return {
        ...prev,
        currentBand: newBand,
        skillScores: newSkillScores,
        progressHistory: newProgressHistory,
        achievements: newAchievements,
        improvementAreas: newImprovementAreas
      };
    });
  };

  // Add a new activity
  const addActivity = (activity: Omit<UserActivity, 'id' | 'timestamp'>) => {
    setUserProgress(prev => {
      const newActivity: UserActivity = {
        ...activity,
        id: `activity-${Date.now()}`,
        timestamp: Date.now()
      };
      
      return {
        ...prev,
        activities: [newActivity, ...prev.activities].slice(0, 20) // Keep only the 20 most recent activities
      };
    });
  };

  // Add a new study session
  const addStudySession = (session: Omit<StudySession, 'id'>) => {
    setUserProgress(prev => {
      const newSession: StudySession = {
        ...session,
        id: `session-${Date.now()}`
      };
      
      return {
        ...prev,
        studySessions: [...prev.studySessions, newSession]
      };
    });
  };

  // Mark a study session as complete
  const completeStudySession = (sessionId: string) => {
    setUserProgress(prev => {
      const updatedSessions = prev.studySessions.map(session => 
        session.id === sessionId ? { ...session, complete: true } : session
      );
      
      // Also update study time when a session is completed
      const completedSession = prev.studySessions.find(s => s.id === sessionId);
      if (completedSession && !completedSession.complete) {
        // Extract hours from time string (e.g., "2 hours" -> 2)
        const hoursMatch = completedSession.time.match(/(\d+(\.\d+)?)/);
        const hours = hoursMatch ? parseFloat(hoursMatch[1]) : 0;
        
        // Add to current study time
        const newCurrent = prev.studyTime.current + hours;
        
        // Check for Consistent Learner achievement
        // This is simplified - a real implementation would track daily activity
        const consistentLearnerIndex = prev.achievements.findIndex(a => a.id === 'consistent-learner');
        let newAchievements = [...prev.achievements];
        
        if (consistentLearnerIndex >= 0 && newCurrent >= 14 && !newAchievements[consistentLearnerIndex].achieved) {
          newAchievements[consistentLearnerIndex] = {
            ...newAchievements[consistentLearnerIndex],
            achieved: true,
            date: new Date().toISOString()
          };
          
          // Add activity for achievement
          const achievementActivity: Omit<UserActivity, 'id' | 'timestamp'> = {
            activity: "Achievement Unlocked: Consistent Learner",
            result: "Maintained a 7-day study streak",
            time: new Date().toLocaleString(),
            icon: "BookMarked",
            color: "primary"
          };
          addActivity(achievementActivity);
        }
        
        return {
          ...prev,
          studySessions: updatedSessions,
          studyTime: {
            ...prev.studyTime,
            current: newCurrent
          },
          achievements: newAchievements
        };
      }
      
      return {
        ...prev,
        studySessions: updatedSessions
      };
    });
  };

  // Edit a study session
  const editStudySession = (sessionId: string, updates: Partial<Omit<StudySession, 'id'>>) => {
    setUserProgress(prev => {
      const updatedSessions = prev.studySessions.map(session => 
        session.id === sessionId ? { ...session, ...updates } : session
      );
      
      return {
        ...prev,
        studySessions: updatedSessions
      };
    });
  };

  // Delete a study session
  const deleteStudySession = (sessionId: string) => {
    setUserProgress(prev => {
      return {
        ...prev,
        studySessions: prev.studySessions.filter(session => session.id !== sessionId)
      };
    });
  };

  // Update study time
  const updateStudyTime = (hours: number) => {
    setUserProgress(prev => {
      return {
        ...prev,
        studyTime: {
          ...prev.studyTime,
          current: prev.studyTime.current + hours
        }
      };
    });
  };

  // View detailed analysis - for now just a placeholder that would trigger navigation
  const viewDetailedAnalysis = () => {
    console.log("View detailed analysis clicked");
    // In a real app, this would navigate to a detailed analysis page
  };

  return (
    <UserProgressContext.Provider value={{
      userProgress,
      updateSkillScore,
      addActivity,
      addStudySession,
      completeStudySession,
      editStudySession,
      deleteStudySession,
      updateStudyTime,
      viewDetailedAnalysis
    }}>
      {children}
    </UserProgressContext.Provider>
  );
};

// Hook to use the user progress context
export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (context === undefined) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};
