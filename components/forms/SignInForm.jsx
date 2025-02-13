// third-party imports
import Link from 'next/link';
import { Typography, Divider, Chip, Box } from '@mui/material';

// internal imports
import SignInFormFields from '@/app/(features)/authentication/SignInFormFields';
import { StyledSignInWithContainer } from '@/components/styled/StyledContainers';
import OAuth from '@/app/(features)/authentication/OAuth';
import RoleSelector from '@/app/(features)/authentication/RoleSelector';
import { PATHNAMES } from '@/constants/pathname';

const SignInForm = ({ header, isDashboard, showRoleSelector }) => {
  return (
    <>
      {header && (
        <>
          <Typography variant="h5">{header}</Typography>

          <Divider sx={{ my: 2 }} />
        </>
      )}

      {showRoleSelector && <RoleSelector />}

      <SignInFormFields />

      {!isDashboard && (
        <>
          <Divider sx={{ my: 2 }}>
            <Chip label="or" />
          </Divider>

          <Typography sx={{ mb: 2 }}>Sign in with</Typography>

          <StyledSignInWithContainer>
            <OAuth />
          </StyledSignInWithContainer>

          <Box sx={{ mt: 2 }}>
            <Typography>You are a Guide or Travel Agent?</Typography>
            <Typography>
              <Link href={PATHNAMES.PARTER_SIGNIN} scroll={false}>
                Use the Partners Sign In
              </Link>
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography textAlign="center">
            New to JW Tours?{' '}
            <Link href={PATHNAMES.SIGNUP} scroll={false}>
              Sign up
            </Link>
          </Typography>
        </>
      )}
    </>
  );
};


export default SignInForm