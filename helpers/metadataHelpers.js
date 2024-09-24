import { getTranslations } from 'next-intl/server';

export async function createMetadata(locale, namespace, title) {
  const t = await getTranslations({ locale, namespace });

  if (namespace === 'layout') {
    return {
      title: {
        template: `%s | ${t('meta_title.jw_tours')}`,
        default: `${t('meta_title.jw_tours')}`,
      },
    };
  } else {
    return {
      title: t(title),
    };
  }
}
