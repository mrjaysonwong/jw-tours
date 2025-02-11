import * as yup from 'yup';

export const otpTypeSchema = yup.object({
  type: yup
    .string()
    .trim()
    .required('Type is required')
    .oneOf(['email', 'mobile'], 'Type is invalid'),
});

export const otpSchema = yup.object({
  otp: yup
    .string()
    .trim()
    .required('OTP is required')
    .length(6, 'OTP must be exactly 6 digits'),
});
