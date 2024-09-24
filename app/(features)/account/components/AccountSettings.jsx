'use client';

import Link from 'next/link';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';

// local imports
import { accountSettingsLinks } from '@/data/links/accountSettingsLinks';
import { StyledContainer } from '@/components/styled/StyledContainers';
import { StyledGridCard } from '@/components/styled/StyledCards';

export default function AccountSettings() {
  return (
    <StyledContainer>
      <Typography variant="h4">Account Settings</Typography>
      <Typography>Manage your JW Tours experience</Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {accountSettingsLinks.map((item) => {
          const { href, tabName, icon, text } = item;

          return (
            <Grid key={tabName} item xs={12} md={6} lg={6}>
              <Link href={href}>
                <StyledGridCard sx={{ height: '160px' }}>
                  <CardContent>
                    <IconButton
                      disableRipple
                      sx={{
                        position: 'absolute',
                        bgcolor: 'var(--icon-bgcolor)',

                        svg: {
                          fontSize: '36px',
                        },
                      }}
                    >
                      {icon}
                    </IconButton>

                    <Box sx={{ ml: 7, px: 2 }}>
                      <Typography variant="h6">{tabName}</Typography>
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
                        Manage <span>{tabName}</span>
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
}
