import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

export const profileMenuLinks = [
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
    label: 'Wishlists',
    href: '/wishlists',
    icon: <BookmarksOutlinedIcon />,
  },
  {
    label: 'Manage Account',
    href: '/mysettings',
    icon: <ManageAccountsOutlinedIcon />,
  },
];
