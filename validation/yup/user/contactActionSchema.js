import * as yup from 'yup';
import { getSchemaFields } from '../getSchemaFields';

export const contactActionSchema = (type) =>
  yup.object().shape({
    actionType: yup
      .string()
      .trim()
      .required('Action type is required')
      .matches(/^(update|delete)-(email|mobile)$/, 'Action type is invalid'),
    ...getSchemaFields(type),
  });
