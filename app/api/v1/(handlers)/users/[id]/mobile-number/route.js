import { validateSessionAndUser } from '@/services/auth/validateSessionAndUser';
import { contactActionSchema } from '@/validation/yup/user/contactActionSchema';
import { handleApiError } from '@/helpers/errorHelpers';
import { updatePrimaryNumber, deleteMobileNumber } from '@/services/user';

// PATCH: /api/v1/users/[id]/mobile-number
export async function PATCH(Request, { params }) {
  const userId = params.id;

  try {
    const requestData = await Request.json();
    const actionType = requestData.actionType;

    const schema = contactActionSchema(actionType);
    await schema.validate({ ...requestData }, { abortEarly: false });

    await validateSessionAndUser(userId);

    let newPrimaryNumber;

    if (actionType === 'update-mobile') {
      newPrimaryNumber = await updatePrimaryNumber(requestData.phone, userId);
    } else {
      await deleteMobileNumber(requestData.phone, userId);
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
