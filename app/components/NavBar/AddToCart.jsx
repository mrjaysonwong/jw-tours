import { IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function AddToCart() {
  return (
    <>
      <IconButton disableRipple sx={{ mx: 1 }}>
        <ShoppingCartIcon />
      </IconButton>
    </>
  );
}
