import { useRouter, usePathname } from 'next/navigation';
import { Menu, MenuItem } from '@mui/material';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';

// internal imports
import { useDrawerStore } from '@/stores/drawerStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { useUserSessionContext } from '@/contexts/UserProvider';
import { markAllNotificationsAsRead } from '@/services/notifications/notificationActions';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';

const NotificationsMenu = ({ open, anchorEl, setAnchorEl }) => {
  const { notifications, markAllAsRead } = useNotificationStore();
  const unreadNotifications = notifications.filter((n) => n.read === false);

  const router = useRouter();
  const pathname = usePathname();
  const isNotificationsPath = pathname.includes('/notifications');

  const session = useUserSessionContext();
  const { toggleDrawer } = useDrawerStore();

  const { handleAlertMessage } = useMessageStore();

  const handleClickMenu = async (type) => {
    switch (type) {
      case 'mark-all-read':
        try {
          const updatedIds = await markAllNotificationsAsRead(session.user.id);

          // optimistically update ui
          markAllAsRead(updatedIds);
        } catch (error) {
          const { errorMessage } = errorHandler(error);
          handleAlertMessage(errorMessage, 'error');
        }

        break;
      case 'settings':
        router.replace('/mysettings');
        break;

      default:
        router.replace('/notifications');
        break;
    }

    if (type !== 'mark-all-read') {
      toggleDrawer('notificationsDrawerOpen', false);
    }
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      id="menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'notifications-menu',
      }}
      sx={{
        '& .MuiSvgIcon-root': {
          mr: 1,
        },
      }}
    >
      <MenuItem
        onClick={() => handleClickMenu('mark-all-read')}
        disableRipple
        sx={{ display: unreadNotifications.length === 0 && 'none' }}
      >
        <MarkEmailReadOutlinedIcon />
        Mark all as read
      </MenuItem>

      <MenuItem onClick={() => handleClickMenu('settings')} disableRipple>
        <SettingsOutlinedIcon />
        Notification settings
      </MenuItem>
      <MenuItem
        onClick={() => handleClickMenu('open-notifications')}
        disableRipple
        sx={{ display: isNotificationsPath && 'none' }}
      >
        <WebOutlinedIcon />
        Open Notifications
      </MenuItem>
    </Menu>
  );
};

export default NotificationsMenu;
