'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';

// Next.js 16 passes `retry` (was `reset` in earlier versions).
// If your editor complains that `retry` doesn't exist on the type, swap
// it for `reset` — both are valid depending on the exact minor version.
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error('Route error:', error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas">
      <Container size="narrow" className="text-center">
        <Logo size="sm" />

        <p className="mt-12 font-mono text-xs uppercase tracking-widest text-muted">
          Something broke
        </p>

        <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">
          This wasn&rsquo;t supposed to happen.
        </h1>

        <p className="mx-auto mt-6 max-w-md text-muted">
          A temporary error stopped this page from rendering. Try again — if it
          keeps happening, the reference below helps us trace it.
        </p>

        {error.digest && (
          <p className="mt-6 font-mono text-xs text-muted">
            ref: {error.digest}
          </p>
        )}

        <div className="mt-10 flex justify-center gap-3">
          <Button onClick={() => retry()}>Try again</Button>
          <Button href="/" variant="secondary">
            Back home
          </Button>
        </div>
      </Container>
    </main>
  );
}