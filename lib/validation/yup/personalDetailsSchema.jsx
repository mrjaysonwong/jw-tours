import * as yup from 'yup';
import { EMAIL_REGEX } from '@/lib/regex';

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

export const contactInfoSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .matches(EMAIL_REGEX, 'Invalid email'),
});
