import { IconButton } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

// internal imports
import { useAuthDialogStore } from '@/stores/dialogStore';

const IconButtons = () => {
  const { openAuthDialog } = useAuthDialogStore();

  return (
    <>
      <IconButton component="a" href="/wishlists" aria-label="Go to wishlists">
        <FavoriteBorderOutlinedIcon />
      </IconButton>

      <IconButton
        onClick={() => openAuthDialog()}
        aria-label="open auth dialog tabs, Sign In and Sign Up"
      >
        <AccountCircleOutlinedIcon />
      </IconButton>
    </>
  );
};

export default IconButtons;
