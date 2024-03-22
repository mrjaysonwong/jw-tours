import * as yup from 'yup';
import { EMAIL_REGEX } from '@/lib/regex';

export const emailSignInSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .matches(EMAIL_REGEX, 'Invalid email address'),
});
