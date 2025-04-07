
import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  // You'll replace this with your Laravel backend URL when it's deployed
  // For local development, typical Laravel URLs are http://localhost:8000 or http://127.0.0.1:8000
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Example auth services that will connect to Laravel Sanctum
export const authService = {
  login: async (email: string, password: string) => {
    try {
      // Laravel Sanctum typically uses /login endpoint
      const response = await api.post('/login', { email, password });
      
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        return response.data.user;
      }
      return null;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  logout: async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Even if API call fails, remove token
      localStorage.removeItem('auth_token');
    }
  },
  
  register: async (userData: any) => {
    try {
      const response = await api.post('/register', userData);
      
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        return response.data.user;
      }
      return null;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
};

// Example user services
export const userService = {
  getCurrentUser: async () => {
    try {
      // Laravel often uses /user endpoint to get the authenticated user
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  },
  
  updateProfile: async (userData: any) => {
    try {
      const response = await api.put('/user/profile', userData);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
};

// Export the axios instance for other API calls
export default api;
