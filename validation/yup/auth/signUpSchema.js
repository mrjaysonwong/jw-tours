import * as yup from 'yup';
import { PASSWORD_REGEX } from '@/constants/regex';
import { personalDetailsSchema } from '../user/personalDetailsSchema';
import { emailSchema } from '../user/contactDetailsSchema';
import { passwordSchema } from '../user/passwordSchema';

export const signUpSchema = yup.object().shape({
  firstName: personalDetailsSchema.fields.firstName,
  lastName: personalDetailsSchema.fields.lastName,
  email: emailSchema.fields.email,
  password: passwordSchema.fields.password.matches(
    PASSWORD_REGEX,
    'Password must contain at least one uppercase letter, one lowercase letter, and one digit.'
  ),
  confirmPassword: yup
    .string()
    .trim()
    .required('Confirm your password.')
    .oneOf([yup.ref('password')], 'Password must match.'),
});

// Demo sample for locales validation
/*
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
      .min(8, messages.passwordMin)
      .max(40, messages.passwordMax)
      .matches(PASSWORD_REGEX, messages.strongPassword),
    confirmPassword: yup
      .string()
      .trim()
      .required(messages.confirmPassword)
      .oneOf([yup.ref('password')], messages.matchPassword),
  });

  */
