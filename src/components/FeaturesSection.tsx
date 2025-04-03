
import React from 'react';
import { 
  Brain, 
  BarChart, 
  Users, 
  Calendar,
  CheckCircle
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Assessment',
    description: 'Get instant, detailed feedback on your performance with our advanced AI engine that identifies your strengths and weaknesses.'
  },
  {
    icon: BarChart,
    title: 'Detailed Analytics',
    description: 'Track your progress with comprehensive analytics and visualizations that help you understand your improvement areas.'
  },
  {
    icon: Users,
    title: 'Global Community',
    description: 'Connect with fellow test-takers worldwide, practice with speaking partners, and learn from experienced mentors.'
  },
  {
    icon: Calendar,
    title: 'Live Mock Tests',
    description: 'Experience the real test environment with our scheduled full-length mock tests and get professional evaluations.'
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Neplia IELTS</h2>
          <p className="text-lg text-muted-foreground">
            Our platform offers unique features designed to maximize your score improvement in the shortest time possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-8 rounded-xl bg-card border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold mb-2">Guaranteed Results</h3>
              <p className="text-muted-foreground">
                Our proven methodology has helped thousands of students achieve their target band scores.
              </p>
            </div>
            <div className="md:col-span-2">
              <ul className="space-y-3">
                {[
                  'Personalized study plans based on your current level and target score',
                  'Adaptive practice that focuses on your weak areas',
                  'Regular progress assessments to keep you on track',
                  'Expert-designed materials that match the real IELTS format',
                  'Money-back guarantee if you don't improve by at least 0.5 bands'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
