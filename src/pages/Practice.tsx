
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Book, Headphones, Mic, Pencil, Clock, Trophy, CheckSquare, Bookmark, ArrowRight, LayoutIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { useQuestions } from '@/contexts/QuestionsContext';
import { Question, ReadingQuestion, ListeningQuestion } from '@/types/questions';

const Practice = () => {
  const { currentUser } = useUser();
  const { questions } = useQuestions();
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [username, setUsername] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'columns'>('columns'); // Default to columns view
  
  useEffect(() => {
    // Get user's first name or username
    if (currentUser && currentUser.firstName) {
      setUsername(currentUser.firstName);
    }
    
    // Check for stored country or use API
    const getCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setUserCountry(data.country_name || '');
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };
    
    if (!userCountry) {
      getCountry();
    }
  }, [currentUser, userCountry]);
  
  const skillTypes = [
    { 
      id: 'reading', 
      name: 'Reading', 
      icon: Book, 
      color: 'reading',
      description: 'Improve comprehension and reading speed',
      practiceCount: questions.filter(q => q.skillType === 'reading').length
    },
    { 
      id: 'writing', 
      name: 'Writing', 
      icon: Pencil, 
      color: 'writing',
      description: 'Enhance your essay structure and coherence',
      practiceCount: questions.filter(q => q.skillType === 'writing').length
    },
    { 
      id: 'speaking', 
      name: 'Speaking', 
      icon: Mic, 
      color: 'speaking',
      description: 'Develop fluency and pronunciation skills',
      practiceCount: questions.filter(q => q.skillType === 'speaking').length
    },
    { 
      id: 'listening', 
      name: 'Listening', 
      icon: Headphones, 
      color: 'listening',
      description: 'Enhance your audio comprehension abilities',
      practiceCount: questions.filter(q => q.skillType === 'listening').length
    }
  ];
  
  const filterQuestions = (skillType: string) => {
    if (skillType === 'all') {
      return questions.slice(0, 6);
    }
    return questions.filter(q => q.skillType === skillType).slice(0, 6);
  };
  
  const getQuestionDisplayTitle = (question: Question) => {
    if (question.skillType === 'reading' && 'passageTitle' in question) {
      return question.passageTitle;
    }
    if (question.skillType === 'writing' && 'taskType' in question) {
      return `Writing Task ${question.taskType.charAt(5)}`;
    }
    if (question.skillType === 'speaking' && 'partNumber' in question) {
      return `Speaking Part ${question.partNumber}`;
    }
    if (question.skillType === 'listening' && 'sectionNumber' in question) {
      return `Listening Section ${question.sectionNumber}`;
    }
    return 'Practice Test';
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Group tests by type (Exams and Practice Tests)
  const groupedTests = {
    exams: questions.filter(q => q.isFullExam === true),
    practices: questions.filter(q => q.isFullExam !== true)
  };
  
  // Helper function to safely get question count for reading and listening questions
  const getQuestionCount = (question: Question): number => {
    if (question.skillType === 'reading' && 'questions' in question) {
      return (question as ReadingQuestion).questions.length;
    }
    if (question.skillType === 'listening' && 'questions' in question) {
      return (question as ListeningQuestion).questions.length;
    }
    return 0;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[10%] -left-[10%] w-1/2 h-1/2 bg-reading/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[10%] -right-[10%] w-1/2 h-1/2 bg-speaking/10 rounded-full blur-3xl"></div>
          <div className="absolute top-[40%] -right-[10%] w-1/3 h-1/3 bg-writing/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[40%] -left-[10%] w-1/3 h-1/3 bg-listening/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <motion.div 
            className="mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  IELTS Practice Tests
                </h1>
                <p className="text-lg text-muted-foreground mb-4">
                  {username ? `Hello ${username}! ` : ''}
                  {userCountry ? `Ready to practice IELTS from ${userCountry}? ` : ''}
                  Choose a skill to improve your IELTS score.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 p-2 bg-background/50 backdrop-blur-sm rounded-lg border border-border/50 shadow-sm">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Recent activity: <span className="font-medium">2 days ago</span></span>
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setViewMode(viewMode === 'grid' ? 'columns' : 'grid')}
                  className="h-10 w-10"
                >
                  <LayoutIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
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
            {skillTypes.map((skill, index) => (
              <motion.div 
                key={skill.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                }}
              >
                <Card 
                  className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg border-${skill.color}/30 hover:border-${skill.color} overflow-hidden`}
                  onClick={() => setSelectedSkill(skill.id)}
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-${skill.color}`}></div>
                  <CardHeader className={`pb-2 bg-${skill.color}/10`}>
                    <CardTitle className="flex items-center text-lg">
                      <skill.icon className={`h-5 w-5 mr-2 text-${skill.color}`} />
                      {skill.name}
                      <div className={`ml-auto flex items-center justify-center w-6 h-6 rounded-full bg-${skill.color}/20 text-${skill.color} text-xs font-bold`}>
                        {skill.practiceCount}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground mb-3">{skill.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CheckSquare className="h-4 w-4 mr-1" />
                        <span>Practice tests</span>
                      </div>
                      <Button variant="ghost" size="sm" asChild className={`text-${skill.color} hover:text-${skill.color}/80 p-0`}>
                        <Link to={`/practice/session/${skill.id}`}>
                          Start <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Two-column layout for Exams and Practice Tests */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Full IELTS Exams & Practice Tests</h2>
              <div className="flex gap-2">
                <Button 
                  variant={viewMode === 'columns' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setViewMode('columns')}
                >
                  <LayoutIcon className="h-4 w-4 mr-2" />
                  Two Columns
                </Button>
                <Button 
                  variant={viewMode === 'grid' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <svg 
                    width="15" 
                    height="15" 
                    viewBox="0 0 15 15" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                  >
                    <path 
                      d="M1.5 1.5H6.5V6.5H1.5V1.5ZM8.5 1.5H13.5V6.5H8.5V1.5ZM1.5 8.5H6.5V13.5H1.5V8.5ZM8.5 8.5H13.5V13.5H8.5V8.5Z" 
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Grid
                </Button>
              </div>
            </div>

            {viewMode === 'columns' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Exams Column */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-amber-500" />
                    Full IELTS Exams
                  </h3>
                  <div className="space-y-4">
                    {groupedTests.exams.length > 0 ? (
                      groupedTests.exams.map((exam, idx) => {
                        const skillType = skillTypes.find(s => s.id === exam.skillType);
                        const Icon = skillType?.icon || Book;
                        const displayTitle = getQuestionDisplayTitle(exam);
                        
                        return (
                          <Link 
                            key={idx} 
                            to={`/practice/session/${exam.skillType}/${exam.id}`}
                            className="block"
                          >
                            <Card className={`overflow-hidden hover:shadow-lg transition-all border-${skillType?.color || 'primary'}/30 hover:border-${skillType?.color || 'primary'} cursor-pointer`}>
                              <div className={`h-2 w-full bg-${skillType?.color || 'primary'}`}></div>
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                  <CardTitle className="text-lg flex items-center">
                                    <Icon className={`h-5 w-5 mr-2 text-${skillType?.color || 'primary'}`} />
                                    {displayTitle.substring(0, 25)}
                                    {displayTitle.length > 25 && '...'}
                                  </CardTitle>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Bookmark className="h-4 w-4" />
                                  </Button>
                                </div>
                                <CardDescription className="mt-1">
                                  Full {exam.skillType.charAt(0).toUpperCase() + exam.skillType.slice(1)} Exam
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="text-sm">
                                <div className="flex items-center mb-2">
                                  <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                                  <span className="text-muted-foreground">
                                    {exam.timeLimit ? `${Math.floor(exam.timeLimit / 60)} minutes` : 'Full test'}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <Trophy className="h-4 w-4 text-amber-500 mr-1" />
                                  <span className="text-muted-foreground">
                                    {getQuestionCount(exam) > 0 
                                      ? `${getQuestionCount(exam)} questions` 
                                      : '40 questions'}
                                  </span>
                                </div>
                              </CardContent>
                              <CardFooter className="pt-0">
                                <Button 
                                  className={`w-full bg-${skillType?.color || 'primary'}/90 hover:bg-${skillType?.color || 'primary'}`}
                                >
                                  Start Exam
                                </Button>
                              </CardFooter>
                            </Card>
                          </Link>
                        );
                      })
                    ) : (
                      <Card className="p-6 text-center">
                        <p className="text-muted-foreground mb-4">No full exams available yet</p>
                        <Button variant="outline" size="sm">View Practice Tests</Button>
                      </Card>
                    )}
                  </div>
                </div>
                
                {/* Practice Tests Column */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <CheckSquare className="h-5 w-5 mr-2 text-primary" />
                    Practice Tests
                  </h3>
                  <div className="space-y-4">
                    {filterQuestions(selectedSkill).map((question, idx) => {
                      const skillType = skillTypes.find(s => s.id === question.skillType);
                      const Icon = skillType?.icon || Book;
                      const displayTitle = getQuestionDisplayTitle(question);
                      
                      return (
                        <Link 
                          key={idx} 
                          to={`/practice/session/${question.skillType}/${question.id}`}
                          className="block"
                        >
                          <Card className={`overflow-hidden hover:shadow-lg transition-all border-${skillType?.color || 'primary'}/30 hover:border-${skillType?.color || 'primary'} cursor-pointer`}>
                            <div className={`h-2 w-full bg-${skillType?.color || 'primary'}`}></div>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg flex items-center">
                                  <Icon className={`h-5 w-5 mr-2 text-${skillType?.color || 'primary'}`} />
                                  {displayTitle.substring(0, 25)}
                                  {displayTitle.length > 25 && '...'}
                                </CardTitle>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Bookmark className="h-4 w-4" />
                                </Button>
                              </div>
                              <CardDescription className="mt-1">
                                {question.skillType.charAt(0).toUpperCase() + question.skillType.slice(1)} Practice
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm">
                              <div className="flex items-center mb-2">
                                <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                                <span className="text-muted-foreground">
                                  {question.timeLimit ? `${Math.floor(question.timeLimit / 60)} minutes` : 'Timed practice'}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Trophy className="h-4 w-4 text-amber-500 mr-1" />
                                <span className="text-muted-foreground">Difficulty: {question.difficulty || 'Medium'}</span>
                              </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                              <Button 
                                className={`w-full bg-${skillType?.color || 'primary'}/90 hover:bg-${skillType?.color || 'primary'}`}
                              >
                                Practice Now
                              </Button>
                            </CardFooter>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              // Standard grid view (existing tab layout)
              <Tabs defaultValue={selectedSkill} value={selectedSkill} onValueChange={setSelectedSkill} className="mt-8">
                <TabsList className="w-full justify-start mb-6 overflow-auto">
                  <TabsTrigger value="all" className="text-base">All Tests</TabsTrigger>
                  {skillTypes.map(skill => (
                    <TabsTrigger 
                      key={skill.id} 
                      value={skill.id} 
                      className={`text-base flex items-center`}
                    >
                      <skill.icon className="h-4 w-4 mr-2" />
                      {skill.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <TabsContent value="all" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterQuestions('all').map((question, idx) => {
                      const skillType = skillTypes.find(s => s.id === question.skillType);
                      const Icon = skillType?.icon || Book;
                      const displayTitle = getQuestionDisplayTitle(question);
                      
                      return (
                        <Link 
                          key={idx} 
                          to={`/practice/session/${question.skillType}/${question.id}`}
                          className="block"
                        >
                          <Card className={`overflow-hidden hover:shadow-lg transition-all border-${skillType?.color || 'primary'}/30 hover:border-${skillType?.color || 'primary'} cursor-pointer`}>
                            <div className={`h-2 w-full bg-${skillType?.color || 'primary'}`}></div>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg flex items-center">
                                  <Icon className={`h-5 w-5 mr-2 text-${skillType?.color || 'primary'}`} />
                                  {displayTitle.substring(0, 25)}
                                  {displayTitle.length > 25 && '...'}
                                </CardTitle>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Bookmark className="h-4 w-4" />
                                </Button>
                              </div>
                              <CardDescription className="mt-1">
                                {question.skillType.charAt(0).toUpperCase() + question.skillType.slice(1)} Test
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm">
                              <div className="flex items-center mb-2">
                                <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                                <span className="text-muted-foreground">
                                  {question.timeLimit ? `${Math.floor(question.timeLimit / 60)} minutes` : 'Timed practice'}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Trophy className="h-4 w-4 text-amber-500 mr-1" />
                                <span className="text-muted-foreground">Difficulty: {question.difficulty || 'Medium'}</span>
                              </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                              <Button 
                                className={`w-full bg-${skillType?.color || 'primary'}/90 hover:bg-${skillType?.color || 'primary'}`}
                              >
                                Start Practice
                              </Button>
                            </CardFooter>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </TabsContent>
                
                {skillTypes.map(skill => (
                  <TabsContent key={skill.id} value={skill.id} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filterQuestions(skill.id).map((question, idx) => {
                        const displayTitle = getQuestionDisplayTitle(question);
                        
                        return (
                          <Link 
                            key={idx} 
                            to={`/practice/session/${question.skillType}/${question.id}`}
                            className="block"
                          >
                            <Card className={`overflow-hidden hover:shadow-lg transition-all border-${skill.color}/30 hover:border-${skill.color} cursor-pointer`}>
                              <div className={`h-2 w-full bg-${skill.color}`}></div>
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                  <CardTitle className="text-lg flex items-center">
                                    <skill.icon className={`h-5 w-5 mr-2 text-${skill.color}`} />
                                    {displayTitle.substring(0, 25)}
                                    {displayTitle.length > 25 && '...'}
                                  </CardTitle>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Bookmark className="h-4 w-4" />
                                  </Button>
                                </div>
                                <CardDescription className="mt-1">
                                  {skill.name} Test
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="text-sm">
                                <div className="flex items-center mb-2">
                                  <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                                  <span className="text-muted-foreground">
                                    {question.timeLimit ? `${Math.floor(question.timeLimit / 60)} minutes` : 'Timed practice'}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <Trophy className="h-4 w-4 text-amber-500 mr-1" />
                                  <span className="text-muted-foreground">Difficulty: {question.difficulty || 'Medium'}</span>
                                </div>
                              </CardContent>
                              <CardFooter className="pt-0">
                                <Button 
                                  className={`w-full bg-${skill.color}/90 hover:bg-${skill.color}`}
                                >
                                  Start Practice
                                </Button>
                              </CardFooter>
                            </Card>
                          </Link>
                        );
                      })}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Practice;
