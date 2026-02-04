// internal imports
import { handleApiError } from '@/helpers/errorHelpers';
import connectMongo from '@/lib/connectMongo';
import Review from '@/models/reviewModel';
import { validateSession } from '@/services/auth/validateSession';
import { authorizeAdmin } from '@/services/auth/authorizeRole';
import { validateMenuAction } from '@/helpers/menuActionHelpers';

const allowedActions = ['approve', 'reject'];

// PATCH: /api/v1/reviews[id]
export async function PATCH(Request, { params }) {
  const reviewId = params.id;

  try {
    const session = await validateSession();
    await authorizeAdmin(session);

    const { menuAction } = await Request.json();

    const { isValidAction, message } = validateMenuAction(
      menuAction,
      allowedActions
    );

    if (!isValidAction) {
      return Response.json({ message }, { status: 400 });
    }

    // connect to database
    await connectMongo();

    const review = await Review.findByIdAndUpdate(reviewId, {
      $set: { status: menuAction === 'reject' ? 'rejected' : 'approved' },
    });

    if (!review) {
      return Response.json({ message: 'Review not found.' }, { status: 404 });
    }

    return Response.json(
      { message: 'Review status has been updated.' },
      { status: 200 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);
    return Response.json({ message }, { status });
  }
}

// DELETE: /api/v1/reviews[id]
export async function DELETE(Request, { params }) {
  const reviewId = params.id;

  try {
    const session = await validateSession();
    await authorizeAdmin(session);

    // connect to database
    await connectMongo();

    const deleted = await Review.findByIdAndDelete(reviewId);

    if (!deleted) {
      return Response.json({ message: 'Review not found.' }, { status: 404 });
    }

    return Response.json(
      { message: 'Review has been deleted.' },
      { status: 200 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);
    return Response.json({ message }, { status });
  }
}
