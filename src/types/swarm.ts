export type AgentType = 
  | 'coordinator'
  | 'email-digester'
  | 'calendar-guardian'
  | 'finance-analyst'
  | 'negotiator'
  | 'deal-hunter'
  | 'memory-reflection';

export interface Agent {
  id: string;
  type: AgentType;
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  autonomyLevel: 'manual' | 'suggest' | 'auto-pilot';
  currentTask?: string;
  lastActive?: Date;
}

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';
export type ActionType = 'approve' | 'deny' | 'info' | 'question';

export interface InboxItem {
  id: string;
  title: string;
  description: string;
  agentId: string;
  agentName: string;
  agentColor: string;
  priority: TaskPriority;
  status: TaskStatus;
  actionType: ActionType;
  createdAt: Date;
  metadata?: Record<string, unknown>;
}

export interface SwarmMessage {
  id: string;
  type: 'task' | 'result' | 'observation' | 'alert';
  fromAgentId: string;
  toAgentId?: string;
  content: string;
  timestamp: Date;
  data?: Record<string, unknown>;
}

export interface UserPreferences {
  premiumUnlocked: boolean;
  emailConnected: boolean;
  calendarConnected: boolean;
  financeConnected: boolean;
  notificationsEnabled: boolean;
  defaultAutonomy: 'manual' | 'suggest' | 'auto-pilot';
}

export const AGENT_DEFINITIONS: Omit<Agent, 'id' | 'isActive' | 'autonomyLevel'>[] = [
  {
    type: 'coordinator',
    name: 'Coordinator',
    description: 'Orchestrates all agents and manages task delegation',
    icon: 'brain',
    color: '#8B5CF6',
  },
  {
    type: 'email-digester',
    name: 'Email Digester',
    description: 'Parses emails for bills, subscriptions, and important info',
    icon: 'mail',
    color: '#3B82F6',
  },
  {
    type: 'calendar-guardian',
    name: 'Calendar Guardian',
    description: 'Manages your schedule and resolves conflicts',
    icon: 'calendar',
    color: '#06B6D4',
  },
  {
    type: 'finance-analyst',
    name: 'Finance Analyst',
    description: 'Tracks spending and predicts cash flow',
    icon: 'chart-bar',
    color: '#10B981',
  },
  {
    type: 'negotiator',
    name: 'Negotiator',
    description: 'Drafts negotiation emails and scripts',
    icon: 'message-square',
    color: '#F59E0B',
  },
  {
    type: 'deal-hunter',
    name: 'Deal Hunter',
    description: 'Finds better deals on your recurring services',
    icon: 'search',
    color: '#F43F5E',
  },
  {
    type: 'memory-reflection',
    name: 'Memory & Reflection',
    description: 'Maintains knowledge vault and generates insights',
    icon: 'lightbulb',
    color: '#A855F7',
  },
];
