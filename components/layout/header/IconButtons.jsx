import { IconButton } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const IconButtons = ({ handleIconAuthClick }) => (
  <>
    <IconButton>
      <FavoriteBorderOutlinedIcon />
    </IconButton>

    <IconButton>
      <ShoppingCartOutlinedIcon />
    </IconButton>

    <IconButton
      onClick={handleIconAuthClick}
      aria-label="open auth dialog tabs, Sign In and Sign Up"
    >
      <AccountCircleOutlinedIcon />
    </IconButton>
  </>
);

export default IconButtons;
