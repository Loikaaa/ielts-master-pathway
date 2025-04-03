
import React, { useState, useEffect, useRef } from 'react';
import { SpeakingQuestion } from '@/types/questions';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Clock, AlertCircle, Check, HelpCircle, Loader } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface SpeakingQuestionViewProps {
  question: SpeakingQuestion;
  onAnswer: (questionId: string, answer: any) => void;
  answer?: any;
  audioPermissionGranted?: boolean;
}

const SpeakingQuestionView: React.FC<SpeakingQuestionViewProps> = ({
  question,
  onAnswer,
  answer,
  audioPermissionGranted = false
}) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [preparationTimeLeft, setPreparationTimeLeft] = useState(question.preparationTime || 0);
  const [responseTimeLeft, setResponseTimeLeft] = useState(question.responseTime || 0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [currentFollowUpIndex, setCurrentFollowUpIndex] = useState(0);
  const [notes, setNotes] = useState('');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  useEffect(() => {
    // Clean up audio URL when component unmounts
    return () => {
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);

  const startPreparation = () => {
    setIsPreparing(true);
    setPreparationTimeLeft(question.preparationTime || 60);
    
    const timer = setInterval(() => {
      setPreparationTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPreparing(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startRecording = async () => {
    if (!audioPermissionGranted) {
      toast({
        title: "Microphone access required",
        description: "You need to grant microphone permission to complete this section.",
        variant: "destructive"
      });
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioURL(audioUrl);
        
        // Create an answer object with audio blob and metadata
        const answer = {
          audioBlob,
          audioUrl,
          recordedAt: new Date().toISOString(),
          notes,
          followUpIndex: currentFollowUpIndex
        };
        
        onAnswer(question.id, answer);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setResponseTimeLeft(question.responseTime || 60);
      
      const timer = setInterval(() => {
        setResponseTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
              mediaRecorderRef.current.stop();
              setIsRecording(false);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
      toast({
        title: "Recording Error",
        description: "Failed to start recording. Please ensure your microphone is connected and working.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Get the current follow-up question if any
  const currentFollowUpQuestion = question.followUpQuestions && 
    question.followUpQuestions.length > 0 && 
    currentFollowUpIndex < question.followUpQuestions.length
    ? question.followUpQuestions[currentFollowUpIndex]
    : null;

  // Move to the next follow-up question
  const handleNextFollowUp = () => {
    stopRecording(); // Stop current recording if any
    
    // If we have more follow-up questions
    if (question.followUpQuestions && 
        currentFollowUpIndex < question.followUpQuestions.length - 1) {
      setCurrentFollowUpIndex(prev => prev + 1);
      // Reset audio for the new question
      setAudioBlob(null);
      setAudioURL(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/30 p-6 rounded-lg">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">
            IELTS Speaking: Part {question.partNumber}
          </h2>
          {!isRecording && !isPreparing && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {question.partNumber === 1 
                ? "4-5 minutes" 
                : question.partNumber === 2 
                  ? "3-4 minutes (including 1 minute preparation)" 
                  : "4-5 minutes"}
            </div>
          )}
          {isPreparing && (
            <div className="flex items-center text-sm font-medium">
              <Clock className="h-4 w-4 mr-1 text-orange-500" />
              Preparation: {formatTime(preparationTimeLeft)}
            </div>
          )}
          {isRecording && (
            <div className="flex items-center text-sm font-medium">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse mr-2"></div>
              Recording: {formatTime(responseTimeLeft)}
            </div>
          )}
        </div>

        <div className="prose prose-sm max-w-none mb-6">
          {question.partNumber === 2 ? (
            <div className="border p-4 rounded-md bg-card">
              <h3 className="text-base mb-3">Cue Card</h3>
              <p className="whitespace-pre-line">{question.promptText}</p>
            </div>
          ) : (
            <div>
              <p className="font-medium mb-2">
                {currentFollowUpQuestion || question.promptText}
              </p>
            </div>
          )}
        </div>

        {question.partNumber === 2 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Preparation Notes</h3>
            <textarea
              className="w-full min-h-[100px] p-3 border rounded-md bg-background"
              placeholder="Make notes here to help with your response..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isRecording}
            ></textarea>
          </div>
        )}

        <div className="space-y-4">
          {!audioPermissionGranted && (
            <div className="flex items-center p-4 text-amber-800 bg-amber-50 border-l-4 border-amber-500 rounded">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p className="text-sm">
                Microphone access is required for the speaking test. Please allow microphone access when prompted.
              </p>
            </div>
          )}

          {question.partNumber === 2 && !isPreparing && !isRecording && !audioURL && (
            <Button 
              onClick={startPreparation}
              className="w-full"
              disabled={!audioPermissionGranted}
            >
              <Clock className="mr-2 h-4 w-4" />
              Start 1 minute preparation time
            </Button>
          )}

          {isPreparing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Preparation Time</span>
                <span>{formatTime(preparationTimeLeft)}</span>
              </div>
              <Progress value={(preparationTimeLeft / (question.preparationTime || 60)) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Use this time to prepare your answer. You can take notes on the topic.
              </p>
            </div>
          )}

          <div className="flex space-x-2">
            {!isRecording && !audioURL && (
              <Button 
                onClick={startRecording} 
                className="flex-1"
                variant={isPreparing ? "default" : "outline"}
                disabled={!audioPermissionGranted || (question.partNumber === 2 && !isPreparing && preparationTimeLeft > 0)}
              >
                <Mic className="mr-2 h-4 w-4" />
                {isPreparing ? "Start Speaking" : "Record Answer"}
              </Button>
            )}
            
            {isRecording && (
              <Button 
                onClick={stopRecording} 
                variant="destructive"
                className="flex-1"
              >
                <MicOff className="mr-2 h-4 w-4" />
                Stop Recording
              </Button>
            )}
            
            {audioURL && (
              <>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setAudioURL(null)}
                >
                  <Loader className="mr-2 h-4 w-4" />
                  Retry
                </Button>
                
                {question.followUpQuestions && 
                 currentFollowUpIndex < question.followUpQuestions.length - 1 && (
                  <Button 
                    className="flex-1"
                    onClick={handleNextFollowUp}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Next Question
                  </Button>
                )}
              </>
            )}
          </div>

          {isRecording && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Recording</span>
                <span>{formatTime(responseTimeLeft)}</span>
              </div>
              <Progress value={(responseTimeLeft / (question.responseTime || 60)) * 100} className="h-2" />
              <div className="flex justify-center items-center h-12">
                <div className="h-3 w-3 rounded-full bg-red-500 animate-ping"></div>
              </div>
            </div>
          )}

          {audioURL && (
            <div className="p-4 bg-accent/30 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Your Recording</h3>
              <audio className="w-full" controls src={audioURL}></audio>
            </div>
          )}
        </div>
      </div>

      {question.followUpQuestions && question.followUpQuestions.length > 0 && (
        <div className="bg-muted/20 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Follow-up Questions</h3>
          <div className="space-y-2">
            {question.followUpQuestions.map((q, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-md ${
                  index === currentFollowUpIndex
                    ? "bg-primary/10 border border-primary"
                    : index < currentFollowUpIndex
                      ? "bg-accent/20 text-muted-foreground"
                      : "bg-card border"
                }`}
              >
                <p className="text-sm">{q}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button variant="outline" size="sm" className="flex items-center">
          <HelpCircle className="h-4 w-4 mr-1" />
          Speaking Tips
        </Button>
      </div>
    </div>
  );
};

export default SpeakingQuestionView;
