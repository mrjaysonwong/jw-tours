import * as yup from 'yup';
import { emailSchema } from '../user/contactDetailsSchema';
import { passwordSchema } from '../user/passwordSchema';

export const emailPasswordSchema = yup.object().shape({
  email: emailSchema.fields.email,
  password: passwordSchema.fields.password,
});
