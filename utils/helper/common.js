import { locales } from '@/navigation';

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function authPage(pathname) {
  const authPages = [
    '/signin',
    '/signin/link',
    '/signup',
    '/verify',
    '/notifications/authentication-failed',
    '/confirmation/send-link',
    '/error',
  ];

  const hasLocale = locales.some((locale) =>
    pathname.startsWith(`/${locale}/`)
  );

  const hideOnAuthPage = authPages.some(
    (page) =>
      pathname === page ||
      (hasLocale && pathname.replace(/^\/[^/]+\//, '/') === page) // Strips out the locale prefix from the path, normalizing the URL.
  );

  return hideOnAuthPage;
}

export function hideNavLinks(pathname, params) {
  const selectedPages = ['/mysettings', `/mysettings/${params.slug}`];

  const hideOnSelectedPage = selectedPages.includes(pathname);

  return hideOnSelectedPage;
}
