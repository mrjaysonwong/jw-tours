// internal imports
import { handleApiError } from '@/helpers/errorHelpers';
import connectMongo from '@/lib/connectMongo';
import Wishlist from '@/models/wishlistModel';

// POST: /api/v1/wishlists
export async function POST(Request) {
  try {
    const { tourId, guestId, session } = await Request.json();
    const userId = session?.user?.id;

    // connect to database
    await connectMongo();

    const filter = session ? { userId } : { guestId };

    await Wishlist.updateOne(
      filter,
      {
        $addToSet: { tours: tourId },
        $setOnInsert: {
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      },
      { upsert: true }
    );

    return Response.json(
      {
        message: `Saved to ${session ? 'My Wishlist' : 'Guest Wishlist'}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    const { message, status } = handleApiError(error);
    return Response.json({ message }, { status });
  }
}

// PATCH: /api/v1/wishlists
export async function PATCH(Request) {
  try {
    const { tourId, guestId, session, target } = await Request.json();
    const userId = session?.user?.id;

    // connect to database
    await connectMongo();

    let filter;

    if (target === 'all') {
      filter = { $or: [{ guestId }, { userId }] };
    } else if (target === 'guest') {
      filter = { guestId };
    } else if (target === 'user') {
      filter = { userId };
    }

    await Wishlist.updateMany(filter, { $pull: { tours: tourId } });

    await Wishlist.deleteMany({
      ...filter,
      tours: { $size: 0 },
    });

    return Response.json(
      {
        message: `Removed from Wishlist`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    const { message, status } = handleApiError(error);
    return Response.json({ message }, { status });
  }
}
