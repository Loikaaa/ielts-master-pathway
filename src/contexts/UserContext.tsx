
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
  country?: string;
  countryCode?: string;
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
  createUser: (userData: Omit<User, 'id' | 'created'> & { password: string }) => Promise<boolean>;
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  users: [],
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  isAdmin: false,
  setUserAsAdmin: () => {},
  createUser: async () => false,
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
        const ipInfo = await fetchUserIPInfo();
        
        const updatedUser = {
          ...user,
          ipAddress: ipInfo.ip,
          country: ipInfo.country,
          countryCode: ipInfo.countryCode,
          lastLogin: new Date()
        };
        
        const updatedUsers = users.map(u => 
          u.id === updatedUser.id 
            ? { ...u, ipAddress: ipInfo.ip, country: ipInfo.country, countryCode: ipInfo.countryCode, lastLogin: new Date() } 
            : u
        );
        setUsers(updatedUsers);
        localStorage.setItem('neplia_users', JSON.stringify(updatedUsers));
        
        const { password, ...userWithoutPassword } = updatedUser;
        setCurrentUser(userWithoutPassword);
        
        const isUserAdmin = user.isAdmin === true || ADMIN_EMAILS.includes(email);
        console.log('Login successful, admin status:', isUserAdmin, 'Email:', email, 'IP:', ipInfo.ip, 'Country:', ipInfo.country);
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

      const ipInfo = await fetchUserIPInfo();
      const isUserAdmin = userData.isAdmin === true || ADMIN_EMAILS.includes(userData.email);

      const newUser: User & { password: string } = {
        ...userData,
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        created: new Date(),
        lastLogin: new Date(),
        ipAddress: ipInfo.ip,
        country: ipInfo.country || userData.country,
        countryCode: ipInfo.countryCode || userData.countryCode,
        isAdmin: isUserAdmin
      };

      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      
      const { password, ...userWithoutPassword } = newUser;
      setCurrentUser(userWithoutPassword);
      
      console.log('Signup successful, admin status:', isUserAdmin, 'Email:', userData.email, 'IP:', ipInfo.ip);
      setIsAdmin(isUserAdmin);
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const fetchUserIPInfo = async (): Promise<{ ip: string, country: string, countryCode: string }> => {
    try {
      // First try to get detailed info
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      if (data && data.ip) {
        return {
          ip: data.ip,
          country: data.country_name || 'Unknown',
          countryCode: data.country_code || 'UN'
        };
      }
      
      // Fallback to just getting the IP
      const ipOnlyResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipOnlyResponse.json();
      
      return {
        ip: ipData.ip || 'Unknown',
        country: 'Unknown',
        countryCode: 'UN'
      };
    } catch (error) {
      console.error('Error fetching IP information:', error);
      return {
        ip: 'Unknown',
        country: 'Unknown',
        countryCode: 'UN'
      };
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

  const createUser = async (userData: Omit<User, 'id' | 'created'> & { password: string }): Promise<boolean> => {
    try {
      const existingUser = users.find(u => u.email === userData.email);
      if (existingUser) {
        console.error('User with this email already exists');
        return false;
      }

      const ipInfo = { 
        ip: 'Admin created', 
        country: userData.country || 'Unknown', 
        countryCode: userData.countryCode || 'UN' 
      };

      const isUserAdmin = userData.isAdmin === true || ADMIN_EMAILS.includes(userData.email);

      const newUser: User & { password: string } = {
        ...userData,
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        created: new Date(),
        lastLogin: null,
        ipAddress: ipInfo.ip,
        country: ipInfo.country,
        countryCode: ipInfo.countryCode,
        isAdmin: isUserAdmin
      };

      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      
      console.log('Admin created user, admin status:', isUserAdmin, 'Email:', userData.email);
      
      return true;
    } catch (error) {
      console.error('Create user error:', error);
      return false;
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
      setUserAsAdmin,
      createUser
    }}>
      {children}
    </UserContext.Provider>
  );
};
