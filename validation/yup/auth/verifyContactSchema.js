import * as yup from 'yup';
import { otpTypeSchema, otpSchema } from '@/validation/yup/auth/otpSchema';
import {
  emailSchema,
  phoneNumberSchema,
  emailValidTypes,
  mobileValidTypes,
} from '../user/contactDetailsSchema';

export const verifyContactSchema = (identifier) =>
  yup.object().shape({
    type: otpTypeSchema.fields.type,
    otp: otpSchema.fields.otp,
    ...(emailValidTypes.includes(identifier) && {
      email: emailSchema.fields.email,
    }),
    ...(mobileValidTypes.includes(identifier) && {
      phone: phoneNumberSchema.fields.phone,
    }),
  });
