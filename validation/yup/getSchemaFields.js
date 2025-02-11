import { emailSchema, phoneNumberSchema } from './user/contactDetailsSchema';
import { profilePhotoSchema } from './user/profilePhotoSchema';

const emailValidTypes = ['email', 'update-email', 'delete-email'];
const mobileValidTypes = ['mobile', 'update-mobile', 'delete-mobile'];

export const getSchemaFields = (type) => {
  if (emailValidTypes.includes(type)) {
    return {
      email: emailSchema.fields.email,
    };
  }

  if (mobileValidTypes.includes(type)) {
    return {
      phone: phoneNumberSchema.fields.phone,
    };
  }

  if (['update-photo'].includes(type)) {
    return {
      croppedImage: profilePhotoSchema.fields.croppedImage,
    };
  }

  return {};
};
