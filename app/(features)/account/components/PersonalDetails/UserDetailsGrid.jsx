import React, { useState, useContext } from 'react';
import { Typography, Grid, Button, Box, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// local imports
import {
  SkeletonDetailsGrid,
  SkeletonButton,
} from '@/components/loaders/Skeletons';
import { UserDataContext } from '@/contexts/UserProvider';
import EditFormDialog from './EditFormDialog/EditFormDialog.jsx';
import { StyledItemContainer } from '@/components/styled/StyledContainers.js';

export default function UserDetailsGrid() {
  const [open, setOpen] = useState(false);
  const { user, isLoading } = useContext(UserDataContext);

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

  const handleEditClick = () => {
    setOpen(true);
  };

  if (isLoading) {
    return (
      <>
        <SkeletonButton />
        <SkeletonDetailsGrid />
      </>
    );
  }

  return (
    <>
      <Divider sx={{ my: 3 }} />

      <Box sx={{ textAlign: 'right' }}>
        <Button
          size="small"
          variant="contained"
          onClick={handleEditClick}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </Box>

      <Grid container>
        <StyledItemContainer>
          <Grid item xs={12} md={6}>
            <Typography>Full Name</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>{fullName}</Typography>
          </Grid>
        </StyledItemContainer>

        <StyledItemContainer>
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
        </StyledItemContainer>

        <StyledItemContainer>
          <Grid item xs={12} md={6}>
            <Typography>Date of Birth</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>{DOB}</Typography>
          </Grid>
        </StyledItemContainer>

        <StyledItemContainer>
          <Grid item xs={12} md={6}>
            <Typography>Nationality</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>
              {user?.nationality ? user?.nationality : 'Not Provided'}
            </Typography>
          </Grid>
        </StyledItemContainer>

        {/* <StyledItemContainer>
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
        </StyledItemContainer> */}
      </Grid>

      <EditFormDialog open={open} setOpen={setOpen} />
    </>
  );
}
