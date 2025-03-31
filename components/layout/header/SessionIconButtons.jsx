import { IconButton } from '@mui/material';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import ProfileMenu from '@/components/menus/ProfileMenu';
import Notifications from './Notifications';

const SessionIconButtons = () => (
  <>
    <IconButton>
      <FavoriteBorderOutlinedIcon />
    </IconButton>

    <IconButton>
      <ShoppingCartOutlinedIcon />
    </IconButton>

    <Notifications />

    <ProfileMenu />
  </>
);

export default SessionIconButtons;
