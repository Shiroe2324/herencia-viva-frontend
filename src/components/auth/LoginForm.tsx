'use client';

import { Alert, Button, InputGroup, Label, Spinner, TextField } from '@heroui/react';
import Link from 'next/link';
import type { SubmitEvent } from 'react';
import { FaUser } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

import PasswordField from '@/components/ui/PasswordField';
import { startGoogleLogin } from '@/lib/auth';

export interface LoginFormProps {
  identifier: string;
  password: string;
  error: string | null;
  loading: boolean;
  onIdentifierChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
}

export default function LoginForm({ identifier, password, error, loading, onIdentifierChange, onPasswordChange, onSubmit }: LoginFormProps) {
  return (
    <div className='bg-background flex flex-1 flex-col items-center justify-center px-6 py-12'>
      <div className='w-full max-w-sm'>
        <div className='animate-fade-up'>
          <h1 className='font-display text-foreground mb-1 text-3xl'>Bienvenido</h1>
          <p className='text-muted font-body mb-8 text-sm'>Ingresa tu cuenta para continuar</p>
          <form onSubmit={onSubmit} noValidate className='space-y-4'>
            <TextField fullWidth className='animate-fade-up-delay-1' value={identifier} onChange={onIdentifierChange}>
              <Label className='text-xs tracking-widest uppercase'>Usuario o correo</Label>
              <InputGroup fullWidth>
                <InputGroup.Prefix>
                  <FaUser aria-hidden='true' className='text-muted' size={13} />
                </InputGroup.Prefix>
                <InputGroup.Input autoComplete='username' placeholder='usuario o correo@ejemplo.com' />
              </InputGroup>
            </TextField>

            <PasswordField
              autoComplete='current-password'
              className='animate-fade-up-delay-2'
              label='Contraseña'
              labelEndContent={
                <Link
                  href='/forgot-password'
                  className='text-accent hover:text-accent-hover font-body text-xs normal-case underline underline-offset-2 transition-colors'
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              }
              placeholder='••••••••'
              value={password}
              onChange={onPasswordChange}
            />

            {error && (
              <Alert className='animate-fade-in' status='danger'>
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Description className='text-xs leading-relaxed'>{error}</Alert.Description>
                </Alert.Content>
              </Alert>
            )}

            <div className='animate-fade-up-delay-3 pt-1'>
              <Button fullWidth isDisabled={!identifier || !password} isPending={loading} type='submit'>
                {({ isPending }) => (
                  <>
                    {isPending ? <Spinner color='current' size='sm' /> : null}
                    {isPending ? 'Iniciando sesión…' : 'Iniciar sesión'}
                  </>
                )}
              </Button>
            </div>

            <div className='animate-fade-up-delay-3'>
              <Button fullWidth variant='secondary' onPress={startGoogleLogin}>
                <FcGoogle aria-hidden='true' size={18} />
                Iniciar sesión con Google
              </Button>
            </div>
          </form>

          <p className='animate-fade-up-delay-4 text-muted font-body mt-6 text-center text-xs'>
            ¿No tienes cuenta?{' '}
            <Link href='/register' className='text-accent hover:text-accent-hover underline underline-offset-2 transition-colors'>
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
