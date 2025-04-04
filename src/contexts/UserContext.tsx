
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  testType: string;
  targetScore: string;
  examDate: string;
  created: Date;
  isAdmin?: boolean; // Added isAdmin property to User interface
}

interface UserContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'created'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  setUserAsAdmin: (userId: string) => void; // Add method to set a user as admin
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  users: [],
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  isAdmin: false,
  setUserAsAdmin: () => {},
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

// List of admin emails for initial setup
const ADMIN_EMAILS = ['admin@neplia.com', 'hhjkad@gmail.com'];

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load users and current user from localStorage on component mount
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem('neplia_users');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
      
      const storedCurrentUser = localStorage.getItem('neplia_current_user');
      if (storedCurrentUser) {
        const parsedUser = JSON.parse(storedCurrentUser);
        setCurrentUser(parsedUser);
        
        // Check if user is admin either by isAdmin flag or by email inclusion in ADMIN_EMAILS
        const isUserAdmin = parsedUser?.isAdmin === true || ADMIN_EMAILS.includes(parsedUser?.email);
        console.log('User admin status:', isUserAdmin, 'Email:', parsedUser?.email);
        setIsAdmin(isUserAdmin);
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('neplia_users', JSON.stringify(users));
    }
  }, [users]);

  // Save current user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('neplia_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('neplia_current_user');
    }
  }, [currentUser]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple login implementation using localStorage
    try {
      const storedUsers = localStorage.getItem('neplia_users');
      if (!storedUsers) return false;
      
      const users: (User & { password: string })[] = JSON.parse(storedUsers);
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password, ...userWithoutPassword } = user;
        setCurrentUser(userWithoutPassword);
        
        // Check if the user is an admin based on isAdmin flag or email
        const isUserAdmin = user.isAdmin === true || ADMIN_EMAILS.includes(email);
        console.log('Login successful, admin status:', isUserAdmin, 'Email:', email);
        setIsAdmin(isUserAdmin);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (userData: Omit<User, 'id' | 'created'> & { password: string }): Promise<boolean> => {
    try {
      // Check if email already exists
      const existingUser = users.find(u => u.email === userData.email);
      if (existingUser) {
        console.error('User with this email already exists');
        return false;
      }

      // Check if this is a forced admin creation or email is in admin list
      const isUserAdmin = userData.isAdmin === true || ADMIN_EMAILS.includes(userData.email);

      // Create new user with id and creation date
      const newUser: User & { password: string } = {
        ...userData,
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        created: new Date(),
        isAdmin: isUserAdmin
      };

      // Add to users list
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      
      // Log in the new user (without password in the current user state)
      const { password, ...userWithoutPassword } = newUser;
      setCurrentUser(userWithoutPassword);
      
      console.log('Signup successful, admin status:', isUserAdmin, 'Email:', userData.email);
      setIsAdmin(isUserAdmin);
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    localStorage.removeItem('neplia_current_user');
  };

  // Function to set a user as admin
  const setUserAsAdmin = (userId: string) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, isAdmin: true };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    // If the current user is being set as admin, update their status
    if (currentUser && currentUser.id === userId) {
      setCurrentUser({ ...currentUser, isAdmin: true });
      setIsAdmin(true);
    }
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      users, 
      login, 
      signup, 
      logout, 
      isAdmin,
      setUserAsAdmin 
    }}>
      {children}
    </UserContext.Provider>
  );
};
