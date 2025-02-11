import * as yup from 'yup';
import { PASSWORD_REGEX } from '@/constants/regex';
import { personalDetailsSchema } from '../user/personalDetailsSchema';
import { emailSchema } from '../user/contactDetailsSchema';
import { passwordSchema } from '../user/passwordSchema';
import { validRoles } from '../user/personalDetailsSchema';

export const addNewUserSchema = yup.object().shape({
  firstName: personalDetailsSchema.fields.firstName,
  lastName: personalDetailsSchema.fields.lastName,
  email: emailSchema.fields.email,
  role: yup
    .string()
    .trim()
    .required('Role is required')
    .oneOf(validRoles, 'Invalid user role'),
  password: passwordSchema.fields.password.matches(
    PASSWORD_REGEX,
    'Password must contain at least one uppercase letter, one lowercase letter, and one digit.'
  ),
  confirmPassword: yup
    .string()
    .trim()
    .required('Confirm your password.')
    .oneOf([yup.ref('password')], 'Password must match.'),
});
