
import React, { useState, useRef } from 'react';
import { SpeakingQuestion } from '@/types/questions';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Mic, MicOff, Play, Square } from 'lucide-react';

interface SpeakingQuestionViewProps {
  question: SpeakingQuestion;
  onAnswer: (questionId: string, answer: any) => void;
  answer?: {
    audioBlob?: Blob;
    recordingStatus: 'idle' | 'recording' | 'recorded' | 'playing';
  };
}

const SpeakingQuestionView: React.FC<SpeakingQuestionViewProps> = ({
  question,
  onAnswer,
  answer = { recordingStatus: 'idle' },
}) => {
  const [preparationTimeLeft, setPreparationTimeLeft] = useState<number | null>(
    question.preparationTime || null
  );
  const [responseTimeLeft, setResponseTimeLeft] = useState<number | null>(null);
  const [isPreparationActive, setIsPreparationActive] = useState(false);
  
  // For a real app, implement actual audio recording functionality
  const handleStartPreparation = () => {
    if (!question.preparationTime) return;
    
    setIsPreparationActive(true);
    setPreparationTimeLeft(question.preparationTime);
    
    const timer = setInterval(() => {
      setPreparationTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          setIsPreparationActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const handleStartRecording = () => {
    // In a real app, this would start the actual recording
    onAnswer(question.id, { ...answer, recordingStatus: 'recording' });
    
    if (question.responseTime) {
      setResponseTimeLeft(question.responseTime);
      
      const timer = setInterval(() => {
        setResponseTimeLeft((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timer);
            handleStopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };
  
  const handleStopRecording = () => {
    // In a real app, this would stop the recording and save the audio blob
    onAnswer(question.id, { ...answer, recordingStatus: 'recorded' });
    setResponseTimeLeft(null);
  };
  
  const handlePlayRecording = () => {
    // In a real app, this would play the recorded audio
    onAnswer(question.id, { ...answer, recordingStatus: 'playing' });
    setTimeout(() => {
      onAnswer(question.id, { ...answer, recordingStatus: 'recorded' });
    }, 3000);
  };
  
  const formatTime = (seconds: number | null): string => {
    if (seconds === null) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div>
      <div className="bg-muted/30 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-4">
          Speaking Part {question.partNumber}
        </h2>
        
        <div className="prose prose-sm max-w-none mb-6">
          <p className="font-medium">{question.promptText}</p>
          
          {question.followUpQuestions && question.followUpQuestions.length > 0 && (
            <div className="mt-4">
              <h3 className="text-base font-medium mb-2">Follow-up Questions:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {question.followUpQuestions.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        {question.preparationTime && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Preparation Time</h3>
              <span className="font-mono">{formatTime(preparationTimeLeft)}</span>
            </div>
            
            <Progress 
              value={isPreparationActive && question.preparationTime
                ? ((question.preparationTime - (preparationTimeLeft || 0)) / question.preparationTime) * 100
                : 0
              } 
            />
            
            <Button 
              onClick={handleStartPreparation}
              disabled={isPreparationActive || answer.recordingStatus !== 'idle'}
              className="w-full"
            >
              Start Preparation
            </Button>
          </div>
        )}
        
        <div className="border-t pt-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Speaking Response</h3>
              {responseTimeLeft !== null && (
                <span className="font-mono">{formatTime(responseTimeLeft)}</span>
              )}
            </div>
            
            {question.responseTime && responseTimeLeft !== null && (
              <Progress 
                value={((question.responseTime - responseTimeLeft) / question.responseTime) * 100} 
                className="mb-4"
              />
            )}
            
            <div className="flex justify-center gap-4">
              {answer.recordingStatus === 'idle' && (
                <Button 
                  onClick={handleStartRecording}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <Mic className="h-5 w-5 mr-2" />
                  Start Recording
                </Button>
              )}
              
              {answer.recordingStatus === 'recording' && (
                <Button 
                  onClick={handleStopRecording}
                  variant="outline"
                  className="border-red-500 text-red-500"
                >
                  <Square className="h-5 w-5 mr-2" />
                  Stop Recording
                </Button>
              )}
              
              {answer.recordingStatus === 'recorded' && (
                <>
                  <Button 
                    onClick={handlePlayRecording}
                    variant="outline"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Play Recording
                  </Button>
                  
                  <Button 
                    onClick={handleStartRecording}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Mic className="h-5 w-5 mr-2" />
                    Record Again
                  </Button>
                </>
              )}
              
              {answer.recordingStatus === 'playing' && (
                <Button 
                  disabled
                  variant="outline"
                >
                  <Play className="h-5 w-5 mr-2 animate-pulse" />
                  Playing...
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakingQuestionView;
