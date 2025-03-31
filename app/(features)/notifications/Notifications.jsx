'use client';

import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// internal imports
import CustomTab from '@/components/tabs/CustomTab';
import { notificationsTabComponents } from '@/config/componentMapping';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';
import CustomError from '@/components/errors/CustomError';
import { useNotificationStore } from '@/stores/notificationStore';
import NotificationsMenu from '@/components/menus/NotificationsMenu';

const tabContent = [{ label: 'All' }, { label: 'Unread' }];

const NotificationsTabs = ({ value, setValue }) => {
  const { isNotificationLoading, hasError } = useNotificationStore();

  if (hasError) return <CustomError h="70vh" />;

  if (isNotificationLoading) return <LoadingSpinner h="70dvh" />;

  return (
    <Box sx={{ my: 2 }}>
      <CustomTab
        value={value}
        setValue={setValue}
        ariaLabel="Notifications tabs"
        tabContent={tabContent}
        tabPanelComponents={notificationsTabComponents}
      />
    </Box>
  );
};

const Notifications = () => {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { hasError } = useNotificationStore();

  const handleClickButton = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5">Notifications</Typography>

        <IconButton
          onClick={handleClickButton}
          sx={{ display: hasError ? 'none' : 'flex' }}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>

      <NotificationsTabs value={value} setValue={setValue} />

      <NotificationsMenu
        open={open}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
};

export default Notifications;
