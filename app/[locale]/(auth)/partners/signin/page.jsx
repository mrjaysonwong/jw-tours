// third-party imports
import { Card, CardContent } from '@mui/material';

// internal imports
import PageLayout from '@/components/layout/PageLayout';
import SignInForm  from '@/components/forms/SignInForm';
import AnimateGradient from '@/components/bg-gradients/AnimatedGradient';

export const metadata = {
  title: 'Partner Sign In',
};

export default function SignInPage() {
  return (
    <>
      <AnimateGradient />

      <PageLayout marginY={10}>
        <Card>
          <CardContent>
            <SignInForm
              header="Partner Sign In"
              isDashboard={true}
              showRoleSelector={true}
            />
          </CardContent>
        </Card>
      </PageLayout>
    </>
  );
}
