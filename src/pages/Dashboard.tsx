
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, FileText, BarChart, BookOpen, Brain, CheckCircle, Mic, ArrowRight, Trophy, BookMarked, TrendingUp, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useQuestions } from '@/contexts/QuestionsContext';

const Dashboard = () => {
  const { questions, loading } = useQuestions();
  
  const readingCount = questions.filter(q => q.skillType === 'reading').length;
  const writingCount = questions.filter(q => q.skillType === 'writing').length;
  const listeningCount = questions.filter(q => q.skillType === 'listening').length;
  const speakingCount = questions.filter(q => q.skillType === 'speaking').length;

  // Activity data
  const userActivities = [
    {
      activity: "Completed Reading Practice Test 3",
      result: "32/40 questions (Band 7.5)",
      time: "Yesterday, 7:30 PM",
      icon: BookOpen,
      color: "reading"
    },
    {
      activity: "Submitted Writing Task 1",
      result: "Band 6.0 - Need improvement in task achievement",
      time: "Yesterday, 5:15 PM",
      icon: FileText,
      color: "writing"
    },
    {
      activity: "Completed Vocabulary Quiz",
      result: "85% Correct",
      time: "2 days ago, 10:45 AM",
      icon: Brain,
      color: "primary"
    },
    {
      activity: "Mock Test Completed",
      result: "Overall Band 6.5",
      time: "4 days ago, 2:00 PM",
      icon: CheckCircle,
      color: "green-500"
    }
  ];

  // Progress data
  const progressData = [
    { month: 'Jan', reading: 5.5, writing: 5.0, listening: 6.0, speaking: 5.5 },
    { month: 'Feb', reading: 6.0, writing: 5.5, listening: 6.0, speaking: 6.0 },
    { month: 'Mar', reading: 6.5, writing: 5.5, listening: 6.5, speaking: 6.0 },
    { month: 'Apr', reading: 7.0, writing: 6.0, listening: 7.0, speaking: 6.5 },
  ];

  // Study sessions data
  const studySessions = [
    { date: 'Monday', time: '2 hours', focus: 'Reading & Writing', complete: true },
    { date: 'Tuesday', time: '1.5 hours', focus: 'Listening', complete: true },
    { date: 'Wednesday', time: '2 hours', focus: 'Speaking Practice', complete: true },
    { date: 'Thursday', time: '1 hour', focus: 'Vocabulary Building', complete: false },
    { date: 'Friday', time: '2 hours', focus: 'Mock Test', complete: false },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Track your progress and manage your IELTS preparation</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Mock Test
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Overall Progress</CardTitle>
                    <CardDescription>Your estimated IELTS band score</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <span className="text-3xl font-bold">6.5</span>
                        <span className="text-muted-foreground ml-2">/ 9.0</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-primary font-medium">+0.5</span>
                        <span className="text-xs text-muted-foreground block">since last month</span>
                      </div>
                    </div>
                    <Progress value={72} className="h-2 mb-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Current: 6.5</span>
                      <span>Target: 7.5</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Study Time</CardTitle>
                    <CardDescription>This week's learning activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <span className="text-3xl font-bold">14.5</span>
                        <span className="text-muted-foreground ml-2">hours</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-green-500 font-medium">+2.3h</span>
                        <span className="text-xs text-muted-foreground block">from last week</span>
                      </div>
                    </div>
                    <Progress value={80} className="h-2 mb-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Target: 18 hours</span>
                      <span>80% completed</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Next Test Date</CardTitle>
                    <CardDescription>Countdown to your scheduled exam</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="text-lg font-semibold">24 days remaining</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="bg-accent/50 p-2 rounded text-center">
                        <div className="text-2xl font-bold">24</div>
                        <div className="text-xs text-muted-foreground">Days</div>
                      </div>
                      <div className="bg-accent/50 p-2 rounded text-center">
                        <div className="text-2xl font-bold">12</div>
                        <div className="text-xs text-muted-foreground">Hours</div>
                      </div>
                      <div className="bg-accent/50 p-2 rounded text-center">
                        <div className="text-2xl font-bold">45</div>
                        <div className="text-xs text-muted-foreground">Mins</div>
                      </div>
                      <div className="bg-accent/50 p-2 rounded text-center">
                        <div className="text-2xl font-bold">18</div>
                        <div className="text-xs text-muted-foreground">Secs</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Skill Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Reading</span>
                          <span className="text-sm font-medium">7.0</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Writing</span>
                          <span className="text-sm font-medium">6.0</span>
                        </div>
                        <Progress value={67} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Listening</span>
                          <span className="text-sm font-medium">7.0</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Speaking</span>
                          <span className="text-sm font-medium">6.5</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Available Practice</CardTitle>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/practice">
                          View All <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-reading/10">
                        <div className="flex items-center gap-3">
                          <div className="bg-reading/20 p-2 rounded-full">
                            <BookOpen className="h-5 w-5 text-reading" />
                          </div>
                          <div>
                            <h3 className="font-medium">Reading Tests</h3>
                          </div>
                        </div>
                        <div className="text-sm font-medium">{readingCount} available</div>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 rounded-lg bg-writing/10">
                        <div className="flex items-center gap-3">
                          <div className="bg-writing/20 p-2 rounded-full">
                            <FileText className="h-5 w-5 text-writing" />
                          </div>
                          <div>
                            <h3 className="font-medium">Writing Tasks</h3>
                          </div>
                        </div>
                        <div className="text-sm font-medium">{writingCount} available</div>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 rounded-lg bg-speaking/10">
                        <div className="flex items-center gap-3">
                          <div className="bg-speaking/20 p-2 rounded-full">
                            <Mic className="h-5 w-5 text-speaking" />
                          </div>
                          <div>
                            <h3 className="font-medium">Speaking Sessions</h3>
                          </div>
                        </div>
                        <div className="text-sm font-medium">{speakingCount} available</div>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 rounded-lg bg-listening/10">
                        <div className="flex items-center gap-3">
                          <div className="bg-listening/20 p-2 rounded-full">
                            <Brain className="h-5 w-5 text-listening" />
                          </div>
                          <div>
                            <h3 className="font-medium">Listening Tests</h3>
                          </div>
                        </div>
                        <div className="text-sm font-medium">{listeningCount} available</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userActivities.map((item, index) => (
                        <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                          <div className={`bg-${item.color}/10 p-2 rounded-full`}>
                            <item.icon className={`h-5 w-5 text-${item.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{item.activity}</h3>
                            <p className="text-sm text-muted-foreground">{item.result}</p>
                            <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="progress">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Band Score Progression</CardTitle>
                    <CardDescription>Your IELTS band score improvements over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 bg-accent/5 p-4 rounded-lg">
                      <div className="grid grid-cols-4 gap-4 h-full">
                        {progressData.map((month, index) => (
                          <div key={index} className="flex flex-col justify-end space-y-2">
                            {/* Reading bar */}
                            <div 
                              className="bg-reading w-full rounded-t-sm" 
                              style={{ height: `${(month.reading/9)*100}%` }}
                              title={`Reading: ${month.reading}`}
                            />
                            {/* Writing bar */}
                            <div 
                              className="bg-writing w-full" 
                              style={{ height: `${(month.writing/9)*100}%` }}
                              title={`Writing: ${month.writing}`}
                            />
                            {/* Listening bar */}
                            <div 
                              className="bg-listening w-full" 
                              style={{ height: `${(month.listening/9)*100}%` }}
                              title={`Listening: ${month.listening}`}
                            />
                            {/* Speaking bar */}
                            <div 
                              className="bg-speaking w-full rounded-b-sm" 
                              style={{ height: `${(month.speaking/9)*100}%` }}
                              title={`Speaking: ${month.speaking}`}
                            />
                            <span className="text-xs text-center mt-2">{month.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-center mt-4 space-x-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-reading rounded-full mr-2"></div>
                        <span className="text-xs">Reading</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-writing rounded-full mr-2"></div>
                        <span className="text-xs">Writing</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-listening rounded-full mr-2"></div>
                        <span className="text-xs">Listening</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-speaking rounded-full mr-2"></div>
                        <span className="text-xs">Speaking</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Improvement Areas</CardTitle>
                    <CardDescription>Skills that need more attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-writing mr-2" />
                            <span className="font-medium">Writing Task 2</span>
                          </div>
                          <span className="text-sm font-medium">High Priority</span>
                        </div>
                        <Progress value={40} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          Focus on essay structure and coherence
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Mic className="h-5 w-5 text-speaking mr-2" />
                            <span className="font-medium">Speaking Part 3</span>
                          </div>
                          <span className="text-sm font-medium">Medium Priority</span>
                        </div>
                        <Progress value={55} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          Improve discussion on abstract topics
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <BookOpen className="h-5 w-5 text-reading mr-2" />
                            <span className="font-medium">Reading Speed</span>
                          </div>
                          <span className="text-sm font-medium">Medium Priority</span>
                        </div>
                        <Progress value={65} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          Practice skimming and scanning techniques
                        </p>
                      </div>
                      
                      <Button className="w-full mt-4">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        View Detailed Analysis
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Milestones you've reached in your IELTS journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-accent/30 p-4 rounded-lg flex items-center space-x-4">
                      <div className="bg-primary/20 p-3 rounded-full">
                        <Trophy className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Reading Master</h3>
                        <p className="text-sm text-muted-foreground">Scored 7.0 in Reading</p>
                      </div>
                    </div>
                    
                    <div className="bg-accent/30 p-4 rounded-lg flex items-center space-x-4">
                      <div className="bg-primary/20 p-3 rounded-full">
                        <BookMarked className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Consistent Learner</h3>
                        <p className="text-sm text-muted-foreground">14 days streak</p>
                      </div>
                    </div>
                    
                    <div className="bg-accent/30 p-4 rounded-lg flex items-center space-x-4">
                      <div className="bg-primary/20 p-3 rounded-full">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Quick Improver</h3>
                        <p className="text-sm text-muted-foreground">+0.5 band in 1 month</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>Your learning history and achievements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative pl-6 border-l">
                      {userActivities.map((item, index) => (
                        <div key={index} className="mb-6 relative last:mb-0">
                          <div className="absolute w-3 h-3 bg-primary rounded-full -left-7 mt-1.5"></div>
                          <div className="flex items-start">
                            <div className={`bg-${item.color}/10 p-2 rounded-full mr-3`}>
                              <item.icon className={`h-5 w-5 text-${item.color}`} />
                            </div>
                            <div>
                              <h3 className="font-medium">{item.activity}</h3>
                              <p className="text-sm text-muted-foreground">{item.result}</p>
                              <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      View All Activities
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Study Sessions</CardTitle>
                    <CardDescription>Your scheduled learning sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {studySessions.map((session, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-accent/20 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${session.complete ? 'bg-green-100' : 'bg-amber-100'}`}>
                              {session.complete ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : (
                                <Clock className="h-5 w-5 text-amber-600" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium">{session.date}</h3>
                              <p className="text-sm text-muted-foreground">{session.focus}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium">{session.time}</span>
                            <span className="text-xs block text-muted-foreground">
                              {session.complete ? 'Completed' : 'Upcoming'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-6">
                      <Button variant="outline">
                        <ListChecks className="h-4 w-4 mr-2" />
                        Edit Schedule
                      </Button>
                      <Button>
                        <Calendar className="h-4 w-4 mr-2" />
                        Add Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended Next Steps</CardTitle>
                  <CardDescription>Based on your progress and schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-writing/10 p-4 rounded-lg">
                      <FileText className="h-6 w-6 text-writing mb-2" />
                      <h3 className="font-medium mb-1">Complete Writing Task</h3>
                      <p className="text-sm text-muted-foreground mb-3">Practice Task 1 - Chart Description</p>
                      <Button size="sm" variant="outline" className="w-full">
                        Start Now
                      </Button>
                    </div>
                    
                    <div className="bg-listening/10 p-4 rounded-lg">
                      <Brain className="h-6 w-6 text-listening mb-2" />
                      <h3 className="font-medium mb-1">Listening Practice</h3>
                      <p className="text-sm text-muted-foreground mb-3">Section 3 - Academic Discussion</p>
                      <Button size="sm" variant="outline" className="w-full">
                        Start Now
                      </Button>
                    </div>
                    
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <BookOpen className="h-6 w-6 text-primary mb-2" />
                      <h3 className="font-medium mb-1">Vocabulary Review</h3>
                      <p className="text-sm text-muted-foreground mb-3">Academic Word List - Set 3</p>
                      <Button size="sm" variant="outline" className="w-full">
                        Start Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
