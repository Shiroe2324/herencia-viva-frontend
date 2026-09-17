import { getGoogleLoginUrl } from '@/lib/api/endpoints/authentication-google/authentication-google';
import type { CurrentUserProfile } from '@/lib/api/models';
import { API_BASE_URL } from '@/lib/env';

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'hv_access_token',
  REFRESH_TOKEN: 'hv_refresh_token',
  ACCESS_TOKEN_EXPIRES_AT: 'hv_access_token_expires_at',
  REFRESH_TOKEN_EXPIRES_AT: 'hv_refresh_token_expires_at',
  USER_IDENTIFIER: 'hv_user_identifier',
  USER_PROFILE: 'hv_user_profile',
} as const;

export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
  accessExpiresIn: number;
  refreshExpiresIn: number;
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
}

export function getUserIdentifier(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.USER_IDENTIFIER);
}

export function getAccessTokenExpiresAt(): number | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN_EXPIRES_AT);
  return raw ? Number(raw) : null;
}

export function getRefreshTokenExpiresAt(): number | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN_EXPIRES_AT);
  return raw ? Number(raw) : null;
}

export function setSession(tokens: SessionTokens, identifier: string): void {
  const accessExpiresAt = Date.now() + tokens.accessExpiresIn * 1000;
  const refreshExpiresAt = Date.now() + tokens.refreshExpiresIn * 1000;

  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN_EXPIRES_AT, String(accessExpiresAt));
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN_EXPIRES_AT, String(refreshExpiresAt));
  localStorage.setItem(STORAGE_KEYS.USER_IDENTIFIER, identifier);

  const maxAgeSeconds = Math.max(tokens.refreshExpiresIn, 60);
  document.cookie = `hv_logged_in=1; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN_EXPIRES_AT);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN_EXPIRES_AT);
  localStorage.removeItem(STORAGE_KEYS.USER_IDENTIFIER);
  localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
  document.cookie = 'hv_logged_in=; path=/; max-age=0';
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

export function isAccessTokenExpired(): boolean {
  const expiresAt = getAccessTokenExpiresAt();
  return !expiresAt ? false : Date.now() >= expiresAt;
}

export function isRefreshTokenExpired(): boolean {
  const expiresAt = getRefreshTokenExpiresAt();
  return !expiresAt ? false : Date.now() >= expiresAt;
}

export function getCachedUserProfile(): CurrentUserProfile | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CurrentUserProfile;
  } catch {
    return null;
  }
}

export function setCachedUserProfile(profile: CurrentUserProfile): void {
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
}

export function startGoogleLogin(): void {
  if (typeof window === 'undefined') return;
  window.location.href = `${API_BASE_URL}${getGoogleLoginUrl()}`;
}
