
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import TestimonialsSection from '@/components/TestimonialsSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Award, BookOpen, Calendar, ChevronRight, Star, User, MapPin, Target, Clock, TrendingUp, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    testimonial: "The community support on Neplia IELTS was incredible. Being able to practice speaking with other students and get feedback from teachers motivated me to keep improving. The detailed grammar lessons helped me correct mistakes I didn't even know I was making.",
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
  const [filter, setFilter] = useState('all');
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-accent/5">
      <NavBar />
      <main className="flex-grow pt-20 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 py-1.5 px-4 text-sm bg-primary/10 text-primary border-primary/20">Real Student Results</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Success Stories</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how students from around the world achieved their IELTS goals and opened doors to new opportunities
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 md:p-10 border border-primary/10 shadow-xl">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="relative w-40 h-40">
                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                    <Avatar className="w-full h-full border-4 border-background">
                      <AvatarImage src={successStories[0].avatar} alt={successStories[0].name} />
                      <AvatarFallback>{successStories[0].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground rounded-full p-2.5">
                      <Award className="h-6 w-6" />
                    </div>
                  </div>
                  
                  <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                      <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
                        <MapPin className="h-3 w-3 mr-1" /> {successStories[0].country}
                      </Badge>
                      <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
                        <Target className="h-3 w-3 mr-1" /> {successStories[0].destination}
                      </Badge>
                    </div>
                    <h2 className="text-3xl font-bold mb-1">{successStories[0].name}</h2>
                    <p className="text-muted-foreground mb-4">{successStories[0].occupation}</p>
                    <div className="flex gap-3 justify-center md:justify-start mb-3">
                      <div className="bg-background/70 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-medium">
                        Target: {successStories[0].targetScore}
                      </div>
                      <div className="bg-primary/20 text-primary rounded-full px-3 py-1.5 text-sm font-medium">
                        Achieved: {successStories[0].achievedScore}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <blockquote className="text-xl italic relative pl-6 border-l-4 border-primary/30">
                    <span className="absolute top-0 left-0 text-primary text-4xl opacity-20">"</span>
                    {successStories[0].testimonial}
                  </blockquote>
                  <div className="mt-6 flex justify-between items-center">
                    <div className="flex items-center text-sm bg-background/50 backdrop-blur-sm rounded-full px-4 py-2">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">Study duration:</span>
                      <span className="ml-2 text-muted-foreground">{successStories[0].studyDuration}</span>
                    </div>
                    <Button size="lg" className="group">
                      Read Full Story 
                      <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm shadow-xl border-primary/10 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <TrendingUp className="h-5 w-5 text-primary mr-2" />
                    Success Metrics
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                      <p className="text-sm text-muted-foreground mb-1">Average Score Improvement</p>
                      <div className="flex items-end gap-2">
                        <p className="text-3xl font-bold text-primary">+1.2</p>
                        <p className="text-lg font-medium mb-0.5">Bands</p>
                      </div>
                    </div>
                    
                    <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                      <p className="text-sm text-muted-foreground mb-1">Students Reaching Target</p>
                      <div className="flex items-end gap-2">
                        <p className="text-3xl font-bold text-primary">92%</p>
                      </div>
                    </div>
                    
                    <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                      <p className="text-sm text-muted-foreground mb-1">Average Study Duration</p>
                      <div className="flex items-end gap-2">
                        <p className="text-3xl font-bold text-primary">3.5</p>
                        <p className="text-lg font-medium mb-0.5">Months</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="font-semibold mb-3 text-lg">Share Your Success Story</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      If you've achieved your target IELTS score using our platform, we'd love to hear and feature your journey!
                    </p>
                    <Button className="w-full">Share Your Story</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">More Success Stories</h2>
              
              <div className="flex items-center mt-4 md:mt-0">
                <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                  <Filter className="h-4 w-4" />
                  Filter Stories
                </Button>
              </div>
            </div>
          
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-8 w-full max-w-md mx-auto grid grid-cols-4 h-auto bg-primary/5">
                <TabsTrigger value="all" className="py-2.5">All</TabsTrigger>
                <TabsTrigger value="academic" className="py-2.5">Academic</TabsTrigger>
                <TabsTrigger value="general" className="py-2.5">General</TabsTrigger>
                <TabsTrigger value="recent" className="py-2.5">Recent</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-0">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {successStories.slice(1).map((story) => (
                    <motion.div key={story.id} variants={item}>
                      <SuccessCard story={story} />
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
              
              <TabsContent value="academic" className="space-y-0">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {successStories.slice(1, 4).map((story) => (
                    <motion.div key={story.id} variants={item}>
                      <SuccessCard story={story} />
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
              
              <TabsContent value="general" className="space-y-0">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {successStories.slice(3, 6).map((story) => (
                    <motion.div key={story.id} variants={item}>
                      <SuccessCard story={story} />
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
              
              <TabsContent value="recent" className="space-y-0">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {successStories.slice(1, 5).map((story) => (
                    <motion.div key={story.id} variants={item}>
                      <SuccessCard story={story} />
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
          
          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" className="mx-auto px-8">
              Load More Stories
            </Button>
          </div>
          
          <TestimonialsSection />
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
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full border-primary/10 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={story.image} 
          alt={`${story.name}'s success story`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-background/90 to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex items-center">
          <Avatar className="border-2 border-background mr-3">
            <AvatarImage src={story.avatar} alt={story.name} />
            <AvatarFallback>{story.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-white drop-shadow-sm">{story.name}</p>
            <div className="flex items-center text-xs text-white/90 drop-shadow-sm">
              <MapPin className="h-3 w-3 mr-1" />
              {story.country}
            </div>
          </div>
        </div>
        <div className="absolute top-3 right-3 bg-primary/80 backdrop-blur-sm text-white rounded-full px-2.5 py-1 text-xs font-bold">
          {story.achievedScore}
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{story.occupation}</CardTitle>
            <p className="text-sm text-muted-foreground flex items-center">
              <Target className="h-3 w-3 mr-1" />
              Destination: {story.destination}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 italic">
          "{story.testimonial}"
        </p>
        
        <div className="flex justify-between text-sm pt-3 border-t">
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
