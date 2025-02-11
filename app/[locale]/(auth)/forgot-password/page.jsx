// internal imports
import PageLayout from '@/components/layout/PageLayout';
import EmailAuthForm from '@/app/(features)/authentication/EmailAuthForm';
import { ACTION_TYPES } from '@/constants/api';

export const metadata = {
  title: 'Forgot Password',
};

export default function ForgotPasswordPage() {
  return (
    <PageLayout marginY={10}>
      <EmailAuthForm actionType={ACTION_TYPES.SEND_PASSWORD_RESET} />
    </PageLayout>
  );
}
