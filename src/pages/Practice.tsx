import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Book, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Filter, 
  Headphones, 
  LayoutGrid, 
  LineChart, 
  ListFilter, 
  Mic, 
  Pencil, 
  Search, 
  Star, 
  Timer,
  AlertCircle,
  Loader2 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useQuestions } from '@/contexts/QuestionsContext';

const Practice = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const skillParam = searchParams.get('skill');
  const [activeTab, setActiveTab] = useState(skillParam || 'reading');
  const [practiceItems, setPracticeItems] = useState({
    reading: [],
    writing: [],
    speaking: [],
    listening: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const { questions, loading: questionsLoading } = useQuestions();

  useEffect(() => {
    console.log("Loading practice items from QuestionsContext:", questions);
    setIsLoading(true);
    setError(null);
    
    try {
      if (!questionsLoading) {
        const items = {
          reading: [],
          writing: [],
          speaking: [],
          listening: []
        };
        
        if (!questions || questions.length === 0) {
          console.error("No questions data available");
          setError("No practice questions found");
          setIsLoading(false);
          return;
        }
        
        questions.forEach(question => {
          if (!items[question.skillType]) {
            console.warn(`Unknown skill type: ${question.skillType}`);
            return;
          }
          
          let title = "";
          let type = "";
          let duration = "";
          
          if (question.skillType === 'reading') {
            title = question.passageTitle || `Reading Practice ${question.id}`;
            type = question.questions && question.questions[0]?.questionType || 'Multiple Question Types';
            duration = `${Math.floor((question.timeLimit || 0) / 60)} min`;
          } else if (question.skillType === 'writing') {
            title = `Task ${question.taskType === 'task1' ? '1' : '2'}: ${question.prompt.substring(0, 40)}...`;
            type = question.taskType === 'task1' ? 'Data Analysis' : 'Essay';
            duration = `${Math.floor((question.timeLimit || 0) / 60)} min`;
          } else if (question.skillType === 'speaking') {
            title = `Part ${question.partNumber}: ${question.promptText.substring(0, 40)}...`;
            type = question.partNumber === 1 ? 'Interview' : question.partNumber === 2 ? 'Monologue' : 'Discussion';
            duration = `${Math.floor(((question.preparationTime || 0) + (question.responseTime || 0)) / 60)} min`;
          } else if (question.skillType === 'listening') {
            title = `Section ${question.sectionNumber}`;
            type = question.questions && question.questions[0]?.questionType || 'Multiple Question Types';
            duration = `${Math.floor((question.timeLimit || 0) / 60)} min`;
          }
          
          items[question.skillType].push({
            id: question.id,
            title: title,
            type: type,
            level: question.difficulty === 'easy' ? 'Easy' : question.difficulty === 'medium' ? 'Medium' : 'Hard',
            duration: duration,
            completionRate: Math.floor(Math.random() * 40) + 40,
            popular: Math.random() > 0.6
          });
        });
        
        setPracticeItems(items);
        console.log("Processed practice items:", items);
      }
    } catch (err) {
      console.error("Error processing practice items:", err);
      setError("Failed to load practice questions");
    } finally {
      if (!questionsLoading) {
        setIsLoading(false);
      }
    }
  }, [questions, questionsLoading]);

  useEffect(() => {
    if (skillParam && skillParam !== activeTab) {
      setActiveTab(skillParam);
    }
  }, [skillParam]);

  const startPractice = (skillType: string, itemId: string) => {
    console.log(`Starting practice for ${skillType}/${itemId}`);
    navigate(`/practice/session/${skillType}/${itemId}`);
  };

  const renderEmptyState = (skillType: string) => (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
        {skillType === 'reading' && <Book className="h-8 w-8 text-muted-foreground" />}
        {skillType === 'writing' && <Pencil className="h-8 w-8 text-muted-foreground" />}
        {skillType === 'speaking' && <Mic className="h-8 w-8 text-muted-foreground" />}
        {skillType === 'listening' && <Headphones className="h-8 w-8 text-muted-foreground" />}
      </div>
      <h3 className="text-lg font-medium mb-2">No {skillType} practices available</h3>
      <p className="text-muted-foreground mb-4">
        Create new {skillType} questions in the admin panel or check back later.
      </p>
      <Button variant="outline" onClick={() => navigate('/admin-dashboard')}>
        Go to Admin Panel
      </Button>
    </div>
  );

  const renderError = () => (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <h3 className="text-lg font-medium mb-2">Failed to load practice materials</h3>
      <p className="text-muted-foreground mb-4">
        There was an error loading the practice materials. Please try again later.
      </p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Retry
      </Button>
    </div>
  );

  const renderLoading = () => (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
      <h3 className="text-lg font-medium">Loading practice materials...</h3>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Practice Center</h1>
              <p className="text-muted-foreground">Improve your skills with our adaptive practice materials</p>
            </div>
            <div className="mt-4 md:mt-0 flex">
              <Button variant="outline" size="sm" className="mr-2">
                <LayoutGrid className="h-4 w-4 mr-2" />
                All Practices
              </Button>
              <Button variant="outline" size="sm" className="mr-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                Completed
              </Button>
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                In Progress
              </Button>
            </div>
          </div>
          
          <div className="bg-card rounded-xl border p-4 mb-8">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search practice exercises..." className="pl-9" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="whitespace-nowrap">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="whitespace-nowrap">
                  <ListFilter className="h-4 w-4 mr-2" />
                  Sort By
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="reading" className="data-[state=active]:bg-reading/10 data-[state=active]:text-reading data-[state=active]:border-reading">
                <Book className="h-4 w-4 mr-2" />
                Reading
              </TabsTrigger>
              <TabsTrigger value="writing" className="data-[state=active]:bg-writing/10 data-[state=active]:text-writing data-[state=active]:border-writing">
                <Pencil className="h-4 w-4 mr-2" />
                Writing
              </TabsTrigger>
              <TabsTrigger value="speaking" className="data-[state=active]:bg-speaking/10 data-[state=active]:text-speaking data-[state=active]:border-speaking">
                <Mic className="h-4 w-4 mr-2" />
                Speaking
              </TabsTrigger>
              <TabsTrigger value="listening" className="data-[state=active]:bg-listening/10 data-[state=active]:text-listening data-[state=active]:border-listening">
                <Headphones className="h-4 w-4 mr-2" />
                Listening
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="reading">
              {isLoading ? renderLoading() : 
               error ? renderError() : 
               practiceItems.reading.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {practiceItems.reading.map((item) => (
                    <div key={item.id} className="bg-card border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                      <div className="bg-reading/5 p-4 border-b border-reading/10">
                        <div className="flex justify-between items-start">
                          <div className="w-10 h-10 rounded-full bg-reading/10 flex items-center justify-center text-reading">
                            <Book className="h-5 w-5" />
                          </div>
                          <div className="flex items-center">
                            {item.popular && (
                              <div className="bg-reading/10 text-reading text-xs px-2 py-0.5 rounded-full font-medium mr-1">
                                Popular
                              </div>
                            )}
                            <div className="bg-card text-xs px-2 py-0.5 rounded-full border">
                              {item.level}
                            </div>
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg mt-4">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.type}</p>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {item.duration}
                          </div>
                          <div className="flex items-center">
                            <LineChart className="h-4 w-4 mr-1" />
                            <span>Completion rate: {item.completionRate}%</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => startPractice('reading', item.id)}
                        >
                          Start Practice
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : renderEmptyState('reading')}
            </TabsContent>
            
            <TabsContent value="writing">
              {isLoading ? renderLoading() : 
               error ? renderError() : 
               practiceItems.writing.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {practiceItems.writing.map((item) => (
                    <div key={item.id} className="bg-card border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                      <div className="bg-writing/5 p-4 border-b border-writing/10">
                        <div className="flex justify-between items-start">
                          <div className="w-10 h-10 rounded-full bg-writing/10 flex items-center justify-center text-writing">
                            <Pencil className="h-5 w-5" />
                          </div>
                          <div className="flex items-center">
                            {item.popular && (
                              <div className="bg-writing/10 text-writing text-xs px-2 py-0.5 rounded-full font-medium mr-1">
                                Popular
                              </div>
                            )}
                            <div className="bg-card text-xs px-2 py-0.5 rounded-full border">
                              {item.level}
                            </div>
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg mt-4">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.type}</p>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {item.duration}
                          </div>
                          <div className="flex items-center">
                            <LineChart className="h-4 w-4 mr-1" />
                            <span>Completion rate: {item.completionRate}%</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => startPractice('writing', item.id)}
                        >
                          Start Practice
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : renderEmptyState('writing')}
            </TabsContent>
            
            <TabsContent value="speaking">
              {isLoading ? renderLoading() : 
               error ? renderError() : 
               practiceItems.speaking.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {practiceItems.speaking.map((item) => (
                    <div key={item.id} className="bg-card border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                      <div className="bg-speaking/5 p-4 border-b border-speaking/10">
                        <div className="flex justify-between items-start">
                          <div className="w-10 h-10 rounded-full bg-speaking/10 flex items-center justify-center text-speaking">
                            <Mic className="h-5 w-5" />
                          </div>
                          <div className="flex items-center">
                            {item.popular && (
                              <div className="bg-speaking/10 text-speaking text-xs px-2 py-0.5 rounded-full font-medium mr-1">
                                Popular
                              </div>
                            )}
                            <div className="bg-card text-xs px-2 py-0.5 rounded-full border">
                              {item.level}
                            </div>
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg mt-4">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.type}</p>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {item.duration}
                          </div>
                          <div className="flex items-center">
                            <LineChart className="h-4 w-4 mr-1" />
                            <span>Completion rate: {item.completionRate}%</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => startPractice('speaking', item.id)}
                        >
                          Start Practice
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : renderEmptyState('speaking')}
            </TabsContent>
            
            <TabsContent value="listening">
              {isLoading ? renderLoading() : 
               error ? renderError() : 
               practiceItems.listening.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {practiceItems.listening.map((item) => (
                    <div key={item.id} className="bg-card border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                      <div className="bg-listening/5 p-4 border-b border-listening/10">
                        <div className="flex justify-between items-start">
                          <div className="w-10 h-10 rounded-full bg-listening/10 flex items-center justify-center text-listening">
                            <Headphones className="h-5 w-5" />
                          </div>
                          <div className="flex items-center">
                            {item.popular && (
                              <div className="bg-listening/10 text-listening text-xs px-2 py-0.5 rounded-full font-medium mr-1">
                                Popular
                              </div>
                            )}
                            <div className="bg-card text-xs px-2 py-0.5 rounded-full border">
                              {item.level}
                            </div>
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg mt-4">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.type}</p>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {item.duration}
                          </div>
                          <div className="flex items-center">
                            <LineChart className="h-4 w-4 mr-1" />
                            <span>Completion rate: {item.completionRate}%</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => startPractice('listening', item.id)}
                        >
                          Start Practice
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : renderEmptyState('listening')}
            </TabsContent>
          </Tabs>
          
          <div className="mt-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Ready for a Full Test?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Challenge yourself with a complete IELTS mock test under timed conditions to simulate the real exam experience.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Timer className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Full Mock Test</h3>
                  <p className="text-muted-foreground">Complete all four sections under timed conditions</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-sm text-muted-foreground">2 hours 45 minutes</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-sm text-muted-foreground">Professional Feedback</span>
                </div>
              </div>
              <Button>Take Mock Test</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Practice;
