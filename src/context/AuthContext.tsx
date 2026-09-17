'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { useLogin, useLogout } from '@/lib/api/endpoints/authentication-session/authentication-session';
import { getUser } from '@/lib/api/endpoints/users-core/users-core';
import type { CurrentUserProfile, LoginRequestBody } from '@/lib/api/models';
import {
  clearSession,
  getAccessTokenExpiresAt,
  getCachedUserProfile,
  getRefreshToken,
  getUserIdentifier,
  isAccessTokenExpired,
  isAuthenticated,
  isRefreshTokenExpired,
  setCachedUserProfile,
  setSession,
} from '@/lib/auth';
import { refreshSession } from '@/lib/session-refresh';

const ACCESS_REFRESH_SAFETY_WINDOW_MS = 30_000;

async function fetchProfile(identifier: string): Promise<CurrentUserProfile> {
  const response = await getUser(identifier);
  return response.data as CurrentUserProfile;
}

export interface AuthContextValue {
  user: CurrentUserProfile | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (data: LoginRequestBody) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CurrentUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  const clearRefreshTimer = useCallback(() => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
  }, []);

  const handleSessionRefresh = useCallback(async () => {
    const tokens = await refreshSession();
    if (!tokens) {
      setUser(null);
      clearRefreshTimer();
    }
    return tokens;
  }, [clearRefreshTimer]);

  const scheduleTokenRefresh = useCallback(
    (accessExpiresAt: number | null) => {
      clearRefreshTimer();
      if (!accessExpiresAt) return;

      const delay = Math.max(accessExpiresAt - Date.now() - ACCESS_REFRESH_SAFETY_WINDOW_MS, 0);
      refreshTimerRef.current = setTimeout(async () => {
        const refreshed = await handleSessionRefresh();
        if (refreshed) scheduleTokenRefresh(getAccessTokenExpiresAt());
      }, delay);
    },
    [clearRefreshTimer, handleSessionRefresh],
  );

  useEffect(() => {
    const cached = getCachedUserProfile();
    if (cached) setUser(cached);

    if (isAuthenticated()) {
      const identifier = getUserIdentifier();
      if (identifier) {
        const accessExpired = isAccessTokenExpired();
        const refreshExpired = isRefreshTokenExpired();

        const bootstrap = async () => {
          if (accessExpired) {
            if (refreshExpired) {
              clearSession();
              setUser(null);
              clearRefreshTimer();
              setIsLoading(false);
              return;
            }

            const refreshed = await handleSessionRefresh();
            if (!refreshed) {
              setIsLoading(false);
              return;
            }
          }

          try {
            const profile = await fetchProfile(identifier);
            setUser(profile);
            setCachedUserProfile(profile);
            scheduleTokenRefresh(getAccessTokenExpiresAt());
          } catch (error) {
            // Only a definitive 401 (token invalid even after the automatic refresh
            // attempt in customFetch) means the session itself is invalid. Transient
            // errors — e.g. rate limiting when the profile is fetched concurrently on
            // login — must not log the user out.
            if ((error as { statusCode?: number } | null)?.statusCode === 401) {
              clearSession();
              setUser(null);
              clearRefreshTimer();
            }
          } finally {
            setIsLoading(false);
          }
        };

        void bootstrap();
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
    return () => clearRefreshTimer();
  }, [clearRefreshTimer, handleSessionRefresh, scheduleTokenRefresh]);

  const login = useCallback(
    async (data: LoginRequestBody) => {
      clearRefreshTimer();
      const response = await loginMutation.mutateAsync({ data });
      if (response.status !== 200) {
        throw response.data;
      }

      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        access_expires_in: accessExpiresIn,
        refresh_expires_in: refreshExpiresIn,
      } = response.data;

      setSession({ accessToken, refreshToken, accessExpiresIn, refreshExpiresIn }, data.identifier);

      const profile = await fetchProfile(data.identifier);
      setCachedUserProfile(profile);
      setUser(profile);
      scheduleTokenRefresh(Date.now() + accessExpiresIn * 1000);
    },
    [clearRefreshTimer, loginMutation, scheduleTokenRefresh],
  );

  const logout = useCallback(async () => {
    const currentRefreshToken = getRefreshToken();
    if (currentRefreshToken) {
      try {
        await logoutMutation.mutateAsync({ data: { token: currentRefreshToken } });
      } catch {
        // Ignore logout errors — clear session regardless
      }
    }

    clearSession();
    setUser(null);
    clearRefreshTimer();
  }, [clearRefreshTimer, logoutMutation]);

  const refreshUser = useCallback(async () => {
    const identifier = getUserIdentifier();
    if (!identifier) return;
    const profile = await fetchProfile(identifier);
    setCachedUserProfile(profile);
    setUser(profile);
  }, []);

  return <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, login, logout, refreshUser }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
