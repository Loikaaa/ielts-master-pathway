
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from '@/contexts/UserContext';
import { 
  Menu, 
  X, 
  LogIn, 
  UserPlus, 
  User,
  ChevronLeft,
  ChevronRight,
  Shield,
  Home,
  BookOpen,
  Users,
  Library,
  Globe,
  BookMarked,
  Headphones,
  Pen
} from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isAdmin, logout } = useUser();
  const isMobile = useIsMobile();
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);
  
  useEffect(() => {
    // Track scrolling to add shadow/background effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (currentUser) {
      console.log('NavBar: User logged in:', currentUser.email);
      console.log('NavBar: Is admin:', isAdmin);
    } else {
      console.log('NavBar: No user logged in');
    }
  }, [currentUser, isAdmin]);
  
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoForward = () => {
    navigate(1);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const isHomePage = location.pathname === '/';

  return (
    <nav className={`sticky top-0 z-50 w-full ${scrolled ? 'bg-white/95 shadow-md backdrop-blur-md' : 'bg-white/80 backdrop-blur-sm'} transition-all duration-300`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {!isHomePage && (
            <div className="flex items-center mr-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleGoBack} 
                className="mr-1"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleGoForward}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
          
          <Link to="/" className="navbar-brand flex items-center space-x-2">
            <div className="relative flex-shrink-0">
              <div className="flex items-center justify-center h-9 w-9 rounded-md bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 text-white shadow-md">
                <span className="font-bold text-lg">N</span>
              </div>
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 via-blue-500 to-emerald-400 text-transparent bg-clip-text">IELTS</span>
          </Link>
        </div>
        
        {!isMobile && (
          <div className="hidden md:flex items-center space-x-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className={cn(navigationMenuTriggerStyle(), "group")}>
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Practice
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/practice"
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              IELTS Practice
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Prepare for your exam with our comprehensive practice materials.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/practice?skill=reading" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none text-reading">Reading</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Improve comprehension and scanning skills
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/practice?skill=writing" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none text-writing">Writing</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Master essay writing and task achievement
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/practice?skill=speaking" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none text-speaking">Speaking</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Practice fluency and pronunciation
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/practice?skill=listening" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none text-listening">Listening</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Train with diverse accents and exercises
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Users className="h-4 w-4 mr-2" />
                    Community
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/community" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Discussion Board</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Join conversations with other IELTS test-takers
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/community" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Study Groups</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Find study partners and prepare together
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Library className="h-4 w-4 mr-2" />
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources/blog" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Blog</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Expert advice and study strategies
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources/faq" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">FAQ</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Answers to common questions
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources/success-stories" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Success Stories</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Read about others' achievements
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources/ielts-tips" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">IELTS Tips</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Strategic advice for exam day
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex space-x-2 ml-4">
              {currentUser ? (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/dashboard">
                      <User className="h-4 w-4 mr-2" />
                      My Dashboard
                    </Link>
                  </Button>
                  {isAdmin && (
                    <Button variant="outline" size="sm" asChild className="bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100">
                      <Link to="/admin">
                        <Shield className="h-4 w-4 mr-2 text-amber-600" />
                        Admin
                      </Link>
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogIn className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/signin">
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/signup">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
        
        <button 
          className="md:hidden relative z-20 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-slate-200 shadow-sm transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-5 w-5 text-indigo-600" /> : <Menu className="h-5 w-5 text-indigo-600" />}
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[57px] z-50 bg-gradient-to-b from-white to-slate-50">
          <ScrollArea className="h-[calc(100vh-110px)] custom-scrollbar">
            <div className="px-4 py-6">
              {/* Main navigation cards */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <MobileNavCard 
                  to="/"
                  icon={<Home className="h-5 w-5 text-blue-600" />}
                  label="Home"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
                />
                
                <MobileNavCard 
                  to="/practice"
                  icon={<BookOpen className="h-5 w-5 text-green-600" />}
                  label="Practice"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
                />
                
                <MobileNavCard 
                  to="/community"
                  icon={<Users className="h-5 w-5 text-purple-600" />}
                  label="Community"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
                />
                
                <MobileNavCard 
                  to="/resources"
                  icon={<Library className="h-5 w-5 text-amber-600" />}
                  label="Resources"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200"
                />
              </div>
              
              {/* IELTS Skills section */}
              <div className="mb-6 bg-white/80 rounded-xl backdrop-blur-sm p-4 shadow-sm border border-slate-100">
                <h3 className="text-sm font-semibold uppercase text-slate-500 mb-3 px-1 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2"></span>
                  IELTS Skills
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <MobileNavSkillCard 
                    to="/practice?skill=reading"
                    icon={<BookMarked className="h-4 w-4 text-pink-600" />}
                    label="Reading"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200"
                  />
                  
                  <MobileNavSkillCard 
                    to="/practice?skill=writing"
                    icon={<Pen className="h-4 w-4 text-emerald-600" />}
                    label="Writing"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200"
                  />
                  
                  <MobileNavSkillCard 
                    to="/practice?skill=speaking"
                    icon={<Globe className="h-4 w-4 text-indigo-600" />}
                    label="Speaking"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200"
                  />
                  
                  <MobileNavSkillCard 
                    to="/practice?skill=listening"
                    icon={<Headphones className="h-4 w-4 text-amber-600" />}
                    label="Listening"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200"
                  />
                </div>
              </div>
              
              {/* Account section */}
              {currentUser && (
                <div className="mb-6 bg-white/80 rounded-xl backdrop-blur-sm p-4 shadow-sm border border-slate-100">
                  <h3 className="text-sm font-semibold uppercase text-slate-500 mb-3 px-1 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></span>
                    Your Account
                  </h3>
                  
                  <MobileNavCard 
                    to="/dashboard"
                    icon={<User className="h-5 w-5 text-primary" />}
                    label="Dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 mb-3"
                  />
                  
                  {isAdmin && (
                    <MobileNavCard 
                      to="/admin"
                      icon={<Shield className="h-5 w-5 text-amber-600" />}
                      label="Admin Panel"
                      onClick={() => setIsMenuOpen(false)}
                      className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200"
                    />
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
          
          {/* Fixed authentication bar */}
          <div className="fixed bottom-0 left-0 w-full p-4 bg-white/95 border-t border-slate-200 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] backdrop-blur-lg">
            {currentUser ? (
              <Button 
                variant="outline" 
                className="w-full justify-center bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200 text-rose-600 hover:bg-rose-200 font-medium" 
                onClick={handleLogout}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="justify-center font-medium border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 hover:bg-slate-200" 
                  asChild
                >
                  <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                    <LogIn className="h-4 w-4 mr-1.5" />
                    Sign In
                  </Link>
                </Button>
                
                <Button 
                  className="justify-center font-medium bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 shadow-md" 
                  asChild
                >
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <UserPlus className="h-4 w-4 mr-1.5" />
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const MobileNavCard = ({ to, icon, label, onClick, className = "" }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center p-4 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
      onClick={onClick}
    >
      <div className="mr-3 p-2 rounded-lg bg-white/70 shadow-inner flex items-center justify-center">
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const MobileNavSkillCard = ({ to, icon, label, onClick, className = "" }) => {
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
      onClick={onClick}
    >
      <div className="mb-2 p-2 rounded-lg bg-white/70 shadow-inner flex items-center justify-center">
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export default NavBar;
