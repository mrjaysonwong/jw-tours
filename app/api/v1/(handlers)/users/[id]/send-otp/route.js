// internal imports
import { validateSession } from '@/services/auth/validateSession';
import connectMongo from '@/lib/connectMongo';
import { authorizeUser } from '@/services/auth/authorizeRole';
import { addContactDetailsSchema } from '@/validation/yup/auth/addContactDetailsSchema';
import { REQUEST_TYPES } from '@/constants/common';
import { handleApiError } from '@/helpers/errorHelpers';
import { sendEmailOTP, sendMobileOTP } from '@/services/otp/sendUserOTP';

const projection = 'firstName email phone';

// POST: /api/v1/users/[id]/send-otp
export async function POST(Request, { params }) {
  const userId = params.id;

  try {
    const data = await Request.json();

    const isEmailType = REQUEST_TYPES.EMAIL === data.type;

    const schema = addContactDetailsSchema(data.type);
    await schema.validate({ ...data }, { abortEarly: false });

    const session = await validateSession();

    // connect to database
    await connectMongo();
    const userExists = await authorizeUser({ session, userId, projection });

    const statusCode = isEmailType
      ? await sendEmailOTP({ ...data, userId, userExists })
      : await sendMobileOTP({ data, userId, userExists });

    return Response.json({ message: 'OTP sent!' }, { status: statusCode });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
