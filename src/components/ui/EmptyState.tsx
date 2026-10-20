import { LiquidIcon } from './LiquidIcon';
import { Button } from './Button';
import { cn } from '@/lib/utils';

type Props = {
  icon: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  href?: string;
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  href,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-strong bg-surface/30 px-6 py-20 text-center',
        className,
      )}
    >
      <LiquidIcon icon={icon} />
      
      <h2 className="mt-6 font-serif text-2xl font-medium tracking-tight text-ink">
        {title}
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
        {description}
      </p>

      {actionLabel && (
        <div className="mt-8">
          <Button href={href} onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}