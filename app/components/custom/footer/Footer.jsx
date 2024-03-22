'use client';

import Link from 'next/link';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        py: 4,
        mt: 10,
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
        <Link href="/" replace>
          Terms of use
        </Link>
      </Typography>

      <Typography variant="body2">
        <Link href="/" replace>
          Privacy policy
        </Link>
      </Typography>
    </Box>
  );
}
