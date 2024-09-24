import * as yup from 'yup';
import { PASSWORD_REGEX } from '@/utils/constants/regex';

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .trim()
    .required('Current Password is required.')
    .min(8, 'Password must be at least 8 characters.')
    .max(40, 'Password must not exceed 40 characters.'),
  newPassword: yup
    .string()
    .trim()
    .required('New Password is required.')
    .min(8, 'Password must be at least 8 characters.')
    .max(40, 'Password must not exceed 40 characters.')
    .matches(
      PASSWORD_REGEX,
      'Password must contain at least one uppercase, lowercase letter, digit and special character.'
    ),
  confirmNewPassword: yup
    .string()
    .trim()
    .required('Confirm New Password is required.')
    .oneOf([yup.ref('newPassword')], 'Password must match.'),
});

export const newPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters.')
    .max(40, 'Password must not exceed 40 characters.')
    .matches(
      PASSWORD_REGEX,
      'Password must contain at least one uppercase, lowercase letter, digit and special character.'
    ),
  confirmPassword: yup
    .string()
    .trim()
    .required('Confirm Password is required.')
    .oneOf([yup.ref('password')], 'Password must match.'),
});
