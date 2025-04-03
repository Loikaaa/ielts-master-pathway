
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Award, BookOpen, Calendar, ChevronRight, Star, User } from 'lucide-react';
import { Link } from 'react-router-dom';

// Success stories data
const successStories = [
  {
    id: 'story1',
    name: 'Sarah Chen',
    avatar: 'https://placehold.co/200/png?text=SC',
    country: 'China',
    targetScore: 'Band 7.0',
    achievedScore: 'Band 8.0',
    studyDuration: '3 months',
    testimonial: 'I had been stuck at band 6.5 for over a year, but after following the strategies in the Neplia IELTS program, I was able to increase my score to band 8.0 in just three months. The speaking practice with AI feedback was incredibly helpful for improving my pronunciation and fluency.',
    challenge: 'Speaking fluency and pronunciation',
    occupation: 'Medical Student',
    destination: 'Australia',
    image: 'https://placehold.co/600x400/png?text=Success+Story',
    date: 'February 2025'
  },
  {
    id: 'story2',
    name: 'Raj Patel',
    avatar: 'https://placehold.co/200/png?text=RP',
    country: 'India',
    targetScore: 'Band 7.5',
    achievedScore: 'Band 8.5',
    studyDuration: '4 months',
    testimonial: 'The personalized study plan made all the difference for me. I used to struggle with the writing section, but the detailed feedback on my essays helped me understand exactly how to improve. The mock tests were so similar to the actual exam that I felt completely prepared on test day.',
    challenge: 'Academic writing structure',
    occupation: 'Software Engineer',
    destination: 'Canada',
    image: 'https://placehold.co/600x400/png?text=Success+Story',
    date: 'January 2025'
  },
  {
    id: 'story3',
    name: 'Maria Rodriguez',
    avatar: 'https://placehold.co/200/png?text=MR',
    country: 'Colombia',
    targetScore: 'Band 6.5',
    achievedScore: 'Band 7.5',
    studyDuration: '5 months',
    testimonial: 'As a non-native speaker, the listening section was always difficult for me, especially with different accents. The targeted listening exercises on Neplia IELTS helped me develop the skills to understand various English accents. I exceeded my target band score and was accepted into my dream university!',
    challenge: 'Listening comprehension',
    occupation: 'Marketing Professional',
    destination: 'United Kingdom',
    image: 'https://placehold.co/600x400/png?text=Success+Story',
    date: 'March 2025'
  },
  {
    id: 'story4',
    name: 'Ahmed Hassan',
    avatar: 'https://placehold.co/200/png?text=AH',
    country: 'Egypt',
    targetScore: 'Band 7.0',
    achievedScore: 'Band 7.5',
    studyDuration: '2 months',
    testimonial: 'I only had two months to prepare for my IELTS test due to visa deadlines. The intensive practice courses and daily exercises on Neplia IELTS made it possible for me to achieve my required score in such a short time. The reading strategies were particularly helpful.',
    challenge: 'Time management in reading',
    occupation: 'Civil Engineer',
    destination: 'New Zealand',
    image: 'https://placehold.co/600x400/png?text=Success+Story',
    date: 'December 2024'
  },
  {
    id: 'story5',
    name: 'Yuki Tanaka',
    avatar: 'https://placehold.co/200/png?text=YT',
    country: 'Japan',
    targetScore: 'Band 6.5',
    achievedScore: 'Band 7.0',
    studyDuration: '6 months',
    testimonial: 'The community support on Neplia IELTS was incredible. Being able to practice speaking with other students and get feedback from teachers motivated me to keep improving. The detailed grammar lessons helped me correct mistakes I didn't even know I was making.',
    challenge: 'Grammar and vocabulary',
    occupation: 'Graduate Student',
    destination: 'United States',
    image: 'https://placehold.co/600x400/png?text=Success+Story',
    date: 'January 2025'
  },
  {
    id: 'story6',
    name: 'Carlos Mendes',
    avatar: 'https://placehold.co/200/png?text=CM',
    country: 'Brazil',
    targetScore: 'Band 7.0',
    achievedScore: 'Band 8.0',
    studyDuration: '4 months',
    testimonial: 'After two failed attempts at reaching my target score, I found Neplia IELTS. The difference was the structured approach and detailed feedback on my performance. I especially appreciated the writing correction service that pointed out patterns in my mistakes.',
    challenge: 'Task 2 essay writing',
    occupation: 'Financial Analyst',
    destination: 'Canada',
    image: 'https://placehold.co/600x400/png?text=Success+Story',
    date: 'February 2025'
  }
];

