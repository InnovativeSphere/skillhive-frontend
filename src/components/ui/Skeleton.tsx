import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  variant?: 'text' | 'circle' | 'rect';
};

const shimmer =
  'relative overflow-hidden bg-[rgba(25,25,25,0.06)] ' +
  'before:absolute before:inset-0 before:-translate-x-full ' +
  'before:animate-[shimmer_1.6s_infinite] ' +
  'before:bg-gradient-to-r before:from-transparent before:via-[rgba(25,25,25,0.04)] before:to-transparent ' +
  'dark:bg-[rgba(240,238,230,0.08)] dark:before:via-[rgba(240,238,230,0.06)]';

const variants = {
  text: 'h-4 w-full rounded-md',
  circle: 'h-10 w-10 rounded-full',
  rect: 'h-24 w-full rounded-lg',
};

export function Skeleton({ className, variant = 'text' }: Props) {
  return <div className={cn(shimmer, variants[variant], className)} aria-hidden />;
}