import { useState } from 'react';
import { Typography, Grid, Divider, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// internal imports
import { useUserDataContext } from '@/contexts/UserProvider';
import EditPreferencesDialog from './EditPreferencesDialog';
import CustomError from '@/components/errors/CustomError';
import { LOCALE_MAP } from '@/constants/locale_map';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';

const DetailsGrid = () => {
  const [open, setOpen] = useState(false);

  const { user, isLoading, refetch, isError, error } = useUserDataContext();

  if (isError) return <CustomError error={error} />;

  if (isLoading) return <LoadingSpinner h="50dvh" />;

  const locale = LOCALE_MAP[user?.langCode] || 'Not Provided';

  const handleEditClick = () => {
    setOpen(true);
  };

  return (
    <>
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
        <Grid item xs={12} lg={6}>
          <Typography>Language</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography>{locale}</Typography>
        </Grid>
      </Grid>

      <EditPreferencesDialog
        open={open}
        setOpen={setOpen}
        user={user}
        refetch={refetch}
      />
    </>
  );
};

const Preferences = () => {
  return (
    <>
      <Box>
        <Typography variant="h5">Preferences</Typography>
        <Typography>
          Change your language, and accessibility requirements.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <DetailsGrid />
    </>
  );
};

export default Preferences;
