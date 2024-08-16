import React, { useState, useContext } from 'react';
import { Typography, Grid, Button, Box, Divider } from '@mui/material';
import { LoadingSkeletonGrid } from '@/app/components/custom/loaders/Skeleton';
import { PersonalSettingsContext } from '../../tabs/MySettingsTabs.jsx';
import DetailsEditForm from './details-edit-form/EditFormDialog.jsx';
import CustomError from '@/app/components/custom/error/index.jsx';
import EditIcon from '@mui/icons-material/Edit';

export default function DetailsGrid() {
  const [open, setOpen] = useState(false);
  const { user, isLoading, isError, error } = useContext(
    PersonalSettingsContext
  );

  if (isError) {
    return <CustomError error={error} />;
  }

  const fullName = `${user?.firstName} ${user?.lastName}`;
  const address = user?.address;

  const street = address?.street;
  const homeTown = address?.homeTown;
  const postalCode = address?.postalCode;

  const DOB = user?.dateOfBirth
    ? new Date(user?.dateOfBirth).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Not Provided';

  const handleClickEdit = () => {
    setOpen(true);
  };

  if (isLoading) {
    return <LoadingSkeletonGrid />;
  }

  return (
    <>
      <Divider sx={{ my: 3 }} />

      <Box sx={{ textAlign: 'right' }}>
        <Button
          size="small"
          variant="contained"
          onClick={handleClickEdit}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </Box>

      <Grid
        container
        sx={{
          '.item-container': {
            width: '100%',
            borderBottom: 1,
            borderColor: 'divider',
            py: 2,
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
          },
        }}
      >
        <Box className="item-container">
          <Grid item xs={12} md={6}>
            <Typography>Full Name</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>{fullName}</Typography>
          </Grid>
        </Box>

        <Box className="item-container">
          <Grid item xs={12} md={6}>
            <Typography>Gender</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                ':first-letter': {
                  textTransform: 'uppercase',
                },
              }}
            >
              {user?.gender ? user?.gender : 'Not Provided'}
            </Typography>
          </Grid>
        </Box>

        <Box className="item-container">
          <Grid item xs={12} md={6}>
            <Typography>Date of Birth</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>{DOB}</Typography>
          </Grid>
        </Box>

        <Box className="item-container">
          <Grid item xs={12} md={6}>
            <Typography>Nationality</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>
              {user?.nationality ? user?.nationality : 'Not Provided'}
            </Typography>
          </Grid>
        </Box>

        <Box className="item-container">
          <Grid item xs={12} md={6}>
            <Typography>Address</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>
              {address
                ? [street, homeTown, postalCode].filter(Boolean).join(', ') ||
                  'Not Provided'
                : 'Not Provided'}
            </Typography>
          </Grid>
        </Box>
      </Grid>

      <DetailsEditForm open={open} setOpen={setOpen} />
    </>
  );
}
