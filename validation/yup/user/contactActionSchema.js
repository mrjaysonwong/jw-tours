import * as yup from 'yup';
import {
  emailSchema,
  phoneNumberSchema,
  emailValidTypes,
  mobileValidTypes,
} from './contactDetailsSchema';

export const contactActionSchema = (identifier) =>
  yup.object().shape({
    actionType: yup
      .string()
      .trim()
      .required('Action type is required')
      .matches(/^(update|delete)-(email|mobile)$/, 'Action type is invalid'),
    ...(emailValidTypes.includes(identifier) && {
      email: emailSchema.fields.email,
    }),
    ...(mobileValidTypes.includes(identifier) && {
      phone: phoneNumberSchema.fields.phone,
    }),
  });
