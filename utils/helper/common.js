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

  const hideOnAuthPage = authPages.includes(pathname);

  return hideOnAuthPage;
}

export function hideNavLinks(pathname, params) {
  const selectedPages = ['/mysettings', `/mysettings/${params.slug}`];

  const hideOnSelectedPage = selectedPages.includes(pathname);

  return hideOnSelectedPage;
}

export function homePage(pathname) {
  const selectedPages = ['/'];

  const nonBlur = selectedPages.includes(pathname);

  return nonBlur;
}
