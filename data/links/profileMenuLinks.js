import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import ReviewsIcon from '@mui/icons-material/Reviews';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PaymentsIcon from '@mui/icons-material/Payments';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HelpIcon from '@mui/icons-material/Help';

export const userProfileMenuLinks = [
  {
    label: 'Bookings',
    href: '/bookings',
    icon: <StyleOutlinedIcon />,
  },
  {
    label: 'View Rewards',
    href: '/view-rewards',
    icon: <WorkspacePremiumIcon />,
  },
  {
    label: 'Manage Account',
    href: '/mysettings',
    icon: <ManageAccountsOutlinedIcon />,
  },
];

export const adminProfileMenuLinks = [
  {
    label: 'Manage Tours',
    href: '/admin/dashboard/tours',
    icon: <FlagCircleIcon />,
  },
  {
    label: 'User Management',
    href: '/admin/dashboard/users',
    icon: <SupervisedUserCircleIcon />,
  },
  {
    label: 'Bookings Management',
    href: '/admin/dashboard/bookings',
    icon: <BookmarksOutlinedIcon />,
  },
  {
    label: 'Reviews & Feedback',
    href: '/admin/dashboard/reviews',
    icon: <ReviewsIcon />,
  },
  {
    label: 'Payments & Transactions',
    href: '/admin/dashboard/payments',
    icon: <PaymentsIcon />,
  },
  // {
  //   label: 'Promotions & Discounts',
  //   href: '/admin/dashboard/promotions',
  //   icon: <AdsClickIcon />,
  // },
  {
    label: 'Reports & Analytics',
    href: '/admin/dashboard/reports',
    icon: <AnalyticsIcon />,
  },
  {
    label: 'Settings',
    href: '/admin/dashboard/settings',
    icon: <SettingsIcon />,
  },
  // {
  //   label: 'Help & Support',
  //   href: '/admin/dashboard/support',
  //   icon: <HelpIcon />,
  // },
];
