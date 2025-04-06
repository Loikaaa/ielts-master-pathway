
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { OAuthResponse, User } from '@/types/user';

interface UserContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  loginWithOAuth: (provider: 'google' | 'facebook') => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'created'> & { password: string }) => Promise<boolean>;
  signupWithOAuth: (provider: 'google' | 'facebook', country: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  setUserAsAdmin: (userId: string) => void;
  createUser: (userData: Omit<User, 'id' | 'created'> & { password: string }) => Promise<boolean>;
  updateAdminCredentials: (email: string, password: string) => boolean;
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  users: [],
  login: async () => false,
  loginWithOAuth: async () => false,
  signup: async () => false,
  signupWithOAuth: async () => false,
  logout: () => {},
  isAdmin: false,
  setUserAsAdmin: () => {},
  createUser: async () => false,
  updateAdminCredentials: () => false,
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

// List of admin emails - adding the new email
const ADMIN_EMAILS = ['admin@neplia.com', 'hhjkad@gmail.com', 'govindabohara726@gmail.com'];

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Initialize user data from localStorage
  useEffect(() => {
    try {
      // Load users from localStorage
      const storedUsers = localStorage.getItem('neplia_users');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      } else {
        // If no users exist, create an admin user
        console.log('No users found, creating default admin user');
        createDefaultAdminUser();
      }
      
      // Load current user from localStorage
      const storedCurrentUser = localStorage.getItem('neplia_current_user');
      if (storedCurrentUser) {
        const parsedUser = JSON.parse(storedCurrentUser);
        setCurrentUser(parsedUser);
        
        // Check if user is admin
        const isUserAdmin = parsedUser?.isAdmin === true || ADMIN_EMAILS.includes(parsedUser?.email);
        console.log('User admin status:', isUserAdmin, 'Email:', parsedUser?.email);
        setIsAdmin(isUserAdmin);
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  }, []);

  // Persist users to localStorage when they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('neplia_users', JSON.stringify(users));
    }
  }, [users]);

  // Persist current user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('neplia_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('neplia_current_user');
    }
  }, [currentUser]);
  
  // Create default admin user if no users exist
  const createDefaultAdminUser = () => {
    const adminUsers: User[] = [
      {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@neplia.com',
        password: 'admin123',
        testType: 'General',
        targetScore: '8.0',
        examDate: '2023-12-31',
        created: new Date().toISOString(),
        isAdmin: true,
        ipAddress: 'localhost',
        country: 'System',
        countryCode: 'SYS',
        lastLogin: new Date().toISOString(),
        role: 'admin', // Explicitly set role to admin
        joinDate: new Date().toISOString(),
      },
      {
        id: `user-${Date.now()+1}-${Math.random().toString(36).substr(2, 9)}`,
        firstName: 'Govinda',
        lastName: 'Bohara',
        email: 'govindabohara726@gmail.com',
        password: 'Neplia726@',
        testType: 'General',
        targetScore: '8.0',
        examDate: '2025-12-31',
        created: new Date().toISOString(),
        isAdmin: true,
        ipAddress: 'Default',
        country: 'Nepal',
        countryCode: 'NP',
        lastLogin: new Date().toISOString(),
        role: 'admin', // Explicitly set role to admin
        joinDate: new Date().toISOString(),
      }
    ];
    
    setUsers(adminUsers);
    localStorage.setItem('neplia_users', JSON.stringify(adminUsers));
    console.log('Default admin users created');
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('UserContext: Attempting login for:', email);
      const storedUsers = localStorage.getItem('neplia_users');
      if (!storedUsers) {
        console.log('UserContext: No users found in storage');
        return false;
      }
      
      const users: (User & { password: string })[] = JSON.parse(storedUsers);
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        console.log('UserContext: User found:', user.email);
        const ipInfo = await fetchUserIPInfo();
        
        const updatedUser: User = {
          ...user,
          ipAddress: ipInfo.ip,
          country: ipInfo.country,
          countryCode: ipInfo.countryCode,
          lastLogin: new Date().toISOString() // Convert Date to string
        };
        
        // Update user data in users array
        const updatedUsers = users.map(u => 
          u.id === updatedUser.id 
            ? { ...u, ipAddress: ipInfo.ip, country: ipInfo.country, countryCode: ipInfo.countryCode, lastLogin: new Date().toISOString() } 
            : u
        );
        setUsers(updatedUsers as User[]);
        localStorage.setItem('neplia_users', JSON.stringify(updatedUsers));
        
        // Remove password from user object before storing in state
        const { password, ...userWithoutPassword } = updatedUser;
        setCurrentUser(userWithoutPassword);
        
        // Check if user is admin
        const isUserAdmin = user.isAdmin === true || ADMIN_EMAILS.includes(email);
        console.log('UserContext: Login successful, admin status:', isUserAdmin);
        setIsAdmin(isUserAdmin);
        
        return true;
      }
      
      console.log('UserContext: Invalid credentials');
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
        created: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
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
      if (!response.ok) {
        throw new Error('Failed to fetch IP info');
      }
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
      if (!ipOnlyResponse.ok) {
        throw new Error('Failed to fetch IP');
      }
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
        return { ...user, isAdmin: true, role: 'admin' as const };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    if (currentUser && currentUser.id === userId) {
      setCurrentUser({ ...currentUser, isAdmin: true, role: 'admin' as const });
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
      const role = userData.role || (isUserAdmin ? 'admin' : 'student') as 'admin' | 'student' | 'teacher';

      const newUser: User & { password: string } = {
        ...userData,
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        created: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        ipAddress: ipInfo.ip,
        country: ipInfo.country,
        countryCode: ipInfo.countryCode,
        isAdmin: isUserAdmin,
        role: role
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

  const updateAdminCredentials = (email: string, password: string): boolean => {
    try {
      // Find admin user to update
      const updatedUsers = users.map(user => {
        if (user.email === 'govindabohara726@gmail.com') {
          // Add password to the existing user object
          return { ...user, email, password };
        }
        return user;
      });
      
      setUsers(updatedUsers);
      localStorage.setItem('neplia_users', JSON.stringify(updatedUsers));
      
      // If the current user is the admin being updated, update their session too
      if (currentUser && currentUser.email === 'govindabohara726@gmail.com') {
        const updatedCurrentUser = { 
          ...currentUser, 
          email 
        };
        setCurrentUser(updatedCurrentUser);
      }
      
      // Update admin emails list if needed
      if (email !== 'govindabohara726@gmail.com' && !ADMIN_EMAILS.includes(email)) {
        ADMIN_EMAILS.push(email);
      }
      
      return true;
    } catch (error) {
      console.error('Error updating admin credentials:', error);
      return false;
    }
  };

  const simulateOAuthResponse = async (provider: 'google' | 'facebook'): Promise<OAuthResponse> => {
    // In a real implementation, this would come from the OAuth provider
    const randomId = `${provider}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Generate pseudo-random user data for demo purposes
    const names = provider === 'google' 
      ? [['James', 'Smith'], ['Mary', 'Johnson'], ['Robert', 'Williams'], ['Patricia', 'Brown']]
      : [['Michael', 'Jones'], ['Linda', 'Garcia'], ['William', 'Miller'], ['Elizabeth', 'Davis']];
    
    const randomNameIndex = Math.floor(Math.random() * names.length);
    const [firstName, lastName] = names[randomNameIndex];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${provider === 'google' ? 'gmail.com' : 'facebook.com'}`;
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      provider,
      id: randomId,
      email,
      firstName,
      lastName,
      profileImage: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`
    };
  };

  const loginWithOAuth = async (provider: 'google' | 'facebook'): Promise<boolean> => {
    try {
      console.log(`UserContext: Attempting ${provider} login`);
      
      // Simulate OAuth response from provider
      const oauthResponse = await simulateOAuthResponse(provider);
      
      // Check if user with this OAuth ID exists
      const storedUsers = localStorage.getItem('neplia_users');
      if (!storedUsers) {
        console.log('UserContext: No users found in storage');
        return false;
      }
      
      const users: User[] = JSON.parse(storedUsers);
      const user = users.find(u => 
        (u.oauthProvider === provider && u.oauthId === oauthResponse.id) || 
        u.email === oauthResponse.email
      );
      
      if (user) {
        console.log('UserContext: OAuth user found:', user.email);
        const ipInfo = await fetchUserIPInfo();
        
        const updatedUser: User = {
          ...user,
          ipAddress: ipInfo.ip,
          country: ipInfo.country,
          countryCode: ipInfo.countryCode,
          lastLogin: new Date().toISOString(),
          // If user was found by email but not OAuth (merged account)
          oauthProvider: user.oauthProvider || provider,
          oauthId: user.oauthId || oauthResponse.id
        };
        
        // Update user data in users array
        const updatedUsers = users.map(u => 
          u.id === updatedUser.id ? updatedUser : u
        );
        setUsers(updatedUsers);
        localStorage.setItem('neplia_users', JSON.stringify(updatedUsers));
        
        setCurrentUser(updatedUser);
        
        // Check if user is admin
        const isUserAdmin = user.isAdmin === true || ADMIN_EMAILS.includes(user.email);
        console.log('UserContext: Login successful, admin status:', isUserAdmin);
        setIsAdmin(isUserAdmin);
        
        return true;
      }
      
      console.log('UserContext: No matching OAuth user found');
      return false;
    } catch (error) {
      console.error('OAuth login error:', error);
      return false;
    }
  };

  const signupWithOAuth = async (provider: 'google' | 'facebook', country: string): Promise<boolean> => {
    try {
      // Simulate OAuth response from provider
      const oauthResponse = await simulateOAuthResponse(provider);
      
      // Check if user already exists
      const storedUsers = localStorage.getItem('neplia_users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      
      const existingUser = users.find(u => 
        (u.oauthProvider === provider && u.oauthId === oauthResponse.id) || 
        u.email === oauthResponse.email
      );
      
      if (existingUser) {
        console.log('OAuth user already exists');
        return false;
      }
      
      const ipInfo = await fetchUserIPInfo();
      const isUserAdmin = ADMIN_EMAILS.includes(oauthResponse.email);
      
      const newUser: User = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        email: oauthResponse.email,
        firstName: oauthResponse.firstName || '',
        lastName: oauthResponse.lastName || '',
        role: isUserAdmin ? 'admin' : 'student',
        profileImage: oauthResponse.profileImage,
        joinDate: new Date().toISOString(),
        created: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        oauthProvider: provider,
        oauthId: oauthResponse.id,
        ipAddress: ipInfo.ip,
        country: ipInfo.country || country,
        countryCode: ipInfo.countryCode,
        isAdmin: isUserAdmin,
        testType: 'General',
        targetScore: '7.0',
        examDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
      
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('neplia_users', JSON.stringify(updatedUsers));
      
      setCurrentUser(newUser);
      setIsAdmin(isUserAdmin);
      
      console.log('OAuth signup successful, admin status:', isUserAdmin, 'Email:', oauthResponse.email);
      
      return true;
    } catch (error) {
      console.error('OAuth signup error:', error);
      return false;
    }
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      users, 
      login, 
      loginWithOAuth,
      signup, 
      signupWithOAuth,
      logout, 
      isAdmin,
      setUserAsAdmin,
      createUser,
      updateAdminCredentials
    }}>
      {children}
    </UserContext.Provider>
  );
};
