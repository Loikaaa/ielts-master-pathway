
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuestionManager from '@/components/practice/QuestionManager';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const PracticeSession = () => {
  const { skillType } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    // Request microphone permission for speaking section
    if (skillType === 'speaking') {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        toast({
          title: "Microphone Access Required",
          description: "This speaking test requires microphone access. Please allow when prompted.",
        });
        
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            console.log("Microphone permission granted");
            // Stop all tracks to release the microphone
            stream.getTracks().forEach(track => track.stop());
          })
          .catch(err => {
            console.error("Error accessing microphone:", err);
            toast({
              title: "Microphone Access Denied",
              description: "You need to allow microphone access to complete the speaking test.",
              variant: "destructive",
            });
          });
      }
    }
  }, [skillType, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12">
        <QuestionManager />
      </main>
      <Footer />
    </div>
  );
};

export default PracticeSession;
