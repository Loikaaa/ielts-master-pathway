
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from '@/contexts/UserContext';
import { 
  Sparkles, 
  Menu, 
  X, 
  LogIn, 
  UserPlus, 
  Shield, 
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isAdmin } = useUser();
  
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoForward = () => {
    navigate(1);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md z-50 border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
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
          
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-md bg-gradient-to-br from-purple-500 via-blue-400 to-emerald-400 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 via-blue-500 to-emerald-400 text-transparent bg-clip-text">Neplia IELTS</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/practice" className="text-foreground/80 hover:text-foreground transition-colors">
            Practice
          </Link>
          <Link to="/community" className="text-foreground/80 hover:text-foreground transition-colors">
            Community
          </Link>
          <Link to="/resources" className="text-foreground/80 hover:text-foreground transition-colors">
            Resources
          </Link>
          <div className="flex space-x-2">
            {isAdmin && (
              <Button variant="outline" size="sm" className="mr-2" asChild>
                <Link to="/admin-dashboard">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin
                </Link>
              </Button>
            )}
            {currentUser ? (
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard">
                  <User className="h-4 w-4 mr-2" />
                  My Dashboard
                </Link>
              </Button>
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
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="px-4 py-2 hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {currentUser && (
              <Link 
                to="/dashboard" 
                className="px-4 py-2 hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                My Dashboard
              </Link>
            )}
            <Link 
              to="/practice" 
              className="px-4 py-2 hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Practice
            </Link>
            <Link 
              to="/community" 
              className="px-4 py-2 hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Link 
              to="/resources" 
              className="px-4 py-2 hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            {isAdmin && (
              <Link 
                to="/admin-dashboard" 
                className="px-4 py-2 hover:bg-accent rounded-md transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin Dashboard
              </Link>
            )}
            <div className="flex flex-col space-y-2">
              {currentUser ? (
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <User className="h-4 w-4 mr-2" />
                    My Dashboard
                  </Link>
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
