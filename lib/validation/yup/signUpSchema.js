import * as yup from 'yup';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/lib/regex';

export const signUpSchema = (messages) =>
  yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .matches(/^[A-Za-z ]*$/, messages.invalidName)
      .required(messages.fNameRequired),
    lastName: yup
      .string()
      .trim()
      .matches(/^[A-Za-z ]*$/, messages.invalidName)
      .required(messages.lNameRequired),
    email: yup
      .string()
      .trim()
      .required(messages.emailRequired)
      .matches(EMAIL_REGEX, messages.invalidEmail),
    password: yup
      .string()
      .trim()
      .required(messages.passwordRequired)
      .matches(PASSWORD_REGEX, messages.strongPassword)
      .min(8, messages.passwordMin)
      .max(40, messages.passwordMax),
    confirmPassword: yup
      .string()
      .trim()
      .required(messages.confirmPassword)
      .oneOf([yup.ref('password')], messages.matchPassword),
  });
