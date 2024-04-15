import React, { useContext } from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Avatar,
  Grid,
} from '@mui/material';
import { signOut } from 'next-auth/react';
import { UserSessionContext } from '@/context/UserSessionWrapper';
import { usePathname } from 'next/navigation';
import { checkPath } from '@/utils/common';

export function UserSectionMobile() {
  const session = useContext(UserSessionContext);
  const user = session?.user;

  const handleSignOut = () => {
    localStorage.setItem('signed-out', 'true');
    signOut();
  };

  return (
    <Box sx={{ py: 2 }}>
      <Box
        sx={{
          py: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt="User Avatar Image"
          src={user?.image}
          sx={{ width: 56, height: 56 }}
        />
        <Box>
          <Typography sx={{ ml: 2 }}>{user?.name}</Typography>
          <Typography sx={{ ml: 2 }}>{user?.email}</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          py: 2,
          textAlign: 'center',
          border: '1px solid var(--border-color)',
          borderWidth: '0px 0px 1px 0px',
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Button fullWidth>Bookings</Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth>View Rewards</Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth>Wish List</Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth>Profile Settings</Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ textAlign: 'right', py: 2 }}>
        <Button variant="contained" onClick={handleSignOut} size="small">
          Sign Out
        </Button>
      </Box>
    </Box>
  );
}

export function UserSectionNonMobile() {
  const session = useContext(UserSessionContext);
  const user = session?.user;

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
      }}
    >
      <Avatar
        alt="User Avatar Image"
        src={user?.image}
        sx={{ width: 42, height: 42 }}
      />
    </Box>
  );
}
