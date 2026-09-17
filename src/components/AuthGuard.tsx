'use client';

import { Skeleton } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/context/AuthContext';

export interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoading, isLoggedIn, router]);

  if (isLoading) {
    return (
      <div className='bg-background flex h-screen overflow-hidden'>
        <aside className='border-border hidden h-full w-64 shrink-0 flex-col border-r px-4 py-8 lg:flex'>
          <div className='mb-8 flex items-center gap-3 px-2'>
            <Skeleton className='h-10 w-10 rounded-xl' />
            <Skeleton className='h-4 w-28 rounded-md' />
          </div>
          <Skeleton className='mb-6 h-10 w-full rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='h-8 w-full rounded-lg' />
            <Skeleton className='h-8 w-5/6 rounded-lg' />
            <Skeleton className='h-8 w-4/6 rounded-lg' />
          </div>
          <div className='flex-1' />
          <div className='flex items-center gap-3 px-1'>
            <Skeleton className='h-9 w-9 shrink-0 rounded-full' />
            <div className='flex-1 space-y-2'>
              <Skeleton className='h-3 w-24 rounded' />
              <Skeleton className='h-3 w-32 rounded' />
            </div>
          </div>
        </aside>

        <div className='flex min-w-0 flex-1 flex-col'>
          <div className='mx-auto flex w-full max-w-3xl flex-1 flex-col justify-end gap-4 px-4 py-8'>
            <Skeleton className='h-16 w-2/3 rounded-2xl rounded-bl-sm' />
            <Skeleton className='ml-auto h-12 w-1/2 rounded-2xl rounded-br-sm' />
            <Skeleton className='h-20 w-3/4 rounded-2xl rounded-bl-sm' />
          </div>
          <div className='px-4 pb-6'>
            <Skeleton className='mx-auto h-12 w-full max-w-3xl rounded-2xl' />
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) return null;

  return <>{children}</>;
}
