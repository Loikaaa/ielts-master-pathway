
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
  targetScore?: number;
  skillScores?: {
    reading: number;
    writing: number;
    speaking: number;
    listening: number;
  };
  displayName?: string;
  stories?: Array<{
    id: string;
    title: string;
    content: string;
    date: string;
    imageUrl?: string;
  }>;
}
