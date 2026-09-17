import { getAccessToken } from '@/lib/auth';
import { API_BASE_URL, API_LANG } from '@/lib/env';
import { refreshSession } from '@/lib/session-refresh';

const AUTH_PAGE_PREFIXES = ['/login', '/register'];

type CustomFetchOptions = RequestInit & { _retry?: boolean };

function redirectToLoginIfNeeded(): void {
  if (typeof window === 'undefined') return;
  const isAuthPage = AUTH_PAGE_PREFIXES.some((prefix) => window.location.pathname.startsWith(prefix));
  if (!isAuthPage) window.location.href = '/login';
}

async function performFetch<T>(url: string, options: CustomFetchOptions): Promise<T> {
  const token = getAccessToken();

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-lang': API_LANG,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  const body = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (response.status === 401 && !options._retry && !url.startsWith('/auth/refresh')) {
      const refreshed = await refreshSession();
      if (refreshed) {
        return performFetch<T>(url, { ...options, _retry: true });
      }
      redirectToLoginIfNeeded();
    }

    throw body;
  }

  return { status: response.status, data: body, headers: response.headers } as T;
}

export const customFetch = <T>(url: string, options: RequestInit = {}): Promise<T> => performFetch<T>(url, options);

export default customFetch;
