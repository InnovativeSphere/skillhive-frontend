'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { multiTenant } from '@/data/landing';
import { sectionIds } from '@/data/nav';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

const academies = [
  { name: 'Nour Academy', monogram: 'N', courses: 24, students: 340, tone: 'accent' as const },
  { name: 'Al-Falah Institute', monogram: 'A', courses: 18, students: 210, tone: 'ink' as const },
  { name: 'Meridian Learning', monogram: 'M', courses: 32, students: 890, tone: 'accent' as const },
  { name: 'Zaytuna Skills', monogram: 'Z', courses: 12, students: 145, tone: 'ink' as const },
  { name: 'Sakina Institute', monogram: 'S', courses: 27, students: 610, tone: 'accent' as const },
  { name: 'Baraka Academy', monogram: 'B', courses: 15, students: 320, tone: 'ink' as const },
];

export function MultiTenant() {
  return (
    <Section id={sectionIds.multiTenant} spacing="loose">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto h-px w-12 bg-accent" aria-hidden />

          <h2 className="mt-10 font-serif text-3xl font-medium leading-[1.2] tracking-tight text-ink md:text-4xl">
            One platform. Many academies.{' '}
            <span className="underline decoration-accent decoration-[3px] underline-offset-[10px]">
              Zero compromise.
            </span>
          </h2>

          <p className="mt-8 leading-relaxed text-muted md:text-lg">
            Your academy has its own address, its own instructors, its own
            students, its own revenue. It runs on the same foundation as every
            other academy on SkillHive — but nothing about it is shared.
            That&rsquo;s the difference between{' '}
            <span className="text-ink">infrastructure and a marketplace.</span>
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.08)}
          className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {academies.map((a) => (
            <motion.div
              key={a.name}
              variants={fadeUp}
              className="rounded-xl border border-border bg-surface p-6 transition-all duration-150 hover:border-border-strong hover:shadow-card"
            >
              <div
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-full font-serif text-lg font-medium',
                  a.tone === 'accent' ? 'bg-accent text-white' : 'bg-ink text-canvas',
                )}
              >
                {a.monogram}
              </div>
              <h3 className="mt-5 font-serif text-lg font-medium tracking-tight text-ink">
                {a.name}
              </h3>
              <div className="mt-4 h-px w-full bg-border-strong" aria-hidden />
              <p className="mt-4 font-mono text-xs text-muted">
                {a.courses} courses · {a.students} students
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}