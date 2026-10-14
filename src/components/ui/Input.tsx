import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          'w-full rounded-lg border bg-canvas px-3.5 py-2.5 text-sm text-ink',
          'placeholder:text-muted/70',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-accent/40',
          'disabled:cursor-not-allowed disabled:opacity-60',
          invalid
            ? 'border-accent focus:border-accent'
            : 'border-border-strong focus:border-accent',
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';