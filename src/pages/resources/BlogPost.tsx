
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogPostDetail from '@/components/blog/BlogPostDetail';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Sample blog posts data
const blogPosts = [
  {
    id: "1",
    title: "5 Most Common Mistakes in IELTS Writing Task 2",
    content: `Many IELTS candidates make the same mistakes repeatedly in Writing Task 2, often without realizing it. This post will help you identify and avoid these common pitfalls.\n\n
    
    **1. Not Answering the Question Directly**\n\n
    
    Perhaps the most critical mistake is not directly addressing what the question asks. This typically happens when candidates have memorized essays or phrases and try to fit them into their response regardless of relevance. Remember that IELTS examiners are trained to identify this approach, and it will significantly impact your Task Achievement score.\n\n
    
    *How to avoid it:* Underline key words in the question and make sure your thesis statement directly responds to the prompt. Before submitting, always check that each paragraph relates clearly to the question asked.\n\n
    
    **2. Poor Essay Structure**\n\n
    
    Many candidates do not organize their ideas logically or fail to use paragraphs effectively. A well-structured essay should have a clear introduction, body paragraphs that each develop a distinct point, and a conclusion that summarizes your argument.\n\n
    
    *How to avoid it:* Plan your essay before writing. Allocate 5 minutes to outline your main points and how they connect. Use this simple structure: introduction (paraphrase question, provide thesis statement), 2-3 body paragraphs (each with a topic sentence, supporting details, and examples), and conclusion (restate main points without repeating exact phrases).\n\n
    
    **3. Overuse of Memorized Phrases**\n\n
    
    While having a repertoire of useful expressions is helpful, overusing "template phrases" or inserting obviously memorized chunks of language makes your writing sound unnatural and formulaic.\n\n
    
    *How to avoid it:* Instead of memorizing entire sentences, focus on learning flexible phrases and linking devices that you can adapt to different contexts. Use these phrases naturally where they fit the content of your essay.\n\n
    
    **4. Limited Vocabulary Range**\n\n
    
    Repeatedly using the same words throughout your essay demonstrates limited lexical resource. Examiners look for precision in word choice and appropriate use of less common vocabulary.\n\n
    
    *How to avoid it:* Develop topic-specific vocabulary for common IELTS themes (environment, education, technology, etc.). When practicing, make a habit of noting synonyms for frequently used words. During the test, take a moment to consider if there's a more precise word you could use.\n\n
    
    **5. Grammatical Errors in Complex Sentences**\n\n
    
    Many candidates attempt to use complex sentence structures but make grammatical errors in the process. While ambition is good, accuracy is equally important.\n\n
    
    *How to avoid it:* Practice writing complex sentences until they become second nature. Learn to use a variety of structures, including relative clauses, conditionals, and various tense forms. When reviewing your practice essays, pay special attention to verb tenses, subject-verb agreement, and article usage.\n\n
    
    **Conclusion**\n\n
    
    Being aware of these common mistakes is the first step toward avoiding them. Regular practice with feedback, either from a teacher or through a service like Neplia IELTS, will help you identify your personal patterns of error and develop strategies to overcome them. Remember that the goal is clear, accurate communication rather than unnecessarily complex language. With consistent practice and attention to these areas, you'll see your Writing Task 2 scores improve significantly.`,
    coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: "Sarah Johnson",
    date: "April 2, 2025",
    readTime: "8 min read",
    category: "Writing",
    tags: ["Writing Task 2", "Essay Structure", "Common Mistakes", "IELTS Tips"]
  },
  {
    id: "2",
    title: "Strategies for IELTS Listening Section",
    content: `The IELTS Listening section presents unique challenges that require specific strategies to overcome. This comprehensive guide will help you develop techniques to improve your score.\n\n
    
    **Understanding the Format**\n\n
    
    The IELTS Listening test consists of four sections, each more difficult than the last:\n\n
    
    - Section 1: A conversation between two people in an everyday social context
    - Section 2: A monologue in an everyday social context
    - Section 3: A conversation between up to four people in an educational or training context
    - Section 4: A monologue on an academic subject\n\n
    
    You'll hear each recording only once, and questions follow the order of information in the recording. You have 40 minutes total: 30 minutes for the recording and 10 minutes to transfer your answers to the answer sheet.\n\n
    
    **Effective Preparation Strategies**\n\n
    
    **1. Develop Prediction Skills**\n\n
    
    Before each recording begins, you have time to read the questions. Use this time strategically to predict what you might hear.\n\n
    
    *How to practice:* When reviewing practice tests, cover the transcript and try to predict what type of words (nouns, numbers, proper names) would fit in the blanks. This trains your brain to anticipate information patterns.\n\n
    
    **2. Master Note-Taking Techniques**\n\n
    
    Since you can't replay the recording, effective note-taking is crucial. However, don't try to write everything—focus on key information.\n\n
    
    *How to practice:* Develop a personal system of abbreviations and symbols. For example, use "+" for advantages, "-" for disadvantages, "→" for results or consequences. Practice by taking notes while listening to podcasts or TED Talks.\n\n
    
    **3. Improve Your Ability to Recognize Different Accents**\n\n
    
    The IELTS Listening test features speakers with various English accents (British, American, Australian, Canadian, etc.).\n\n
    
    *How to practice:* Regularly expose yourself to different accents through news broadcasts, documentaries, and podcasts from various English-speaking countries. BBC World Service, NPR, ABC Australia, and CBC Canada are excellent resources.\n\n
    
    **4. Build Concentration Stamina**\n\n
    
    Maintaining focus for the entire 30-minute listening test requires mental endurance.\n\n
    
    *How to practice:* Gradually increase your listening practice sessions from 10 minutes to 30+ minutes. Eliminate distractions during practice and train yourself to refocus quickly if your mind wanders.\n\n
    
    **5. Expand Your Vocabulary for Specific Contexts**\n\n
    
    Each section of the Listening test covers different contexts, requiring familiarity with various vocabulary sets.\n\n
    
    *How to practice:* Create vocabulary lists organized by common IELTS Listening topics: transportation, accommodation, education, employment, health, etc. Learn not just the words but how they're used in context.\n\n
    
    **Tactics for Test Day**\n\n
    
    **1. Read Instructions Carefully**\n\n
    
    Different question types have specific requirements. Some may limit your answer to one or two words, while others may ask for numbers or names.\n\n
    
    **2. Keep Moving Forward**\n\n
    
    If you miss an answer, don't panic. Mark the question and move on—fixating on a missed question could cause you to miss subsequent answers.\n\n
    
    **3. Watch for Paraphrasing and Distractors**\n\n
    
    The recording rarely uses the exact words in the questions. Listen for synonyms and paraphrased ideas. Also, be aware that speakers may mention all options in multiple-choice questions, but only one will be correct.\n\n
    
    **4. Pay Attention to Transition Signals**\n\n
    
    Words like "however," "nevertheless," "on the other hand" often signal important information that could contradict previously stated facts.\n\n
    
    **5. Be Careful with Spelling and Grammar**\n\n
    
    Even if you hear the correct answer, you'll lose marks if you spell it incorrectly or don't follow grammatical requirements (e.g., plural forms when needed).\n\n
    
    **Conclusion**\n\n
    
    Improving your IELTS Listening score requires consistent practice with a strategic approach. Focus on developing the specific skills outlined above rather than just repeatedly taking practice tests without analysis. Track your progress, identify patterns in your mistakes, and adjust your preparation accordingly. With systematic practice and these targeted strategies, you'll see significant improvement in your Listening performance.`,
    coverImage: "https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: "Michael Chen",
    date: "March 28, 2025",
    readTime: "6 min read",
    category: "Listening",
    tags: ["Listening Strategies", "Note-taking", "Accent Recognition", "IELTS Preparation"]
  },
  {
    id: "3",
    title: "How to Practice English Speaking Every Day",
    content: `One of the biggest challenges for IELTS candidates is finding opportunities to practice speaking English regularly, especially if they don't live in an English-speaking environment. This post offers practical suggestions for incorporating English speaking practice into your daily routine, regardless of your circumstances.\n\n
    
    **Why Daily Practice Matters**\n\n
    
    Speaking a language is a performance skill similar to playing a musical instrument or a sport—it requires consistent practice to develop fluency, accuracy, and confidence. Even 15-20 minutes of focused practice daily is more effective than several hours once a week.\n\n
    
    **Solo Speaking Practice**\n\n
    
    Don't let the absence of conversation partners prevent you from practicing. Here are effective methods for solo practice:\n\n
    
    **1. Shadow Speaking**\n\n
    
    Find a recording of a native English speaker (podcasts, YouTube videos, audiobooks) and try to speak along with them, mimicking their pronunciation, intonation, and rhythm.\n\n
    
    *How to do it:* Start with short segments (30 seconds) and listen first. Then play it again and speak along with the recording. Finally, try to reproduce the segment on your own. This improves pronunciation, sentence stress, and rhythm.\n\n
    
    **2. Describe Your Day Out Loud**\n\n
    
    Narrate your daily activities in English as you perform them, or recap your day every evening.\n\n
    
    *How to do it:* Start with simple narration: "I'm making coffee now. First, I'm boiling water..." Gradually make it more complex by adding opinions, alternatives, or hypotheticals: "I'm making coffee, which I prefer over tea because it gives me more energy, although sometimes I wonder if I should cut back..."\n\n
    
    **3. Record and Review**\n\n
    
    Use your smartphone to record yourself answering IELTS-style questions, then listen critically to your response.\n\n
    
    *How to do it:* Choose a Part 1, 2, or 3 IELTS Speaking question. Record your answer without preparation first. Listen to it and note areas for improvement. Then re-record your answer with more attention to those areas.\n\n
    
    **4. Talk to Objects**\n\n
    
    It might sound strange, but explaining concepts to inanimate objects (like the "rubber duck debugging" method programmers use) can be surprisingly effective.\n\n
    
    *How to do it:* Choose an object in your room and explain a concept you've recently learned, a movie you've watched, or an opinion you have on a current event. This forces you to organize your thoughts coherently.\n\n
    
    **Finding Conversation Partners**\n\n
    
    While solo practice is valuable, conversation with others offers benefits that can't be replicated alone:\n\n
    
    **1. Language Exchange Apps**\n\n
    
    Applications like Tandem, HelloTalk, and italki connect you with English speakers who want to learn your native language.\n\n
    
    *How to use them effectively:* Schedule regular sessions with consistent partners rather than chatting randomly. Prepare topics in advance and spend equal time on both languages.\n\n
    
    **2. Join Online Communities**\n\n
    
    Find English-speaking groups related to your interests on platforms like Discord, Reddit, or specialized forums.\n\n
    
    *How to participate:* Start by responding to others' comments before creating your own posts. When you feel comfortable, initiate discussions on topics you're knowledgeable about.\n\n
    
    **3. Virtual Volunteer Opportunities**\n\n
    
    Many organizations need volunteers for English-speaking roles like online tutoring or customer support.\n\n
    
    *How to find them:* Websites like VolunteerMatch or United Nations Volunteers list remote opportunities. The benefit is that you're using English for authentic communication while contributing to a cause.\n\n
    
    **4. Create an English Speaking Club**\n\n
    
    If you know others preparing for IELTS, form a regular speaking group.\n\n
    
    *How to organize it:* Meet weekly, assign discussion topics in advance, and establish rules like "English only" and "no interrupting." Rotate the role of facilitator who prepares discussion questions.\n\n
    
    **Incorporating IELTS-Specific Practice**\n\n
    
    While general speaking practice is valuable, also include IELTS-focused exercises:\n\n
    
    **1. Timed Responses**\n\n
    
    Practice answering IELTS Part 2 questions with proper timing: 1 minute to prepare and 2 minutes to speak, without stopping.\n\n
    
    **2. Topic Development**\n\n
    
    Work on extending your answers by systematically adding examples, explanations, and personal experiences to basic responses.\n\n
    
    **3. Function Language Practice**\n\n
    
    Focus on language for specific functions tested in IELTS: comparing, speculating, expressing opinions, agreeing/disagreeing, etc.\n\n
    
    **Overcoming Speaking Anxiety**\n\n
    
    Many learners face psychological barriers to speaking practice:\n\n
    
    **1. Start in Low-Pressure Environments**\n\n
    
    Begin with situations where mistakes have no consequences, such as speaking to pets or talking to yourself.\n\n
    
    **2. Focus on Communication, Not Perfection**\n\n
    
    Remember that even native speakers make errors. The goal is to communicate effectively, not to speak perfectly.\n\n
    
    **3. Embrace Mistakes as Learning Opportunities**\n\n
    
    Keep a "mistake journal" where you note errors you frequently make and their corrections. Review it regularly to track improvement.\n\n
    
    **Conclusion**\n\n
    
    Consistent daily practice, even in small amounts, will significantly improve your English speaking skills over time. Mix different practice methods to develop all aspects of your speaking ability: fluency, pronunciation, vocabulary range, and grammatical accuracy. Remember that speaking improvement follows a non-linear pattern—you might not notice day-to-day progress, but looking back after a month, you'll see considerable advancement. Stay patient and persistent with your practice routine, and you'll approach your IELTS speaking test with greater confidence and competence.`,
    coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: "Emma Wilson",
    date: "March 20, 2025",
    readTime: "5 min read",
    category: "Speaking",
    tags: ["Speaking Practice", "Daily Routine", "Fluency", "Conversation Skills"]
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    // Simulate fetching the blog post
    setLoading(true);
    try {
      const foundPost = blogPosts.find(post => post.id === id);
      if (foundPost) {
        setPost(foundPost);
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [id]);
  
  const handleBackClick = () => {
    navigate('/resources');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground"
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Button>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg text-muted-foreground">Loading post...</p>
            </div>
          ) : error ? (
            <motion.div 
              className="flex flex-col items-center justify-center h-64 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AlertCircle className="h-16 w-16 text-destructive mb-4" />
              <h2 className="text-2xl font-bold mb-2">Blog Post Not Found</h2>
              <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
              <Button onClick={handleBackClick}>
                Return to Resources
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BlogPostDetail post={post} />
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
