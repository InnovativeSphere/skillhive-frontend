import { ResetPasswordForm } from './ResetPasswordForm';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Set new password',
  description: 'Choose a new password for your SkillHive account.',
  path: '/reset-password',
});

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}