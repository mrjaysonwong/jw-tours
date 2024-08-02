import { IconButton, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function AddToCart() {
  return (
    <Box>
      <Badge
        badgeContent={1}
        sx={{
          '& .MuiBadge-badge': {
            background: 'var(--palette-orange)',
            color: 'white',
            right: -4,
          },
        }}
      >
        <IconButton disableRipple sx={{ p: 0 }}>
          <ShoppingCartIcon />
        </IconButton>
      </Badge>
    </Box>
  );
}
