'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import type { UserRole } from '@/types/api';

type Props = {
  children: React.ReactNode;
  // If omitted, any authenticated user passes.
  allowedRoles?: UserRole[];
};

export function RouteGuard({ children, allowedRoles }: Props) {
  const { user, status, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'guest') {
      router.replace('/login');
    }
  }, [status, router]);

  if (isLoading || status === 'unknown') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
      </div>
    );
  }

  if (status === 'guest' || !user) return null;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Not authorized
        </p>
      </div>
    );
  }

  return <>{children}</>;
}