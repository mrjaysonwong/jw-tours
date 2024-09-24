import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

// local imports
import '@/app/[locale]/globals.css';
import { auth } from '@/auth';
import AuthSessionProvider from '@/app/(features)/authentication/contexts/AuthSessionProvider';
import AuthRedirect from '@/app/(features)/authentication/components/AuthRedirect';
import Header from '@/components/layout/header/Header';
import ThemeModeIconButton from '@/components/layout/themes/ThemeModeIconButton';
import Footer from '@/components/layout/footer/Footer';
import ToggleThemeMode from '@/components/layout/themes/ToggleThemeMode';
import { UserSessionProvider } from '@/contexts/UserProvider';
import { locales } from '@/navigation';
import { createMetadata } from '@/helpers/metaDataHelpers';

export async function generateMetadata({ params: { locale } }) {
  return createMetadata(locale, 'layout');
}

export default async function RootLayout({ children, params }) {
  const { locale } = params;

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
    <html lang={locale}>
      <link rel="icon" href="/icon.svg" />

      <body>
        <AuthSessionProvider>
          <AppRouterCacheProvider options={{ key: 'css' }}>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <UserSessionProvider session={session}>
                <AuthRedirect>
                  <ToggleThemeMode storedTheme={storedTheme}>
                    {/* <NavBar /> */}
                    <Header />
                    {children}
                    <ThemeModeIconButton />
                    <Footer />
                  </ToggleThemeMode>
                </AuthRedirect>
              </UserSessionProvider>
            </NextIntlClientProvider>
          </AppRouterCacheProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
