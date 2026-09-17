'use client';

import { FaBug, FaDroplet, FaLeaf, FaSeedling } from 'react-icons/fa6';

const SUGGESTED_QUESTIONS = [
  { text: '¿Cómo mejorar la calidad del suelo en época seca?', icon: FaDroplet },
  { text: 'Síntomas y tratamiento de la pudrición en raíces', icon: FaLeaf },
  { text: 'Manejo de plagas en cultivos de maíz', icon: FaBug },
  { text: 'Fertilización orgánica para hortalizas', icon: FaSeedling },
];

export interface ChatEmptyStateProps {
  onSelectQuestion: (question: string) => void;
  disabled: boolean;
}

export default function ChatEmptyState({ onSelectQuestion, disabled }: ChatEmptyStateProps) {
  return (
    <div className='flex h-full flex-col items-center justify-center px-6 py-16 text-center'>
      <div className='bg-accent/10 border-accent/20 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border'>
        <FaSeedling size={30} className='text-accent' aria-hidden='true' />
      </div>
      <h2 className='font-display text-foreground mb-2 text-2xl'>¿Qué necesitas saber hoy?</h2>
      <p className='text-muted font-body mb-10 max-w-sm text-sm leading-relaxed'>
        Haz tu consulta sobre agricultura y recibirás recomendaciones especializadas.
      </p>

      <div className='grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2'>
        {SUGGESTED_QUESTIONS.map(({ text, icon: Icon }) => (
          <button
            key={text}
            onClick={() => onSelectQuestion(text)}
            disabled={disabled}
            className='bg-surface border-border text-foreground/60 font-body hover:border-accent/30 hover:text-foreground hover:bg-surface/80 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-left text-xs leading-snug transition-all duration-200 disabled:opacity-40'
          >
            <Icon aria-hidden='true' className='text-accent mt-0.5 shrink-0' size={13} />
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
