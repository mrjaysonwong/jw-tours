import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  Toolbar,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// internal imports
import {
  drawerDashboardLinks,
  drawerManagementLinks,
  drawerFinanceLinks,
  drawerCommunicationLinks,
} from '@/data/links/adminDashboardLinks';
import { stripLocale } from '@/helpers/pageHelpers';
import { StyledDrawerSectionContainer } from '@/components/styled/StyledContainers';

const Logo = () => (
  <Box sx={{ my: 2 }}>
    <Link href="/admin/dashboard">
      <Image
        src={'/assets/horizontal_logo.svg'}
        alt="logo"
        height={34}
        width={160}
        priority
      />
    </Link>
  </Box>
);

const ListMenu = React.memo(({ link, showDropdown, handleToggle }) => {
  const params = useParams();
  const pathname = usePathname();
  const strippedPathname = stripLocale(pathname);

  const { label, href, icon, dropDownMenu } = link;

  const isActive = href === strippedPathname;
  const isSubLinkActive = dropDownMenu?.some(
    (subLink) => subLink.href === strippedPathname
  );

  const isDropdownOpen = showDropdown[label] ?? isSubLinkActive;

  useEffect(() => {
    if (isSubLinkActive) handleToggle(label, true); // Ensure dropdown is open
  }, [isSubLinkActive, handleToggle, label]);

  return !dropDownMenu ? (
    <ListItem disablePadding>
      <Link href={href} passHref>
        <ListItemButton
          disableRipple
          className="list-btn"
          sx={{
            bgcolor: isActive ? 'var(--color-green-alpha)' : 'inherit',
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      </Link>
    </ListItem>
  ) : (
    <ListItem
      disablePadding
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ListItemButton
        disableRipple
        onClick={() => handleToggle(label)}
        className="list-btn"
        sx={{
          width: '100%',
          bgcolor: isSubLinkActive ? 'var(--color-green-alpha)' : 'inherit',
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
        {dropDownMenu && (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {isDropdownOpen ? <ExpandLess /> : <ExpandMore />}
          </span>
        )}
      </ListItemButton>

      <Collapse
        in={isDropdownOpen}
        timeout="auto"
        sx={{ width: '100%', paddingLeft: 3.5, py: 0.5 }}
      >
        <ul className="dropdown">
          {dropDownMenu
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((subLink, index) => {
              const isEdit = subLink.href.includes('edit');

              return (
                <ListItem disablePadding key={`${index}-${subLink.label}`}>
                  <Link href={subLink.href} passHref>
                    <ListItemButton
                      disableRipple
                      className="list-btn"
                      sx={{
                        display:
                          isEdit && (!params.id || !isSubLinkActive)
                            ? 'none'
                            : 'flex',
                      }}
                    >
                      <ListItemText
                        primary={subLink.label}
                        sx={{
                          color:
                            subLink.href === strippedPathname
                              ? 'var(--color-text-main)'
                              : 'inherit',
                        }}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              );
            })}
        </ul>
      </Collapse>
    </ListItem>
  );
});

ListMenu.displayName = 'ListMenu';

const SectionList = ({
  sourceLink,
  sectionTitle,
  showDropdown = false,
  handleToggle,
}) => {
  return (
    <Box className="container">
      <Typography tabIndex={0} className="section-title">
        {sectionTitle}
      </Typography>

      <ul>
        {sourceLink.map((link, index) => (
          <ListMenu
            key={index}
            link={link}
            showDropdown={showDropdown}
            handleToggle={handleToggle}
          />
        ))}
      </ul>
    </Box>
  );
};

const DrawerLinks = () => {
  const [showDropdown, setShowDropdown] = useState({});

  const params = useParams();
  const { id } = params;

  const handleToggle = useCallback((dropdown, forceOpen = null) => {
    setShowDropdown((prev) => ({
      ...prev,
      [dropdown]: forceOpen !== null ? forceOpen : !prev[dropdown],
    }));
  }, []);

  return (
    <>
      <Toolbar>
        <Logo />
      </Toolbar>

      <StyledDrawerSectionContainer
        sx={{ a: { width: '100%', color: 'inherit' } }}
      >
        <SectionList
          sourceLink={drawerDashboardLinks}
          sectionTitle="Dashboard"
        />

        <SectionList
          sourceLink={drawerManagementLinks(id)}
          sectionTitle="Management"
          showDropdown={showDropdown}
          handleToggle={handleToggle}
        />

        <SectionList sourceLink={drawerFinanceLinks} sectionTitle="Finance" />

        <SectionList
          sourceLink={drawerCommunicationLinks}
          sectionTitle="Communication"
          showDropdown={showDropdown}
          handleToggle={handleToggle}
        />
      </StyledDrawerSectionContainer>
    </>
  );
};

export default DrawerLinks;
