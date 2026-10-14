'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRegisterAcademyMutation } from '@/lib/api/auth';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { FormError } from '@/components/ui/FormError';
import { Button } from '@/components/ui/Button';

type FieldErrors = Partial<
  Record<
    | 'academyName'
    | 'academyDescription'
    | 'ownerFullName'
    | 'ownerEmail'
    | 'ownerUsername'
    | 'ownerPhone'
    | 'password',
    string
  >
>;

export function AcademyRegisterForm() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterAcademyMutation();

  const [academyName, setAcademyName] = useState('');
  const [academyDescription, setAcademyDescription] = useState('');
  const [ownerFullName, setOwnerFullName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerUsername, setOwnerUsername] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [password, setPassword] = useState('');

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (!academyName.trim()) e.academyName = 'Required';
    if (academyName.length > 150) e.academyName = 'Max 150 characters';

    if (academyDescription.length > 1000)
      e.academyDescription = 'Max 1000 characters';

    if (!ownerFullName.trim()) e.ownerFullName = 'Required';
    if (ownerFullName.length > 100) e.ownerFullName = 'Max 100 characters';

    if (!ownerEmail.trim()) e.ownerEmail = 'Required';
    else if (!/^\S+@\S+\.\S+$/.test(ownerEmail))
      e.ownerEmail = 'Enter a valid email';

    if (!ownerUsername.trim()) e.ownerUsername = 'Required';
    if (ownerUsername.length > 50) e.ownerUsername = 'Max 50 characters';

    if (ownerPhone && ownerPhone.length > 20)
      e.ownerPhone = 'Max 20 characters';

    if (!password) e.password = 'Required';
    else if (password.length < 8) e.password = 'Minimum 8 characters';

    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setFormError(null);

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      await register({
        academyName: academyName.trim(),
        academyDescription: academyDescription.trim() || null,
        ownerFullName: ownerFullName.trim(),
        ownerEmail: ownerEmail.trim(),
        ownerUsername: ownerUsername.trim(),
        ownerPhone: ownerPhone.trim() || null,
        password,
      }).unwrap();

      router.replace(`/verify-otp?email=${encodeURIComponent(ownerEmail.trim())}`);
    } catch (err) {
      const message =
        (err as { data?: { message?: string } })?.data?.message ??
        'Something went wrong. Try again.';
      setFormError(message);
    }
  }


  return (
    <div>
      <div className="text-center">
        <h1 className="font-serif text-3xl font-medium tracking-tight text-ink">
          Start your academy.
        </h1>
        <p className="mt-3 text-sm text-muted">
          A few details, and you&rsquo;re in.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-10 space-y-5" noValidate>
        <div>
          <Label htmlFor="academyName">Academy name</Label>
          <div className="mt-2">
            <Input
              id="academyName"
              type="text"
              autoComplete="organization"
              autoFocus
              required
              value={academyName}
              onChange={(e) => setAcademyName(e.target.value)}
              disabled={isLoading}
              invalid={Boolean(fieldErrors.academyName)}
            />
          </div>
          <FormError>{fieldErrors.academyName}</FormError>
        </div>

        <div>
          <Label htmlFor="academyDescription">
            Description <span className="normal-case text-muted/60">(optional)</span>
          </Label>
          <div className="mt-2">
            <textarea
              id="academyDescription"
              rows={3}
              value={academyDescription}
              onChange={(e) => setAcademyDescription(e.target.value)}
              disabled={isLoading}
              placeholder="What does your academy teach?"
              className="w-full resize-none rounded-lg border border-border-strong bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 transition-colors duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-60"
            />
          </div>
          <FormError>{fieldErrors.academyDescription}</FormError>
        </div>

        <div className="h-px w-full bg-border-strong" aria-hidden />

        <div>
          <Label htmlFor="ownerFullName">Your full name</Label>
          <div className="mt-2">
            <Input
              id="ownerFullName"
              type="text"
              autoComplete="name"
              required
              value={ownerFullName}
              onChange={(e) => setOwnerFullName(e.target.value)}
              disabled={isLoading}
              invalid={Boolean(fieldErrors.ownerFullName)}
            />
          </div>
          <FormError>{fieldErrors.ownerFullName}</FormError>
        </div>

        <div>
          <Label htmlFor="ownerEmail">Email</Label>
          <div className="mt-2">
            <Input
              id="ownerEmail"
              type="email"
              autoComplete="email"
              required
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
              disabled={isLoading}
              invalid={Boolean(fieldErrors.ownerEmail)}
            />
          </div>
          <FormError>{fieldErrors.ownerEmail}</FormError>
        </div>

        <div>
          <Label htmlFor="ownerUsername">Username</Label>
          <div className="mt-2">
            <Input
              id="ownerUsername"
              type="text"
              autoComplete="username"
              required
              value={ownerUsername}
              onChange={(e) => setOwnerUsername(e.target.value)}
              disabled={isLoading}
              invalid={Boolean(fieldErrors.ownerUsername)}
            />
          </div>
          <FormError>{fieldErrors.ownerUsername}</FormError>
        </div>

        <div>
          <Label htmlFor="ownerPhone">
            Phone <span className="normal-case text-muted/60">(optional)</span>
          </Label>
          <div className="mt-2">
            <Input
              id="ownerPhone"
              type="tel"
              autoComplete="tel"
              value={ownerPhone}
              onChange={(e) => setOwnerPhone(e.target.value)}
              disabled={isLoading}
              invalid={Boolean(fieldErrors.ownerPhone)}
            />
          </div>
          <FormError>{fieldErrors.ownerPhone}</FormError>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="mt-2">
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              invalid={Boolean(fieldErrors.password)}
            />
          </div>
          <FormError>{fieldErrors.password}</FormError>
        </div>

        {formError && <FormError>{formError}</FormError>}

        <Button
          type="submit"
          size="lg"
       disabled={isLoading}
          className="w-full justify-center"
        >
          {isLoading ? 'Creating academy…' : 'Create academy'}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted">
        Already have an account?{' '}
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