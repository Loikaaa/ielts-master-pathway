import { useState } from 'react';
import { motion } from 'framer-motion';
import { Inbox, Sparkles, RefreshCw, Mail, Calendar, CreditCard, Settings, Shield, Brain } from 'lucide-react';
import { useSwarm } from '@/contexts/SwarmContext';
import { SwarmVisualization } from '@/components/swarm/AgentNode';
import { InboxList } from '@/components/inbox/InboxCard';
import { PremiumUnlockModal } from '@/components/swarm/PremiumUnlockModal';
import { Button } from '@/components/ui/Button';

export default function Dashboard() {
  const { 
    agents, 
    inboxItems, 
    preferences, 
    isSwarmActive, 
    unlockPremium, 
    resolveInboxItem, 
    triggerSwarmCycle 
  } = useSwarm();
  
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'inbox' | 'swarm' | 'settings'>('inbox');

  const handleConnectEmail = () => {
    // In real app, this would open OAuth flow
    alert('Email connection would open OAuth flow here');
  };

  const handleConnectCalendar = () => {
    alert('Calendar connection would open OAuth flow here');
  };

  const handleConnectFinance = () => {
    alert('Finance connection would allow CSV/PDF upload or Open Banking API');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 card-glass border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-xl swarm-gradient flex items-center justify-center"
                animate={{ rotate: isSwarmActive ? 360 : 0 }}
                transition={{ duration: 2, repeat: isSwarmActive ? Infinity : 0, ease: 'linear' }}
              >
                <Brain className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold">SwarmMind</h1>
                <p className="text-xs text-muted-foreground">
                  {preferences.premiumUnlocked ? 'Premium Active' : 'Free Tier'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={triggerSwarmCycle}
                disabled={isSwarmActive}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isSwarmActive ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              {!preferences.premiumUnlocked && (
                <Button
                  variant="premium"
                  size="sm"
                  onClick={() => setShowPremiumModal(true)}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Unlock
                </Button>
              )}
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab('inbox')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'inbox'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              <Inbox className="w-4 h-4 inline mr-2" />
              Inbox
              {inboxItems.filter(i => i.status !== 'cancelled').length > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-primary-foreground text-primary text-xs">
                  {inboxItems.filter(i => i.status !== 'cancelled').length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('swarm')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'swarm'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              <Brain className="w-4 h-4 inline mr-2" />
              Swarm View
              {!preferences.premiumUnlocked && <LockIcon className="w-3 h-3 inline ml-1" />}
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {activeTab === 'inbox' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Swarm Inbox</h2>
              <p className="text-muted-foreground">
                Actions your AI agents have taken or need your approval on
              </p>
            </div>
            
            <InboxList items={inboxItems} onResolve={resolveInboxItem} />
          </motion.div>
        )}
        
        {activeTab === 'swarm' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Agent Swarm</h2>
              <p className="text-muted-foreground">
                Watch your AI agents work together in real-time
              </p>
            </div>
            
            <div className="card-glass rounded-2xl p-6 mb-6">
              <SwarmVisualization agents={agents} isProcessing={isSwarmActive} />
            </div>
            
            {!preferences.premiumUnlocked && (
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Only 1 of 7 agents active. Unlock premium to activate the full swarm.
                </p>
                <Button variant="premium" onClick={() => setShowPremiumModal(true)}>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Unlock Full Swarm - $49.99
                </Button>
              </div>
            )}
          </motion.div>
        )}
        
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Settings & Integrations</h2>
              <p className="text-muted-foreground">
                Connect your accounts and configure agent behavior
              </p>
            </div>
            
            {/* Privacy Notice */}
            <div className="card-glass rounded-xl p-6 mb-6 border-l-4 border-emerald-500">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-emerald-500">Privacy First</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    All data stays on your device. No servers, no cloud, no data collection. 
                    Your AI swarm processes everything locally for complete privacy.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Integration Cards */}
            <div className="space-y-4">
              <IntegrationCard
                icon={<Mail className="w-5 h-5" />}
                title="Email"
                description="Connect Gmail or IMAP for bill detection and negotiation"
                connected={preferences.emailConnected}
                onConnect={handleConnectEmail}
                color="#3B82F6"
              />
              
              <IntegrationCard
                icon={<Calendar className="w-5 h-5" />}
                title="Calendar"
                description="Sync with Google Calendar or CalDAV for scheduling"
                connected={preferences.calendarConnected}
                onConnect={handleConnectCalendar}
                color="#06B6D4"
              />
              
              <IntegrationCard
                icon={<CreditCard className="w-5 h-5" />}
                title="Finance"
                description="Upload statements or connect Open Banking for insights"
                connected={preferences.financeConnected}
                onConnect={handleConnectFinance}
                color="#10B981"
              />
            </div>
            
            {/* Premium Status */}
            {preferences.premiumUnlocked && (
              <div className="mt-8 card-glass rounded-xl p-6 border-l-4 border-purple-500">
                <h3 className="font-semibold text-purple-500 mb-2">Premium Unlocked</h3>
                <p className="text-sm text-muted-foreground">
                  Thank you for supporting SwarmMind! All agents are now active with full autonomy.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* Premium Modal */}
      <PremiumUnlockModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onUnlock={unlockPremium}
      />
    </div>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
  );
}

interface IntegrationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  connected: boolean;
  onConnect: () => void;
  color: string;
}

function IntegrationCard({ icon, title, description, connected, onConnect, color }: IntegrationCardProps) {
  return (
    <div className="card-glass rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <Button
        variant={connected ? 'secondary' : 'default'}
        size="sm"
        onClick={onConnect}
        style={connected ? {} : { backgroundColor: color }}
      >
        {connected ? 'Connected' : 'Connect'}
      </Button>
    </div>
  );
}
