import { Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { pricing } from '@/data/landing';
import { sectionIds } from '@/data/nav';
import { cn } from '@/lib/utils';

export function Pricing() {
  return (
    <Section id={sectionIds.pricing} spacing="loose">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-medium leading-[1.2] tracking-tight text-ink md:text-4xl">
            {pricing.headline}
          </h2>
          <p className="mt-6 text-muted md:text-lg">{pricing.subline}</p>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {pricing.tiers.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                'flex flex-col rounded-xl border bg-surface p-6 transition-all duration-150 md:p-8',
                tier.featured
                  ? 'border-accent shadow-card'
                  : 'border-border hover:border-border-strong hover:shadow-card',
              )}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  {tier.name}
                </span>
                {tier.featured && (
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                    Popular
                  </span>
                )}
                <span aria-hidden className="h-px flex-1 bg-border-strong" />
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-3xl font-medium tracking-tight text-ink md:text-4xl">
                  {tier.price}
                </span>
                {tier.cadence && (
                  <span className="font-mono text-xs text-muted">
                    {tier.cadence}
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                {tier.description}
              </p>

              <div className="my-6 h-px w-full bg-border-strong" aria-hidden />

              <ul className="space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check
                      size={14}
                      className="mt-1 shrink-0 text-accent"
                      aria-hidden
                    />
                    <span className="text-ink">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-2">
                <Button
                  href={tier.cta.href}
                  variant={tier.featured ? 'primary' : 'secondary'}
                  className="w-full justify-center"
                >
                  {tier.cta.label}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}