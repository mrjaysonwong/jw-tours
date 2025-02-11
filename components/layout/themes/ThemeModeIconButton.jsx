'use client';

import { useContext } from 'react';
import { usePathname } from 'next/navigation';
import { Box, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// internal imports
import { ColorModeContext } from './ToggleThemeMode';
import { stripLocale } from '@/helpers/pageHelpers';

const ThemeModeIconButton = () => {
  const pathname = usePathname();
  const strippedPathname = stripLocale(pathname);

  const shouldHide =
    strippedPathname.includes('/dashboard') ||
    strippedPathname.includes('/mysettings');

  const theme = useTheme();
  const isLightMode = theme.palette.mode === 'light';
  const colorMode = useContext(ColorModeContext);

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 100,
          right: 20,
          zIndex: 2,
          display: shouldHide && 'none',
        }}
      >
        <Tooltip
          arrow
          placement="left"
          title={isLightMode ? 'Toggle dark mode' : 'Toggle light mode'}
        >
          <IconButton
            onClick={colorMode.toggleColorMode}
            color="inherit"
            sx={{ bgcolor: 'grey', '&:hover': { bgcolor: 'grey' } }}
          >
            {isLightMode ? (
              <>
                <Brightness4Icon />
              </>
            ) : (
              <>
                <Brightness7Icon />
              </>
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};

export default ThemeModeIconButton;
