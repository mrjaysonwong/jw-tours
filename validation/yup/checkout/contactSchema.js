import * as yup from 'yup';

// internal imports
import { emailSchema, phoneNumberSchema } from '../user/contactDetailsSchema';

export const contactSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .required('Full name is required')
    .max(100, `Full name can't be longer than 100 characters`)
    .matches(/^[A-Za-z0-9 ]*$/, 'Please enter a valid name.'),
  email: emailSchema.fields.email,
  phone: phoneNumberSchema.fields.phone,
});
