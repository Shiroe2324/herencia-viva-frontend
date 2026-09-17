'use client';

import { toast } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SubmitEvent } from 'react';

import LoginForm from '@/components/auth/LoginForm';
import LoginSidePanel from '@/components/auth/LoginSidePanel';
import { useAuth } from '@/context/AuthContext';
import type { ValidationErrorResponse } from '@/lib/api/models';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ identifier: identifier.trim(), password });
      toast.success('¡Bienvenido de nuevo!', { description: 'Iniciaste sesión correctamente.' });
      router.replace('/chat');
    } catch (err) {
      const data = err as ValidationErrorResponse;
      setError(data?.message ?? 'Credenciales incorrectas. Verifica tu usuario y contraseña.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex min-h-screen'>
      <LoginSidePanel />
      <LoginForm
        identifier={identifier}
        password={password}
        error={error}
        loading={loading}
        onIdentifierChange={setIdentifier}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
