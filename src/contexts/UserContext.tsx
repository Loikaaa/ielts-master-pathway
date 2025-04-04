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
  isAdmin?: boolean; 
  ipAddress?: string;
  lastLogin?: Date;
}

interface UserContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'created'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  setUserAsAdmin: (userId: string) => void;
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

const ADMIN_EMAILS = ['admin@neplia.com', 'hhjkad@gmail.com'];

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

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
        
        const isUserAdmin = parsedUser?.isAdmin === true || ADMIN_EMAILS.includes(parsedUser?.email);
        console.log('User admin status:', isUserAdmin, 'Email:', parsedUser?.email);
        setIsAdmin(isUserAdmin);
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('neplia_users', JSON.stringify(users));
    }
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('neplia_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('neplia_current_user');
    }
  }, [currentUser]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const storedUsers = localStorage.getItem('neplia_users');
      if (!storedUsers) return false;
      
      const users: (User & { password: string })[] = JSON.parse(storedUsers);
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const ipAddress = await fetchUserIP();
        
        const updatedUser = {
          ...user,
          ipAddress,
          lastLogin: new Date()
        };
        
        const updatedUsers = users.map(u => 
          u.id === updatedUser.id 
            ? { ...u, ipAddress, lastLogin: new Date() } 
            : u
        );
        setUsers(updatedUsers);
        localStorage.setItem('neplia_users', JSON.stringify(updatedUsers));
        
        const { password, ...userWithoutPassword } = updatedUser;
        setCurrentUser(userWithoutPassword);
        
        const isUserAdmin = user.isAdmin === true || ADMIN_EMAILS.includes(email);
        console.log('Login successful, admin status:', isUserAdmin, 'Email:', email, 'IP:', ipAddress);
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
      const existingUser = users.find(u => u.email === userData.email);
      if (existingUser) {
        console.error('User with this email already exists');
        return false;
      }

      const ipAddress = await fetchUserIP();

      const isUserAdmin = userData.isAdmin === true || ADMIN_EMAILS.includes(userData.email);

      const newUser: User & { password: string } = {
        ...userData,
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        created: new Date(),
        lastLogin: new Date(),
        ipAddress,
        isAdmin: isUserAdmin
      };

      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      
      const { password, ...userWithoutPassword } = newUser;
      setCurrentUser(userWithoutPassword);
      
      console.log('Signup successful, admin status:', isUserAdmin, 'Email:', userData.email, 'IP:', ipAddress);
      setIsAdmin(isUserAdmin);
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const fetchUserIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error fetching IP address:', error);
      return 'Unknown';
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    localStorage.removeItem('neplia_current_user');
  };

  const setUserAsAdmin = (userId: string) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, isAdmin: true };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
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