const SuccessStories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Read how students just like you achieved their target IELTS scores and fulfilled their dreams
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-6 md:p-8 border border-primary/20">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                    <Avatar className="w-full h-full border-4 border-background">
                      <AvatarImage src={successStories[0].avatar} alt={successStories[0].name} />
                      <AvatarFallback>{successStories[0].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <Award className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <div className="text-center md:text-left">
                    <Badge className="mb-2">{successStories[0].country}</Badge>
                    <h2 className="text-2xl font-bold mb-1">{successStories[0].name}</h2>
                    <p className="text-muted-foreground mb-3">{successStories[0].occupation}</p>
                    <div className="flex gap-2 justify-center md:justify-start mb-3">
                      <div className="bg-background rounded-full px-3 py-1 text-sm font-medium">
                        Target: {successStories[0].targetScore}
                      </div>
                      <div className="bg-primary/20 text-primary rounded-full px-3 py-1 text-sm font-medium">
                        Achieved: {successStories[0].achievedScore}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <blockquote className="text-lg italic">
                    "{successStories[0].testimonial}"
                  </blockquote>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Challenge overcome:</span> {successStories[0].challenge}
                    </div>
                    <Button size="sm" variant="outline" className="story-link">
                      Read Full Story <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                Success Metrics
              </h3>
              
              <div className="space-y-4">
                <div className="bg-accent/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Average Score Improvement</p>
                  <p className="text-2xl font-bold">+1.2 Bands</p>
                </div>
                
                <div className="bg-accent/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Students Reaching Target</p>
                  <p className="text-2xl font-bold">92%</p>
                </div>
                
                <div className="bg-accent/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Average Study Duration</p>
                  <p className="text-2xl font-bold">3.5 Months</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-3">Would You Like to Share Your Success?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you've achieved your target IELTS score using our platform, we'd love to hear your story!
                </p>
                <Button className="w-full">Share Your Story</Button>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">More Success Stories</h2>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Stories</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="general">General Training</TabsTrigger>
              <TabsTrigger value="recent">Recently Added</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {successStories.slice(1).map((story) => (
                  <SuccessCard key={story.id} story={story} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="academic" className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {successStories.slice(1, 4).map((story) => (
                  <SuccessCard key={story.id} story={story} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="general" className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {successStories.slice(3, 6).map((story) => (
                  <SuccessCard key={story.id} story={story} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {successStories.slice(1, 5).map((story) => (
                  <SuccessCard key={story.id} story={story} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 text-center">
            <Button variant="outline" className="mx-auto">Load More Stories</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Success story card component
interface SuccessCardProps {
  story: {
    id: string;
    name: string;
    avatar: string;
    country: string;
    targetScore: string;
    achievedScore: string;
    studyDuration: string;
    testimonial: string;
    challenge: string;
    occupation: string;
    destination: string;
    image: string;
    date: string;
  };
}

const SuccessCard: React.FC<SuccessCardProps> = ({ story }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={story.image} 
          alt={`${story.name}'s success story`} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-background/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex items-center">
          <Avatar className="border-2 border-background mr-2">
            <AvatarImage src={story.avatar} alt={story.name} />
            <AvatarFallback>{story.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-white drop-shadow-sm">{story.name}</p>
            <p className="text-xs text-white/90 drop-shadow-sm">{story.country}</p>
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{story.occupation}</CardTitle>
            <p className="text-sm text-muted-foreground">Destination: {story.destination}</p>
          </div>
          <div className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
            {story.achievedScore}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          "{story.testimonial}"
        </p>
        
        <div className="flex justify-between text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">{story.date}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">{story.studyDuration}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessStories;
