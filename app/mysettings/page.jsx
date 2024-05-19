import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import { accountSettingsRoutes } from '@/src/routes/account-settings-routes';

export default async function MySettingsPage() {
  const session = await auth();

  if (!session) redirect('/signin');

  return (
    <MainContainer>
      <Typography variant="h4" sx={{ mt: 12 }}>
        Account settings
      </Typography>
      <Typography>Manage your JW Tours experience</Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {accountSettingsRoutes.map((item) => (
          <Grid key={item.tabName} item xs={12} md={6} lg={6}>
            <Link href={`${item.path}`}>
              <Card
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItem: 'center',

                  '&:hover': {
                    color: 'var(--text-link-color-blue)',
                  },
                }}
              >
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
                    {item.icon}
                  </IconButton>

                  <Box sx={{ ml: 7, px: 2 }}>
                    <Typography variant="h6">{item.tabName}</Typography>
                    <Typography variant="body2" sx={{ my: 1 }}>
                      {item.text}
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
                      Manage <span>{item.tabName}</span>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </MainContainer>
  );
}
