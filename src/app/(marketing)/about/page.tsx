import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Tabs } from '@/components/ui/Tabs';
import { about, aboutPlatform, aboutBuilder } from '@/data/about';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'About',
  description:
    'Two stories — the platform, and the person who built it. SkillHive is a multi-tenant platform for skill-based education, built by Salim Sambo.',
  path: '/about',
});

function PlatformContent() {
  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-lg leading-relaxed text-muted md:text-xl">
        {aboutPlatform.intro}
      </p>

      <div className="mt-16 space-y-12">
        {aboutPlatform.sections.map((s) => (
          <div key={s.title}>
            <div className="flex items-center gap-4">
              <h2 className="font-serif text-xl font-medium tracking-tight text-ink">
                {s.title}
              </h2>
              <span aria-hidden className="h-px flex-1 bg-border-strong" />
            </div>
            <p className="mt-4 leading-relaxed text-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BuilderContent() {
  return (
    <div className="mx-auto max-w-2xl">
      <p className="font-serif text-2xl font-medium leading-[1.3] tracking-tight text-ink md:text-3xl">
        {aboutBuilder.intro}
      </p>

      <div className="mt-10 space-y-6">
        {aboutBuilder.paragraphs.map((p, i) => (
          <p key={i} className="leading-relaxed text-muted md:text-lg">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-16">
        <div className="mx-auto h-px w-12 bg-accent" aria-hidden />
        <p className="mt-8 text-center font-mono text-sm uppercase tracking-widest text-muted">
          {aboutBuilder.closing}
        </p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Section spacing="loose" className="pt-16 md:pt-24">
      <Container>
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {about.eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">
            {about.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-md text-muted">{about.subline}</p>
        </div>

        <div className="mt-16">
          <Tabs
            defaultTab="platform"
            tabs={[
              {
                id: 'platform',
                label: 'The Platform',
                content: <PlatformContent />,
              },
              {
                id: 'builder',
                label: 'The Builder',
                content: <BuilderContent />,
              },
            ]}
          />
        </div>
      </Container>
    </Section>
  );
}