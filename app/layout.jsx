import { auth } from '@/auth';
import { cookies } from 'next/headers';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Navbar from './components/custom/navbar/Navbar';
import ThemeModeIconButton from './components/global-styles/ThemeModeIconButton';
import Footer from './components/custom/footer/Footer';
import ToggleThemeMode from './components/global-styles/ToggleThemeMode';
import AuthRedirect from './(auth)/AuthRedirect';
import SessionWrapper from './(auth)/SessionWrapper';
import { UserSessionWrapper } from '@/context/UserSessionWrapper';
import '../app/globals.css';

export const metadata = {
  title: {
    template: '%s | JW Tours',
    default: 'JW Tours',
  },
};

export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const storedTheme = cookieStore.get('themeMode');

  const session = await auth();

  return (
    <SessionWrapper>
      <html lang="en">
        <body>
          <AppRouterCacheProvider options={{ key: 'css' }}>
            <ToggleThemeMode storedTheme={storedTheme}>
              <AuthRedirect>
                <UserSessionWrapper session={session}>
                  <Navbar />
                  {children}
                  <ThemeModeIconButton />
                  <Footer />
                </UserSessionWrapper>
              </AuthRedirect>
            </ToggleThemeMode>
          </AppRouterCacheProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
