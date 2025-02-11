import * as yup from 'yup';
import { otpTypeSchema, otpSchema } from '@/validation/yup/auth/otpSchema';
import { getSchemaFields } from '../getSchemaFields';

export const verifyContactSchema = (type) =>
  yup.object().shape({
    type: otpTypeSchema.fields.type,
    otp: otpSchema.fields.otp,
    ...getSchemaFields(type),
  });
