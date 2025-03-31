// internal imports
import PageLayout from '@/components/layout/PageLayout';
import EmailAuthForm from '@/app/(features)/authentication/EmailAuthForm';
import { ACTIONS } from '@/constants/common';

export const metadata = {
  title: 'Forgot Password',
};

export default function ForgotPasswordPage() {
  return (
    <PageLayout marginY={10}>
      <EmailAuthForm action={ACTIONS.SEND_PASSWORD_RESET} />
    </PageLayout>
  );
}
