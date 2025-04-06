
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'student' | 'teacher' | 'admin';
  profileImage?: string;
  joinDate: string;
  lastLogin?: string; // Changed from Date to string for consistency
  country?: string;
  countryCode?: string;
  ipAddress?: string;
  targetScore?: string; // Changed from number to string
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
  created?: string; // Changed from Date to string for consistency
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
    timestamp: string; // Changed from Date to string for consistency
    details?: string;
  }>;
  preferences?: {
    notifications: boolean;
    emailUpdates: boolean;
    darkMode: boolean;
  };
  oauthProvider?: 'google' | 'facebook';
  oauthId?: string;
  password?: string; // Added for authentication
}

export interface AdminCredentials {
  email: string;
  password: string;
}

export interface LoginStats {
  attempts: number;
  lastAttempt: string; // Changed from Date to string for consistency
  ipAddress?: string;
  country?: string;
}

export interface UserActivity {
  userId: string;
  activity: 'login' | 'practice' | 'resource' | 'blog' | 'logout';
  timestamp: string; // Changed from Date to string for consistency
  details?: string;
  metadata?: Record<string, any>;
}

export interface OAuthResponse {
  provider: 'google' | 'facebook';
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
}
