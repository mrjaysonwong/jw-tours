import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

export const accountSettingsLinks = [
  {
    href: '/mysettings/personal',
    slug: 'personal',
    tabName: 'Personal details',
    icon: <FolderSharedOutlinedIcon />,
    text: 'Update your info and find out how it is used.',
  },
  {
    href: '/mysettings/preferences',
    slug: 'preferences',
    tabName: 'Preferences',
    icon: <TuneOutlinedIcon />,
    text: 'Change your language, and accessibility requirements.',
  },
  {
    href: '/mysettings/security',
    slug: 'security',
    tabName: 'Security',
    icon: <SecurityOutlinedIcon />,
    text: 'Change your security settings, or delete your account.',
  },
  {
    href: '/mysettings/payment',
    slug: 'payment',
    tabName: 'Payment details',
    href: '/mysettings/payment',
    icon: <PaymentOutlinedIcon />,
    text: 'Securely add or remove payment methods to make it easier when you book.',
  },
  {
    href: '/mysettings/privacy',
    slug: 'privacy',
    tabName: 'Privacy',
    icon: <PrivacyTipOutlinedIcon />,
    text: 'Securely add or remove payment methods to make it easier when you book.',
  },
  {
    href: '/mysettings/notifications',
    slug: 'notifications',
    tabName: 'Email notifications',
    icon: <NotificationsNoneOutlinedIcon />,
    text: 'Decide what you want to be notified about, and unsubscribe from what you do not.',
  },
  // {
  //   href: '/mysettings/notifications2',
  //   slug: 'notifications2',
  //   tabName: 'Email notifications2',
  //   icon: <NotificationsNoneOutlinedIcon />,
  //   text: 'Decide what you want to be notified about, and unsubscribe from what you do not.',
  // },
  // {
  //   href: '/mysettings/notifications3',
  //   slug: 'notifications3',
  //   tabName: 'Email notifications3',
  //   icon: <NotificationsNoneOutlinedIcon />,
  //   text: 'Decide what you want to be notified about, and unsubscribe from what you do not.',
  // },
  // {
  //   href: '/mysettings/notifications4',
  //   slug: 'notifications4',
  //   tabName: 'Email notifications4',
  //   icon: <NotificationsNoneOutlinedIcon />,
  //   text: 'Decide what you want to be notified about, and unsubscribe from what you do not.',
  // },
  // {
  //   href: '/mysettings/notifications5',
  //   slug: 'notifications5',
  //   tabName: 'Email notifications5',
  //   icon: <NotificationsNoneOutlinedIcon />,
  //   text: 'Decide what you want to be notified about, and unsubscribe from what you do not.',
  // },
];
