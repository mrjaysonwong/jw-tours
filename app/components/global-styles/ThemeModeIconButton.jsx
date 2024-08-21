'use client';

import { useContext } from 'react';
import { Box, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from './ToggleThemeMode';

export default function ThemeModeIconButton() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 100,
          right: 20,
        }}
      >
        <Tooltip
          arrow
          placement="left"
          title={
            theme.palette.mode === 'light'
              ? 'Toggle dark mode'
              : 'Toggle light mode'
          }
        >
          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'light' ? (
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
}
