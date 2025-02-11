import * as yup from 'yup';

import { LOCALE_MAP } from '@/constants/locale_map';

export const preferencesSchema = yup.object({
  langCode: yup
    .string()
    .trim()
    .required('Language code is required')
    .oneOf(Object.keys(LOCALE_MAP), 'Invalid language code.'),
});
