import { useContext } from 'react';
import {
  Typography,
  Box,
  IconButton,
  Card,
  Grid,
  Skeleton,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PersonalSettingsContext } from '../../PersonalDetails';

export default function MobileNumbers() {
  const { user, isLoading } = useContext(PersonalSettingsContext);
  const dialCode = user?.phone?.dialCode;
  const phoneNumber = user?.phone?.phoneNumber;
  const dialNumber = `(+${dialCode}) ${phoneNumber}`;

  return (
    <>
      <Grid item xs={12} md={6}>
        <Typography variant="h5">My Mobile Numbers</Typography>
        <Typography>
          View and manage all of the mobile numbers associated with your
          account.
        </Typography>
        {!dialCode ? (
          <Box textAlign={'center'}>
            <Button sx={{ my: 2 }}>Add Mobile Number</Button>
          </Box>
        ) : isLoading ? (
          <Skeleton height={80} />
        ) : (
          <Box sx={{ position: 'relative' }}>
            <Card sx={{ p: 2, my: 2 }}>
              {dialCode && phoneNumber && dialNumber}
            </Card>
            <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </Grid>
    </>
  );
}
