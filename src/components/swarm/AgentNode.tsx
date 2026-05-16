import { Brain, Mail, Calendar, BarChart3, MessageSquare, Search, Lightbulb, Lock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Agent } from '@/types/swarm';

interface AgentNodeProps {
  agent: Agent;
  isCenter?: boolean;
  onClick?: () => void;
}

const iconMap = {
  brain: Brain,
  mail: Mail,
  calendar: Calendar,
  'chart-bar': BarChart3,
  'message-square': MessageSquare,
  search: Search,
  lightbulb: Lightbulb,
};

export function AgentNode({ agent, isCenter = false, onClick }: AgentNodeProps) {
  const IconComponent = iconMap[agent.icon as keyof typeof iconMap] || Zap;
  
  return (
    <motion.div
      className={`relative cursor-pointer transition-all duration-300 ${isCenter ? 'z-20' : 'z-10'}`}
      animate={agent.isActive ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
      onClick={onClick}
    >
      {/* Glow effect for active agents */}
      {agent.isActive && (
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-50"
          style={{ backgroundColor: agent.color }}
        />
      )}
      
      {/* Agent circle */}
      <div
        className={`relative flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
          isCenter ? 'w-24 h-24 md:w-32 md:h-32 border-4' : 'w-14 h-14 md:w-16 md:h-16'
        } ${agent.isActive ? 'bg-card/80' : 'bg-muted/50'} ${!agent.isActive && !isCenter ? 'grayscale' : ''}`}
        style={{ 
          borderColor: agent.isActive ? agent.color : '#475569',
          boxShadow: agent.isActive ? `0 0 20px ${agent.color}40` : 'none'
        }}
      >
        <IconComponent
          className={`${isCenter ? 'w-10 h-10 md:w-14 md:h-14' : 'w-6 h-6 md:w-7 md:h-7'}`}
          style={{ color: agent.isActive ? agent.color : '#94a3b8' }}
        />
        
        {/* Premium lock overlay */}
        {!agent.isActive && !isCenter && (
          <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-amber-500 rounded-full flex items-center justify-center">
            <Lock className="w-3 h-3 md:w-4 md:h-4 text-white" />
          </div>
        )}
      </div>
      
      {/* Agent name label */}
      <div className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap mt-2 ${isCenter ? 'top-full' : 'bottom-full mb-2'}`}>
        <span className={`text-xs md:text-sm font-medium ${isCenter ? 'text-lg' : ''} ${agent.isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
          {agent.name}
        </span>
      </div>
      
      {/* Status indicator */}
      {agent.isActive && (
        <div
          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background animate-pulse"
          style={{ backgroundColor: agent.currentTask ? '#10B981' : '#3B82F6' }}
        />
      )}
    </motion.div>
  );
}

interface SwarmVisualizationProps {
  agents: Agent[];
  isProcessing?: boolean;
}

export function SwarmVisualization({ agents, isProcessing = false }: SwarmVisualizationProps) {
  const coordinator = agents.find(a => a.type === 'coordinator');
  const otherAgents = agents.filter(a => a.type !== 'coordinator');
  
  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {/* Connection lines SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {otherAgents.map((agent, index) => {
          const angle = (index / otherAgents.length) * 2 * Math.PI;
          const radius = 120;
          const centerX = 200;
          const centerY = 200;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          
          return (
            <motion.line
              key={agent.id}
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke={agent.isActive ? agent.color : '#475569'}
              strokeWidth="2"
              strokeDasharray={agent.isActive ? '0' : '5,5'}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: agent.isActive ? 0.6 : 0.3,
                strokeDashoffset: agent.isActive && isProcessing ? 0 : undefined
              }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          );
        })}
      </svg>
      
      {/* Center Coordinator Agent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {coordinator && (
          <AgentNode 
            agent={coordinator} 
            isCenter 
          />
        )}
      </div>
      
      {/* Orbiting Agents */}
      {otherAgents.map((agent, index) => {
        const angle = (index / otherAgents.length) * 2 * Math.PI;
        const radius = 120;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={agent.id}
            className="absolute top-1/2 left-1/2"
            animate={isProcessing ? { rotate: 360 } : {}}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ x, y }}
          >
            <div style={{ transform: `rotate(${-angle * (180 / Math.PI)}deg)` }}>
              <AgentNode agent={agent} />
            </div>
          </motion.div>
        );
      })}
      
      {/* Processing overlay */}
      {isProcessing && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-48 h-48 rounded-full border-2 border-primary/30 animate-ping" />
        </motion.div>
      )}
    </div>
  );
}
