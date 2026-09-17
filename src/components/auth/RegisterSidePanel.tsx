import { FaCheck } from 'react-icons/fa6';

import BrandMark from '@/components/ui/BrandMark';

const FEATURES = [
  'Respuestas instantáneas sobre cultivos y suelos',
  'Contexto basado en conocimiento agrícola especializado',
  'Disponible 24/7 desde cualquier dispositivo',
];

export default function RegisterSidePanel() {
  return (
    <div className='auth-pattern relative hidden flex-col justify-between overflow-hidden p-12 lg:flex lg:w-[40%]'>
      <div className='border-accent/8 absolute -top-16 -right-16 h-72 w-72 rounded-full border' />
      <div className='border-danger/8 absolute bottom-0 left-0 h-64 w-64 rounded-full border' />
      <BrandMark subtitle='Plataforma de Asistencia Agrícola IA' className='relative z-10' />

      <div className='relative z-10'>
        <h2 className='font-display text-foreground mb-4 text-4xl leading-tight'>
          Únete a la
          <br />
          <span className='text-accent'>agricultura del futuro.</span>
        </h2>
        <p className='text-muted font-body max-w-xs text-sm leading-relaxed'>
          Crea tu cuenta gratuita y accede a recomendaciones personalizadas para tu finca agrícola.
        </p>

        <ul className='mt-8 space-y-3'>
          {FEATURES.map((item) => (
            <li key={item} className='text-muted font-body flex items-start gap-2.5 text-sm'>
              <FaCheck size={14} className='text-accent mt-0.5 shrink-0' aria-hidden='true' />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className='text-muted/60 font-body relative z-10 text-xs'>Al registrarte, aceptas los términos de uso de Herencia Viva.</p>
    </div>
  );
}
