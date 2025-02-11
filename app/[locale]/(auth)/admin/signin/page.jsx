import { auth } from '@/auth';
// third-party imports
import { redirect } from 'next/navigation';
import { Card, CardContent } from '@mui/material';

// internal imports
import PageLayout from '@/components/layout/PageLayout';
import { SignInForm } from '@/app/(features)/authentication/SignInForm';
import AnimateGradient from '@/components/bg-gradients/AnimatedGradient';

export const metadata = {
  title: 'Admin Sign In',
};

export default async function SignInPage() {
  const session = await auth();

  if (session?.user?.role === 'admin') redirect('/admin/dashboard');

  return (
    <>
      <AnimateGradient />

      <PageLayout marginY={10}>
        <Card>
          <CardContent>
            <SignInForm
              header="Admin Sign In"
              showOAuth={false}
              showRoleSelector={false}
            />
          </CardContent>
        </Card>
      </PageLayout>
    </>
  );
}
