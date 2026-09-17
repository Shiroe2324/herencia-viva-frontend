import { Chip } from '@heroui/react';

import BrandMark from '@/components/ui/BrandMark';

const FEATURE_TAGS = ['Cultivos y siembra', 'Suelo y nutrición', 'Plagas y manejo', 'Productividad agrícola'];

export default function LoginSidePanel() {
  return (
    <div className='auth-pattern relative hidden flex-col justify-between overflow-hidden p-12 lg:flex lg:w-[45%]'>
      <div className='border-accent/10 absolute -top-24 -left-24 h-96 w-96 rounded-full border' />
      <div className='border-danger/10 absolute -right-32 -bottom-32 h-112 w-md rounded-full border' />
      <div className='border-success/10 absolute top-1/3 right-0 h-48 w-48 rounded-full border' />
      <BrandMark subtitle='Plataforma de Asistencia Agrícola IA' className='relative z-10' />
      <div className='relative z-10'>
        <h2 className='font-display text-foreground mb-4 text-4xl leading-tight'>
          El agro colombiano,
          <br />
          <span className='text-accent'>impulsado por IA.</span>
        </h2>
        <p className='text-muted font-body max-w-sm text-base leading-relaxed'>
          Consulta sobre cultivos, suelos, plagas y productividad agrícola. Respuestas precisas, disponibles las 24 horas.
        </p>

        <div className='mt-8 flex flex-wrap gap-2'>
          {FEATURE_TAGS.map((tag) => (
            <Chip key={tag} variant='secondary' size='sm'>
              {tag}
            </Chip>
          ))}
        </div>
      </div>

      <div className='border-accent/30 relative z-10 border-l-2 pl-4'>
        <p className='text-muted font-body text-sm leading-relaxed italic'>"La agricultura inteligente comienza con las preguntas correctas."</p>
      </div>
    </div>
  );
}
