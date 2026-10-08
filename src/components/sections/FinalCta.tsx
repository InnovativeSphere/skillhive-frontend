import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { HexPattern } from '@/components/ui/HexPattern';
import { finalCta } from '@/data/landing';
import { sectionIds } from '@/data/nav';

export function FinalCta() {
  return (
    <Section
      id={sectionIds.finalCta}
      spacing="loose"
      className="relative overflow-hidden border-t border-border bg-surface"
    >
      <HexPattern className="pointer-events-none absolute inset-0 text-ink" />

      <Container size="narrow" className="relative text-center">
        <h2 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight text-ink md:text-5xl md:leading-[1.05]">
          The academy you&rsquo;ve been
          <br />
          meaning to start.
        </h2>

        <p className="mt-6 font-mono text-sm uppercase tracking-widest text-muted">
          {finalCta.subline}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href={finalCta.primaryCta.href} size="lg">
            {finalCta.primaryCta.label}
          </Button>
          <Button href={finalCta.secondaryCta.href} variant="secondary" size="lg">
            {finalCta.secondaryCta.label}
          </Button>
        </div>
      </Container>
    </Section>
  );
}