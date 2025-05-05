import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../api/auth';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
      
      // Redirect to appropriate dashboard based on role
      if (storedUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user/dashboard');
      }
    }
    setIsLoading(false);
  }, [navigate]);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      console.log('Login response:', response); // Debug log

      if (response && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        
        // Redirect based on role
        if (response.user.role === 'admin') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/user/dashboard', { replace: true });
        }
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await authService.register(username, email, password);
      console.log('Registration response:', response); // Debug log

      if (response && response.token) {
        // Store the token and user data
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        
        // Redirect to dashboard
        navigate('/user/dashboard', { replace: true });
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error);
      throw error; // Throw the error to be handled by the Register component
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 