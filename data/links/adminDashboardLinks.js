import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import MultilineChartOutlinedIcon from '@mui/icons-material/MultilineChartOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

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
];

export const drawerManagementLinks = (id) => [
  {
    label: 'Users',
    icon: <GroupsOutlinedIcon />,
    dropDownMenu: [
      {
        href: '/admin/dashboard/users',
        label: 'User List',
      },
      {
        href: '/admin/dashboard/users/add',
        label: 'Add New User',
      },
      {
        href: id
          ? `/admin/dashboard/users/${id}/edit`
          : '/admin/dashboard/users/66a8a1e608150af8c0a5bb62/edit',
        label: 'Edit User',
      },
    ],
  },
];
