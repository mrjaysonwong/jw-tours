import React, { useContext, useState } from 'react';
import { Box, IconButton, Avatar, Tooltip } from '@mui/material';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

// local imports
import ProfilePhotoDialog from './ProfilePhotoDialog';
import { UserDataContext } from '@/contexts/UserProvider';
import { SkeletonCircular } from '@/components/loaders/Skeletons';

export default function PhotoButtonSettings() {
  const { user, isLoading } = useContext(UserDataContext);
  const [open, setOpen] = useState(false);

  const handleClickPhoto = () => {
    setOpen(true);
  };

  if (isLoading) {
    return <SkeletonCircular w={64} h={64} l={1} />;
  }

  return (
    <>
      <Tooltip title="Profile photo settings" arrow placement="left">
        <IconButton onClick={handleClickPhoto}>
          <Avatar
            alt={`${user?.firstName} ${user?.lastName}`}
            src={user?.image?.url ?? '/assets/fallback_avatar.svg'}
            referrerPolicy="no-referrer"
            sx={{ width: 64, height: 64, position: 'relative' }}
          />

          <Box
            sx={{
              position: 'absolute',
              background: 'rgba(0,0,0,0.2)',
              display: 'flex',
              p: 2,
              borderRadius: '100%',
              color: 'white',
            }}
          >
            <CameraAltOutlinedIcon sx={{ height: 32, width: 32 }} />
          </Box>
        </IconButton>
      </Tooltip>

      <ProfilePhotoDialog open={open} setOpen={setOpen} />
    </>
  );
}
