import { notFound, redirect } from 'next/navigation';
import { Typography, Divider, Card, CardContent } from '@mui/material';

// internal imports
import connectMongo from '@/lib/connectMongo';
import Token from '@/models/tokenModel';
import PasswordReset from '@/app/(features)/authentication/PasswordReset';
import PageLayout from '@/components/layout/PageLayout';
import AnimateGradient from '@/components/bg-gradients/AnimatedGradient';
import { locales } from '@/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'Set New Password',
};

export default async function ResetPasswordPage({ searchParams }) {
  const tokenParam = searchParams.token;

  if (!tokenParam) {
    redirect('/');
  }

  // connect to database
  await connectMongo();

  const tokenExists = await Token.findOne({
    'email.token': tokenParam,
  }).select('userId email.$');

  const requestDone = tokenExists?.email[0].requestCount >= 1;

  if (!tokenExists || requestDone) {
    redirect('/notifications/authentication-failed');
  }

  return (
    <>
      <AnimateGradient />

      <PageLayout marginY={10}>
        <Card>
          <CardContent>
            <Typography variant="h5">Set New Password</Typography>

            <Divider sx={{ my: 2 }} />

            <PasswordReset token={tokenParam} />
          </CardContent>
        </Card>
      </PageLayout>
    </>
  );
}
