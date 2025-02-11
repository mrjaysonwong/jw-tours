import * as yup from 'yup';
import { otpTypeSchema } from '@/validation/yup/auth/otpSchema';
import { getSchemaFields } from '../getSchemaFields';

export const addContactDetailsSchema = (type) =>
  yup.object().shape({
    type: otpTypeSchema.fields.type,
    ...getSchemaFields(type),
  });
