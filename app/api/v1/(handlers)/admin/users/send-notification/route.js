import { handleApiError, HttpError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import { sendNotificationSchema } from '@/validation/yup/admin/sendNotificationSchema';
import { validateSession } from '@/services/auth/validateSession';
import { authorizeAdmin } from '@/services/auth/authorizeRole';
import connectMongo from '@/libs/connectMongo';
import { templateRelatedIdCounter } from '@/services/notifications/templateRelatedIdCounter';
import { sendNotificationToUsers } from '@/services/admin/sendNotification';
import { sendBatch } from '@/services/email/sendBatch';

// POST: /api/v1/admin/users/send-notification
export async function POST(Request) {
  try {
    const requestData = await Request.json();

    const { userIds, notificationType, template, link, title, message } =
      requestData;

    await sendNotificationSchema.validate(
      { ...requestData },
      { abortEarly: false }
    );

    if (!userIds) {
      throw new HttpError({
        message: 'UserId is required',
        status: STATUS_CODES.BAD_REQUEST,
      });
    }

    const session = await validateSession();
    await authorizeAdmin(session);
    const adminId = session.user.id;

    // connect to database
    await connectMongo();

    if (notificationType === 'email' && template === 'newsletter') {
      await sendBatch();
    }

    const relatedId = await templateRelatedIdCounter(template);

    await sendNotificationToUsers(
      userIds,
      adminId,
      notificationType,
      template,
      link,
      title,
      message,
      relatedId
    );

    return Response.json({ message: 'Notification sent!' }, { status: 201 });
  } catch (error) {
    const { message, status } = handleApiError(error);
    return Response.json({ message }, { status });
  }
}
