
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { LoginLog } from '@/types/loginLog';
import { directorates } from '@/types/directorate';

// Mock users for demonstration purposes
const MOCK_USERS = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'staff', password: 'staff123', role: 'staff' },
  // Add directorate users automatically from the directorates array
  ...directorates.map(dir => ({
    username: dir.username,
    password: dir.password,
    role: 'directorate',
    directorateId: dir.id
  }))
];

interface User {
  username: string;
  role: string;
  directorateId?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
  isDirectorate: () => boolean;
  getCurrentDirectorate: () => string | null;
  loginLogs: LoginLog[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginLogs, setLoginLogs] = useState<LoginLog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Stored user check
    const storedUser = localStorage.getItem('user');
    const storedLogs = localStorage.getItem('loginLogs');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedLogs) {
      setLoginLogs(JSON.parse(storedLogs));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = MOCK_USERS.find(
        user => user.username === username && user.password === password
      );

      if (foundUser) {
        const userData: User = { 
          username: foundUser.username, 
          role: foundUser.role
        };
        
        // Only add directorateId if it exists in the found user
        if ('directorateId' in foundUser) {
          userData.directorateId = foundUser.directorateId;
        }
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Yeni giriş kaydı oluştur
        const newLog: LoginLog = {
          id: loginLogs.length + 1,
          username: foundUser.username,
          loginDate: new Date(),
          role: foundUser.role
        };
        
        const updatedLogs = [...loginLogs, newLog];
        setLoginLogs(updatedLogs);
        localStorage.setItem('loginLogs', JSON.stringify(updatedLogs));
        
        toast.success(`Hoş geldiniz, ${foundUser.username}!`);
        navigate('/dashboard');
      } else {
        throw new Error('Geçersiz kullanıcı adı veya şifre');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Giriş başarısız');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('loginLogs');
    toast.info('You have been logged out');
    navigate('/login');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };
  
  const isDirectorate = () => {
    return user?.role === 'directorate';
  };
  
  const getCurrentDirectorate = () => {
    if (user?.role === 'directorate') {
      return user.username;
    }
    return null;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        logout, 
        isAdmin,
        isDirectorate,
        getCurrentDirectorate,
        loginLogs 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
