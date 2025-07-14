import { validateSession } from '@/services/auth/validateSession';
import connectMongo from '@/libs/connectMongo';
import { authorizeUser } from '@/services/auth/authorizeRole';
import { contactActionSchema } from '@/validation/yup/user/contactActionSchema';
import { handleApiError } from '@/helpers/errorHelpers';
import { updatePrimaryEmail, deleteEmailAddress } from '@/services/users';

// PATCH: /api/v1/users/[id]/email
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

    let newPrimaryEmail;

    if (actionType === 'update-email') {
      newPrimaryEmail = await updatePrimaryEmail(data.email, userId);
    } else {
      await deleteEmailAddress(data.email, userId);
    }

    const message = actionType.includes('delete')
      ? 'Emaill address successfully deleted.'
      : `Primary email has been set to ${newPrimaryEmail}.`;

    return Response.json({ message }, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
