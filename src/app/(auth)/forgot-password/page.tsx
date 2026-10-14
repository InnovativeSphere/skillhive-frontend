import { ForgotPasswordForm } from './ForgotPasswordForm';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Forgot password',
  description: 'Reset your SkillHive password.',
  path: '/forgot-password',
});

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}