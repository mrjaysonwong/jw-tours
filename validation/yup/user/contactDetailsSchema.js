import * as yup from 'yup';
import { EMAIL_REGEX } from '@/constants/regex';

export const emailSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .matches(EMAIL_REGEX, 'Invalid email'),
});

export const phoneNumberSchema = yup.object().shape({
  phone: yup.object().shape({
    dialCode: yup
      .string()
      .required('Dial-code is required')
      .min(1, 'Minimum dial-code of 1 character')
      .max(6, 'Maximum dial-code of 6 characters'),
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .trim()
      .min(6, 'Minimum phone number of 6 digits')
      .max(10, 'Maximum phone number of 10 digits')
      .matches(/^[0-9]*$/, 'Number can only contain digits'),
  }),
});
