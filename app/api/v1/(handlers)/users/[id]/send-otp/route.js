// internal imports
import { validateSessionAndUser } from '@/services/auth/validateSessionAndUser';
import { addContactDetailsSchema } from '@/validation/yup/auth/addContactDetailsSchema';
import { REQUEST_TYPES } from '@/constants/common';
import { handleApiError } from '@/helpers/errorHelpers';
import { sendEmailOTP, sendMobileOTP } from '@/services/otp/sendUserOTP';

// POST: /api/v1/users/[id]/send-otp
export async function POST(Request, { params }) {
  const userId = params.id;

  try {
    const requestData = await Request.json();

    const isEmailType = REQUEST_TYPES.EMAIL === requestData.type;

    const schema = addContactDetailsSchema(requestData.type);
    await schema.validate({ ...requestData }, { abortEarly: false });

    const projection = 'firstName email phone';
    const {userExists} = await validateSessionAndUser(userId, projection);

    const statusCode = isEmailType
      ? await sendEmailOTP({ ...requestData, userId, userExists })
      : await sendMobileOTP({ requestData, userId, userExists });

    return Response.json({ message: 'OTP sent!' }, { status: statusCode });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
