import '../[locale]/globals.css';
import { auth } from '@/auth';
import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import NavBar from '../components/nav-bar/NavBar';
import ThemeModeIconButton from '../components/global-styles/ThemeModeIconButton';
import Footer from '../components/custom/footer/Footer';
import ToggleThemeMode from '../components/global-styles/ToggleThemeMode';
import AuthRedirect from './(auth)/AuthRedirect';
import SessionWrapper from './(auth)/SessionWrapper';
import { UserSessionWrapper } from '@/context/UserSessionWrapper';
import { locales } from '@/navigation';

export const metadata = {
  title: {
    template: '%s | JW Tours',
    default: 'JW Tours',
  },
};

export default async function RootLayout({ children, params: { locale } }) {
  if (!locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  const cookieStore = cookies();
  const storedTheme = cookieStore.get('themeMode');

  const session = await auth();

  return (
    <SessionWrapper>
      <html lang={locale}>
        <link rel="icon" href="/icon.svg" />

        <body>
          <AppRouterCacheProvider options={{ key: 'css' }}>
            <NextIntlClientProvider messages={messages}>
              <ToggleThemeMode storedTheme={storedTheme}>
                <AuthRedirect>
                  <UserSessionWrapper session={session}>
                    <NavBar />
                    {children}
                    <ThemeModeIconButton />
                    <Footer />
                  </UserSessionWrapper>
                </AuthRedirect>
              </ToggleThemeMode>
            </NextIntlClientProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
