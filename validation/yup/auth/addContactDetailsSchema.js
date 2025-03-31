import * as yup from 'yup';
import { otpTypeSchema } from '@/validation/yup/auth/otpSchema';
import {
  emailSchema,
  phoneNumberSchema,
  emailValidTypes,
  mobileValidTypes,
} from '../user/contactDetailsSchema';

export const addContactDetailsSchema = (identifier) =>
  yup.object().shape({
    type: otpTypeSchema.fields.type,
    ...(emailValidTypes.includes(identifier) && {
      email: emailSchema.fields.email,
    }),
    ...(mobileValidTypes.includes(identifier) && {
      phone: phoneNumberSchema.fields.phone,
    }),
  });
