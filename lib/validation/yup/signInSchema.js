import * as yup from 'yup';
import { EMAIL_REGEX } from '@/lib/regex';

export const emailSignInSchema = (messages) =>
  yup.object().shape({
    email: yup
      .string()
      .trim()
      .required(messages.emailRequired)
      .matches(EMAIL_REGEX, messages.invalidEmail),
  });

export const credentialsSignInSchema = (messages) =>
  yup.object().shape({
    email: yup
      .string()
      .trim()
      .required(messages.emailRequired)
      .matches(EMAIL_REGEX, messages.invalidEmail),
    password: yup
      .string()
      .trim()
      .required(messages.passwordRequired)
      .min(8, messages.passwordMin)
      .max(40, messages.passwordMax),
  });
