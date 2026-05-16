import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Agent, InboxItem, UserPreferences, AGENT_DEFINITIONS } from '@/types/swarm';
import { v4 as uuidv4 } from 'uuid';

interface SwarmContextType {
  agents: Agent[];
  inboxItems: InboxItem[];
  preferences: UserPreferences;
  isSwarmActive: boolean;
  unlockPremium: () => void;
  toggleAgent: (agentId: string) => void;
  setAgentAutonomy: (agentId: string, level: 'manual' | 'suggest' | 'auto-pilot') => void;
  addInboxItem: (item: Omit<InboxItem, 'id' | 'createdAt'>) => void;
  resolveInboxItem: (itemId: string, approved: boolean) => void;
  triggerSwarmCycle: () => Promise<void>;
}

const SwarmContext = createContext<SwarmContextType | undefined>(undefined);

const initialPreferences: UserPreferences = {
  premiumUnlocked: false,
  emailConnected: false,
  calendarConnected: false,
  financeConnected: false,
  notificationsEnabled: true,
  defaultAutonomy: 'suggest',
};

export function SwarmProvider({ children }: { children: React.ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [inboxItems, setInboxItems] = useState<InboxItem[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences);
  const [isSwarmActive, setIsSwarmActive] = useState(false);

  // Initialize with free tier (only Email Digester)
  useEffect(() => {
    const initialAgents: Agent[] = [
      {
        id: uuidv4(),
        ...AGENT_DEFINITIONS.find(a => a.type === 'email-digester')!,
        isActive: true,
        autonomyLevel: 'suggest',
      },
    ];
    
    if (preferences.premiumUnlocked) {
      // Add all agents for premium users
      AGENT_DEFINITIONS.forEach(def => {
        if (def.type !== 'email-digester') {
          initialAgents.push({
            id: uuidv4(),
            ...def,
            isActive: true,
            autonomyLevel: preferences.defaultAutonomy,
          });
        }
      });
    }
    
    setAgents(initialAgents);
  }, [preferences.premiumUnlocked, preferences.defaultAutonomy]);

  const unlockPremium = useCallback(() => {
    setPreferences(prev => ({ ...prev, premiumUnlocked: true }));
    // Activate all agents
    const allAgents: Agent[] = AGENT_DEFINITIONS.map(def => ({
      id: uuidv4(),
      ...def,
      isActive: true,
      autonomyLevel: 'suggest',
    }));
    setAgents(allAgents);
  }, []);

  const toggleAgent = useCallback((agentId: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId ? { ...agent, isActive: !agent.isActive } : agent
    ));
  }, []);

  const setAgentAutonomy = useCallback((agentId: string, level: 'manual' | 'suggest' | 'auto-pilot') => {
    setAgents(prev => prev.map(agent =>
      agent.id === agentId ? { ...agent, autonomyLevel: level } : agent
    ));
  }, []);

  const addInboxItem = useCallback((item: Omit<InboxItem, 'id' | 'createdAt'>) => {
    const newItem: InboxItem = {
      ...item,
      id: uuidv4(),
      createdAt: new Date(),
    };
    setInboxItems(prev => [newItem, ...prev]);
  }, []);

  const resolveInboxItem = useCallback((itemId: string, approved: boolean) => {
    setInboxItems(prev => prev.map(item =>
      item.id === itemId 
        ? { ...item, status: approved ? 'completed' : 'cancelled' }
        : item
    ));
  }, []);

  const triggerSwarmCycle = useCallback(async () => {
    setIsSwarmActive(true);
    
    // Simulate swarm processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Demo: Add sample inbox items based on connected services
    if (preferences.emailConnected && !preferences.premiumUnlocked) {
      addInboxItem({
        title: 'Internet Bill Detected',
        description: 'Your Comcast bill of $120 is due. Unlock Premium to enable automatic negotiation.',
        agentId: agents[0]?.id || 'unknown',
        agentName: 'Email Digester',
        agentColor: '#3B82F6',
        priority: 'medium',
        status: 'pending',
        actionType: 'info',
        metadata: { billAmount: 120, provider: 'Comcast' },
      });
    }
    
    if (preferences.premiumUnlocked) {
      // Simulate deal finding
      addInboxItem({
        title: 'Better Internet Deal Found',
        description: 'T-Mobile 5G Home Internet offers the same speed for $70/month. Save $50/month!',
        agentId: agents.find(a => a.type === 'deal-hunter')?.id || 'unknown',
        agentName: 'Deal Hunter',
        agentColor: '#F43F5E',
        priority: 'high',
        status: 'pending',
        actionType: 'approve',
        metadata: { savings: 50, newProvider: 'T-Mobile', newPrice: 70 },
      });
    }
    
    setIsSwarmActive(false);
  }, [preferences, agents, addInboxItem]);

  return (
    <SwarmContext.Provider value={{
      agents,
      inboxItems,
      preferences,
      isSwarmActive,
      unlockPremium,
      toggleAgent,
      setAgentAutonomy,
      addInboxItem,
      resolveInboxItem,
      triggerSwarmCycle,
    }}>
      {children}
    </SwarmContext.Provider>
  );
}

export function useSwarm() {
  const context = useContext(SwarmContext);
  if (context === undefined) {
    throw new Error('useSwarm must be used within a SwarmProvider');
  }
  return context;
}
