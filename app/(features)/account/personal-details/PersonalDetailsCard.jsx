import React, { useState } from 'react';
import { Card, Grid, Box, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// internal imports
import { useUserDetailsContext } from '@/contexts/UserProvider';
import { useUserSessionContext } from '@/contexts/UserProvider';
import { StyledItemContainer } from '@/components/styled/StyledContainers.js';
import EditDetailsDialog from '@/app/(features)/account/personal-details/EditDetailsDialog';

const PersonalDetailsCard = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUserDetailsContext();
  const session = useUserSessionContext();
  const isAdmin = session.user.role === 'admin';

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

  return (
    <>
      <Card sx={{ px: 2, py: 3 }}>
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
              <Typography sx={{ textTransform: 'capitalize' }}>
                {fullName}
              </Typography>
            </Grid>
          </StyledItemContainer>

          {isAdmin && (
            <StyledItemContainer>
              <Grid item xs={12} md={6}>
                <Typography>Role</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography sx={{ textTransform: 'capitalize' }}>
                  {user.role}
                </Typography>
              </Grid>
            </StyledItemContainer>
          )}

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

          <StyledItemContainer>
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
          </StyledItemContainer>
        </Grid>
      </Card>

      {open && <EditDetailsDialog open={open} setOpen={setOpen} />}
    </>
  );
};

export default PersonalDetailsCard;
