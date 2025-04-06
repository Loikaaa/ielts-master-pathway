
import React from 'react';
import { 
  Book, 
  Pencil, 
  Mic, 
  Headphones,
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const skills = [
  {
    id: 'reading',
    title: 'Reading',
    description: 'Improve your reading skills with our adaptive exercises, focusing on skimming, scanning, and detailed comprehension.',
    icon: Book,
    color: 'reading',
    link: '/practice?skill=reading'
  },
  {
    id: 'writing',
    title: 'Writing',
    description: 'Master essay writing and letter composition with real-time feedback on grammar, coherence, and task achievement.',
    icon: Pencil,
    color: 'writing',
    link: '/practice?skill=writing'
  },
  {
    id: 'speaking',
    title: 'Speaking',
    description: 'Practice with AI interviews, receive pronunciation feedback, and develop fluency with our speaking modules.',
    icon: Mic,
    color: 'speaking',
    link: '/practice?skill=speaking'
  },
  {
    id: 'listening',
    title: 'Listening',
    description: 'Train your ear with diverse accents, interactive transcripts, and specialized exercises for each question type.',
    icon: Headphones,
    color: 'listening',
    link: '/practice?skill=listening'
  },
];

const SkillsSection = () => {
  const navigate = useNavigate();
  
  const handleSkillClick = (skillLink) => {
    navigate(skillLink);
  };

  return (
    <section className="py-16 lg:py-24 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Master All IELTS Skills</h2>
          <p className="text-lg text-muted-foreground">
            Our comprehensive platform helps you develop all four IELTS skills with personalized practice and feedback.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {skills.map((skill) => (
            <div 
              key={skill.id}
              onClick={() => handleSkillClick(skill.link)}
              className={`skill-card ${skill.id} bg-card hover:shadow-lg transition-all duration-300 p-4 md:p-6 rounded-xl border hover:border-${skill.color} cursor-pointer`}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-${skill.color}/10 text-${skill.color} mb-3 md:mb-4`}>
                <skill.icon className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">{skill.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">{skill.description}</p>
              <Button 
                variant="ghost" 
                className={`p-0 text-${skill.color} hover:text-${skill.color} hover:bg-transparent mt-1 md:mt-2 text-sm md:text-base`}
              >
                Practice Now <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col items-center">
          <div className="max-w-xl text-center mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">IELTS Exam Overview</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              The IELTS (International English Language Testing System) assesses your English language skills across four key areas. Choose between Academic and General Training formats based on your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-2xl mb-6">
            <div className="bg-card p-3 md:p-4 rounded-lg border">
              <h4 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Academic Test</h4>
              <p className="text-xs md:text-sm text-muted-foreground">
                Designed for those applying to study at undergraduate or postgraduate levels, or for professional registration.
              </p>
            </div>
            <div className="bg-card p-3 md:p-4 rounded-lg border">
              <h4 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">General Training Test</h4>
              <p className="text-xs md:text-sm text-muted-foreground">
                Suitable for those migrating to Australia, Canada, New Zealand or the UK, or applying for secondary education or work experience.
              </p>
            </div>
          </div>
          
          <Button size="lg" asChild>
            <Link to="/practice">
              Explore All Practice Materials
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
