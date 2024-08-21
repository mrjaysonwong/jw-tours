import React, { useContext, useState } from 'react';
import { Typography, Grid, Divider, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { PersonalSettingsContext } from '../tabs/MySettingsTabs';
import {
  LoadingSkeletonGrid,
  LoadingSkeletonButton,
} from '@/app/components/custom/loaders/Skeleton';
import EditFormDialog from './components/EditFormDialog';
import { AlertMessage } from '@/app/components/custom/texts';
import { useMessageStore } from '@/stores/messageStore';

const languageMap = {
  en: 'English',
  fr: 'Français',
  it: 'Italian',
  ja: '日本語',
  ko: '한국인',
  zh: '中国人',
};

export function DetailsGrid() {
  const { user, isLoading, refetch } = useContext(PersonalSettingsContext);

  const [open, setOpen] = useState(false);

  const lang = languageMap[user?.languageCountry] || 'Not Provided';

  if (isLoading) {
    return (
      <>
        <LoadingSkeletonButton h={32} w={120} /> <LoadingSkeletonGrid />
      </>
    );
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Box>
      <Box sx={{ textAlign: 'right' }}>
        <Button
          size="small"
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleClickOpen}
        >
          Edit
        </Button>
      </Box>

      <Grid container sx={{ div: { py: { lg: 2 } } }}>
        <Grid item xs={12} lg={6}>
          <Typography>Language</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography>{lang}</Typography>
        </Grid>
      </Grid>

      {open && (
        <EditFormDialog
          open={open}
          setOpen={setOpen}
          user={user}
          refetch={refetch}
        />
      )}
    </Box>
  );
}

export default function Preferences() {
  const { alert, handleClose } = useMessageStore();

  return (
    <>
      <Typography variant="h5">Preferences</Typography>
      <Typography>
        Change your language, and accessibility requirements.
      </Typography>

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
