import { Building2, GraduationCap, CreditCard, Layers } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { atAGlance } from '@/data/landing';

const icons = [Building2, GraduationCap, CreditCard, Layers];

export function AtAGlance() {
  return (
    <Section spacing="tight" className="border-y border-border bg-surface">
      <Container>
        <ul className="grid gap-4 md:grid-cols-4">
          {atAGlance.map((line, i) => {
            const Icon = icons[i];
            return (
              <li
                key={line}
                className="rounded-xl border border-border bg-canvas/40 p-5 transition-all duration-150 hover:border-border-strong hover:shadow-card"
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-accent" />
                  <span aria-hidden className="h-px flex-1 bg-border-strong" />
                </div>
                <p className="mt-4 text-sm text-ink">{line}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}