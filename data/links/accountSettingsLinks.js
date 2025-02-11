import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

export const accountSettingsLinks = [
  {
    href: '/mysettings/profile',
    label: 'Profile',
    icon: <FolderSharedOutlinedIcon />,
    text: 'Update your info and find out how it is used.',
  },
  {
    href: '/mysettings/preferences',
    label: 'Preferences',
    icon: <TuneOutlinedIcon />,
    text: 'Change your language, and accessibility requirements.',
  },
  {
    href: '/mysettings/security',
    label: 'Security',
    icon: <LockOutlinedIcon />,
    text: 'Change your security settings, or delete your account.',
  },
  {
    href: '/mysettings/payment',
    label: 'Payment details',
    icon: <PaymentOutlinedIcon />,
    text: 'Securely add or remove payment methods to make it easier when you book.',
  },
  {
    href: '/mysettings/privacy',
    label: 'Privacy',
    icon: <PrivacyTipOutlinedIcon />,
    text: 'Securely add or remove payment methods to make it easier when you book.',
  },
  {
    href: '/mysettings/notifications',
    label: 'Email notifications',
    icon: <NotificationsNoneOutlinedIcon />,
    text: 'Decide what you want to be notified about, and unsubscribe from what you do not.',
  },
];
