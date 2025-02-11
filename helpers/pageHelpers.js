import { locales } from '@/navigation';

const isLocalePath = (pathname) =>
  locales.some((locale) => pathname.startsWith(`/${locale}/`));

export const stripLocale = (pathname) => {
  const hasLocale = isLocalePath(pathname);

  return hasLocale ? pathname.replace(/^\/[^/]+\//, '/') : pathname;
};

const isAuthPage = (pathname) => {
  const authPages = [
    '/signin',
    '/signup',
    '/forgot-password',
    '/resend-verification',
    '/reset-password',
    '/verify',
    '/notifications',
    '/error',
    '/admin',
    '/partners',
  ];
  const isBasePath = authPages.some((page) => pathname.startsWith(page));

  return isBasePath;
};

export function shouldHideOnAuthPage(pathname) {
  const hasLocale = isLocalePath(pathname);
  const strippedPathname = stripLocale(pathname);

  return isAuthPage(pathname) || (hasLocale && isAuthPage(strippedPathname));
}

export function shouldHideNavLinks(pathname) {
  const hasLocale = isLocalePath(pathname);
  const strippedPathname = stripLocale(pathname);

  return (
    pathname.startsWith('/mysettings') ||
    (hasLocale && strippedPathname.startsWith('/mysettings'))
  );
}

export function getLastSegment(pathname) {
  const lastSegment = pathname.split('/').pop();

  return lastSegment;
}
