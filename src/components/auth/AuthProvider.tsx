'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import {
  useLazyGetMeQuery,
  useLogoutMutation,
  useRefreshMutation,
} from '@/lib/api/auth';
import { useAppSelector } from '@/store/hooks';
import type { AuthUser, UserRole } from '@/types/api';

type AuthStatus = 'unknown' | 'authenticated' | 'guest';

interface AuthContextValue {
  user: AuthUser | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasRole: (...roles: UserRole[]) => boolean;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, status } = useAppSelector((s) => s.auth);

  // Lazy query — nothing fires until we call the trigger. This avoids
  // RTK Query's internal Date.now() being evaluated during prerender.
  const [triggerGetMe, { isLoading: isMeLoading }] = useLazyGetMeQuery();

  const [logoutMutation] = useLogoutMutation();
  const [refreshMutation] = useRefreshMutation();

  // Fire the session check once, on client mount.
  useEffect(() => {
    triggerGetMe();
  }, [triggerGetMe]);

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } catch {
    }
    router.push('/');
  }, [logoutMutation, router]);

  const refresh = useCallback(async () => {
    try {
      await refreshMutation().unwrap();
    } catch {
      // Silent — caller inspects useAuth() state.
    }
  }, [refreshMutation]);

  const hasRole = useCallback(
    (...roles: UserRole[]) => {
      if (!user) return false;
      return roles.includes(user.role);
    },
    [user],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      isAuthenticated: status === 'authenticated',
      isLoading: status === 'unknown' || isMeLoading,
      hasRole,
      logout,
      refresh,
    }),
    [user, status, isMeLoading, hasRole, logout, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}