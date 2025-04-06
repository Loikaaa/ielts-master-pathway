
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
  Library
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
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-white"></div>
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
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[61px] z-50 bg-background/95 backdrop-blur-sm animate-in slide-in-from-top-5 duration-300">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-6 h-[calc(100vh-61px)] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <Link 
                to="/" 
                className="flex flex-col items-center justify-center p-4 bg-accent/50 rounded-xl shadow-sm border border-border/50 hover:bg-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-6 w-6 mb-2 text-primary" />
                <span className="font-medium">Home</span>
              </Link>
              
              <Link 
                to="/practice" 
                className="flex flex-col items-center justify-center p-4 bg-accent/50 rounded-xl shadow-sm border border-border/50 hover:bg-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="h-6 w-6 mb-2 text-primary" />
                <span className="font-medium">Practice</span>
              </Link>
              
              <Link 
                to="/community" 
                className="flex flex-col items-center justify-center p-4 bg-accent/50 rounded-xl shadow-sm border border-border/50 hover:bg-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Users className="h-6 w-6 mb-2 text-primary" />
                <span className="font-medium">Community</span>
              </Link>
              
              <Link 
                to="/resources" 
                className="flex flex-col items-center justify-center p-4 bg-accent/50 rounded-xl shadow-sm border border-border/50 hover:bg-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Library className="h-6 w-6 mb-2 text-primary" />
                <span className="font-medium">Resources</span>
              </Link>
            </div>
            
            <div className="mt-2 space-y-3">
              <h3 className="font-medium text-lg px-2">IELTS Skills</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to="/practice?skill=reading" 
                  className="flex flex-col p-3 bg-accent/30 rounded-lg shadow-sm border border-reading/20 hover:border-reading/40 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="font-medium text-reading">Reading</span>
                  <span className="text-xs text-muted-foreground line-clamp-2">Improve comprehension skills</span>
                </Link>
                
                <Link 
                  to="/practice?skill=writing" 
                  className="flex flex-col p-3 bg-accent/30 rounded-lg shadow-sm border border-writing/20 hover:border-writing/40 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="font-medium text-writing">Writing</span>
                  <span className="text-xs text-muted-foreground line-clamp-2">Master essay techniques</span>
                </Link>
                
                <Link 
                  to="/practice?skill=speaking" 
                  className="flex flex-col p-3 bg-accent/30 rounded-lg shadow-sm border border-speaking/20 hover:border-speaking/40 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="font-medium text-speaking">Speaking</span>
                  <span className="text-xs text-muted-foreground line-clamp-2">Practice pronunciation</span>
                </Link>
                
                <Link 
                  to="/practice?skill=listening" 
                  className="flex flex-col p-3 bg-accent/30 rounded-lg shadow-sm border border-listening/20 hover:border-listening/40 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="font-medium text-listening">Listening</span>
                  <span className="text-xs text-muted-foreground line-clamp-2">Train with diverse accents</span>
                </Link>
              </div>
            </div>
            
            {currentUser && (
              <Link 
                to="/dashboard" 
                className="flex items-center justify-center p-4 mt-2 bg-primary/10 rounded-lg text-primary border border-primary/20"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                <span className="font-medium">My Dashboard</span>
              </Link>
            )}
            
            {isAdmin && currentUser && (
              <Link 
                to="/admin" 
                className="flex items-center justify-center p-4 bg-amber-50 text-amber-800 rounded-lg border border-amber-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield className="h-5 w-5 mr-2 text-amber-600" />
                <span className="font-medium">Admin Panel</span>
              </Link>
            )}
            
            <div className="mt-auto grid grid-cols-2 gap-4">
              {currentUser ? (
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleLogout}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
