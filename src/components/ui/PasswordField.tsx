'use client';

import { Button, Description, FieldError, InputGroup, Label, TextField } from '@heroui/react';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa6';

export interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string | null;
  description?: string;
  className?: string;
  labelEndContent?: React.ReactNode;
}

export default function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  isRequired,
  isInvalid,
  errorMessage,
  description,
  className,
  labelEndContent,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField className={className} fullWidth isInvalid={isInvalid} isRequired={isRequired} value={value} onChange={onChange}>
      <div className='flex items-center justify-between gap-3'>
        <Label className='text-xs tracking-widest uppercase'>{label}</Label>
        {labelEndContent}
      </div>
      <InputGroup fullWidth>
        <InputGroup.Prefix>
          <FaLock aria-hidden='true' className='text-muted' size={14} />
        </InputGroup.Prefix>
        <InputGroup.Input autoComplete={autoComplete} placeholder={placeholder} type={showPassword ? 'text' : 'password'} />
        <InputGroup.Suffix className='pe-1.5'>
          <Button
            isIconOnly
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            size='sm'
            variant='ghost'
            onPress={() => setShowPassword((current) => !current)}
          >
            {showPassword ? <FaEyeSlash aria-hidden='true' size={15} /> : <FaEye aria-hidden='true' size={15} />}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
      {errorMessage ? <FieldError>{errorMessage}</FieldError> : description ? <Description>{description}</Description> : null}
    </TextField>
  );
}
