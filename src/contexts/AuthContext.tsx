import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import authApi from '../services/authApi';
import {
  setCookie,
  getCookie,
  removeCookie,
  clearAllCookies,
} from '../utils/cookies';
import { TYPE_COOKIE } from '../utils/constants';
import usersApi from '../services/usersApi';
import { store } from '../store/configureStore';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

// Default context value
const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {
    throw new Error('AuthProvider not initialized');
  },
  logout: async () => {
    throw new Error('AuthProvider not initialized');
  },
  checkAuthStatus: async () => {
    throw new Error('AuthProvider not initialized');
  },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const token = getCookie(TYPE_COOKIE.TOKEN);
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      // Kiểm tra token có hợp lệ không
      const isValid = await usersApi.getCurrentUser();
      if (isValid) {
        // Lấy thông tin user từ localStorage
        const userInfo = localStorage.getItem('user');
        if (userInfo) {
          setUser(JSON.parse(userInfo));
          setIsAuthenticated(true);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });

      // Lưu token vào cookie
      setCookie(TYPE_COOKIE.TOKEN, response.item.token, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: 7, // 7 ngày
      });

      // Lưu thông tin user vào localStorage
      localStorage.setItem('user', JSON.stringify(response.item.user));

      // Cập nhật state
      setUser(response.item.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Gọi API logout để thông báo cho server
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // 🧹 COMPREHENSIVE LOGOUT - Xóa tất cả dữ liệu người dùng

      // 1. Xóa tất cả cookies
      clearAllCookies();

      // 2. Xóa token cụ thể
      removeCookie(TYPE_COOKIE.TOKEN);

      // 3. Xóa tất cả dữ liệu từ localStorage
      localStorage.clear();

      // 4. Xóa tất cả dữ liệu từ sessionStorage
      sessionStorage.clear();

      // 5. Reset Redux store state
      store.dispatch({ type: 'RESET_STATE' });

      // 6. Cập nhật state
      setUser(null);
      setIsAuthenticated(false);

      // 7. Clear any other stored data - Xóa các key cụ thể nếu có
      const keysToRemove = [
        'user',
        'authToken',
        'refreshToken',
        'userPreferences',
        'theme',
        'language',
        'redirectUrl',
        'lastVisitedPage',
      ];

      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      });
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  return context;
};
