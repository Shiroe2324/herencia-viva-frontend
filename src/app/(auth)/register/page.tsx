'use client';

import { toast } from '@heroui/react';
import { useEffect, useRef } from 'react';

import RegisterForm from '@/components/auth/RegisterForm';
import RegisterSidePanel from '@/components/auth/RegisterSidePanel';
import VerificationPendingModal from '@/components/VerificationPendingModal';
import { useRegisterForm } from '@/hooks/useRegisterForm';

export default function RegisterPage() {
  const { form, set, error, fieldErrors, loading, showVerificationModal, registeredEmail, handleSubmit } = useRegisterForm();

  const hasNotifiedRef = useRef(false);

  useEffect(() => {
    if (showVerificationModal && !hasNotifiedRef.current) {
      hasNotifiedRef.current = true;
      toast.success('¡Cuenta creada!', { description: 'Revisa tu correo para verificar tu cuenta.' });
    }
  }, [showVerificationModal]);

  return (
    <div className='flex min-h-screen'>
      <RegisterSidePanel />
      <RegisterForm form={form} set={set} error={error} fieldErrors={fieldErrors} loading={loading} onSubmit={handleSubmit} />
      {showVerificationModal && <VerificationPendingModal email={registeredEmail} />}
    </div>
  );
}
