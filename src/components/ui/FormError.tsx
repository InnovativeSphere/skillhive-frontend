import { cn } from '@/lib/utils';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export function FormError({ children, className }: Props) {
  if (!children) return null;
  return (
    <p
      role="alert"
      className={cn('mt-1.5 text-xs text-accent', className)}
    >
      {children}
    </p>
  );
}