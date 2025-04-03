
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Book, 
  Calendar, 
  CheckCircle, 
  Clock, 
  FileText, 
  Headphones, 
  LineChart, 
  Mic, 
  Pencil, 
  PieChart, 
  Play, 
  Trophy 
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, Alex!</h1>
              <p className="text-muted-foreground">Continue your IELTS preparation journey</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button size="sm" variant="outline" className="mr-2">
                <Calendar className="h-4 w-4 mr-2" />
                Test Date: 15 May 2025
              </Button>
              <Button size="sm">
                <Play className="h-4 w-4 mr-2" />
                Continue Learning
              </Button>
            </div>
          </div>
          
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Overall Progress</CardTitle>
                <CardDescription>Your estimated IELTS score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end mb-2">
                  <div className="text-4xl font-bold">6.5</div>
                  <div className="text-sm text-muted-foreground">Target: 7.5</div>
                </div>
                <Progress value={65} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">
                  You've improved 0.5 bands in the last 30 days
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Study Streak</CardTitle>
                <CardDescription>Keep practicing daily</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">12 Days</div>
                    <p className="text-sm text-muted-foreground">Current streak</p>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="w-full">
                      <div className={`h-2 rounded-full mb-1 ${i < 5 ? 'bg-primary' : 'bg-muted'}`}></div>
                      <div className="text-xs text-center text-muted-foreground">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Weekly Target</CardTitle>
                <CardDescription>Your study goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Study Hours</span>
                      <span className="text-sm font-medium">8 / 10 hrs</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Practice Tests</span>
                      <span className="text-sm font-medium">2 / 3</span>
                    </div>
                    <Progress value={66} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Writing Tasks</span>
                      <span className="text-sm font-medium">4 / 5</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Skill Breakdown */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Skill Breakdown</CardTitle>
              <CardDescription>Your estimated band scores by skill</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-reading/5 p-4 rounded-lg border border-reading/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-reading/10 flex items-center justify-center text-reading">
                      <Book className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Reading</h3>
                      <div className="text-2xl font-bold">6.5</div>
                    </div>
                  </div>
                  <Progress value={65} className="h-1.5 bg-reading/10" indicatorClassName="bg-reading" />
                </div>
                
                <div className="bg-writing/5 p-4 rounded-lg border border-writing/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-writing/10 flex items-center justify-center text-writing">
                      <Pencil className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Writing</h3>
                      <div className="text-2xl font-bold">6.0</div>
                    </div>
                  </div>
                  <Progress value={60} className="h-1.5 bg-writing/10" indicatorClassName="bg-writing" />
                </div>
                
                <div className="bg-speaking/5 p-4 rounded-lg border border-speaking/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-speaking/10 flex items-center justify-center text-speaking">
                      <Mic className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Speaking</h3>
                      <div className="text-2xl font-bold">7.0</div>
                    </div>
                  </div>
                  <Progress value={70} className="h-1.5 bg-speaking/10" indicatorClassName="bg-speaking" />
                </div>
                
                <div className="bg-listening/5 p-4 rounded-lg border border-listening/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-listening/10 flex items-center justify-center text-listening">
                      <Headphones className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Listening</h3>
                      <div className="text-2xl font-bold">6.5</div>
                    </div>
                  </div>
                  <Progress value={65} className="h-1.5 bg-listening/10" indicatorClassName="bg-listening" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recommended Activities */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Recommended For You</h2>
              <Button variant="outline">View All</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-8 h-8 rounded-full bg-writing/10 flex items-center justify-center text-writing mb-2">
                    <Pencil className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-lg">Task 2 Essay Writing</CardTitle>
                  <CardDescription>Improve your argument development</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>45 minutes</span>
                    <span className="mx-2">•</span>
                    <FileText className="h-4 w-4 mr-1" />
                    <span>Writing</span>
                  </div>
                  <Button className="w-full">Start Practice</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-8 h-8 rounded-full bg-reading/10 flex items-center justify-center text-reading mb-2">
                    <Book className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-lg">Reading: Matching Headings</CardTitle>
                  <CardDescription>Master this challenging question type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>30 minutes</span>
                    <span className="mx-2">•</span>
                    <FileText className="h-4 w-4 mr-1" />
                    <span>Reading</span>
                  </div>
                  <Button className="w-full">Start Practice</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-8 h-8 rounded-full bg-listening/10 flex items-center justify-center text-listening mb-2">
                    <Headphones className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-lg">Listening: Form Completion</CardTitle>
                  <CardDescription>Practice with different accents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>20 minutes</span>
                    <span className="mx-2">•</span>
                    <FileText className="h-4 w-4 mr-1" />
                    <span>Listening</span>
                  </div>
                  <Button className="w-full">Start Practice</Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Progress Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Progress Analytics</CardTitle>
              <CardDescription>Track your improvement over time</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="score">
                <TabsList className="mb-4">
                  <TabsTrigger value="score">Band Score</TabsTrigger>
                  <TabsTrigger value="time">Study Time</TabsTrigger>
                  <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
                </TabsList>
                
                <TabsContent value="score" className="space-y-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <Button variant="outline" size="sm" className="h-8">Last Week</Button>
                    <Button variant="outline" size="sm" className="h-8 bg-accent">Last Month</Button>
                    <Button variant="outline" size="sm" className="h-8">3 Months</Button>
                    <Button variant="outline" size="sm" className="h-8">6 Months</Button>
                    
                    <div className="ml-auto flex gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="text-sm">Overall</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-reading"></div>
                        <span className="text-sm">Reading</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-writing"></div>
                        <span className="text-sm">Writing</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-64 w-full flex items-end justify-between gap-4 border-b border-l p-4">
                    {/* Placeholder for analytics chart - would use recharts in a real implementation */}
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div className="w-full flex gap-1 mb-1">
                          <div className="bg-primary w-1/3 relative" style={{ height: `${100 + i * 20}px` }}>
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs">{5.5 + i * 0.25}</div>
                          </div>
                          <div className="bg-reading w-1/3" style={{ height: `${90 + i * 22}px` }}></div>
                          <div className="bg-writing w-1/3" style={{ height: `${80 + i * 25}px` }}></div>
                        </div>
                        <div className="text-xs text-muted-foreground">{`Week ${i + 1}`}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="time">
                  <div className="h-64 flex items-center justify-center border rounded-md">
                    <div className="text-muted-foreground">Study time analytics would appear here</div>
                  </div>
                </TabsContent>
                
                <TabsContent value="accuracy">
                  <div className="h-64 flex items-center justify-center border rounded-md">
                    <div className="text-muted-foreground">Accuracy analytics would appear here</div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
