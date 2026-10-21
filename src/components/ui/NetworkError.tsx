'use client';

import { WifiOff } from 'lucide-react';
import { Button } from './Button';

export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-red-500/30 bg-red-500/5 px-6 py-20 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
        <WifiOff size={24} className="text-red-500" />
      </div>
      <h2 className="mt-6 font-serif text-2xl font-medium tracking-tight text-ink">
        Connection lost.
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
        We couldn't reach the server. Check your internet connection and try again.
      </p>
      {onRetry && (
        <div className="mt-8">
          <Button onClick={onRetry} variant="secondary">
            Try again
          </Button>
        </div>
      )}
    </div>
  );
}