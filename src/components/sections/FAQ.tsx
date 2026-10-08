import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Accordion } from '@/components/ui/Accordion';
import { DotMatrix } from '@/components/ui/DotMatrix';
import { faq } from '@/data/landing';
import { sectionIds } from '@/data/nav';

export function FAQ() {
  return (
    <Section
      id={sectionIds.faq}
      spacing="loose"
      className="relative overflow-hidden border-y border-border bg-surface"
    >
      <DotMatrix
        cols={8}
        rows={14}
        spacing={22}
        className="left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"
      />
      <DotMatrix
        cols={8}
        rows={14}
        spacing={22}
        className="right-0 top-1/2 translate-x-1/2 -translate-y-1/2 opacity-60"
      />

      <Container size="narrow" className="relative">
        <h2 className="font-serif text-3xl font-medium leading-[1.2] tracking-tight text-ink md:text-4xl">
          {faq.headline}
        </h2>
        <div className="mt-12">
          <Accordion items={faq.items} />
        </div>
      </Container>
    </Section>
  );
}