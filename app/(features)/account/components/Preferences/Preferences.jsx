import React, { useContext, useState } from 'react';
import { Typography, Grid, Divider, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// local imports
import { UserDataContext } from '@/contexts/UserProvider';
import {
  SkeletonDetailsGrid,
  SkeletonButton,
} from '@/components/loaders/Skeletons';
import EditFormDialog from './EditFormDialog';
import { AlertMessage } from '@/components/alerts/Alerts';
import { useMessageStore } from '@/stores/messageStore';
import CustomError from '@/components/errors/500';

const languageMap = {
  en: 'English',
  fr: 'Français',
  it: 'Italian',
  ja: '日本語',
  ko: '한국인',
  zh: '中国人',
};

const DetailsGrid = () => {
  const { user, isLoading, refetch, isError, error } =
    useContext(UserDataContext);

  const [open, setOpen] = useState(false);

  const lang = languageMap[user?.languageCountry] || 'Not Provided';

  const handleEditClick = () => {
    setOpen(true);
  };

  if (isError) {
    return <CustomError error={error} />;
  }

  if (isLoading) {
    return (
      <>
        <SkeletonButton />
        <SkeletonDetailsGrid />
      </>
    );
  }

  return (
    <Box>
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
          <Typography>{lang}</Typography>
        </Grid>
      </Grid>

      <EditFormDialog
        open={open}
        setOpen={setOpen}
        user={user}
        refetch={refetch}
      />
    </Box>
  );
};

export default function Preferences() {
  const { alert, handleClose } = useMessageStore();

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

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
}
