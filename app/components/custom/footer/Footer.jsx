'use client';

import { Link } from '@/navigation';
import Image from 'next/image';
import { Box, Typography, Grid, Divider, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === 'light';

  return (
    <Box
      sx={{
        mt: 10,
        mb: 2,
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
            color: 'inherit',
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
          maxWidth: '50vw',
          py: 2,
          textAlign: 'center',
          margin: 'auto',

          a: {
            color: 'inherit',
            '&:hover': {
              color: 'var(--palette-orange)',
            },
          },
        }}
      >
        <Grid item xs={6} lg={2}>
          <Typography variant="body2">
            <Link href="#">About Us</Link>
          </Typography>
        </Grid>
        <Grid item xs={6} lg={2}>
          <Typography variant="body2">
            <Link href="#">Contact Us</Link>
          </Typography>
        </Grid>
        <Grid item xs={6} lg={2}>
          <Typography variant="body2">
            <Link href="#">Careers</Link>
          </Typography>
        </Grid>
        <Grid item xs={6} lg={2}>
          <Typography variant="body2">
            <Link href="/blog">Blog</Link>
          </Typography>
        </Grid>

        <Grid item xs={6} lg={2}>
          <Typography variant="body2">
            <Link href="/legal/user-agreement">User Agreement</Link>
          </Typography>
        </Grid>

        <Grid item xs={6} lg={2}>
          <Typography variant="body2">
            <Link href="/legal/privacy-policy">Privacy Policy</Link>
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: { xs: 'block', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" sx={{ mr: 1 }}>
          Developed by:
        </Typography>
        <Image
          src={
            isLightMode
              ? '/assets/mrjw-logo-dark.png'
              : '/assets/mrjw-logo-light.png'
          }
          width={124}
          height={65}
          priority
          quality={100}
          alt="app logo"
        />
      </Box>
    </Box>
  );
}
