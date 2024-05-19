import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';


export const userSectionRoutes = [
  {
    pathName: 'Bookings',
    path: '/bookings',
    icon: <ConfirmationNumberOutlinedIcon />,
  },
  {
    pathName: 'View Rewards',
    path: '/view-rewards',
    icon: <WorkspacePremiumIcon />,
  },
  {
    pathName: 'Wishlists',
    path: '/wishlists',
    icon: <BookmarksOutlinedIcon />,
  },
  {
    pathName: 'Manage account',
    path: '/mysettings',
    icon: <ManageAccountsOutlinedIcon />,
  },
];
