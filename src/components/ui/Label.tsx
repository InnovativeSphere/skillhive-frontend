import { cn } from '@/lib/utils';

type Props = React.LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, children, ...props }: Props) {
  return (
    <label
      className={cn(
        'block font-mono text-[11px] uppercase tracking-widest text-muted',
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}