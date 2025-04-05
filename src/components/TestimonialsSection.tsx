
import React, { useState } from 'react';
import { Star, Quote, MapPin, X, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const testimonials = [
  {
    id: "1",
    name: 'Sarah L.',
    country: 'Canada',
    score: '8.5',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    text: 'I improved my IELTS score from 6.5 to 8.5 in just 8 weeks using Neplia IELTS. The AI feedback on my writing and speaking was incredibly detailed and helpful.',
    fullStory: "When I first started preparing for IELTS, I was scoring around 6.5 in practice tests. As someone applying for a master's program in Canada, I needed at least an 8.0 overall. I tried various platforms but nothing seemed to help me improve beyond 7.0. A friend recommended Neplia IELTS, and the difference was immediate. The personalized study plan adapted to my weaknesses, particularly in writing and speaking. The AI feedback was detailed enough to help me understand exactly where I was going wrong with grammar and vocabulary usage. After 8 weeks of consistent practice on the platform, I took my IELTS exam and scored 8.5 overall (Reading: 9.0, Listening: 8.5, Writing: 8.0, Speaking: 8.5). I'm now enrolled in my dream university program in Toronto. I highly recommend Neplia IELTS to anyone serious about improving their scores quickly.",
    storyImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: "2",
    name: 'Ahmed M.',
    country: 'UAE',
    score: '7.5',
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
    text: 'The adaptive learning system really works. It identified my weaknesses in reading comprehension and gave me targeted practice that helped me improve rapidly.',
    fullStory: "As a non-native English speaker, reading long passages quickly was always my biggest challenge. I had taken the IELTS test twice before and consistently scored 6.0 in the reading section, which wasn't enough for my university application requirements. What impressed me most about Neplia IELTS was how accurately the system identified my specific struggles with inference questions and timed reading. The platform created daily micro-practices focused exactly on these areas. The progress tracking kept me motivated, showing how my speed and accuracy improved week by week. After three months of practice, I retook the IELTS and scored 7.5 overall with an 8.0 in reading – a full 2 points improvement in my weakest area! The university has accepted my application, and I start my engineering degree next semester.",
    storyImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: "3",
    name: 'Priya K.',
    country: 'India',
    score: '8.0',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    text: 'The speaking practice with AI interviewers helped me overcome my nervousness. I got a band 8 in speaking, which was much higher than I expected!',
    fullStory: "I had always been terrified of the IELTS speaking section. In my first attempt, I froze during Part 2 and scored just 6.0 despite being relatively fluent in English. My problem was anxiety and lack of practice with native speakers. The AI speaking practice on Neplia was game-changing. I could practice anytime without judgment, and the instant feedback on pronunciation, grammar, and vocabulary range was incredibly useful. The simulated interviews felt so real that by the time I took the actual test, I was completely comfortable with the format. The AI also helped me identify filler words I was overusing and suggested better vocabulary alternatives. I practiced daily for six weeks and achieved a speaking score of 8.0 in my second attempt. I'm now working as an English teacher in Mumbai and recommending Neplia to all my students preparing for IELTS.",
    storyImage: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: "4",
    name: 'Carlos R.',
    country: 'Brazil',
    score: '7.0',
    image: 'https://randomuser.me/api/portraits/men/36.jpg',
    text: "As a non-native English speaker, I was worried about the writing section. With Neplia's structured approach and personalized feedback, I improved by 1.5 bands!",
    fullStory: "Growing up in Brazil, I learned English mostly through movies and music, so my spoken English was decent but my academic writing was poor. I needed IELTS for a scholarship program in Australia, but my writing scores in practice tests were stuck at 5.5. What made Neplia different was how it broke down the writing task into manageable steps. I especially appreciated the template structures for Task 1 and 2, and the vocabulary suggestions for different essay types. The detailed grammar correction was better than any human teacher I'd worked with – it not only highlighted errors but explained the rules and gave multiple examples of correct usage. After two months of focused practice, my writing improved to 7.0, and my overall band score reached 7.5. I've successfully secured my scholarship and am now preparing to move to Melbourne to study environmental science.",
    storyImage: 'https://images.unsplash.com/photo-1494883759339-0b042055a4ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: "5",
    name: 'Mei L.',
    country: 'China',
    score: '8.5',
    image: 'https://randomuser.me/api/portraits/women/79.jpg',
    text: 'The mock tests were incredibly similar to the actual exam. I felt completely prepared on test day and achieved my target score for university admission.',
    fullStory: "Preparing for IELTS while working full-time as a software developer was extremely challenging. I needed a flexible solution that could maximize my limited study time. Neplia's analytics-based approach was perfect for me. The initial assessment accurately identified that my listening skills needed the most work, especially with British accents and fast speech. The platform created a study plan that focused 50% of my time on listening exercises, 30% on writing, and 20% on maintaining my already strong reading and speaking skills. I loved how the mock tests adapted to become increasingly challenging as I improved. By test day, I had completed over 30 full-length practice tests and countless skill-specific exercises. I scored 8.5 overall (Listening: 8.5, Reading: 9.0, Writing: 8.0, Speaking: 8.5) and was accepted into my top-choice university in London. Neplia was absolutely worth the investment.",
    storyImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: "6",
    name: 'David K.',
    country: 'Australia',
    score: '7.5',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    text: 'The comprehensive study materials and practice tests helped me identify my strengths and weaknesses, allowing me to focus my preparation effectively.',
    fullStory: "As a native English speaker, I assumed the IELTS would be straightforward, but my first attempt resulted in a disappointing 6.5 overall, with academic writing bringing down my score. I needed at least 7.0 in each band for my graduate program application. Neplia IELTS helped me understand that even native speakers need specific strategies for the exam. The academic writing section breakdown was particularly helpful – I learned how to properly analyze graphs and write structured essays that met all the marking criteria. The timed practice sessions helped me manage the pressure, and the vocabulary enhancement tools expanded my academic language. In my second attempt after using Neplia for just one month, I scored 7.5 overall with no band below 7.0. I particularly appreciated how the platform saved me time by focusing only on what I needed to improve rather than reviewing basics I already knew.",
    storyImage: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const TestimonialsSection = () => {
  const [selectedStory, setSelectedStory] = useState<null | typeof testimonials[0]>(null);
  const { toast } = useToast();

  const handleShareStory = () => {
    if (selectedStory) {
      // In a real app, this would share the story via social media or copy link
      navigator.clipboard.writeText(`Check out ${selectedStory.name}'s IELTS success story on Neplia IELTS! They improved to ${selectedStory.score} band score.`);
      toast({
        title: "Link copied!",
        description: "Share link has been copied to clipboard.",
      });
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-accent/10 to-accent/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from students who transformed their IELTS journey with our platform. 
            Join them and achieve your target score.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="bg-card rounded-xl p-8 shadow-lg border border-primary/10 relative overflow-hidden h-full flex flex-col cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              onClick={() => setSelectedStory(testimonial)}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 -mr-12 -mt-12 rounded-full">
                <div className="absolute bottom-6 left-6 text-lg font-bold text-primary">
                  {testimonial.score}
                </div>
              </div>
              
              <Quote className="h-10 w-10 text-primary/20 mb-4" />
              
              <div className="mb-6 flex-grow">
                <p className="text-muted-foreground italic">{testimonial.text}</p>
              </div>
              
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/50">
                <div className="relative">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-accent rounded-full p-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {testimonial.country}
                  </div>
                </div>
              </div>
              
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="mt-4 w-full text-primary bg-primary/5 hover:bg-primary/10 border-primary/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStory(testimonial);
                }}
              >
                Read Full Story
              </Button>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button 
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary px-8 py-6 text-lg"
            onClick={() => {
              // In a real app, this would open a form to submit their own story
              toast({
                title: "Coming Soon!",
                description: "The 'Share Your Story' feature will be available in the next update.",
              });
            }}
          >
            Share Your Success Story
          </Button>
        </motion.div>
      </div>
      
      {/* Full Story Dialog */}
      <Dialog open={!!selectedStory} onOpenChange={(open) => !open && setSelectedStory(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              Success Story: {selectedStory?.name} from {selectedStory?.country}
            </DialogTitle>
            <DialogDescription>
              Achieved an IELTS score of <span className="font-bold text-primary">{selectedStory?.score}</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-6">
            {selectedStory?.storyImage && (
              <div className="rounded-lg overflow-hidden h-64 w-full">
                <img 
                  src={selectedStory.storyImage} 
                  alt={`${selectedStory.name}'s IELTS journey`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="flex items-start gap-4">
              <img 
                src={selectedStory?.image} 
                alt={selectedStory?.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20 flex-shrink-0 mt-1"
              />
              <div>
                <h3 className="text-xl font-semibold">{selectedStory?.name}</h3>
                <p className="text-muted-foreground">
                  {selectedStory?.country} • Band Score: {selectedStory?.score}
                </p>
                <p className="mt-4 text-lg leading-relaxed">
                  {selectedStory?.fullStory}
                </p>
              </div>
            </div>
            
            <div className="flex justify-between pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={handleShareStory}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share This Story
              </Button>
              
              <DialogClose asChild>
                <Button variant="default">Close</Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TestimonialsSection;
