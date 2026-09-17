'use client';

import { AlertDialog, Avatar, Button, Spinner, toast } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaArrowRightFromBracket, FaCircleQuestion, FaPlus } from 'react-icons/fa6';

import BrandMark from '@/components/ui/BrandMark';
import { useAuth } from '@/context/AuthContext';

export interface ChatSideBarProps {
  onNewChat: () => void;
}

export default function ChatSidebar({ onNewChat }: ChatSideBarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logout();
      toast('Sesión cerrada', { description: 'Vuelve pronto.' });
      router.push('/login');
    } catch {
      toast.danger('No se pudo cerrar sesión', { description: 'Inténtalo de nuevo.' });
    } finally {
      setLoggingOut(false);
    }
  }

  const initial = user?.display_name?.[0] ?? user?.username?.[0] ?? 'U';

  return (
    <aside className='bg-background border-border flex h-full w-64 shrink-0 flex-col border-r'>
      <div className='border-border border-b px-6 py-8'>
        <BrandMark compact subtitle='Asistente IA' className='mb-1' />
      </div>

      <div className='px-4 pt-5'>
        <Button fullWidth variant='secondary' onPress={onNewChat}>
          <FaPlus aria-hidden='true' size={14} />
          Nueva consulta
        </Button>
      </div>

      <div className='flex-1' />

      <div className='px-4 pb-4'>
        <p className='text-muted font-body mb-3 px-1 text-[10px] tracking-widest uppercase'>Preguntas frecuentes</p>
        {['¿Cómo mejorar la calidad del suelo en verano?', 'Plagas comunes en cultivos de maíz', 'Rotación de cultivos y manejo sostenible'].map(
          (q) => (
            <button
              key={q}
              onClick={() => onNewChat()}
              className='text-muted font-body hover:text-foreground hover:bg-surface/60 mb-1 flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left text-xs leading-snug transition-all duration-200'
            >
              <FaCircleQuestion aria-hidden='true' className='mt-0.5 shrink-0 opacity-60' size={12} />
              {q}
            </button>
          ),
        )}
      </div>

      <div className='border-border border-t px-4 py-4'>
        <div className='flex items-center gap-3'>
          <Avatar className='shrink-0'>
            <Avatar.Fallback className='bg-danger/20 text-danger border-danger/30 border text-xs font-bold uppercase'>{initial}</Avatar.Fallback>
          </Avatar>
          <div className='min-w-0 flex-1'>
            <p className='text-foreground font-body truncate text-sm font-medium'>{user?.display_name ?? user?.username ?? 'Usuario'}</p>
            <p className='text-muted font-body truncate text-xs'>{user?.email ?? ''}</p>
          </div>

          <AlertDialog>
            <Button isIconOnly aria-label='Cerrar sesión' isDisabled={loggingOut} size='sm' variant='ghost'>
              {loggingOut ? <Spinner color='current' size='sm' /> : <FaArrowRightFromBracket aria-hidden='true' size={15} />}
            </Button>
            <AlertDialog.Backdrop>
              <AlertDialog.Container>
                <AlertDialog.Dialog className='sm:max-w-100'>
                  <AlertDialog.CloseTrigger />
                  <AlertDialog.Header>
                    <AlertDialog.Icon status='accent' />
                    <AlertDialog.Heading>¿Cerrar sesión?</AlertDialog.Heading>
                  </AlertDialog.Header>
                  <AlertDialog.Body>
                    <p>Tendrás que iniciar sesión de nuevo para acceder a tu cuenta y tus conversaciones.</p>
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <Button slot='close' variant='tertiary'>
                      Cancelar
                    </Button>
                    <Button slot='close' variant='danger' onPress={handleLogout}>
                      Cerrar sesión
                    </Button>
                  </AlertDialog.Footer>
                </AlertDialog.Dialog>
              </AlertDialog.Container>
            </AlertDialog.Backdrop>
          </AlertDialog>
        </div>
      </div>
    </aside>
  );
}
