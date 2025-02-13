// third-party imports
import { Card, CardContent } from '@mui/material';

// internal imports
import { auth } from '@/auth';
import { redirect } from '@/navigation';
import PageLayout from '@/components/layout/PageLayout';
import SignInForm from '@/components/forms/SignInForm';
import AnimateGradient from '@/components/bg-gradients/AnimatedGradient';

export const metadata = {
  title: 'Sign In',
};

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <>
      <AnimateGradient />

      <PageLayout marginY={5}>
        <Card>
          <CardContent>
            <SignInForm header="Sign In" isDashboard={false} showCancel={true} />
          </CardContent>
        </Card>
      </PageLayout>
    </>
  );
}
