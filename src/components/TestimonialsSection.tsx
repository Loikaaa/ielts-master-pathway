
import React from 'react';
import { Star } from "lucide-react";

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
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-lg text-muted-foreground">
            Hear from students who achieved their target scores with Neplia IELTS.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-card rounded-xl p-6 shadow-sm border relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary -mr-4 -mt-4 transform rotate-45"></div>
              <div className="absolute top-1 right-1 text-xs text-primary-foreground font-medium">
                {testimonial.score}
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.country}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              
              <p className="text-muted-foreground">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
