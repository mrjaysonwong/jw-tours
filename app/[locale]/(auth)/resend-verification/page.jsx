// internal imports
import PageLayout from '@/components/layout/PageLayout';
import EmailAuthForm from '@/app/(features)/authentication/EmailAuthForm';
import { ACTION_TYPES } from '@/constants/api';

export const metadata = {
  title: 'Resend Verification',
};

export default function ResendVerificationPage() {
  return (
    <PageLayout marginY={10}>
      <EmailAuthForm actionType={ACTION_TYPES.SEND_ACCOUNT_VERIFICATION} />
    </PageLayout>
  );
}
