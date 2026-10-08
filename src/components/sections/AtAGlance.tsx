import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { atAGlance } from '@/data/landing';

export function AtAGlance() {
  return (
    <Section spacing="tight" className="border-y border-border bg-surface">
      <Container>
        <ul className="grid gap-6 md:grid-cols-4">
          {atAGlance.map((line) => (
            <li key={line} className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
              />
              <span className="text-sm text-ink">{line}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}