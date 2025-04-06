
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuestionManager from '@/components/practice/QuestionManager';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Clock, AlertCircle, Loader2, Volume2, Mic, BookOpen, Pencil } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuestions } from '@/contexts/QuestionsContext';

const PracticeSession = () => {
  const { skillType, practiceId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { questions, loading } = useQuestions();
  const [audioPermissionGranted, setAudioPermissionGranted] = useState(false);
  const [audioPermissionRequested, setAudioPermissionRequested] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [testStarted, setTestStarted] = useState(false);

  // Test type configuration
  const testTypeConfig = {
    reading: {
      icon: <BookOpen className="h-12 w-12 text-blue-500" />,
      title: "Reading Test",
      description: "Read passages and answer questions about the content.",
      instructions: "You'll have 60 minutes to answer 40 questions across 3 passages. Read carefully and pace yourself.",
      defaultTimeLimit: 60 * 60, // 60 minutes
      color: "blue"
    },
    writing: {
      icon: <Pencil className="h-12 w-12 text-green-500" />,
      title: "Writing Test",
      description: "Complete two writing tasks: a graph/chart description and an essay.",
      instructions: "Task 1 (20 minutes): Describe visual information. Task 2 (40 minutes): Write an essay response.",
      defaultTimeLimit: 60 * 60, // 60 minutes
      color: "green"
    },
    speaking: {
      icon: <Mic className="h-12 w-12 text-yellow-500" />,
      title: "Speaking Test",
      description: "Speak in response to various prompts and questions.",
      instructions: "You'll complete 3 parts: introduction, long-turn speaking, and discussion. Your responses will be recorded.",
      defaultTimeLimit: null, // Controlled per question
      color: "yellow"
    },
    listening: {
      icon: <Volume2 className="h-12 w-12 text-purple-500" />,
      title: "Listening Test",
      description: "Listen to audio recordings and answer questions about what you hear.",
      instructions: "You'll hear each recording ONCE only. Listen carefully to 4 sections and answer 40 questions.",
      defaultTimeLimit: 40 * 60, // 40 minutes
      color: "purple"
    }
  };

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

    // Set default time limit based on test type
    if (skillType && testTypeConfig[skillType as keyof typeof testTypeConfig]?.defaultTimeLimit) {
      setTimeRemaining(testTypeConfig[skillType as keyof typeof testTypeConfig].defaultTimeLimit);
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

    // Handle permission for listening test
    if (skillType === 'listening' && !audioPermissionRequested) {
      setAudioPermissionRequested(true);
      
      // Just check if audio can be played
      const audio = new Audio();
      if (audio.canPlayType('audio/mpeg') === '') {
        setPermissionError("Your browser doesn't support audio playback. Please try a different browser.");
        toast({
          title: "Browser Not Supported",
          description: "Your browser doesn't support audio playback. Please try a different browser.",
          variant: "destructive",
        });
      } else {
        setAudioPermissionGranted(true);
      }
    }
  }, [skillType, toast, audioPermissionRequested]);

  const startTest = () => {
    setTestStarted(true);
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Get current test details
  const getTestDetails = () => {
    if (!skillType) return null;
    return testTypeConfig[skillType as keyof typeof testTypeConfig];
  };

  const currentTest = getTestDetails();

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

  if (skillType === 'listening' && permissionError) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow pt-20 pb-12 flex items-center justify-center">
          <Card className="w-full max-w-lg mx-auto">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Audio Playback Required</h2>
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

  // Show the test overview before starting
  if (!testStarted && currentTest) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow pt-20 pb-12 flex items-center justify-center">
          <Card className="w-full max-w-xl mx-auto overflow-hidden">
            <CardHeader className={`bg-${currentTest.color}-50 border-b`}>
              <div className="flex items-center gap-4">
                {currentTest.icon}
                <div>
                  <CardTitle className="text-2xl">{currentTest.title}</CardTitle>
                  <CardDescription className="text-base mt-1">{currentTest.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-medium text-lg mb-2">Instructions</h3>
                <p className="text-muted-foreground">{currentTest.instructions}</p>
              </div>
              
              {timeRemaining && (
                <div className="bg-muted p-4 rounded-md flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Time Limit: {formatTime(timeRemaining)}</p>
                    <p className="text-sm text-muted-foreground">The timer will start once you begin the test</p>
                  </div>
                </div>
              )}
              
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 text-amber-800">
                <h4 className="font-medium mb-1">Important</h4>
                <ul className="list-disc ml-5 text-sm space-y-1">
                  <li>Do not refresh the page during the test</li>
                  <li>Answer all questions before the time runs out</li>
                  <li>You can navigate between questions using the buttons at the bottom</li>
                  {skillType === 'speaking' && <li>Make sure your microphone is working properly</li>}
                  {skillType === 'listening' && <li>Make sure your audio is turned on and working</li>}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t p-4 flex justify-between">
              <Button variant="outline" onClick={() => navigate('/practice')}>
                Back to Practice
              </Button>
              <Button onClick={startTest} className={`bg-${currentTest.color}-600 hover:bg-${currentTest.color}-700`}>
                Start Test
              </Button>
            </CardFooter>
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
        <QuestionManager 
          audioPermissionGranted={skillType === 'speaking' ? audioPermissionGranted : undefined} 
          initialTimeRemaining={timeRemaining}
        />
      </main>
      <Footer />
    </div>
  );
};

export default PracticeSession;
