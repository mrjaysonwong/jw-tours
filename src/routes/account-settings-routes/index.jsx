import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

export const accountSettingsRoutes = [
  {
    path: '/mysettings/personal',
    slug: 'personal',
    tabName: 'Personal details',
    icon: <FolderSharedOutlinedIcon />,
    text: 'Update your info and find out how it is used.',
  },
  {
    path: '/mysettings/preferences',
    slug: 'preferences',
    tabName: 'Preferences',
    icon: <TuneOutlinedIcon />,
    text: 'Change your language, currency, and accessibility requirements.',
  },
  {
    path: '/mysettings/security',
    slug: 'security',
    tabName: 'Security',
    icon: <SecurityOutlinedIcon />,
    text: 'Change your security settings, set up secure authentication, or delete your account.',
  },
  {
    path: '/mysettings/payment',
    slug: 'payment',
    tabName: 'Payment details',
    path: '/mysettings/payment',
    icon: <PaymentOutlinedIcon />,
    text: 'Securely add or remove payment methods to make it easier when you book.',
  },
  {
    path: '/mysettings/privacy',
    slug: 'privacy',
    tabName: 'Privacy',
    icon: <PrivacyTipOutlinedIcon />,
    text: 'Securely add or remove payment methods to make it easier when you book.',
  },
  {
    path: '/mysettings/notifications',
    slug: 'notifications',
    tabName: 'Email notifications',
    icon: <NotificationsNoneOutlinedIcon />,
    text: 'Decide what you want to be notified about, and unsubscribe from what you do not.',
  },
  // {
  //   path: '/mysettings/notifications2',
  //   slug: 'notifications2',
  //   tabName: 'Email notifications2',
  //   icon: <NotificationsNoneOutlinedIcon />,
  //   text: 'Decide what you want to be notified about, and unsubscribe from what you do not.',
  // },
  // {
  //   path: '/mysettings/notifications3',
  //   slug: 'notifications3',
  //   tabName: 'Email notifications3',
  //   icon: <NotificationsNoneOutlinedIcon />,
  //   text: 'Decide what you want to be notified about, and unsubscribe from what you do not.',
  // },
  // {
  //   path: '/mysettings/notifications4',
  //   slug: 'notifications4',
  //   tabName: 'Email notifications4',
  //   icon: <NotificationsNoneOutlinedIcon />,
  //   text: 'Decide what you want to be notified about, and unsubscribe from what you do not.',
  // },
  // {
  //   path: '/mysettings/notifications5',
  //   slug: 'notifications5',
  //   tabName: 'Email notifications5',
  //   icon: <NotificationsNoneOutlinedIcon />,
  //   text: 'Decide what you want to be notified about, and unsubscribe from what you do not.',
  // },
];
