'use client';

import Link from 'next/link';
import { Typography, Box, Grid, CardContent, IconButton } from '@mui/material';

// internal imports
import { accountSettingsLinks } from '@/data/links/accountSettingsLinks';
import { StyledContainer } from '@/components/styled/StyledContainers';
import { StyledGridCard } from '@/components/styled/StyledCards';

const AccountSettings = () => {
  return (
    <StyledContainer sx={{ minHeight: '100%' }}>
      <Typography variant="h4">Account Settings</Typography>
      <Typography>Manage your JW Tours experience</Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {accountSettingsLinks.map((item) => {
          const { href, label, icon, text } = item;

          return (
            <Grid key={label} item xs={12} sm={12} lg={4}>
              <Link href={href}>
                <StyledGridCard sx={{ height: '170px' }}>
                  <CardContent
                    sx={{ '&:hover': { bgcolor: '#80808022', width: '100%' } }}
                  >
                    <IconButton
                      disableRipple
                      sx={{
                        position: 'absolute',
                        bgcolor: '#a2a2a233',

                        svg: {
                          fontSize: '36px',
                        },
                      }}
                    >
                      {icon}
                    </IconButton>

                    <Box sx={{ ml: 7, px: 2 }}>
                      <Typography variant="h6">{label}</Typography>
                      <Typography variant="body2" sx={{ my: 1 }}>
                        {text}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: 'underline',
                          span: {
                            textTransform: 'lowercase',
                          },
                        }}
                      >
                        Manage <span>{label}</span>
                      </Typography>
                    </Box>
                  </CardContent>
                </StyledGridCard>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </StyledContainer>
  );
};

export default AccountSettings;
