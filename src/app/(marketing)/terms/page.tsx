import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { terms, legal } from '@/data/legal';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Terms of Service',
  description: 'The terms for using SkillHive.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <Section spacing="loose" className="pt-16 md:pt-24">
      <Container size="narrow">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Legal
        </p>
        <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">
          {terms.headline}
        </h1>
        <p className="mt-6 leading-relaxed text-muted md:text-lg">
          {terms.intro}
        </p>
        <p className="mt-4 font-mono text-xs text-muted">
          Last updated {legal.lastUpdated}
        </p>

        <div className="mt-16 space-y-12">
          {terms.sections.map((s, i) => (
            <div key={s.title}>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="font-serif text-xl font-medium tracking-tight text-ink">
                  {s.title}
                </h2>
              </div>
              <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}