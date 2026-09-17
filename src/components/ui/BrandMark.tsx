'use client';

import { FaSeedling } from 'react-icons/fa6';

export interface BrandMarkProps {
  subtitle?: string;
  compact?: boolean;
  className?: string;
}

export default function BrandMark({ subtitle, compact = false, className = '' }: BrandMarkProps) {
  const iconSize = compact ? 16 : 22;
  const boxClasses = compact ? 'h-8 w-8 rounded-lg' : 'h-10 w-10 rounded-xl';
  const titleClasses = compact ? 'text-base' : 'text-lg';

  return (
    <div className={`flex items-center gap-3 ${className}`.trim()}>
      <div className={`bg-gold flex items-center justify-center ${boxClasses}`}>
        <FaSeedling size={iconSize} className='text-earth-dark' aria-hidden='true' />
      </div>
      <div>
        <span className={`text-cream font-display font-semibold ${titleClasses}`}>Herencia Viva</span>
        {subtitle ? <p className='text-gold/60 text-[10px] tracking-widest uppercase'>{subtitle}</p> : null}
      </div>
    </div>
  );
}
