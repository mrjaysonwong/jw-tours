import { validateSession } from '@/validation/validateSesssion';
import { contactActionSchema } from '@/validation/yup/user/contactActionSchema';
import connectMongo from '@/services/db/connectMongo';
import { findUserById } from '@/services/user/userQueries';
import { handleApiError } from '@/helpers/errorHelpers';
import { updatePrimaryEmail, deleteEmailAddress } from '@/services/user';

// PATCH: /api/v1/users/[id]/email
export async function PATCH(Request, { params }) {
  const userId = params.id;

  try {
    await validateSession();

    const requestData = await Request.json();
    const actionType = requestData.actionType;

    const schema = contactActionSchema(actionType);
    await schema.validate({ ...requestData }, { abortEarly: false });

    // connect to database
    await connectMongo();

    await findUserById(userId);

    let newPrimaryEmail;

    if (actionType === 'update-email') {
      newPrimaryEmail = await updatePrimaryEmail(requestData.email, userId);
    } else {
      await deleteEmailAddress(requestData.email, userId);
    }

    const responseMessage = actionType.includes('delete')
      ? 'Emaill address successfully deleted.'
      : `Primary email has been set to ${newPrimaryEmail}.`;

    return Response.json(
      {
        statusText: responseMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    const { statusText, status } = handleApiError(error);

    return Response.json({ statusText }, { status });
  }
}
