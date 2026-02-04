// internal imports
import { verifyContactSchema } from '@/validation/yup/auth/verifyContactSchema';
import { validateSession } from '@/services/auth/validateSession';
import connectMongo from '@/lib/connectMongo';
import { authorizeUser } from '@/services/auth/authorizeRole';
import { handleApiError } from '@/helpers/errorHelpers';
import { verifyAndAddEmail, verifyAndAddMobile } from '@/services/users';

const projection = 'email phone';

// PATCH: /api/v1/users/[id]/verify-otp
export async function PATCH(Request, { params }) {
  const userId = params.id;

  try {
    const { type, otp, email, phone, isFirebaseAuthOk } = await Request.json();
    const isEmailType = type === 'email';
    const data = { type, otp, email, phone };

    const schema = verifyContactSchema(type);
    await schema.validate({ ...data }, { abortEarly: false });

    const session = await validateSession();

    // connect to database
    await connectMongo();
    const userExists = await authorizeUser({ session, userId, projection });

    if (isEmailType) {
      await verifyAndAddEmail(otp, email, userId, userExists);
    } else {
      await verifyAndAddMobile(
        otp,
        phone,
        userId,
        userExists,
        isFirebaseAuthOk
      );
    }

    return Response.json({ message: 'Successfully Added!' }, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
