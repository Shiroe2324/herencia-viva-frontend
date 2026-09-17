'use client';

import { Button, Modal } from '@heroui/react';
import { FaEnvelope } from 'react-icons/fa6';

import LinkButton from '@/components/ui/LinkButton';

export interface VerificationPendingModalProps {
  email: string;
}

export default function VerificationPendingModal({ email }: VerificationPendingModalProps) {
  return (
    <Modal.Backdrop isOpen>
      <Modal.Container placement='center' size='sm'>
        <Modal.Dialog className='text-center'>
          <Modal.Icon className='bg-accent-soft text-accent-soft-foreground mx-auto'>
            <FaEnvelope aria-hidden='true' size={22} />
          </Modal.Icon>
          <Modal.Heading>Verifica tu correo</Modal.Heading>

          <Modal.Body>
            <p className='text-muted font-body text-sm'>Hemos enviado un enlace de verificación a:</p>

            <div className='bg-default my-4 rounded-xl px-4 py-3 text-center'>
              <p className='text-foreground text-sm font-semibold break-all'>{email}</p>
            </div>

            <div className='border-accent/20 bg-accent/5 rounded-xl border px-4 py-4 text-left'>
              <p className='text-foreground/75 font-body text-xs leading-relaxed'>
                <span className='text-foreground font-semibold'>Próximo paso:</span> Revisa tu correo y haz clic en el enlace de verificación para
                completar tu registro. Si no ves el correo, revisa la carpeta de spam.
              </p>
            </div>
          </Modal.Body>

          <Modal.Footer className='flex-col'>
            <LinkButton fullWidth href='/login'>
              Ir al inicio de sesión
            </LinkButton>
            <Button fullWidth variant='secondary' onPress={() => (window.location.href = `mailto:${email}`)}>
              Abrir correo
            </Button>
          </Modal.Footer>

          <p className='text-muted font-body mt-6 text-center text-xs'>El enlace expira en 24 horas</p>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
