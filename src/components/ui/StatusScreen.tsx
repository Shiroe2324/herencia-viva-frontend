import type { ReactNode } from 'react';

export interface StatusScreenProps {
  icon: ReactNode;
  iconBoxClassName?: string;
  title: string;
  description: ReactNode;
  children?: ReactNode;
}

export default function StatusScreen({ icon, iconBoxClassName, title, description, children }: StatusScreenProps) {
  return (
    <div className='animate-fade-up text-center'>
      <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center ${iconBoxClassName ?? ''}`}>{icon}</div>
      <h1 className='font-display text-foreground mb-3 text-3xl'>{title}</h1>
      <p className='text-muted font-body mb-6 text-sm'>{description}</p>
      {children}
    </div>
  );
}
