'use client';

import { Tooltip } from '@heroui/react';
import { FaCircleInfo, FaSquare } from 'react-icons/fa6';

import ChatInput from '@/components/chat/ChatInput';

export interface ChatFooterProps {
  isStreaming: boolean;
  onSubmit: (question: string) => void;
  onStop: () => void;
  onOpenInfo: () => void;
}

export default function ChatFooter({ isStreaming, onSubmit, onStop, onOpenInfo }: ChatFooterProps) {
  return (
    <div className='px-4 pt-2 pb-4'>
      <div className='mx-auto max-w-3xl'>
        <div className='mb-2 flex justify-center'>
          <button
            onClick={onOpenInfo}
            className='bg-surface/65 border-border text-muted hover:text-foreground hover:border-accent/30 hover:bg-surface/80 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors'
          >
            <FaCircleInfo size={12} aria-hidden='true' />
            Qué información contiene esta IA
          </button>
        </div>

        {isStreaming ? (
          <div className='flex items-center gap-3'>
            <div className='flex-1'>
              <ChatInput onSubmit={onSubmit} disabled placeholder='Generando respuesta…' />
            </div>
            <Tooltip delay={300}>
              <button
                onClick={onStop}
                className='border-danger/30 text-danger hover:bg-danger/10 h-12.5 shrink-0 rounded-xl border px-4 text-xs font-semibold transition-all'
              >
                <span className='inline-flex items-center gap-2'>
                  <FaSquare size={12} aria-hidden='true' />
                  Detener
                </span>
              </button>
              <Tooltip.Content placement='top'>
                <p>Detener la respuesta actual</p>
              </Tooltip.Content>
            </Tooltip>
          </div>
        ) : (
          <ChatInput onSubmit={onSubmit} />
        )}
        <p className='text-muted/60 font-body mt-2 text-center text-[10px]'>
          Las respuestas son orientativas. Consulta siempre con un veterinario o agrónomo certificado.
        </p>
      </div>
    </div>
  );
}
