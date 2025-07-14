import { auth } from '@/auth';
// third-party imports
import { redirect } from 'next/navigation';
import { Card, CardContent } from '@mui/material';

// internal imports
import PageLayout from '@/components/layout/PageLayout';
import SignInForm from '@/components/forms/SignInForm';
import AnimateGradient from '@/components/bg-gradients/AnimatedGradient';
import { locales } from '@/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

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
              isDashboard={true}
              showRoleSelector={false}
            />
          </CardContent>
        </Card>
      </PageLayout>
    </>
  );
}
