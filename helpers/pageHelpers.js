import { locales } from '@/navigation';

// internal imports
import { currencies } from '@/data/countries/currencies';

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
    '/notifications/authentication-failed',
    '/error',
    '/admin',
    '/partners',
    '/checkout',
    '/payment',
  ];
  const isBasePath = authPages.some((page) => pathname.startsWith(page));

  return isBasePath;
};

export function shouldHideOnAuthPage(pathname) {
  const hasLocale = isLocalePath(pathname);
  const strippedPathname = stripLocale(pathname);

  return isAuthPage(pathname) || isAuthPage(strippedPathname);
}

export function shouldHideNavLinks(pathname) {
  const strippedPathname = stripLocale(pathname);

  const pages = ['/mysettings', '/notifications'];

  const isBasePath = pages.some((page) => strippedPathname.startsWith(page));

  return isBasePath;
}

export function getLastSegment(pathname) {
  const lastSegment = pathname.split('/').pop();

  return lastSegment;
}

export function getCurrencyFromCookies(getCookies) {
  const store = getCookies();
  const code = store.get('currency')?.value;

  const matchedCurrency = currencies.find((c) => c.currencyCode === code);

  if (!matchedCurrency) {
    return { code: 'USD', symbol: '$' };
  }

  return { code: matchedCurrency.currencyCode, symbol: matchedCurrency.symbol };
}

export function getAuthFetchOptions(getCookies) {
  const store = getCookies();
  const token = store.get('authjs.session-token')?.value;

  return {
    headers: {
      ...(token && { Cookie: `authjs.session-token=${token}` }),
    },
  };
}
