// internal imports
import { auth } from '@/auth';
import User from '@/models/userModel';
import { formatUTC } from '@/utils/formats/formatDates';

export async function updatePersonalDetails({ formData, userId }) {
  try {
    const fields = { ...formData };

    const session = await auth();
    const isAdmin = session.user.role === 'admin';

    if (!isAdmin) {
      delete fields.role;
    }

    // Only set dateOfBirth if it exists in formData
    if (formData.dateOfBirth) {
      fields.dateOfBirth = formatUTC(formData.dateOfBirth);
    }

    await User.updateOne({ _id: userId }, { $set: fields });
  } catch (error) {
    throw error;
  }
}
