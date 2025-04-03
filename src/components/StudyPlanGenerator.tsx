
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Book, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface StudyPlanData {
  currentLevel: string;
  targetScore: string;
  weakestSkills: string[];
  studyDuration: number; // in weeks
  hoursPerWeek: number;
  examDate?: string;
}

interface StudyPlanGeneratorProps {
  quizAnswers: Record<string, string>;
}

const StudyPlanGenerator: React.FC<StudyPlanGeneratorProps> = ({ quizAnswers }) => {
  // Generate a study plan based on the quiz answers
  const generateStudyPlan = (answers: Record<string, string>): StudyPlanData => {
    // Map the English level from question 1
    let currentLevel = 'Band 5.0';
    if (answers['1'] === 'a') currentLevel = 'Band 4.0';
    if (answers['1'] === 'b') currentLevel = 'Band 5.0';
    if (answers['1'] === 'c') currentLevel = 'Band 6.0';
    if (answers['1'] === 'd') currentLevel = 'Band 7.0';
    
    // Map the target score from question 3
    let targetScore = 'Band 6.5';
    if (answers['3'] === 'a') targetScore = 'Band 5.5';
    if (answers['3'] === 'b') targetScore = 'Band 6.5';
    if (answers['3'] === 'c') targetScore = 'Band 7.5';
    if (answers['3'] === 'd') targetScore = 'Band 8.0+';
    
    // Identify weak areas from question 4
    const weakestSkill = answers['4'] || 'a';
    const weakestSkillMap: Record<string, string> = {
      'a': 'Reading',
      'b': 'Writing',
      'c': 'Speaking',
      'd': 'Listening'
    };
    
    // Determine study duration based on target score and current level
    let studyDuration = 12; // default 12 weeks
    const scoreDifference = parseInt(targetScore.split(' ')[1].replace('+', '')) - 
                           parseInt(currentLevel.split(' ')[1]);
    
    if (scoreDifference <= 0.5) studyDuration = 4;
    else if (scoreDifference <= 1) studyDuration = 8;
    else if (scoreDifference <= 1.5) studyDuration = 12;
    else studyDuration = 16;
    
    // Hours per week from question 5
    let hoursPerWeek = 10;
    if (answers['5'] === 'a') hoursPerWeek = 4;
    if (answers['5'] === 'b') hoursPerWeek = 7;
    if (answers['5'] === 'c') hoursPerWeek = 12;
    if (answers['5'] === 'd') hoursPerWeek = 15;
    
    // Adjust study duration based on available study time
    if (hoursPerWeek < 5 && studyDuration < 12) {
      studyDuration += 4; // If limited time available, extend duration
    }
    
    // Determine weak skills (include the main weak skill and add a secondary one)
    const weakestSkills = [weakestSkillMap[weakestSkill]];
    
    // Add a secondary weak skill based on common combinations
    if (weakestSkill === 'a') weakestSkills.push('Writing'); // Reading + Writing are related
    else if (weakestSkill === 'b') weakestSkills.push('Speaking'); // Writing + Speaking (expression)
    else if (weakestSkill === 'c') weakestSkills.push('Listening'); // Speaking + Listening
    else weakestSkills.push('Reading'); // Listening + Reading
    
    return {
      currentLevel,
      targetScore,
      weakestSkills,
      studyDuration,
      hoursPerWeek
    };
  };
  
  const studyPlan = generateStudyPlan(quizAnswers);
  
  // Calculate study hours distribution across skills
  const calculateHoursDistribution = () => {
    const totalHoursPerWeek = studyPlan.hoursPerWeek;
    const weakestSkillHours = Math.ceil(totalHoursPerWeek * 0.4); // 40% on weakest skill
    const secondWeakestHours = Math.ceil(totalHoursPerWeek * 0.25); // 25% on second weakness
    const remainingHours = totalHoursPerWeek - weakestSkillHours - secondWeakestHours;
    const otherSkillsHours = Math.floor(remainingHours / 2); // Split remaining between other skills
    
    const distribution = {
      Reading: otherSkillsHours,
      Writing: otherSkillsHours,
      Speaking: otherSkillsHours,
      Listening: otherSkillsHours
    };
    
    // Assign more hours to weak skills
    if (studyPlan.weakestSkills.length > 0) {
      distribution[studyPlan.weakestSkills[0] as keyof typeof distribution] = weakestSkillHours;
    }
    
    if (studyPlan.weakestSkills.length > 1) {
      distribution[studyPlan.weakestSkills[1] as keyof typeof distribution] = secondWeakestHours;
    }
    
    return distribution;
  };
  
  const hoursDistribution = calculateHoursDistribution();
  
  // Generate a weekly schedule
  const generateWeeklySchedule = () => {
    // A simple template-based schedule
    return [
      { day: 'Monday', activities: [`${hoursDistribution.Reading / 2}h Reading practice`, `${hoursDistribution.Writing / 2}h Writing task 1`] },
      { day: 'Tuesday', activities: [`${hoursDistribution.Listening / 2}h Listening practice`, `${hoursDistribution.Speaking / 2}h Speaking practice`] },
      { day: 'Wednesday', activities: [`${hoursDistribution.Reading / 2}h Reading practice`, `${hoursDistribution.Writing / 2}h Writing task 2`] },
      { day: 'Thursday', activities: [`${hoursDistribution.Listening / 2}h Listening practice`, `${hoursDistribution.Speaking / 2}h Speaking practice`] },
      { day: 'Friday', activities: [`1h Grammar review`, `1h Vocabulary building`] },
      { day: 'Saturday', activities: [`2h Mock test`] },
      { day: 'Sunday', activities: [`1h Review weak areas`, `Rest`] }
    ];
  };
  
  const weeklySchedule = generateWeeklySchedule();
  
  // Generate skill improvement strategies
  const generateSkillStrategies = () => {
    const strategies = {
      Reading: [
        "Practice skimming and scanning techniques",
        "Improve reading speed with timed exercises",
        "Build academic vocabulary",
        "Practice identifying main ideas and supporting details"
      ],
      Writing: [
        "Learn essay structures for Task 1 and Task 2",
        "Practice paraphrasing to avoid repetition",
        "Learn linking words and cohesive devices",
        "Review grammar rules for complex sentences"
      ],
      Speaking: [
        "Practice with regular speaking partners",
        "Record yourself and analyze your pronunciation",
        "Learn common Part 1, 2, and 3 topics",
        "Build vocabulary for describing experiences"
      ],
      Listening: [
        "Practice note-taking during audio playback",
        "Listen to various English accents",
        "Train yourself to identify signpost words",
        "Practice with different question types"
      ]
    };
    
    return strategies;
  };
  
  const skillStrategies = generateSkillStrategies();
  
  const estimateCompletionDate = () => {
    const currentDate = new Date();
    const completionDate = new Date(currentDate);
    completionDate.setDate(completionDate.getDate() + (studyPlan.studyDuration * 7));
    return completionDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-primary/5">
          <CardTitle>Your Personalized IELTS Study Plan</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="bg-accent/30 p-6 rounded-xl mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Current Level</h4>
                <p className="text-xl font-semibold">{studyPlan.currentLevel}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Target Score</h4>
                <p className="text-xl font-semibold">{studyPlan.targetScore}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Focus Areas</h4>
                <p className="text-xl font-semibold">{studyPlan.weakestSkills.join(', ')}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Estimated Completion</h4>
                <p className="text-xl font-semibold">{estimateCompletionDate()}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Study Duration</h4>
                <p className="text-xl font-semibold">{studyPlan.studyDuration} Weeks</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Study Hours/Week</h4>
                <p className="text-xl font-semibold">{studyPlan.hoursPerWeek} Hours</p>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
              <TabsTrigger value="skills">Skill Improvement</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Plan Overview</h3>
                <p>Based on your current level and target score, we've created a {studyPlan.studyDuration}-week study plan focusing on your weakest areas: {studyPlan.weakestSkills.join(' and ')}.</p>
                
                <h4 className="text-md font-medium mt-4">Weekly Hours Distribution</h4>
                <div className="space-y-3">
                  {Object.entries(hoursDistribution).map(([skill, hours]) => (
                    <div key={skill}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{skill}</span>
                        <span className="text-sm text-muted-foreground">{hours} hours/week</span>
                      </div>
                      <Progress value={(hours / studyPlan.hoursPerWeek) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700 mt-4">
                  <h4 className="font-medium mb-1">Study Plan Key Points</h4>
                  <ul className="text-sm list-disc ml-5 mt-2">
                    <li>Focus on your weak areas while maintaining balanced practice</li>
                    <li>Consistent daily practice is more effective than cramming</li>
                    <li>Use official IELTS practice materials</li>
                    <li>Take regular mock tests to track your progress</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-4">
              <h3 className="text-lg font-medium">Recommended Weekly Schedule</h3>
              <p className="text-sm text-muted-foreground mb-4">This schedule is designed to fit your {studyPlan.hoursPerWeek} hours per week availability.</p>
              
              <div className="space-y-3">
                {weeklySchedule.map((day, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="bg-muted p-3 border-b">
                      <h4 className="font-medium">{day.day}</h4>
                    </div>
                    <CardContent className="p-3">
                      <ul className="space-y-1">
                        {day.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="skills" className="space-y-4">
              <h3 className="text-lg font-medium">Skill Improvement Strategies</h3>
              <p className="text-sm text-muted-foreground mb-4">Focus on these techniques to improve your weak areas:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(skillStrategies).map(([skill, strategies]) => (
                  <Card key={skill} className={studyPlan.weakestSkills.includes(skill) ? "border-primary/50 shadow-md" : ""}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">{skill}</CardTitle>
                      {studyPlan.weakestSkills.includes(skill) && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Focus Area</span>
                      )}
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {strategies.map((strategy, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{strategy}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-4">
              <h3 className="text-lg font-medium">Recommended Resources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Practice Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Book className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium block">Cambridge IELTS 14-17</span>
                          <span className="text-sm text-muted-foreground">Official past papers with answers</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Book className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium block">IELTS Trainer</span>
                          <span className="text-sm text-muted-foreground">Six practice tests with answers</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Book className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium block">Official IELTS Practice Materials</span>
                          <span className="text-sm text-muted-foreground">With CD for listening tests</span>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Online Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium block">IELTS Practice Tests</span>
                          <span className="text-sm text-muted-foreground">Free practice tests on our platform</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium block">IELTS Liz</span>
                          <span className="text-sm text-muted-foreground">Free tips, lessons & practice tests</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium block">BBC Learning English</span>
                          <span className="text-sm text-muted-foreground">Free resources for English learners</span>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-center mt-6">
                <Link to="/practice">
                  <Button size="lg">Start Practicing Now</Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyPlanGenerator;
