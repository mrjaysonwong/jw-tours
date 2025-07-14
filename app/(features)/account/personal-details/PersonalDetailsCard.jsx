import React, { useState } from 'react';
import { Card, Grid, Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// internal imports
import { useUserDetailsContext } from '@/contexts/UserProvider';
import { useUserSessionContext } from '@/contexts/UserProvider';
import EditDetailsDialog from '@/app/(features)/account/personal-details/EditDetailsDialog';
import GridItem from '@/components/grid/GridItem';
import { getAddressParts } from '@/utils/common';

const PersonalDetailsCard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useUserDetailsContext();
  const session = useUserSessionContext();
  const isAdmin = session.user.role === 'admin';

  const fullName = `${user?.firstName} ${user?.lastName}`;
  const address = user?.address;

  const formattedAddress =
    address &&
    getAddressParts(address, [
      'name',
      'neighbourhood',
      'city',
      'state',
      'postcode',
      'country',
    ]).join(', ');

  const DOB = user?.dateOfBirth
    ? new Date(user?.dateOfBirth).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Not provided';

  const handleEditClick = () => {
    setIsDialogOpen(true);
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
          <GridItem label="Full Name" textData={fullName} />

          {isAdmin && <GridItem label="Role" textData={user.role} />}

          <GridItem label="Gender" textData={user.gender || 'Not provided'} />

          <GridItem label="Date of Birth" textData={DOB} />

          <GridItem
            label="Nationality"
            textData={user.nationality || 'Not provided'}
          />

          <GridItem
            label={user.languages.length > 1 ? 'Languages' : 'Language'}
            textData={user.languages.join(', ') || 'Not provided'}
          />

          <GridItem
            label="Address"
            textData={
              address ? formattedAddress || 'Not provided' : 'Not provided'
            }
          />
        </Grid>
      </Card>

      {isDialogOpen && (
        <EditDetailsDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
    </>
  );
};

export default PersonalDetailsCard;
