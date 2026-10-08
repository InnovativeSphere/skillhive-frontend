import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { DotMatrix } from '@/components/ui/DotMatrix';
import { capability } from '@/data/landing';
import { sectionIds } from '@/data/nav';

export function Capability() {
  return (
    <Section
      id={sectionIds.capability}
      spacing="loose"
      className="relative overflow-hidden border-y border-border bg-surface"
    >
      <DotMatrix
        cols={10}
        rows={12}
        spacing={22}
        className="left-0 top-1/2 -translate-x-1/3 -translate-y-1/2 opacity-70"
      />
      <DotMatrix
        cols={10}
        rows={12}
        spacing={22}
        className="right-0 top-1/2 translate-x-1/3 -translate-y-1/2 opacity-70"
      />

      <Container size="narrow" className="relative text-center">
        <div className="mx-auto h-px w-12 bg-accent" aria-hidden />

        <p className="mt-10 font-mono text-xs uppercase tracking-widest text-muted">
          {capability.headline}
        </p>

        <p className="mt-8 font-serif text-2xl font-medium leading-[1.4] tracking-tight text-ink md:text-3xl md:leading-[1.35]">
          {capability.intro}
        </p>

        <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-muted md:text-lg">
          {capability.body}
        </p>

        <p className="mt-10 font-serif text-xl font-medium tracking-tight text-ink md:text-2xl">
          <span className="underline decoration-accent decoration-[3px] underline-offset-[10px]">
            {capability.closing}
          </span>
        </p>
      </Container>
    </Section>
  );
}