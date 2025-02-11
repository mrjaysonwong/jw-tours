// internal imports
import { validateSession } from '@/validation/validateSesssion';
import { addContactDetailsSchema } from '@/validation/yup/auth/addContactDetailsSchema';
import { REQUEST_TYPES } from '@/constants/api';
import connectMongo from '@/services/db/connectMongo';
import { findUserById } from '@/services/user/userQueries';
import { handleApiError } from '@/helpers/errorHelpers';
import { sendEmailOTP, sendMobileOTP } from '@/services/otp/sendUserOTP';

// POST: /api/v1/users/[id]/send-otp
export async function POST(Request, { params }) {
  const userId = params.id;

  try {
    await validateSession();

    const requestData = await Request.json();
    const isEmailType = REQUEST_TYPES.EMAIL === requestData.type;

    const schema = addContactDetailsSchema(requestData.type);
    await schema.validate({ ...requestData }, { abortEarly: false });

    // Connect to the database
    await connectMongo();

    const projection = 'firstName email phone';
    const userExists = await findUserById(userId, projection);

    const statusCode = isEmailType
      ? await sendEmailOTP({ ...requestData, userId, userExists })
      : await sendMobileOTP({ requestData, userId, userExists });

    return Response.json({ statusText: 'OTP sent!' }, { status: statusCode });
  } catch (error) {
    const { statusText, status } = handleApiError(error);

    return Response.json({ statusText }, { status });
  }
}
