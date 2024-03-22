import { cookies } from 'next/headers';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Nav from './components/custom/navbar/Nav';
import Footer from './components/custom/footer/Footer';
import ToggleThemeMode from './components/custom/navbar/ToggleThemeMode';
import SessionWrapper from './components/auth/SessionWrapper';
import '../app/globals.css';


export const metadata = {
  title: {
    template: '%s | JW Tours',
    default: 'JW Tours',
  },
};

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const storedTheme = cookieStore.get('themeMode');

  return (
    <SessionWrapper>
      <html lang="en">
        <body>
          <AppRouterCacheProvider options={{ key: 'css' }}>
            <ToggleThemeMode storedTheme={storedTheme}>
              <Nav />
              {children}
              <Footer />
            </ToggleThemeMode>
          </AppRouterCacheProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
