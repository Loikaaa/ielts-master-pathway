
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
      
      {/* Mobile Navigation Menu with Improved Design */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[61px] z-50 bg-background/98 backdrop-blur-lg animate-in fade-in duration-200">
          <div className="h-[calc(100vh-61px)] flex flex-col overflow-y-auto custom-scrollbar">
            {/* Main navigation sections */}
            <div className="grid grid-cols-2 gap-4 p-4">
              <Link 
                to="/" 
                className="relative overflow-hidden flex flex-col items-center justify-center p-5 rounded-xl shadow transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  background: "linear-gradient(145deg, #f0f0f0, #ffffff)",
                  boxShadow: "5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff"
                }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 mb-3">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <span className="font-medium">Home</span>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary/5 rounded-full blur-xl"></div>
              </Link>
              
              <Link 
                to="/practice" 
                className="relative overflow-hidden flex flex-col items-center justify-center p-5 rounded-xl shadow transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  background: "linear-gradient(145deg, #f0f0f0, #ffffff)",
                  boxShadow: "5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff"
                }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-secondary/10 to-secondary/5 mb-3">
                  <BookOpen className="h-6 w-6 text-secondary" />
                </div>
                <span className="font-medium">Practice</span>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-secondary/5 rounded-full blur-xl"></div>
              </Link>
              
              <Link 
                to="/community" 
                className="relative overflow-hidden flex flex-col items-center justify-center p-5 rounded-xl shadow transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  background: "linear-gradient(145deg, #f0f0f0, #ffffff)",
                  boxShadow: "5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff"
                }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-400/10 to-blue-500/5 mb-3">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <span className="font-medium">Community</span>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-500/5 rounded-full blur-xl"></div>
              </Link>
              
              <Link 
                to="/resources" 
                className="relative overflow-hidden flex flex-col items-center justify-center p-5 rounded-xl shadow transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  background: "linear-gradient(145deg, #f0f0f0, #ffffff)",
                  boxShadow: "5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff"
                }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-400/10 to-purple-500/5 mb-3">
                  <Library className="h-6 w-6 text-purple-500" />
                </div>
                <span className="font-medium">Resources</span>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-purple-500/5 rounded-full blur-xl"></div>
              </Link>
            </div>
            
            {/* IELTS Skills section */}
            <div className="px-4 mt-4">
              <div className="relative py-4 mb-3 flex items-center justify-center">
                <div className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                <h3 className="font-semibold text-lg relative bg-background px-4 z-10">IELTS Skills</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  to="/practice?skill=reading" 
                  className="group p-4 rounded-xl shadow-sm flex flex-col"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    background: "linear-gradient(135deg, rgba(236,72,153,0.05) 0%, rgba(236,72,153,0.1) 100%)",
                    border: "1px solid rgba(236,72,153,0.1)"
                  }}
                >
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-pink-500/10 mr-3 transition-all duration-300 group-hover:scale-110">
                      <BookMarked className="h-5 w-5 text-pink-500" />
                    </div>
                    <span className="font-medium text-pink-500">Reading</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-12">
                    Improve comprehension skills
                  </p>
                </Link>
                
                <Link 
                  to="/practice?skill=writing" 
                  className="group p-4 rounded-xl shadow-sm flex flex-col"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    background: "linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(16,185,129,0.1) 100%)",
                    border: "1px solid rgba(16,185,129,0.1)"
                  }}
                >
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-500/10 mr-3 transition-all duration-300 group-hover:scale-110">
                      <BookOpen className="h-5 w-5 text-emerald-500" />
                    </div>
                    <span className="font-medium text-emerald-500">Writing</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-12">
                    Master essay techniques
                  </p>
                </Link>
                
                <Link 
                  to="/practice?skill=speaking" 
                  className="group p-4 rounded-xl shadow-sm flex flex-col"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    background: "linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(99,102,241,0.1) 100%)",
                    border: "1px solid rgba(99,102,241,0.1)"
                  }}
                >
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-indigo-500/10 mr-3 transition-all duration-300 group-hover:scale-110">
                      <Globe className="h-5 w-5 text-indigo-500" />
                    </div>
                    <span className="font-medium text-indigo-500">Speaking</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-12">
                    Practice pronunciation
                  </p>
                </Link>
                
                <Link 
                  to="/practice?skill=listening" 
                  className="group p-4 rounded-xl shadow-sm flex flex-col"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    background: "linear-gradient(135deg, rgba(245,158,11,0.05) 0%, rgba(245,158,11,0.1) 100%)",
                    border: "1px solid rgba(245,158,11,0.1)"
                  }}
                >
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-500/10 mr-3 transition-all duration-300 group-hover:scale-110">
                      <Sparkles className="h-5 w-5 text-amber-500" />
                    </div>
                    <span className="font-medium text-amber-500">Listening</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-12">
                    Train with diverse accents
                  </p>
                </Link>
              </div>
            </div>
            
            {/* User Dashboard section */}
            {currentUser && (
              <div className="px-4 mt-6">
                <Link 
                  to="/dashboard" 
                  className="relative overflow-hidden p-4 rounded-xl shadow-sm flex items-center gap-3 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    background: "linear-gradient(145deg, #f0f0f0, #ffffff)",
                    boxShadow: "3px 3px 6px #d9d9d9, -3px -3px 6px #ffffff"
                  }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <span className="font-medium text-sm">My Dashboard</span>
                    <p className="text-xs text-muted-foreground">Track your progress</p>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/5 rounded-full blur-xl"></div>
                </Link>
              </div>
            )}
            
            {/* Admin panel link */}
            {isAdmin && currentUser && (
              <div className="px-4 mt-4">
                <Link 
                  to="/admin" 
                  className="relative overflow-hidden p-4 rounded-xl shadow-sm flex items-center gap-3 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    background: "linear-gradient(145deg, #fff8e6, #fffdf0)",
                    boxShadow: "3px 3px 6px #e6e0cf, -3px -3px 6px #fffff7"
                  }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="flex-grow">
                    <span className="font-medium text-amber-800 text-sm">Admin Panel</span>
                    <p className="text-xs text-amber-700/70">Manage your site</p>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-amber-500/5 rounded-full blur-xl"></div>
                </Link>
              </div>
            )}
            
            {/* Auth buttons */}
            <div className="px-4 mt-auto sticky bottom-0 pt-4 pb-6 bg-background/90 backdrop-blur-sm">
              <div className="relative py-4 mb-2 flex items-center justify-center">
                <div className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-border to-transparent"></div>
                <div className="font-medium text-sm relative bg-background px-4 z-10 text-muted-foreground">
                  {currentUser ? 'Account' : 'Get Started'}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {currentUser ? (
                  <Button 
                    variant="outline" 
                    className="h-12 rounded-xl flex items-center justify-center border-rose-200 bg-rose-50/50 text-rose-600 hover:bg-rose-100 hover:text-rose-700" 
                    onClick={handleLogout}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="h-12 rounded-xl flex items-center justify-center gap-2" 
                      asChild
                    >
                      <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                        <LogIn className="h-4 w-4" />
                        <span>Sign In</span>
                      </Link>
                    </Button>
                    
                    <Button 
                      className="h-12 rounded-xl flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-md" 
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
