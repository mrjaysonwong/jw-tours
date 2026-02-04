import { validateSession } from '@/services/auth/validateSession';
import connectMongo from '@/lib/connectMongo';
import { authorizeUser } from '@/services/auth/authorizeRole';
import { contactActionSchema } from '@/validation/yup/user/contactActionSchema';
import { handleApiError } from '@/helpers/errorHelpers';
import { updatePrimaryNumber, deleteMobileNumber } from '@/services/users';

// PATCH: /api/v1/users/[id]/mobile-number
export async function PATCH(Request, { params }) {
  const userId = params.id;

  try {
    const data = await Request.json();
    const actionType = data.actionType;

    const schema = contactActionSchema(actionType);
    await schema.validate({ ...data }, { abortEarly: false });

    const session = await validateSession();

    // connect to database
    await connectMongo();
    await authorizeUser({ session, userId });

    let newPrimaryNumber;

    if (actionType === 'update-mobile') {
      newPrimaryNumber = await updatePrimaryNumber(data.phone, userId);
    } else {
      await deleteMobileNumber(data.phone, userId);
    }

    const message = actionType.includes('delete')
      ? 'Mobile number successfully deleted.'
      : `Primary number has been set to +${newPrimaryNumber}`;

    return Response.json({ message }, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
