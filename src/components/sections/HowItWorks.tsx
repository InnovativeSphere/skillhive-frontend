import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { howItWorks } from '@/data/landing';
import { sectionIds } from '@/data/nav';

export function HowItWorks() {
  return (
    <Section
      id={sectionIds.howItWorks}
      className="border-y border-border bg-surface"
    >
      <Container>
        <h2 className="max-w-2xl font-serif text-3xl font-medium leading-[1.2] tracking-tight text-ink md:text-4xl">
          {howItWorks.headline}
        </h2>

        <div className="mt-16 grid gap-4 md:grid-cols-4">
          {howItWorks.steps.map((s) => (
            <div
              key={s.step}
              className="rounded-xl border border-border bg-canvas/40 p-6 transition-all duration-150 hover:border-border-strong hover:shadow-card"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm text-accent">{s.step}</span>
                <span aria-hidden className="h-px flex-1 bg-border-strong" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-medium tracking-tight text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}