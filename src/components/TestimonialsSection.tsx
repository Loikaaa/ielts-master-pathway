
import React from 'react';
import { Star, Quote, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: 'Sarah L.',
    country: 'Canada',
    score: '8.5',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    text: 'I improved my IELTS score from 6.5 to 8.5 in just 8 weeks using Neplia IELTS. The AI feedback on my writing and speaking was incredibly detailed and helpful.'
  },
  {
    name: 'Ahmed M.',
    country: 'UAE',
    score: '7.5',
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
    text: 'The adaptive learning system really works. It identified my weaknesses in reading comprehension and gave me targeted practice that helped me improve rapidly.'
  },
  {
    name: 'Priya K.',
    country: 'India',
    score: '8.0',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    text: 'The speaking practice with AI interviewers helped me overcome my nervousness. I got a band 8 in speaking, which was much higher than I expected!'
  },
  {
    name: 'Carlos R.',
    country: 'Brazil',
    score: '7.0',
    image: 'https://randomuser.me/api/portraits/men/36.jpg',
    text: 'As a non-native English speaker, I was worried about the writing section. With Neplia\'s structured approach and personalized feedback, I improved by 1.5 bands!'
  },
  {
    name: 'Mei L.',
    country: 'China',
    score: '8.5',
    image: 'https://randomuser.me/api/portraits/women/79.jpg',
    text: 'The mock tests were incredibly similar to the actual exam. I felt completely prepared on test day and achieved my target score for university admission.'
  },
  {
    name: 'David K.',
    country: 'Australia',
    score: '7.5',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    text: 'The comprehensive study materials and practice tests helped me identify my strengths and weaknesses, allowing me to focus my preparation effectively.'
  }
];

const TestimonialsSection = () => {
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
              className="bg-card rounded-xl p-8 shadow-lg border border-primary/10 relative overflow-hidden h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
