
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'student' | 'teacher' | 'admin';
  profileImage?: string;
  joinDate: string;
  lastLogin?: string;
  country?: string;
  countryCode?: string;
  ipAddress?: string;
  targetScore?: number;
  examDate?: string;
  testType?: string;
  skillScores?: {
    reading: number;
    writing: number;
    speaking: number;
    listening: number;
  };
  displayName?: string;
  isAdmin?: boolean;
  created?: Date;
  stories?: Array<{
    id: string;
    title: string;
    content: string;
    date: string;
    imageUrl?: string;
  }>;
  recentActivity?: Array<{
    id: string;
    type: 'practice' | 'blog' | 'resource' | 'login';
    timestamp: Date;
    details?: string;
  }>;
  preferences?: {
    notifications: boolean;
    emailUpdates: boolean;
    darkMode: boolean;
  };
}

export interface AdminCredentials {
  email: string;
  password: string;
}

export interface LoginStats {
  attempts: number;
  lastAttempt: Date;
  ipAddress?: string;
  country?: string;
}

export interface UserActivity {
  userId: string;
  activity: 'login' | 'practice' | 'resource' | 'blog' | 'logout';
  timestamp: Date;
  details?: string;
  metadata?: Record<string, any>;
}
