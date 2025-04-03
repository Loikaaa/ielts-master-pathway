import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import PracticeSession from "./pages/PracticeSession";
import Community from "./pages/Community";
import Onboarding from "./pages/Onboarding";
import Resources from "./pages/Resources";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ExamContent from "./pages/ExamContent";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBlogManager from "./pages/AdminBlogManager";
import Blog from "./pages/resources/Blog";
import FAQ from "./pages/resources/FAQ";
import SuccessStories from "./pages/resources/SuccessStories";
import IeltsTips from "./pages/resources/IeltsTips";
import { QuestionsProvider } from "./contexts/QuestionsContext";
import { UserProgressProvider } from "./contexts/UserProgressContext";
import BackendControl from "./components/BackendControl";
import MaintenancePage from "./pages/MaintenancePage";
import { isMaintenanceMode } from "./utils/settingsStorage";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInMaintenanceMode, setIsInMaintenanceMode] = useState(false);

  useEffect(() => {
    // Check for maintenance mode using our utility
    const checkMaintenanceMode = () => {
      try {
        const maintenanceEnabled = isMaintenanceMode();
        setIsInMaintenanceMode(maintenanceEnabled);
      } catch (error) {
        console.error('Error checking maintenance mode:', error);
        setIsInMaintenanceMode(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkMaintenanceMode();

    // Check for maintenance mode changes every minute
    const intervalId = setInterval(checkMaintenanceMode, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Show maintenance page if in maintenance mode
  // Exception for admin routes
  if (isInMaintenanceMode && 
      !window.location.pathname.includes('admin') && 
      !window.location.pathname.includes('backend')) {
    return <MaintenancePage />;
  }

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <QuestionsProvider>
          <UserProgressProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/practice" element={<Practice />} />
                  <Route path="/practice/session/:skillType/:practiceId" element={<PracticeSession />} />
                  <Route path="/practice/session/:skillType" element={<PracticeSession />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/resources/blog" element={<Blog />} />
                  <Route path="/resources/faq" element={<FAQ />} />
                  <Route path="/resources/success-stories" element={<SuccessStories />} />
                  <Route path="/resources/ielts-tips" element={<IeltsTips />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/exam-content" element={<ExamContent />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/admin-blog-manager" element={<AdminBlogManager />} />
                  <Route path="/admin-backend" element={<BackendControl />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </UserProgressProvider>
        </QuestionsProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
