import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { features } from '@/data/landing';
import { sectionIds } from '@/data/nav';

export function Features() {
  return (
    <Section
      id={sectionIds.features}
      className="border-y border-border bg-surface"
    >
      <Container>
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Product
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={f.id}
              className="rounded-xl border border-border bg-canvas/40 p-6 transition-all duration-150 hover:border-border-strong hover:shadow-card md:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span aria-hidden className="h-px flex-1 bg-border-strong" />
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  {f.label}
                </span>
              </div>
              <h3 className="mt-6 font-serif text-2xl font-medium tracking-tight text-ink">
                {f.headline}
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}