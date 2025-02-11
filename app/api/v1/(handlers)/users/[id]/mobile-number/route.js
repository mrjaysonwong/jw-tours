import { validateSession } from '@/validation/validateSesssion';
import { contactActionSchema } from '@/validation/yup/user/contactActionSchema';
import connectMongo from '@/services/db/connectMongo';
import { findUserById } from '@/services/user/userQueries';
import { handleApiError } from '@/helpers/errorHelpers';
import { updatePrimaryNumber, deleteMobileNumber } from '@/services/user';

// PATCH: /api/v1/users/[id]/mobile-number
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

    let newPrimaryNumber;

    if (actionType === 'update-mobile') {
      newPrimaryNumber = await updatePrimaryNumber(requestData.phone, userId);
    } else {
      await deleteMobileNumber(requestData.phone, userId);
    }

    const responseMessage = actionType.includes('delete')
      ? 'Mobile number successfully deleted.'
      : `Primary number has been set to +${newPrimaryNumber}`;

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
