import { cookies } from 'next/headers';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Nav from './components/layout/navbar/Nav';
import Footer from './components/layout/footer/Footer';
import ToggleThemeMode from './components/layout/navbar/ToggleThemeMode';
import SessionWrapper from './components/auth/SessionWrapper';
import '../app/globals.css';

export const metadata = {
  title: 'JW-Tours App',
  description: 'Simple Project using Next.js',
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
