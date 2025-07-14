// internal imports
import { passwordSchema } from '@/validation/yup/user/passwordSchema';
import { validateSession } from '@/services/auth/validateSession';
import { authorizeAdmin } from '@/services/auth/authorizeRole';
import connectMongo from '@/libs/connectMongo';
import { findUserById } from '@/services/users/userQueries';
import { handleApiError } from '@/helpers/errorHelpers';
import { validatePassword } from '@/services/admin/twoFactorAuth';
import { sendEmailOTP } from '@/services/admin/twoFactorAuth';

const projection = 'firstName password';

// POST: /api/v1/admin/auth/send-otp
export async function POST(Request) {
  try {
    const data = await Request.json();

    await passwordSchema.validate({ ...data }, { abortEarly: false });

    const session = await validateSession();
    await authorizeAdmin(session);

    const userId = session.user.id;
    const userEmail = session.user.email;

    // connect to database
    await connectMongo();

    const { firstName, password } = await findUserById(userId, projection);

    await validatePassword(data, password);

    const statusCode = await sendEmailOTP(firstName, userId, userEmail);

    return Response.json({ message: 'OTP sent!' }, { status: statusCode });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
