import { VerifyOtpForm } from './VerifyOtpForm';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Verify your email',
  description: 'Enter the 6-digit code we sent to your email.',
  path: '/verify-otp',
});

export default function VerifyOtpPage() {
  return <VerifyOtpForm />;
}