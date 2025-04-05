
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Clock, Download, Headphones, Lightbulb, Mic, Pencil, Timer, ChevronRight, Star, Badge, Trophy, Bookmark, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const tipsByCategory = {
  general: [
    {
      id: 'tip1',
      title: 'Create a Realistic Study Plan',
      content: 'Craft a study schedule that allocates sufficient time for each module (Listening, Reading, Writing, Speaking) based on your strengths and weaknesses. Be realistic about how much time you can dedicate each day and include regular breaks to avoid burnout. Track your progress weekly and adjust your plan as needed.',
      author: 'IELTS Expert Team',
      icon: Lightbulb
    },
    {
      id: 'tip2',
      title: 'Understand the Scoring Criteria',
      content: 'Familiarize yourself with exactly how IELTS examiners score each section. For Writing and Speaking, this means understanding the four criteria: Task Achievement/Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. Knowing these criteria helps you focus your preparation on what matters most.',
      author: 'IELTS Expert Team',
      icon: Lightbulb
    },
    {
      id: 'tip3',
      title: 'Practice Under Exam Conditions',
      content: 'Regularly take full-length practice tests under timed conditions that mimic the actual exam environment. This helps build stamina, improves time management, and reduces test anxiety. Review your performance thoroughly afterward to identify patterns in your mistakes.',
      author: 'IELTS Expert Team',
      icon: Timer
    },
    {
      id: 'tip4',
      title: 'Expand Your Vocabulary Strategically',
      content: 'Rather than memorizing random word lists, focus on learning vocabulary by topic (environment, education, technology, etc.) and in context. Keep a vocabulary notebook organized by themes, and review it regularly. Pay attention to collocations (word partnerships) and practice using new words in sentences.',
      author: 'IELTS Expert Team',
      icon: Lightbulb
    }
  ],
  listening: [
    {
      id: 'tip5',
      title: 'Read Questions Before Listening',
      content: 'Always read the questions carefully before the audio begins. This primes your brain to listen for specific information and helps you predict what the speakers might say. Underline key words in the questions that will help you identify the relevant information in the recording.',
      author: 'Listening Coach',
      icon: Headphones
    },
    {
      id: 'tip6',
      title: 'Practice with Different Accents',
      content: 'IELTS includes speakers with various English accents (British, American, Australian, New Zealand, Canadian). Regularly expose yourself to these different accents through podcasts, news broadcasts, and interviews. This will prevent you from being thrown off by unfamiliar pronunciations on test day.',
      author: 'Listening Coach',
      icon: Headphones
    },
    {
      id: 'tip7',
      title: 'Listen for Signposting Language',
      content: 'Pay attention to transitional phrases and signposting language such as "firstly," "on the other hand," "in conclusion" as these often indicate important information is coming. Also listen carefully when a speaker corrects themselves, as the corrected information is what you need to note down.',
      author: 'Listening Coach',
      icon: Headphones
    },
    {
      id: 'tip8',
      title: 'Develop Effective Note-Taking',
      content: 'Practice taking quick, efficient notes during the listening section. Focus on recording key information rather than trying to write everything down. Use abbreviations, symbols, and keywords that you can easily understand when transferring your answers to the answer sheet.',
      author: 'Listening Coach',
      icon: Headphones
    }
  ],
  reading: [
    {
      id: 'tip9',
      title: 'Master Skimming and Scanning',
      content: 'Develop your ability to skim (quickly reading to get the general idea) and scan (searching for specific information). Start by reading the first and last paragraphs completely, then the first and last sentences of each paragraph. This gives you the structure of the text before diving into detail.',
      author: 'Reading Instructor',
      icon: Book
    },
    {
      id: 'tip10',
      title: 'Understand Different Question Types',
      content: 'Familiarize yourself with all the IELTS Reading question types (multiple choice, matching headings, true/false/not given, etc.) and develop specific strategies for each. For example, for matching headings questions, focus on the main idea of each paragraph rather than specific details.',
      author: 'Reading Instructor',
      icon: Book
    },
    {
      id: 'tip11',
      title: 'Don\'t Get Stuck on Difficult Questions',
      content: 'If you encounter a difficult question, mark it and move on. Return to it after completing the easier questions. This ensures you don\'t waste valuable time on one question at the expense of others you could answer more quickly. Remember, all questions are worth the same points.',
      author: 'Reading Instructor',
      icon: Book
    },
    {
      id: 'tip12',
      title: 'Watch for Synonyms and Paraphrasing',
      content: 'The reading passage rarely contains the exact words used in the questions. Train yourself to recognize synonyms and paraphrased content. Create synonym lists for common IELTS topics and practice identifying how ideas can be expressed in different ways.',
      author: 'Reading Instructor',
      icon: Book
    }
  ],
  writing: [
    {
      id: 'tip13',
      title: 'Analyze the Task Thoroughly',
      content: 'Spend the first 2-3 minutes analyzing the task to ensure you understand exactly what is being asked. For Task 1, identify the main features/trends that need describing. For Task 2, break down the question to identify the topic, focus, and any specific instructions (e.g., discuss both views, give your opinion).',
      author: 'Writing Mentor',
      icon: Pencil
    },
    {
      id: 'tip14',
      title: 'Plan Before You Write',
      content: 'Devote 5 minutes to planning your response. For Task 1, decide which features to highlight and how to organize your description. For Task 2, outline your introduction, main points for each paragraph, and conclusion. This investment in planning leads to more coherent, well-structured writing.',
      author: 'Writing Mentor',
      icon: Pencil
    },
    {
      id: 'tip15',
      title: 'Use a Range of Sentence Structures',
      content: 'Demonstrate grammatical range by using a mix of simple, compound, and complex sentences. Don\'t just use one sentence type throughout your essay. Practice incorporating different structures such as conditionals, relative clauses, and passive voice where appropriate.',
      author: 'Writing Mentor',
      icon: Pencil
    },
    {
      id: 'tip16',
      title: 'Leave Time for Review',
      content: "Reserve 3-5 minutes at the end to review your writing. Check for common errors such as subject-verb agreement, article usage, spelling, and punctuation. Ensure your writing flows logically and that you've fulfilled all parts of the task. Making these final corrections can significantly improve your score.",
      author: 'Writing Mentor',
      icon: Pencil
    }
  ],
  speaking: [
    {
      id: 'tip17',
      title: 'Extend Your Answers',
      content: 'In Part 1, aim to give answers that are 3-4 sentences long, not just one-word or very short responses. Use the STAR method (Situation, Task, Action, Result) or similar frameworks to develop your responses. For example, if asked about your hometown, mention its location, size, notable features, and your feelings about it.',
      author: 'Speaking Trainer',
      icon: Mic
    },
    {
      id: 'tip18',
      title: 'Use the Preparation Time Effectively',
      content: 'For Part 2 (the long turn), use the one-minute preparation time strategically. Quickly note down key points that address all parts of the cue card. Don\'t write full sentences; brief notes are sufficient. If you can\'t think of real experiences, it\'s perfectly acceptable to invent details – the examiner is assessing your language, not the truth of your story.',
      author: 'Speaking Trainer',
      icon: Mic
    },
    {
      id: 'tip19',
      title: 'Demonstrate Vocabulary Range',
      content: 'Show off your lexical resource by using precise vocabulary rather than general terms. Instead of saying "good," use more specific adjectives like "beneficial," "advantageous," or "valuable" as appropriate. Also incorporate idiomatic expressions and collocations naturally, but don\'t overuse them.',
      author: 'Speaking Trainer',
      icon: Mic
    },
    {
      id: 'tip20',
      title: 'Manage Your Speaking Speed',
      content: 'Speak at a natural pace – neither too fast nor too slow. If you speak too quickly, your pronunciation may suffer; too slowly might suggest you\'re struggling with language. Practice speaking at a moderate pace that allows for clear articulation while maintaining fluency. Pausing briefly to gather thoughts is fine, but avoid long silences.',
      author: 'Speaking Trainer',
      icon: Mic
    }
  ]
};

