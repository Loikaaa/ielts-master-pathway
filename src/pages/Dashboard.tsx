
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BackendControl from '@/components/BackendControl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, Database, FileText, BarChart, BookOpen, Brain, CheckCircle, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
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
              <Button variant="outline">
                <Database className="h-4 w-4 mr-2" />
                Backend
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
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
                    <CardTitle className="text-lg">Recommended Practice</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-writing/10 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-writing" />
                        </div>
                        <div>
                          <h3 className="font-medium">Writing Task 2 Practice</h3>
                          <p className="text-sm text-muted-foreground mb-2">Focus on essay structure and coherence</p>
                          <Button variant="outline" size="sm" asChild>
                            <Link to="/practice?skill=writing&task=2">
                              Start Practice
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-speaking/10 p-2 rounded-full">
                          <Mic className="h-5 w-5 text-speaking" />
                        </div>
                        <div>
                          <h3 className="font-medium">Speaking Part 2 Training</h3>
                          <p className="text-sm text-muted-foreground mb-2">Improve your long-turn responses</p>
                          <Button variant="outline" size="sm" asChild>
                            <Link to="/practice?skill=speaking&part=2">
                              Start Practice
                            </Link>
                          </Button>
                        </div>
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
                      {[
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
                      ].map((item, index) => (
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
              <div className="mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Progress Tracking</CardTitle>
                    <CardDescription>Your IELTS preparation journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 bg-accent/30 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Progress charts and analytics would be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activities">
              <div className="mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>Your learning history and achievements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 bg-accent/30 flex items-center justify-center">
                      <div className="text-center">
                        <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Activity logs and history would be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="backend">
              <BackendControl />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
