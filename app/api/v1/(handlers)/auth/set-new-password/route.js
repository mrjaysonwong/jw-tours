// third-party imports
import { headers } from 'next/headers';

import { handleApiError, HttpError } from '@/helpers/errorHelpers';
import { newPasswordSchema } from '@/validation/yup/user/passwordSchema';
import { setNewPassword } from '@/services/auth/setNewPassword';
import { STATUS_CODES } from '@/constants/common';

// PATCH: /api/v1/auth/set-new-password
export async function PATCH(Request) {
  try {
    const data = await Request.json();

    await newPasswordSchema.validate({ ...data }, { abortEarly: false });

    const headersList = headers();
    const authHeader = headersList.get('authorization');
    const authToken = authHeader ? authHeader.split(' ')[1] : null;

    if (!authToken) {
      throw new HttpError({
        message: 'Not authorized, no token',
        status: STATUS_CODES.UNAUTHORIZED,
      });
    }

    await setNewPassword(data, authToken);

    return Response.json(
      { message: 'Password Successfully Updated!' },
      { status: 200, headers: { 'Set-Cookie': `token=${authToken}` } }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
