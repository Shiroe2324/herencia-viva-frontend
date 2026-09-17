'use client';

import { Toast } from '@heroui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import { AuthProvider } from '@/context/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 30_000, retry: 1 } } }));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toast.Provider placement='top end' />
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}
