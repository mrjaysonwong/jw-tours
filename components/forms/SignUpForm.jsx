'use client';

// third-party imports
import Link from 'next/link';
import { Typography, Divider, Box } from '@mui/material';

// internal imports
import SignUpFormFields from '@/app/(features)/authentication/SignUpFormFields';
import { PATHNAMES } from '@/constants/pathname';

const SignUpForm = ({ header, showCancel }) => {
  return (
    <>
      {header && (
        <>
          <Typography variant="h5">{header}</Typography>

          <Divider sx={{ my: 2 }} />
        </>
      )}

      <SignUpFormFields showCancel={showCancel} />

      <Box sx={{ my: 2 }}>
        <Typography>
          <span>
            By creating an account, you agree to our
            <span style={{ margin: '0 5px' }}>
              <Link href="/legal/terms-of-service" target="_blank">
                Terms of Service,
              </Link>
            </span>
            and
            <span style={{ margin: '0 5px' }}>
              <Link href="/legal/privacy-policy" target="_blank">
                Privacy Policy.
              </Link>
            </span>
          </span>
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography textAlign="center">
        Already have an account?{' '}
        <Link href={PATHNAMES.SIGNIN} scroll={false}>
          Sign in
        </Link>
      </Typography>
    </>
  );
};

export default SignUpForm;
