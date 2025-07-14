import * as yup from 'yup';

import { LOCALE_MAP } from '@/constants/localeMap';

export const preferencesSchema = yup.object().shape({
  langCode: yup
    .string()
    .trim()
    .required('Language code is required')
    .oneOf(Object.keys(LOCALE_MAP), 'Invalid language code.'),
  subscription: yup.object().shape({
    isSubscribed: yup.boolean(),
    subscriberId: yup.string(),
  }),
});
