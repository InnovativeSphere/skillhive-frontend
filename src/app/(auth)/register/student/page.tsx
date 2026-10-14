import { StudentRegisterForm } from './StudentRegisterForm';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Join as a student',
  description:
    'Create your SkillHive student account. Enroll in courses from any academy.',
  path: '/register/student',
});

export default function StudentRegisterPage() {
  return <StudentRegisterForm />;
}