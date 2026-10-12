import { BookOpen } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { buildMetadata } from '@/lib/metadata';
import { formatCurrency } from '@/lib/format';

export const metadata = buildMetadata({
  title: 'Courses',
  description:
    'Browse courses from academies across SkillHive. Enrollment opening soon.',
  path: '/courses',
});

const previewCourses = [
  { title: 'Introduction to React', academy: 'Nour Academy', instructor: 'Yusuf Ali', price: 12000, level: 'Beginner' },
  { title: 'Advanced TypeScript', academy: 'Meridian Learning', instructor: 'Aisha Bello', price: 18000, level: 'Advanced' },
  { title: 'Design Systems 101', academy: 'Sakina Institute', instructor: 'Fatima Yusuf', price: 0, level: 'Beginner' },
  { title: 'Backend Patterns with .NET', academy: 'Al-Falah Institute', instructor: 'Ibrahim Musa', price: 25000, level: 'Intermediate' },
  { title: 'PostgreSQL for Developers', academy: 'Zaytuna Skills', instructor: 'Umar Sani', price: 15000, level: 'Intermediate' },
  { title: 'UI Engineering Foundations', academy: 'Baraka Academy', instructor: 'Halima Ahmed', price: 20000, level: 'Beginner' },
];

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
              Courses from academies across SkillHive. Enrollment opens soon —
              here&rsquo;s a preview of what&rsquo;s coming.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Preview
          </span>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {previewCourses.map((c) => (
            <div
              key={c.title}
              className="overflow-hidden rounded-xl border border-border bg-surface transition-all duration-150 hover:border-border-strong hover:shadow-card"
            >
              <div className="relative flex aspect-[16/9] items-center justify-center bg-ink">
                <BookOpen size={24} className="text-canvas/40" aria-hidden />
                <span className="absolute bottom-3 left-3 rounded-full bg-canvas/90 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink">
                  {c.level}
                </span>
              </div>
              <div className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {c.academy}
                </p>
                <h2 className="mt-2 font-serif text-lg font-medium tracking-tight text-ink">
                  {c.title}
                </h2>
                <div className="mt-4 h-px w-full bg-border-strong" aria-hidden />
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-muted">
                    {c.instructor}
                  </span>
                  <span className="font-serif text-sm font-medium text-ink">
                    {c.price === 0 ? 'Free' : formatCurrency(c.price)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}