'use client';

import { Tooltip } from '@heroui/react';
import { FaBars, FaCircleInfo } from 'react-icons/fa6';

import BrandMark from '@/components/ui/BrandMark';

export interface ChatMobileHeaderProps {
  onToggleSidebar: () => void;
  onOpenInfo: () => void;
}

export default function ChatMobileHeader({ onToggleSidebar, onOpenInfo }: ChatMobileHeaderProps) {
  return (
    <header className='border-border bg-background flex items-center gap-3 border-b px-4 py-3 lg:hidden'>
      <Tooltip delay={300}>
        <button
          onClick={onToggleSidebar}
          className='text-muted hover:text-foreground hover:bg-surface/60 flex h-9 w-9 items-center justify-center rounded-lg transition-all'
          aria-label='Abrir menú'
        >
          <FaBars size={18} aria-hidden='true' />
        </button>
        <Tooltip.Content placement='bottom'>
          <p>Abrir menú</p>
        </Tooltip.Content>
      </Tooltip>
      <BrandMark compact />
      <Tooltip delay={300}>
        <button
          onClick={onOpenInfo}
          className='text-muted hover:text-foreground hover:bg-surface/60 ml-auto flex h-9 w-9 items-center justify-center rounded-lg transition-all'
          aria-label='Ver información sobre la IA'
        >
          <FaCircleInfo size={16} aria-hidden='true' />
        </button>
        <Tooltip.Content placement='bottom'>
          <p>¿Qué información contiene la IA?</p>
        </Tooltip.Content>
      </Tooltip>
    </header>
  );
}
