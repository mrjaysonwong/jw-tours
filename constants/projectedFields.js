export const PROJECTED_FIELDS = Object.freeze({
  DEFAULT:
    'email firstName lastName image role langCode status accountProvider createdAt',
  WITHOUT_PASSWORD: '-password status accountProvider',
  WITH_PASSWORD:
    'email firstName lastName role image langCode password status accountProvider',
  GUIDE: 'firstName lastName image',
  USER: 'image firstName lastName'
});