const IeltsTips = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('general');
  const [featuredTip, setFeaturedTip] = useState(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if a specific module was passed in location state
    if (location.state && location.state.selectedModule) {
      setActiveTab(location.state.selectedModule);
    }
    
    // Set a random featured tip
    const categories = Object.keys(tipsByCategory);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomTipIndex = Math.floor(Math.random() * tipsByCategory[randomCategory].length);
    setFeaturedTip({
      ...tipsByCategory[randomCategory][randomTipIndex],
      category: randomCategory
    });
  }, [location.state]);
  
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
  
  const handleViewAllTips = (category) => {
    // Scroll to tips section and set active tab
    setActiveTab(category);
    
    // Find the tab content element and scroll to it
    const tabsElement = document.getElementById(category);
    if (tabsElement) {
      tabsElement.scrollIntoView({ behavior: 'smooth' });
    }
    
    toast({
      title: `${formatCategory(category)} Tips`,
      description: `Showing all ${tipsByCategory[category].length} tips for ${formatCategory(category)}`,
    });
  };
  
  const handleSaveTip = (tip) => {
    toast({
      title: "Tip Saved!",
      description: `"${tip.title}" has been saved to your bookmarks.`,
    });
  };
  
  const handleDownloadMaterials = () => {
    toast({
      title: "Download Started",
      description: "Your study materials are being prepared for download.",
    });
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
            className="text-center mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              IELTS Expert Tips
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Practical strategies and advice to maximize your score on each section of the IELTS exam
            </p>
          </motion.div>
          
          {featuredTip && (
            <motion.div 
              className="mb-12"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Card className="bg-gradient-to-br from-white to-primary/5 border border-primary/20 overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 p-3">
                  <div className="bg-primary/10 text-primary font-semibold text-sm px-3 py-1 rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1 fill-amber-400 text-amber-400" />
                    Featured Tip
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <featuredTip.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{featuredTip.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        From our {formatCategory(featuredTip.category)} tips collection
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{featuredTip.content}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">By: {featuredTip.author}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-primary border-primary/30 hover:bg-primary/10"
                      onClick={() => handleSaveTip(featuredTip)}
                    >
                      <Bookmark className="h-4 w-4 mr-1" />
                      Save Tip
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {Object.entries(tipsByCategory).map(([category, tips], idx) => (
              <motion.div 
                key={category} 
                variants={fadeInUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card 
                  className={`hover:shadow-lg transition-all duration-300 h-full border-${getCategoryColor(category)}/30 overflow-hidden cursor-pointer`}
                  onClick={() => setActiveTab(category)}
                >
                  <div className={`h-2 w-full bg-${getCategoryColor(category)}`}></div>
                  <CardHeader className={`bg-${getCategoryColor(category)}/10 border-b border-${getCategoryColor(category)}/20 pb-3`}>
                    <CardTitle className="flex items-center text-xl">
                      {getCategoryIcon(category, `h-5 w-5 mr-2 text-${getCategoryColor(category)}`)}
                      {formatCategory(category)} Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      {getCategoryDescription(category)}
                    </p>
                    <div className="mt-2 mb-4">
                      <div className="flex items-start mb-2">
                        <CheckCircle className={`h-4 w-4 mr-2 mt-0.5 text-${getCategoryColor(category)}`} />
                        <p className="text-sm line-clamp-2">{tips[0].title}</p>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className={`h-4 w-4 mr-2 mt-0.5 text-${getCategoryColor(category)}`} />
                        <p className="text-sm line-clamp-2">{tips[1].title}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className={`w-full border-${getCategoryColor(category)}/30 hover:bg-${getCategoryColor(category)}/10 text-${getCategoryColor(category)} hover:text-${getCategoryColor(category)} transition-colors group`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewAllTips(category);
                      }}
                    >
                      View All {formatCategory(category)} Tips
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start mb-8 overflow-auto bg-background/50 backdrop-blur-sm border border-border/50 p-1 rounded-lg">
              <TabsTrigger 
                value="general" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                General Tips
              </TabsTrigger>
              <TabsTrigger 
                value="listening"
                className="data-[state=active]:bg-listening data-[state=active]:text-white transition-all duration-200"
              >
                <Headphones className="h-4 w-4 mr-2" />
                Listening Tips
              </TabsTrigger>
              <TabsTrigger 
                value="reading"
                className="data-[state=active]:bg-reading data-[state=active]:text-white transition-all duration-200"
              >
                <Book className="h-4 w-4 mr-2" />
                Reading Tips
              </TabsTrigger>
              <TabsTrigger 
                value="writing"
                className="data-[state=active]:bg-writing data-[state=active]:text-white transition-all duration-200"
              >
                <Pencil className="h-4 w-4 mr-2" />
                Writing Tips
              </TabsTrigger>
              <TabsTrigger 
                value="speaking"
                className="data-[state=active]:bg-speaking data-[state=active]:text-white transition-all duration-200"
              >
                <Mic className="h-4 w-4 mr-2" />
                Speaking Tips
              </TabsTrigger>
            </TabsList>
            
            {Object.entries(tipsByCategory).map(([category, tips]) => (
              <TabsContent key={category} value={category} id={category}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                >
                  <div className="flex items-center mb-6">
                    <div className={`bg-${getCategoryColor(category)}/20 p-2 rounded-full mr-3`}>
                      {getCategoryIcon(category, `h-6 w-6 text-${getCategoryColor(category)}`)}
                    </div>
                    <h2 className={`text-2xl font-bold text-${getCategoryColor(category)}`}>
                      {formatCategory(category)} Tips
                    </h2>
                  </div>
                  
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={staggerContainer}
                  >
                    {tips.map((tip, index) => (
                      <motion.div 
                        key={tip.id} 
                        variants={fadeInUp}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      >
                        <Card className={`hover:shadow-lg transition-all duration-300 h-full border-${getCategoryColor(category)}/30 overflow-hidden`}>
                          <div className={`h-1 w-full bg-${getCategoryColor(category)}`}></div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center">
                              <tip.icon className={`h-5 w-5 mr-2 text-${getCategoryColor(category)}`} />
                              {tip.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{tip.content}</p>
                            <div className="flex justify-between items-center mt-4 pt-4 border-t text-sm text-muted-foreground">
                              <span>By: {tip.author}</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className={`h-8 px-2 hover:text-${getCategoryColor(category)} hover:bg-${getCategoryColor(category)}/10`}
                                onClick={() => handleSaveTip(tip)}
                              >
                                <Bookmark className="h-4 w-4 mr-1" />
                                Save
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
          
          <motion.div 
            className="mt-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 border border-primary/20 shadow-lg"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Want More Expert Advice?</h2>
              <p className="text-muted-foreground">
                Download our comprehensive IELTS preparation guides and resources
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300"
                onClick={handleDownloadMaterials}
              >
                <Download className="h-4 w-4 mr-2" />
                Free Study Materials
              </Button>
              <Button 
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300" 
                asChild
              >
                <Link to="/practice">
                  <Clock className="h-4 w-4 mr-2" />
                  Practice Tests
                </Link>
              </Button>
              <Button 
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300" 
                asChild
              >
                <Link to="/community">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Join Community
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Helper functions
const formatCategory = (category) => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

const getCategoryIcon = (category, className) => {
  switch (category) {
    case 'listening':
      return <Headphones className={className} />;
    case 'reading':
      return <Book className={className} />;
    case 'writing':
      return <Pencil className={className} />;
    case 'speaking':
      return <Mic className={className} />;
    default:
      return <Lightbulb className={className} />;
  }
};

const getCategoryColor = (category) => {
  switch (category) {
    case 'listening':
      return 'listening';
    case 'reading':
      return 'reading';
    case 'writing':
      return 'writing';
    case 'speaking':
      return 'speaking';
    default:
      return 'primary';
  }
};

const getCategoryDescription = (category) => {
  switch (category) {
    case 'listening':
      return 'Enhance your ability to understand different accents, take effective notes, and catch key details in the recording.';
    case 'reading':
      return 'Improve your speed and comprehension with strategies for skimming, scanning, and tackling different question types.';
    case 'writing':
      return 'Learn how to analyze tasks, plan your response, and demonstrate the language skills examiners are looking for.';
    case 'speaking':
      return 'Build confidence in your speaking with techniques for extending answers, organizing ideas, and using advanced vocabulary.';
    default:
      return 'Master fundamental strategies that apply across all sections of the IELTS test to maximize your overall score.';
  }
};

export default IeltsTips;
