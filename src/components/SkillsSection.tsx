
import React from 'react';
import { 
  Book, 
  Pencil, 
  Mic, 
  Headphones,
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const skills = [
  {
    id: 'reading',
    title: 'Reading',
    description: 'Improve your reading skills with our adaptive exercises, focusing on skimming, scanning, and detailed comprehension.',
    icon: Book,
    color: 'reading',
  },
  {
    id: 'writing',
    title: 'Writing',
    description: 'Master essay writing and letter composition with real-time feedback on grammar, coherence, and task achievement.',
    icon: Pencil,
    color: 'writing',
  },
  {
    id: 'speaking',
    title: 'Speaking',
    description: 'Practice with AI interviews, receive pronunciation feedback, and develop fluency with our speaking modules.',
    icon: Mic,
    color: 'speaking',
  },
  {
    id: 'listening',
    title: 'Listening',
    description: 'Train your ear with diverse accents, interactive transcripts, and specialized exercises for each question type.',
    icon: Headphones,
    color: 'listening',
  },
];

const SkillsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Master All IELTS Skills</h2>
          <p className="text-lg text-muted-foreground">
            Our comprehensive platform helps you develop all four IELTS skills with personalized practice and feedback.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {skills.map((skill) => (
            <div 
              key={skill.id}
              className={`skill-card ${skill.id} bg-card`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${skill.color}/10 text-${skill.color} mb-4`}>
                <skill.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
              <p className="text-muted-foreground mb-4">{skill.description}</p>
              <Button 
                variant="ghost" 
                className={`p-0 text-${skill.color} hover:text-${skill.color}-dark hover:bg-transparent`}
              >
                Practice Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg">
            Explore All Practice Materials
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
