'use client';

import { Inter, Bebas_Neue, Poppins, Montserrat } from 'next/font/google';
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

const bebas_neue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const ToggleThemeMode = ({ storedTheme, children }) => {
  const [mode, setMode] = useState(storedTheme?.value || 'dark');

  const [cookies, setCookie] = useCookies(['themeMode']);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: poppins.style.fontFamily,
        },

        palette: {
          mode,
          background: {
            default:
              mode === 'light'
                ? 'var(--color-light-secondary)'
                : 'var(--color-dark-main)',
            paper: mode === 'light' ? '#ffffff' : '#181818',
          },
          primary: {
            main: '#2d9562',
            light: '#197e4d',
          },
        },

        components: {
          MuiDialog: {
            styleOverrides: {
              paper: {
                backgroundColor: mode === 'dark' && 'black',
              },
            },
          },
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
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleThemeMode;
