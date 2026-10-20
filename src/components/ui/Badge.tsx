import { cn } from '@/lib/utils';
import type { CourseStatus } from '@/types/api';

type Props = {
  status?: CourseStatus;
  children?: React.ReactNode;
  className?: string;
};

const statusStyles: Record<CourseStatus, string> = {
  DRAFT: 'bg-surface text-muted border-border',
  PENDING_REVIEW: 'bg-accent/10 text-accent border-accent/20',
  PUBLISHED: 'bg-accent text-white border-accent',
  REJECTED: 'bg-red-500/10 text-red-500 border-red-500/20',
  ARCHIVED: 'bg-ink/10 text-ink border-ink/20',
};

export function Badge({ status, children, className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest',
        status ? statusStyles[status] : 'bg-surface text-muted border-border',
        className,
      )}
    >
      {status ? status.replace('_', ' ') : children}
    </span>
  );
}