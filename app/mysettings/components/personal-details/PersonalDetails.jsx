import React, { useContext, useState, createContext } from 'react';
import {
  Typography,
  Divider,
  Box,
  IconButton,
  Avatar,
  Tooltip,
} from '@mui/material';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { UserSessionContext } from '@/context/UserSessionWrapper';
import { useUserData } from '@/utils/hooks/useUserData';
import { LoadingSkeletonAvatar } from '@/app/components/custom/loaders/Skeleton';
import EditableGrid from './EditableGrid';
import ProfilePhotoDialog from './photo/ProfilePhotoDialog';

export const DialogContext = createContext(null);

export default function PersonalDetails() {
  const session = useContext(UserSessionContext);
  const [open, setOpen] = useState(false);

  const { data: user, isLoading } = useUserData(session?.user?.id);

  const handleOnClickPhoto = () => {
    setOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ mr: 1 }}>
          <Typography variant="h5">Personal details</Typography>
          <Typography>
            Update your info and find out how it&apos;s used.
          </Typography>
        </Box>

        <Tooltip title="Profile photo settings" arrow placement="left">
          <IconButton onClick={handleOnClickPhoto}>
            {isLoading ? (
              <LoadingSkeletonAvatar w={64} h={64} />
            ) : (
              <>
                <Avatar
                  alt={`${user.firstName} ${user.lastName}`}
                  src={user.image.url}
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
      </Box>

      <Divider sx={{ my: 3 }} />

      <DialogContext.Provider value={{ user, open, setOpen }}>
        <ProfilePhotoDialog />
      </DialogContext.Provider>

      <EditableGrid user={user} isLoading={isLoading} />
    </>
  );
}
