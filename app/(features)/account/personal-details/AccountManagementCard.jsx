import { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Switch,
} from '@mui/material';
import axios from 'axios';

// internal imports
import { ProfilePhotoProvider } from '@/contexts/ProfilePhotoProvider';
import {
  useUserDetailsContext,
  useUserSessionContext,
} from '@/contexts/UserProvider';
import ProfileAvatar from '@/components/images/ProfileAvatar';
import { ProfilePhotoDialog } from '@/app/(features)/account/photo-settings';
import { statusLabelColorMap } from '@/constants/statusColorMaps';
import { API_URLS } from '@/constants/apiRoutes';
import { errorHandler } from '@/helpers/errorHelpers';
import { useMessageStore } from '@/stores/messageStore';

const StatusBadge = ({ userStatus, color, alphaColor }) => (
  <Box sx={{ textAlign: 'right' }}>
    <Typography
      variant="body2"
      sx={{
        p: 1,
        borderRadius: '6px',
        bgcolor: alphaColor,
        display: 'inline-block',
        fontWeight: 500,
        color: color,
        textTransform: 'uppercase',
      }}
    >
      {userStatus}
    </Typography>
  </Box>
);

const ProfileAvatarSection = ({ user, onPhotoClick }) => (
  <Box sx={{ textAlign: 'center', my: 4 }}>
    <IconButton onClick={onPhotoClick} aria-label="open profile photo settings">
      <ProfileAvatar user={user} h={124} w={124} />
    </IconButton>

    <Typography variant="body2" sx={{ my: 2, color: 'gray' }}>
      Allowed format .JPG, .PNG
    </Typography>
  </Box>
);

// user permission toggle switch
// deactivate account and delete account

// user permission toggle switch
// public/private profile set profile photo as fallback

const AccountSwitch = ({ isAdmin }) => {
  const { userId, user, refetch } = useUserDetailsContext();
  const isSuspended = user.status === 'suspended';
  const [checked, setChecked] = useState(isSuspended);

  const { handleAlertMessage } = useMessageStore();

  const renderStatusText = checked ? 'Suspended' : 'Suspend';

  const handleChange = (event) => {
    setChecked(event.target.checked);
    handleSubmit(event.target.checked);
  };

  const handleSubmit = async (newCheckedValue) => {
    try {
      const url = `${API_URLS.ADMIN}/users/${userId}/suspend`;

      const { data } = await axios.patch(url, { formChecked: newCheckedValue });

      refetch();
      handleAlertMessage(data.message, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      setChecked((prev) => !prev);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <Typography>{isAdmin ? renderStatusText : 'Activity Status'}</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body2" sx={{ color: 'grey' }}>
          {isAdmin ? 'Apply disable account' : 'Public Profile'}
        </Typography>

        <form>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{
              id: 'suspend-switch',
              'aria-label': 'switch form',
            }}
          />
        </form>
      </Box>
    </Box>
  );
};

const AccountManagementCard = () => {
  const { userId, user, refetch } = useUserDetailsContext();
  const session = useUserSessionContext();
  const isAdmin = session.user.role === 'admin';

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const contextValues = {
    userId,
    user,
    refetch,
    isDialogOpen,
    setIsDialogOpen,
  };

  const statusColor = statusLabelColorMap[user.status] || '';

  const handleProfilePhotoClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardContent>
          {isAdmin && (
            <StatusBadge
              userStatus={user.status}
              color={statusColor.color}
              alphaColor={statusColor.alphaColor}
            />
          )}

          <ProfileAvatarSection
            user={user}
            onPhotoClick={handleProfilePhotoClick}
          />

          <AccountSwitch isAdmin={isAdmin} />
        </CardContent>
      </Card>

      <ProfilePhotoProvider value={contextValues}>
        <ProfilePhotoDialog />
      </ProfilePhotoProvider>
    </>
  );
};

export default AccountManagementCard;
