// third-party imports
import { Card, CardContent } from '@mui/material';

// internal imports
import { auth } from '@/auth';
import { redirect } from '@/navigation';
import { createMetadata } from '@/helpers/metadataHelpers';
import PageLayout from '@/components/layout/PageLayout';
import SignUpForm from '@/components/forms/SignUpForm';
import AnimateGradient from '@/components/bg-gradients/AnimatedGradient';

export async function generateMetadata({ params: { locale } }) {
  return createMetadata(locale, 'signup_page', 'meta_title.signup');
}

export default async function SignUpPage() {
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
            <SignUpForm header="Sign Up" showCancel={false} />
          </CardContent>
        </Card>
      </PageLayout>
    </>
  );
}
