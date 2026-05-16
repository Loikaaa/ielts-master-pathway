import { Clock, CheckCircle, XCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { InboxItem } from '@/types/swarm';
import { Button } from '@/components/ui/Button';
import { formatDistanceToNow } from 'date-fns';

interface InboxCardProps {
  item: InboxItem;
  onApprove?: () => void;
  onDeny?: () => void;
}

const priorityColors = {
  low: 'border-slate-500',
  medium: 'border-blue-500',
  high: 'border-amber-500',
  urgent: 'border-red-500',
};

const priorityBgColors = {
  low: 'bg-slate-500/10',
  medium: 'bg-blue-500/10',
  high: 'bg-amber-500/10',
  urgent: 'bg-red-500/10',
};

export function InboxCard({ item, onApprove, onDeny }: InboxCardProps) {
  const statusIcon = {
    pending: <Clock className="w-4 h-4" />,
    'in-progress': <AlertCircle className="w-4 h-4 animate-pulse" />,
    completed: <CheckCircle className="w-4 h-4 text-emerald-500" />,
    cancelled: <XCircle className="w-4 h-4 text-red-500" />,
  };

  const actionButtons = item.actionType === 'approve' && item.status === 'pending' ? (
    <div className="flex gap-2 mt-4">
      <Button 
        variant="default" 
        size="sm" 
        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
        onClick={onApprove}
      >
        Approve
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        className="flex-1 border-red-500 text-red-500 hover:bg-red-500/10"
        onClick={onDeny}
      >
        Deny
      </Button>
    </div>
  ) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`card-glass rounded-xl p-4 md:p-6 border-l-4 ${priorityColors[item.priority]} transition-all duration-300 hover:border-l-8`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Agent indicator */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${item.agentColor}20` }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.agentColor }}
            />
          </div>
          
          <div>
            <h3 className="font-semibold text-base md:text-lg">{item.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span style={{ color: item.agentColor }}>{item.agentName}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                {statusIcon[item.status]}
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Priority badge */}
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${priorityBgColors[item.priority]}`}>
          {item.priority}
        </span>
      </div>
      
      {/* Description */}
      <p className="mt-3 text-muted-foreground text-sm md:text-base">
        {item.description}
      </p>
      
      {/* Timestamp */}
      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="w-3 h-3" />
        <span>{formatDistanceToNow(item.createdAt, { addSuffix: true })}</span>
      </div>
      
      {/* Action buttons */}
      {actionButtons}
      
      {/* Metadata expansion for certain types */}
      {item.metadata && Object.keys(item.metadata).length > 0 && item.status !== 'cancelled' && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="mt-4 pt-4 border-t border-border"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
            <span>View details</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

interface InboxListProps {
  items: InboxItem[];
  onResolve: (itemId: string, approved: boolean) => void;
  emptyMessage?: string;
}

export function InboxList({ items, onResolve, emptyMessage = 'No items in your inbox' }: InboxListProps) {
  const activeItems = items.filter(item => item.status !== 'cancelled');
  
  if (activeItems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground">All caught up!</h3>
        <p className="text-muted-foreground mt-1">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {activeItems.map(item => (
          <InboxCard
            key={item.id}
            item={item}
            onApprove={() => onResolve(item.id, true)}
            onDeny={() => onResolve(item.id, false)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
