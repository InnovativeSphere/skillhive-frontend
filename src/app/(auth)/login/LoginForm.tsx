'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLoginMutation } from '@/lib/api/auth';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { FormError } from '@/components/ui/FormError';
import { Button } from '@/components/ui/Button';
import { CheckCircle2 } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [login, { isLoading }] = useLoginMutation();

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      await login({ usernameOrEmail, password }).unwrap();
      const next = searchParams.get('next') ?? '/dashboard';
      router.replace(next);
    } catch (err) {
      const message =
        (err as { data?: { message?: string } })?.data?.message ??
        'Something went wrong. Try again.';
      setError(message);
    }
  }

  return (
    <div>
      <div className="text-center">
        <h1 className="font-serif text-3xl font-medium tracking-tight text-ink">
          Welcome back.
        </h1>
        <p className="mt-3 text-sm text-muted">
          Sign in to your academy, or continue learning.
        </p>
      </div>
{searchParams.get('reset') === 'success' && (
  <div className="mb-6 flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/5 p-3">
    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-accent" aria-hidden />
    <p className="text-xs text-ink">
      Password updated. Sign in with your new password.
    </p>
  </div>
)}
      <form onSubmit={onSubmit} className="mt-10 space-y-5" noValidate>
        <div>
          <Label htmlFor="usernameOrEmail">Username or email</Label>
          <div className="mt-2">
            <Input
              id="usernameOrEmail"
              type="text"
              autoComplete="username"
              autoFocus
              required
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              disabled={isLoading}
              invalid={Boolean(error)}
            />
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-accent"
            >
              Forgot?
            </Link>
          </div>
          <div className="mt-2">
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              invalid={Boolean(error)}
            />
          </div>
        </div>

        {error && <FormError>{error}</FormError>}

        <Button
          type="submit"
          size="lg"
          disabled={isLoading || !usernameOrEmail || !password}
          className="w-full justify-center"
        >
          {isLoading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted">
        No account yet?{' '}
        <Link
          href="/register"
          className="font-medium text-ink transition-colors hover:text-accent"
        >
          Start your academy
        </Link>
      </p>
    </div>
  );
}