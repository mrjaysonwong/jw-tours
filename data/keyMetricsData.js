import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import NotificationsIcon from '@mui/icons-material/Notifications';

export const notificationsMetrics = [
    {
      label: 'Read',
      icon: <MarkEmailReadIcon />,
      color: "#5AA469"
    },
    {
      label: 'Unread',
      icon: <MarkEmailUnreadIcon />,
      color: "#F0A04B"
    },
    {
      label: 'Unsubscribed',
      icon: <UnsubscribeIcon />,
      color: "#FF8A8A"
    },
    {
      label: 'Notifications',
      icon: <CircleNotificationsIcon />,
      color: "#51829B"
    },
  ];