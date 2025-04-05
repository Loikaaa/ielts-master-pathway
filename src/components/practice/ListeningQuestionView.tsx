
import React, { useState, useEffect } from 'react';
import { ListeningQuestion } from '@/types/questions';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Play, Pause, Volume2, VolumeX, Info, AlertCircle, Headphones, Clock, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from 'framer-motion';

interface ListeningQuestionViewProps {
  question: ListeningQuestion;
  onAnswer: (questionId: string, answer: any) => void;
  answer?: any;
}

const ListeningQuestionView: React.FC<ListeningQuestionViewProps> = ({
  question,
  onAnswer,
  answer = {},
}) => {
  const [audioStatus, setAudioStatus] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [showTranscript, setShowTranscript] = useState(false);
  const [audioDuration, setAudioDuration] = useState(300); // Default 5 minutes
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioTimer, setAudioTimer] = useState<NodeJS.Timeout | null>(null);
  const [audioEnded, setAudioEnded] = useState(false);
  const [transferTime, setTransferTime] = useState(false);
  
  useEffect(() => {
    return () => {
      if (audioTimer) {
        clearInterval(audioTimer);
      }
    };
  }, [audioTimer]);
  
  const handlePlay = () => {
    if (audioStatus === 'idle' || audioStatus === 'paused') {
      setAudioStatus('playing');
      
      // Simulate audio playback with a timer
      const timer = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= audioDuration) {
            clearInterval(timer);
            setAudioStatus('idle');
            setAudioEnded(true);
            setTransferTime(true);
            return audioDuration;
          }
          return prev + 1;
        });
      }, 1000);
      
      setAudioTimer(timer);
    }
  };
  
  const handlePause = () => {
    if (audioTimer) {
      clearInterval(audioTimer);
    }
    setAudioStatus('paused');
  };
  
  const handleAnswerChange = (subQuestionId: string, value: any) => {
    const newAnswer = { ...answer, [subQuestionId]: value };
    onAnswer(question.id, newAnswer);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const progressPercentage = (audioProgress / audioDuration) * 100;

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };
  
  return (
    <div>
      <motion.div 
        className="bg-gradient-to-br from-listening/20 to-listening/5 p-6 rounded-lg mb-6 border border-listening/20 shadow-inner"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold flex items-center text-listening">
              <Headphones className="mr-2 h-5 w-5" />
              Listening Section {question.sectionNumber}
            </h2>
            <p className="text-sm text-muted-foreground">
              {transferTime ? "10 minutes to transfer your answers" : "Listen carefully and answer the questions"}
            </p>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center border-listening/30 hover:bg-listening/10 text-listening hover:text-listening/90 transition-colors">
                  <Info className="h-4 w-4 mr-1" />
                  IELTS Rules
                </Button>
              </TooltipTrigger>
              <TooltipContent className="w-80 p-4 bg-white border border-listening/30">
                <h4 className="font-medium mb-2">IELTS Listening Rules:</h4>
                <ul className="text-sm list-disc ml-4 space-y-1">
                  <li>Audio plays ONCE only</li>
                  <li>30 minutes listening + 10 minutes transfer time</li>
                  <li>Write numbers as digits (e.g., "20" not "twenty")</li>
                  <li>Pay attention to plurals (e.g., "book" vs "books")</li>
                  <li>Spelling mistakes count as wrong answers</li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <motion.div 
          className="bg-card border rounded-lg p-4 mb-4 shadow-md"
          variants={fadeInUp}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="font-medium flex items-center">
                {transferTime ? (
                  <>
                    <Clock className="h-4 w-4 mr-1 text-listening" />
                    Transfer your answers
                  </>
                ) : (
                  <>
                    <Headphones className="h-4 w-4 mr-1 text-listening" />
                    Audio Recording
                  </>
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                {transferTime 
                  ? "Transfer your answers carefully to the answer sheet" 
                  : "The audio will play once only, as in the real IELTS test"}
              </p>
            </div>
            
            <div className="flex gap-2">
              {!audioEnded && (
                <>
                  {audioStatus === 'idle' || audioStatus === 'paused' ? (
                    <Button 
                      onClick={handlePlay}
                      size="sm"
                      className="flex items-center bg-listening hover:bg-listening/90 text-white transition-colors"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      {audioStatus === 'paused' ? 'Resume' : 'Play Audio'}
                    </Button>
                  ) : (
                    <Button 
                      onClick={handlePause}
                      size="sm"
                      variant="outline"
                      className="flex items-center border-listening/30 hover:bg-listening/10 text-listening"
                    >
                      <Pause className="h-4 w-4 mr-1" />
                      Pause
                    </Button>
                  )}
                </>
              )}
              
              {(process.env.NODE_ENV === 'development' || showTranscript) && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="flex items-center hover:text-listening"
                >
                  {showTranscript ? (
                    <>
                      <VolumeX className="h-4 w-4 mr-1" />
                      Hide Transcript
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4 mr-1" />
                      Show Transcript
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
          
          {(audioStatus === 'playing' || audioStatus === 'paused') && (
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between text-sm mb-1">
                <span>{formatTime(audioProgress)}</span>
                <span>{formatTime(audioDuration)}</span>
              </div>
              <Progress value={progressPercentage} className="h-2 bg-muted [&>div]:bg-listening" />
            </motion.div>
          )}
          
          {audioEnded && (
            <motion.div 
              className="mt-4 flex items-center p-3 bg-amber-50 text-amber-800 rounded border border-amber-200"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <p className="text-sm">
                {transferTime 
                  ? "You now have 10 minutes to transfer your answers." 
                  : "The audio has ended. In the real IELTS test, you would not be able to replay it."}
              </p>
            </motion.div>
          )}
        </motion.div>
        
        {showTranscript && (
          <motion.div 
            className="bg-background border border-dashed border-listening/30 p-4 rounded-lg mb-4 shadow-inner"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-sm font-medium mb-2 text-listening flex items-center">
              <Volume2 className="h-4 w-4 mr-1" />
              Transcript:
            </h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {question.transcript}
            </p>
          </motion.div>
        )}
      </motion.div>
      
      <motion.div 
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {question.questions.map((subQuestion, index) => (
          <motion.div 
            key={subQuestion.id} 
            className="border-b pb-4 last:border-b-0 hover:bg-listening/5 p-4 -mx-4 rounded-md transition-colors"
            variants={fadeInUp}
          >
            <h3 className="font-medium mb-3 flex items-start">
              <span className="inline-block w-7 text-listening font-bold">{index + 1}.</span>
              <span>{subQuestion.questionText}</span>
            </h3>
            
            {subQuestion.questionType === 'multiple-choice' && subQuestion.options && (
              <RadioGroup
                value={answer[subQuestion.id] || ''}
                onValueChange={(value) => handleAnswerChange(subQuestion.id, value)}
                className="pl-7"
              >
                <div className="space-y-3">
                  {subQuestion.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2 bg-white/50 p-2 rounded-md hover:bg-listening/5 transition-colors">
                      <RadioGroupItem 
                        value={option} 
                        id={`${subQuestion.id}-option-${idx}`} 
                        className="text-listening border-listening/50 data-[state=checked]:bg-listening data-[state=checked]:text-white"
                      />
                      <Label 
                        htmlFor={`${subQuestion.id}-option-${idx}`}
                        className="flex-grow cursor-pointer text-base"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}
            
            {(subQuestion.questionType === 'form-completion' || 
              subQuestion.questionType === 'sentence-completion') && (
              <div className="pl-7">
                <Input
                  placeholder="Enter your answer"
                  value={answer[subQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(subQuestion.id, e.target.value)}
                  className="max-w-md border-listening/30 focus:border-listening focus:ring-listening"
                />
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <Info className="h-3 w-3 mr-1 inline-flex" />
                  Note: Spelling must be correct. For numbers, use digits (e.g., "20" not "twenty").
                </p>
              </div>
            )}
            
            {subQuestion.questionType === 'map-labeling' && (
              <div className="space-y-4 pl-7">
                {/* In a real app, this would be an interactive map */}
                <div className="bg-listening/10 h-40 rounded-lg flex items-center justify-center text-muted-foreground border border-listening/20">
                  [Interactive Map Would Appear Here]
                </div>
                
                <Input
                  placeholder="Enter label"
                  value={answer[subQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(subQuestion.id, e.target.value)}
                  className="max-w-md border-listening/30 focus:border-listening focus:ring-listening"
                />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ListeningQuestionView;
