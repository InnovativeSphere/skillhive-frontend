import { AcceptInviteForm } from './AcceptInviteForm';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Accept invite',
  description: 'Set your password to accept your SkillHive staff invite.',
  path: '/accept-invite',
});

export default function AcceptInvitePage() {
  return <AcceptInviteForm />;
}