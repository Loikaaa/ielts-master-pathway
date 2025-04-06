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
      
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[61px] z-50 bg-background/98 backdrop-blur-lg">
          <ScrollArea className="h-[calc(100vh-61px)]">
            <div className="px-4 py-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <MobileNavCard 
                  to="/"
                  icon={<Home className="h-5 w-5 text-blue-500" />}
                  label="Home"
                  color="bg-blue-50"
                  border="border-blue-100"
                  onClick={() => setIsMenuOpen(false)}
                />
                
                <MobileNavCard 
                  to="/practice"
                  icon={<BookOpen className="h-5 w-5 text-green-500" />}
                  label="Practice"
                  color="bg-green-50"
                  border="border-green-100"
                  onClick={() => setIsMenuOpen(false)}
                />
                
                <MobileNavCard 
                  to="/community"
                  icon={<Users className="h-5 w-5 text-purple-500" />}
                  label="Community"
                  color="bg-purple-50"
                  border="border-purple-100"
                  onClick={() => setIsMenuOpen(false)}
                />
                
                <MobileNavCard 
                  to="/resources"
                  icon={<Library className="h-5 w-5 text-amber-500" />}
                  label="Resources"
                  color="bg-amber-50"
                  border="border-amber-100"
                  onClick={() => setIsMenuOpen(false)}
                />
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-base mb-3 text-muted-foreground px-2">IELTS Skills</h3>
                
                <div className="space-y-2">
                  <MobileNavLink 
                    to="/practice?skill=reading"
                    icon={<BookMarked className="h-4 w-4 text-pink-500" />}
                    label="Reading"
                    description="Improve comprehension skills"
                    onClick={() => setIsMenuOpen(false)}
                  />
                  
                  <MobileNavLink 
                    to="/practice?skill=writing"
                    icon={<Pen className="h-4 w-4 text-emerald-500" />}
                    label="Writing"
                    description="Master essay techniques"
                    onClick={() => setIsMenuOpen(false)}
                  />
                  
                  <MobileNavLink 
                    to="/practice?skill=speaking"
                    icon={<Globe className="h-4 w-4 text-indigo-500" />}
                    label="Speaking"
                    description="Practice pronunciation"
                    onClick={() => setIsMenuOpen(false)}
                  />
                  
                  <MobileNavLink 
                    to="/practice?skill=listening"
                    icon={<Headphones className="h-4 w-4 text-amber-500" />}
                    label="Listening"
                    description="Train with diverse accents"
                    onClick={() => setIsMenuOpen(false)}
                  />
                </div>
              </div>
              
              {currentUser && (
                <div className="mb-6">
                  <MobileNavLink 
                    to="/dashboard"
                    icon={<User className="h-4 w-4 text-primary" />}
                    label="My Dashboard"
                    description="Track your progress"
                    onClick={() => setIsMenuOpen(false)}
                  />
                </div>
              )}
              
              {isAdmin && currentUser && (
                <div className="mb-6">
                  <MobileNavLink 
                    to="/admin"
                    icon={<Shield className="h-4 w-4 text-amber-600" />}
                    label="Admin Panel"
                    description="Manage your site"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-amber-50 text-amber-900 border-amber-100"
                  />
                </div>
              )}
            </div>
            
            <div className="sticky bottom-0 left-0 w-full p-4 bg-background/95 backdrop-blur-md border-t">
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground mb-2">
                  {currentUser ? 'Account' : 'Get Started'}
                </h3>
                
                {currentUser ? (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100" 
                    onClick={handleLogout}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="justify-center" 
                      asChild
                    >
                      <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </Link>
                    </Button>
                    
                    <Button 
                      className="justify-center" 
                      asChild
                    >
                      <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </nav>
  );
};

const MobileNavCard = ({ to, icon, label, color, border, onClick }) => {
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center p-4 rounded-lg border ${border} ${color} hover:shadow-md transition-all duration-200`}
      onClick={onClick}
    >
      <div className="mb-2">
        {icon}
      </div>
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
};

const MobileNavLink = ({ to, icon, label, description, onClick, className = "" }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center p-3 rounded-lg border border-border/50 hover:bg-accent hover:border-accent transition-colors ${className}`}
      onClick={onClick}
    >
      <div className="flex-shrink-0 mr-3">
        {icon}
      </div>
      <div>
        <div className="font-medium text-sm">{label}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
};

export default NavBar;
