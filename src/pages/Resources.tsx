
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  MessageSquare, 
  Trophy, 
  LightbulbIcon, 
  Calendar, 
  Clock, 
  User, 
  ChevronRight,
  Pencil,
  Headphones,
  Mic
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Resources = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('blog');
  
  // Sample data for each section
  const blogPosts = [
    {
      id: 1,
      title: "5 Most Common Mistakes in IELTS Writing Task 2",
      excerpt: "Learn about the frequent errors that candidates make in their essays and how to avoid them.",
      date: "April 2, 2025",
      readTime: "8 min read",
      author: "Sarah Johnson",
      category: "Writing",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "Strategies for IELTS Listening Section",
      excerpt: "Effective techniques to improve your score in the listening module of the IELTS test.",
      date: "March 28, 2025",
      readTime: "6 min read",
      author: "Michael Chen",
      category: "Listening",
      image: "https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      title: "How to Practice English Speaking Every Day",
      excerpt: "Practical ways to incorporate English speaking practice into your daily routine.",
      date: "March 20, 2025",
      readTime: "5 min read",
      author: "Emma Wilson",
      category: "Speaking",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
  ];
  
  const faqs = [
    {
      question: "What is the difference between IELTS Academic and General Training?",
      answer: "IELTS Academic is typically required for admission to universities and professional institutions, while IELTS General Training is usually required for migration purposes to English-speaking countries or for secondary education and work experience."
    },
    {
      question: "How long is an IELTS score valid?",
      answer: "IELTS scores are valid for 2 years from the test date. Most universities and immigration authorities require results that are less than 2 years old."
    },
    {
      question: "How is the IELTS test scored?",
      answer: "IELTS is scored on a 9-band scale, with each band corresponding to a level of English competence. Your overall band score is calculated by taking the mean of your scores in the four test components: Listening, Reading, Writing, and Speaking."
    },
    {
      question: "How long does it take to prepare for IELTS?",
      answer: "Preparation time varies greatly depending on your current English level, target score, and how much time you can dedicate to study. On average, candidates spend 4-12 weeks preparing for the test."
    },
    {
      question: "Can I retake only one section of the IELTS test?",
      answer: "No, if you want to improve your score in any section, you must retake the complete test, including all four components."
    },
  ];
  
  const successStories = [
    {
      name: "Priya Sharma",
      score: "8.5",
      destination: "University of Toronto",
      quote: "The focused practice on the platform helped me identify and improve my weaknesses in writing. I exceeded my target score and secured admission to my dream university.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      fullStory: "As an international student applying to top universities in Canada, I knew I needed a high IELTS score. Initially, I struggled with the writing section, especially Task 2 essays. I couldn't organize my thoughts effectively and my arguments lacked coherence. After using Neplia IELTS platform for 8 weeks, the structured approach to essay writing and personalized feedback transformed my writing. The AI-powered analysis identified patterns in my mistakes that even my human tutors had missed. I practiced regularly with the timed exercises, which improved my speed and reduced my anxiety. On test day, I felt confident and prepared. When I received my scores - an overall 8.5 with 8.0 in Writing - I was thrilled! This exceeded the requirements for the University of Toronto's competitive program, and I'm now pursuing my Master's degree there. I recommend this platform to anyone serious about achieving their target IELTS score."
    },
    {
      name: "Carlos Mendez",
      score: "7.0",
      destination: "Australia PR",
      quote: "The mock tests were incredibly similar to the actual IELTS exam. The detailed feedback improved my confidence and I achieved the score I needed for my visa application.",
      image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      fullStory: "Applying for Permanent Residency in Australia was my dream, but I needed a minimum score of 7 in each IELTS band. My first attempt resulted in disappointing scores: Reading 6.5, Listening 6.0, Speaking 7.0, and Writing 5.5. I realized I needed professional help, especially for the writing and listening sections. The Neplia IELTS platform caught my attention because of its focus on personalized preparation. The diagnostic test accurately identified my weaknesses in understanding different accents in the listening section and development of ideas in writing. The platform's adaptive learning system customized practice materials specifically for my needs. What impressed me most were the mock tests - they perfectly simulated the pressure and format of the real exam. After three months of dedicated practice, I retook the IELTS and achieved my target score of 7.0 in all sections. This was exactly what I needed for my PR application. Today, I'm happily settled in Melbourne, working in my field, and building my future in Australia."
    },
    {
      name: "Liu Wei",
      score: "7.5",
      destination: "University College London",
      quote: "I struggled with speaking until I used the AI practice tool. The personalized feedback was invaluable, and I improved from 6.0 to 7.5 in just two months.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      fullStory: "When I received my conditional offer from University College London, I was ecstatic - until I realized I needed an IELTS score of 7.0 with no band below 6.5. As a Chinese student who had limited opportunities to practice English conversation, I was most concerned about the speaking test. In my first attempt, I scored only 6.0 in speaking, which wasn't enough. What made the Neplia IELTS platform different from other resources I tried was the AI-powered speaking practice. I could practice at any time, receiving immediate feedback on my pronunciation, fluency, grammar, and vocabulary. The system detected my tendency to use simple sentence structures and limited vocabulary. It suggested specific improvements and tracked my progress over time. The virtual interviewer mimicked real IELTS speaking tests, asking follow-up questions and reducing my anxiety about the format. After two months of daily practice, my speaking improved dramatically. I retook the test and scored 7.5 in speaking! This exceeded UCL's requirements, and I'm now studying my dream program in London. The platform was truly a game-changer for my English speaking skills."
    },
  ];
  
  const ieltsQuickTips = [
    {
      module: "Reading",
      tips: [
        "Read the questions before reading the passage",
        "Practice skimming and scanning techniques",
        "Pay attention to keywords in questions",
        "Be mindful of time management - allocate time for each section"
      ]
    },
    {
      module: "Writing",
      tips: [
        "Plan your essay before you start writing",
        "Use a variety of sentence structures",
        "Stay on topic and answer the question directly",
        "Proofread your work for grammar and spelling errors"
      ]
    },
    {
      module: "Listening",
      tips: [
        "Read instructions carefully before the audio starts",
        "Preview the questions to know what to listen for",
        "Pay attention to signpost words like 'however', 'in addition'",
        "Be aware of synonyms and paraphrasing"
      ]
    },
    {
      module: "Speaking",
      tips: [
        "Practice speaking English daily",
        "Record yourself to identify pronunciation issues",
        "Expand your vocabulary for different topics",
        "Structure your responses with an introduction, details, and conclusion"
      ]
    },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Function to handle full story view
  const handleViewFullStory = (story) => {
    // We'll pass the story data through state navigation
    navigate('/resources/success-stories', { state: { selectedStory: story } });
  };

  // Function to handle IELTS tips navigation
  const handleViewIeltsTips = (module) => {
    navigate('/resources/ielts-tips', { state: { selectedModule: module } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12 relative">
        {/* Colorful background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[10%] -left-[10%] w-1/2 h-1/2 bg-reading/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[10%] -right-[10%] w-1/2 h-1/2 bg-speaking/10 rounded-full blur-3xl"></div>
          <div className="absolute top-[40%] -right-[10%] w-1/3 h-1/3 bg-writing/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[40%] -left-[10%] w-1/3 h-1/3 bg-listening/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              IELTS Resources
            </h1>
            <p className="text-muted-foreground text-lg">
              Access our comprehensive collection of resources to enhance your IELTS preparation
            </p>
          </motion.div>
          
          <Tabs 
            defaultValue="blog" 
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-8 flex justify-center bg-background/50 backdrop-blur-sm border border-border/50 p-1 rounded-lg">
              <TabsTrigger value="blog" className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <BookOpen className="mr-2 h-4 w-4" />
                Blog
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <MessageSquare className="mr-2 h-4 w-4" />
                FAQ
              </TabsTrigger>
              <TabsTrigger value="success-stories" className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Trophy className="mr-2 h-4 w-4" />
                Success Stories
              </TabsTrigger>
              <TabsTrigger value="tips" className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <LightbulbIcon className="mr-2 h-4 w-4" />
                IELTS Tips
              </TabsTrigger>
            </TabsList>
            
            {/* Blog Section */}
            <TabsContent value="blog">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate={activeTab === "blog" ? "visible" : "hidden"}
              >
                {blogPosts.map(post => (
                  <motion.div key={post.id} variants={fadeInUp}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full border-primary/20">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center mb-2">
                          <span className={`px-2 py-1 bg-${post.category.toLowerCase()}/20 text-${post.category.toLowerCase()} text-xs rounded-full`}>
                            {post.category}
                          </span>
                        </div>
                        <CardTitle className="text-xl hover:text-primary transition-colors">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="mr-4">{post.date}</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center border-t pt-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span className="text-sm">{post.author}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 transition-colors">
                          Read More <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              <div className="mt-8 text-center">
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300">
                  View All Blog Posts
                </Button>
              </div>
            </TabsContent>
            
            {/* FAQ Section */}
            <TabsContent value="faq">
              <motion.div
                initial="hidden"
                animate={activeTab === "faq" ? "visible" : "hidden"}
                variants={fadeInUp}
              >
                <Card className="border-primary/20 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      Frequently Asked Questions
                    </CardTitle>
                    <CardDescription>
                      Find answers to common questions about IELTS and our platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {faqs.map((faq, index) => (
                        <motion.div 
                          key={index} 
                          className="border-b pb-4 last:border-0 hover:bg-muted/10 p-4 rounded-md -mx-4 transition-colors"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <span className="text-primary mr-2">Q.</span> {faq.question}
                          </h3>
                          <p className="text-muted-foreground ml-5">{faq.answer}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                      Don't see your question here? <RouterLink to="/contact" className="text-primary hover:underline">Contact us</RouterLink> for more information.
                    </p>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>
            
            {/* Success Stories */}
            <TabsContent value="success-stories">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate={activeTab === "success-stories" ? "visible" : "hidden"}
              >
                {successStories.map((story, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full border-primary/20">
                      <div className="relative">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={story.image} 
                            alt={story.name}
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                          />
                        </div>
                        <div className="absolute top-4 right-4 bg-gradient-to-br from-primary to-primary/80 text-white text-xl font-bold h-16 w-16 rounded-full flex items-center justify-center shadow-lg">
                          {story.score}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{story.name}</CardTitle>
                        <CardDescription>{story.destination}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="italic text-muted-foreground">"{story.quote}"</p>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          onClick={() => handleViewFullStory(story)} 
                          variant="outline" 
                          size="sm" 
                          className="w-full hover:bg-primary/10 transition-colors"
                        >
                          Read Full Story
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              <div className="mt-8 text-center">
                <p className="mb-4 text-muted-foreground">Inspired by these stories? Start your own success journey today.</p>
                <Button asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300">
                  <RouterLink to="/signup">Begin Your IELTS Preparation</RouterLink>
                </Button>
              </div>
            </TabsContent>
            
            {/* IELTS Tips */}
            <TabsContent value="tips">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate={activeTab === "tips" ? "visible" : "hidden"}
              >
                {ieltsQuickTips.map((section, index) => {
                  const colors = ["reading", "writing", "listening", "speaking"];
                  const icons = [BookOpen, Pencil, Headphones, Mic];
                  const Icon = icons[index];
                  
                  return (
                    <motion.div key={index} variants={fadeInUp}>
                      <Card className={`border-${colors[index]} hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                        <div className={`h-2 w-full bg-${colors[index]}`}></div>
                        <CardHeader className={`bg-${colors[index]}/10`}>
                          <CardTitle className="flex items-center">
                            <div className={`bg-${colors[index]}/20 p-2 rounded-full mr-2`}>
                              <Icon className={`h-5 w-5 text-${colors[index]}`} />
                            </div>
                            {section.module} Tips
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-2">
                            {section.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start">
                                <span className={`bg-${colors[index]}/20 text-${colors[index]} h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5`}>
                                  {tipIndex + 1}
                                </span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            onClick={() => handleViewIeltsTips(section.module.toLowerCase())}
                            variant="outline" 
                            size="sm" 
                            className={`w-full border-${colors[index]}/30 hover:bg-${colors[index]}/10 text-${colors[index]} hover:text-${colors[index]} transition-colors`}
                          >
                            View All {section.module} Tips
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
              <div className="mt-8 text-center">
                <p className="mb-4 text-muted-foreground">Want more detailed strategies and tips?</p>
                <Button 
                  onClick={() => navigate('/resources/ielts-tips')}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300"
                >
                  View Advanced IELTS Strategies
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
