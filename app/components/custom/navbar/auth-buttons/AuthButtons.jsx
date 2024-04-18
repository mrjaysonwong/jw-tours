import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Button } from '@mui/material';
import { signIn } from 'next-auth/react';
import { checkPath } from '@/utils/common';

export function AuthButtonsMobile() {
  const pathname = usePathname();
  const isAuthPage = checkPath(pathname);

  if (isAuthPage) {
    return null;
  }

  return (
    <Box sx={{ my: 2 }}>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => signIn()}
        sx={{ mb: 2 }}
      >
        Sign In
      </Button>
      <a href="/signup">
        <Button
          fullWidth
          variant="contained"
          sx={{ bgcolor: 'RebeccaPurple', color: 'white' }}
        >
          Sign Up
        </Button>
      </a>
    </Box>
  );
}

export function AuthButtonsNonMobile() {
  const pathname = usePathname();
  const isAuthPage = checkPath(pathname);

  if (isAuthPage) {
    return null;
  }

  return (
    <Box
      sx={{
        ml: 'auto',
        display: { xs: 'none', md: 'none', lg: 'flex' },
        alignItems: 'center',

        button: {
          textTransform: 'none',
        },
      }}
    >
      <Button
        size="small"
        variant="outlined"
        onClick={() => signIn()}
        sx={{ mr: 1 }}
      >
        Sign In
      </Button>
      <a href="/signup">
        <Button
          size="small"
          variant="contained"
          sx={{ bgcolor: 'RebeccaPurple', color: 'white' }}
        >
          Sign Up
        </Button>
      </a>
    </Box>
  );
}
