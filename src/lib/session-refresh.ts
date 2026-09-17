import type { TokenRefreshResponse } from '@/lib/api/models';
import { clearSession, getRefreshToken, getUserIdentifier, isRefreshTokenExpired, setSession } from '@/lib/auth';
import { API_BASE_URL } from '@/lib/env';

let inFlight: Promise<TokenRefreshResponse | null> | null = null;

export function refreshSession(): Promise<TokenRefreshResponse | null> {
  if (!inFlight) inFlight = performRefresh().finally(() => (inFlight = null));
  return inFlight;
}

async function performRefresh(): Promise<TokenRefreshResponse | null> {
  const currentRefreshToken = getRefreshToken();
  const identifier = getUserIdentifier();

  if (!currentRefreshToken || !identifier || isRefreshTokenExpired()) {
    clearSession();
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: currentRefreshToken }),
    });

    if (!response.ok) {
      clearSession();
      return null;
    }

    const tokens = (await response.json()) as TokenRefreshResponse;
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;
    const accessExpiresIn = tokens.access_expires_in;
    const refreshExpiresIn = tokens.refresh_expires_in;
    setSession({ accessToken, refreshToken, accessExpiresIn, refreshExpiresIn }, identifier);

    return tokens;
  } catch {
    clearSession();
    return null;
  }
}
