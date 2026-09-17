'use client';

import { Button, InputGroup, Spinner, TextField } from '@heroui/react';
import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { FaPaperPlane } from 'react-icons/fa6';

export interface ChatInputProps {
  onSubmit: (question: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({ onSubmit, disabled, placeholder }: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleInput() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }

  const isEmpty = !value.trim();

  return (
    <TextField aria-label='Pregunta' fullWidth value={value} onChange={setValue}>
      <InputGroup fullWidth className='rounded-2xl py-1.5'>
        <InputGroup.TextArea
          ref={textareaRef}
          className='max-h-40 resize-none py-1.5 text-sm leading-5'
          disabled={disabled}
          placeholder={placeholder ?? 'Pregunta sobre agricultura, cultivos, salud de plantas…'}
          rows={1}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
        />
        <InputGroup.Suffix className='items-end pb-1.5'>
          <Button isIconOnly aria-label='Enviar pregunta' isDisabled={disabled || isEmpty} size='sm' onPress={handleSubmit}>
            {disabled ? <Spinner color='current' size='sm' /> : <FaPaperPlane aria-hidden='true' size={14} />}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}
