// third-party imports
import { headers } from 'next/headers';

import { handleApiError, HttpError } from '@/helpers/errorHelpers';
import { newPasswordSchema } from '@/validation/yup/user/passwordSchema';
import { setNewPassword } from '@/services/auth/setNewPassword';

// PATCH: /api/v1/auth/set-new-password
export async function PATCH(Request) {
  try {
    const formData = await Request.json();

    await newPasswordSchema.validate({ ...formData }, { abortEarly: false });

    const headersList = headers();
    const authHeader = headersList.get('authorization');
    const authToken = authHeader ? authHeader.split(' ')[1] : null;

    if (!authToken) {
      throw new HttpError({
        message: 'Not authorized, no token',
        status: 401,
      });
    }

    const token = await setNewPassword(formData, authToken);

    const responsePayload =
      process.env.NODE_ENV === 'development'
        ? { statusText: 'Password Successfully Updated!', token }
        : { statusText: 'Password Successfully Updated!' };

    return Response.json(responsePayload, { status: 200 });
  } catch (error) {
    const { statusText, status } = handleApiError(error);

    return Response.json({ statusText }, { status });
  }
}
