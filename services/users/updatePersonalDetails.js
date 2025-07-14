// internal imports
import { auth } from '@/auth';
import User from '@/models/userModel';
import { formatUTC } from '@/utils/formats/formatDates';

export async function updatePersonalDetails({ data, userId }) {
  try {
    const fields = { ...data };

    const session = await auth();
    const isAdmin = session.user.role === 'admin';

    if (!isAdmin) {
      delete fields.role;
    }

    // Only set dateOfBirth if it exists in data
    if (data.dateOfBirth) {
      fields.dateOfBirth = formatUTC(data.dateOfBirth);
    }

    await User.updateOne({ _id: userId }, { $set: fields });
  } catch (error) {
    throw error;
  }
}
