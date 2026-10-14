'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AlertTriangle, UserPlus } from 'lucide-react';
import { useAcceptInviteMutation } from '@/lib/api/auth';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { FormError } from '@/components/ui/FormError';
import { Button } from '@/components/ui/Button';

export function AcceptInviteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [accept, { isLoading }] = useAcceptInviteMutation();

  if (!token) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface">
          <AlertTriangle size={20} className="text-accent" aria-hidden />
        </div>

        <h1 className="mt-8 font-serif text-2xl font-medium tracking-tight text-ink">
          This invite is missing its token.
        </h1>
        <p className="mt-3 text-sm text-muted">
          Ask the academy owner to send a fresh invite.
        </p>

        <div className="mt-8">
          <Button href="/" variant="secondary" className="w-full justify-center">
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // onQueryStarted on this endpoint dispatches setCredentials,
      // so the user is signed in the moment this resolves.
      await accept({ token, password }).unwrap();
      router.replace('/dashboard');
    } catch (err) {
      const message =
        (err as { data?: { message?: string } })?.data?.message ??
        'Invalid or expired invite. Ask for a new one.';
      setError(message);
    }
  }

  return (
    <div>
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface">
          <UserPlus size={20} className="text-accent" aria-hidden />
        </div>

        <h1 className="mt-8 font-serif text-3xl font-medium tracking-tight text-ink">
          Welcome to the team.
        </h1>
        <p className="mt-3 text-sm text-muted">
          Set a password to activate your account.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-10 space-y-5" noValidate>
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="mt-2">
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              autoFocus
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              invalid={Boolean(error)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="confirm">Confirm password</Label>
          <div className="mt-2">
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              disabled={isLoading}
              invalid={Boolean(error)}
            />
          </div>
        </div>

        {error && <FormError>{error}</FormError>}

        <Button
          type="submit"
          size="lg"
          disabled={isLoading || !password || !confirm}
          className="w-full justify-center"
        >
          {isLoading ? 'Activating…' : 'Activate account'}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted">
        Already activated?{' '}
        <Link
          href="/login"
          className="font-medium text-ink transition-colors hover:text-accent"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}