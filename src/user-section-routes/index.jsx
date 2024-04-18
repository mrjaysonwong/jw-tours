import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const userSectionRoutes = [
    {
        pathName: 'Bookings',
        path: '/bookings',
        icon: <ConfirmationNumberOutlinedIcon />
    },
    {
        pathName: 'View Rewards',
        path: '/view-rewards',
        icon: <WorkspacePremiumIcon />
    },
    {
        pathName: 'Wish List',
        path: '/wishlist',
        icon: <BookmarksOutlinedIcon />
    },
    {
        pathName: 'Settings',
        path: '/profile-settings',
        icon: <SettingsOutlinedIcon />
    },
]