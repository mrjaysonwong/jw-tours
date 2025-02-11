// internal imports
import { validateSession } from '@/validation/validateSesssion';
import { verifyContactSchema } from '@/validation/yup/auth/verifyContactSchema';
import connectMongo from '@/services/db/connectMongo';
import { findUserById } from '@/services/user/userQueries';
import { handleApiError } from '@/helpers/errorHelpers';
import { verifyAndAddEmail, verifyAndAddMobile } from '@/services/user';

// PATCH: /api/v1/users/[id]/verify-otp
export async function PATCH(Request, { params }) {
  const userId = params.id;

  try {
    await validateSession();

    const { type, otp, email, phone } = await Request.json();
    const isEmailType = type === 'email';
    const data = { type, otp, email, phone };

    const schema = verifyContactSchema(type);
    await schema.validate({ ...data }, { abortEarly: false });

    // Connect to the database
    await connectMongo();

    const projection = 'email phone';
    const userExists = await findUserById(userId, projection);

    if (isEmailType) {
      await verifyAndAddEmail(otp, email, userId, userExists);
    } else {
      await verifyAndAddMobile(otp, phone, userId, userExists);
    }

    return Response.json(
      { statusText: 'Successfully Added!' },
      { status: 200 }
    );
  } catch (error) {
    const { statusText, status } = handleApiError(error);

    return Response.json({ statusText }, { status });
  }
}
