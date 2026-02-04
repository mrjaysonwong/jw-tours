import { hash } from 'bcryptjs';

import { handleApiError } from '@/helpers/errorHelpers';
import connectMongo from '@/lib/connectMongo';
import User from '@/models/userModel';

export async function POST() {
  try {
    const users = await Promise.all(
      Array.from({ length: 25 }, async (_, i) => ({
        firstName: 'Foo',
        lastName: 'Bar',
        email: [
          {
            email: `test.user${String(i + 1).padStart(2, '0')}@yopmail.com`,
            isPrimary: true,
            isVerified: true,
          },
        ],
        role: 'user',
        status: 'active',
        password: await hash('!Test1234', 12),
      }))
    );

    // connect to database
    await connectMongo();

    // test
    await User.insertMany(users);

    return Response.json(
      { message: 'Users created successfully' },
      { status: 201 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
