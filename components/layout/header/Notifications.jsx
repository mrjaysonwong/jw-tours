import { usePathname } from 'next/navigation';
import { IconButton, Badge } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

// internal imports
import { useDrawerStore } from '@/stores/drawerStore';
import { useNotificationStore } from '@/stores/notificationStore';
import NotificationsSidebar from '@/components/sidebars/NotificationsSidebar';

const Notifications = () => {
  const pathname = usePathname();
  const { toggleDrawer } = useDrawerStore();
  const { notifications } = useNotificationStore();

  const unreadNotifications = notifications.filter((n) => n.read === false);

  return (
    <>
      <IconButton
        disabled={pathname.includes('/notifications')}
        aria-label="open notifications drawer"
        onClick={() => toggleDrawer('notificationsDrawerOpen', true)}
      >
        <Badge
          badgeContent={unreadNotifications.length}
          color="error"
          variant="dot"
          sx={{
            '& .MuiBadge-badge': {
              right: 5,
              top: 2,
            },
          }}
        >
          <NotificationsNoneOutlinedIcon />
        </Badge>
      </IconButton>

      <NotificationsSidebar />
    </>
  );
};

export default Notifications;
