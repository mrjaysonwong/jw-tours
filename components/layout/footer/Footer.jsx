'use client';

import { usePathname } from 'next/navigation';
import { Link } from '@/navigation';
import { Box, Typography, Grid, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

// internal imports
import LocaleSwitcher from './LocaleSwitcher';
import { shouldHideOnAuthPage } from '@/helpers/pageHelpers';

const Footer = () => {
  const pathname = usePathname();

  const isAuthPage = shouldHideOnAuthPage(pathname);

  if (isAuthPage) {
    return null;
  }

  return (
    <Box
      sx={{
        mt: 10,
        mb: 2,
        textAlign: 'center',

        a: {
          color: 'inherit',
          '&:hover': {
            color: 'var(--color-text-main)',
          },
        },
      }}
    >
      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '50vw',
          margin: 'auto',
          a: {
            margin: '10px',
          },
        }}
      >
        <Link href="/">
          <FacebookIcon />
        </Link>
        <Link href="/">
          <XIcon />
        </Link>
        <Link href="/">
          <InstagramIcon />
        </Link>
        <Link href="/">
          <YouTubeIcon />
        </Link>
      </Box>

      <Grid
        container
        rowSpacing={{ xs: 2 }}
        sx={{
          maxWidth: { xs: '65vw', lg: '35vw' },
          margin: 'auto',
          py: 2,
        }}
      >
        <Grid item xs={6} lg={3}>
          <Typography variant="body2">
            <Link href="#">About Us</Link>
          </Typography>
        </Grid>

        <Grid item xs={6} lg={3}>
          <Typography variant="body2">
            <Link href="#">Careers</Link>
          </Typography>
        </Grid>

        <Grid item xs={6} lg={3}>
          <Typography variant="body2">
            <Link href="#">Contact Us</Link>
          </Typography>
        </Grid>

        <Grid item xs={6} lg={3}>
          <Typography variant="body2">
            <Link href="#">FAQ&apos;s</Link>
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Grid
        container
        rowSpacing={{ xs: 3 }}
        sx={{
          maxWidth: '65vw',
          margin: 'auto',
          py: 4,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Grid item xs={12} lg={2}>
          <LocaleSwitcher />
        </Grid>
        <Grid item xs={6} lg={3}>
          <Typography variant="body2">
            <Link href="/legal/terms-of-service">Terms of Service</Link>
          </Typography>
        </Grid>
        <Grid item xs={6} lg={3}>
          <Typography variant="body2">
            <Link href="/legal/privacy-policy">Privacy Policy</Link>
          </Typography>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Typography variant="body2">©2024-2025 JW Tours</Typography>
          <Typography variant="body2">All rights reserved</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
