import * as yup from 'yup';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/lib/regex';


export const signUpSchema = yup.object().shape({
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
    email: yup
      .string()
      .trim()
      .required('Email is required')
      .matches(EMAIL_REGEX, 'Invalid email'),
    password: yup
      .string()
      .trim()
      .required('Password is required')
      .matches(
        PASSWORD_REGEX,
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
      )
      .min(8, 'Password must be at least 8 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: yup
      .string()
      .trim()
      .required('Confirm your password')
      .oneOf([yup.ref('password')], 'Password must match'),
  });