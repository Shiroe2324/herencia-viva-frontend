'use client';

import { Spinner } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import StatusScreen from '@/components/ui/StatusScreen';
import { setSession } from '@/lib/auth';

export interface JwtPayload {
  sub?: string;
  exp?: number;
}

function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    return JSON.parse(atob(padded)) as JwtPayload;
  } catch {
    return null;
  }
}

function getExpiresInSeconds(token: string): number {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return 0;
  return Math.max(Math.floor(payload.exp - Date.now() / 1000), 0);
}

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (!accessToken || !refreshToken) {
      setError('No se recibieron los tokens de Google.');
      return;
    }

    const accessPayload = decodeJwtPayload(accessToken);
    const identifier = accessPayload?.sub;

    if (!identifier) {
      setError('No se pudo identificar la cuenta de Google.');
      return;
    }

    const accessExpiresIn = getExpiresInSeconds(accessToken);
    const refreshExpiresIn = getExpiresInSeconds(refreshToken);

    setSession({ accessToken, refreshToken, accessExpiresIn, refreshExpiresIn }, identifier);
    router.replace('/chat');
  }, [router, searchParams]);

  return (
    <div className='bg-background flex min-h-screen items-center justify-center px-6'>
      <div className='w-full max-w-md'>
        {!error ? (
          <StatusScreen
            icon={<Spinner size='lg' />}
            iconBoxClassName='bg-accent/10 border-accent/20 rounded-2xl border'
            title='Procesando inicio con Google'
            description='Estamos finalizando tu sesión y llevándote al chat…'
          />
        ) : (
          <StatusScreen
            icon={<span className='text-danger text-2xl font-bold'>!</span>}
            iconBoxClassName='bg-danger/10 border-danger/20 rounded-2xl border'
            title='Error de Google'
            description={error}
          />
        )}
      </div>
    </div>
  );
}
