'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useState, useMemo, createContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function ToggleThemeMode(props) {
  const { storedTheme } = props;

  const [mode, setMode] = useState(storedTheme?.value || 'light');

  const [cookies, setCookie] = useCookies(['themeMode']);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: inter.style.fontFamily,
        },
        palette: {
          mode,
        },
      }),
    [mode]
  );

  useEffect(() => {
    // use '/' as the path if you want your cookie to be accessible on all pages
    setCookie('themeMode', mode, { path: '/', secure: true });
  }, [mode, setCookie]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
