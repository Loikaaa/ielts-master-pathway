
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// FAQ data
const faqData = {
  general: [
    {
      question: "What is the IELTS test?",
      answer: "The International English Language Testing System (IELTS) is a standardized test designed to assess the English language proficiency of non-native speakers. It evaluates four key areas: Listening, Reading, Writing, and Speaking. The test is widely recognized for academic and immigration purposes worldwide."
    },
    {
      question: "What's the difference between IELTS Academic and General Training?",
      answer: "IELTS Academic is primarily for those applying to study at undergraduate or postgraduate levels, or for professional registration. IELTS General Training is for those migrating to Australia, Canada, New Zealand, or the UK, or applying for secondary education, training programs, or work experience in an English-speaking environment. The Listening and Speaking sections are the same for both tests, but the Reading and Writing sections differ in content and focus."
    },
    {
      question: "How long is the IELTS test valid for?",
      answer: "IELTS test results are valid for 2 years from the date of the test. After this period, if you need to demonstrate your English proficiency, you'll need to retake the test as your language skills may have changed during that time."
    },
    {
      question: "How is the IELTS test scored?",
      answer: "IELTS is scored on a band scale from 1 (lowest) to 9 (highest). You can also receive half band scores (e.g., 6.5). You'll receive individual band scores for each of the four skills (Listening, Reading, Writing, Speaking) as well as an Overall Band Score, which is the average of the four individual scores."
    },
    {
      question: "How long does it take to get IELTS results?",
      answer: "For the paper-based test, results are typically available 13 calendar days after the test. For the computer-delivered test, results are usually available within 3-5 days. You can check your results online before receiving the official Test Report Form (TRF)."
    }
  ],
  listening: [
    {
      question: "How is the IELTS Listening test structured?",
      answer: "The Listening test consists of 40 questions divided into 4 sections. Each section begins with a short introduction to the situation you'll hear. The recordings include a range of accents, including British, Australian, New Zealand, and North American. The test takes about 30 minutes, with an additional 10 minutes to transfer your answers to the answer sheet."
    },
    {
      question: "What types of questions are on the Listening test?",
      answer: "The Listening test includes various question types: multiple choice, matching, plan/map/diagram labeling, form completion, note completion, table completion, flow-chart completion, summary completion, sentence completion, and short answers."
    },
    {
      question: "Can I listen to the recording more than once?",
      answer: "No, each recording in the Listening test is played only once. This is designed to simulate real-life situations where you typically hear information only once."
    },
    {
      question: "How can I improve my score on the Listening test?",
      answer: "To improve your Listening score: practice with diverse accents, work on your note-taking skills, familiarize yourself with all question types, read instructions carefully, predict answers before listening, and learn to spell commonly used words correctly (spelling counts in your score)."
    }
  ],
  reading: [
    {
      question: "What's the difference between Academic and General Training Reading tests?",
      answer: "The Academic Reading test contains three long texts which range from descriptive and factual to discursive and analytical. These texts are authentic and taken from books, journals, magazines, and newspapers. The General Training Reading test contains three sections with texts from notices, advertisements, newspapers, instruction manuals, and employee handbooks."
    },
    {
      question: "How much time do I have for the Reading test?",
      answer: "You have 60 minutes to complete the Reading test, which includes 40 questions. There is no extra time provided to transfer your answers to the answer sheet—this must be done within the 60 minutes."
    },
    {
      question: "What strategies can help me finish the Reading test on time?",
      answer: "To manage your time effectively: scan the questions before reading the passages, practice skimming and scanning techniques, don't spend too much time on any one question, use headings and subheadings to navigate the text, and learn to identify key words in both questions and passages."
    }
  ],
  writing: [
    {
      question: "What is the format of the Writing test?",
      answer: "The Writing test consists of two tasks. In Academic: Task 1 requires you to describe visual information (graph, table, chart, or diagram) in 150+ words, and Task 2 is an essay response to a point of view or argument in 250+ words. In General Training: Task 1 is a letter in response to a situation in 150+ words, and Task 2 is an essay response to a point of view or argument in 250+ words."
    },
    {
      question: "How is the Writing test scored?",
      answer: "The Writing test is assessed on four criteria: Task Achievement/Response (how well you address the task), Coherence and Cohesion (organization and connection of ideas), Lexical Resource (vocabulary range and accuracy), and Grammatical Range and Accuracy. Task 2 carries more weight than Task 1 in determining your overall Writing band score."
    },
    {
      question: "Should I write in British or American English?",
      answer: "Both British and American English spellings are accepted in the IELTS test. However, you should be consistent—don't mix the two styles within your writing."
    }
  ],
  speaking: [
    {
      question: "How is the Speaking test structured?",
      answer: "The Speaking test is a face-to-face interview with an examiner lasting 11-14 minutes. It has three parts: Part 1 (Introduction and general questions about familiar topics, 4-5 min), Part 2 (Individual long turn where you speak about a particular topic from a card, 3-4 min including 1 min preparation), and Part 3 (Two-way discussion related to Part 2 topic, 4-5 min)."
    },
    {
      question: "Is it okay to ask the examiner to repeat a question?",
      answer: "Yes, if you didn't hear or understand a question, you can politely ask the examiner to repeat it. This won't negatively affect your score."
    },
    {
      question: "What if I don't know anything about the topic in Part 2?",
      answer: "The topics in Part 2 are designed to be accessible to everyone, regardless of background or experience. If you feel you don't know anything about the topic, try to relate it to something familiar, or simply use your imagination. The examiner is assessing your language skills, not your knowledge."
    }
  ]
};

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
              <p className="text-muted-foreground">Find answers to common questions about the IELTS exam</p>
            </div>
            
            <div className="relative mb-8">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search questions..." className="pl-10" />
            </div>
            
            <Tabs defaultValue="general">
              <TabsList className="grid grid-cols-5 mb-8">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="listening">Listening</TabsTrigger>
                <TabsTrigger value="reading">Reading</TabsTrigger>
                <TabsTrigger value="writing">Writing</TabsTrigger>
                <TabsTrigger value="speaking">Speaking</TabsTrigger>
              </TabsList>
              
              {Object.entries(faqData).map(([category, questions]) => (
                <TabsContent key={category} value={category}>
                  <Accordion type="single" collapsible className="w-full">
                    {questions.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${category}-${index}`}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-start">
                            <HelpCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                            <span>{faq.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-7">
                          <div className="prose prose-sm max-w-none">
                            <p>{faq.answer}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
            
            <div className="mt-12 bg-accent/30 rounded-xl p-6 text-center">
              <h2 className="text-xl font-semibold mb-3">Still have questions?</h2>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? Reach out to our support team.
              </p>
              <Button className="mr-3">Contact Support</Button>
              <Button variant="outline" asChild>
                <Link to="/community">Ask the Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
