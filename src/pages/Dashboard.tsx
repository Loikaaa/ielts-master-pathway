
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, FileText, BarChart, BookOpen, Brain, CheckCircle, Mic, ArrowRight, Trophy, BookMarked, TrendingUp, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useQuestions } from '@/contexts/QuestionsContext';
import { useUserProgress } from '@/contexts/UserProgressContext';
import AddSessionDialog from '@/components/dashboard/AddSessionDialog';
import EditScheduleDialog from '@/components/dashboard/EditScheduleDialog';
import DetailedAnalysisDialog from '@/components/dashboard/DetailedAnalysisDialog';
import RecommendedSteps from '@/components/dashboard/RecommendedSteps';

const Dashboard = () => {
  const { questions } = useQuestions();
  const { userProgress, viewDetailedAnalysis } = useUserProgress();
  
  // Dialog states
  const [addSessionDialogOpen, setAddSessionDialogOpen] = useState(false);
  const [editScheduleDialogOpen, setEditScheduleDialogOpen] = useState(false);
  const [analysisDialogOpen, setAnalysisDialogOpen] = useState(false);
  
  // Count questions by skill type
  const readingCount = questions.filter(q => q.skillType === 'reading').length;
  const writingCount = questions.filter(q => q.skillType === 'writing').length;
  const listeningCount = questions.filter(q => q.skillType === 'listening').length;
  const speakingCount = questions.filter(q => q.skillType === 'speaking').length;

  // Get 4 most recent activities
  const recentActivities = [...userProgress.activities].slice(0, 4);

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
              <Button onClick={() => setAddSessionDialogOpen(true)}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Study Session
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
                        <span className="text-3xl font-bold">{userProgress.currentBand.toFixed(1)}</span>
                        <span className="text-muted-foreground ml-2">/ 9.0</span>
                      </div>
                      <div className="text-right">
                        {userProgress.progressHistory.length > 1 && (
                          <>
                            <span className="text-sm text-primary font-medium">
                              {(userProgress.currentBand - userProgress.progressHistory[0].scores.reading).toFixed(1)}
                            </span>
                            <span className="text-xs text-muted-foreground block">since start</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Progress 
                      value={userProgress.currentBand ? (userProgress.currentBand / 9) * 100 : 0} 
                      className="h-2 mb-2" 
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Current: {userProgress.currentBand.toFixed(1)}</span>
                      <span>Target: {userProgress.targetBand || 7.5}</span>
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
                        <span className="text-3xl font-bold">{userProgress.studyTime.current.toFixed(1)}</span>
                        <span className="text-muted-foreground ml-2">hours</span>
                      </div>
                      <div className="text-right">
                        {userProgress.studyTime.lastWeek > 0 && (
                          <>
                            <span className="text-sm text-green-500 font-medium">
                              +{(userProgress.studyTime.current - userProgress.studyTime.lastWeek).toFixed(1)}h
                            </span>
                            <span className="text-xs text-muted-foreground block">from last week</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Progress 
                      value={userProgress.studyTime.target > 0 ? 
                        Math.min(100, (userProgress.studyTime.current / userProgress.studyTime.target) * 100) : 0} 
                      className="h-2 mb-2" 
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Target: {userProgress.studyTime.target} hours</span>
                      <span>
                        {userProgress.studyTime.target > 0 ? 
                          Math.min(100, Math.round((userProgress.studyTime.current / userProgress.studyTime.target) * 100)) : 0}% completed
                      </span>
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
                          <span className="text-sm font-medium">{userProgress.skillScores.reading.toFixed(1)}</span>
                        </div>
                        <Progress value={Math.round((userProgress.skillScores.reading / 9) * 100)} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Writing</span>
                          <span className="text-sm font-medium">{userProgress.skillScores.writing.toFixed(1)}</span>
                        </div>
                        <Progress value={Math.round((userProgress.skillScores.writing / 9) * 100)} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Listening</span>
                          <span className="text-sm font-medium">{userProgress.skillScores.listening.toFixed(1)}</span>
                        </div>
                        <Progress value={Math.round((userProgress.skillScores.listening / 9) * 100)} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Speaking</span>
                          <span className="text-sm font-medium">{userProgress.skillScores.speaking.toFixed(1)}</span>
                        </div>
                        <Progress value={Math.round((userProgress.skillScores.speaking / 9) * 100)} className="h-2" />
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
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Recent Activity</CardTitle>
                      <Button variant="outline" size="sm" onClick={() => setAnalysisDialogOpen(true)}>
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {recentActivities.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground mb-4">No activities recorded yet. Complete practice tests to start tracking your progress.</p>
                        <Button asChild>
                          <Link to="/practice">Start Practicing</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recentActivities.map((item, index) => {
                          // Handle dynamic component rendering based on icon name
                          let IconComponent;
                          switch (item.icon) {
                            case 'BookOpen': IconComponent = BookOpen; break;
                            case 'FileText': IconComponent = FileText; break;
                            case 'Brain': IconComponent = Brain; break;
                            case 'Mic': IconComponent = Mic; break;
                            case 'Trophy': IconComponent = Trophy; break;
                            case 'BookMarked': IconComponent = BookMarked; break;
                            case 'TrendingUp': IconComponent = TrendingUp; break;
                            default: IconComponent = CheckCircle;
                          }
                          
                          return (
                            <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                              <div className={`bg-${item.color}/10 p-2 rounded-full`}>
                                <IconComponent className={`h-5 w-5 text-${item.color}`} />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium">{item.activity}</h3>
                                <p className="text-sm text-muted-foreground">{item.result}</p>
                                <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
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
                        {userProgress.progressHistory.slice(-4).map((month, index) => (
                          <div key={index} className="flex flex-col justify-end space-y-2">
                            {/* Reading bar */}
                            <div 
                              className="bg-reading w-full rounded-t-sm" 
                              style={{ height: `${(month.scores.reading/9)*100}%` }}
                              title={`Reading: ${month.scores.reading}`}
                            />
                            {/* Writing bar */}
                            <div 
                              className="bg-writing w-full" 
                              style={{ height: `${(month.scores.writing/9)*100}%` }}
                              title={`Writing: ${month.scores.writing}`}
                            />
                            {/* Listening bar */}
                            <div 
                              className="bg-listening w-full" 
                              style={{ height: `${(month.scores.listening/9)*100}%` }}
                              title={`Listening: ${month.scores.listening}`}
                            />
                            {/* Speaking bar */}
                            <div 
                              className="bg-speaking w-full rounded-b-sm" 
                              style={{ height: `${(month.scores.speaking/9)*100}%` }}
                              title={`Speaking: ${month.scores.speaking}`}
                            />
                            <span className="text-xs text-center mt-2">
                              {new Date(month.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
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
                      {userProgress.improvementAreas.map((area, index) => {
                        // Handle dynamic component rendering based on icon name
                        let IconComponent;
                        switch (area.icon) {
                          case 'FileText': IconComponent = FileText; break;
                          case 'Mic': IconComponent = Mic; break;
                          case 'BookOpen': IconComponent = BookOpen; break;
                          case 'Brain': IconComponent = Brain; break;
                          default: IconComponent = ListChecks;
                        }
                        
                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                              <div className="flex items-center">
                                <IconComponent className={`h-5 w-5 text-${area.skillType} mr-2`} />
                                <span className="font-medium">{area.name}</span>
                              </div>
                              <span className="text-sm font-medium">{area.priority} Priority</span>
                            </div>
                            <Progress value={area.progress} className="h-2" />
                            <p className="text-sm text-muted-foreground">
                              {area.description}
                            </p>
                          </div>
                        );
                      })}
                      
                      <Button className="w-full mt-4" onClick={() => setAnalysisDialogOpen(true)}>
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
                    {userProgress.achievements.map((achievement, index) => {
                      // Handle dynamic component rendering based on icon name
                      let IconComponent;
                      switch (achievement.icon) {
                        case 'Trophy': IconComponent = Trophy; break;
                        case 'BookMarked': IconComponent = BookMarked; break;
                        case 'TrendingUp': IconComponent = TrendingUp; break;
                        default: IconComponent = CheckCircle;
                      }
                      
                      return (
                        <div 
                          key={index} 
                          className={`${achievement.achieved ? 'bg-primary/10' : 'bg-accent/30'} p-4 rounded-lg flex items-center space-x-4`}
                        >
                          <div className={`${achievement.achieved ? 'bg-primary/20' : 'bg-muted/50'} p-3 rounded-full`}>
                            <IconComponent className={`h-6 w-6 ${achievement.achieved ? 'text-primary' : 'text-muted-foreground'}`} />
                          </div>
                          <div>
                            <h3 className="font-medium">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            {achievement.achieved && achievement.date && (
                              <p className="text-xs text-primary mt-1">
                                Achieved on {new Date(achievement.date).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
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
                    {userProgress.activities.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground mb-4">No activities recorded yet. Complete practice tests to start tracking your progress.</p>
                        <Button asChild>
                          <Link to="/practice">Start Practicing</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="relative pl-6 border-l">
                        {userProgress.activities.slice(0, 5).map((item, index) => {
                          // Handle dynamic component rendering based on icon name
                          let IconComponent;
                          switch (item.icon) {
                            case 'BookOpen': IconComponent = BookOpen; break;
                            case 'FileText': IconComponent = FileText; break;
                            case 'Brain': IconComponent = Brain; break;
                            case 'Mic': IconComponent = Mic; break;
                            case 'Trophy': IconComponent = Trophy; break;
                            case 'BookMarked': IconComponent = BookMarked; break;
                            case 'TrendingUp': IconComponent = TrendingUp; break;
                            default: IconComponent = CheckCircle;
                          }
                          
                          return (
                            <div key={index} className="mb-6 relative last:mb-0">
                              <div className="absolute w-3 h-3 bg-primary rounded-full -left-7 mt-1.5"></div>
                              <div className="flex items-start">
                                <div className={`bg-${item.color}/10 p-2 rounded-full mr-3`}>
                                  <IconComponent className={`h-5 w-5 text-${item.color}`} />
                                </div>
                                <div>
                                  <h3 className="font-medium">{item.activity}</h3>
                                  <p className="text-sm text-muted-foreground">{item.result}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <Button variant="outline" className="w-full mt-4" onClick={() => setAnalysisDialogOpen(true)}>
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
                    {userProgress.studySessions.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground mb-4">No study sessions scheduled yet. Add sessions to organize your study plan.</p>
                        <Button onClick={() => setAddSessionDialogOpen(true)}>
                          <Calendar className="h-4 w-4 mr-2" />
                          Add Session
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userProgress.studySessions.slice(0, 5).map((session, index) => (
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
                    )}
                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={() => setEditScheduleDialogOpen(true)}>
                        <ListChecks className="h-4 w-4 mr-2" />
                        Edit Schedule
                      </Button>
                      <Button onClick={() => setAddSessionDialogOpen(true)}>
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
                  <RecommendedSteps />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      
      {/* Dialogs */}
      <AddSessionDialog 
        open={addSessionDialogOpen} 
        onOpenChange={setAddSessionDialogOpen} 
      />
      
      <EditScheduleDialog 
        open={editScheduleDialogOpen} 
        onOpenChange={setEditScheduleDialogOpen} 
      />
      
      <DetailedAnalysisDialog 
        open={analysisDialogOpen} 
        onOpenChange={setAnalysisDialogOpen} 
      />
    </div>
  );
};

export default Dashboard;
