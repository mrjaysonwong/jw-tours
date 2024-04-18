'use client';

import Link from 'next/link';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: ' calc(100vw - 1px)',
        py: 4,
        mt: 8,
        color: 'gray',

        '& p:not(:last-child):after': {
          content: "'|'",
          mx: 1,
        },

        a: {
          color: 'var(--link-color)',
        },
      }}
    >
      <Typography variant="body2">
        <Link href="/legal/user-agreement" replace>
          User Agreement
        </Link>
      </Typography>

      <Typography variant="body2">
        <Link href="/legal/privacy-policy" replace>
          Privacy Policy
        </Link>
      </Typography>
    </Box>
  );
}
