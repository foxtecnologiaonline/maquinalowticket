'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { AuthUser } from './api';

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  /** True once the localStorage read on mount has completed — avoids a
   *  flash/redirect before we actually know if a session exists. */
  isHydrated: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);
const STORAGE_KEY = 'mlt_auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setToken(parsed.token);
        setUser(parsed.user);
      }
    } catch {
      // Corrupted or blocked storage — proceed unauthenticated.
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const login = (newToken: string, newUser: AuthUser) => {
    setToken(newToken);
    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: newToken, user: newUser }));
    } catch {
      // Session still works in memory for this tab even if storage is unavailable.
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return <AuthContext.Provider value={{ token, user, isHydrated, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

/** Redirects to /login once hydration confirms there is no session. */
export function useRequireAuth() {
  const { token, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !token) {
      router.replace('/login');
    }
  }, [isHydrated, token, router]);

  return { token, isHydrated };
}
