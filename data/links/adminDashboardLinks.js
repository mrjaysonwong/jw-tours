import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import MultilineChartOutlinedIcon from '@mui/icons-material/MultilineChartOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import TourOutlinedIcon from '@mui/icons-material/TourOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import ReviewsIcon from '@mui/icons-material/Reviews';
import PaymentsIcon from '@mui/icons-material/Payments';
import MoneyOffOutlinedIcon from '@mui/icons-material/MoneyOffOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

export const drawerDashboardLinks = [
  {
    href: '/admin/dashboard',
    label: 'Overview',
    icon: <SpeedOutlinedIcon />,
  },
  {
    href: '/admin/dashboard/analytics',
    label: 'Analytics',
    icon: <AnalyticsOutlinedIcon />,
  },
  {
    href: '/admin/dashboard/sales',
    label: 'Sales',
    icon: <MultilineChartOutlinedIcon />,
  },
  {
    href: '/admin/dashboard/revenue',
    label: 'Revenue',
    icon: <BarChartOutlinedIcon />,
  },
  {
    href: '/admin/dashboard/bookings',
    label: 'Bookings',
    icon: <BookmarksOutlinedIcon />,
  },
];

export const drawerManagementLinks = (id) => [
  {
    label: 'Users',
    icon: <GroupsOutlinedIcon />,
    dropDownMenu: [
      {
        href: '/admin/dashboard/users',
        label: 'List',
      },
      {
        href: '/admin/dashboard/users/new',
        label: 'Create',
      },
      {
        href: `/admin/dashboard/users/${id}/edit`,
        label: 'Edit',
      },
    ],
  },
  {
    label: 'Tours',
    icon: <TourOutlinedIcon />,
    dropDownMenu: [
      {
        href: '/admin/dashboard/tours',
        label: 'List',
      },
      {
        href: '/admin/dashboard/tours/new',
        label: 'Create',
      },
      {
        href: `/admin/dashboard/tours/${id}/edit`,
        label: 'Edit',
      },
    ],
  },
];

export const drawerFinanceLinks = [
  {
    href: '/admin/dashboard/payments',
    label: 'Payments',
    icon: <PaymentsIcon />,
  },
  {
    href: '/admin/dashboard/refunds',
    label: 'Refund Requests',
    icon: <MoneyOffOutlinedIcon />,
  },
];

export const drawerCommunicationLinks = [
  {
    label: 'Notifications',
    icon: <NotificationsOutlinedIcon />,
    dropDownMenu: [
      {
        href: '/admin/dashboard/notifications',
        label: 'View All',
      },
      {
        href: '/admin/dashboard/notifications/reports',
        label: 'Reports',
      },
    ],
  },
  {
    href: '/admin/dashboard/messaging',
    label: 'Chat',
    icon: <ChatBubbleOutlineOutlinedIcon />,
  },
  {
    href: '/admin/dashboard/announcement',
    label: 'Annoucement',
    icon: <AnnouncementOutlinedIcon />,
  },
  {
    href: '/admin/dashboard/reviews',
    label: 'Reviews',
    icon: <ReviewsIcon />,
  },
];
