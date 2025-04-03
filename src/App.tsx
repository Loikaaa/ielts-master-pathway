
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
import { isMaintenanceMode, getSettings } from "./utils/settingsStorage";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInMaintenanceMode, setIsInMaintenanceMode] = useState(false);

  useEffect(() => {
    // Check for maintenance mode using our utility
    const checkMaintenanceMode = () => {
      try {
        // Get all settings for inspection
        const settings = getSettings();
        console.log('Current settings:', settings);
        
        const maintenanceEnabled = isMaintenanceMode();
        console.log('Maintenance mode enabled:', maintenanceEnabled);
        
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

  // Add Google Analytics script if configured
  useEffect(() => {
    const settings = getSettings();
    const googleAnalyticsId = settings?.analytics?.googleAnalyticsId;
    
    if (googleAnalyticsId && settings?.analytics?.enabled) {
      // Add Google Analytics
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalyticsId}');
      `;
      document.head.appendChild(script2);
      
      // Add Facebook Pixel if available
      const facebookPixelId = settings?.analytics?.facebookPixelId;
      if (facebookPixelId) {
        const pixelScript = document.createElement('script');
        pixelScript.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${facebookPixelId}');
          fbq('track', 'PageView');
        `;
        document.head.appendChild(pixelScript);
      }
    }
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
    console.log('Rendering maintenance page for path:', window.location.pathname);
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
