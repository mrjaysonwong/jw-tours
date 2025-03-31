// internal imports
import PageLayout from '@/components/layout/PageLayout';
import EmailAuthForm from '@/app/(features)/authentication/EmailAuthForm';
import { ACTIONS } from '@/constants/common';

export const metadata = {
  title: 'Resend Verification',
};

export default function ResendVerificationPage() {
  return (
    <PageLayout marginY={10}>
      <EmailAuthForm action={ACTIONS.SEND_ACCOUNT_VERIFICATION} />
    </PageLayout>
  );
}
