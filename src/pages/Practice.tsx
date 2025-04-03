
import React from 'react';
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
  Timer 
} from 'lucide-react';

// Define practice items for each skill
const practiceItems = {
  reading: [
    { 
      id: 'r1',
      title: 'Environmental Conservation',
      type: 'Multiple Choice',
      level: 'Medium',
      duration: '20 min',
      completionRate: 70,
      popular: true
    },
    { 
      id: 'r2',
      title: 'Technological Innovations in Healthcare',
      type: 'Matching Headings',
      level: 'Hard',
      duration: '25 min',
      completionRate: 40,
      popular: false
    },
    { 
      id: 'r3',
      title: 'History of Modern Architecture',
      type: 'True/False/Not Given',
      level: 'Medium',
      duration: '18 min',
      completionRate: 65,
      popular: false
    },
    { 
      id: 'r4',
      title: 'The Psychology of Decision Making',
      type: 'Summary Completion',
      level: 'Hard',
      duration: '22 min',
      completionRate: 35,
      popular: true
    },
  ],
  writing: [
    { 
      id: 'w1',
      title: 'Task 1: Bar Chart Analysis',
      type: 'Data Analysis',
      level: 'Medium',
      duration: '20 min',
      completionRate: 60,
      popular: true
    },
    { 
      id: 'w2',
      title: 'Task 2: Technology in Education',
      type: 'Argument Essay',
      level: 'Hard',
      duration: '40 min',
      completionRate: 45,
      popular: true
    },
    { 
      id: 'w3',
      title: 'Task 1: Process Diagram',
      type: 'Process Description',
      level: 'Medium',
      duration: '20 min',
      completionRate: 55,
      popular: false
    },
    { 
      id: 'w4',
      title: 'Task 2: Environmental Challenges',
      type: 'Problem/Solution Essay',
      level: 'Hard',
      duration: '40 min',
      completionRate: 40,
      popular: false
    },
  ],
  speaking: [
    { 
      id: 's1',
      title: 'Part 1: Personal Questions',
      type: 'Interview',
      level: 'Easy',
      duration: '5 min',
      completionRate: 80,
      popular: true
    },
    { 
      id: 's2',
      title: 'Part 2: Topic Card - Describe a Person',
      type: 'Monologue',
      level: 'Medium',
      duration: '4 min',
      completionRate: 65,
      popular: true
    },
    { 
      id: 's3',
      title: 'Part 3: Discussion on Technology',
      type: 'Discussion',
      level: 'Hard',
      duration: '5 min',
      completionRate: 50,
      popular: false
    },
    { 
      id: 's4',
      title: 'Pronunciation Practice - Intonation',
      type: 'Skill-building',
      level: 'Medium',
      duration: '10 min',
      completionRate: 70,
      popular: false
    },
  ],
  listening: [
    { 
      id: 'l1',
      title: 'Section 1: Accommodation Inquiry',
      type: 'Form Completion',
      level: 'Easy',
      duration: '10 min',
      completionRate: 75,
      popular: true
    },
    { 
      id: 'l2',
      title: 'Section 2: Campus Tour',
      type: 'Map Labeling',
      level: 'Medium',
      duration: '10 min',
      completionRate: 60,
      popular: false
    },
    { 
      id: 'l3',
      title: 'Section 3: Academic Discussion',
      type: 'Multiple Choice',
      level: 'Hard',
      duration: '10 min',
      completionRate: 45,
      popular: true
    },
    { 
      id: 'l4',
      title: 'Section 4: Academic Lecture',
      type: 'Sentence Completion',
      level: 'Hard',
      duration: '10 min',
      completionRate: 40,
      popular: false
    },
  ],
};

const Practice = () => {
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
          
          <Tabs defaultValue="reading">
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
            
            {/* Reading Content */}
            <TabsContent value="reading">
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
                      <Button className="w-full">Start Practice</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Writing Content */}
            <TabsContent value="writing">
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
                      <Button className="w-full">Start Practice</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Speaking Content */}
            <TabsContent value="speaking">
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
                      <Button className="w-full">Start Practice</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Listening Content */}
            <TabsContent value="listening">
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
                      <Button className="w-full">Start Practice</Button>
                    </div>
                  </div>
                ))}
              </div>
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
