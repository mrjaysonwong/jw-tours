import { IconButton, Badge } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

// internal imports
import ProfileMenu from '@/components/menus/ProfileMenu';
import Notifications from './Notifications';

const SessionIconButtons = () => {
  return (
    <>
      <IconButton component="a" href="/wishlists" aria-label="Go to wishlists">
        <FavoriteBorderOutlinedIcon />
      </IconButton>

      <Notifications />

      <ProfileMenu />
    </>
  );
};

export default SessionIconButtons;
