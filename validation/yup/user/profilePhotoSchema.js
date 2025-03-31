import * as yup from 'yup';


export const profilePhotoSchema = yup.object({
  croppedImage: yup.string().trim().required('Cropped image is required'),
});

export const updatePhotoSchema = (identifier) =>
  yup.object().shape({
    actionType: yup
      .string()
      .trim()
      .required('Action type is required')
      .matches(/^(update|delete)-photo$/, 'Action type is invalid'),
    ...(['update-photo'].includes(identifier) && {
      croppedImage: profilePhotoSchema.fields.croppedImage,
    }),
  });
