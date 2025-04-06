
import React from 'react';
import { Button } from "@/components/ui/button";
import { Facebook, Google } from "lucide-react";

interface OAuthButtonsProps {
  onOAuthLogin: (provider: 'google' | 'facebook') => void;
  isLoading: boolean;
  className?: string;
}

const OAuthButtons: React.FC<OAuthButtonsProps> = ({ 
  onOAuthLogin, 
  isLoading,
  className = ""
}) => {
  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => onOAuthLogin('google')}
        className="flex items-center justify-center gap-2"
      >
        <Google className="h-4 w-4 text-red-500" />
        <span>Google</span>
      </Button>
      
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => onOAuthLogin('facebook')}
        className="flex items-center justify-center gap-2"
      >
        <Facebook className="h-4 w-4 text-blue-600" />
        <span>Facebook</span>
      </Button>
    </div>
  );
};

export default OAuthButtons;
