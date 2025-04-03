
import React, { useState, useEffect } from 'react';
import { ListeningQuestion } from '@/types/questions';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Play, Pause, Volume2, VolumeX, Info, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  
  return (
    <div>
      <div className="bg-muted/30 p-6 rounded-lg mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold">
              Listening Section {question.sectionNumber}
            </h2>
            <p className="text-sm text-muted-foreground">
              {transferTime ? "10 minutes to transfer your answers" : "Listen carefully and answer the questions"}
            </p>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Info className="h-4 w-4 mr-1" />
                  IELTS Rules
                </Button>
              </TooltipTrigger>
              <TooltipContent className="w-80 p-4">
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
        
        <div className="bg-card border rounded-lg p-4 mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="font-medium">{transferTime ? "Transfer your answers" : "Audio Recording"}</p>
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
                      className="flex items-center"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      {audioStatus === 'paused' ? 'Resume' : 'Play Audio'}
                    </Button>
                  ) : (
                    <Button 
                      onClick={handlePause}
                      size="sm"
                      variant="outline"
                      className="flex items-center"
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
                  className="flex items-center"
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
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{formatTime(audioProgress)}</span>
                <span>{formatTime(audioDuration)}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}
          
          {audioEnded && (
            <div className="mt-4 flex items-center p-2 bg-amber-50 text-amber-800 rounded">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <p className="text-sm">
                {transferTime 
                  ? "You now have 10 minutes to transfer your answers." 
                  : "The audio has ended. In the real IELTS test, you would not be able to replay it."}
              </p>
            </div>
          )}
        </div>
        
        {showTranscript && (
          <div className="bg-background border border-dashed p-4 rounded-lg mb-4">
            <h3 className="text-sm font-medium mb-2">Transcript:</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {question.transcript}
            </p>
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        {question.questions.map((subQuestion, index) => (
          <div key={subQuestion.id} className="border-b pb-4">
            <h3 className="font-medium mb-3">
              <span className="inline-block w-7 text-primary font-bold">{index + 1}.</span>
              {subQuestion.questionText}
            </h3>
            
            {subQuestion.questionType === 'multiple-choice' && subQuestion.options && (
              <RadioGroup
                value={answer[subQuestion.id] || ''}
                onValueChange={(value) => handleAnswerChange(subQuestion.id, value)}
              >
                <div className="space-y-2 pl-7">
                  {subQuestion.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${subQuestion.id}-option-${idx}`} />
                      <Label htmlFor={`${subQuestion.id}-option-${idx}`}>{option}</Label>
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
                  className="max-w-md"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Note: Spelling must be correct. For numbers, use digits (e.g., "20" not "twenty").
                </p>
              </div>
            )}
            
            {subQuestion.questionType === 'map-labeling' && (
              <div className="space-y-4 pl-7">
                {/* In a real app, this would be an interactive map */}
                <div className="bg-muted h-40 rounded flex items-center justify-center text-muted-foreground">
                  [Interactive Map Would Appear Here]
                </div>
                
                <Input
                  placeholder="Enter label"
                  value={answer[subQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(subQuestion.id, e.target.value)}
                  className="max-w-md"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeningQuestionView;
