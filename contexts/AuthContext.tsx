import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authApi, AuthUser } from '@/services/auth';
import { api } from '@/services/api';
import { storage, StorageKeys } from '@/services/storage';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (phoneNumber: string, pin: string) => Promise<void>;
  register: (phoneNumber: string, fullName: string, pin: string) => Promise<void>;
  requestOtp: (phoneNumber: string) => Promise<void>;
  verifyOtp: (phoneNumber: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    try {
      const [token, userData] = await Promise.all([
        storage.get(StorageKeys.AUTH_TOKEN),
        storage.get(StorageKeys.USER_DATA),
      ]);

      if (token && userData) {
        const user = JSON.parse(userData) as AuthUser;
        api.setToken(token);
        setState({ user, token, isLoading: false, isAuthenticated: true });
        return;
      }
    } catch {
      // stored data invalid — user stays logged out
    }
    setState({ user: null, token: null, isLoading: false, isAuthenticated: false });
  }

  async function saveSession(token: string, user: AuthUser) {
    await Promise.all([
      storage.set(StorageKeys.AUTH_TOKEN, token),
      storage.set(StorageKeys.USER_DATA, JSON.stringify(user)),
    ]);
    api.setToken(token);
    setState({ user, token, isLoading: false, isAuthenticated: true });
  }

  async function clearSession() {
    await Promise.all([
      storage.remove(StorageKeys.AUTH_TOKEN),
      storage.remove(StorageKeys.USER_DATA),
    ]);
    api.setToken(null);
    setState({ user: null, token: null, isLoading: false, isAuthenticated: false });
  }

  const login = useCallback(async (phoneNumber: string, pin: string) => {
    const response = await authApi.login({ phoneNumber, pin });
    await saveSession(response.token, response.user);
  }, []);

  const register = useCallback(async (phoneNumber: string, fullName: string, pin: string) => {
    const response = await authApi.register({ phoneNumber, fullName, pin });
    await saveSession(response.token, response.user);
  }, []);

  const requestOtp = useCallback(async (phoneNumber: string) => {
    await authApi.requestOtp({ phoneNumber });
  }, []);

  const verifyOtp = useCallback(async (phoneNumber: string, otp: string) => {
    const response = await authApi.verifyOtp({ phoneNumber, otp });
    await saveSession(response.token, response.user);
  }, []);

  const logout = useCallback(async () => {
    await clearSession();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, requestOtp, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
