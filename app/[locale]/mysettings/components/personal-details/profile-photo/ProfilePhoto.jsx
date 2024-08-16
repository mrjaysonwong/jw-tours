import React, { useContext, useState } from 'react';
import { Box, IconButton, Avatar, Tooltip } from '@mui/material';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import ProfilePhotoDialog from './ProfilePhotoDialog';
import { PersonalSettingsContext } from '../../tabs/MySettingsTabs';
import { LoadingSkeletonAvatar } from '@/app/components/custom/loaders/Skeleton';
import { ErrorTooltip } from '@/app/components/custom/error';

export default function ProfilePhoto() {
  const { user, isLoading, isError } = useContext(PersonalSettingsContext);
  const [open, setOpen] = useState(false);

  const handleOnClickPhoto = () => {
    setOpen(true);
  };

  return (
    <>
      {isError ? (
        <ErrorTooltip />
      ) : (
        <>
          <Tooltip title="Profile photo settings" arrow placement="left">
            <IconButton onClick={handleOnClickPhoto}>
              {isLoading ? (
                <LoadingSkeletonAvatar w={64} h={64} />
              ) : (
                <>
                  <Avatar
                    alt={`${user?.firstName} ${user?.lastName}`}
                    src={user?.image?.url ?? '/assets/user.png'}
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
                </>
              )}
            </IconButton>
          </Tooltip>
        </>
      )}

      <ProfilePhotoDialog open={open} setOpen={setOpen} />
    </>
  );
}
