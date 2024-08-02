import { IconButton, Badge, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Notifications() {
  return (
    <Box sx={{ mx: 3 }}>
      <Badge
        badgeContent={1}
        sx={{
          '& .MuiBadge-badge': {
            background: 'var(--palette-red)',
            color: 'white',
          },
        }}
      >
        <IconButton disableRipple sx={{ p: 0 }}>
          <NotificationsIcon />
        </IconButton>
      </Badge>
    </Box>
  );
}
