
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Book, 
  Pencil, 
  Mic, 
  Headphones, 
  Clock, 
  HelpCircle, 
  CheckCircle
} from 'lucide-react';

const ExamContent = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">IELTS Exam Content</h1>
            <p className="text-muted-foreground">
              Detailed information about the IELTS test format, sections, and scoring criteria.
            </p>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="listening">
                <Headphones className="h-4 w-4 mr-2" />
                Listening
              </TabsTrigger>
              <TabsTrigger value="reading">
                <Book className="h-4 w-4 mr-2" />
                Reading
              </TabsTrigger>
              <TabsTrigger value="writing">
                <Pencil className="h-4 w-4 mr-2" />
                Writing
              </TabsTrigger>
              <TabsTrigger value="speaking">
                <Mic className="h-4 w-4 mr-2" />
                Speaking
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic IELTS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      The Academic IELTS test is designed for test takers who want to study at undergraduate or postgraduate levels or seek professional registration in an English-speaking environment.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Universities and higher education institutions in English-speaking countries</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Professional bodies and organizations requiring English proficiency</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Immigration to English-speaking countries for highly skilled professionals</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>General Training IELTS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      The General Training IELTS test is intended for those planning to undertake non-academic training or gain work experience, or for immigration purposes.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Migration to Australia, Canada, New Zealand and the UK</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Secondary education, training programs and work experience in English-speaking environments</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>English language requirements for certain professions and employment</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Test Format</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-accent/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Headphones className="h-5 w-5 text-listening" />
                        <h3 className="font-semibold">Listening</h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Clock className="h-4 w-4" /> 30 minutes
                      </div>
                      <p className="text-sm">4 sections, 40 questions</p>
                    </div>

                    <div className="bg-accent/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Book className="h-5 w-5 text-reading" />
                        <h3 className="font-semibold">Reading</h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Clock className="h-4 w-4" /> 60 minutes
                      </div>
                      <p className="text-sm">3 passages, 40 questions</p>
                    </div>

                    <div className="bg-accent/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Pencil className="h-5 w-5 text-writing" />
                        <h3 className="font-semibold">Writing</h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Clock className="h-4 w-4" /> 60 minutes
                      </div>
                      <p className="text-sm">2 tasks (150 & 250 words)</p>
                    </div>

                    <div className="bg-accent/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Mic className="h-5 w-5 text-speaking" />
                        <h3 className="font-semibold">Speaking</h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Clock className="h-4 w-4" /> 11-14 minutes
                      </div>
                      <p className="text-sm">3 parts, face-to-face</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Band Score System</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    IELTS results are reported as band scores on a scale from 1 (the lowest) to 9 (the highest).
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="text-left p-2 border">Band Score</th>
                          <th className="text-left p-2 border">Skill Level</th>
                          <th className="text-left p-2 border">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border font-semibold">9</td>
                          <td className="p-2 border">Expert User</td>
                          <td className="p-2 border">Complete operational command of the language</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-semibold">8</td>
                          <td className="p-2 border">Very Good User</td>
                          <td className="p-2 border">Fully operational command with only occasional inaccuracies</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-semibold">7</td>
                          <td className="p-2 border">Good User</td>
                          <td className="p-2 border">Operational command with occasional inaccuracies</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-semibold">6</td>
                          <td className="p-2 border">Competent User</td>
                          <td className="p-2 border">Generally effective command with some inaccuracies</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-semibold">5</td>
                          <td className="p-2 border">Modest User</td>
                          <td className="p-2 border">Partial command with frequent problems</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-semibold">4</td>
                          <td className="p-2 border">Limited User</td>
                          <td className="p-2 border">Basic competence limited to familiar situations</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-semibold">3</td>
                          <td className="p-2 border">Extremely Limited User</td>
                          <td className="p-2 border">Conveys and understands only general meaning</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-semibold">2</td>
                          <td className="p-2 border">Intermittent User</td>
                          <td className="p-2 border">Great difficulty understanding spoken and written English</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-semibold">1</td>
                          <td className="p-2 border">Non User</td>
                          <td className="p-2 border">No ability to use the language except a few isolated words</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-semibold">0</td>
                          <td className="p-2 border">Did not attempt the test</td>
                          <td className="p-2 border">No assessable information provided</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="listening">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-listening/10 p-2 rounded-full">
                      <Headphones className="h-6 w-6 text-listening" />
                    </div>
                    <CardTitle>IELTS Listening Test</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    The Listening test takes around 30 minutes. It consists of four sections, each with ten questions. The test is played once only. 
                    It includes a range of accents, including British, Australian, New Zealand, American and Canadian.
                  </p>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="section1">
                      <AccordionTrigger>Section 1</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p><strong>Format:</strong> A conversation between two people set in an everyday social context (e.g., a conversation about travel arrangements)</p>
                          <p><strong>Focus:</strong> Basic information exchange</p>
                          <p><strong>Question types:</strong> Form/note/table/summary completion, multiple choice</p>
                          <p><strong>Duration:</strong> Approximately 8-9 minutes</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="section2">
                      <AccordionTrigger>Section 2</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p><strong>Format:</strong> A monologue set in an everyday social context (e.g., a speech about local facilities or a talk about arrangements for meals on a tour)</p>
                          <p><strong>Focus:</strong> General factual information</p>
                          <p><strong>Question types:</strong> Form/note/table/summary completion, multiple choice, matching, map labeling</p>
                          <p><strong>Duration:</strong> Approximately 8-9 minutes</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="section3">
                      <AccordionTrigger>Section 3</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p><strong>Format:</strong> A conversation between up to four people set in an educational or training context (e.g., a university tutor and a student discussing an assignment)</p>
                          <p><strong>Focus:</strong> Educational or training situations</p>
                          <p><strong>Question types:</strong> Form/note/table/summary completion, multiple choice, matching</p>
                          <p><strong>Duration:</strong> Approximately 8-9 minutes</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="section4">
                      <AccordionTrigger>Section 4</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p><strong>Format:</strong> A monologue on an academic subject (e.g., a university lecture)</p>
                          <p><strong>Focus:</strong> Academic subject matter</p>
                          <p><strong>Question types:</strong> Form/note/table/summary completion, multiple choice, sentence completion</p>
                          <p><strong>Duration:</strong> Approximately 8-9 minutes</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Listening Test Question Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        type: "Multiple choice",
                        description: "Choose the correct answer from three or more options, or complete a sentence from multiple choices.",
                        tips: "Read the questions before listening, eliminate obvious wrong answers, watch for synonyms and paraphrasing."
                      },
                      {
                        type: "Matching",
                        description: "Match a list of items with a set of options from the listening text.",
                        tips: "Try to predict connections, focus on key identifiers like names, places, or dates, listen for signposting language."
                      },
                      {
                        type: "Plan/map/diagram labeling",
                        description: "Complete labels on a plan, map or diagram with information from the listening text.",
                        tips: "Familiarize yourself with the visual first, note spatial language (next to, opposite, etc.), listen for location descriptions."
                      },
                      {
                        type: "Form/note/table/summary completion",
                        description: "Fill in missing information (words, numbers or phrases) in an outline of part or all of the listening text.",
                        tips: "Pre-read to anticipate answers, check word limits, listen for key content words."
                      },
                      {
                        type: "Sentence completion",
                        description: "Complete sentences with information from the listening text.",
                        tips: "Read the incomplete sentences first, predict what missing information might be, check grammar consistency."
                      },
                      {
                        type: "Short-answer questions",
                        description: "Write short answers (up to three words) to questions.",
                        tips: "Note question words (who, what, when, where, why, how), be precise with names, numbers and dates, stay within word limits."
                      }
                    ].map((item, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <HelpCircle className="h-4 w-4 text-primary" />
                          {item.type}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        <div className="bg-primary/5 p-3 rounded-md text-sm">
                          <strong>Tips:</strong> {item.tips}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reading">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-reading/10 p-2 rounded-full">
                      <Book className="h-6 w-6 text-reading" />
                    </div>
                    <CardTitle>IELTS Reading Test</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    The Reading test takes 60 minutes. There are 3 sections with 40 questions to answer in total. 
                    Both Academic and General Training have different reading texts.
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Academic Reading</h3>
                    <p className="mb-3">
                      Contains three long texts which range from descriptive and factual to discursive and analytical. The texts are authentic and are taken from books, journals, magazines and newspapers.
                    </p>
                    <div className="flex items-start gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Texts may include diagrams, graphs or illustrations</span>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Focuses on topics of general interest to, and suitable for, test takers entering undergraduate or postgraduate courses</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>A variety of question types, including multiple choice, matching information, headings, features, sentence completion, and more</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">General Training Reading</h3>
                    <p className="mb-3">
                      Contains three sections with texts increasing in length and complexity.
                    </p>
                    <div className="mb-4 pl-4 border-l-4 border-muted p-3">
                      <h4 className="font-medium mb-1">Section 1</h4>
                      <p className="text-sm">Contains two or three short factual texts focusing on everyday topics (e.g., notices, advertisements)</p>
                    </div>
                    <div className="mb-4 pl-4 border-l-4 border-muted p-3">
                      <h4 className="font-medium mb-1">Section 2</h4>
                      <p className="text-sm">Contains two texts focusing on work-related issues (e.g., job descriptions, contracts, training materials)</p>
                    </div>
                    <div className="pl-4 border-l-4 border-muted p-3">
                      <h4 className="font-medium mb-1">Section 3</h4>
                      <p className="text-sm">Contains one longer, more complex text on a topic of general interest, similar in difficulty to Academic Reading</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Reading Test Question Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        type: "Multiple choice",
                        description: "Choose the correct answer from four options, or answer questions with multiple correct answers.",
                        tips: "Identify keywords in questions, scan for synonyms, eliminate obviously incorrect options."
                      },
                      {
                        type: "Identifying information (True/False/Not Given)",
                        description: "Decide if the statements given are true, false, or not mentioned in the text.",
                        tips: "Read the statement carefully, look for confirmation or contradiction, 'Not Given' means the information is not in the text."
                      },
                      {
                        type: "Matching headings",
                        description: "Match heading to paragraphs or sections of the text.",
                        tips: "Identify the main idea of each paragraph, don't be distracted by details, look for topic sentences."
                      },
                      {
                        type: "Matching features",
                        description: "Match a set of statements or descriptions to a list of options.",
                        tips: "Understand the list of features first, scan for names, dates, or other identifiers, look for paraphrasing."
                      },
                      {
                        type: "Sentence completion",
                        description: "Complete sentences with words from the text (often with a word limit).",
                        tips: "Check grammar and word limits, ensure the completed sentence makes sense, keep original meaning."
                      },
                      {
                        type: "Summary, note, table, or diagram completion",
                        description: "Complete a summary of the text using words from the passage.",
                        tips: "Read the completed portions first to understand context, focus on specific paragraphs if mentioned, check word limits."
                      }
                    ].map((item, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <HelpCircle className="h-4 w-4 text-reading" />
                          {item.type}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        <div className="bg-reading/5 p-3 rounded-md text-sm">
                          <strong>Tips:</strong> {item.tips}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="writing">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-writing/10 p-2 rounded-full">
                      <Pencil className="h-6 w-6 text-writing" />
                    </div>
                    <CardTitle>IELTS Writing Test</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    The Writing test takes 60 minutes. There are 2 tasks. You are required to write at least 150 words for Task 1 and at least 250 words for Task 2.
                  </p>
                  
                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="flex-1 border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-3">Academic Writing</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Task 1</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Describe a graph, table, chart or diagram in your own words.
                          </p>
                          <ul className="text-sm space-y-1 list-disc pl-5">
                            <li>Line graphs, bar charts, pie charts</li>
                            <li>Tables and processes</li>
                            <li>Maps or diagrams</li>
                            <li>Minimum 150 words, recommended 20 minutes</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Task 2</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Write an essay in response to a point of view, argument or problem.
                          </p>
                          <ul className="text-sm space-y-1 list-disc pl-5">
                            <li>Discursive essay on academic topics</li>
                            <li>Opinion, problem/solution, advantage/disadvantage, or discussion essays</li>
                            <li>Minimum 250 words, recommended 40 minutes</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-3">General Training Writing</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Task 1</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Write a letter requesting information or explaining a situation.
                          </p>
                          <ul className="text-sm space-y-1 list-disc pl-5">
                            <li>Personal, semi-formal or formal letter</li>
                            <li>Request information, complain, apologize, explain situations</li>
                            <li>Minimum 150 words, recommended 20 minutes</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Task 2</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Write an essay in response to a point of view, argument or problem.
                          </p>
                          <ul className="text-sm space-y-1 list-disc pl-5">
                            <li>Essay on topics of general interest</li>
                            <li>Less academic than the Academic Writing Task 2</li>
                            <li>Minimum 250 words, recommended 40 minutes</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-accent/40 rounded-lg p-5">
                    <h3 className="font-semibold mb-3">Writing Assessment Criteria</h3>
                    <p className="mb-4 text-sm">
                      Both tasks are assessed using the following criteria, though they are weighted differently:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-background p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Task Achievement / Task Response</h4>
                        <p className="text-sm text-muted-foreground">
                          How completely you've addressed all parts of the task and presented relevant ideas.
                        </p>
                      </div>
                      <div className="bg-background p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Coherence and Cohesion</h4>
                        <p className="text-sm text-muted-foreground">
                          How well your ideas are organized, linked, and progress logically.
                        </p>
                      </div>
                      <div className="bg-background p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Lexical Resource</h4>
                        <p className="text-sm text-muted-foreground">
                          The range, accuracy, and appropriateness of your vocabulary.
                        </p>
                      </div>
                      <div className="bg-background p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Grammatical Range and Accuracy</h4>
                        <p className="text-sm text-muted-foreground">
                          The range and accuracy of your grammar and sentence structures.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="speaking">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-speaking/10 p-2 rounded-full">
                      <Mic className="h-6 w-6 text-speaking" />
                    </div>
                    <CardTitle>IELTS Speaking Test</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    The Speaking test takes 11-14 minutes. It is a face-to-face interview with a certified IELTS examiner, 
                    which is recorded. The test is the same for both Academic and General Training.
                  </p>
                  
                  <Accordion type="single" collapsible className="w-full mb-6">
                    <AccordionItem value="part1">
                      <AccordionTrigger>Part 1: Introduction and Interview (4-5 minutes)</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-3">
                          The examiner introduces themselves and asks you to introduce yourself and confirm your identity. 
                          They then ask general questions on familiar topics such as:
                        </p>
                        <ul className="space-y-2 pl-5 list-disc">
                          <li>Home, family, work</li>
                          <li>Studies, hobbies, interests</li>
                          <li>Daily routines, food preferences</li>
                          <li>Future plans, past experiences</li>
                        </ul>
                        <div className="mt-4 bg-speaking/5 p-3 rounded-md text-sm">
                          <strong>Tips:</strong> Use this section to warm up. Speak naturally but try to extend your answers beyond yes/no. Use this opportunity to demonstrate your ability to use different tenses.
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="part2">
                      <AccordionTrigger>Part 2: Long Turn (3-4 minutes)</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-3">
                          The examiner gives you a task card with a topic and bullet points to cover. You have one minute to prepare, making notes if you wish, then you talk about the topic for 1-2 minutes.
                        </p>
                        <div className="border p-4 rounded-lg mb-4">
                          <p className="font-medium mb-2">Example Task Card:</p>
                          <div className="bg-card p-3 rounded-md">
                            <p className="mb-2">Describe a place you have visited that you found interesting.</p>
                            <p>You should say:</p>
                            <ul className="pl-5 list-disc mb-2">
                              <li>where it is</li>
                              <li>when you went there</li>
                              <li>what you did there</li>
                            </ul>
                            <p>and explain why you found this place interesting.</p>
                          </div>
                        </div>
                        <p className="mb-2">
                          The examiner may ask one or two brief questions after you finish your talk.
                        </p>
                        <div className="bg-speaking/5 p-3 rounded-md text-sm">
                          <strong>Tips:</strong> Use your preparation time wisely to make notes of key points. Structure your talk with an introduction, body, and conclusion. Include specific details and examples, and try to speak for the full 2 minutes.
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="part3">
                      <AccordionTrigger>Part 3: Discussion (4-5 minutes)</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-3">
                          The examiner asks further questions connected to the topic in Part 2. These questions give you an opportunity to discuss more abstract issues and ideas.
                        </p>
                        <div className="border p-4 rounded-lg mb-4">
                          <p className="font-medium mb-2">Example Questions (following a topic about an interesting place):</p>
                          <ul className="space-y-2 pl-5 list-disc">
                            <li>What kinds of places do people like to visit in your country?</li>
                            <li>Do you think historic places are important? In what ways?</li>
                            <li>How do you think tourism affects local communities?</li>
                            <li>How might places of interest change in the future?</li>
                          </ul>
                        </div>
                        <div className="bg-speaking/5 p-3 rounded-md text-sm">
                          <strong>Tips:</strong> This is your chance to demonstrate more complex language and critical thinking. Develop your answers with explanations and examples. Express and justify opinions, compare and contrast ideas, and discuss causes and effects.
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="bg-accent/40 rounded-lg p-5">
                    <h3 className="font-semibold mb-3">Speaking Assessment Criteria</h3>
                    <p className="mb-4 text-sm">
                      Your speaking performance is evaluated based on the following criteria:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-background p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Fluency and Coherence</h4>
                        <p className="text-sm text-muted-foreground">
                          How fluently you speak, whether you pause or repeat words frequently, and how well you organize your ideas.
                        </p>
                      </div>
                      <div className="bg-background p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Lexical Resource</h4>
                        <p className="text-sm text-muted-foreground">
                          The range of vocabulary you use and how accurately and appropriately you use it.
                        </p>
                      </div>
                      <div className="bg-background p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Grammatical Range and Accuracy</h4>
                        <p className="text-sm text-muted-foreground">
                          The range of grammar structures you use and how accurately you use them.
                        </p>
                      </div>
                      <div className="bg-background p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Pronunciation</h4>
                        <p className="text-sm text-muted-foreground">
                          How clear your pronunciation is, including individual sounds, word and sentence stress, and intonation.
                        </p>
                      </div>
                    </div>
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

export default ExamContent;
