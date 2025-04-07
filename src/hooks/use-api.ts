
import { useState } from 'react';
import api, { authService, userService } from '../services/apiService';

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generic request function
  const request = async <T,>(
    apiCall: () => Promise<T>
  ): Promise<{ data: T | null; error: string | null }> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      return { data: result, error: null };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    request,
    api,
    auth: authService,
    user: userService,
  };
};
