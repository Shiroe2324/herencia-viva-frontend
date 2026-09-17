'use client';

import { Modal } from '@heroui/react';
import { FaCloudSun, FaLayerGroup, FaSeedling, FaTree } from 'react-icons/fa6';

export interface KnowledgeScopeModalProps {
  onClose: () => void;
}

export default function KnowledgeScopeModal({ onClose }: KnowledgeScopeModalProps) {
  return (
    <Modal.Backdrop isOpen onOpenChange={(open) => !open && onClose()}>
      <Modal.Container scroll='inside' size='lg'>
        <Modal.Dialog className='sm:max-w-5xl'>
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Heading>¿Qué información contiene esta IA?</Modal.Heading>
            <p className='text-muted font-body mt-2 text-sm leading-relaxed'>
              Este asistente está entrenado para orientar sobre saberes agroecológicos y prácticas rurales tradicionales de forma resumida y práctica.
            </p>
          </Modal.Header>

          <Modal.Body>
            <div className='space-y-4'>
              <section className='bg-surface/65 border-border rounded-xl border p-4'>
                <h3 className='text-foreground font-body mb-2 flex items-center gap-2 text-sm font-semibold tracking-wide'>
                  <FaSeedling className='text-accent shrink-0' size={14} aria-hidden='true' />
                  1. Cultivos Principales y de Pancoger
                </h3>
                <p className='text-foreground/70 font-body text-sm leading-relaxed'>
                  Incluye recomendaciones sobre ñame (variedades, camellones y siembra en luna menguante), yuca (dulce y amarga según uso y tipo de
                  suelo), maíz (ciclos de siembra y conservación de semilla criolla con humo y ceniza) y plátano (siembra en humedad y uso como
                  sombrío).
                </p>
              </section>

              <section className='bg-surface/65 border-border rounded-xl border p-4'>
                <h3 className='text-foreground font-body mb-2 flex items-center gap-2 text-sm font-semibold tracking-wide'>
                  <FaTree className='text-accent shrink-0' size={14} aria-hidden='true' />
                  2. Especies Forestales y Barreras Vivas
                </h3>
                <p className='text-foreground/70 font-body text-sm leading-relaxed'>
                  Contiene información de árboles nativos como roble, campano, ceiba tolúa, guácimo y matarratón para mejorar microclima y fertilidad.
                  También orienta sobre barreras vivas con vetiver, limoncillo, caña brava y zarza para control de erosión en laderas.
                </p>
              </section>

              <section className='bg-surface/65 border-border rounded-xl border p-4'>
                <h3 className='text-foreground font-body mb-2 flex items-center gap-2 text-sm font-semibold tracking-wide'>
                  <FaCloudSun className='text-accent shrink-0' size={14} aria-hidden='true' />
                  3. Bioindicadores y Saberes Ancestrales
                </h3>
                <p className='text-foreground/70 font-body text-sm leading-relaxed'>
                  Resume señales naturales para lluvia o sequía, como comportamiento de turpiales, hormigas arrieras, abejas, sapos, el árbol de
                  trupillo, las Pléyades y colmenas silvestres. Además, integra ciclos lunares para raíces, poda y abonado.
                </p>
              </section>

              <section className='bg-surface/65 border-border rounded-xl border p-4'>
                <h3 className='text-foreground font-body mb-2 flex items-center gap-2 text-sm font-semibold tracking-wide'>
                  <FaLayerGroup className='text-accent shrink-0' size={14} aria-hidden='true' />
                  4. Manejo y Recuperación de Suelos
                </h3>
                <p className='text-foreground/70 font-body text-sm leading-relaxed'>
                  Abarca diagnóstico básico de suelos franco-arcillosos, arenosos y limosos, además de técnicas como acolchado, rotación,
                  agroforestería, curvas de nivel y tumba y pudra. También guía sobre compostaje y leguminosas fijadoras de nitrógeno.
                </p>
              </section>
            </div>

            <div className='bg-accent/8 border-accent/25 mt-6 rounded-xl border px-4 py-3'>
              <p className='text-foreground/75 font-body text-xs leading-relaxed'>
                Esta información es orientativa y educativa. Para decisiones productivas importantes, contrasta con la experiencia local y apoyo
                técnico profesional.
              </p>
            </div>
          </Modal.Body>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
