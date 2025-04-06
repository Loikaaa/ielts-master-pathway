
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuestionManager from '@/components/practice/QuestionManager';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Clock, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuestions } from '@/contexts/QuestionsContext';

const PracticeSession = () => {
  const { skillType } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { questions, loading } = useQuestions();
  const [audioPermissionGranted, setAudioPermissionGranted] = useState(false);
  const [audioPermissionRequested, setAudioPermissionRequested] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  useEffect(() => {
    // Validate the skill type
    if (skillType && !['reading', 'writing', 'speaking', 'listening'].includes(skillType)) {
      toast({
        title: "Invalid Practice Type",
        description: `"${skillType}" is not a valid practice type. Please select a valid type.`,
        variant: "destructive",
      });
      navigate('/practice');
    }
    
    // Check if there are questions available for this skill type
    if (!loading && skillType && questions.length > 0) {
      const hasQuestions = questions.some(q => q.skillType === skillType);
      if (!hasQuestions) {
        toast({
          title: "No Questions Available",
          description: `No ${skillType} questions found. Please try another practice type or add questions in the admin panel.`,
          variant: "destructive",
        });
      }
    }
  }, [skillType, navigate, toast, questions, loading]);

  useEffect(() => {
    // Request microphone permission for speaking section
    if (skillType === 'speaking' && !audioPermissionRequested) {
      setAudioPermissionRequested(true);
      
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        toast({
          title: "Microphone Access Required",
          description: "This speaking test requires microphone access. Please allow when prompted.",
        });
        
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            console.log("Microphone permission granted");
            setAudioPermissionGranted(true);
            setPermissionError(null);
            // Stop all tracks to release the microphone for now
            // It will be activated again during the actual recording
            stream.getTracks().forEach(track => track.stop());
          })
          .catch(err => {
            console.error("Error accessing microphone:", err);
            setPermissionError("Microphone access denied. You need to allow microphone access to complete the speaking test.");
            toast({
              title: "Microphone Access Denied",
              description: "You need to allow microphone access to complete the speaking test.",
              variant: "destructive",
            });
          });
      } else {
        setPermissionError("Your browser doesn't support microphone access. Please try a different browser.");
        toast({
          title: "Browser Not Supported",
          description: "Your browser doesn't support microphone access. Please try a different browser.",
          variant: "destructive",
        });
      }
    }
  }, [skillType, toast, audioPermissionRequested]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow pt-20 pb-12 flex items-center justify-center">
          <Card className="w-full max-w-lg mx-auto">
            <CardContent className="p-6 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Loading Practice Session</h2>
              <p className="text-muted-foreground">
                Please wait while we prepare your {skillType} practice test...
              </p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (skillType === 'speaking' && permissionError) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow pt-20 pb-12 flex items-center justify-center">
          <Card className="w-full max-w-lg mx-auto">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Microphone Access Required</h2>
              <p className="text-muted-foreground mb-4">
                {permissionError}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button onClick={() => navigate('/practice')} variant="outline">
                  Back to Practice
                </Button>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12">
        <QuestionManager audioPermissionGranted={skillType === 'speaking' ? audioPermissionGranted : undefined} />
      </main>
      <Footer />
    </div>
  );
};

export default PracticeSession;
