import { useRouter } from 'next/navigation';
import { ListItemIcon, MenuItem } from '@mui/material';

// internal imports
import {
  userProfileMenuLinks,
  adminProfileMenuLinks,
} from '@/data/links/profileMenuLinks';

const MenuLinks = ({ user, isAdminPath, setAnchorEl }) => {
  const router = useRouter();

  const handleItemClick = (href) => {
    router.push(href);
    setAnchorEl(null);
  };

  const createMenuItems = (links) =>
    links.map(({ label, href, icon }) => (
      <MenuItem key={label} onClick={() => handleItemClick(href)}>
        <ListItemIcon>{icon}</ListItemIcon>
        {label}
      </MenuItem>
    ));

  const userLinks = createMenuItems(userProfileMenuLinks);
  const adminDashboardLinks = createMenuItems(adminProfileMenuLinks);

  const renderLinks =
    user?.role === 'user' || !isAdminPath ? userLinks : adminDashboardLinks;

  return renderLinks;
};

export default MenuLinks;
