import * as yup from 'yup';
import { EMAIL_REGEX } from '@/lib/regex';

export const emailSignInSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .matches(EMAIL_REGEX, 'Invalid email address'),
});

export const credentialsSignInSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .matches(EMAIL_REGEX, 'Invalid email address'),
  password: yup
    .string()
    .trim()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(40, 'Password must not exceed 40 characters'),
});
