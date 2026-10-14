'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRegisterStudentMutation } from '@/lib/api/auth';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { FormError } from '@/components/ui/FormError';
import { Button } from '@/components/ui/Button';

type FieldErrors = Partial<
  Record<'fullName' | 'username' | 'email' | 'phone' | 'password', string>
>;

export function StudentRegisterForm() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterStudentMutation();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (!fullName.trim()) e.fullName = 'Required';
    if (fullName.length > 100) e.fullName = 'Max 100 characters';

    if (!username.trim()) e.username = 'Required';
    if (username.length > 50) e.username = 'Max 50 characters';

    if (!email.trim()) e.email = 'Required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Enter a valid email';

    if (phone && phone.length > 20) e.phone = 'Max 20 characters';

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
        fullName: fullName.trim(),
        username: username.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        password,
      }).unwrap();

      router.replace(`/verify-otp?email=${encodeURIComponent(email.trim())}`);
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
          Join as a student.
        </h1>
        <p className="mt-3 text-sm text-muted">
          Enroll in courses from any academy on SkillHive.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-10 space-y-5" noValidate>
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <div className="mt-2">
            <Input
              id="fullName"
              type="text"
              autoComplete="name"
              autoFocus
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isLoading}
              invalid={Boolean(fieldErrors.fullName)}
            />
          </div>
          <FormError>{fieldErrors.fullName}</FormError>
        </div>

        <div>
          <Label htmlFor="username">Username</Label>
          <div className="mt-2">
            <Input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              invalid={Boolean(fieldErrors.username)}
            />
          </div>
          <FormError>{fieldErrors.username}</FormError>
        </div>

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
              disabled={isLoading}
              invalid={Boolean(fieldErrors.email)}
            />
          </div>
          <FormError>{fieldErrors.email}</FormError>
        </div>

        <div>
          <Label htmlFor="phone">
            Phone <span className="normal-case text-muted/60">(optional)</span>
          </Label>
          <div className="mt-2">
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isLoading}
              invalid={Boolean(fieldErrors.phone)}
            />
          </div>
          <FormError>{fieldErrors.phone}</FormError>
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
          {isLoading ? 'Creating account…' : 'Create account'}
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