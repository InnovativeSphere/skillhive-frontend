import { Construction } from 'lucide-react';
import { Container } from './Container';
import { Button } from './Button';

type Props = {
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
};

export function ComingSoon({
  title,
  description,
  backHref = '/dashboard',
  backLabel = 'Back to Overview',
}: Props) {
  return (
    <Container size="narrow" className="py-20 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface">
        <Construction size={28} className="text-accent" />
      </div>

      <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">
        Phase 2 Module
      </p>
      <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-ink md:text-4xl">
        {title}
      </h1>
      <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
        {description}
      </p>

      <div className="mt-10">
        <Button href={backHref} variant="secondary">
          {backLabel}
        </Button>
      </div>
    </Container>
  );
}