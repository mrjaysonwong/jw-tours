import { twoFactorAuthSchema } from '@/validation/yup/auth/twoFactorAuthSchema';
import { validateSession } from '@/services/auth/validateSession';
import { authorizeAdmin } from '@/services/auth/authorizeRole';
import { handleApiError } from '@/helpers/errorHelpers';
import connectMongo from '@/libs/connectMongo';
import User from '@/models/userModel';
import { verifyOTP } from '@/services/admin/twoFactorAuth';
import { STATUS_CODES } from '@/constants/common';

// DELETE: /api/v1/admin/users/delete-account
export async function DELETE(Request) {
  try {
    const { userIds, otp } = await Request.json();
    const data = { userIds, otp };

    await twoFactorAuthSchema.validate({ ...data }, { abortEarly: false });

    const session = await validateSession();
    await authorizeAdmin(session);

    const adminId = session.user.id;
    const adminEmail = session.user.email;

    // connect to database
    await connectMongo();
    await verifyOTP(otp, adminId, adminEmail);

    const users = await User.find({ _id: { $in: userIds } });

    const foundUserIds = users.map((user) => user._id.toString());

    const missingUserIds = userIds.filter((id) => !foundUserIds.includes(id));

    if (foundUserIds.length > 0) {
      const { deletedCount } = await User.deleteMany({
        _id: { $in: foundUserIds },
      });

      const message =
        deletedCount > 1
          ? `${deletedCount} user accounts deleted.`
          : 'User account has been deleted.';

      const warning =
        process.env.NODE_ENV !== 'production'
          ? `Some user accounts were not found: ${missingUserIds.join(', ')}`
          : `${missingUserIds.length} user accounts were not found.`;

      return Response.json(
        {
          message,
          ...(missingUserIds.length > 0 && { warning }),
        },
        { status: 200 }
      );
    } else {
      return Response.json(
        { message: 'No matching user account found' },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
