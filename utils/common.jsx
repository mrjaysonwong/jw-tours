export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function checkPath(pathname) {
  const isAuthPage =
    pathname === '/signin' ||
    pathname === '/signin/link' ||
    pathname === '/signup' ||
    pathname === '/verify' ||
    pathname === '/notifications/authentication-failed' ||
    pathname === '/confirmation/send-link';

  return isAuthPage;
}
