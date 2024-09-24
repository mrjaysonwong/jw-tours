import { locales } from '@/navigation';

const stripLocale = (pathname) => pathname.replace(/^\/[^/]+\//, '/');

export function shouldHideOnAuthPage(pathname) {
  const authPages = [
    '/signin',
    '/signin/email-link',
    '/signup',
    '/verify',
    '/notifications/authentication-failed',
    '/error',
  ];

  const hasLocale = locales.some((locale) =>
    pathname.startsWith(`/${locale}/`)
  );

  const hideOnAuthPage = authPages.some(
    (page) =>
      pathname === page ||
      (hasLocale && stripLocale(pathname) === page) ||
      pathname.startsWith('/account') // Strips out the locale prefix from the path, normalizing the URL.
  );

  return hideOnAuthPage;
}

export function hideDefaultNavBar(pathname) {
  const selectedPages = ['/admin', '/partners', '/signin', '/signup'];

  const hasLocale = locales.some((locale) =>
    pathname.startsWith(`/${locale}/`)
  );

  const hideOnSelectedPage = selectedPages.some(
    (page) =>
      pathname === page ||
      (hasLocale && pathname.replace(/^\/[^/]+\//, '/') === page) ||
      pathname.startsWith(page)
  );

  return hideOnSelectedPage;
}

export function shouldHideNavLinks(pathname, params) {
  const selectedPages = ['/mysettings', `/mysettings/${params.slug}`];

  const hasLocale = locales.some((locale) =>
    pathname.startsWith(`/${locale}/`)
  );

  const hideOnSelectedPage = selectedPages.some(
    (page) => pathname === page || (hasLocale && stripLocale(pathname) === page)
  );

  return hideOnSelectedPage;
}
