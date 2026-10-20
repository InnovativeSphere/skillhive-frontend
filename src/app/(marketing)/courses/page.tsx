import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { buildMetadata } from '@/lib/metadata';
import { PublicCourseGrid } from '@/components/sections/PublicCourseGrid';

export const metadata = buildMetadata({
  title: 'Courses',
  description: 'Browse courses from academies across SkillHive.',
  path: '/courses',
});

export default function CoursesPage() {
  return (
    <Section spacing="loose" className="pt-16 md:pt-24">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Courses
            </p>
            <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">
              Browse the catalogue.
            </h1>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              Courses from academies across SkillHive.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <PublicCourseGrid />
        </div>
      </Container>
    </Section>
  );
}