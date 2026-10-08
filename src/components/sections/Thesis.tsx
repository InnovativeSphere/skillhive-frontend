import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { thesis } from '@/data/landing';
import { sectionIds } from '@/data/nav';

export function Thesis() {
  return (
    <Section id={sectionIds.thesis} spacing="loose">
      <Container size="narrow" className="text-center">
        <div className="mx-auto h-px w-12 bg-accent" aria-hidden />

        <h2 className="mt-10 font-serif text-3xl font-medium leading-[1.2] tracking-tight text-ink md:text-5xl md:leading-[1.15]">
          Most platforms make you join.{' '}
          <span className="underline decoration-accent decoration-[3px] underline-offset-[10px]">
            SkillHive lets you build.
          </span>
        </h2>

        <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          An academy on SkillHive is yours. Your name, your courses, your
          students, your revenue. Students aren&rsquo;t locked inside one
          academy either — they enroll wherever the teaching is good. The
          platform exists to serve the teaching,{' '}
          <span className="text-ink">not to own it.</span>
        </p>
      </Container>
    </Section>
  );
}