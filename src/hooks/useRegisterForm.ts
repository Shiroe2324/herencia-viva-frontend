'use client';

import { useState } from 'react';
import type { SubmitEvent } from 'react';

import { useRegisterUser } from '@/lib/api/endpoints/authentication-registration/authentication-registration';
import type { UserRegistrationRequestGender, ValidationErrorResponse } from '@/lib/api/models';

export interface RegisterFormState {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: string;
  age: string;
  username: string;
  display_name: string;
}

const INITIAL: RegisterFormState = {
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  gender: '',
  age: '',
  username: '',
  display_name: '',
};

function validate(form: RegisterFormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!form.email) errors.email = 'El correo es requerido.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Correo inválido.';
  if (!form.password) errors.password = 'La contraseña es requerida.';
  else if (form.password.length < 8) errors.password = 'Mínimo 8 caracteres.';
  if (form.password !== form.confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden.';
  if (!form.phone) errors.phone = 'El teléfono es requerido.';
  if (!form.gender) errors.gender = 'Selecciona un género.';
  if (!form.age) errors.age = 'La edad es requerida.';
  else if (Number(form.age) < 18 || Number(form.age) > 120) errors.age = 'Edad inválida.';
  return errors;
}

export function useRegisterForm() {
  const [form, setForm] = useState<RegisterFormState>(INITIAL);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const registerMutation = useRegisterUser();

  function set(field: keyof RegisterFormState) {
    return (value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setFieldErrors((prev) => ({ ...prev, [field]: '' }));
    };
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const errors = validate(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const trimmedEmail = form.email.trim();
      await registerMutation.mutateAsync({
        data: {
          email: trimmedEmail,
          password: form.password,
          phone: form.phone.trim(),
          gender: form.gender as UserRegistrationRequestGender,
          age: Number(form.age),
          ...(form.username ? { username: form.username.trim().toLowerCase() } : {}),
          ...(form.display_name ? { display_name: form.display_name.trim() } : {}),
        },
      });
      setRegisteredEmail(trimmedEmail);
      setShowVerificationModal(true);
    } catch (err) {
      const data = err as ValidationErrorResponse;
      if (data?.errors?.length) {
        const fe: Record<string, string> = {};
        data.errors.forEach((fieldError) => (fe[fieldError.field] = fieldError.message));
        setFieldErrors(fe);
      }
      setError(data?.message ?? 'Ocurrió un error al crear tu cuenta. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return { form, set, error, fieldErrors, loading, showVerificationModal, registeredEmail, handleSubmit };
}
