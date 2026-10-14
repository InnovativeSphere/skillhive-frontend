'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MailCheck } from 'lucide-react';
import { useForgotPasswordMutation } from '@/lib/api/auth';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { FormError } from '@/components/ui/FormError';
import { Button } from '@/components/ui/Button';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgot, { isLoading }] = useForgotPasswordMutation();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Email is required.');
      return;
    }

    try {
      await forgot({ email: email.trim() }).unwrap();
      setSent(true);
    } catch (err) {
      const message =
        (err as { data?: { message?: string } })?.data?.message ??
        'Something went wrong. Try again.';
      setError(message);
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface">
          <MailCheck size={20} className="text-accent" aria-hidden />
        </div>

        <h1 className="mt-8 font-serif text-3xl font-medium tracking-tight text-ink">
          Check your inbox.
        </h1>
        <p className="mt-3 text-sm text-muted">
          If an account exists for <span className="text-ink">{email}</span>, a
          reset link is on its way. It expires in about an hour.
        </p>

        <p className="mt-10 text-sm text-muted">
          <Link
            href="/login"
            className="font-medium text-ink transition-colors hover:text-accent"
          >
            ← Back to sign in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center">
        <h1 className="font-serif text-3xl font-medium tracking-tight text-ink">
          Reset your password.
        </h1>
        <p className="mt-3 text-sm text-muted">
          Enter your email and we&rsquo;ll send you a link to reset it.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-10 space-y-5" noValidate>
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="mt-2">
            <Input
              id="email"
              type="email"
              autoComplete="email"
              autoFocus
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              invalid={Boolean(error)}
            />
          </div>
        </div>

        {error && <FormError>{error}</FormError>}

        <Button
          type="submit"
          size="lg"
          disabled={isLoading || !email.trim()}
          className="w-full justify-center"
        >
          {isLoading ? 'Sending…' : 'Send reset link'}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted">
        Remembered it?{' '}
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