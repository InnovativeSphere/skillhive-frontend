import Link from 'next/link';
import { Building2, GraduationCap, ArrowRight } from 'lucide-react';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Get started',
  description:
    'Start an academy on SkillHive, or join as a student. Choose how you want to begin.',
  path: '/register',
});

const options = [
  {
    id: 'academy',
    icon: Building2,
    title: 'Start an academy',
    body: 'Run courses, invite instructors, get paid. Your academy, your name, your rules.',
    href: '/register/academy',
  },
  {
    id: 'student',
    icon: GraduationCap,
    title: 'Join as a student',
    body: 'Enroll in courses from any academy on SkillHive. Learn at your own pace.',
    href: '/register/student',
  },
] as const;

export default function RegisterChoicePage() {
  return (
    <div>
      <div className="text-center">
        <h1 className="font-serif text-3xl font-medium tracking-tight text-ink">
          How do you want to begin?
        </h1>
        <p className="mt-3 text-sm text-muted">
          You can always do the other later.
        </p>
      </div>

      <div className="mt-10 space-y-3">
        {options.map((opt) => {
          const Icon = opt.icon;
          return (
            <Link
              key={opt.id}
              href={opt.href}
              className="group flex items-start gap-4 rounded-xl border border-border bg-surface p-5 transition-all duration-150 hover:border-border-strong hover:shadow-card"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-canvas">
                <Icon size={18} className="text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-serif text-lg font-medium tracking-tight text-ink">
                  {opt.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {opt.body}
                </p>
              </div>
              <ArrowRight
                size={16}
                aria-hidden
                className="mt-3 shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent"
              />
            </Link>
          );
        })}
      </div>

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