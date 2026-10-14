'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useVerifyOtpMutation, useResendVerificationMutation } from '@/lib/api/auth';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { FormError } from '@/components/ui/FormError';
import { Button } from '@/components/ui/Button';

const RESEND_COOLDOWN_SECONDS = 45;

export function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get('email') ?? '';

  const [email, setEmail] = useState(emailFromQuery);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [resent, setResent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const [verify, { isLoading: verifying }] = useVerifyOtpMutation();
  const [resend, { isLoading: resending }] = useResendVerificationMutation();

  function startCooldown() {
    setCooldown(RESEND_COOLDOWN_SECONDS);
    const interval = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResent(false);

    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    if (otp.length !== 6) {
      setError('Enter the 6-digit code.');
      return;
    }

    try {
      await verify({ email: email.trim(), otp }).unwrap();
      router.replace(`/login?email=${encodeURIComponent(email.trim())}`);
    } catch (err) {
      const message =
        (err as { data?: { message?: string } })?.data?.message ??
        'Invalid or expired code. Try again.';
      setError(message);
    }
  }

  async function onResend() {
    setError(null);
    setResent(false);
    try {
      await resend({ email: email.trim() }).unwrap();
      setResent(true);
      startCooldown();
    } catch (err) {
      const message =
        (err as { data?: { message?: string } })?.data?.message ??
        'Could not resend. Try again.';
      setError(message);
    }
  }

  return (
    <div>
      <div className="text-center">
        <h1 className="font-serif text-3xl font-medium tracking-tight text-ink">
          Check your email.
        </h1>
        <p className="mt-3 text-sm text-muted">
          We sent a 6-digit code to {emailFromQuery || 'your email'}.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-10 space-y-5" noValidate>
        {!emailFromQuery && (
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="mt-2">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={verifying}
              />
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="otp">Verification code</Label>
          <div className="mt-2">
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              autoFocus
              required
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
              }
              disabled={verifying}
              invalid={Boolean(error)}
              className="text-center font-mono text-lg tracking-[0.5em]"
            />
          </div>
        </div>

        {error && <FormError>{error}</FormError>}
        {resent && (
          <p className="text-xs text-accent">
            New code sent. Check your inbox.
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={verifying || otp.length !== 6}
          className="w-full justify-center"
        >
          {verifying ? 'Verifying…' : 'Verify'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onResend}
          disabled={resending || cooldown > 0 || !email.trim()}
          className="font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          {cooldown > 0
            ? `Resend in ${cooldown}s`
            : resending
              ? 'Sending…'
              : "Didn't get a code? Resend"}
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        Wrong email?{' '}
        <Link
          href="/register"
          className="font-medium text-ink transition-colors hover:text-accent"
        >
          Start over
        </Link>
      </p>
    </div>
  );
}