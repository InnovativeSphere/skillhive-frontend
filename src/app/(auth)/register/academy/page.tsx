import { AcademyRegisterForm } from './AcademyRegisterForm';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Start your academy',
  description:
    'Register your academy on SkillHive. Courses, instructors, students, payments — all handled.',
  path: '/register/academy',
});

export default function AcademyRegisterPage() {
  return <AcademyRegisterForm />;
}