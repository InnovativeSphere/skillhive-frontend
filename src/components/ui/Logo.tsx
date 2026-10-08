import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  href?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizes = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
};

export function Logo({ href = '/', className, size = 'md' }: Props) {
  return (
    <Link
      href={href}
      aria-label="SkillHive home"
      className={cn(
        'font-serif font-medium tracking-tight text-ink transition-opacity hover:opacity-80',
        sizes[size],
        className,
      )}
    >
      SkillHive<span className="text-accent">.</span>
    </Link>
  );
}