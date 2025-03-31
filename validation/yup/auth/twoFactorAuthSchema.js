import * as yup from 'yup';
import { otpSchema } from '@/validation/yup/auth/otpSchema';
import { userIdSchema } from '../user/personalDetailsSchema';

export const twoFactorAuthSchema = yup.object().shape({
  otp: otpSchema.fields.otp,
  userIds: userIdSchema.fields.userIds,
});
