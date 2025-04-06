
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
  Sparkles,
  Globe,
  BookMarked
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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-lg shadow-md' : 'bg-background/80 backdrop-blur-md border-b shadow-sm'}`}>
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
          
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 text-white shadow-md">
                <span className="font-bold text-xl">N</span>
              </div>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 via-blue-500 to-emerald-400 text-transparent bg-clip-text">IELTS</span>
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
          className="md:hidden relative z-20 w-10 h-10 flex items-center justify-center rounded-full bg-primary/5 hover:bg-primary/10 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      
      {/* Mobile Navigation Menu with Enhanced Design */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[61px] z-50 bg-gradient-to-b from-background/98 to-background/95 backdrop-blur-md animate-in slide-in-from-top duration-300">
          <div className="container h-[calc(100vh-61px)] flex flex-col overflow-hidden">
            {/* Main navigation grid */}
            <div className="px-2 py-6 grid grid-cols-2 gap-3 overflow-y-auto custom-scrollbar">
              {/* Main Menu Cards */}
              <Link 
                to="/" 
                className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl shadow-sm border border-primary/10 hover:border-primary/30 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 text-primary mb-3">
                  <Home className="h-6 w-6" />
                </div>
                <span className="font-medium">Home</span>
              </Link>
              
              <Link 
                to="/practice" 
                className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl shadow-sm border border-secondary/10 hover:border-secondary/30 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-secondary/10 text-secondary mb-3">
                  <BookOpen className="h-6 w-6" />
                </div>
                <span className="font-medium">Practice</span>
              </Link>
              
              <Link 
                to="/community" 
                className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-xl shadow-sm border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-500/10 text-blue-500 mb-3">
                  <Users className="h-6 w-6" />
                </div>
                <span className="font-medium">Community</span>
              </Link>
              
              <Link 
                to="/resources" 
                className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-500/5 to-purple-500/10 rounded-xl shadow-sm border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-500/10 text-purple-500 mb-3">
                  <Library className="h-6 w-6" />
                </div>
                <span className="font-medium">Resources</span>
              </Link>
            </div>
            
            {/* IELTS Skills section with enhanced design */}
            <div className="px-4 mt-2 mb-4">
              <div className="relative py-4 mb-3">
                <h3 className="font-semibold text-lg text-center">IELTS Skills</h3>
                <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to="/practice?skill=reading" 
                  className="group p-4 bg-white/5 rounded-xl shadow-sm border border-reading/20 hover:border-reading/40 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-reading/10 text-reading group-hover:scale-110 transition-transform">
                      <BookMarked className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-reading">Reading</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    Improve comprehension skills
                  </p>
                </Link>
                
                <Link 
                  to="/practice?skill=writing" 
                  className="group p-4 bg-white/5 rounded-xl shadow-sm border border-writing/20 hover:border-writing/40 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-writing/10 text-writing group-hover:scale-110 transition-transform">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-writing">Writing</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    Master essay techniques
                  </p>
                </Link>
                
                <Link 
                  to="/practice?skill=speaking" 
                  className="group p-4 bg-white/5 rounded-xl shadow-sm border border-speaking/20 hover:border-speaking/40 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-speaking/10 text-speaking group-hover:scale-110 transition-transform">
                      <Globe className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-speaking">Speaking</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    Practice pronunciation
                  </p>
                </Link>
                
                <Link 
                  to="/practice?skill=listening" 
                  className="group p-4 bg-white/5 rounded-xl shadow-sm border border-listening/20 hover:border-listening/40 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-listening/10 text-listening group-hover:scale-110 transition-transform">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-listening">Listening</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    Train with diverse accents
                  </p>
                </Link>
              </div>
            </div>
            
            {/* User Dashboard section */}
            {currentUser && (
              <Link 
                to="/dashboard" 
                className="mx-4 p-4 mb-4 bg-gradient-to-r from-indigo-500/5 to-primary/5 rounded-xl shadow-sm border border-primary/20 hover:border-primary/30 flex items-center gap-3 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-grow">
                  <span className="font-medium text-sm">My Dashboard</span>
                  <p className="text-xs text-muted-foreground">Track your progress</p>
                </div>
              </Link>
            )}
            
            {/* Admin panel link with enhanced design */}
            {isAdmin && currentUser && (
              <Link 
                to="/admin" 
                className="mx-4 p-4 mb-4 bg-gradient-to-r from-amber-100 to-amber-50 rounded-xl shadow-sm border border-amber-200 flex items-center gap-3 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex-grow">
                  <span className="font-medium text-amber-800 text-sm">Admin Panel</span>
                  <p className="text-xs text-amber-700/70">Manage your site</p>
                </div>
              </Link>
            )}
            
            {/* Auth buttons with beautiful design */}
            <div className="mt-auto p-4 border-t border-border/30">
              <div className="grid grid-cols-2 gap-3">
                {currentUser ? (
                  <Button 
                    variant="outline" 
                    className="w-full h-12 rounded-xl shadow-sm border-rose-200 hover:border-rose-300 bg-gradient-to-b from-rose-50 to-white text-rose-600 hover:text-rose-700" 
                    onClick={handleLogout}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full h-12 rounded-xl shadow-sm flex items-center justify-center gap-2" 
                      asChild
                    >
                      <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                        <LogIn className="h-4 w-4" />
                        <span>Sign In</span>
                      </Link>
                    </Button>
                    
                    <Button 
                      className="w-full h-12 rounded-xl shadow-sm bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 transition-all duration-300" 
                      asChild
                    >
                      <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        <span>Sign Up</span>
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
