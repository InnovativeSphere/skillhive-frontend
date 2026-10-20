import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ className, invalid, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          aria-invalid={invalid || undefined}
          className={cn(
            'w-full appearance-none rounded-lg border bg-canvas px-3.5 py-2.5 pr-10 text-sm text-ink',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-accent/40',
            'disabled:cursor-not-allowed disabled:opacity-60',
            invalid
              ? 'border-accent focus:border-accent'
              : 'border-border-strong focus:border-accent',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>
    );
  },
);
Select.displayName = 'Select';