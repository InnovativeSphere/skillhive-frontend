import { Building2, GraduationCap, Shield, User } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { roles } from '@/data/landing';
import { sectionIds } from '@/data/nav';

const icons = [Building2, GraduationCap, Shield, User];

export function Roles() {
  return (
    <Section id={sectionIds.roles} spacing="loose">
      <Container>
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Roles
        </p>

        <h2 className="mt-4 max-w-2xl font-serif text-3xl font-medium leading-[1.2] tracking-tight text-ink md:text-4xl">
          {roles.headline}
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {roles.items.map((r, i) => {
            const Icon = icons[i];
            return (
              <div
                key={r.role}
                className="rounded-xl border border-border bg-surface p-6 transition-all duration-150 hover:border-border-strong hover:shadow-card"
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-accent" />
                  <span aria-hidden className="h-px flex-1 bg-border-strong" />
                </div>
                <h3 className="mt-5 font-serif text-lg font-medium tracking-tight text-ink">
                  {r.role}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {r.body}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}