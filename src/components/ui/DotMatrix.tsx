import { cn } from '@/lib/utils';

export function DotMatrix({
  cols = 12,
  rows = 6,
  spacing = 24,
  className,
}: {
  cols?: number;
  rows?: number;
  spacing?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute select-none', className)}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${spacing}px)`,
        gridTemplateRows: `repeat(${rows}, ${spacing}px)`,
      }}
    >
      {Array.from({ length: cols * rows }).map((_, i) => (
        <span
          key={i}
          className="h-1 w-1 rounded-full bg-ink/10"
        />
      ))}
    </div>
  );
}