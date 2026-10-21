import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { CourseDetailClient } from '@/components/sections/CourseDetailClient';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Course Details',
  description: 'View course details and enroll on SkillHive.',
});

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Section spacing="loose" className="pt-16 md:pt-24">
      <Container>
        <CourseDetailClient slug={slug} />
      </Container>
    </Section>
  );
}