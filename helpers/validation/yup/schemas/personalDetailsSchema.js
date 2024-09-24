import * as yup from 'yup';
import { EMAIL_REGEX } from '@/utils/constants/regex';

export const personalDetailsSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .required('First name is required'),
  lastName: yup
    .string()
    .trim()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .required('Last name is required'),
});

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .matches(EMAIL_REGEX, 'Invalid email'),
});

export const phoneNumberSchema = yup.object().shape({
  phone: yup.object().shape({
    dialCode: yup.string().required('Dial-code is required'),
    phoneNumber: yup
      .string()
      .required('Mobile number is required')
      .trim()
      .max(10, 'Maximum phone number of 10 digits')
      .min(6, 'Minimum phone number of 6 digits')
      .matches(/^[0-9]*$/, 'Number can only contain digits'),
  }),
});
