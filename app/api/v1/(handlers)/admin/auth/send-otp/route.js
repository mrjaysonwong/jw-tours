// internal imports
import { passwordSchema } from '@/validation/yup/user/passwordSchema';
import { validateSessionAdminRole } from '@/services/auth/validateSessionAdminRole';
import connectMongo from '@/services/db/connectMongo';
import { findUserById } from '@/services/user/userQueries';
import { handleApiError } from '@/helpers/errorHelpers';
import { validatePassword } from '@/services/admin/twoFactorAuth';
import { sendEmailOTP } from '@/services/admin/twoFactorAuth';

// POST: /api/v1/admin/auth/send-otp
export async function POST(Request) {
  try {
    const requestData = await Request.json();

    await passwordSchema.validate({ ...requestData }, { abortEarly: false });

    const session = await validateSessionAdminRole();

    const userId = session.user.id;
    const userEmail = session.user.email;

    // connect to database
    await connectMongo();

    const projection = 'firstName password';
    const { firstName, password } = await findUserById(userId, projection);

    await validatePassword(requestData, password);

    const statusCode = await sendEmailOTP(firstName, userId, userEmail);

    return Response.json({ message: 'OTP sent!' }, { status: statusCode });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
