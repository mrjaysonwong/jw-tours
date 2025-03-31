import { useState } from 'react';
import { Typography, Grid, Divider, Button, Box, Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// internal imports
import { useUserDataContext } from '@/contexts/UserProvider';
import EditPreferencesDialog from './EditPreferencesDialog';
import CustomError from '@/components/errors/CustomError';
import { LOCALE_MAP } from '@/constants/locale_map';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';
import GridItem from '@/components/grid/GridItem';

const DetailsGrid = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { user, isLoading, refetch, isError, error } = useUserDataContext();

  if (isError) return <CustomError error={error} />;

  if (isLoading) return <LoadingSpinner h="50dvh" />;

  const locale = LOCALE_MAP[user?.langCode] || 'Not provided';

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
            startIcon={<EditIcon />}
            onClick={handleEditClick}
          >
            Edit
          </Button>
        </Box>

        <Grid container sx={{ py: 2 }}>
          <GridItem label="Language" textData={locale} />

          <GridItem
            label="Newsletter Subscription"
            textData={
              !user.subscription.isSubscribed ? 'Not Subscribed' : 'Subscribed'
            }
          />
        </Grid>
      </Card>

      {isDialogOpen && (
        <EditPreferencesDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          user={user}
          refetch={refetch}
        />
      )}
    </>
  );
};

const Preferences = () => {
  return (
    <>
      <Box>
        <Typography variant="h5">Preferences</Typography>
        <Typography>
          Change your language, and subscribe to newsletter.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <DetailsGrid />
    </>
  );
};

export default Preferences;
