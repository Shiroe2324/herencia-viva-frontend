'use client';

import { Spinner } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaCircleCheck, FaCircleExclamation } from 'react-icons/fa6';

import LinkButton from '@/components/ui/LinkButton';
import StatusScreen from '@/components/ui/StatusScreen';
import { useVerifyEmail } from '@/lib/api/endpoints/authentication-registration/authentication-registration';
import type { ValidationErrorResponse } from '@/lib/api/models';

export type VerificationState = 'loading' | 'success' | 'error' | 'invalid-token';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [state, setState] = useState<VerificationState>('loading');
  const [error, setError] = useState<string | null>(null);

  const verifyEmailMutation = useVerifyEmail();

  useEffect(() => {
    if (!token) {
      setState('invalid-token');
      return;
    }

    const verify = async () => {
      try {
        await verifyEmailMutation.mutateAsync({ data: { token } });
        setState('success');
        setTimeout(() => router.push('/login?verified=1'), 3000);
      } catch (err) {
        const data = err as ValidationErrorResponse;
        setError(data?.message ?? 'Ocurrió un error al verificar tu correo. Inténtalo de nuevo.');
        setState('error');
      }
    };

    verify();
  }, [token, router]);

  return (
    <div className='bg-background relative flex min-h-screen items-center justify-center overflow-hidden p-4'>
      <div className='border-accent/8 absolute -top-16 -right-16 h-72 w-72 rounded-full border' />
      <div className='border-danger/8 absolute bottom-0 left-0 h-64 w-64 rounded-full border' />

      <div className='relative z-10 w-full max-w-md'>
        {state === 'loading' && (
          <StatusScreen
            icon={<Spinner size='lg' />}
            title='Verificando correo'
            description='Por favor espera mientras verificamos tu dirección de correo…'
          />
        )}

        {state === 'success' && (
          <StatusScreen
            icon={<FaCircleCheck size={32} className='text-emerald-500' aria-hidden='true' />}
            iconBoxClassName='rounded-2xl bg-emerald-500/10'
            title='¡Correo verificado!'
            description='Tu cuenta ha sido verificada exitosamente. Serás redirigido al inicio de sesión en unos momentos…'
          >
            <LinkButton fullWidth href='/login'>
              Ir al inicio de sesión
            </LinkButton>
          </StatusScreen>
        )}

        {state === 'error' && (
          <StatusScreen
            icon={<FaCircleExclamation size={32} className='text-danger' aria-hidden='true' />}
            iconBoxClassName='bg-danger/10 rounded-2xl'
            title='Error en la verificación'
            description={error}
          >
            <div className='space-y-3'>
              <LinkButton fullWidth href='/login'>
                Volver al inicio de sesión
              </LinkButton>

              <LinkButton fullWidth href='/register' variant='secondary'>
                Crear nueva cuenta
              </LinkButton>
            </div>

            <p className='text-muted font-body mt-6 text-center text-xs'>Si el problema persiste, contacta con soporte.</p>
          </StatusScreen>
        )}

        {state === 'invalid-token' && (
          <StatusScreen
            icon={<FaCircleExclamation size={32} className='text-danger' aria-hidden='true' />}
            iconBoxClassName='bg-danger/10 rounded-2xl'
            title='Token inválido'
            description='No se encontró un token de verificación válido. Por favor, verifica que el enlace sea correcto.'
          >
            <div className='space-y-3'>
              <LinkButton fullWidth href='/login'>
                Ir al inicio de sesión
              </LinkButton>

              <LinkButton fullWidth href='/register' variant='secondary'>
                Crear una cuenta
              </LinkButton>
            </div>
          </StatusScreen>
        )}
      </div>
    </div>
  );
}
