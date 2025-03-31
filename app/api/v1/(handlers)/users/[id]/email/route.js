import { validateSessionAndUser } from '@/services/auth/validateSessionAndUser';
import { contactActionSchema } from '@/validation/yup/user/contactActionSchema';
import { handleApiError } from '@/helpers/errorHelpers';
import { updatePrimaryEmail, deleteEmailAddress } from '@/services/user';

// PATCH: /api/v1/users/[id]/email
export async function PATCH(Request, { params }) {
  const userId = params.id;

  try {
    const requestData = await Request.json();
    const actionType = requestData.actionType;

    const schema = contactActionSchema(actionType);
    await schema.validate({ ...requestData }, { abortEarly: false });

    await validateSessionAndUser(userId);

    let newPrimaryEmail;

    if (actionType === 'update-email') {
      newPrimaryEmail = await updatePrimaryEmail(requestData.email, userId);
    } else {
      await deleteEmailAddress(requestData.email, userId);
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
