import * as yup from 'yup';
import { getSchemaFields } from '../getSchemaFields';

export const profilePhotoSchema = yup.object({
  croppedImage: yup.string().trim().required('Cropped image is required'),
});

export const updatePhotoSchema = (type) =>
  yup.object().shape({
    actionType: yup
      .string()
      .trim()
      .required('Action type is required')
      .matches(/^(update|delete)-photo$/, 'Action type is invalid'),
    ...getSchemaFields(type),
  });
