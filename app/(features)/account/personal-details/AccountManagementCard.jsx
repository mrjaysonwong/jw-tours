import { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Box,
  Typography,
  IconButton,
  Switch,
  Button,
} from '@mui/material';

// internal imports
import { ProfilePhotoProvider } from '@/contexts/ProfilePhotoProvider';
import {
  useUserDetailsContext,
  useUserSessionContext,
} from '@/contexts/UserProvider';
import ProfileAvatar from '@/components/images/ProfileAvatar';
import { ProfilePhotoDialog } from '@/app/(features)/account/photo-settings';
import { statusLabelColorMap } from '@/utils/colorMap';

const STATUS = {
  active: { label: 'Active', color: '#3ab67a' },
  pending: { label: 'Pending', color: '#ea8643' },
  suspended: { label: 'Suspended', color: '#F46060' },
  inactive: { label: 'Inactive', color: '#808080' },
};

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
        textTransform: 'capitalize',
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

// admin permission toggle switch
// suspended

// user permission toggle switch
// deactivate account

// user permission toggle switch
// public profile

// admin authorize delete user

const AccountSwitch = ({ isAdmin }) => (
  <Box sx={{ my: 2 }}>
    <Typography>{isAdmin ? 'Suspended' : 'Activity Status'}</Typography>
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

      <Switch
        inputProps={{ id: 'toggle-switch', 'aria-label': 'toggle switch' }}
      />
    </Box>
  </Box>
);

const AccountManagementCard = () => {
  const { userId, user, refetch, adminRefetch } = useUserDetailsContext();
  const session = useUserSessionContext();
  const isAdmin = session.user.role === 'admin';

  const [open, setOpen] = useState(false);

  const contextValues = {
    userId,
    user,
    refetch,
    adminRefetch,
    open,
    setOpen,
  };

  const statusColor = statusLabelColorMap[user?.status];

  const handleProfilePhotoClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Card>
        <CardContent>
          {isAdmin && (
            <StatusBadge
              userStatus={user?.status}
              color={statusColor.color}
              alphaColor={statusColor.alphaColor}
            />
          )}

          <ProfileAvatarSection
            user={user}
            onPhotoClick={handleProfilePhotoClick}
          />

          <AccountSwitch isAdmin={isAdmin} />

          {isAdmin && (
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button variant="contained">Delete User</Button>
            </CardActions>
          )}
        </CardContent>
      </Card>

      <ProfilePhotoProvider value={contextValues}>
        <ProfilePhotoDialog />
      </ProfilePhotoProvider>
    </>
  );
};

export default AccountManagementCard;
