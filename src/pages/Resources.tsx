
import React from 'react';
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
import { Link } from 'react-router-dom';

const Resources = () => {
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
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Carlos Mendez",
      score: "7.0",
      destination: "Australia PR",
      quote: "The mock tests were incredibly similar to the actual IELTS exam. The detailed feedback improved my confidence and I achieved the score I needed for my visa application.",
      image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Liu Wei",
      score: "7.5",
      destination: "University College London",
      quote: "I struggled with speaking until I used the AI practice tool. The personalized feedback was invaluable, and I improved from 6.0 to 7.5 in just two months.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
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

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">IELTS Resources</h1>
            <p className="text-muted-foreground text-lg">
              Access our comprehensive collection of resources to enhance your IELTS preparation
            </p>
          </div>
          
          <Tabs defaultValue="blog">
            <TabsList className="mb-8 flex justify-center">
              <TabsTrigger value="blog" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                Blog
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                FAQ
              </TabsTrigger>
              <TabsTrigger value="success-stories" className="flex items-center">
                <Trophy className="mr-2 h-4 w-4" />
                Success Stories
              </TabsTrigger>
              <TabsTrigger value="tips" className="flex items-center">
                <LightbulbIcon className="mr-2 h-4 w-4" />
                IELTS Tips
              </TabsTrigger>
            </TabsList>
            
            {/* Blog Section */}
            <TabsContent value="blog">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPosts.map(post => (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
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
                      <Button variant="ghost" size="sm">
                        Read More <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button>View All Blog Posts</Button>
              </div>
            </TabsContent>
            
            {/* FAQ Section */}
            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Find answers to common questions about IELTS and our platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b pb-4 last:border-0">
                        <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Don't see your question here? <Link to="/contact" className="text-primary hover:underline">Contact us</Link> for more information.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Success Stories */}
            <TabsContent value="success-stories">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {successStories.map((story, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={story.image} 
                          alt={story.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute top-4 right-4 bg-primary text-white text-xl font-bold h-16 w-16 rounded-full flex items-center justify-center">
                        {story.score}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{story.name}</CardTitle>
                      <CardDescription>{story.destination}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="italic text-muted-foreground">"{story.quote}"</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Read Full Story
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="mb-4 text-muted-foreground">Inspired by these stories? Start your own success journey today.</p>
                <Button asChild>
                  <Link to="/signup">Begin Your IELTS Preparation</Link>
                </Button>
              </div>
            </TabsContent>
            
            {/* IELTS Tips */}
            <TabsContent value="tips">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ieltsQuickTips.map((section, index) => {
                  const colors = ["reading", "writing", "listening", "speaking"];
                  const icons = [BookOpen, Pencil, Headphones, Mic];
                  const Icon = icons[index];
                  
                  return (
                    <Card key={index} className={`border-${colors[index]}/20`}>
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
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link to={`/practice?skill=${section.module.toLowerCase()}`}>
                            Practice {section.module}
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
              <div className="mt-8 text-center">
                <p className="mb-4 text-muted-foreground">Want more detailed strategies and tips?</p>
                <Button asChild>
                  <Link to="/resources/advanced-tips">View Advanced IELTS Strategies</Link>
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
