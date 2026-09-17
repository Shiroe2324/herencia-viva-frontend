'use client';

import { Alert, Button, FieldError, InputGroup, Label, ListBox, Select, Spinner, TextField } from '@heroui/react';
import Link from 'next/link';
import type { SubmitEvent } from 'react';
import { FaCalendarDays, FaEnvelope, FaIdCard, FaPhone, FaUser, FaVenusMars } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

import PasswordField from '@/components/ui/PasswordField';
import type { RegisterFormState } from '@/hooks/useRegisterForm';
import { startGoogleLogin } from '@/lib/auth';

const GENDER_OPTIONS = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Femenino' },
  { value: 'other', label: 'Otro' },
  { value: 'prefer_not_to_say', label: 'Prefiero no decir' },
];

export interface RegisterFormProps {
  form: RegisterFormState;
  set: (field: keyof RegisterFormState) => (value: string) => void;
  error: string | null;
  fieldErrors: Record<string, string>;
  loading: boolean;
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
}

export default function RegisterForm({ form, set, error, fieldErrors, loading, onSubmit }: RegisterFormProps) {
  return (
    <div className='bg-background flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-12'>
      <div className='w-full max-w-md'>
        <div className='animate-fade-up'>
          <h1 className='font-display text-foreground mb-1 text-3xl'>Crear cuenta</h1>
          <p className='text-muted font-body mb-8 text-sm'>Llena los datos para registrarte</p>

          <form onSubmit={onSubmit} noValidate className='space-y-4'>
            <TextField
              fullWidth
              className='animate-fade-up-delay-1'
              isInvalid={Boolean(fieldErrors.email)}
              isRequired
              type='email'
              value={form.email}
              onChange={set('email')}
            >
              <Label className='text-xs tracking-widest uppercase'>Correo electrónico</Label>
              <InputGroup fullWidth>
                <InputGroup.Prefix>
                  <FaEnvelope aria-hidden='true' className='text-muted' size={13} />
                </InputGroup.Prefix>
                <InputGroup.Input placeholder='correo@ejemplo.com' />
              </InputGroup>
              {fieldErrors.email ? <FieldError>{fieldErrors.email}</FieldError> : null}
            </TextField>

            <div className='animate-fade-up-delay-1 grid grid-cols-2 gap-3'>
              <TextField fullWidth isInvalid={Boolean(fieldErrors.username)} value={form.username} onChange={set('username')}>
                <Label className='text-xs tracking-widest uppercase'>Usuario</Label>
                <InputGroup fullWidth>
                  <InputGroup.Prefix>
                    <FaUser aria-hidden='true' className='text-muted' size={13} />
                  </InputGroup.Prefix>
                  <InputGroup.Input placeholder='agricultor123' />
                </InputGroup>
                {fieldErrors.username ? <FieldError>{fieldErrors.username}</FieldError> : null}
              </TextField>
              <TextField fullWidth isInvalid={Boolean(fieldErrors.display_name)} value={form.display_name} onChange={set('display_name')}>
                <Label className='text-xs tracking-widest uppercase'>Nombre visible</Label>
                <InputGroup fullWidth>
                  <InputGroup.Prefix>
                    <FaIdCard aria-hidden='true' className='text-muted' size={13} />
                  </InputGroup.Prefix>
                  <InputGroup.Input placeholder='Juan García' />
                </InputGroup>
                {fieldErrors.display_name ? <FieldError>{fieldErrors.display_name}</FieldError> : null}
              </TextField>
            </div>

            <PasswordField
              className='animate-fade-up-delay-2'
              description='La contraseña debe tener al menos 8 caracteres.'
              errorMessage={fieldErrors.password}
              isInvalid={Boolean(fieldErrors.password)}
              isRequired
              label='Contraseña'
              placeholder='Mínimo 8 caracteres'
              value={form.password}
              onChange={set('password')}
            />

            <PasswordField
              className='animate-fade-up-delay-2'
              errorMessage={fieldErrors.confirmPassword}
              isInvalid={Boolean(fieldErrors.confirmPassword)}
              isRequired
              label='Confirmar contraseña'
              placeholder='Repite tu contraseña'
              value={form.confirmPassword}
              onChange={set('confirmPassword')}
            />

            <TextField
              fullWidth
              className='animate-fade-up-delay-3'
              isInvalid={Boolean(fieldErrors.phone)}
              isRequired
              type='tel'
              value={form.phone}
              onChange={set('phone')}
            >
              <Label className='text-xs tracking-widest uppercase'>Teléfono (formato internacional)</Label>
              <InputGroup fullWidth>
                <InputGroup.Prefix>
                  <FaPhone aria-hidden='true' className='text-muted' size={13} />
                </InputGroup.Prefix>
                <InputGroup.Input placeholder='+57 300 000 0000' />
              </InputGroup>
              {fieldErrors.phone ? (
                <FieldError>{fieldErrors.phone}</FieldError>
              ) : (
                <p className='text-muted mt-1.5 text-xs'>Usa el formato internacional para facilitar el contacto.</p>
              )}
            </TextField>

            <div className='animate-fade-up-delay-3 grid grid-cols-2 gap-3'>
              <Select
                fullWidth
                isInvalid={Boolean(fieldErrors.gender)}
                isRequired
                placeholder='Seleccionar…'
                value={form.gender || null}
                onChange={(key) => set('gender')(key ? String(key) : '')}
              >
                <Label className='text-xs tracking-widest uppercase'>Género</Label>
                <Select.Trigger>
                  <FaVenusMars aria-hidden='true' className='text-muted' size={13} />
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {GENDER_OPTIONS.map((option) => (
                      <ListBox.Item key={option.value} id={option.value} textValue={option.label}>
                        {option.label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
                {fieldErrors.gender ? <FieldError>{fieldErrors.gender}</FieldError> : null}
              </Select>

              <TextField fullWidth isInvalid={Boolean(fieldErrors.age)} isRequired type='number' value={form.age} onChange={set('age')}>
                <Label className='text-xs tracking-widest uppercase'>Edad</Label>
                <InputGroup fullWidth>
                  <InputGroup.Prefix>
                    <FaCalendarDays aria-hidden='true' className='text-muted' size={13} />
                  </InputGroup.Prefix>
                  <InputGroup.Input max={120} min={18} placeholder='Ej: 35' type='number' />
                </InputGroup>
                {fieldErrors.age ? <FieldError>{fieldErrors.age}</FieldError> : null}
              </TextField>
            </div>

            {error && (
              <Alert className='animate-fade-in' status='danger'>
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Description className='text-xs leading-relaxed'>{error}</Alert.Description>
                </Alert.Content>
              </Alert>
            )}

            <div className='animate-fade-up-delay-4 pt-1'>
              <Button fullWidth isPending={loading} type='submit'>
                {({ isPending }) => (
                  <>
                    {isPending ? <Spinner color='current' size='sm' /> : null}
                    {isPending ? 'Creando cuenta…' : 'Crear cuenta'}
                  </>
                )}
              </Button>
            </div>

            <div className='animate-fade-up-delay-4'>
              <Button fullWidth variant='secondary' onPress={startGoogleLogin}>
                <FcGoogle aria-hidden='true' size={18} />
                Registrarse con Google
              </Button>
            </div>
          </form>

          <p className='text-muted font-body mt-6 text-center text-xs'>
            ¿Ya tienes cuenta?{' '}
            <Link href='/login' className='text-accent hover:text-accent-hover underline underline-offset-2 transition-colors'>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
