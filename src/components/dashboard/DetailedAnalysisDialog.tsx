
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserProgress } from '@/contexts/UserProgressContext';
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { FileText, Mic, BookOpen, Brain, ListCheck } from 'lucide-react';

interface DetailedAnalysisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DetailedAnalysisDialog: React.FC<DetailedAnalysisDialogProps> = ({ open, onOpenChange }) => {
  const { userProgress } = useUserProgress();
  
  // Transform progress history into chart data
  const progressChartData = userProgress.progressHistory.map(entry => {
    const date = new Date(entry.date);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      reading: entry.scores.reading,
      writing: entry.scores.writing,
      listening: entry.scores.listening,
      speaking: entry.scores.speaking
    };
  });
  
  // Format improvement areas for display
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText className="h-5 w-5 text-writing" />;
      case 'Mic': return <Mic className="h-5 w-5 text-speaking" />;
      case 'BookOpen': return <BookOpen className="h-5 w-5 text-reading" />;
      case 'Brain': return <Brain className="h-5 w-5 text-listening" />;
      default: return <ListCheck className="h-5 w-5 text-primary" />;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Detailed Performance Analysis</DialogTitle>
          <DialogDescription>
            In-depth analysis of your IELTS preparation progress
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="progress">
          <TabsList className="mb-6">
            <TabsTrigger value="progress">Score Progress</TabsTrigger>
            <TabsTrigger value="improvements">Focus Areas</TabsTrigger>
            <TabsTrigger value="activities">Recent Activities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress">
            <div className="h-[300px] mb-6">
              <h3 className="text-lg font-medium mb-2">Band Score Progression</h3>
              <ChartContainer
                config={{
                  reading: { color: "hsl(var(--reading))" },
                  writing: { color: "hsl(var(--writing))" },
                  listening: { color: "hsl(var(--listening))" },
                  speaking: { color: "hsl(var(--speaking))" },
                }}
              >
                <LineChart data={progressChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 9]} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="reading" name="Reading" stroke="hsl(var(--reading))" />
                  <Line type="monotone" dataKey="writing" name="Writing" stroke="hsl(var(--writing))" />
                  <Line type="monotone" dataKey="listening" name="Listening" stroke="hsl(var(--listening))" />
                  <Line type="monotone" dataKey="speaking" name="Speaking" stroke="hsl(var(--speaking))" />
                </LineChart>
              </ChartContainer>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Current Status</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Overall Band</p>
                  <p className="text-2xl font-bold">{userProgress.currentBand.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Target Band</p>
                  <p className="text-2xl font-bold">{userProgress.targetBand.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Study Time Completed</p>
                  <p className="text-xl font-bold">{userProgress.studyTime.current} hours</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Achievements Unlocked</p>
                  <p className="text-xl font-bold">
                    {userProgress.achievements.filter(a => a.achieved).length} / {userProgress.achievements.length}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="improvements">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Improvement Areas</h3>
              
              {userProgress.improvementAreas.map((area, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      {getIconComponent(area.icon)}
                      <span className="font-medium ml-2">{area.name}</span>
                    </div>
                    <span className="text-sm font-medium">{area.priority} Priority</span>
                  </div>
                  <Progress value={area.progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {area.description}
                  </p>
                </div>
              ))}
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Focus on your high priority improvement areas first</li>
                  <li>Aim to spend at least 2 hours per week on each focus area</li>
                  <li>Review your progress weekly and adjust your study plan as needed</li>
                  <li>Use the practice materials available in each skill section</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="activities">
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              <h3 className="text-lg font-medium mb-2">Activity Log</h3>
              
              {userProgress.activities.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No activities recorded yet. Complete practice tests and study sessions to start tracking your progress.
                </p>
              ) : (
                <div className="relative pl-6 border-l">
                  {userProgress.activities.map((activity, index) => (
                    <div key={index} className="mb-6 relative last:mb-0">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-7 mt-1.5"></div>
                      <div className="flex items-start">
                        <div className={`bg-${activity.color}/10 p-2 rounded-full mr-3`}>
                          {getIconComponent(activity.icon)}
                        </div>
                        <div>
                          <h3 className="font-medium">{activity.activity}</h3>
                          <p className="text-sm text-muted-foreground">{activity.result}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailedAnalysisDialog;
