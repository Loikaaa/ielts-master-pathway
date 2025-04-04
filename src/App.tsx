import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import BlogPost from "./pages/resources/BlogPost";
import FAQ from "./pages/resources/FAQ";
import SuccessStories from "./pages/resources/SuccessStories";
import IeltsTips from "./pages/resources/IeltsTips";
import { QuestionsProvider } from "./contexts/QuestionsContext";
import { UserProgressProvider } from "./contexts/UserProgressContext";
import { UserProvider, useUser } from "./contexts/UserContext";
import MaintenancePage from "./pages/MaintenancePage";
import { isMaintenanceMode, getSettings, getAnalyticsConfig } from "./utils/settingsStorage";

const queryClient = new QueryClient();

// Protected route component for admin routes
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, currentUser } = useUser();
  const location = useLocation();

  useEffect(() => {
    console.log('AdminRoute: Current user:', currentUser);
    console.log('AdminRoute: Is admin:', isAdmin);
  }, [currentUser, isAdmin]);

  if (!currentUser) {
    // If not logged in, redirect to sign in
    console.log('AdminRoute: Not logged in, redirecting to signin');
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    console.log('AdminRoute: User is not an admin, redirecting to dashboard');
    // If logged in but not admin, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // User is admin, render the children
  console.log('AdminRoute: User is admin, rendering children');
  return <>{children}</>;
};

const MaintenanceChecker = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInMaintenanceMode, setIsInMaintenanceMode] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const checkMaintenanceMode = () => {
      try {
        const settings = getSettings();
        console.info('Current settings:', settings);
        
        const maintenanceEnabled = isMaintenanceMode();
        console.info('Maintenance mode enabled:', maintenanceEnabled);
        
        setIsInMaintenanceMode(maintenanceEnabled);
      } catch (error) {
        console.error('Error checking maintenance mode:', error);
        setIsInMaintenanceMode(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkMaintenanceMode();

    const intervalId = setInterval(checkMaintenanceMode, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  const isAdminRoute = pathname.includes('admin') || pathname.includes('backend');
  
  if (isInMaintenanceMode && !isAdminRoute) {
    console.info('Rendering maintenance page for path:', pathname);
    return <MaintenancePage />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
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
      <Route path="/resources/blog/:postId" element={<BlogPost />} />
      <Route path="/resources/faq" element={<FAQ />} />
      <Route path="/resources/success-stories" element={<SuccessStories />} />
      <Route path="/resources/ielts-tips" element={<IeltsTips />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/exam-content" element={<ExamContent />} />
      
      {/* Admin routes with protection */}
      <Route path="/admin-dashboard" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      } />
      <Route path="/admin/*" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      } />
      <Route path="/admin-blog-manager" element={
        <AdminRoute>
          <AdminBlogManager />
        </AdminRoute>
      } />
      
      {/* Catch all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  useEffect(() => {
    const settings = getSettings();
    console.info('App mounted, settings:', settings);
    
    const analyticsConfig = getAnalyticsConfig();
    
    if (analyticsConfig.enabled) {
      if (analyticsConfig.googleAnalyticsId) {
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.googleAnalyticsId}`;
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${analyticsConfig.googleAnalyticsId}');
        `;
        document.head.appendChild(script2);
        console.info('Google Analytics initialized with ID:', analyticsConfig.googleAnalyticsId);
      }
      
      if (analyticsConfig.facebookPixelId) {
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
          fbq('init', '${analyticsConfig.facebookPixelId}');
          fbq('track', 'PageView');
        `;
        document.head.appendChild(pixelScript);
        console.info('Facebook Pixel initialized with ID:', analyticsConfig.facebookPixelId);
      }
      
      if (analyticsConfig.mixpanelToken) {
        const mixpanelScript = document.createElement('script');
        mixpanelScript.innerHTML = `
          (function(c,a){if(!a.__SV){var b=window;try{var d,m,j,k=b.location,f=k.hash;d=function(a,b){return(m=a.match(RegExp(b+"=([^&]*)")))?m[1]:null};f&&d(f,"state")&&(j=JSON.parse(decodeURIComponent(d(f,"state"))),"mpeditor"===j.action&&(b.sessionStorage.setItem("_mpcehash",f),history.replaceState(j.desiredHash||"",c.title,k.pathname+k.search)))}catch(n){}var l,h;window.mixpanel=a;a._i=[];a.init=function(b,d,g){function c(b,i){var a=i.split(".");2==a.length&&(b=b[a[0]],i=a[1]);b[i]=function(){b.push([i].concat(Array.prototype.slice.call(call2_args,0)))}}var e=a;"undefined"!==typeof g?e=a[g]=[]:g="mixpanel";e.people=e.people||[];e.toString=function(b){var a="mixpanel";"mixpanel"!==g&&(a+="."+g);b||(a+=" (stub)");return a};e.people.toString=function(){return e.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
          for(h=0;h<l.length;h++)c(e,l[h]);var f="set set_once union unset remove delete".split(" ");e.get_group=function(){function a(c){b[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));e.push([d,call2])}}for(var b={},d=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<f.length;c++)a(f[c]);return b};a._i.push([b,d,g])};a.__SV=1.2;b=c.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
          MIXPANEL_CUSTOM_LIB_URL:"file:"===c.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";d=c.getElementsByTagName("script")[0];d.parentNode.insertBefore(b,d)}})(document,window.mixpanel||[]);
          mixpanel.init("${analyticsConfig.mixpanelToken}");
          mixpanel.track("Page View");
        `;
        document.head.appendChild(mixpanelScript);
        console.info('Mixpanel initialized with token:', analyticsConfig.mixpanelToken);
      }
    }
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <QuestionsProvider>
            <UserProgressProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <MaintenanceChecker>
                    <AppRoutes />
                  </MaintenanceChecker>
                </BrowserRouter>
              </TooltipProvider>
            </UserProgressProvider>
          </QuestionsProvider>
        </UserProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
