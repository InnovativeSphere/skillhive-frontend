import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { hero } from '@/data/landing';
import { sectionIds } from '@/data/nav';
import { HeroDashboard } from './HeroDashboard';

export function Hero() {
  return (
    <Section id={sectionIds.hero} spacing="loose" className="pt-16 md:pt-24">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {hero.eyebrow}
            </p>

            <h1 className="mt-6 font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl lg:text-6xl">
              Anyone can start
              <br />
              an academy.
              <br />
              <span className="text-muted">Anyone can learn.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              {hero.subline}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={hero.primaryCta.href} size="lg">
                {hero.primaryCta.label}
              </Button>
              <Button
                href={hero.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>

          <HeroDashboard />
        </div>
      </Container>
    </Section>
  );
}