import { LoginForm } from './LoginForm';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Sign in',
  description: 'Sign in to your SkillHive account.',
  path: '/login',
});

export default function LoginPage() {
  return <LoginForm />;
}