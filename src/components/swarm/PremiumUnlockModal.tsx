import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Crown, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PremiumUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: () => void;
}

export function PremiumUnlockModal({ isOpen, onClose, onUnlock }: PremiumUnlockModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const features = [
    'Full multi-agent swarm activation',
    'Automated bill negotiation',
    'Deal hunting across providers',
    'Calendar auto-scheduling',
    'Financial insights & predictions',
    'Knowledge vault with semantic search',
    'Unlimited agent autonomy levels',
  ];

  const handleUnlock = async () => {
    setIsProcessing(true);
    // Simulate purchase processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    onUnlock();
    setIsProcessing(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-lg card-glass rounded-2xl p-6 md:p-8 overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Gradient background effect */}
          <div className="absolute inset-0 swarm-gradient opacity-10" />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                className="w-20 h-20 mx-auto mb-4 rounded-full swarm-gradient flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Crown className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Unlock the Full Swarm
              </h2>
              
              <p className="text-muted-foreground mt-2">
                Activate all AI agents and unleash total life autonomy
              </p>
            </div>
            
            {/* Price */}
            <div className="text-center mb-6">
              <div className="inline-flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-bold text-foreground">$49.99</span>
                <span className="text-muted-foreground">one-time</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">No subscription. Forever yours.</p>
            </div>
            
            {/* Features list */}
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-emerald-500" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button
                variant="premium"
                size="lg"
                className="w-full relative overflow-hidden group"
                onClick={handleUnlock}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <motion.div
                    className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    <span>Unlock Swarm Now</span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                size="md"
                className="w-full"
                onClick={onClose}
                disabled={isProcessing}
              >
                Maybe Later
              </Button>
            </div>
            
            {/* Privacy guarantee */}
            <div className="mt-6 pt-6 border-t border-border text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4" />
                <span>100% on-device processing. Zero data leaves your phone.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
