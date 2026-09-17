import type { Metadata } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';

import '@/app/globals.css';
import { Providers } from '@/app/providers';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', display: 'swap', axes: ['opsz', 'SOFT', 'WONK'] });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  title: 'Herencia Viva — Asistente IA para Agricultores',
  description:
    'Plataforma inteligente de recomendaciones para agricultura colombiana. Consulta sobre cultivos, salud de plantas, plagas y manejo productivo.',
  keywords: ['agricultura', 'bovinos', 'Colombia', 'IA', 'pasturas', 'salud animal'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='es' className={`dark ${fraunces.variable} ${dmSans.variable}`} data-scroll-behavior='smooth' data-theme='dark'>
      <body className='grain-overlay antialiased'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
