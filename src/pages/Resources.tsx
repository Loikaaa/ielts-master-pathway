
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Download, FileText, Headphones, Video, Book, BookMarked, FileType2 } from 'lucide-react';

const Resources = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">IELTS Resources</h1>
            <p className="text-muted-foreground">
              Access comprehensive study materials, practice tests, and guides to help you prepare for IELTS.
            </p>
          </div>

          <Tabs defaultValue="study-materials">
            <TabsList className="mb-6">
              <TabsTrigger value="study-materials">
                <BookOpen className="h-4 w-4 mr-2" />
                Study Materials
              </TabsTrigger>
              <TabsTrigger value="practice-tests">
                <FileText className="h-4 w-4 mr-2" />
                Practice Tests
              </TabsTrigger>
              <TabsTrigger value="video-tutorials">
                <Video className="h-4 w-4 mr-2" />
                Video Tutorials
              </TabsTrigger>
              <TabsTrigger value="audio-samples">
                <Headphones className="h-4 w-4 mr-2" />
                Audio Samples
              </TabsTrigger>
            </TabsList>

            <TabsContent value="study-materials">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Reading Comprehension Strategies",
                    description: "Learn techniques for skimming, scanning, and detailed reading to improve your score",
                    icon: Book,
                    skillType: "reading"
                  },
                  {
                    title: "Academic Writing Guide",
                    description: "Master Task 1 and Task 2 writing with templates and model answers",
                    icon: FileText,
                    skillType: "writing"
                  },
                  {
                    title: "Speaking Test Preparation",
                    description: "Comprehensive guide for all three parts of the speaking test",
                    icon: Headphones,
                    skillType: "speaking"
                  },
                  {
                    title: "Listening Skills Development",
                    description: "Strategies for the four sections of the listening test",
                    icon: Headphones,
                    skillType: "listening"
                  },
                  {
                    title: "Grammar for IELTS",
                    description: "Essential grammar structures to boost your band score",
                    icon: BookMarked,
                    skillType: "writing"
                  },
                  {
                    title: "Vocabulary Builder",
                    description: "Topic-specific vocabulary with example sentences and collocations",
                    icon: FileType2,
                    skillType: "speaking"
                  }
                ].map((resource, index) => (
                  <Card key={index} className={`border-l-4 border-${resource.skillType}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <resource.icon className={`h-8 w-8 text-${resource.skillType}`} />
                      </div>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <a href="#">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="practice-tests">
              <div className="space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Complete IELTS Practice Tests</h3>
                  <p className="text-muted-foreground mb-6">
                    Full-length practice tests that simulate the actual IELTS exam. Each test includes Reading, Writing, Listening, and Speaking sections.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((testNumber) => (
                      <Card key={testNumber} className="border">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Practice Test {testNumber}</CardTitle>
                          <CardDescription>Academic Format</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="text-sm text-muted-foreground">
                            Includes Answer Key and Band Score Calculator
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <a href="#">Start Test</a>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Section-Specific Practice</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-l-4 border-reading">
                      <CardHeader>
                        <CardTitle>Reading Practice</CardTitle>
                        <CardDescription>10 practice tests with various question types</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <a href="#">Practice Reading</a>
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border-l-4 border-writing">
                      <CardHeader>
                        <CardTitle>Writing Practice</CardTitle>
                        <CardDescription>Task 1 and Task 2 with model answers</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <a href="#">Practice Writing</a>
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border-l-4 border-listening">
                      <CardHeader>
                        <CardTitle>Listening Practice</CardTitle>
                        <CardDescription>All section types with audio recordings</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <a href="#">Practice Listening</a>
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border-l-4 border-speaking">
                      <CardHeader>
                        <CardTitle>Speaking Practice</CardTitle>
                        <CardDescription>Parts 1, 2, and 3 with sample responses</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <a href="#">Practice Speaking</a>
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="video-tutorials" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Reading Section Strategy",
                    duration: "45 min",
                    instructor: "Dr. Emily Chen",
                    thumbnail: "https://placehold.co/600x400/eef/ddf",
                    skillType: "reading"
                  },
                  {
                    title: "Writing Task 1: How to Describe Graphs",
                    duration: "38 min",
                    instructor: "Michael Brown",
                    thumbnail: "https://placehold.co/600x400/efe/ded",
                    skillType: "writing"
                  },
                  {
                    title: "Speaking Part 2: The Long Turn",
                    duration: "42 min",
                    instructor: "Sarah Thompson",
                    thumbnail: "https://placehold.co/600x400/fed/fdd",
                    skillType: "speaking"
                  },
                  {
                    title: "Listening Section 3: Understanding Discussions",
                    duration: "36 min",
                    instructor: "Robert Kim",
                    thumbnail: "https://placehold.co/600x400/edf/dde",
                    skillType: "listening"
                  },
                  {
                    title: "Writing Task 2: Argument Essays",
                    duration: "52 min",
                    instructor: "Jane Stewart",
                    thumbnail: "https://placehold.co/600x400/efe/ded",
                    skillType: "writing"
                  },
                  {
                    title: "Common IELTS Mistakes to Avoid",
                    duration: "49 min",
                    instructor: "David Wilson",
                    thumbnail: "https://placehold.co/600x400/eee/ddd",
                    skillType: "reading"
                  }
                ].map((video, index) => (
                  <Card key={index} className={`border-l-4 border-${video.skillType}`}>
                    <div className="relative">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover rounded-t-lg" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="outline" className="text-white border-white">
                          <Video className="h-4 w-4 mr-2" />
                          Watch Now
                        </Button>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{video.title}</CardTitle>
                      <CardDescription>
                        {video.duration} • {video.instructor}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="audio-samples" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>IELTS Listening Practice Audio Collection</CardTitle>
                  <CardDescription>
                    Practice with authentic audio samples covering all four sections of the IELTS Listening test.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Section 1: Daily Conversation",
                        description: "Practice with everyday conversations like accommodation inquiries",
                        duration: "8:32"
                      },
                      {
                        title: "Section 2: Monologue on Everyday Topic",
                        description: "Listen to a speech about community facilities",
                        duration: "9:15"
                      },
                      {
                        title: "Section 3: Educational Discussion",
                        description: "Conversation between students discussing a project",
                        duration: "10:42"
                      },
                      {
                        title: "Section 4: Academic Lecture",
                        description: "University lecture on environmental science",
                        duration: "11:03"
                      },
                      {
                        title: "British vs. Australian Accents",
                        description: "Compare different English accents used in IELTS",
                        duration: "14:27"
                      }
                    ].map((audio, index) => (
                      <div key={index} className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium">{audio.title}</h4>
                            <p className="text-sm text-muted-foreground">{audio.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">{audio.duration}</span>
                          <Button variant="ghost" size="sm">
                            <Headphones className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
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

export default Resources;
