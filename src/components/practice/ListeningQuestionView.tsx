
import React, { useState } from 'react';
import { ListeningQuestion } from '@/types/questions';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

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
  
  const handlePlay = () => {
    // In a real app, this would control the actual audio playback
    setAudioStatus('playing');
    
    // Simulate audio duration (5 seconds for demo)
    setTimeout(() => {
      setAudioStatus('idle');
    }, 5000);
  };
  
  const handlePause = () => {
    setAudioStatus('paused');
  };
  
  const handleAnswerChange = (subQuestionId: string, value: any) => {
    const newAnswer = { ...answer, [subQuestionId]: value };
    onAnswer(question.id, newAnswer);
  };
  
  return (
    <div>
      <div className="bg-muted/30 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-4">
          Listening Section {question.sectionNumber}
        </h2>
        
        <div className="bg-card border rounded-lg p-4 flex items-center justify-between mb-4">
          <div>
            <p className="font-medium">Audio Recording</p>
            <p className="text-sm text-muted-foreground">Listen carefully and answer the questions below</p>
          </div>
          
          <div className="flex gap-2">
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
          </div>
        </div>
        
        {showTranscript && (
          <div className="bg-background border border-dashed p-4 rounded-lg mb-4">
            <h3 className="text-sm font-medium mb-2">Transcript:</h3>
            <p className="text-sm text-muted-foreground">
              {question.transcript}
            </p>
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        {question.questions.map((subQuestion) => (
          <div key={subQuestion.id} className="border-b pb-4">
            <h3 className="font-medium mb-3">{subQuestion.questionText}</h3>
            
            {subQuestion.questionType === 'multiple-choice' && subQuestion.options && (
              <RadioGroup
                value={answer[subQuestion.id] || ''}
                onValueChange={(value) => handleAnswerChange(subQuestion.id, value)}
              >
                <div className="space-y-2">
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
              <Input
                placeholder="Enter your answer"
                value={answer[subQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(subQuestion.id, e.target.value)}
                className="max-w-md"
              />
            )}
            
            {subQuestion.questionType === 'map-labeling' && (
              <div className="space-y-4">
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
